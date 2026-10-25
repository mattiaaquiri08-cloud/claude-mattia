/*
 * Dopo la build: scrive dentro dist/index.html l'HTML già renderizzato della pagina
 * (così Google legge subito tutti i testi), i dati strutturati schema.org generati
 * da src/content.ts, robots.txt e sitemap.xml.
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://exotiqueestetique.com'

execSync('npx vite build --ssr src/entry-server.tsx --outDir dist-ssr --logLevel warn', { cwd: root, stdio: 'inherit' })
const { render, business, categories, highlights } = await import(resolve(root, 'dist-ssr/entry-server.js'))

const dayMap = { Lunedì: 'Monday', Martedì: 'Tuesday', Mercoledì: 'Wednesday', Giovedì: 'Thursday', Venerdì: 'Friday', Sabato: 'Saturday', Domenica: 'Sunday' }
const order = Object.keys(dayMap)

function hoursSpec() {
  if (!business.hours) return undefined
  const out = []
  for (const h of business.hours) {
    if (/chiuso/i.test(h.time)) continue
    const [from, to] = h.days.split(/\s*-\s*/)
    const a = order.indexOf(from), b = order.indexOf(to ?? from)
    if (a < 0 || b < 0) continue
    const [opens, closes] = h.time.split(/\s*-\s*/).map((t) => t.replace(/^(\d):/, '0$1:'))
    out.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: order.slice(a, b + 1).map((d) => dayMap[d]), opens, closes })
  }
  return out
}

const offer = (name, price, extra = {}) => ({
  '@type': 'Offer',
  itemOffered: { '@type': 'Service', name, ...extra },
  ...(price != null ? { price: price.toFixed(2), priceCurrency: 'EUR' } : {}),
})

const ld = {
  '@context': 'https://schema.org',
  '@type': ['BeautySalon', 'HairSalon', 'NailSalon'],
  '@id': `${SITE}/#centro`,
  name: business.name,
  description:
    'Centro estetico e parrucchiere a La Storta (Roma Nord): trattamenti viso, BB Glow, massaggi, epilazione con laser a diodo, ceretta, manicure, pedicure, ciglia, trucco, taglio e colore.',
  url: `${SITE}/`,
  image: [`${SITE}/og.jpg`],
  logo: `${SITE}/favicon.svg`,
  telephone: business.mobile.href.replace('tel:', ''),
  email: business.email,
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  founder: { '@type': 'Person', name: business.owner },
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.street,
    postalCode: business.postalCode,
    addressLocality: 'Roma',
    addressRegion: 'RM',
    addressCountry: 'IT',
  },
  areaServed: ['La Storta', 'Olgiata', 'Cassia', 'Roma Nord'].map((n) => ({ '@type': 'Place', name: n })),
  hasMap: business.mapsUrl,
  sameAs: [business.facebookUrl, business.instagramUrl].filter(Boolean),
  openingHoursSpecification: hoursSpec(),
  brand: business.brands.map((b) => ({ '@type': 'Brand', name: b.name })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Listino trattamenti',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'In evidenza',
        itemListElement: [
          offer(`${highlights.laser.title}, ${highlights.laser.unit}`, highlights.laser.price),
          ...highlights.bbGlow.prices.map((p) => offer(`${highlights.bbGlow.title}, ${p.label}`, p.value)),
        ],
      },
      ...categories.map((c) => ({
        '@type': 'OfferCatalog',
        name: c.title,
        itemListElement: c.services.map((s) => offer(s.name, s.price, s.duration ? { duration: `PT${s.duration}M` } : {})),
      })),
    ],
  },
}

const dist = resolve(root, 'dist')
let html = readFileSync(resolve(dist, 'index.html'), 'utf8')
html = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n</head>`)
writeFileSync(resolve(dist, 'index.html'), html)

writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
const today = new Date().toISOString().slice(0, 10)
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE}/</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`,
)
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('prerender: ok')
