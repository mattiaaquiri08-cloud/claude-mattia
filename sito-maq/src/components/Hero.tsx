import { motion, useReducedMotion } from "motion/react";
import { OndaPuntini } from "./OndaPuntini";
import { PulsanteBozza, PulsanteSecondario } from "./ui";

export function Hero() {
  const ridotto = useReducedMotion();
  const entra = (ritardo: number) => ({
    initial: ridotto ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: ritardo, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="inizio" className="relative isolate overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 420px at 50% 75%, rgba(124,58,237,.22), transparent 70%), radial-gradient(700px 360px at 78% 35%, rgba(236,72,153,.10), transparent 70%), radial-gradient(600px 300px at 20% 30%, rgba(99,102,241,.10), transparent 70%)",
        }}
      />
      <OndaPuntini className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[62%] w-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-notte" />

      <div className="mx-auto flex min-h-[calc(100dvh-76px)] max-w-4xl flex-col items-center justify-center px-5 pb-24 pt-16 text-center sm:px-8">
        <motion.p
          {...entra(0.1)}
          className="bordo-sfumato rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm"
        >
          Web design a Roma
        </motion.p>

        <motion.h1
          {...entra(0.2)}
          className="mt-8 text-[40px] font-extrabold leading-[1.08] tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          Il sito web che la vostra <span className="testo-sfumato">attività</span> merita
        </motion.h1>

        <motion.p {...entra(0.32)} className="mt-7 max-w-[40ch] text-lg leading-relaxed text-tenue sm:text-xl">
          Realizzo siti web su misura per la vostra attività. Vi presento una bozza gratuita e senza impegno: decidete solo dopo averla vista.
        </motion.p>

        <motion.div {...entra(0.44)} className="mt-11 flex w-full max-w-xl flex-col gap-4 sm:flex-row">
          <PulsanteBozza largo />
          <PulsanteSecondario href="#metodo" largo>
            Come funziona
          </PulsanteSecondario>
        </motion.div>
      </div>
    </section>
  );
}
