import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource-variable/bricolage-grotesque";
import "./style.css";
import { animate, inView, scroll, stagger } from "motion";
import { FrameSequence } from "./sequence";

/* -------------------------------------------------------------------------
 * Configurazione
 * ---------------------------------------------------------------------- */

const FRAMES = 200; // un giro completo, 1,8° per frame
const DEG_PER_FRAME = 360 / FRAMES;
const BASELINE = 0.9667; // dove la base a disco tocca il "pavimento" (frazione dell'altezza)
const FLOOR = 0.06; // spazio sotto il frame per l'ombra a terra
const GLIDE_MS = 750; // passaggio da un dock all'altro
const FRAME_TAU = 0.085; // inerzia della rotazione in secondi: bassa = risposta immediata

const mobile = window.matchMedia("(max-width: 820px)").matches;
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const SET = mobile ? { dir: "m", w: 480, h: 792 } : { dir: "d", w: 600, h: 990 };

/* Coreografia della storia: progresso (0-1) -> dock del palco. */
const STORY_DOCKS: Array<[number, string]> = [
  [0, "hero"],
  [0.06, "hero"],
  [0.17, "close"],
  [0.2, "close"],
  [0.255, "right"],
  [0.59, "right"],
  [0.635, "left"],
  [0.8, "left"],
  [0.845, "mid"],
  [0.91, "mid"],
  [0.955, "right"],
  [1, "right"],
];

/* Rotazione della storia: progresso -> frame "srotolato" (mai modulo qui,
 * così lo scroll all'indietro ripercorre esattamente la stessa rotazione).
 * Alcuni punti fanno coincidere un angolo preciso con la frase giusta:
 * 450 = vista frontale (nome), 540 = testa a cuore (brevetto). */
const STORY_SPIN: Array<[number, number]> = [
  [0, 0],
  [0.2, 232],
  [0.255, 300],
  [0.415, 450],
  [0.545, 540],
  [0.59, 600],
  [0.665, 650],
  [0.76, 760],
  [0.875, 832],
  [1, 900],
];

/* Colori: ogni scena ha uno sfondo e un colore di FLIPPER (tra quelli in cui
 * viene davvero prodotto). Cambiano insieme con lo scroll.
 * Storia: [inizio della scena (progresso), sfondo, colore di FLIPPER]. */
const STORY_COLORS: Array<[number, string, string]> = [
  [0, "#FFD23F", "#1F4C9E"], // giallo / Blu
  [0.1, "#FF8C42", "#3EB3D3"], // arancio / Aqua
  [0.255, "#FF5A5F", "#F0CD2C"], // corallo / Giallo
  [0.345, "#FF7EB6", "#1F4C9E"], // rosa / Blu
  [0.415, "#4FB3FF", "#EE7A2B"], // azzurro / Arancione
  [0.505, "#2EC4B6", "#D2357D"], // turchese / Fucsia
  [0.625, "#7BD86A", "#EF6F5C"], // verde / Corallo
  [0.71, "#FFB627", "#1F4C9E"], // mango / Blu
  [0.835, "#3DCCC7", "#F0CD2C"], // mare / Giallo
  [0.935, "#FFD23F", "#62C6B8"], // giallo / Acqua Marina
];
const COLOR_FADE = 0.035; // durata del passaggio di colore (in progresso della storia)

/* -------------------------------------------------------------------------
 * Utilità
 * ---------------------------------------------------------------------- */

type Rect = { cx: number; cy: number; h: number };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerpRect = (a: Rect, b: Rect, t: number): Rect => ({
  cx: lerp(a.cx, b.cx, t),
  cy: lerp(a.cy, b.cy, t),
  h: lerp(a.h, b.h, t),
});
type RGB = [number, number, number];
/* Colore di FLIPPER: tinta "color" (s = intensità), più due ritocchi per i
 * colori che una tinta non può dare: Bianco (lift) e Nero (dark).
 * metal = 1 solo per Argento e Oro: gli altri colori sono gomma opaca. */
