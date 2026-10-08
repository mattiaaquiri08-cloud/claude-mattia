/*
 * Crea le due bozze da inviare al cliente, entrambe file HTML unici apribili offline
 * (servono solo per la mappa e per aprire WhatsApp/Instagram, che sono online per natura):
 *  - versione PC: il sito così com'è;
 *  - versione smartphone: su computer mostra il sito dentro una cornice di telefono,
 *    su smartphone lo apre a tutto schermo.
 * Uso: npm run bozze  (crea ../../consegna/OMA_bozza_PC.html e OMA_bozza_smartphone.html)
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { extname } from 'node:path'

const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' }
const dataUri = (file) =>
  `data:${MIME[extname(file)]};base64,${readFileSync(`public/${file}`).toString('base64')}`

// I PDF restano link online (i browser bloccano l'apertura di PDF incorporati): uso quelli pubblici di OMA.
const PDF = {
  './menu/menu-oma.pdf':
    'https://ugc.production.linktr.ee/3e1ac795-ff3d-41ad-a69e-b22bf884b389_menu-oma-AGGIORNATO-17.pdf',
  './menu/vini-e-bevande.pdf':
    'https://ugc.production.linktr.ee/aee91692-5d6a-487a-9b64-cdfe1393ec5e_Vini-e-Bevande-12.pdf',
}

let site = readFileSync('dist-single/index.html', 'utf8')
  // i preload duplicherebbero le immagini incorporate
  .replace(/\s*<link rel="preload" as="image"[^>]*>/g, '')
  .replace(/\s*<link rel="apple-touch-icon"[^>]*>/g, '')
  .replace(/\s*<meta property="og:image"[^>]*>/g, '')
  .replace(/\.\/favicon\.png/g, dataUri('favicon.png'))

for (const [from, to] of Object.entries(PDF)) site = site.replaceAll(from, to)

const images = new Set(site.match(/\.\/img\/[\w.-]+\.(?:webp|png|jpe?g)/g) ?? [])
for (const ref of images) site = site.replaceAll(ref, dataUri(ref.slice(2)))

const out = '../../consegna'
mkdirSync(out, { recursive: true })
writeFileSync(`${out}/OMA_bozza_PC.html`, site)

const b64 = Buffer.from(site, 'utf8').toString('base64')
const logo = dataUri('img/logo-oma.png')
const favicon = dataUri('favicon.png')

const phone = `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#0f0f11" />
<link rel="icon" href="${favicon}" />
<title>OMA Osteria Moderna | Bozza smartphone</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; margin: 0; }
  html, body { height: 100%; background: #0f0f11; color: #f2eee8; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; }
  .stage { min-height: 100%; display: grid; grid-template-columns: minmax(0, 22rem) auto; gap: 5rem; align-items: center; justify-content: center; padding: 2rem; }
  .intro img { width: 9.5rem; display: block; }
  .intro h1 { margin-top: 1.25rem; font-weight: 600; font-size: 2.2rem; line-height: 1.08; letter-spacing: -0.03em; }
  .intro h1 em { font-style: normal; color: #d2772c; }
  .intro p { margin-top: 1.25rem; color: #a7a19b; line-height: 1.6; font-size: 0.95rem; max-width: 30ch; }
  .intro .tag { display: inline-block; margin-top: 2rem; padding: 0.55rem 1rem; border: 1px solid rgb(242 238 232 / 0.2); border-radius: 999px; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: #a7a19b; }
  .phone { --w: 390px; --h: 844px; width: calc(var(--w) + 28px); height: calc(var(--h) + 28px); padding: 14px; border-radius: 58px; background: #08080a;
    box-shadow: 0 0 0 1px #2f2f35, 0 0 0 7px #1b1b1f, 0 40px 90px rgb(0 0 0 / 0.6), 0 0 120px -20px rgb(210 119 44 / 0.25); position: relative; transform-origin: center; }
  .phone::before { content: ""; position: absolute; top: 24px; left: 50%; width: 112px; height: 32px; margin-left: -56px; border-radius: 20px; background: #08080a; z-index: 2; }
  .screen { width: var(--w); height: var(--h); border-radius: 44px; overflow: hidden; background: #08080a; padding-top: 46px; position: relative; }
  .status { position: absolute; top: 0; left: 0; right: 0; height: 46px; display: flex; align-items: center; justify-content: space-between; padding: 6px 30px 0 34px; font-size: 14px; font-weight: 600; color: #f2eee8; }
  .status i { display: inline-block; width: 24px; height: 11px; border: 1.5px solid #f2eee8; border-radius: 3px; position: relative; }
  .status i::after { content: ""; position: absolute; inset: 1.5px 5px 1.5px 1.5px; background: #f2eee8; border-radius: 1px; }
  .phone iframe { width: 100%; height: 100%; border: 0; background: #0f0f11; display: block; }
  @media (max-width: 760px), (pointer: coarse) and (max-width: 1024px) {
    .stage { display: block; padding: 0; }
    .intro { display: none; }
    .phone { width: 100vw; height: 100dvh; padding: 0; border-radius: 0; box-shadow: none; transform: none !important; }
    .phone::before { display: none; }
    .screen { width: 100vw; height: 100dvh; border-radius: 0; padding-top: 0; }
    .status { display: none; }
  }
</style>
</head>
<body>
  <main class="stage">
    <section class="intro">
      <img src="${logo}" alt="OMA" />
      <h1 translate="no">OMA <em>Osteria Moderna</em></h1>
      <p>Bozza del nuovo sito, versione smartphone. Scorri e tocca dentro il telefono come su un vero cellulare.</p>
      <span class="tag">Bozza di presentazione</span>
    </section>
    <div class="phone" id="phone"><div class="screen"><div class="status" aria-hidden="true"><span>9:41</span><i></i></div><iframe id="site" title="Sito OMA Osteria Moderna, versione smartphone"></iframe></div></div>
  </main>
<script>
  (function () {
    var b64 = "${b64}";
    var bin = atob(b64), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    var url = URL.createObjectURL(new Blob([bytes], { type: 'text/html;charset=utf-8' }));
    document.getElementById('site').src = url;
    // Su schermi bassi il telefono viene rimpicciolito per restare tutto visibile.
    function fit() {
      var p = document.getElementById('phone');
      if (window.matchMedia('(max-width: 760px)').matches) { p.style.transform = ''; return; }
      var s = Math.min(1, (window.innerHeight - 48) / 872);
      p.style.transform = 'scale(' + s + ')';
    }
    fit(); window.addEventListener('resize', fit);
  })();
</script>
</body>
</html>`

writeFileSync(`${out}/OMA_bozza_smartphone.html`, phone)
console.log(`bozze create in ${out} (${images.size} immagini incorporate)`)
