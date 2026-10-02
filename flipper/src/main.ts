import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./style.css";
import { animate, inView, scroll, stagger } from "motion";
import { FrameSequence } from "./sequence";

/* -------------------------------------------------------------------------
 * Configurazione
 * ---------------------------------------------------------------------- */

const FRAMES = 200; // un giro completo, 1,8° per frame
const DEG_PER_FRAME = 360 / FRAMES;
const BASELINE = 0.9667; // dove la base a disco tocca il "pavimento" (frazione dell'altezza)
const REFLECTION = 0.24; // altezza del riflesso, frazione dell'altezza del frame
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
const CH = Math.round(SET.h * (1 + REFLECTION));
canvas.width = CW;
canvas.height = CH;
canvas.style.width = `${CW}px`;
canvas.style.height = `${CH}px`;

const seq = new FrameSequence(FRAMES, (i) => `frames/${SET.dir}/${String(i).padStart(3, "0")}.webp`);

let drawnFrame = -1;
let drawnMix = -1;

function draw(frame: number) {
  const f = ((frame % FRAMES) + FRAMES) % FRAMES;
  const i0 = Math.floor(f);
  // Crossfade tra due frame adiacenti: la rotazione resta continua anche
  // tra un frame e l'altro (1,8°), senza scatti a scroll lento.
  const mix = Math.round((f - i0) * 24) / 24;
  if (i0 === drawnFrame && mix === drawnMix) return;

  const a = seq.nearest(i0);
  if (!a) return;
  const b = mix > 0 ? seq.exact((i0 + 1) % FRAMES) : null;

  const { w, h } = SET;
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.clearRect(0, 0, CW, CH);
  ctx.drawImage(a, 0, 0, w, h);
  if (b) {
    ctx.globalAlpha = mix;
    ctx.drawImage(b, 0, 0, w, h);
  }

  // Riflesso sul pavimento dello studio: specchia il frame sotto la base
  // e lo dissolve verso il basso.
  const base = h * BASELINE;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, base, w, CH - base);
  ctx.clip();
  ctx.translate(0, base * 2);
  ctx.scale(1, -1);
  ctx.globalAlpha = 0.17;
  ctx.drawImage(a, 0, 0, w, h);
  if (b) {
    ctx.globalAlpha = 0.17 * mix;
    ctx.drawImage(b, 0, 0, w, h);
  }
  ctx.restore();

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "destination-out";
  const g = ctx.createLinearGradient(0, base, 0, base + h * REFLECTION * 0.9);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,1)");
  ctx.fillStyle = g;
  ctx.fillRect(0, base, w, CH - base);
  ctx.globalCompositeOperation = "source-over";

  drawnFrame = seq.has(i0) ? i0 : -1;
  drawnMix = b ? mix : 0;
}

/* -------------------------------------------------------------------------
 * Misure (ricalcolate al resize)
 * ---------------------------------------------------------------------- */

let vh = window.innerHeight;
let storyTop = 0;
let storyLen = 1;
const stageRects = new Map<string, Rect>();
let afterSpin: Array<[number, number]> = [];

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

  draw(frameNow);

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
    draw(frameNow);
    const handoff = () => {
      layer.style.opacity = "1";
      poster.classList.add("is-hidden");
    };
    if (reduced || window.scrollY > 4) handoff();
    else {
      const done = () => handoff();
      poster.getAnimations().length ? Promise.all(poster.getAnimations().map((a) => a.finished)).then(done, done) : done();
      scroll(() => {
        if (window.scrollY > 4) handoff();
      });
    }
    kick();
  });
  seq.onProgress = () => {
    drawnFrame = -1;
    kick();
  };
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