type Tint = { c: RGB; s: number; lift: number; dark: number; metal: number };
const hex = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
const mixRGB = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const mixTint = (a: Tint, b: Tint, t: number): Tint => ({
  c: mixRGB(a.c, b.c, t),
  s: lerp(a.s, b.s, t),
  lift: lerp(a.lift, b.lift, t),
  dark: lerp(a.dark, b.dark, t),
  metal: lerp(a.metal, b.metal, t),
});
const css = (c: RGB) => `rgb(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])})`;
function tintOf(color: string, mode = ""): Tint {
  if (mode === "silver") return { c: [190, 190, 190], s: 0, lift: 0, dark: 0, metal: 1 };
  if (mode === "gold") return { c: hex(color), s: 1, lift: 0, dark: 0, metal: 1 };
  if (mode === "white") return { c: [255, 255, 255], s: 0, lift: 0.5, dark: 0, metal: 0 };
  if (mode === "black") return { c: [30, 30, 30], s: 0, lift: 0, dark: 0.8, metal: 0 };
  return { c: hex(color), s: 1, lift: 0, dark: 0, metal: 0 };
}

const toRect = (r: DOMRect): Rect => ({ cx: r.left + r.width / 2, cy: r.top + r.height / 2, h: r.height });

function piecewise(points: Array<[number, number]>, x: number) {
  if (x <= points[0][0]) return points[0][1];
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i];
    if (x <= x1) {
      const [x0, y0] = points[i - 1];
      return lerp(y0, y1, (x - x0) / (x1 - x0));
    }
  }
  return points[points.length - 1][1];
}

/* -------------------------------------------------------------------------
 * Elementi
 * ---------------------------------------------------------------------- */

const $ = <T extends Element>(s: string, root: ParentNode = document) => root.querySelector(s) as T;
const $$ = <T extends Element>(s: string, root: ParentNode = document) => Array.from(root.querySelectorAll(s)) as T[];

const story = $<HTMLElement>(".story");
const stage = $<HTMLElement>(".stage");
const layer = $<HTMLElement>(".product-layer");
const canvas = $<HTMLCanvasElement>("#product");
const poster = $<HTMLImageElement>(".poster");
const hud = $<HTMLElement>(".hud");
const hudDeg = $<HTMLElement>(".hud-deg");
const steps = $$<HTMLElement>(".step");
const ctx = canvas.getContext("2d", { alpha: true })!;
const bgLayer = $<HTMLElement>(".bg-layer");
const nav = $<HTMLElement>(".nav");
const themeMeta = $<HTMLMetaElement>('meta[name="theme-color"]');
const swatches = $$<HTMLButtonElement>(".swatch");

const stageDocks = new Map<string, HTMLElement>(
  $$<HTMLElement>("[data-stage-dock]").map((el) => [el.dataset.stageDock!, el]),
);
const flowDocks = $$<HTMLElement>("[data-dock]");

type Beat = { inner: HTMLElement; from: number; to: number; o: number; y: number };
const beats: Beat[] = $$<HTMLElement>(".beat").map((el) => ({
  inner: $<HTMLElement>(".beat-in", el),
  from: parseFloat((mobile && el.dataset.inM) || el.dataset.in!),
  to: parseFloat((mobile && el.dataset.outM) || el.dataset.out!),
  o: -1,
  y: 0,
}));

/* -------------------------------------------------------------------------
 * Canvas
 * ---------------------------------------------------------------------- */

const CW = SET.w;
const CH = Math.round(SET.h * (1 + FLOOR));
canvas.width = CW;
canvas.height = CH;
canvas.style.width = `${CW}px`;
canvas.style.height = `${CH}px`;

// Il frame (o i due frame in dissolvenza) si compone prima qui, poi si colora.
const prod = document.createElement("canvas");
prod.width = SET.w;
prod.height = SET.h;
const pctx = prod.getContext("2d")!;

const seq = new FrameSequence(FRAMES, (i) => `frames/${SET.dir}/${String(i).padStart(3, "0")}.webp`);

let drawnKey = "";

