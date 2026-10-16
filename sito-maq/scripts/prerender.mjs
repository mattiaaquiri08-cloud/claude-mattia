// Dopo la build crea un file HTML già pronto per ogni pagina, con titolo, descrizione,
// link canonico, dati strutturati per Google, mappa del sito e robots.txt.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const cartella = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(cartella, "dist");
const ssr = join(cartella, "dist-ssr");
const { render, PAGINE, CONTATTI, NOME, TITOLARE, SITO_URL } = await import(
  pathToFileURL(join(ssr, "entry-server.js")).href
);

const modello = readFileSync(join(dist, "index.html"), "utf8");
const esc = (t) => t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const indirizzo = (slug) => `${SITO_URL}/${slug ? `${slug}/` : ""}`;

const attivita = {
  "@type": "ProfessionalService",
  "@id": `${SITO_URL}/#maq`,
  name: NOME,
  url: `${SITO_URL}/`,
  image: `${SITO_URL}/anteprima.jpg`,
  logo: `${SITO_URL}/favicon.svg`,
  description: "Web designer a Roma: siti web su misura per ristoranti, saloni, palestre e attività locali, con bozza gratuita e senza impegno.",
  slogan: "Grow Online",
  telephone: CONTATTI.telefono.replace(/\s/g, ""),
  email: CONTATTI.email,
  founder: { "@type": "Person", name: TITOLARE },
  address: { "@type": "PostalAddress", addressLocality: "Roma", addressRegion: "RM", addressCountry: "IT" },
  areaServed: [
    { "@type": "City", name: "Roma" },
    { "@type": "Country", name: "Italia" },
  ],
  knowsAbout: ["Web design", "Siti web", "SEO locale", "Google Business Profile"],
};

function datiStrutturati(p) {
  if (p.tipo === "home") return { "@context": "https://schema.org", ...attivita };
  const briciole = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: indirizzo("") },
      { "@type": "ListItem", position: 2, name: p.etichetta, item: indirizzo(p.slug) },
    ],
  };
  const principale =
    p.tipo === "settore"
      ? {
          "@type": "Service",
          name: p.pillola,
          description: p.descrizione,
          serviceType: "Realizzazione siti web",
          areaServed: { "@type": "City", name: "Roma" },
          provider: { "@id": attivita["@id"] },
          url: indirizzo(p.slug),
        }
      : {
          "@type": "Article",
          headline: p.h1.join(""),
          description: p.descrizione,
          datePublished: p.pubblicata,
          author: { "@type": "Person", name: TITOLARE },
          publisher: { "@id": attivita["@id"] },
          mainEntityOfPage: indirizzo(p.slug),
          inLanguage: "it-IT",
        };
  return { "@context": "https://schema.org", "@graph": [principale, briciole, attivita] };
}

function testa(p) {
  const url = indirizzo(p.slug);
  return [
    `<title>${esc(p.titoloSeo)}</title>`,
    `<meta name="description" content="${esc(p.descrizione)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${p.tipo === "guida" ? "article" : "website"}" />`,
    `<meta property="og:locale" content="it_IT" />`,
    `<meta property="og:site_name" content="${NOME}" />`,
    `<meta property="og:title" content="${esc(p.titoloSeo)}" />`,
    `<meta property="og:description" content="${esc(p.descrizione)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITO_URL}/anteprima.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(datiStrutturati(p)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

for (const p of PAGINE) {
  let html = modello
    .replace(/<title>[\s\S]*?<\/title>/, "<!--seo-->")
    .replace(/\s*<meta (name="description"|property="og:[a-z_]+")[^>]*>/g, "")
    .replace("<!--seo-->", testa(p))
    .replace('<div id="root"></div>', `<div id="root" data-pagina="${p.slug}">${render(p.slug)}</div>`);
  if (p.slug) {
    // le pagine interne stanno una cartella più in basso
    html = html.replaceAll('="./', '="../');
    mkdirSync(join(dist, p.slug), { recursive: true });
    writeFileSync(join(dist, p.slug, "index.html"), html);
  } else {
    writeFileSync(join(dist, "index.html"), html);
  }
}

const oggi = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGINE.map((p) => `  <url><loc>${indirizzo(p.slug)}</loc><lastmod>${oggi}</lastmod></url>`).join("\n")}
</urlset>
`,
);
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITO_URL}/sitemap.xml\n`);
rmSync(ssr, { recursive: true, force: true });
console.log(`✓ ${PAGINE.length} pagine pronte per Google, sitemap.xml e robots.txt`);
