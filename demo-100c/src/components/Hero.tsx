import { ArrowDown } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { RITARDO_INGRESSO as R } from "../avvio";
import { useLingua } from "../lingua";
import { EASE, Pulsante } from "./ui";

const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  const { t } = useLingua();
  const ridotto = useReducedMotion();
  const cornice = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cornice, offset: ["start start", "end start"] });
  // la foto scorre un po' più lenta della pagina: profondità senza effetti vistosi
  const y = useTransform(scrollYProgress, [0, 1], ["0%", ridotto ? "0%" : "14%"]);

  return (
    <section id="inizio" className="relative flex min-h-[100svh] flex-col pt-16 md:pt-[72px]">
      {/* telefono: foto pulita in alto, testo sotto su fondo chiaro; PC: testo sopra la foto */}
      <div ref={cornice} className="relative mx-2 h-[54svh] flex-none overflow-hidden bg-notte md:mx-4 md:mb-4 md:h-auto md:flex-1">
        <motion.div className="absolute inset-0" style={{ y }}>
          <motion.picture
            className="block size-full"
            initial={ridotto ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, delay: R * 0.75, ease: EASE }}
          >
            <source
              media="(min-width: 768px)"
              srcSet={`${BASE}foto/ingresso-1100.webp 1100w, ${BASE}foto/ingresso-1672.webp 1672w`}
              sizes="100vw"
              type="image/webp"
            />
            <img
              src={`${BASE}foto/ingresso-verticale-1024.webp`}
              srcSet={`${BASE}foto/ingresso-verticale-720.webp 720w, ${BASE}foto/ingresso-verticale-1024.webp 1024w`}
              sizes="100vw"
              alt={t.hero.altFoto}
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover object-[54%_16%] md:object-[50%_22%]"
            />
          </motion.picture>
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-[linear-gradient(to_top,rgba(15,24,48,0.92)_0%,rgba(15,24,48,0.55)_32%,rgba(15,24,48,0)_62%)] md:block"
        />
      </div>

      <div className="relative flex flex-1 flex-col justify-center px-4 pb-6 pt-6 md:absolute md:inset-x-4 md:bottom-4 md:block md:px-10 md:pb-10 md:pt-0 lg:px-14 lg:pb-14">
          <motion.h1
            className="stretto text-[clamp(2.3rem,9.6vw,5.2rem)] font-[720] uppercase leading-[0.9] text-inchiostro md:max-w-[24ch] md:text-insegna"
            initial={ridotto ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: R + 0.1, ease: EASE }}
          >
            {t.hero.titolo}
          </motion.h1>
          <div className="mt-5 flex flex-col gap-7 md:mt-8 lg:flex-row lg:items-end lg:justify-between">
            <motion.p
              className="hidden max-w-[44ch] text-lg leading-relaxed text-insegna/85 md:block"
              initial={ridotto ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: R + 0.25, ease: EASE }}
            >
              {t.hero.testo}
            </motion.p>
            <motion.div
              className="flex flex-col gap-2.5 sm:flex-row sm:gap-3"
              initial={ridotto ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: R + 0.4, ease: EASE }}
            >
              <Pulsante href="#prenota">{t.hero.prenota}</Pulsante>
              <Pulsante href="#menu" variante="chiaro" className="border border-inchiostro md:border-transparent">
                {t.hero.menu}
                <ArrowDown size={18} weight="bold" aria-hidden="true" />
              </Pulsante>
            </motion.div>
          </div>
      </div>
    </section>
  );
}