function draw(frame: number, tint: Tint) {
  const f = ((frame % FRAMES) + FRAMES) % FRAMES;
  const i0 = Math.floor(f);
  // Dissolvenza tra due frame adiacenti: la rotazione resta continua anche
  // tra un frame e l'altro (1,8°), senza scatti a scroll lento.
  const mix = Math.round((f - i0) * 24) / 24;
  const a = seq.nearest(i0);
  if (!a) return;
  const b = mix > 0 ? seq.exact((i0 + 1) % FRAMES) : null;

  const key = `${seq.has(i0) ? i0 : "x" + seq.loaded}|${b ? mix : 0}|${css(tint.c)}|${tint.s.toFixed(3)}|${tint.lift.toFixed(3)}|${tint.dark.toFixed(3)}|${tint.metal.toFixed(3)}`;
  if (key === drawnKey) return;
  drawnKey = key;

  const { w, h } = SET;
  pctx.globalCompositeOperation = "source-over";
  pctx.clearRect(0, 0, w, h);
  pctx.globalAlpha = b ? 1 - mix : 1;
  pctx.drawImage(a, 0, 0, w, h);
  if (b) {
    pctx.globalCompositeOperation = "lighter";
    pctx.globalAlpha = mix;
    pctx.drawImage(b, 0, 0, w, h);
  }
  pctx.globalAlpha = 1;
  pctx.globalCompositeOperation = "source-over";

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, CW, CH);
  ctx.drawImage(prod, 0, 0);

  // Gomma opaca: si appiattiscono i riflessi dell'argento verso un grigio medio.
  const matte = 1 - tint.metal;
  if (matte > 0.001) {
    ctx.globalCompositeOperation = "source-atop";
    ctx.globalAlpha = 0.6 * matte;
    ctx.fillStyle = "#9a9a9a";
    ctx.fillRect(0, 0, w, h);
  }
  // Colore: la tinta "color" tiene luci e ombre e ne cambia la tinta; sulla
  // gomma un "multiply" in più rende il colore pieno.
  if (tint.s > 0.001) {
    ctx.globalCompositeOperation = "color";
    ctx.globalAlpha = tint.s;
    ctx.fillStyle = css(tint.c);
    ctx.fillRect(0, 0, w, h);
    if (matte > 0.001) {
      ctx.globalCompositeOperation = "multiply";
      ctx.globalAlpha = 0.45 * matte * tint.s;
      ctx.fillRect(0, 0, w, h);
    }
  }
  if (tint.lift > 0.001) {
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = tint.lift;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
  }
  if (tint.dark > 0.001) {
    ctx.globalCompositeOperation = "multiply";
    ctx.globalAlpha = tint.dark;
    ctx.fillStyle = "#2a2a2a";
    ctx.fillRect(0, 0, w, h);
  }
  // Ritaglia di nuovo sulla sagoma del prodotto.
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "destination-in";
  ctx.drawImage(prod, 0, 0);

  // Ombra morbida a terra, dietro al prodotto.
  ctx.globalCompositeOperation = "destination-over";
  const base = h * BASELINE;
  const g = ctx.createRadialGradient(w / 2, base, 0, w / 2, base, w * 0.26);
  g.addColorStop(0, "rgba(0,0,0,0.30)");
  g.addColorStop(0.55, "rgba(0,0,0,0.12)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.save();
  ctx.translate(0, base);
  ctx.scale(1, 0.14);
  ctx.translate(0, -base);
  ctx.fillStyle = g;
  ctx.fillRect(0, base - w * 0.3, w, w * 0.6);
  ctx.restore();
  ctx.globalCompositeOperation = "source-over";
}

/* -------------------------------------------------------------------------
 * Misure (ricalcolate al resize)
 * ---------------------------------------------------------------------- */

let vh = window.innerHeight;
let storyTop = 0;
let storyLen = 1;
const stageRects = new Map<string, Rect>();
let afterSpin: Array<[number, number]> = [];
type ColorPoint = { y: number; bg: RGB; tint: Tint | "pick" };
let colorPoints: ColorPoint[] = [];
let pickedTint: Tint = tintOf("#D2357D"); // Fucsia, finché non si sceglie un colore

function docTop(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY;
}

