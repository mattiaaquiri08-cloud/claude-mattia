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
      <div ref={cornice} className="relative mx-2 mb-2 flex flex-1 overflow-hidden bg-notte md:mx-4 md:mb-4">
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
              className="size-full object-cover object-[54%_30%] md:object-[50%_22%]"
            />
          </motion.picture>
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,24,48,0.92)_0%,rgba(15,24,48,0.55)_32%,rgba(15,24,48,0)_62%)]"
        />

        <div className="relative mt-auto w-full px-5 pb-7 pt-40 md:px-10 md:pb-10 lg:px-14 lg:pb-14">
          <motion.h1
            className="stretto max-w-[13ch] text-[clamp(2.9rem,11vw,5.2rem)] font-[720] uppercase leading-[0.9] text-insegna md:max-w-[24ch]"
            initial={ridotto ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: R + 0.1, ease: EASE }}
          >
            {t.hero.titolo}
          </motion.h1>
          <div className="mt-6 flex flex-col gap-7 md:mt-8 lg:flex-row lg:items-end lg:justify-between">
            <motion.p
              className="max-w-[44ch] text-[1.05rem] leading-relaxed text-insegna/85 md:text-lg"
              initial={ridotto ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: R + 0.25, ease: EASE }}
            >
              {t.hero.testo}
            </motion.p>
            <motion.div
              className="flex flex-col gap-3 sm:flex-row"
              initial={ridotto ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: R + 0.4, ease: EASE }}
            >
              <Pulsante href="#prenota">{t.hero.prenota}</Pulsante>
              <Pulsante href="#menu" variante="chiaro">
                {t.hero.menu}
                <ArrowDown size={18} weight="bold" aria-hidden="true" />
              </Pulsante>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
