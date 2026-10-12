// Prerendering statico: genera dist/index.html (italiano) e dist/en/index.html (inglese)
// con HTML completo, meta tag, hreflang e dati strutturati per i motori di ricerca.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist");
const SITE_URL = "https://nanaviniecucina.it";

const { render } = await import(pathToFileURL(path.join(ROOT, "dist-ssr", "entry-server.js")).href);
const template = await readFile(path.join(DIST, "index.html"), "utf8");

const PAGES = [
  { lang: "it", out: "index.html", url: `${SITE_URL}/`, locale: "it_IT", alt: "en_GB" },
  { lang: "en", out: "en/index.html", url: `${SITE_URL}/en/`, locale: "en_GB", alt: "it_IT" },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const jsonLd = (lang) => ({
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: "Nanà Vini e Cucina",
  url: lang === "it" ? `${SITE_URL}/` : `${SITE_URL}/en/`,
  image: [`${SITE_URL}/img/og-nana.jpg`],
  logo: `${SITE_URL}/apple-touch-icon.png`,
  telephone: "+39 06 6919 0750",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via della Panetteria, 37",
    postalCode: "00187",
    addressLocality: "Roma",
    addressRegion: "RM",
    addressCountry: "IT",
  },
  geo: { "@type": "GeoCoordinates", latitude: 41.9017876, longitude: 12.4847713 },
  servesCuisine: ["Italiana", "Napoletana", "Romana"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "12:00",
      closes: "23:00",
    },
  ],
  acceptsReservations: "https://www.thefork.it/ristorante/nana-vini-e-cucina-r736495",
  hasMenu: `${lang === "it" ? SITE_URL + "/" : SITE_URL + "/en/"}#menu`,
  sameAs: [
    "https://www.facebook.com/nanavinicucina",
    "https://www.instagram.com/nanaviniecucina/",
    "https://www.tripadvisor.com/Restaurant_Review-g187791-d1650897-Reviews-Nana_Vini_e_Cucina-Rome_Lazio.html",
    "https://www.thefork.it/ristorante/nana-vini-e-cucina-r736495",
  ],
});

for (const page of PAGES) {
  const { html, meta } = render(page.lang);
  const head = [
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${page.url}" />`,
    `<link rel="alternate" hreflang="it" href="${SITE_URL}/" />`,
    `<link rel="alternate" hreflang="en" href="${SITE_URL}/en/" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`,
    `<meta property="og:type" content="restaurant" />`,
    `<meta property="og:site_name" content="Nanà Vini e Cucina" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${page.url}" />`,
    `<meta property="og:image" content="${SITE_URL}/img/og-nana.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${page.locale}" />`,
    `<meta property="og:locale:alternate" content="${page.alt}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(page.lang))}</script>`,
  ].join("\n    ");

  const doc = template
    .replace('<html lang="it"', `<html lang="${page.lang}"`)
    .replace(/<title>.*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);

  const file = path.join(DIST, page.out);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, doc);
  console.log(`prerender: ${page.out} (${Math.round(doc.length / 1024)} KB)`);
}

await rm(path.join(ROOT, "dist-ssr"), { recursive: true, force: true });
