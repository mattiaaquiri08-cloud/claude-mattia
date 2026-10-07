import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowUpRight, MapPin, Phone } from '@phosphor-icons/react'
import { openingHours, salon } from '../data/salon'
import { openStatus, romeNow, type OpenStatus } from '../lib/hours'
import { ButtonLink, MaskedLines, Reveal } from './ui'
import { EASE, cn } from '../lib/utils'

function useOpenStatus() {
  const [status, setStatus] = useState<OpenStatus>(() => openStatus())
  const [today, setToday] = useState(() => romeNow().day)
  useEffect(() => {
    const id = window.setInterval(() => {
      setStatus(openStatus())
      setToday(romeNow().day)
    }, 60_000)
    return () => window.clearInterval(id)
  }, [])
  return { status, today }
}

/** Mappa Google caricata solo su richiesta: niente cookie di terze parti finché non serve. */
function MapEmbed() {
  const [loaded, setLoaded] = useState(false)
  const reduce = useReducedMotion()
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-night-soft sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[22rem]">
      {loaded ? (
        <motion.iframe
          title="Mappa: Claudia Fulli Salon, Via Ruggero Fauro 1, Roma"
          src={salon.mapEmbedUrl}
          className="absolute inset-0 h-full w-full grayscale-[0.9] invert-[0.9] hue-rotate-180"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-5 p-6 md:p-8">
          <img
            src="/images/marmo.webp"
            width={1200}
            height={451}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-35"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" aria-hidden />
          <MapPin size={28} weight="fill" className="relative text-sun" aria-hidden />
          <p className="relative max-w-[28ch] text-[0.9375rem] leading-relaxed text-night-muted">
            La mappa è fornita da Google. Si carica solo se la apri.
          </p>
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="relative inline-flex h-11 items-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium text-paper ring-1 ring-inset ring-paper/30 transition-[box-shadow,transform] duration-300 hover:ring-paper active:scale-[0.97]"
          >
            Mostra la mappa
          </button>
        </div>
      )}
    </div>
  )
}

export function Visit() {
  const { status, today } = useOpenStatus()

  return (
    <section
      id="contatti"
      aria-labelledby="contatti-titolo"
      className="on-night relative overflow-hidden bg-night px-4 pt-28 pb-16 text-paper md:px-8 md:pt-40 md:pb-24"
    >
      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <MaskedLines
              id="contatti-titolo"
              lines={['Ti aspettiamo in', 'Via Ruggero Fauro']}
              className="text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[0.98] font-light tracking-[-0.045em]"
            />
          </div>

          <Reveal className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="max-w-[40ch] text-[1.0625rem] leading-relaxed text-night-muted">
              Prenota online in pochi passaggi su Treatwell, oppure chiama il salone negli orari di apertura.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={salon.bookingUrl} tone="sun" size="lg" icon={<ArrowRight size={17} weight="bold" />}>
                Prenota
              </ButtonLink>
              <ButtonLink href={salon.phoneHref} tone="ghost-night" size="lg" icon={<Phone size={17} />}>
                Chiama
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden bg-night-line md:mt-28 lg:grid-cols-12">
          {/* Orari */}
          <Reveal className="bg-night p-6 md:p-8 lg:col-span-4">
            <h3 className="text-[0.875rem] text-night-muted">Orari</h3>
            <p className="mt-3 flex items-center gap-2.5 text-[1.0625rem]">
              <span className="relative flex size-2.5" aria-hidden>
                {status.open && <span className="absolute inset-0 animate-ping rounded-full bg-sun/70 motion-reduce:animate-none" />}
                <span className={cn('relative size-2.5 rounded-full', status.open ? 'bg-sun' : 'bg-night-muted/60')} />
              </span>
              {status.label}
            </p>
            <dl className="mt-8 flex flex-col gap-1.5">
              {openingHours.map((d) => (
                <div
                  key={d.day}
                  className={cn(
                    'flex items-baseline justify-between gap-4 py-1 text-[0.9375rem] tabular',
                    d.day === today ? 'text-paper' : 'text-night-muted',
                  )}
                >
                  <dt className="flex items-center gap-2">
                    {d.label}
                    {d.day === today && <span className="text-[0.75rem] text-sun">oggi</span>}
                  </dt>
                  <dd>{d.hours ? `${d.hours[0]}:00-${d.hours[1]}:00` : 'Chiuso'}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Indirizzo e contatti */}
          <Reveal delay={0.08} className="flex flex-col gap-8 bg-night p-6 md:p-8 lg:col-span-4">
            <div>
              <h3 className="text-[0.875rem] text-night-muted">Indirizzo</h3>
              <address className="mt-3 text-[1.0625rem] leading-relaxed not-italic">
                {salon.street}
                <br />
                {salon.postalCode} {salon.city}, {salon.district}
              </address>
              <a
                href={salon.directionsUrl}
                target="_blank"
                rel="noopener"
                className="group mt-3 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-sun"
              >
                Indicazioni stradali
                <ArrowUpRight size={15} aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only"> (si apre in una nuova scheda)</span>
              </a>
            </div>
            <div>
              <h3 className="text-[0.875rem] text-night-muted">Come arrivare</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed">{salon.transport}</p>
            </div>
            <div>
              <h3 className="text-[0.875rem] text-night-muted">Telefono</h3>
              <a href={salon.phoneHref} className="mt-3 inline-block text-[1.375rem] font-light tracking-[-0.02em] tabular transition-colors hover:text-sun">
                {salon.phoneDisplay}
              </a>
            </div>
            <div>
              <h3 className="text-[0.875rem] text-night-muted">Da sapere</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed">
                {salon.payments}
                <br />
                {salon.extras.join('. ')}.
              </p>
            </div>
          </Reveal>

          {/* Mappa */}
          <div className="bg-night lg:col-span-4">
            <MapEmbed />
          </div>
        </div>
      </div>
    </section>
  )
}