function measure() {
  vh = window.innerHeight;
  storyTop = docTop(story);
  storyLen = Math.max(1, story.offsetHeight - stage.offsetHeight);

  // I dock del palco sono in coordinate del palco, che quando è fermo
  // coincide con il viewport.
  const s = stage.getBoundingClientRect();
  stageDocks.forEach((el, name) => {
    const r = el.getBoundingClientRect();
    stageRects.set(name, { cx: r.left + r.width / 2 - s.left, cy: r.top + r.height / 2 - s.top, h: r.height });
  });

  // Dopo la storia: la rotazione prosegue a velocità costante e si ferma
  // sugli angoli giusti quando un passaggio è al centro dello schermo
  // (es. "Aggancia" -> testa a cuore). Si sceglie il giro più vicino alla
  // velocità naturale, quindi la rotazione va sempre avanti scrollando giù.
  const rate = FRAMES / (1.5 * vh);
  const start = storyTop + storyLen;
  const pts: Array<[number, number]> = [[start, STORY_SPIN[STORY_SPIN.length - 1][1]]];
  const markers = $$<HTMLElement>("[data-frame]")
    .filter((el) => el.offsetParent !== null || el.getClientRects().length > 0)
    .map((el) => {
      const r = el.getBoundingClientRect();
      return { y: r.top + window.scrollY + r.height / 2 - vh / 2, f: parseFloat(el.dataset.frame!) };
    })
    .filter((m) => m.y > start)
    .sort((a, b) => a.y - b.y);
  for (const m of markers) {
    const [py, pf] = pts[pts.length - 1];
    const ideal = pf + (m.y - py) * rate;
    let k = Math.round((ideal - m.f) / FRAMES);
    let target = m.f + k * FRAMES;
    if (target <= pf + 20) target += FRAMES * Math.ceil((pf + 20 - target) / FRAMES);
    pts.push([m.y, target]);
  }
  const [ly, lf] = pts[pts.length - 1];
  pts.push([ly + vh * 20, lf + vh * 20 * rate]);
  afterSpin = pts;

  // Colori: punti [scroll, sfondo, tinta]. Nella storia seguono il progresso;
  // dopo, ogni sezione con data-bg entra con un passaggio di mezzo schermo.
  const cps: ColorPoint[] = [];
  STORY_COLORS.forEach(([p0, bg, t], i) => {
    const y = storyTop + p0 * storyLen;
    const fadeStart = i === 0 ? y : y - COLOR_FADE * storyLen;
    if (i > 0) cps.push({ y: fadeStart, bg: cps[cps.length - 1].bg, tint: cps[cps.length - 1].tint });
    cps.push({ y, bg: hex(bg), tint: tintOf(t) });
  });
  for (const el of $$<HTMLElement>("[data-bg]")) {
    const top = docTop(el);
    const prev = cps[cps.length - 1];
    const tint = el.dataset.tint === "pick" ? "pick" : tintOf(el.dataset.tint ?? "#1F4C9E");
    cps.push({ y: Math.max(prev.y + 1, top - vh * 0.8), bg: prev.bg, tint: prev.tint });
    cps.push({ y: Math.max(prev.y + 2, top - vh * 0.35), bg: hex(el.dataset.bg!), tint });
  }
  colorPoints = cps;
}

function colorsAt(y: number): { bg: RGB; tint: Tint } {
  const resolve = (t: Tint | "pick") => (t === "pick" ? pickedTint : t);
  const pts = colorPoints;
  if (y <= pts[0].y) return { bg: pts[0].bg, tint: resolve(pts[0].tint) };
  for (let i = 1; i < pts.length; i++) {
    if (y <= pts[i].y) {
      const a = pts[i - 1];
      const b = pts[i];
      const t = easeInOut((y - a.y) / (b.y - a.y));
      return { bg: mixRGB(a.bg, b.bg, t), tint: mixTint(resolve(a.tint), resolve(b.tint), t) };
    }
  }
  const last = pts[pts.length - 1];
  return { bg: last.bg, tint: resolve(last.tint) };
}

/* -------------------------------------------------------------------------
 * Stato per frame
 * ---------------------------------------------------------------------- */

let scrollY = window.scrollY;
let frameNow = 0;
let activeDock: string | HTMLElement = "story";
let glideFrom: Rect | null = null;
let glideStart = 0;
let shown: Rect = { cx: 0, cy: 0, h: 0 };
let fadeOut = 0; // solo reduced motion: dissolvenza al cambio di posizione
let lastStoryDock = "hero";

function storyProgress(y: number) {
  return (y - storyTop) / storyLen;
}

function targetFrame(y: number) {
  if (reduced) return 140; // testa a cuore, ferma
  const p = storyProgress(y);
  if (p <= 1) return piecewise(STORY_SPIN, clamp(p));
  return piecewise(afterSpin, y);
}

function storyRect(p: number): Rect {
  const q = clamp(p);
  if (reduced) {
    // Niente spostamenti animati: posizione a gradini, con dissolvenza.
    let name = STORY_DOCKS[0][1];
    for (const [at, n] of STORY_DOCKS) if (q >= at) name = n;
    return stageRects.get(name)!;
  }
  for (let i = 1; i < STORY_DOCKS.length; i++) {
    const [p1, n1] = STORY_DOCKS[i];
    if (q <= p1) {
      const [p0, n0] = STORY_DOCKS[i - 1];
      const t = p1 === p0 ? 1 : easeInOut((q - p0) / (p1 - p0));
      return lerpRect(stageRects.get(n0)!, stageRects.get(n1)!, t);
    }
  }
  return stageRects.get("right")!;
}

