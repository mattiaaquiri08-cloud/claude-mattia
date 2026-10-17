import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLingua } from "../lingua";
import { Comparsa } from "./ui";

const BASE = import.meta.env.BASE_URL;

// Foto del locale: per aggiungerne una basta un nuovo oggetto (file in public/foto, in .webp).
// "largo" occupa due terzi della riga, le altre un terzo: alternare per righe da 8+4 e 4+8.
// Visore ripreso dal componente "Masonry Lightbox" del catalogo 21st, adattato al sito.
const FOTO = [
  { file: "ingresso", larghezze: [760, 1100, 1672], largo: true, w: 1672, h: 941, it: "L'ingresso la sera, con la sala apparecchiata", en: "The entrance at night, with the dining room set" },
  { file: "spaghetti", larghezze: [600, 1200], largo: false, w: 1200, h: 1600, it: "Spaghetti con i gamberi (foto: Gambero Rosso)", en: "Spaghetti with prawns (photo: Gambero Rosso)" },
  { file: "tavola-verticale", larghezze: [600, 941], largo: false, w: 941, h: 1672, it: "Calici, bicchieri con il logo e piatti blu sul tavolo", en: "Wine glasses, logo tumblers and blue plates on the table" },
  { file: "tavola", larghezze: [900, 1672], largo: true, w: 1672, h: 941, it: "Il divanetto rosso e il tavolo apparecchiato", en: "The red banquette and the set table" },
];

const srcSet = (f: (typeof FOTO)[number]) =>
  f.larghezze.map((l) => `${BASE}foto/${f.file}-${l}.webp ${l}w`).join(", ");
const src = (f: (typeof FOTO)[number]) => `${BASE}foto/${f.file}-${f.larghezze[f.larghezze.length - 1]}.webp`;

export default function Galleria() {
  const { t, lingua } = useLingua();
  const ridotto = useReducedMotion();
  const [aperta, setAperta] = useState<number | null>(null);
  const chiudiRef = useRef<HTMLButtonElement>(null);
  const origine = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (aperta === null) return;
    const larghezzaBarra = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.body.style.paddingRight = `${larghezzaBarra}px`;
    chiudiRef.current?.focus();
    const tasti = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAperta(null);
      if (e.key === "ArrowRight") setAperta((i) => (i === null ? i : (i + 1) % FOTO.length));
      if (e.key === "ArrowLeft") setAperta((i) => (i === null ? i : (i - 1 + FOTO.length) % FOTO.length));
    };
    window.addEventListener("keydown", tasti);
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", tasti);
      origine.current?.focus();
    };
  }, [aperta]);

  const foto = aperta !== null ? FOTO[aperta] : null;
  const molla = ridotto ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 30 };

  return (
    <section className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Comparsa>
          <h2 className="stretto text-[clamp(2.6rem,7vw,5.2rem)] font-[720] uppercase leading-[0.92]">
            {t.galleria.titolo}
          </h2>
        </Comparsa>
        <ul className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {FOTO.map((f, i) => (
            <li key={f.file} className={f.largo ? "lg:col-span-8" : "lg:col-span-4"}>
              <Comparsa ritardo={0.05 * i} y={18} className="h-full">
                <button
                  type="button"
                  onClick={(e) => {
                    origine.current = e.currentTarget;
                    setAperta(i);
                  }}
                  aria-label={`${t.galleria.apri}: ${f[lingua]}`}
                  className={`group block h-full w-full overflow-hidden bg-carta ${f.largo ? "aspect-[16/9]" : "aspect-[4/5] lg:aspect-auto"}`}
                >
                  <motion.img
                    layoutId={`foto-${f.file}`}
                    transition={molla}
                    src={src(f)}
                    srcSet={srcSet(f)}
                    sizes={f.largo ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
                    width={f.w}
                    height={f.h}
                    alt={f[lingua]}
                    loading="lazy"
                    decoding="async"
                    className="block size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </button>
              </Comparsa>
            </li>
          ))}
        </ul>
      </div>

      {createPortal(
        <AnimatePresence>
          {foto && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={foto[lingua]}
              className="fixed inset-0 z-[70] flex flex-col bg-notte/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setAperta(null)}
            >
              <div className="flex justify-end p-3">
                <button
                  ref={chiudiRef}
                  type="button"
                  onClick={() => setAperta(null)}
                  aria-label={t.galleria.chiudi}
                  className="flex size-12 items-center justify-center text-insegna hover:text-white"
                >
                  <X size={28} />
                </button>
              </div>
              <div className="flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
                <motion.img
                  key={foto.file}
                  layoutId={`foto-${foto.file}`}
                  transition={molla}
                  src={src(foto)}
                  srcSet={srcSet(foto)}
                  sizes="100vw"
                  alt={foto[lingua]}
                  onClick={(e) => e.stopPropagation()}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div
                className="flex items-center justify-between gap-4 px-4 pb-6 pt-4 text-insegna md:px-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setAperta((aperta! - 1 + FOTO.length) % FOTO.length)}
                  aria-label={t.galleria.precedente}
                  className="flex size-12 shrink-0 items-center justify-center border border-insegna/30 hover:bg-insegna hover:text-inchiostro"
                >
                  <CaretLeft size={22} />
                </button>
                <p className="text-center text-sm text-insegna/80">{foto[lingua]}</p>
                <button
                  type="button"
                  onClick={() => setAperta((aperta! + 1) % FOTO.length)}
                  aria-label={t.galleria.successiva}
                  className="flex size-12 shrink-0 items-center justify-center border border-insegna/30 hover:bg-insegna hover:text-inchiostro"
                >
                  <CaretRight size={22} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
