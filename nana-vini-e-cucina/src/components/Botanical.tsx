import { motion, useReducedMotion } from "motion/react";

/*
  Dettagli floreali di Nanà: un rametto di gelsomino disegnato a filo,
  come il rampicante che corre sotto la tenda del dehors.
  Pochi tratti, tono su tono, usati con parsimonia.
*/

type SprigProps = {
  className?: string;
  /** disegna il tratto quando entra nello schermo */
  draw?: boolean;
  flip?: boolean;
  title?: string;
};

const LEAF = "M0 0 C 4 -4.2, 10 -4.2, 14 0 C 10 4.2, 4 4.2, 0 0 Z";

const leaves: { x: number; y: number; r: number; s: number }[] = [
  { x: 22, y: 47, r: -48, s: 1 },
  { x: 38, y: 40, r: 32, s: 0.9 },
  { x: 58, y: 33, r: -38, s: 1.05 },
  { x: 77, y: 29, r: 28, s: 0.85 },
  { x: 96, y: 27, r: -30, s: 0.95 },
  { x: 118, y: 28, r: 26, s: 0.8 },
];

function Blossom({ x, y, size = 1, delay = 0, animate }: { x: number; y: number; size?: number; delay?: number; animate: boolean }) {
  return (
    <motion.g
      transform={`translate(${x} ${y}) scale(${size})`}
      initial={animate ? { opacity: 0, scale: 0.6 } : false}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="0" cy="-4.6" rx="2.3" ry="4.4" transform={`rotate(${r})`} />
      ))}
      <circle r="1.3" className="fill-petalo stroke-none" />
    </motion.g>
  );
}

export function Sprig({ className = "", draw = true, flip = false, title }: SprigProps) {
  const reduce = useReducedMotion();
  const animate = draw && !reduce;

  return (
    <svg
      viewBox="0 0 150 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <motion.path
        d="M4 56 C 30 44, 52 32, 80 28 S 128 26, 146 30"
        initial={animate ? { pathLength: 0 } : false}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      />
      {leaves.map((l, i) => (
        <motion.path
          key={i}
          d={LEAF}
          transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}
          initial={animate ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.25 + i * 0.12 }}
        />
      ))}
      <g className="fill-bianco/0">
        <Blossom x={140} y={22} size={1.05} delay={1} animate={animate} />
        <Blossom x={68} y={22} size={0.75} delay={1.15} animate={animate} />
      </g>
    </svg>
  );
}

/** Ghirlanda orizzontale di foglioline, come quelle che affiancano i titoli del menù cartaceo. */
export function Garland({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const pairs = [10, 24, 38, 52, 66];
  return (
    <svg
      viewBox="0 0 96 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    >
      <path d="M2 8 H 90" />
      {pairs.map((x) => (
        <g key={x}>
          <path d={`M${x} 8 C ${x + 2} 3.5, ${x + 6} 2.5, ${x + 9} 3 C ${x + 7} 5.5, ${x + 4} 7.5, ${x} 8 Z`} />
          <path d={`M${x + 3} 8 C ${x + 5} 12.5, ${x + 9} 13.5, ${x + 12} 13 C ${x + 10} 10.5, ${x + 7} 8.5, ${x + 3} 8 Z`} />
        </g>
      ))}
      <path d="M86 4.5 L 91 8 L 86 11.5" />
    </svg>
  );
}

/** Piccolo fiore isolato, per separatori e dettagli del menù. */
export function Blossom5({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-8 -8 16 16" fill="none" stroke="currentColor" strokeWidth="0.9" className={className} aria-hidden>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="0" cy="-3.6" rx="1.8" ry="3.4" transform={`rotate(${r})`} />
      ))}
      <circle r="1" className="fill-petalo stroke-none" />
    </svg>
  );
}
