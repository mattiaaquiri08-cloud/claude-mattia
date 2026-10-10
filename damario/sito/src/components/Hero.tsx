import { CalendarCheck, MapPin } from '@phosphor-icons/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { UI } from '../data/ui'
import { useBooking } from '../lib/booking'
import { useI18n } from '../lib/i18n'
import { scrollToId } from '../lib/scroll'

/**
 * Hero: solo la fotografia e i due pulsanti.
 * Su smartphone la foto verticale (la porta sotto la tenda), da tablet in su quella orizzontale (la sala).
 */
export function Hero({ revealed }: { revealed: boolean }) {
  const { t } = useI18n()
  const { openBooking } = useBooking()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // la foto scorre un po' più lenta della pagina: profondità, non spettacolo
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%'])

  return (
    <section ref={ref} id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      <h1 className="sr-only">Ristorante da Mario di Valerio Palermo, cucina romana a Roma</h1>

      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.08 }}
          animate={revealed ? { scale: 1 } : { scale: 1.08 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <picture>
            <source
              media="(max-width: 767px)"
              type="image/avif"
              srcSet="./img/hero-mobile-640.avif 640w, ./img/hero-mobile-941.avif 941w"
              sizes="100vw"
            />
            <source
              media="(max-width: 767px)"
              type="image/webp"
              srcSet="./img/hero-mobile-640.webp 640w, ./img/hero-mobile-941.webp 941w"
              sizes="100vw"
            />
            <source
              type="image/avif"
              srcSet="./img/hero-desktop-800.avif 800w, ./img/hero-desktop-1280.avif 1280w, ./img/hero-desktop-1672.avif 1672w"
              sizes="100vw"
            />
            <img
              src="./img/hero-desktop-1672.webp"
              srcSet="./img/hero-desktop-800.webp 800w, ./img/hero-desktop-1280.webp 1280w, ./img/hero-desktop-1672.webp 1672w"
              sizes="100vw"
              alt={t({
                it: 'Da Mario: la sala con le tovaglie bianche e la parete delle bottiglie; su smartphone, l\'ingresso sotto la tenda',
                en: 'Da Mario: the dining room with white tablecloths and the wall of wine bottles; on phones, the entrance under the awning',
              })}
              width={1672}
              height={941}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-[50%_42%] max-md:object-[50%_30%]"
            />
          </picture>
        </motion.div>
      </motion.div>

      {/* veli leggeri: in alto per il menu, in basso per entrare nella pagina */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[38%] bg-gradient-to-t from-ink via-ink/35 to-transparent" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(42% 26% at 50% 62%, rgb(13 14 16 / 0.5), transparent 75%)' }}
      />

      <div className="flex min-h-[100svh] items-center justify-center px-6 pt-[30svh] pb-[12svh] md:pt-[22svh] md:pb-[6svh]">
        <motion.div
          className="flex w-full max-w-[22rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: revealed ? 0.55 : 0 }}
        >
          <button type="button" onClick={openBooking} className="btn-primary !px-8 !py-[18px]">
            <CalendarCheck size={19} weight="bold" />
            {t(UI.cta.book)}
          </button>
          <a
            href="#dove-siamo"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('dove-siamo')
            }}
            className="btn-ghost !px-8 !py-[18px]"
          >
            <MapPin size={19} weight="bold" />
            {t(UI.cta.where)}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
