import { CaretLeft, CaretRight, ImageSquare, MagnifyingGlassPlus, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GALLERY, type Photo } from '../data/site'
import { UI } from '../data/ui'
import { useI18n } from '../lib/i18n'

const PHOTOS = GALLERY.filter((p) => p.base)

const srcset = (p: Photo, ext: 'avif' | 'webp') => p.widths.map((w) => `./img/${p.base}-${w}.${ext} ${w}w`).join(', ')
const largest = (p: Photo) => `./img/${p.base}-${p.widths[p.widths.length - 1]}.webp`

/**
 * Galleria a mosaico (colonne con altezze naturali, nessun buco) e visore a tutto schermo
 * con frecce, tastiera e trascinamento. Gli spazi senza foto mostrano cosa ci andrà.
 */
export function Gallery() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const [index, setIndex] = useState<number | null>(null)
  const [dir, setDir] = useState(0)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLElement | null>(null)

  const go = useCallback((d: number) => {
    setDir(d)
    setIndex((i) => (i === null ? i : (i + d + PHOTOS.length) % PHOTOS.length))
  }, [])

  const close = useCallback(() => setIndex(null), [])

  useEffect(() => {
    if (index === null) return
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    closeBtn.current?.focus({ preventScroll: true })
    return () => {
      html.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
    // il focus va sul pulsante Chiudi solo all'apertura
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index === null, close, go])

  useEffect(() => {
    if (index === null) opener.current?.focus({ preventScroll: true })
  }, [index])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1)
    else if (info.offset.x > 60) go(-1)
  }

  const current = index === null ? null : PHOTOS[index]

  return (
    <section id="galleria" className="border-t border-line/60 px-4 py-24 sm:px-6 md:py-36 lg:px-10" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="gallery-title" className="h-section max-w-[18ch]">
          {t(UI.gallery.heading)}
        </h2>

        <ul className="mt-12 columns-2 gap-3 sm:gap-4 lg:columns-3 [&>li]:mb-3 sm:[&>li]:mb-4">
          {GALLERY.map((p, i) => (
            <motion.li
              key={p.base ?? `slot-${i}`}
              className="break-inside-avoid"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              {p.base ? (
                <button
                  type="button"
                  onClick={(e) => {
                    opener.current = e.currentTarget
                    setDir(0)
                    setIndex(PHOTOS.indexOf(p))
                  }}
                  className="group relative block w-full overflow-hidden rounded-[var(--radius-media)] bg-coal"
                  style={{ aspectRatio: `${p.width} / ${p.height}` }}
                  aria-label={`${t(UI.gallery.open)}: ${t(p.alt)}`}
                >
                  <picture>
                    <source type="image/avif" srcSet={srcset(p, 'avif')} sizes="(min-width: 1024px) 33vw, 50vw" />
                    <img
                      src={largest(p)}
                      srcSet={srcset(p, 'webp')}
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      alt=""
                      width={p.width}
                      height={p.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                    />
                  </picture>
                  <span className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-ink/60 text-bone opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <MagnifyingGlassPlus size={18} weight="bold" />
                  </span>
                </button>
              ) : (
                <div
                  className="flex w-full flex-col items-center justify-center rounded-[var(--radius-media)] border border-dashed border-line bg-coal/60 p-5 text-center"
                  style={{ aspectRatio: `${p.width} / ${p.height}` }}
                >
                  <ImageSquare size={26} className="text-mute" />
                  <span className="mt-3 font-display text-[1.35rem] leading-tight text-bone/80 italic">{p.slot && t(p.slot)}</span>
                  <span className="mt-1 text-xs text-mute">{t(UI.gallery.pending)}</span>
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[85] flex flex-col bg-ink/95 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={t(UI.gallery.viewer)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-end p-3 sm:p-5">
              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                aria-label={t(UI.gallery.close)}
                className="grid size-12 place-items-center rounded-full border border-line text-bone transition-colors hover:border-mute hover:bg-smoke"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20">
              <AnimatePresence initial={false} mode="popLayout" custom={dir}>
                <motion.picture
                  key={current.base}
                  className="flex h-full max-h-full w-full items-center justify-center"
                  custom={dir}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  drag={reduce ? false : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={onDragEnd}
                >
                  <source type="image/avif" srcSet={srcset(current, 'avif')} sizes="100vw" />
                  <img
                    src={largest(current)}
                    srcSet={srcset(current, 'webp')}
                    sizes="100vw"
                    alt={t(current.alt)}
                    width={current.width}
                    height={current.height}
                    className="max-h-full max-w-full rounded-[var(--radius-media)] object-contain select-none"
                    draggable={false}
                  />
                </motion.picture>
              </AnimatePresence>

              {PHOTOS.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label={t(UI.gallery.prev)}
                    className="absolute left-5 hidden size-12 place-items-center rounded-full border border-line bg-ink/70 text-bone backdrop-blur-md transition-colors hover:border-mute sm:grid"
                  >
                    <CaretLeft size={20} weight="bold" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label={t(UI.gallery.next)}
                    className="absolute right-5 hidden size-12 place-items-center rounded-full border border-line bg-ink/70 text-bone backdrop-blur-md transition-colors hover:border-mute sm:grid"
                  >
                    <CaretRight size={20} weight="bold" />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 px-3 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:justify-center sm:px-6">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t(UI.gallery.prev)}
                className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-bone sm:hidden"
              >
                <CaretLeft size={20} weight="bold" />
              </button>
              <p className="max-w-[60ch] text-center text-sm leading-relaxed text-mute">{t(current.alt)}</p>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t(UI.gallery.next)}
                className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-bone sm:hidden"
              >
                <CaretRight size={20} weight="bold" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
