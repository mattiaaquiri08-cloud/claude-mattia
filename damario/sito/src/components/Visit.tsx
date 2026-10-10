import { CalendarCheck, MapPin, NavigationArrow, Phone, WhatsappLogo } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { DAY_NAMES, HOURS, NEARBY, SITE } from '../data/site'
import { UI } from '../data/ui'
import { useBooking } from '../lib/booking'
import { openStatus, romeNow } from '../lib/hours'
import { useI18n } from '../lib/i18n'

/* Lunedì per primo, domenica in fondo */
const WEEK = [1, 2, 3, 4, 5, 6, 0]

export function Visit() {
  const { t, lang } = useI18n()
  const { openBooking } = useBooking()
  const [status, setStatus] = useState(() => openStatus(lang))
  const [today, setToday] = useState(() => romeNow().weekday)
  const [mapOn, setMapOn] = useState(false)

  // lo stato "aperto ora" si aggiorna ogni minuto
  useEffect(() => {
    const tick = () => {
      setStatus(openStatus(lang))
      setToday(romeNow().weekday)
    }
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [lang])

  return (
    <section id="dove-siamo" className="border-t border-line/60 px-4 py-24 sm:px-6 md:py-36 lg:px-10" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="visit-title" className="h-section">
            {t(UI.visit.heading)}
          </h2>

          <address className="mt-8 not-italic">
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-3 font-display text-[1.9rem] leading-tight text-bone"
            >
              <MapPin size={26} weight="fill" className="mt-1.5 shrink-0 text-ember" />
              <span>
                {SITE.street}
                <span className="block text-[1.25rem] text-mute">{SITE.city}</span>
              </span>
            </a>
          </address>

          <p className="mt-6 max-w-[48ch] leading-relaxed text-mute">
            {t(UI.visit.near)} {NEARBY.join(', ')}.
          </p>

          <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-line px-4 py-2 text-sm text-bone" role="status">
            <span className={`size-2 rounded-full ${status.open ? 'live-dot bg-ok' : 'bg-mute'}`} aria-hidden="true" />
            {status.label}
          </p>

          <div className="mt-10">
            <h3 className="text-sm font-semibold text-bone">{t(UI.visit.hours)}</h3>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-8 gap-y-2.5 text-[0.98rem]">
              {WEEK.map((d) => {
                const slots = HOURS[d]
                const isToday = d === today
                return (
                  <div key={d} className={`contents ${isToday ? 'text-bone' : 'text-mute'}`}>
                    <dt className={isToday ? 'font-semibold' : ''}>
                      {DAY_NAMES[lang][d]}
                      {isToday && <span className="ml-2 text-xs font-medium text-ember">{t(UI.visit.today)}</span>}
                    </dt>
                    <dd className="tabular-nums">
                      {slots.length ? slots.map(([a, b]) => `${a}-${b}`).join(', ') : t(UI.visit.closed)}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={SITE.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <NavigationArrow size={18} weight="bold" />
              {t(UI.cta.directions)}
            </a>
            <a href={SITE.phoneHref} className="btn-ghost">
              <Phone size={18} weight="bold" />
              {SITE.phoneDisplay}
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            <button type="button" onClick={openBooking} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-bone underline-offset-4 hover:underline">
              <CalendarCheck size={18} className="text-ember" />
              {t(UI.cta.book)}
            </button>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-bone underline-offset-4 hover:underline"
            >
              <WhatsappLogo size={18} className="text-whatsapp" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Mappa: si carica da Google solo quando la si chiede (più veloce e rispettoso della privacy) */}
        <div className="lg:col-span-7">
          <div className="relative h-[420px] overflow-hidden rounded-[var(--radius-media)] border border-line bg-coal sm:h-[520px] lg:h-full lg:min-h-[620px]">
            {mapOn ? (
              <iframe
                title={t(UI.visit.mapTitle)}
                src={SITE.mapEmbed(lang)}
                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.35)_contrast(1.05)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <>
                <picture>
                  <source type="image/avif" srcSet="./img/hero-mobile-640.avif 640w, ./img/hero-mobile-941.avif 941w" sizes="(min-width: 1024px) 55vw, 100vw" />
                  <img
                    src="./img/hero-mobile-941.webp"
                    srcSet="./img/hero-mobile-640.webp 640w, ./img/hero-mobile-941.webp 941w"
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    alt={t({ it: 'La tenda e la porta di Da Mario in Via Silvio Spaventa 19', en: 'The awning and door of Da Mario at Via Silvio Spaventa 19' })}
                    width={941}
                    height={1672}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
                  />
                </picture>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-6 sm:p-8">
                  <button type="button" onClick={() => setMapOn(true)} className="btn-ghost">
                    <MapPin size={18} weight="bold" />
                    {t(UI.visit.mapLoad)}
                  </button>
                  <p className="text-xs text-bone/70">{t(UI.visit.mapNote)}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
