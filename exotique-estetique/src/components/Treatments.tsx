import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Plus } from '@phosphor-icons/react'
import { categories } from '../content'
import { EASE, cn } from '../lib'
import { useBooking } from './booking-context'
import { Button } from './Button'
import { MaskLines } from './Reveal'
import { showInPriceList } from './price-events'

function plural(n: number) {
  return n === 1 ? '1 servizio' : `${n} servizi`
}

export function Treatments() {
  const { open } = useBooking()
  const [active, setActive] = useState(0)

  return (
    <section id="trattamenti" aria-labelledby="trattamenti-titolo" className="border-t border-line bg-paper-2/60">
      <div className="wrap py-24 md:py-36">
        <h2
          id="trattamenti-titolo"
          className="font-display max-w-[16ch] text-[clamp(2.6rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.02em]"
        >
          <MaskLines lines={['Sei mondi,', <em key="e">una sola cura.</em>]} />
        </h2>

        <div className="mt-16 md:mt-24">
          <ul>
            {categories.map((c, i) => {
              const isOpen = active === i
              return (
                <li key={c.id} className="border-t border-line last:border-b">
                  <h3>
                    <button
                      type="button"
                      id={`tratt-${c.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`tratt-panel-${c.id}`}
                      onClick={() => setActive(isOpen ? -1 : i)}
                      className="group flex w-full items-center gap-6 py-6 text-left md:py-8"
                    >
                      <span
                        className={cn(
                          'font-display flex-1 text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.05] tracking-[-0.015em] transition-[color,transform] duration-500 ease-out-expo',
                          isOpen ? 'text-ink' : 'text-ink/55 group-hover:text-ink',
                          'group-hover:translate-x-2',
                        )}
                      >
                        {c.title}
                      </span>
                      <span className="hidden text-[0.8125rem] text-ink-soft sm:block">{plural(c.services.length)}</span>
                      <span
                        aria-hidden
                        className={cn(
                          'grid size-10 shrink-0 place-items-center border transition-colors duration-500',
                          isOpen ? 'border-lacca bg-lacca text-lacca-ink' : 'border-line text-ink group-hover:border-ink',
                        )}
                      >
                        <motion.span
                          className="grid place-items-center"
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                        >
                          <Plus size={16} weight="regular" />
                        </motion.span>
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`tratt-panel-${c.id}`}
                        role="region"
                        aria-labelledby={`tratt-${c.id}`}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-10 sm:grid-cols-[1fr_auto] sm:items-end">
                          <div>
                            <div className="mb-6 aspect-[4/3] overflow-hidden lg:hidden">
                              <img
                                src={c.image}
                                alt={c.imageAlt}
                                className="size-full object-cover"
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-soft">{c.intro}</p>
                            <ul className="mt-6 flex flex-wrap gap-2">
                              {c.services.slice(0, 5).map((s) => (
                                <li
                                  key={s.name}
                                  className="border border-line px-3.5 py-2 text-[0.875rem] text-ink"
                                >
                                  {s.name}
                                </li>
                              ))}
                            </ul>
                            {c.services.length > 5 && (
                              <a
                                href="#listino-elenco"
                                onClick={() => showInPriceList(c.id)}
                                className="mt-1 inline-flex min-h-11 items-center text-[0.875rem] text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                              >
                                Tutti i {c.services.length} trattamenti nel listino
                              </a>
                            )}
                          </div>
                          <Button variant="ink" onClick={() => open(c.id)}>
                            Prenota
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

        </div>
      </div>
    </section>
  )
}
