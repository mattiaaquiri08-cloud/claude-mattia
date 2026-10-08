import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { NavigationArrow, Phone, WhatsappLogo } from '@phosphor-icons/react'
import { DAY_NAMES, SITE, WEEK_ORDER } from '../data/site'
import { formatDayHours, openStatus, romeNow } from '../lib/hours'

export function Visit() {
  const reduce = useReducedMotion()
  const [status, setStatus] = useState(openStatus)
  const [today, setToday] = useState(() => romeNow().weekday)

  useEffect(() => {
    const t = window.setInterval(() => {
      setStatus(openStatus())
      setToday(romeNow().weekday)
    }, 60_000)
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
            <p className="mt-3 text-cream/70">Quartiere Nomentano, a due passi dalla Circonvallazione Nomentana.</p>

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
                <p className="flex items-center gap-2.5 text-sm text-cream/85" aria-live="polite">
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
                        isToday ? 'bg-smoke' : ''
                      }`}
                    >
                      <dt className={isToday ? 'font-semibold text-cream' : 'text-cream/80'}>
                        {DAY_NAMES[wd]}
                        {isToday && <span className="ml-2 text-xs font-medium text-ochre">oggi</span>}
                      </dt>
                      <dd className={`text-right tabular-nums ${hours === 'Chiuso' ? 'text-mute' : 'text-cream/90'}`}>
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
            <div className="relative h-[380px] overflow-hidden rounded-[var(--radius-media)] border border-line bg-smoke md:h-full md:min-h-[560px]">
              <iframe
                title="Mappa: OMA Osteria Moderna, Via Costantino Maes 78, Roma"
                src={SITE.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                style={{ filter: 'invert(0.92) hue-rotate(180deg) saturate(0.55) contrast(0.92) brightness(0.95)' }}
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
