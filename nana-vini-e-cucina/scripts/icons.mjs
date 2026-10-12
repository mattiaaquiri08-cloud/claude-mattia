// Genera favicon e icone dall'originale vettoriale del logo (disco petrolio + pesce-calice).
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { LOGO_BUBBLES, LOGO_FISH, LOGO_TAGLINE, LOGO_WORD } from "../src/data/logo-paths.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUB = path.join(ROOT, "public");
const GREEN = "#527b6d";
const WHITE = "#fefefb";

const paths = (list) => list.map((d) => `<path d="${d}"/>`).join("");

// icona piccola: solo pesce e bollicine, ingranditi
const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="19 13 216 216"><circle cx="127" cy="121" r="108" fill="${GREEN}"/><g fill="${WHITE}" transform="translate(127 121) scale(1.6) translate(-126 -59)">${paths(LOGO_FISH)}${paths(LOGO_BUBBLES)}</g></svg>`;
// logo completo per icone grandi
const full = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="19 13 216 216"><circle cx="127" cy="121" r="108" fill="${GREEN}"/><g fill="${WHITE}">${paths(LOGO_FISH)}${paths(LOGO_BUBBLES)}${paths(LOGO_WORD)}${paths(LOGO_TAGLINE)}</g></svg>`;
// versione a tutto quadrato per apple-touch-icon e manifest (niente angoli trasparenti)
const square = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="19 13 216 216"><rect x="19" y="13" width="216" height="216" fill="${GREEN}"/><g fill="${WHITE}">${inner}</g></svg>`;

await writeFile(path.join(PUB, "favicon.svg"), mark);
await sharp(Buffer.from(mark), { density: 300 }).resize(32, 32).png().toFile(path.join(PUB, "favicon-32.png"));
await sharp(Buffer.from(square(paths(LOGO_FISH) + paths(LOGO_BUBBLES) + paths(LOGO_WORD) + paths(LOGO_TAGLINE))), { density: 400 })
  .resize(180, 180)
  .png()
  .toFile(path.join(PUB, "apple-touch-icon.png"));
for (const size of [192, 512]) {
  await sharp(Buffer.from(full), { density: 600 }).resize(size, size).png().toFile(path.join(PUB, `icon-${size}.png`));
}
await writeFile(
  path.join(PUB, "site.webmanifest"),
  JSON.stringify(
    {
      name: "Nanà Vini e Cucina",
      short_name: "Nanà",
      start_url: "/",
      display: "browser",
      background_color: "#f8f6ef",
      theme_color: GREEN,
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  ) + "\n",
);
console.log("icone generate");
