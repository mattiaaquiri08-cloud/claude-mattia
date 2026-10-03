import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { categories, type Service } from '../content'
import { EASE, cn } from '../lib'
import { useBooking } from './booking-context'
import { Button } from './Button'
import { MaskLines } from './Reveal'
import { PRICE_EVENT } from './price-events'


const euro = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2, minimumFractionDigits: 0 })

function formatDuration(min: number) {
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h} h ${m} min` : `${h} h`
}

function Row({ s }: { s: Service }) {
  return (
    <li className="flex items-baseline gap-3 py-3">
      <span className="text-[1rem] text-ink">{s.name}</span>
      <span className="leader text-ink" aria-hidden />
      {s.price !== null ? (
        <span className="font-display text-[1.25rem] tabular-nums text-ink">
          {s.from && <span className="mr-1 font-sans text-[0.75rem] text-ink-soft">da</span>}
          {euro.format(s.price)}
        </span>
      ) : (
        <span className="shrink-0 text-[0.875rem] tabular-nums text-ink-soft">
          {s.duration !== null ? formatDuration(s.duration) : 'su richiesta'}
        </span>
      )}
    </li>
  )
}

export function PriceList() {
  const { open } = useBooking()
  const [active, setActive] = useState(categories[0].id)
  const cat = categories.find((c) => c.id === active) ?? categories[0]
  const hasPrices = categories.some((c) => c.services.some((s) => s.price !== null))

  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<string>).detail)
    window.addEventListener(PRICE_EVENT, on)
    return () => window.removeEventListener(PRICE_EVENT, on)
  }, [])

  const half = Math.ceil(cat.services.length / 2)

  return (
    <section id="listino" aria-labelledby="listino-titolo" className="border-t border-line bg-paper-2/60">
      <div className="wrap py-24 md:py-36">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2
            id="listino-titolo"
            className="font-display text-[clamp(2.6rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.02em] lg:col-span-6"
          >
            <MaskLines lines={['Il listino']} />
          </h2>
          <div className="flex flex-col gap-6 lg:col-span-6 lg:flex-row lg:items-end lg:justify-end">
            <p className="max-w-[40ch] text-[1rem] leading-relaxed text-ink-soft lg:text-right">
              {hasPrices
                ? 'Prezzi per trattamento. Dettagli e durata vengono confermati alla prenotazione.'
                : 'Durate indicative di ogni trattamento. I prezzi ti vengono indicati alla prenotazione.'}
            </p>
            <Button className="self-start lg:self-auto" onClick={() => open(cat.id)}>
              Prenota ora
            </Button>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Categorie del listino"
          className="no-scrollbar -mx-5 mt-14 flex gap-1 overflow-x-auto border-b border-line px-5 md:mx-0 md:mt-20 md:px-0"
        >
          {categories.map((c) => {
            const on = c.id === active
            return (
              <button
                key={c.id}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={on}
                aria-controls="listino-pannello"
                onClick={() => setActive(c.id)}
                className={cn(
                  'relative shrink-0 whitespace-nowrap px-4 pb-4 pt-2 text-[0.9375rem] transition-colors duration-300',
                  on ? 'text-ink' : 'text-ink-soft hover:text-ink',
                )}
              >
                {c.title}
                <span className="ml-1.5 text-[0.75rem] tabular-nums text-ink-soft">{c.services.length}</span>
                {on && (
                  <motion.span
                    layoutId="listino-tab"
                    className="absolute inset-x-0 -bottom-px h-[2px] bg-lacca"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <div id="listino-pannello" role="tabpanel" aria-labelledby={`tab-${cat.id}`} className="mt-8 min-h-[14rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="grid gap-x-16 md:grid-cols-2"
            >
              <ul>
                {cat.services.slice(0, half).map((s) => (
                  <Row key={s.name} s={s} />
                ))}
              </ul>
              <ul>
                {cat.services.slice(half).map((s) => (
                  <Row key={s.name} s={s} />
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
