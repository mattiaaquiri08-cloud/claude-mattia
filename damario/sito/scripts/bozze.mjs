/*
 * Crea le due bozze da mandare al cliente, file HTML unici apribili offline
 * (servono internet solo la mappa e l'apertura di WhatsApp):
 *  - versione PC: il sito così com'è;
 *  - versione smartphone: su computer mostra il sito dentro una cornice di telefono,
 *    su smartphone lo apre a tutto schermo.
 * Uso: npm run bozze  (crea ../../consegna/DaMario_bozza_PC.html e DaMario_bozza_smartphone.html)
 *
 * Le immagini di public/img sono incorporate in una mappa: un piccolo script sostituisce
 * gli indirizzi ./img/... con le immagini incorporate mentre la pagina si costruisce.
 * Per tenere leggero il file si incorporano solo le WebP (le richieste AVIF ricevono la WebP).
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'

const b64 = (file) => readFileSync(file).toString('base64')
const map = {}
for (const f of readdirSync('public/img')) {
  if (!f.endsWith('.webp')) continue
  const uri = `data:image/webp;base64,${b64(`public/img/${f}`)}`
  map[`./img/${f}`] = uri
  map[`./img/${f.replace('.webp', '.avif')}`] = uri
}

const patch = `<script>
(function () {
  var M = ${JSON.stringify(map)};
  function fix(v) { return v.replace(/\\.\\/img\\/[\\w.-]+/g, function (p) { return M[p] || p }) }
  function walk(n) {
    if (n.nodeType !== 1) return;
    var list = n.matches && n.matches('img,source') ? [n] : [];
    if (n.querySelectorAll) list = list.concat([].slice.call(n.querySelectorAll('img,source')));
    list.forEach(function (el) {
      ['src', 'srcset'].forEach(function (a) { var v = el.getAttribute(a); if (v && v.indexOf('./img/') > -1) el.setAttribute(a, fix(v)) });
    });
  }
  new MutationObserver(function (ms) {
    ms.forEach(function (m) { if (m.type === 'attributes') walk(m.target); else m.addedNodes.forEach(walk) });
  }).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'srcset'] });
})();
</script>`

const favicon = `data:image/svg+xml;base64,${b64('public/favicon.svg')}`
let site = readFileSync('dist-single/index.html', 'utf8')
  .replace(/\s*<link rel="preload" as="image"[^>]*>/g, '')
  .replace(/\s*<link rel="apple-touch-icon"[^>]*>/g, '')
  .replace(/\s*<meta property="og:image"[^>]*>/g, '')
  .replace('./favicon.svg', favicon)
  .replace('<head>', `<head>\n${patch}`)

const out = '../../consegna'
mkdirSync(out, { recursive: true })
writeFileSync(`${out}/DaMario_bozza_PC.html`, site)

const siteB64 = Buffer.from(site, 'utf8').toString('base64')
const phone = `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#0d0e10" />
<link rel="icon" href="${favicon}" />
<title>Ristorante da Mario | Bozza smartphone</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; margin: 0; }
  html, body { height: 100%; background: #0d0e10; color: #ede8e0; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; }
  .stage { min-height: 100%; display: grid; grid-template-columns: minmax(0, 22rem) auto; gap: 5rem; align-items: center; justify-content: center; padding: 2rem; }
  .intro .ristorante { font-size: 0.7rem; letter-spacing: 0.5em; text-transform: uppercase; color: #a7a199; }
  .intro h1 { margin-top: 0.8rem; font-family: "Cormorant Garamond", Georgia, serif; font-weight: 500; font-size: 3.4rem; line-height: 0.95; letter-spacing: 0.03em; }
  .intro .line { display: block; width: 9rem; height: 1px; margin-top: 1.2rem; background: #e3683a; box-shadow: 0 0 14px 1px rgb(227 104 58 / 0.5); }
  .intro .di { margin-top: 1rem; font-family: "Cormorant Garamond", Georgia, serif; font-style: italic; font-size: 1.5rem; color: #ede8e0cc; }
  .intro p.note { margin-top: 1.6rem; color: #a7a199; line-height: 1.6; font-size: 0.95rem; max-width: 30ch; }
  .intro .tag { display: inline-block; margin-top: 2rem; padding: 0.55rem 1rem; border: 1px solid rgb(237 232 224 / 0.2); border-radius: 999px; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: #a7a199; }
  .phone { --w: 390px; --h: 844px; width: calc(var(--w) + 28px); height: calc(var(--h) + 28px); padding: 14px; border-radius: 58px; background: #08080a;
    box-shadow: 0 0 0 1px #2c2d33, 0 0 0 7px #1b1b1f, 0 40px 90px rgb(0 0 0 / 0.6), 0 0 120px -20px rgb(227 104 58 / 0.25); position: relative; transform-origin: center; }
  .phone::before { content: ""; position: absolute; top: 24px; left: 50%; width: 112px; height: 32px; margin-left: -56px; border-radius: 20px; background: #08080a; z-index: 2; }
  .screen { width: var(--w); height: var(--h); border-radius: 44px; overflow: hidden; background: #08080a; padding-top: 46px; position: relative; }
  .status { position: absolute; top: 0; left: 0; right: 0; height: 46px; display: flex; align-items: center; justify-content: space-between; padding: 6px 30px 0 34px; font-size: 14px; font-weight: 600; }
  .status i { display: inline-block; width: 24px; height: 11px; border: 1.5px solid #ede8e0; border-radius: 3px; position: relative; }
  .status i::after { content: ""; position: absolute; inset: 1.5px 5px 1.5px 1.5px; background: #ede8e0; border-radius: 1px; }
  .phone iframe { width: 100%; height: 100%; border: 0; background: #0d0e10; display: block; }
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
    <section class="intro" translate="no">
      <span class="ristorante">Ristorante</span>
      <h1>DA MARIO</h1>
      <span class="line"></span>
      <p class="di">di Valerio Palermo</p>
      <p class="note">Bozza del nuovo sito, versione smartphone. Scorri e tocca dentro il telefono come su un vero cellulare.</p>
      <span class="tag">Bozza di presentazione</span>
    </section>
    <div class="phone" id="phone"><div class="screen"><div class="status" aria-hidden="true"><span>9:41</span><i></i></div><iframe id="site" title="Sito Ristorante da Mario, versione smartphone"></iframe></div></div>
  </main>
<script>
  (function () {
    var bin = atob("${siteB64}"), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    document.getElementById('site').src = URL.createObjectURL(new Blob([bytes], { type: 'text/html;charset=utf-8' }));
    function fit() {
      var p = document.getElementById('phone');
      if (window.matchMedia('(max-width: 760px)').matches) { p.style.transform = ''; return; }
      p.style.transform = 'scale(' + Math.min(1, (window.innerHeight - 48) / 872) + ')';
    }
    fit(); window.addEventListener('resize', fit);
  })();
</script>
</body>
</html>`
writeFileSync(`${out}/DaMario_bozza_smartphone.html`, phone)
console.log(`bozze create in ${out} (${Object.keys(map).length / 2} immagini incorporate)`)