function pickDock(): string | HTMLElement {
  const mid = vh / 2;
  const s = story.getBoundingClientRect();
  if (s.top <= mid && s.bottom > mid) return "story";
  let best: HTMLElement | null = null;
  let bestArea = Infinity;
  for (const d of flowDocks) {
    if (d.offsetWidth === 0) continue; // dock non usato a questa larghezza
    const region = d.parentElement!.closest<HTMLElement>("[data-region]") ?? d.parentElement!;
    const r = region.getBoundingClientRect();
    if (r.top <= mid && r.bottom > mid && r.height < bestArea) {
      best = d;
      bestArea = r.height;
    }
  }
  return best ?? activeDock;
}

function dockRect(d: string | HTMLElement): Rect {
  if (d === "story") return storyRect(storyProgress(scrollY));
  return toRect((d as HTMLElement).getBoundingClientRect());
}

/* -------------------------------------------------------------------------
 * Loop di rendering: gira solo quando serve.
 * ---------------------------------------------------------------------- */

let running = false;
let lastT = 0;
let lastTransform = "";
let lastBg = "";
let lastMetaT = 0;

function tick(t: number) {
  const dt = lastT ? Math.min(0.1, (t - lastT) / 1000) : 1 / 60;
  lastT = t;
  scrollY = window.scrollY;

  // 1. Rotazione: funzione diretta dello scroll, con una minima inerzia.
  const fTarget = targetFrame(scrollY);
  const k = 1 - Math.exp(-dt / FRAME_TAU);
  frameNow += (fTarget - frameNow) * k;
  if (Math.abs(fTarget - frameNow) < 0.004) frameNow = fTarget;

  // 2. Posizione: segue il dock attivo; i cambi di dock sono planate.
  const next = pickDock();
  if (next !== activeDock) {
    glideFrom = { ...shown };
    glideStart = t;
    activeDock = next;
  }
  let target = dockRect(activeDock);
  let gliding = false;

  if (reduced) {
    const storyName = activeDock === "story" ? nearestStoryDockName() : "";
    if (storyName && storyName !== lastStoryDock) {
      glideFrom = { ...shown };
      glideStart = t;
      lastStoryDock = storyName;
    }
    if (glideFrom) {
      const e = (t - glideStart) / 500;
      if (e < 1) {
        gliding = true;
        fadeOut = e < 0.5 ? e * 2 : (1 - e) * 2;
        if (e < 0.5) target = glideFrom;
      } else {
        glideFrom = null;
        fadeOut = 0;
      }
    }
  } else if (glideFrom) {
    const e = (t - glideStart) / GLIDE_MS;
    if (e < 1) {
      gliding = true;
      target = lerpRect(glideFrom, target, easeInOut(e));
    } else {
      glideFrom = null;
    }
  }
  shown = target;

  // Tutte le letture di layout sono finite: da qui in poi solo scritture.
  const step = nearestStep();

  const scale = shown.h / SET.h;
  const x = shown.cx - (SET.w * scale) / 2;
  const y = shown.cy - shown.h / 2;
  const tf = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
  if (tf !== lastTransform) {
    canvas.style.transform = tf;
    lastTransform = tf;
  }
  canvas.style.opacity = reduced ? String(1 - fadeOut) : "";

  const col = colorsAt(scrollY);
  draw(frameNow, col.tint);
  const bgCss = css(col.bg);
  if (bgCss !== lastBg) {
    bgLayer.style.backgroundColor = bgCss;
    nav.style.setProperty("--nav-bg", bgCss);
    lastBg = bgCss;
  }
  if (!running || t - lastMetaT > 250) {
    themeMeta.content = bgCss;
    lastMetaT = t;
  }

  // 3. Testi della storia.
  const p = storyProgress(scrollY);
  updateBeats(p);

  // 4. Indicatore dei gradi, solo durante la storia.
  const deg = Math.round((((frameNow % FRAMES) + FRAMES) % FRAMES) * DEG_PER_FRAME) % 360;
  if (hudDeg.textContent !== String(deg)) hudDeg.textContent = String(deg);
  hud.classList.toggle("is-on", p > 0.02 && p < 0.985);

  // 5. Passaggi del "come funziona".
  setStep(step);

  const settled = frameNow === fTarget && !gliding;
  if (!settled) {
    requestAnimationFrame(tick);
  } else {
    running = false;
    lastT = 0;
  }
}

