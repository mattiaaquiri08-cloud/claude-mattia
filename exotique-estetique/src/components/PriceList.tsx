import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { categories, highlights, type Service } from '../content'
import { EASE, cn } from '../lib'
import { useBooking } from './booking-context'
import { Button } from './Button'
import { MaskLines, Reveal } from './Reveal'
import { PRICE_EVENT } from './price-events'


const euroInt = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const euroDec = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 })
/* 55 € oppure 14,90 € */
const euro = { format: (n: number) => (Number.isInteger(n) ? euroInt : euroDec).format(n) }

function formatDuration(min: number) {
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h} h ${m} min` : `${h} h`
}

function Row({ s }: { s: Service }) {
  return (
    <li className="py-3">
      <div className="flex items-baseline gap-3">
        <span className="min-w-0 text-[1rem] text-ink">{s.name}</span>
        <span className="leader text-ink" aria-hidden />
        {s.price !== null ? (
          <span className="shrink-0 font-display text-[1.25rem] tabular-nums text-ink">
            {s.from && <span className="mr-1 font-sans text-[0.75rem] text-ink-soft">da</span>}
            {euro.format(s.price)}
          </span>
        ) : (
          <span className="shrink-0 font-display text-[1.0625rem] italic text-ink-soft">{s.note ?? 'su richiesta'}</span>
        )}
      </div>
      {s.duration !== null && (
        <span className="mt-0.5 block text-[0.8125rem] text-ink-soft">{formatDuration(s.duration)}</span>
      )}
    </li>
  )
}

/* Due riquadri in evidenza: l'offerta laser e il BB Glow. */
function Highlights() {
  const { laser, bbGlow } = highlights
  return (
    <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2">
      <Reveal className="relative overflow-hidden bg-night p-8 text-night-ink md:p-10">
        <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-lacca-glow" />
        <p className="text-[0.75rem] font-medium uppercase tracking-[0.22em] text-lacca-glow">Offerta</p>
        <h3 className="font-display mt-3 text-[2rem] leading-tight">{laser.title}</h3>
        <p className="mt-4 flex items-baseline gap-2">
          <span className="font-display opsz-xl text-[3.5rem] leading-none tabular-nums">{euro.format(laser.price)}</span>
          <span className="text-[0.9375rem] text-night-soft">{laser.unit}</span>
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {laser.points.map((pt) => (
            <li key={pt} className="border border-night-line px-3.5 py-2 text-[0.875rem]">
              {pt}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal className="border border-line bg-paper p-8 md:p-10" delay={0.08}>
        <p className="text-[0.75rem] font-medium uppercase tracking-[0.22em] text-ink-soft">Viso</p>
        <h3 className="font-display mt-3 text-[2rem] leading-tight">{bbGlow.title}</h3>
        <p className="mt-1 font-display text-[1.125rem] italic text-ink-soft">{bbGlow.subtitle}</p>
        <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
          {bbGlow.prices.map((pr) => (
            <div key={pr.label} className="flex items-baseline gap-2">
              <dt className="order-2 text-[0.875rem] text-ink-soft">{pr.label}</dt>
              <dd className="font-display text-[1.75rem] leading-none tabular-nums">{euro.format(pr.value)}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[0.9375rem]">
          {bbGlow.points.map((pt) => (
            <li key={pt} className="flex items-baseline gap-2.5">
              <span aria-hidden className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-lacca" />
              {pt}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
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
                ? 'Prezzi del listino del centro. Dove indicato "da", il prezzo varia in base al trattamento.'
                : 'Durate indicative di ogni trattamento. I prezzi ti vengono indicati alla prenotazione.'}
            </p>
            <Button className="self-start lg:self-auto" onClick={() => open(cat.id)}>
              Prenota ora
            </Button>
          </div>
        </div>

        <Highlights />

        <div
          id="listino-elenco"
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
