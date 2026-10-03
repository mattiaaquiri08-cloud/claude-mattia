/*
 * Crea le due bozze da inviare, entrambe file HTML unici apribili offline:
 *  - versione PC: il sito così com'è;
 *  - versione smartphone: su computer mostra il sito dentro una cornice di telefono,
 *    su smartphone lo apre a tutto schermo.
 * Uso: npm run bozze  (dopo npm run build:single)
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const favicon = 'data:image/svg+xml;base64,' + readFileSync('public/favicon.svg').toString('base64')
// Nel file unico l'icona va incorporata, altrimenti offline non si trova.
const site = readFileSync('dist-single/index.html', 'utf8').replace(/href="\.?\/?favicon\.svg"/, `href="${favicon}"`)
const out = '../consegna'
mkdirSync(out, { recursive: true })

writeFileSync(`${out}/Exotique-Estetique_bozza_PC.html`, site)

const b64 = Buffer.from(site, 'utf8').toString('base64')

const phone = `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#151414" />
<link rel="icon" href="${favicon}" />
<title>Exotique &amp; Estetique | Bozza smartphone</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; margin: 0; }
  html, body { height: 100%; background: #151414; color: #eeebe6; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; }
  .stage { min-height: 100%; display: grid; grid-template-columns: minmax(0, 22rem) auto; gap: 5rem; align-items: center; justify-content: center; padding: 2rem; }
  .intro h1 { font-family: Didot, "Bodoni 72", "Bodoni MT", Georgia, serif; font-weight: 400; font-size: 2.6rem; line-height: 1.05; letter-spacing: -0.02em; }
  .intro h1 em { color: #dd3f33; }
  .intro p { margin-top: 1.25rem; color: #a9a49e; line-height: 1.6; font-size: 0.95rem; max-width: 30ch; }
  .intro .tag { display: inline-block; margin-top: 2rem; padding: 0.5rem 0.9rem; border: 1px solid rgb(238 235 230 / 0.2); font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: #a9a49e; }
  .phone { --w: 390px; --h: 844px; width: calc(var(--w) + 28px); height: calc(var(--h) + 28px); padding: 14px; border-radius: 58px; background: #0b0a0a;
    box-shadow: 0 0 0 1px #2a2826, 0 0 0 7px #1c1b1a, 0 40px 90px rgb(0 0 0 / 0.55); position: relative; transform-origin: center; }
  .phone::before { content: ""; position: absolute; top: 24px; left: 50%; width: 112px; height: 32px; margin-left: -56px; border-radius: 20px; background: #0b0a0a; z-index: 2; }
  .screen { width: var(--w); height: var(--h); border-radius: 44px; overflow: hidden; background: #0b0a0a; padding-top: 46px; position: relative; }
  .status { position: absolute; top: 0; left: 0; right: 0; height: 46px; display: flex; align-items: center; justify-content: space-between; padding: 6px 30px 0 34px; font-size: 14px; font-weight: 600; color: #eeebe6; }
  .status i { display: inline-block; width: 24px; height: 11px; border: 1.5px solid #eeebe6; border-radius: 3px; position: relative; }
  .status i::after { content: ""; position: absolute; inset: 1.5px 5px 1.5px 1.5px; background: #eeebe6; border-radius: 1px; }
  .phone iframe { width: 100%; height: 100%; border: 0; background: #151414; display: block; }
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
      <h1>Exotique <em>&amp;</em> Estetique</h1>
      <p>Bozza del nuovo sito, versione smartphone. Scorri e tocca dentro il telefono come su un vero cellulare.</p>
      <span class="tag">Bozza di presentazione</span>
    </section>
    <div class="phone" id="phone"><div class="screen"><div class="status" aria-hidden="true"><span>9:41</span><i></i></div><iframe id="site" title="Sito Exotique &amp; Estetique, versione smartphone"></iframe></div></div>
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

writeFileSync(`${out}/Exotique-Estetique_bozza_smartphone.html`, phone)
console.log('bozze create in', out)
