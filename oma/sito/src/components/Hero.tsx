import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowUpRight, CalendarCheck } from '@phosphor-icons/react'
import { useBooking } from './booking-context'
import { Magnetic } from './Magnetic'
import { SITE } from '../data/site'

const rise = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
}

/*
  Hero: Alessio e Leonardo a tavola in sala. Su desktop la foto orizzontale è a tutto schermo; su smartphone
  quella verticale si vede intera (4:5), così non si taglia nessuno dei due, con i pulsanti subito sotto.
  Solo due pulsanti affiancati: Prenota ora e Menu (Linktree).
*/
export function Hero({ revealed }: { revealed: boolean }) {
  const { openBooking } = useBooking()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0px', reduce ? '0px' : '-40px'])

  return (
    <section ref={ref} id="top" className="relative overflow-hidden bg-ink md:min-h-[100dvh]" aria-labelledby="hero-title">
      <motion.div
        className="relative aspect-[4/5] w-full will-change-transform md:absolute md:inset-0 md:aspect-auto"
        style={{ y: imgY, scale: imgScale }}
      >
        <motion.picture
          className="block h-full w-full"
          initial={reduce ? false : { scale: 1.16 }}
          animate={revealed ? { scale: 1 } : undefined}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <source
            media="(max-width: 767px)"
            srcSet="./img/hero-mobile-sm.webp 750w, ./img/hero-mobile.webp 1200w"
            sizes="100vw"
          />
          <source srcSet="./img/hero-desktop-sm.webp 1200w, ./img/hero-desktop.webp 2000w" sizes="100vw" />
          <img
            src="./img/hero-desktop.webp"
            alt="Alessio e Leonardo, i titolari di OMA, a tavola in sala con due piatti di pasta e i calici di vino rosso"
            className="h-full w-full object-cover md:object-[50%_40%]"
            width={2000}
            height={1333}
            fetchPriority="high"
            decoding="async"
          />
        </motion.picture>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink to-transparent md:hidden" />
      </motion.div>

      {/* Sfumature solo in alto (barra) e in basso (pulsanti): i volti restano liberi */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-2/5 bg-gradient-to-t from-ink/75 to-transparent md:block" />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 pt-2 pb-8 text-center text-paper md:absolute md:inset-x-0 md:bottom-0 md:pt-0 md:pb-14"
        style={{ opacity: contentOpacity, y: contentY }}
        initial={reduce ? false : 'hidden'}
        animate={reduce ? undefined : revealed ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.45 } } }}
      >
        {/* Nella hero solo i due pulsanti: il titolo resta per Google e per gli screen reader */}
        <h1 id="hero-title" className="sr-only">
          {SITE.name}. {SITE.slogan[0]} {SITE.slogan[1]}
        </h1>

        <motion.div variants={rise} className="grid w-full max-w-[420px] grid-cols-2 gap-3 sm:gap-4">
          <Magnetic className="flex">
            <button type="button" onClick={openBooking} className="btn-light w-full !px-4 sm:!px-7">
              <CalendarCheck size={19} weight="bold" />
              Prenota ora
            </button>
          </Magnetic>
          <Magnetic className="flex">
            <a
              href={SITE.menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass w-full !px-4 sm:!px-7"
            >
              Menu
              <ArrowUpRight size={19} weight="bold" />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  )
}
