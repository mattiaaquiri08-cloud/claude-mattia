// Genera le versioni ottimizzate (AVIF + WebP, più larghezze) delle foto in assets-src/.
// Uso: npm run images
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets-src");
const OUT = path.join(ROOT, "public", "img");

/** cartella sorgente -> larghezze da generare */
const JOBS = {
  hero: [480, 800, 1200, 1672],
  galleria: [480, 800, 1200, 1600],
};

const manifest = {};

for (const [folder, widths] of Object.entries(JOBS)) {
  const dir = path.join(SRC, folder);
  if (!existsSync(dir)) continue;
  await mkdir(path.join(OUT, folder), { recursive: true });
  const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort();

  for (const file of files) {
    const name = file.replace(/\.[^.]+$/, "");
    const input = sharp(path.join(dir, file)).rotate();
    const meta = await input.metadata();
    const usable = widths.filter((w) => w < meta.width);
    if (!usable.includes(meta.width)) usable.push(meta.width);

    for (const w of usable) {
      const base = path.join(OUT, folder, `${name}-${w}`);
      if (existsSync(`${base}.avif`) && existsSync(`${base}.webp`) && !process.argv.includes("--force")) continue;
      await input.clone().resize({ width: w }).avif({ quality: 52, effort: 4 }).toFile(`${base}.avif`);
      await input.clone().resize({ width: w }).webp({ quality: 78, effort: 5 }).toFile(`${base}.webp`);
    }

    // segnaposto sfocato minuscolo, incorporato come data URI
    const lqip = await input.clone().resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();

    manifest[`${folder}/${name}`] = {
      width: meta.width,
      height: meta.height,
      widths: usable,
      lqip: `data:image/webp;base64,${lqip.toString("base64")}`,
    };
    console.log(`${folder}/${name}: ${meta.width}x${meta.height} -> ${usable.join(", ")}`);
  }
}

// immagine per le anteprime social (Open Graph)
const og = path.join(SRC, "hero", "giorno-orizzontale.webp");
if (existsSync(og)) {
  await sharp(og).resize(1200, 630, { fit: "cover", position: "centre" }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, "og-nana.jpg"));
}

await writeFile(
  path.join(ROOT, "src", "data", "images.generated.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
