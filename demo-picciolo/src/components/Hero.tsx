import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { RITARDO_INGRESSO } from "../avvio";
import { EASE, Pulsante, useMotivo } from "./ui";

export default function Hero() {
  const ridotto = useReducedMotion();
  const { richiedi } = useMotivo();
  const entra = (i: number) =>
    ridotto
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: RITARDO_INGRESSO + 0.1 + i * 0.09, ease: EASE },
        };

  return (
    <section id="inizio" className="relative overflow-hidden pt-16 md:pt-[72px]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 pb-10 pt-8 md:px-8 md:pt-10 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pb-14">
        <div>
          <motion.p {...entra(0)} className="text-[0.95rem] font-medium text-accento">
            Consulente finanziario e patrimoniale
          </motion.p>
          <motion.h1
            {...entra(1)}
            className="mt-4 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.045em] text-testo sm:text-[3.4rem] lg:text-[4.4rem]"
          >
            Obiettivo serenità per i tuoi risparmi.
          </motion.h1>
          <motion.p {...entra(2)} className="mt-6 max-w-[34rem] text-[1.1rem] leading-relaxed text-testo-2 md:text-[1.2rem]">
            Gestisco e proteggo patrimoni da oltre 25 anni: costi chiari, rischi sotto controllo, nessuna dritta del
            momento.
          </motion.p>
          <motion.div {...entra(3)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Pulsante
              href="#contatti"
              onClick={() => richiedi("diagnosi")}
              className="group"
            >
              Diagnosi gratuita
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Pulsante>
            <Pulsante href="#libro" variante="contorno">
              Scopri il libro
            </Pulsante>
          </motion.div>
        </div>

        <motion.div
          initial={ridotto ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: RITARDO_INGRESSO + 0.25, ease: EASE }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          {/* pannello blu notte con la luce del faro del sito attuale, appena accennata */}
          <div className="absolute inset-x-0 bottom-0 top-[14%] overflow-hidden rounded-[20px] bg-notte">
            <img
              src="./foto/faro-900.webp"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover opacity-25 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-notte via-notte/60 to-transparent" />
          </div>
          <img
            src="./foto/enrico-giacca-520.webp"
            srcSet="./foto/enrico-giacca-520.webp 520w, ./foto/enrico-giacca-760.webp 760w"
            sizes="(min-width: 1024px) 520px, 90vw"
            width={520}
            height={804}
            alt="Enrico Picciolo, consulente finanziario Fineco"
            fetchPriority="high"
            className="relative mx-auto h-[min(46svh,400px)] sm:h-[min(60svh,540px)] w-auto object-contain object-bottom lg:h-[min(76svh,640px)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
