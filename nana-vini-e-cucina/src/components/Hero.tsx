import { CalendarCheck, MapPin } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLang } from "../i18n/context";
import { useBooking } from "./booking";

/*
  Hero: solo la fotografia e due pulsanti.
  La foto (giorno o sera, orizzontale o verticale) è scelta in CSS
  in base all'ora di Roma e all'orientamento dello schermo.
*/
export function Hero() {
  const { t } = useLang();
  const { open } = useBooking();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative isolate h-[100svh] min-h-[32rem] overflow-hidden bg-petrol-900">
      <h1 className="sr-only">{t.hero.h1}</h1>

      <motion.div style={{ y }} className="absolute inset-0 -z-20">
        <div role="img" aria-label={t.hero.photoAlt} className="hero-photo hero-zoom absolute inset-0" />
      </motion.div>

      {/* velature per la leggibilità di navigazione e pulsanti, senza spegnere la foto */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_62%,rgb(15_38_34/0.28),transparent_70%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-petrol-950/45 to-transparent" />

      <motion.div style={{ opacity: fade }} className="absolute inset-x-0 top-[58%] flex -translate-y-1/2 justify-center px-6 sm:top-[60%]">
        <div className="hero-cta flex w-full max-w-[22rem] flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
          <motion.button
            type="button"
            onClick={open}
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className="group flex h-14 cursor-pointer items-center justify-center gap-3 rounded-full bg-petrol-600 px-8 text-[13px] font-bold tracking-[0.2em] text-bianco uppercase shadow-[0_18px_40px_-16px_rgb(15_38_34/0.75),inset_0_1px_0_rgb(255_255_255/0.16)] ring-1 ring-white/20 transition-colors hover:bg-petrol-700"
          >
            <CalendarCheck size={20} weight="light" aria-hidden />
            {t.hero.book}
          </motion.button>
          <motion.a
            href="#dove-siamo"
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className="flex h-14 items-center justify-center gap-3 rounded-full bg-petrol-950/30 px-8 text-[13px] font-bold tracking-[0.2em] text-white uppercase ring-1 ring-white/55 backdrop-blur-md transition-colors hover:bg-petrol-950/45"
          >
            <MapPin size={20} weight="light" aria-hidden />
            {t.hero.where}
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
