import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY } from "../data/gallery";
import { useLang } from "../i18n/context";
import { useModal } from "../lib/useModal";
import { Photo, photoMeta, photoSrc, SINGLE_FILE } from "./Photo";

/*
  Galleria a mosaico con visore a schermo intero.
  Base: componente 21st "Masonry Lightbox" (ayushmxxn), adattato a Motion,
  alle immagini responsive del sito e arricchito con frecce, tastiera e swipe.
*/

const EASE = [0.22, 1, 0.36, 1] as const;

export function Gallery() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length)), []);

  return (
    <section id="galleria" aria-labelledby="galleria-titolo" className="bg-crema py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl"
        >
          <h2 id="galleria-titolo" className="font-display text-[42px] leading-[1.04] font-medium text-petrol-800 sm:text-[60px]">
            {t.gallery.title}
          </h2>
          <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-ink-soft">{t.gallery.intro}</p>
        </motion.div>

        <ul className="mt-14 columns-2 gap-3 sm:gap-4 md:columns-3 lg:mt-16 lg:gap-5">
          {GALLERY.map((item, i) => (
            <motion.li
              key={item.id}
              className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${t.gallery.open}: ${item.alt[lang]}`}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[6px] bg-lino"
              >
                <Photo
                  id={item.id}
                  alt=""
                  sizes="(min-width: 1400px) 450px, (min-width: 768px) 32vw, 48vw"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-petrol-950/0 transition-colors duration-500 group-hover:bg-petrol-950/10" />
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>{index !== null ? <Lightbox index={index} onClose={close} onNav={go} /> : null}</AnimatePresence>
    </section>
  );
}

function Lightbox({ index, onClose, onNav }: { index: number; onClose: () => void; onNav: (dir: 1 | -1) => void }) {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const item = GALLERY[index];
  const meta = photoMeta(item.id);
  useModal(ref, true, onClose);

  const nav = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      onNav(d);
    },
    [onNav],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [nav]);

  // precarica le foto vicine
  useEffect(() => {
    for (const d of [1, -1]) {
      const next = GALLERY[(index + d + GALLERY.length) % GALLERY.length];
      const img = new Image();
      img.src = photoSrc(next.id, 1600, "webp");
    }
  }, [index]);

  const srcset = (ext: "avif" | "webp") => meta.widths.map((w) => `/img/${item.id}-${w}.${ext} ${w}w`).join(", ");

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt[lang]}
      className="fixed inset-0 z-50 flex flex-col overscroll-contain bg-petrol-950/92 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white/85 sm:px-6">
        <p className="text-[13px] font-medium tabular" aria-live="polite">
          {index + 1} {t.gallery.of} {GALLERY.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.gallery.close}
          data-autofocus
          className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20" onClick={onClose}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.figure
            key={item.id}
            custom={dir}
            initial={{ opacity: 0, x: reduce ? 0 : dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : dir * -60 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) nav(1);
              else if (info.offset.x > 70) nav(-1);
            }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full flex-col items-center"
          >
            <picture className="block overflow-hidden rounded-[6px]">
              {SINGLE_FILE ? null : (
                <>
                  <source type="image/avif" srcSet={srcset("avif")} sizes="92vw" />
                  <source type="image/webp" srcSet={srcset("webp")} sizes="92vw" />
                </>
              )}
              <img
                src={photoSrc(item.id, meta.widths.find((w) => w >= 1200) ?? undefined, "webp")}
                alt={item.alt[lang]}
                width={meta.width}
                height={meta.height}
                draggable={false}
                className="block max-h-[calc(100dvh-10rem)] w-auto max-w-full object-contain select-none"
              />
            </picture>
            <figcaption className="mt-3 max-w-[60ch] text-center text-[14px] leading-snug text-white/80">{item.alt[lang]}</figcaption>
          </motion.figure>
        </AnimatePresence>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nav(-1);
          }}
          aria-label={t.gallery.prev}
          className="absolute top-1/2 left-3 hidden size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 sm:grid"
        >
          <CaretLeft size={22} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nav(1);
          }}
          aria-label={t.gallery.next}
          className="absolute top-1/2 right-3 hidden size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 sm:grid"
        >
          <CaretRight size={22} />
        </button>
      </div>

      <div className="flex justify-center gap-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden">
        <button type="button" onClick={() => nav(-1)} aria-label={t.gallery.prev} className="grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20">
          <CaretLeft size={22} />
        </button>
        <button type="button" onClick={() => nav(1)} aria-label={t.gallery.next} className="grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20">
          <CaretRight size={22} />
        </button>
      </div>
    </motion.div>
  );
}
