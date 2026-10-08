import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, InstagramLogo, X } from '@phosphor-icons/react'
import { GALLERY, SITE } from '../data/site'

/*
  Griglia a mosaico con visore a schermo intero.
  Base: componente 21st "Masonry Lightbox" (ayushmxxn), riscritto con motion/react,
  griglia a celle fisse invece delle colonne e navigazione con frecce, tastiera e swipe.
*/
export function Gallery() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState<number | null>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const lastTrigger = useRef<HTMLElement | null>(null)

  const open = (i: number, el: HTMLElement) => {
    lastTrigger.current = el
    setIndex(i)
  }
  const close = useCallback(() => {
    setIndex(null)
    window.setTimeout(() => lastTrigger.current?.focus({ preventScroll: true }), 50)
  }, [])
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length)),
    [],
  )

  const isOpen = index !== null

  useEffect(() => {
    if (!isOpen) return
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const prev = document.body.style.overflow
    const prevPad = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    closeBtn.current?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = prev
      document.body.style.paddingRight = prevPad
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close, step])

  const current = index !== null ? GALLERY[index] : null

  return (
    <section id="galleria" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-5xl leading-none font-semibold tracking-[-0.03em] md:text-7xl">Dentro OMA</h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-cream/75">
              Luci basse, velluto arancio e una vetrata sulla strada. Tocca una foto per guardarla da vicino.
            </p>
          </div>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 self-start font-medium text-cream underline decoration-line underline-offset-[6px] transition-colors hover:text-ochre hover:decoration-ochre md:self-auto"
          >
            <InstagramLogo size={20} />
            Altre foto su {SITE.instagramHandle}
          </a>
        </div>

        <ul className="grid auto-rows-[44vw] grid-cols-2 gap-3 md:auto-rows-[clamp(180px,17vw,260px)] md:grid-cols-4 md:gap-4">
          {GALLERY.map((p, i) => (
            <motion.li
              key={p.src}
              className={p.area}
              initial={reduce ? false : { opacity: 0, y: 28, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.button
                type="button"
                layoutId={reduce ? undefined : `photo-${i}`}
                onClick={(e) => open(i, e.currentTarget)}
                className="group relative block h-full w-full overflow-hidden rounded-[var(--radius-media)] bg-smoke"
                aria-label={`Apri la foto: ${p.alt}`}
              >
                <img
                  src={p.src}
                  alt=""
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out-expo group-hover:scale-[1.05]"
                />
                <span className="pointer-events-none absolute inset-0 rounded-[var(--radius-media)] ring-1 ring-cream/0 transition-[box-shadow] duration-300 ring-inset group-hover:ring-ochre/70" />
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </div>

      {createPortal(
        <AnimatePresence>
          {current && index !== null && (
            <motion.div
              className="fixed inset-0 z-[85] flex flex-col items-center justify-center bg-ink/92 p-4 backdrop-blur-xl md:p-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              role="dialog"
              aria-modal="true"
              aria-label="Galleria foto"
              onClick={close}
            >
              <motion.figure
                layoutId={reduce ? undefined : `photo-${index}`}
                className="relative max-h-[78dvh] overflow-hidden rounded-[var(--radius-media)] bg-smoke"
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                drag={reduce ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) step(1)
                  else if (info.offset.x > 70) step(-1)
                }}
              >
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  className="block max-h-[78dvh] w-auto max-w-[92vw] object-contain select-none md:max-w-[80vw]"
                  draggable={false}
                />
              </motion.figure>
              <motion.p
                className="mt-5 max-w-[60ch] px-4 text-center text-sm text-cream/80"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                aria-live="polite"
              >
                {current.alt}
                <span className="ml-3 text-mute tabular-nums">
                  {index + 1} di {GALLERY.length}
                </span>
              </motion.p>

              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                aria-label="Chiudi la galleria"
                className="absolute top-4 right-4 grid size-12 place-items-center rounded-full border border-line bg-coal/80 text-cream transition-colors hover:border-mute md:top-6 md:right-6"
              >
                <X size={20} weight="bold" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                aria-label="Foto precedente"
                className="absolute bottom-6 left-6 grid size-12 place-items-center rounded-full border border-line bg-coal/80 text-cream transition-colors hover:border-mute md:top-1/2 md:bottom-auto md:-translate-y-1/2"
              >
                <ArrowLeft size={20} weight="bold" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                aria-label="Foto successiva"
                className="absolute right-6 bottom-6 grid size-12 place-items-center rounded-full border border-line bg-coal/80 text-cream transition-colors hover:border-mute md:top-1/2 md:bottom-auto md:-translate-y-1/2"
              >
                <ArrowRight size={20} weight="bold" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}
