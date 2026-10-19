import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { LOGO_BUBBLES, LOGO_FISH, LOGO_TAGLINE, LOGO_WORD } from "../data/logo-paths";
import { DISC } from "./Logo";
import { SINGLE_FILE } from "./Photo";

/** il sipario comincia ad alzarsi: parte l'ingresso della hero (vedi .hero-zoom e .hero-cta) */
const startLeaving = () => {
  if (document.documentElement.dataset.splash !== "skip") document.documentElement.dataset.splash = "leaving";
};

/*
  Splash di ~3 secondi costruita sul logo originale.
  Sequenza: il disco verde petrolio si apre, il pesce-calice entra nuotando,
  salgono le bollicine, la scritta NANÀ si svela, una corona di gelsomino si disegna attorno.
  L'ingresso è in CSS puro (parte appena arriva l'HTML, prima di React);
  l'uscita è gestita da Motion: il sipario crema si alza e scopre la hero.
  Viene mostrata una volta per sessione; ?splash nell'indirizzo la forza.
*/

const TOTAL_MS = 3000;
const EXIT_S = 0.75;

const CX = DISC.cx;
const CY = DISC.cy;
const R = DISC.r + 30;

// corona di foglie attorno al disco, calcolata una volta (identica su server e client)
const wreath = (() => {
  const items: { x: number; y: number; r: number; d: number }[] = [];
  const steps = 8;
  for (const side of [-1, 1]) {
    for (let i = 0; i < steps; i++) {
      const deg = 90 + side * (16 + i * 14);
      const rad = (deg * Math.PI) / 180;
      const out = i % 2 === 0 ? 1 : -1;
      const x = CX + Math.cos(rad) * R;
      const y = CY + Math.sin(rad) * R;
      const tangent = deg + side * 90;
      items.push({ x, y, r: tangent + out * 30 * side, d: 0.75 + i * 0.08 });
    }
  }
  return items;
})();

const arc = (fromDeg: number, toDeg: number, sweep: 0 | 1) => {
  const p = (deg: number) => [CX + Math.cos((deg * Math.PI) / 180) * R, CY + Math.sin((deg * Math.PI) / 180) * R].map((n) => n.toFixed(2)).join(" ");
  return `M${p(fromDeg)} A ${R} ${R} 0 0 ${sweep} ${p(toDeg)}`;
};

const LEAF = "M0 0 C 5 -5.2, 12.5 -5.2, 17 0 C 12.5 5.2, 5 5.2, 0 0 Z";

export function Splash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const forced = new URLSearchParams(window.location.search).has("splash");
    if (!forced && root.dataset.splash === "skip") {
      setVisible(false);
      return;
    }
    try {
      sessionStorage.setItem("nana-splash-seen", "1");
    } catch {
      /* archiviazione non disponibile: la splash resta comunque breve */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 1200 : TOTAL_MS;
    // il conteggio parte da quando la splash è comparsa: con l'HTML prerenderizzato è l'apertura
    // della pagina; nella versione "file unico" la splash compare solo quando React è pronto
    const elapsed = forced || SINGLE_FILE ? 0 : performance.now();
    const wait = Math.max(300, total - EXIT_S * 1000 - elapsed);
    const timer = window.setTimeout(() => {
      startLeaving();
      setVisible(false);
    }, wait);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (document.documentElement.dataset.splash === "leaving") document.documentElement.dataset.splash = "done";
      }}
    >
      {visible ? (
        <motion.div
          key="splash"
          className="splash fixed inset-0 z-[70] grid place-items-center bg-crema"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: EXIT_S, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => {
            startLeaving();
            setVisible(false);
          }}
          aria-hidden
        >
          <motion.svg
            viewBox={`${CX - R - 22} ${CY - R - 22} ${2 * R + 44} ${2 * R + 44}`}
            className="w-[min(80vw,380px)] overflow-visible"
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: EXIT_S * 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* corona di gelsomino */}
            <g className="text-petrol-400" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
              <path className="splash-draw" pathLength={1} d={arc(90, 205, 1)} />
              <path className="splash-draw" pathLength={1} d={arc(90, -25, 0)} />
              {wreath.map((l, i) => (
                <g key={i} transform={`translate(${l.x.toFixed(2)} ${l.y.toFixed(2)}) rotate(${l.r.toFixed(1)}) scale(0.8)`}>
                  <path className="splash-leaf" style={{ animationDelay: `${l.d}s` }} d={LEAF} />
                </g>
              ))}
              {[205, -25].map((deg) => (
                <g
                  key={deg}
                  transform={`translate(${(CX + Math.cos((deg * Math.PI) / 180) * R).toFixed(2)} ${(CY + Math.sin((deg * Math.PI) / 180) * R).toFixed(2)}) scale(0.85)`}
                >
                  <g className="splash-bloom" style={{ animationDelay: "1.55s" }}>
                    {[0, 72, 144, 216, 288].map((r) => (
                      <ellipse key={r} cx="0" cy="-6" rx="3" ry="5.6" transform={`rotate(${r})`} />
                    ))}
                    <circle r="1.8" className="fill-petalo stroke-none" />
                  </g>
                </g>
              ))}
            </g>

            {/* logo originale, scomposto nelle sue parti */}
            <circle {...DISC} className="splash-disc fill-petrol-600" />
            <g className="text-bianco" fill="currentColor">
              {LOGO_FISH.map((d, i) => (
                <path key={`f${i}`} className="splash-fish" d={d} />
              ))}
              {LOGO_BUBBLES.map((d, i) => (
                <path key={`b${i}`} className="splash-bubble" style={{ animationDelay: `${1.05 + [1, 2, 0][i] * 0.14}s` }} d={d} />
              ))}
              {LOGO_WORD.map((d, i) => (
                <path key={`w${i}`} className="splash-letter" style={{ animationDelay: `${0.55 + i * 0.1}s` }} d={d} />
              ))}
              {LOGO_TAGLINE.map((d, i) => (
                <path key={`t${i}`} className="splash-sub" d={d} />
              ))}
            </g>
          </motion.svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
