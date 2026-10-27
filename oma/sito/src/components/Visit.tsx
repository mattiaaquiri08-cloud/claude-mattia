import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { MapPin, NavigationArrow, Phone, WhatsappLogo } from '@phosphor-icons/react'
import { DAY_NAMES, SITE, WEEK_ORDER } from '../data/site'
import { formatDayHours, openStatus, romeNow } from '../lib/hours'
import { useLiveData } from '../lib/live-data'

export function Visit() {
  const reduce = useReducedMotion()
  // ridisegna quando arrivano gli orari dal foglio e una volta al minuto
  useLiveData()
  const [, setTick] = useState(0)
  const [mappa, setMappa] = useState(false)
  const status = openStatus()
  const today = romeNow().weekday

  useEffect(() => {
    const t = window.setInterval(() => setTick((n) => n + 1), 60_000)
    return () => window.clearInterval(t)
  }, [])

  return (
    <section id="dove-siamo" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="font-display text-5xl leading-none font-semibold tracking-[-0.03em] md:text-7xl">Dove siamo</h2>

        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="flex flex-col md:col-span-5">
            <address className="font-display text-3xl leading-tight font-medium tracking-tight not-italic md:text-4xl">
              {SITE.address}
              <br />
              <span className="text-mute">{SITE.city}</span>
            </address>
            <p className="mt-3 text-ink/70">Nel Quartiere Africano.</p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <a href={SITE.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary col-span-2 !px-6">
                <NavigationArrow size={18} weight="bold" />
                Indicazioni
              </a>
              <a href={SITE.phoneHref} className="btn-ghost !px-6">
                <Phone size={18} weight="bold" />
                <span className="sm:hidden">Chiama</span>
                <span className="hidden sm:inline">{SITE.phoneDisplay}</span>
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !px-6"
                aria-label="Scrivici su WhatsApp"
              >
                <WhatsappLogo size={18} weight="bold" />
                WhatsApp
              </a>
            </div>

            <div className="mt-14">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold tracking-tight">Orari</h3>
                <p className="flex items-center gap-2.5 text-sm text-ink/85" aria-live="polite">
                  <span
                    className={`size-2 rounded-full ${status.open ? 'live-dot bg-ok' : 'bg-mute'}`}
                    aria-hidden="true"
                  />
                  {status.label}
                </p>
              </div>
              <dl className="mt-5 grid grid-cols-1 gap-1">
                {WEEK_ORDER.map((wd) => {
                  const isToday = wd === today
                  const hours = formatDayHours(wd)
                  return (
                    <div
                      key={wd}
                      className={`flex items-baseline justify-between gap-4 rounded-[12px] px-4 py-2.5 ${
                        isToday ? 'bg-paper-3' : ''
                      }`}
                    >
                      <dt className={isToday ? 'font-semibold text-ink' : 'text-ink/80'}>
                        {DAY_NAMES[wd]}
                        {isToday && <span className="ml-2 text-xs font-medium text-ochre-deep">oggi</span>}
                      </dt>
                      <dd className={`text-right tabular-nums ${hours === 'Chiuso' ? 'text-mute' : 'text-ink/90'}`}>
                        {hours}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </div>
          </div>

          <motion.div
            className="md:col-span-7"
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-[380px] overflow-hidden rounded-[var(--radius-media)] border border-line bg-paper-3 md:h-full md:min-h-[560px]">
              {/* La mappa di Google usa i suoi cookie: si carica solo se il visitatore la chiede (niente banner) */}
              {mappa ? (
                <iframe
                  title="Mappa: OMA Osteria Moderna, Via Costantino Maes 78, Roma"
                  src={SITE.mapEmbed}
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                  style={{ filter: 'grayscale(0.4) sepia(0.12) contrast(0.95)' }}
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center">
                  <MapPin size={40} weight="duotone" className="text-ochre" />
                  <p className="max-w-[34ch] text-ink/80">
                    La mappa è di Google e usa i suoi cookie: la carichiamo solo se la chiedi.{' '}
                    <a href="#privacy" className="underline underline-offset-2 hover:text-ink">
                      Privacy
                    </a>
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button type="button" onClick={() => setMappa(true)} className="btn-primary">
                      Mostra la mappa
                    </button>
                    <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                      Apri in Google Maps
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
