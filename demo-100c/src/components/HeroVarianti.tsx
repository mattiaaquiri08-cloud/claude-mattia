import { ArrowDown } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { RITARDO_INGRESSO as R } from "../avvio";
import { useLingua } from "../lingua";
import { EASE, Marchio, Pulsante } from "./ui";

const BASE = import.meta.env.BASE_URL;

// Tre impostazioni alternative dell'hero, da confrontare con ?hero=a|b|c.
// Dopo la scelta resta solo quella approvata.

function Ingresso({ y = 30, ritardo = 0, children, className = "" }: { y?: number; ritardo?: number; children: React.ReactNode; className?: string }) {
  const ridotto = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={ridotto ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: R + ritardo, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Pulsanti() {
  const { t } = useLingua();
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Pulsante href="#prenota">{t.hero.prenota}</Pulsante>
      <Pulsante href="#menu" variante="contorno">
        {t.hero.menu}
        <ArrowDown size={18} weight="bold" aria-hidden="true" />
      </Pulsante>
    </div>
  );
}

function FotoVerticale({ className = "" }: { className?: string }) {
  const { t } = useLingua();
  return (
    <img
      src={`${BASE}foto/ingresso-verticale-1024.webp`}
      srcSet={`${BASE}foto/ingresso-verticale-720.webp 720w, ${BASE}foto/ingresso-verticale-1024.webp 1024w`}
      sizes="(min-width: 1024px) 45vw, 100vw"
      alt={t.hero.altFoto}
      fetchPriority="high"
      decoding="async"
      className={className}
    />
  );
}

// A. L'insegna: il marchio grande su fondo chiaro, la foto verticale accanto
export function HeroInsegna() {
  const { t } = useLingua();
  const ridotto = useReducedMotion();
  return (
    <section id="inizio" className="pt-16 md:pt-[72px]">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1400px] lg:min-h-[calc(100svh-72px)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div className="order-2 flex flex-col justify-center px-4 pb-12 pt-7 md:px-8 lg:order-1 lg:py-12 lg:pr-16">
          <Ingresso>
            <h1 className="flex flex-col">
              <Marchio className="text-[clamp(5rem,19vw,13.5rem)] leading-[0.8]" />
              <span className="stretto mt-4 text-[clamp(1.6rem,4.4vw,3rem)] font-[680] uppercase leading-none tracking-[0.14em] text-inchiostro">
                Vino <span className="text-[0.7em]">e</span> Pesce
              </span>
            </h1>
          </Ingresso>
          <Ingresso ritardo={0.15} className="mt-8 border-t border-inchiostro/15 pt-8">
            <p className="max-w-[40ch] text-lg leading-relaxed text-grigio">
              <span className="font-semibold text-inchiostro">{t.footer.descrizione}</span> {t.hero.testo}
            </p>
          </Ingresso>
          <Ingresso ritardo={0.3} className="mt-9">
            <Pulsanti />
          </Ingresso>
        </div>
        <motion.div
          className="relative order-1 mx-2 h-[44svh] overflow-hidden sm:h-[56svh] lg:order-2 lg:mx-0 lg:my-4 lg:mr-4 lg:h-auto"
          initial={ridotto ? false : { clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.3, delay: R, ease: [0.7, 0, 0.2, 1] }}
        >
          <FotoVerticale className="absolute inset-0 size-full object-cover object-[54%_30%]" />
        </motion.div>
      </div>
    </section>
  );
}

// B. Foto piena: l'insegna vera fa da titolo, il testo sta in un cartellino in basso
export function HeroFoto() {
  const { t } = useLingua();
  const ridotto = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", ridotto ? "0%" : "12%"]);
  return (
    <section ref={ref} id="inizio" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-notte pt-16 md:pt-[72px]">
      <motion.picture className="absolute inset-0 top-16 block md:top-[72px]" style={{ y }}>
        <source
          media="(min-width: 768px)"
          srcSet={`${BASE}foto/ingresso-1100.webp 1100w, ${BASE}foto/ingresso-1672.webp 1672w`}
          sizes="100vw"
        />
        <img
          src={`${BASE}foto/ingresso-verticale-1024.webp`}
          srcSet={`${BASE}foto/ingresso-verticale-720.webp 720w, ${BASE}foto/ingresso-verticale-1024.webp 1024w`}
          sizes="100vw"
          alt={t.hero.altFoto}
          fetchPriority="high"
          className="size-full object-cover object-[54%_25%] md:object-[50%_20%]"
        />
      </motion.picture>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-notte/50 to-transparent" />
      <Ingresso y={40} className="relative mt-auto px-3 pb-3 md:px-8 md:pb-8">
        <div className="max-w-[640px] bg-insegna p-6 md:p-9">
          <h1 className="stretto text-[clamp(2.2rem,6vw,3.4rem)] font-[720] uppercase leading-[0.95] text-inchiostro">
            {t.hero.titolo}
          </h1>
          <p className="mt-4 max-w-[44ch] leading-relaxed text-grigio">{t.hero.testo}</p>
          <div className="mt-7">
            <Pulsanti />
          </div>
        </div>
      </Ingresso>
    </section>
  );
}

// C. Editoriale: titolo su fondo chiaro, poi la foto larga che scorre sotto
export function HeroEditoriale() {
  const { t } = useLingua();
  const ridotto = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // a pagina ferma la foto parte dall'alto (insegna intera), poi sale piano mentre si scorre
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ridotto ? ["0%", "0%"] : ["0%", "-10%"]);
  return (
    <section id="inizio" className="pt-16 md:pt-[72px]">
      <div className="mx-auto max-w-[1400px] px-4 pb-8 pt-10 md:px-8 md:pb-10 md:pt-14">
        <Ingresso>
          <h1 className="stretto max-w-[20ch] text-[clamp(3rem,8.4vw,7.2rem)] font-[720] uppercase leading-[0.88] text-inchiostro">
            {t.hero.titolo}
          </h1>
        </Ingresso>
        <Ingresso ritardo={0.15} className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[46ch] text-lg leading-relaxed text-grigio">{t.hero.testo}</p>
          <Pulsanti />
        </Ingresso>
      </div>
      <motion.div
        ref={ref}
        className="relative mx-2 h-[62svh] overflow-hidden md:mx-4 md:h-[78svh]"
        initial={ridotto ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: R + 0.2, ease: EASE }}
      >
        <motion.picture className="absolute inset-x-0 top-0 block h-[114%]" style={{ y }}>
          <source
            media="(min-width: 768px)"
            srcSet={`${BASE}foto/ingresso-1100.webp 1100w, ${BASE}foto/ingresso-1672.webp 1672w`}
            sizes="100vw"
          />
          <img
            src={`${BASE}foto/ingresso-verticale-1024.webp`}
            srcSet={`${BASE}foto/ingresso-verticale-720.webp 720w, ${BASE}foto/ingresso-verticale-1024.webp 1024w`}
            sizes="100vw"
            alt={t.hero.altFoto}
            fetchPriority="high"
            className="size-full object-cover object-[54%_15%] md:object-[50%_0%]"
          />
        </motion.picture>
      </motion.div>
    </section>
  );
}
