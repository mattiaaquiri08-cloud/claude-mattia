// Versione "file unico": un solo nana-vini-e-cucina.html con codice, stili, caratteri e foto incorporati.
// Si apre con un doppio clic, senza server. Uso: npm run build:single
import { readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist-single");
const PUB = path.join(ROOT, "public");
const OUT = path.join(ROOT, "nana-vini-e-cucina.html");

const dataUri = async (rel) => `data:image/webp;base64,${(await readFile(path.join(PUB, rel))).toString("base64")}`;

let html = await readFile(path.join(DIST, "index.html"), "utf8");
const assets = await readdir(path.join(DIST, "assets"));
const cssFile = assets.find((f) => f.endsWith(".css"));
const jsFile = assets.find((f) => f.endsWith(".js"));
let css = await readFile(path.join(DIST, "assets", cssFile), "utf8");
const js = await readFile(path.join(DIST, "assets", jsFile), "utf8");

// foto della hero e della mappa: una variabile CSS per foto, invece di ripetere i dati
const heroVars = {
  "giorno-orizzontale": "hero/giorno-orizzontale-1672.webp",
  "sera-orizzontale": "hero/sera-orizzontale-1672.webp",
  "giorno-verticale": "hero/giorno-verticale-941.webp",
  "sera-verticale": "hero/sera-verticale-941.webp",
};
let rootVars = "";
for (const [name, file] of Object.entries(heroVars)) rootVars += `--img-${name}:url("${await dataUri(path.join("img", file))}");`;
css = css
  .replace(/url\(["']?\/img\/hero\/((?:giorno|sera)-(?:orizzontale|verticale))-\d+\.(?:avif|webp)["']?\)/g, "var(--img-$1)")
  // il minificatore scrive image-set("...") senza url(): stessa sostituzione
  .replace(/["']\/img\/hero\/((?:giorno|sera)-(?:orizzontale|verticale))-\d+\.(?:avif|webp)["']/g, "var(--img-$1)")
  .replace(/type\(["']image\/avif["']\)/g, 'type("image/webp")');
css = `:root{${rootVars}}\n${css}`;

// foto della galleria (800 px) usate dai componenti React
const manifest = JSON.parse(await readFile(path.join(ROOT, "src", "data", "images.generated.json"), "utf8"));
const map = {};
for (const key of Object.keys(manifest)) {
  if (!key.startsWith("galleria/")) continue;
  map[`/img/${key}-800.webp`] = await dataUri(path.join("img", `${key}-800.webp`));
}

const safe = (s) => s.replace(/<\/script/gi, "<\\/script");
html = html
  .replace(/<link rel="(icon|apple-touch-icon|manifest)"[^>]*>\s*/g, "")
  .replace(/<link rel="stylesheet"[^>]*>/, () => `<style>${css}</style>`)
  .replace(/<script type="module" crossorigin src="[^"]*"><\/script>/, "")
  .replace("<!--app-head-->", `<script>window.__NANA_IMG=${JSON.stringify(map)};</script>`)
  .replace("<!--app-html-->", "")
  .replace("</body>", () => `<script type="module">${safe(js)}</script>\n</body>`);

if (css.includes("/img/hero/") || /src="\/assets\/|href="\/assets\//.test(html)) throw new Error("Restano riferimenti a file esterni");
await writeFile(OUT, html);
await rm(DIST, { recursive: true, force: true });
console.log(`file unico: ${path.basename(OUT)} (${(html.length / 1024 / 1024).toFixed(1)} MB)`);
