import { ArrowUpRight, Clock, MapPin, Phone } from '@phosphor-icons/react'
import { forwardRef } from 'react'
import { business } from '../content'
import { useBooking } from './booking-context'
import { Button, ButtonLink } from './Button'
import { MaskLines, Reveal } from './Reveal'
import { Wordmark } from './Nav'

const YEAR = new Date().getFullYear()

/* L'unico blocco scuro della pagina: la chiusura, dove si prenota. */
export const Visit = forwardRef<HTMLElement>(function Visit(_, ref) {
  const { open } = useBooking()
  return (
    <section
      ref={ref}
      id="visita"
      aria-labelledby="visita-titolo"
      className="bg-night text-night-ink"
    >
      <div className="wrap pb-12 pt-24 md:pt-36">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2
              id="visita-titolo"
              className="font-display text-[clamp(2.8rem,7vw,6.25rem)] leading-[1] tracking-[-0.025em]"
            >
              <MaskLines lines={['Ti aspettiamo', <em key="e">a La Storta.</em>]} />
            </h2>
            <Reveal className="mt-10 flex flex-wrap gap-3">
              <Button onClick={() => open()}>Prenota ora</Button>
              <ButtonLink href={business.directionsUrl} target="_blank" rel="noopener noreferrer" variant="ghost-light">
                Indicazioni
                <ArrowUpRight size={16} aria-hidden />
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5 lg:pt-4" delay={0.1}>
            <dl className="grid gap-8 text-[1.0625rem]">
              <div className="flex gap-4 border-t border-night-line pt-6">
                <MapPin size={22} weight="light" className="mt-0.5 shrink-0 text-night-soft" aria-hidden />
                <div>
                  <dt className="text-[0.8125rem] text-night-soft">Indirizzo</dt>
                  <dd className="mt-1">
                    <a
                      href={business.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-night-line underline-offset-4 transition-colors hover:decoration-current"
                    >
                      {business.street}
                      <br />
                      {business.postalCode} {business.city}, {business.district}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4 border-t border-night-line pt-6">
                <Phone size={22} weight="light" className="mt-0.5 shrink-0 text-night-soft" aria-hidden />
                <div>
                  <dt className="text-[0.8125rem] text-night-soft">Telefono</dt>
                  <dd className="mt-1 flex flex-col gap-1">
                    <a href={business.phone.href} className="tabular-nums transition-opacity hover:opacity-70">
                      {business.phone.display}
                    </a>
                    <a href={business.mobile.href} className="tabular-nums transition-opacity hover:opacity-70">
                      {business.mobile.display}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4 border-t border-night-line pt-6">
                <Clock size={22} weight="light" className="mt-0.5 shrink-0 text-night-soft" aria-hidden />
                <div>
                  <dt className="text-[0.8125rem] text-night-soft">Orari</dt>
                  <dd className="mt-1">
                    {business.hours ? (
                      <ul>
                        {business.hours.map((h) => (
                          <li key={h.days} className="flex justify-between gap-6">
                            <span>{h.days}</span>
                            <span className="tabular-nums">{h.time}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>Su appuntamento. Scrivici su WhatsApp per la prima disponibilità.</span>
                    )}
                  </dd>
                </div>
              </div>
            </dl>
          </Reveal>
        </div>

        <footer className="mt-28 border-t border-night-line pt-10 md:mt-40">
          <p aria-hidden className="text-[clamp(2.2rem,8.6vw,9.5rem)] leading-none">
            <Wordmark />
          </p>
          <div className="mt-10 flex flex-col gap-4 text-[0.875rem] text-night-soft md:flex-row md:items-center md:justify-between">
            <p>
              &copy; {YEAR} {business.name}. {business.street}, {business.postalCode} {business.city}.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a href={business.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-night-ink">
                  Facebook
                </a>
              </li>
              <li>
                <a href={business.treatwellUrl} target="_blank" rel="noopener noreferrer" className="hover:text-night-ink">
                  Treatwell
                </a>
              </li>
              <li>
                <a href="#top" className="hover:text-night-ink">
                  Torna su
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
})