function nearestStoryDockName() {
  const q = clamp(storyProgress(scrollY));
  let name = STORY_DOCKS[0][1];
  for (const [at, n] of STORY_DOCKS) if (q >= at) name = n;
  return name;
}

function kick() {
  if (running) return;
  running = true;
  requestAnimationFrame(tick);
}

/* Frasi della storia: entrano dal basso, escono verso l'alto. */
function updateBeats(p: number) {
  const fade = mobile ? 0.022 : 0.018;
  for (const b of beats) {
    const a = clamp((p - b.from) / fade);
    const z = clamp((b.to - p) / fade);
    const o = Math.min(a, z);
    const y = reduced ? 0 : a < 1 ? (1 - easeInOut(a)) * 28 : -(1 - easeInOut(z)) * 20;
    const or = Math.round(o * 1000) / 1000;
    const yr = Math.round(y * 10) / 10;
    if (or === b.o && yr === b.y) continue;
    b.o = or;
    b.y = yr;
    b.inner.style.opacity = String(or);
    b.inner.style.transform = yr ? `translate3d(0, ${yr}px, 0)` : "";
    b.inner.style.visibility = or === 0 ? "hidden" : "";
  }
}

let activeStep: HTMLElement | null = null;
function nearestStep() {
  let best: HTMLElement | null = null;
  let bestD = Infinity;
  for (const s of steps) {
    const r = s.getBoundingClientRect();
    const d = Math.abs(r.top + r.height / 2 - vh / 2);
    if (d < bestD) {
      bestD = d;
      best = s;
    }
  }
  return bestD > vh * 0.45 ? null : best;
}

function setStep(best: HTMLElement | null) {
  if (best !== activeStep) {
    activeStep?.classList.remove("is-active");
    best?.classList.add("is-active");
    activeStep = best;
  }
}

/* -------------------------------------------------------------------------
 * Avvio
 * ---------------------------------------------------------------------- */

function start() {
  measure();
  frameNow = targetFrame(window.scrollY);
  activeDock = pickDock();
  shown = dockRect(activeDock);
  lastStoryDock = nearestStoryDockName();

  // Lo scroll (via Motion) è l'unico motore: nessun autoplay.
  scroll(() => kick());

  const ro = new ResizeObserver(() => {
    measure();
    kick();
  });
  ro.observe(document.body);
  window.addEventListener("resize", () => {
    measure();
    kick();
  });

  // Il poster resta finché il canvas non ha il primo frame, poi passa la mano.
  seq.ready.then(() => {
    draw(frameNow, colorsAt(window.scrollY).tint);
    const handoff = () => {
      layer.style.opacity = "1";
      poster.classList.add("is-hidden");
    };
    // L'argento del poster si "accende" nel colore della prima scena.
    handoff();
    kick();
  });
  seq.onProgress = () => kick();

  // Sezione Colori: toccando un colore, FLIPPER si colora così.
  for (const sw of swatches) {
    sw.addEventListener("click", () => {
      pickedTint = tintOf(sw.dataset.color!, sw.dataset.mode);
      for (const o of swatches) o.setAttribute("aria-pressed", String(o === sw));
      drawnKey = "";
      kick();
    });
  }
  seq.load();

  kick();
  intro();
  reveals();
}

function intro() {
  if (reduced) return;
  animate(".nav", { opacity: [0, 1] }, { duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] });
  animate(
    ".beat--hero .beat-in > *, .beat--meta .beat-in > *",
    { opacity: [0, 1], transform: ["translateY(10px)", "translateY(0)"] },
    { duration: 1.1, delay: stagger(0.12, { startDelay: 0.7 }), ease: [0.16, 1, 0.3, 1] },
  );
}

function reveals() {
  if (reduced) return;
  inView(
    "[data-reveal]",
    (el) => {
      animate(el, { opacity: 1, transform: "translateY(0px)" }, { duration: 0.9, ease: [0.16, 1, 0.3, 1] });
    },
    { amount: 0.4 },
  );
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
else start();
