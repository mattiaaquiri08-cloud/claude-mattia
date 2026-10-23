import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Comparsa, TitoloSezione } from "./ui";

const PASSI = [
  {
    titolo: "Ascolto",
    testo: "Famiglia, redditi, spese, capacità di risparmio. Fissiamo obiettivi concreti, ognuno con il suo orizzonte.",
  },
  {
    titolo: "Diagnosi",
    testo: "Analizzo gli investimenti che hai già: qualità, costi, rischio e come si sarebbero potuti comportare meglio.",
  },
  {
    titolo: "Piano su misura",
    testo: "Goal-based investing: un portafoglio per ogni obiettivo, con strategie e aspettative chiare da subito.",
  },
  {
    titolo: "Monitoraggio",
    testo: "Report chiari e incontri periodici. Se cambiano i mercati o la tua vita, il piano si adatta.",
  },
];

export default function Metodo() {
  const ref = useRef<HTMLOListElement>(null);
  const ridotto = useReducedMotion();
  // la linea si riempie mentre la sezione attraversa lo schermo: racconta il percorso in ordine
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const avanzamento = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="metodo" className="mx-auto max-w-[1280px] px-4 py-20 md:px-8 md:py-28">
      <TitoloSezione
        titolo="Il metodo, in quattro passi"
        testo="Si investe con uno scopo, non per moda. E non sei mai lasciato solo."
      />

      <ol ref={ref} className="relative mt-14 grid gap-10 pl-10 md:grid-cols-4 md:gap-8 md:pl-0 md:pt-12">
        {/* binario: verticale sul telefono, orizzontale dal tablet in su */}
        <span aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-px bg-linea md:inset-x-0 md:bottom-auto md:left-0 md:top-[11px] md:h-px md:w-auto" />
        <motion.span
          aria-hidden="true"
          style={ridotto ? undefined : { scaleY: avanzamento }}
          className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-accento md:hidden"
        />
        <motion.span
          aria-hidden="true"
          style={ridotto ? undefined : { scaleX: avanzamento }}
          className="absolute inset-x-0 top-[11px] hidden h-px origin-left bg-accento md:block"
        />

        {PASSI.map((p, i) => (
          <li key={p.titolo} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-10 top-0.5 flex size-[23px] items-center justify-center rounded-full bg-sfondo ring-1 ring-accento md:-top-12 md:left-0"
            >
              <span className="size-2 rounded-full bg-accento" />
            </span>
            <Comparsa ritardo={i * 0.08}>
              <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-testo">{p.titolo}</h3>
              <p className="mt-2 text-[1rem] leading-relaxed text-testo-2">{p.testo}</p>
            </Comparsa>
          </li>
        ))}
      </ol>
    </section>
  );
}
