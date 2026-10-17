import { Bag, Wine } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useLingua } from "../lingua";
import { Comparsa, EASE, Etichetta } from "./ui";

// Sezione simbolo del locale: si cambia "da portare via / al tavolo"
// e il cartellino oscilla, ma il prezzo resta quello. Il concetto si capisce toccandolo.
export default function Vino() {
  const { t } = useLingua();
  const ridotto = useReducedMotion();
  const [modo, setModo] = useState<"asporto" | "tavolo">("tavolo");
  const [colpi, setColpi] = useState(0);

  const scegli = (m: "asporto" | "tavolo") => {
    if (m === modo) return;
    setModo(m);
    setColpi((c) => c + 1);
  };

  return (
    <section id="vino" className="relative overflow-hidden bg-mare text-insegna">
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          <div>
            <Comparsa>
              <Etichetta chiara>{t.vino.etichetta}</Etichetta>
              <h2 className="stretto text-[clamp(2.8rem,8vw,6.6rem)] font-[720] uppercase leading-[0.9]">
                {t.vino.titolo}
              </h2>
              <p className="mt-8 max-w-[48ch] text-lg leading-relaxed text-insegna/80">{t.vino.testo}</p>
            </Comparsa>

            <Comparsa ritardo={0.15} className="mt-10">
              <p id="scelta-vino" className="mb-3 text-sm text-insegna/70">
                {t.vino.scelta}
              </p>
              <div
                role="radiogroup"
                aria-labelledby="scelta-vino"
                className="semistretto inline-grid grid-cols-2 border border-insegna/30 p-1 text-[0.9rem] font-semibold uppercase tracking-[0.06em]"
              >
                {(["asporto", "tavolo"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={modo === m}
                    onClick={() => scegli(m)}
                    className="relative flex min-h-12 items-center justify-center gap-2 px-4 sm:px-6"
                  >
                    {modo === m && (
                      <motion.span
                        layoutId="scelta-vino-sfondo"
                        className="absolute inset-0 bg-insegna"
                        transition={ridotto ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className={`relative flex items-center gap-2 ${modo === m ? "text-inchiostro" : "text-insegna/80"}`}>
                      {m === "asporto" ? <Bag size={18} aria-hidden="true" /> : <Wine size={18} aria-hidden="true" />}
                      {m === "asporto" ? t.vino.asporto : t.vino.tavolo}
                    </span>
                  </button>
                ))}
              </div>
            </Comparsa>
          </div>

          {/* cartellino appeso allo scaffale */}
          <Comparsa ritardo={0.2} className="flex justify-center lg:justify-end">
            <div className="relative pt-10">
              <div aria-hidden="true" className="absolute left-1/2 top-0 h-10 w-px -translate-x-1/2 bg-insegna/40" />
              <motion.div
                key={colpi}
                className="relative w-[min(84vw,360px)] origin-top bg-insegna px-7 pb-8 pt-9 text-inchiostro shadow-[0_30px_60px_-20px_rgba(5,10,25,0.6)]"
                initial={ridotto || colpi === 0 ? false : { rotate: modo === "tavolo" ? 7 : -7 }}
                animate={{ rotate: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 6, mass: 0.8 }}
                aria-live="polite"
              >
                <span aria-hidden="true" className="absolute left-1/2 top-3 size-3 -translate-x-1/2 rounded-full bg-mare" />
                <div className="flex items-center justify-between border-b border-inchiostro/15 pb-4">
                  <span className="stretto text-2xl font-[750] leading-none">
                    <span className="text-rosso">100</span>C.
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={modo}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="semistretto flex items-center gap-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-grigio"
                    >
                      {modo === "asporto" ? <Bag size={16} aria-hidden="true" /> : <Wine size={16} aria-hidden="true" />}
                      {modo === "asporto" ? t.vino.asporto : t.vino.tavolo}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className="mt-6 text-sm text-grigio">{t.vino.cartellino}</p>
                <p className="stretto mt-1 text-[3.4rem] font-[740] uppercase leading-none">{t.vino.uguale}</p>
                <div className="mt-6 flex items-baseline justify-between border-t border-dashed border-inchiostro/25 pt-5">
                  <span className="text-sm text-grigio">{t.vino.ricarico}</span>
                  <span className="stretto text-4xl font-[750] leading-none text-rosso">{t.vino.zero}</span>
                </div>
              </motion.div>
            </div>
          </Comparsa>
        </div>

        <Comparsa className="mt-24 md:mt-32">
          <figure>
            <img
              src={`${import.meta.env.BASE_URL}foto/assaggio-1600.webp`}
              srcSet={`${import.meta.env.BASE_URL}foto/assaggio-900.webp 900w, ${import.meta.env.BASE_URL}foto/assaggio-1600.webp 1600w`}
              sizes="(min-width: 1400px) 1340px, 100vw"
              width={2000}
              height={1333}
              alt={t.vino.fotoAlt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover md:aspect-[21/9] md:object-[50%_35%]"
            />
            <figcaption className="mt-4 flex flex-col gap-1 text-sm text-insegna/70 sm:flex-row sm:justify-between">
              <span>{t.vino.didascalia}</span>
              <span>{t.vino.credito}</span>
            </figcaption>
          </figure>
        </Comparsa>

        <div className="mt-20 grid gap-14 border-t border-insegna/20 pt-14 md:mt-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          <div>
            <h3 className="semistretto text-sm font-semibold uppercase tracking-[0.16em] text-insegna/60">
              {t.vino.filosofiaTitolo}
            </h3>
            <ul className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {t.vino.filosofia.map((f, i) => (
                <li key={f.nome}>
                  <Comparsa ritardo={0.08 * i} y={14}>
                    <p className="stretto text-[1.9rem] font-[700] uppercase leading-none">{f.nome}</p>
                    <p className="mt-3 leading-relaxed text-insegna/70">{f.testo}</p>
                  </Comparsa>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="semistretto text-sm font-semibold uppercase tracking-[0.16em] text-insegna/60">
              {t.vino.paesiTitolo}
            </h3>
            <ul className="stretto mt-8 flex flex-wrap gap-x-5 gap-y-1 text-[clamp(2.2rem,5vw,3.4rem)] font-[720] uppercase leading-[1.05]">
              {t.vino.paesi.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="mt-8 text-insegna/70">{t.vino.firma}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
