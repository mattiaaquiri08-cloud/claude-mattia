import { ArrowUp, ArrowUpRight, CalendarCheck, FacebookLogo, InstagramLogo, Phone } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { SITE } from '../data/site'
import { UI } from '../data/ui'
import { useBooking } from '../lib/booking'
import { useI18n } from '../lib/i18n'
import { LangSwitch, Wordmark } from './Nav'

const YEAR = new Date().getFullYear()

export function FinalCta() {
  const { t } = useI18n()
  const { openBooking } = useBooking()
  return (
    <section className="relative isolate overflow-hidden bg-coal px-4 pt-28 pb-24 sm:px-6 md:pt-36 md:pb-32 lg:px-10" aria-labelledby="final-title">
      {/* il festone della tenda chiude la pagina come la apre la splash */}
      <div aria-hidden="true" className="scallop absolute inset-x-0 top-0 h-[22px]" />
      <div aria-hidden="true" className="embers absolute inset-0 -z-10 opacity-70" />
      <motion.div
        className="mx-auto flex max-w-[1100px] flex-col items-center text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 id="final-title" className="font-display text-[3rem] leading-[1] font-medium text-balance sm:text-7xl lg:text-[5.6rem]">
          {t(UI.final.heading)}
        </h2>
        <p className="mt-6 max-w-[44ch] text-[1.08rem] leading-relaxed text-bone/80">{t(UI.final.sub)}</p>
        <div className="mt-10 flex w-full max-w-[22rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <button type="button" onClick={openBooking} className="btn-primary">
            <CalendarCheck size={18} weight="bold" />
            {t(UI.cta.book)}
          </button>
          <a href={SITE.phoneHref} className="btn-ghost">
            <Phone size={18} weight="bold" />
            {SITE.phoneDisplay}
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export function Footer() {
  const { t } = useI18n()
  const links = [
    { href: SITE.mapsUrl, label: 'Google Maps' },
    { href: SITE.googleReviewsUrl, label: t(UI.nav.reviews) + ' Google' },
    { href: SITE.tripadvisorUrl, label: 'Tripadvisor' },
  ]

  return (
    <footer className="border-t border-line bg-ink px-4 pt-16 pb-28 sm:px-6 md:pb-12 lg:px-10">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Wordmark />
          <p className="mt-6 leading-relaxed text-mute">
            {SITE.street}
            <br />
            {SITE.city}
          </p>
          <a href={SITE.phoneHref} className="mt-3 inline-flex min-h-11 items-center gap-2 text-bone hover:text-ember">
            <Phone size={16} />
            {SITE.phoneDisplay}
          </a>
        </div>

        <div className="md:col-span-4">
          <h2 className="text-sm font-semibold text-bone">{t(UI.visit.hours)}</h2>
          <p className="mt-4 leading-relaxed text-mute">
            {t({ it: 'Lunedì - sabato', en: 'Monday - Saturday' })}
            <br />
            12:00-15:00, 18:00-23:30
            <br />
            {t({ it: 'Domenica chiuso', en: 'Closed on Sunday' })}
          </p>
        </div>

        <div className="md:col-span-4">
          <h2 className="text-sm font-semibold text-bone">{t(UI.footer.find)}</h2>
          <ul className="mt-3 flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-mute hover:text-bone">
                  {l.label}
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </li>
            ))}
            {SITE.instagramUrl && (
              <li>
                <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-mute hover:text-bone">
                  <InstagramLogo size={18} />
                  Instagram
                </a>
              </li>
            )}
            {SITE.facebookUrl && (
              <li>
                <a href={SITE.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-mute hover:text-bone">
                  <FacebookLogo size={18} />
                  Facebook
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1400px] flex-col gap-5 border-t border-line pt-6 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {YEAR} Ristorante da Mario di Valerio Palermo. {t(UI.footer.rights)}
        </p>
        <div className="flex items-center gap-3">
          <LangSwitch />
          <a href="#top" className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-btn)] px-3 hover:text-bone">
            <ArrowUp size={16} weight="bold" />
            {t(UI.footer.top)}
          </a>
        </div>
      </div>
    </footer>
  )
}
