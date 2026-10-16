import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { Appare } from "./ui";

type Numero = { valore: number; prima?: string; dopo?: string; testo: string };

const NUMERI: Numero[] = [
  { valore: 0, dopo: " €", testo: "Il costo della bozza del vostro sito" },
  { valore: 1, dopo: " sì", testo: "Tutto quello che serve per iniziare" },
  { valore: 24, dopo: "/7", testo: "Il sito lavora per voi, anche a negozio chiuso" },
  { valore: 100, dopo: "%", testo: "Su misura, perfetto anche sul telefono" },
];

function Contatore({ valore, prima = "", dopo = "" }: Numero) {
  const rif = useRef<HTMLSpanElement>(null);
  const inVista = useInView(rif, { once: true, amount: 0.6 });
  const ridotto = useReducedMotion();
  const mv = useMotionValue(ridotto ? valore : 0);
  const testo = useTransform(mv, (v) => `${prima}${Math.round(v)}${dopo}`);

  useEffect(() => {
    if (!inVista || ridotto) return;
    const c = animate(mv, valore, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [inVista, ridotto, mv, valore]);

  return (
    <motion.span ref={rif} className="testo-sfumato text-5xl font-extrabold tracking-tight tabular-nums sm:text-6xl">
      {testo}
    </motion.span>
  );
}

export function Numeri() {
  return (
    <section className="px-5 sm:px-8" aria-label="MAQ in numeri">
      <Appare className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-[28px] border border-linea bg-scheda sm:grid-cols-2 lg:grid-cols-4">
        {NUMERI.map((n, i) => (
          <div
            key={n.testo}
            className={`flex flex-col items-center px-6 py-12 text-center ${
              i > 0 ? "border-t border-linea sm:border-t-0" : ""
            } ${i % 2 === 1 ? "sm:border-l sm:border-linea" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${
              i === 2 ? "lg:border-l lg:border-linea" : ""
            }`}
          >
            <Contatore {...n} />
            <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-tenue">{n.testo}</p>
          </div>
        ))}
      </Appare>
    </section>
  );
}
