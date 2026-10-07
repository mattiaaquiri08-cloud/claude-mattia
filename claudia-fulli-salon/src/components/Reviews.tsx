import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'motion/react'
import { ArrowUpRight, CaretLeft, CaretRight, Star } from '@phosphor-icons/react'
import { reviews, salon } from '../data/salon'
import { MaskedLines, Reveal } from './ui'
import { EASE, cn } from '../lib/utils'

// Adattato dal componente 21st "Editorial Testimonial" (jatin-yadav05):
// citazione grande, autore, selettore a linee e frecce. Qui con transizioni Motion
// legate alla direzione, scorrimento col dito e navigazione da tastiera.

function Rating({ score, count, source, href }: { score: string; count: number; source: string; href: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end gap-4">
        <span className="text-[clamp(3.5rem,6vw,5.5rem)] leading-[0.85] font-light tracking-[-0.05em] tabular">{score}</span>
        <span className="flex gap-0.5 pb-1.5 text-sun-deep" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} weight="fill" />
          ))}
        </span>
      </div>
      <p className="text-[0.9375rem] text-muted">
        {count} recensioni su {source}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="group inline-flex items-center gap-1.5 self-start text-[0.9375rem] font-medium"
      >
        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:100%_1px]">
          Leggi su {source}
        </span>
        <ArrowUpRight size={15} aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        <span className="sr-only"> (si apre in una nuova scheda)</span>
      </a>
    </div>
  )
}

export function Reviews() {
  const reduce = useReducedMotion()
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const review = reviews[index]

  const go = (next: number, dir: number) => {
    setState([(next + reviews.length) % reviews.length, dir])
  }

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(index + 1, 1)
    else if (info.offset.x > 60) go(index - 1, -1)
  }

  return (
    <section id="recensioni" aria-labelledby="recensioni-titolo" className="bg-mist px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-12 lg:col-span-4">
          <MaskedLines
            id="recensioni-titolo"
            lines={['Cosa dicono', 'i clienti']}
            className="text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[0.98] font-light tracking-[-0.045em]"
          />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-1 lg:gap-10">
            <Reveal>
              <Rating score={salon.ratings.google.score} count={salon.ratings.google.count} source="Google" href={salon.googleUrl} />
            </Reveal>
            <Reveal delay={0.1}>
              <Rating score={salon.ratings.treatwell.score} count={salon.ratings.treatwell.count} source="Treatwell" href={salon.bookingUrl} />
            </Reveal>
          </div>
        </div>

        <div
          className="flex flex-col lg:col-span-7 lg:col-start-6 lg:pt-3"
          role="region"
          aria-roledescription="carosello"
          aria-label="Recensioni delle clienti"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(index + 1, 1)
            if (e.key === 'ArrowLeft') go(index - 1, -1)
          }}
        >
          <div className="relative min-h-[15rem] sm:min-h-[14rem] lg:min-h-[15rem]">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                aria-live="polite"
                drag={reduce ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={onDragEnd}
                className="cursor-grab touch-pan-y select-none active:cursor-grabbing"
                variants={{
                  enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * 48, filter: 'blur(6px)' }),
                  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
                  exit: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * -32, filter: 'blur(6px)' }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: EASE }}
              >
                <blockquote>
                  <p className="text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.12] font-light tracking-[-0.03em] text-balance">
                    “{review.quote}”
                  </p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 text-[0.9375rem]">
                  <span className="h-px w-8 bg-ink/40" aria-hidden />
                  <span className="font-medium">{review.author}</span>
                  <span className="text-muted">recensione {review.source}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-between gap-6">
            <div className="flex items-center gap-1">
              {reviews.map((r, i) => (
                <button
                  key={r.author}
                  type="button"
                  onClick={() => go(i, i > index ? 1 : -1)}
                  aria-label={`Recensione ${i + 1} di ${reviews.length}`}
                  aria-current={i === index ? 'true' : undefined}
                  className="group flex h-11 items-center px-1"
                >
                  <span
                    className={cn(
                      'block h-px transition-[width,background-color] duration-500 ease-out-expo',
                      i === index ? 'w-12 bg-ink' : 'w-6 bg-ink/25 group-hover:w-8 group-hover:bg-ink/50',
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(index - 1, -1)}
                aria-label="Recensione precedente"
                className="inline-flex size-12 items-center justify-center rounded-full ring-1 ring-inset ring-ink/20 transition-[background-color,color,box-shadow,transform] duration-300 hover:bg-ink hover:text-paper hover:ring-ink active:scale-95"
              >
                <CaretLeft size={18} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1, 1)}
                aria-label="Recensione successiva"
                className="inline-flex size-12 items-center justify-center rounded-full ring-1 ring-inset ring-ink/20 transition-[background-color,color,box-shadow,transform] duration-300 hover:bg-ink hover:text-paper hover:ring-ink active:scale-95"
              >
                <CaretRight size={18} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
