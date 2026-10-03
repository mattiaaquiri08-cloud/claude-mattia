import { categories, type Service } from '../content'
import { useBooking } from './booking-context'
import { Button } from './Button'
import { MaskLines, Reveal } from './Reveal'

const euro = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2, minimumFractionDigits: 0 })

function Price({ s }: { s: Service }) {
  if (s.price === null) return <span className="font-display text-[1.0625rem] italic text-ink-soft">su richiesta</span>
  return (
    <span className="font-display text-[1.25rem] tabular-nums text-ink">
      {s.from && <span className="mr-1 font-sans text-[0.75rem] text-ink-soft">da</span>}
      {euro.format(s.price)}
    </span>
  )
}

export function PriceList() {
  const { open } = useBooking()
  const hasPrices = categories.some((c) => c.services.some((s) => s.price !== null))

  return (
    <section id="listino" aria-labelledby="listino-titolo" className="bg-paper-2/60 border-t border-line">
      <div className="wrap grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2
              id="listino-titolo"
              className="font-display text-[clamp(2.6rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.02em]"
            >
              <MaskLines lines={['Il listino']} />
            </h2>
            <p className="mt-6 max-w-[34ch] text-[1.0625rem] leading-relaxed text-ink-soft">
              {hasPrices
                ? 'Prezzi indicativi per trattamento. Durata e dettagli vengono confermati alla prenotazione.'
                : 'Prezzi e durate di ogni trattamento ti vengono indicati al momento della prenotazione o in salone.'}
            </p>
            <Button className="mt-8" onClick={() => open()}>
              Prenota ora
            </Button>
          </div>
        </div>

        <div className="grid gap-x-14 gap-y-14 sm:grid-cols-2 lg:col-span-8">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 0.08}>
              <h3 className="font-display border-b border-ink pb-3 text-[1.75rem] leading-tight">{c.title}</h3>
              <ul className="mt-2">
                {c.services.map((s) => (
                  <li key={s.name} className="py-3.5">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[1rem] text-ink">{s.name}</span>
                      <span className="leader text-ink" aria-hidden />
                      <Price s={s} />
                    </div>
                    {s.duration !== null && (
                      <span className="mt-0.5 block text-[0.8125rem] text-ink-soft">{s.duration} min</span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
