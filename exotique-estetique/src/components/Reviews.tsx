import { AnimatePresence, motion, type PanInfo } from 'motion/react'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Star, StarHalf } from '@phosphor-icons/react'
import { business, reviews } from '../content'
import { EASE, cn } from '../lib'
import { ButtonLink } from './Button'
import { MaskLines, Reveal } from './Reveal'

/* Valutazione reale di Google a sinistra, citazioni reali a scorrimento a destra. */
export function Reviews() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const r = reviews[i]
  const { rating } = business

  const go = (delta: number) => {
    setDir(delta)
    setI((v) => (v + delta + reviews.length) % reviews.length)
  }
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1)
    else if (info.offset.x > 60) go(-1)
  }

  return (
    <section aria-labelledby="recensioni-titolo" className="border-t border-line py-24 md:py-36">
      <div className="wrap">
        <h2
          id="recensioni-titolo"
          className="font-display text-[clamp(2.6rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.02em]"
        >
          <MaskLines lines={['Le vostre parole.']} />
        </h2>

        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <p className="font-display opsz-xl text-[clamp(5rem,11vw,8.5rem)] leading-[0.9] tracking-[-0.03em]">
              {rating.value.toLocaleString('it-IT')}
            </p>
            <div className="mt-5 flex gap-1 text-lacca" aria-hidden>
              {[0, 1, 2, 3, 4].map((k) => {
                const fill = rating.value - k
                if (fill >= 0.75) return <Star key={k} size={20} weight="fill" />
                if (fill >= 0.25) return <StarHalf key={k} size={20} weight="fill" />
                return <Star key={k} size={20} weight="regular" />
              })}
            </div>
            <p className="mt-4 text-[1rem] text-ink-soft">
              <span className="sr-only">
                {rating.value.toLocaleString('it-IT')} stelle su 5,{' '}
              </span>
              su {rating.count} recensioni {rating.source}
            </p>
            <ButtonLink
              href={business.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              className="mt-8"
            >
              Leggi su Google
              <ArrowUpRight size={16} aria-hidden />
            </ButtonLink>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="relative min-h-[15rem] overflow-hidden md:min-h-[17rem]" aria-live="polite">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.figure
                  key={i}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                    center: { opacity: 1, x: 0 },
                    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={onDragEnd}
                  className="cursor-grab touch-pan-y active:cursor-grabbing"
                >
                  <blockquote className="font-display max-w-[32ch] text-[clamp(1.6rem,3.1vw,2.6rem)] leading-[1.22]">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 text-[0.9375rem] text-ink-soft">
                    <span className="text-ink">{r.author}</span>, recensione {r.source}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-between gap-6">
              <div className="flex gap-2" role="group" aria-label="Scegli la recensione">
                {reviews.map((rv, k) => (
                  <button
                    key={rv.author}
                    type="button"
                    aria-label={`Recensione di ${rv.author}`}
                    aria-current={k === i}
                    onClick={() => {
                      setDir(k > i ? 1 : -1)
                      setI(k)
                    }}
                    className="grid h-11 w-8 place-items-center"
                  >
                    <span
                      className={cn(
                        'block h-[2px] w-full transition-colors duration-500',
                        k === i ? 'bg-lacca' : 'bg-line',
                      )}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Recensione precedente"
                  onClick={() => go(-1)}
                  className="grid size-12 place-items-center border border-line transition-colors hover:border-ink"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Recensione successiva"
                  onClick={() => go(1)}
                  className="grid size-12 place-items-center border border-line transition-colors hover:border-ink"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
