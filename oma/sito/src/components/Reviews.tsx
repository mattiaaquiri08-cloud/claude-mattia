import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, GoogleLogo, Pause, Play, Quotes, Star } from '@phosphor-icons/react'
import { RATINGS, REVIEWS, REVIEW_TAGS, SITE } from '../data/site'

const AUTOPLAY_MS = 6500

export function Reviews() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const [paused, setPaused] = useState(false)
  const [stopped, setStopped] = useState(false)

  const go = useCallback((d: 1 | -1) => {
    setDir(d)
    setIndex((i) => (i + d + REVIEWS.length) % REVIEWS.length)
  }, [])

  useEffect(() => {
    if (reduce || paused || stopped) return
    const t = window.setInterval(() => go(1), AUTOPLAY_MS)
    return () => window.clearInterval(t)
  }, [reduce, paused, stopped, go])

  // le due carte dietro danno profondità al mazzo
  const stack = [0, 1, 2].map((o) => {
    const i = (index + o) % REVIEWS.length
    return { r: REVIEWS[i], key: i }
  })
  const google = RATINGS[0]

  return (
    <section id="recensioni" className="relative overflow-hidden border-t border-line bg-coal px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
        {/* Voto */}
        <div className="md:col-span-5">
          <h2 className="font-display text-5xl leading-none font-semibold tracking-[-0.03em] md:text-7xl">
            Lo dicono i clienti
          </h2>

          <div className="mt-12 flex items-end gap-5">
            <span className="font-display text-[clamp(5.5rem,13vw,10rem)] leading-[0.8] font-semibold tracking-[-0.05em] text-ochre">
              {google.value}
            </span>
            <div className="pb-2">
              <div className="flex gap-1 text-ochre" aria-label="4,7 stelle su 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={22} weight={i < 4 ? 'fill' : 'duotone'} />
                ))}
              </div>
              <p className="mt-2 flex items-center gap-2 text-cream/80">
                <GoogleLogo size={18} weight="bold" />
                {google.count}
              </p>
            </div>
          </div>

          <dl className="mt-10 flex gap-10 border-t border-line pt-6">
            {RATINGS.slice(1).map((r) => (
              <div key={r.source}>
                <dt className="text-sm text-mute">{r.source}</dt>
                <dd className="mt-1 font-display text-3xl font-semibold tracking-tight">
                  {r.value} <span className="text-base font-normal text-mute">{r.scale}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <p className="text-sm text-mute">Le parole che tornano più spesso</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {REVIEW_TAGS.map((t) => (
                <li key={t} className="rounded-full border border-line px-4 py-2 text-sm text-cream/90">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mazzo di recensioni */}
        <div
          className="md:col-span-6 md:col-start-7"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative h-[380px] sm:h-[340px] md:mt-24" aria-roledescription="carosello" aria-label="Recensioni">
            <AnimatePresence initial={false} custom={dir}>
              {stack.map(({ r, key }, depth) => {
                const isTop = depth === 0
                return (
                  <motion.figure
                    key={key}
                    custom={dir}
                    className={`absolute inset-x-0 top-0 flex h-[340px] flex-col justify-between rounded-[var(--radius-media)] border border-line p-7 sm:h-[300px] md:p-9 ${
                      isTop ? 'cursor-grab bg-smoke active:cursor-grabbing' : 'bg-deck'
                    }`}
                    style={{ zIndex: 10 - depth, transformOrigin: '50% 0%' }}
                    variants={{
                      enter: (d: 1 | -1) =>
                        d === 1
                          ? { opacity: 0, y: 3 * 18, scale: 0.85, x: 0, rotate: 0 }
                          : { opacity: 0, x: -140, rotate: -6, y: 0, scale: 1 },
                      exit: (d: 1 | -1) =>
                        reduce
                          ? { opacity: 0, transition: { duration: 0.15 } }
                          : d === 1
                            ? { opacity: 0, x: -140, rotate: -6, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }
                            : { opacity: 0, y: 3 * 18, scale: 0.85, transition: { duration: 0.3 } },
                    }}
                    initial={reduce ? { opacity: 0 } : 'enter'}
                    animate={{ opacity: depth === 2 ? 0.55 : 1, y: depth * 18, scale: 1 - depth * 0.05, x: 0, rotate: 0 }}
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                    drag={isTop && !reduce ? 'x' : false}
                    dragSnapToOrigin
                    dragElastic={0.6}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -80) go(1)
                      else if (info.offset.x > 80) go(-1)
                    }}
                    aria-hidden={!isTop}
                  >
                    <Quotes size={34} weight="fill" className="text-ochre" />
                    <blockquote className="font-display text-[1.35rem] leading-snug font-medium tracking-tight text-balance text-cream md:text-[1.6rem]">
                      “{r.quote}”
                    </blockquote>
                    <figcaption className="text-sm">
                      <span className="font-semibold text-cream">{r.author}</span>
                      <span className="text-mute">, {r.meta}</span>
                    </figcaption>
                  </motion.figure>
                )
              })}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-sm text-mute tabular-nums" aria-live="polite">
              {index + 1} di {REVIEWS.length}
            </p>
            <div className="flex gap-2">
              {!reduce && (
                <button
                  type="button"
                  onClick={() => setStopped((s) => !s)}
                  aria-label={stopped ? 'Riprendi lo scorrimento automatico' : 'Ferma lo scorrimento automatico'}
                  className="grid size-12 place-items-center rounded-full border border-line text-cream transition-colors hover:border-mute hover:bg-smoke"
                >
                  {stopped ? <Play size={18} weight="fill" /> : <Pause size={18} weight="fill" />}
                </button>
              )}
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Recensione precedente"
                className="grid size-12 place-items-center rounded-full border border-line text-cream transition-colors hover:border-mute hover:bg-smoke"
              >
                <ArrowLeft size={20} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Recensione successiva"
                className="grid size-12 place-items-center rounded-full border border-line text-cream transition-colors hover:border-mute hover:bg-smoke"
              >
                <ArrowRight size={20} weight="bold" />
              </button>
            </div>
          </div>

          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-cream underline decoration-line underline-offset-[6px] transition-colors hover:text-ochre hover:decoration-ochre"
          >
            Leggi tutte le recensioni su Google
            <ArrowRight size={16} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  )
}
