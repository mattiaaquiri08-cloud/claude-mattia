import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from '@phosphor-icons/react'
import { business, rating, reviews } from '../content'
import { EASE } from '../lib'
import { ButtonLink } from './Button'
import { MaskLines, Reveal } from './Reveal'

/*
 * Con recensioni reali in content.ts: una citazione alla volta, grande.
 * Senza: un invito onesto a leggerle e lasciarle sul profilo Google.
 */
export function Reviews() {
  const [i, setI] = useState(0)
  const has = reviews.length > 0
  const r = has ? reviews[i % reviews.length] : null

  return (
    <section aria-labelledby="recensioni-titolo" className="border-t border-line py-24 md:py-36">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-10 lg:col-start-2">
          <h2
            id="recensioni-titolo"
            className="font-display text-[clamp(2.6rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.02em]"
          >
            <MaskLines lines={['Le vostre parole.']} />
          </h2>

          {rating && (
            <p className="mt-6 flex items-center gap-2 text-[1rem] text-ink-soft">
              <Star size={18} weight="fill" className="text-lacca" aria-hidden />
              <span className="text-ink">{rating.value.toLocaleString('it-IT')}</span> su {rating.count} recensioni{' '}
              {rating.source}
            </p>
          )}

          {r ? (
            <div className="mt-14">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <blockquote className="font-display max-w-[30ch] text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.2]">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 text-[0.9375rem] text-ink-soft">
                    <span className="text-ink">{r.author}</span>, recensione {r.source}, {r.date}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
              {reviews.length > 1 && (
                <div className="mt-10 flex gap-2">
                  <button
                    type="button"
                    aria-label="Recensione precedente"
                    onClick={() => setI((v) => (v - 1 + reviews.length) % reviews.length)}
                    className="grid size-12 place-items-center border border-line transition-colors hover:border-ink"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label="Recensione successiva"
                    onClick={() => setI((v) => (v + 1) % reviews.length)}
                    className="grid size-12 place-items-center border border-line transition-colors hover:border-ink"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Reveal className="mt-8 grid gap-10 md:grid-cols-[minmax(0,38ch)_auto] md:items-end md:justify-between">
              <p className="text-[1.125rem] leading-relaxed text-ink-soft">
                Le esperienze delle clienti sono raccolte sul profilo Google del centro. Leggile prima di prenotare, e
                lascia la tua dopo il trattamento.
              </p>
              <ButtonLink href={business.mapsUrl} target="_blank" rel="noopener noreferrer" variant="ghost">
                Leggi su Google
                <ArrowUpRight size={16} aria-hidden />
              </ButtonLink>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
