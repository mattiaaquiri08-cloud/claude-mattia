import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { CalendarCheck, MapPin } from '@phosphor-icons/react'
import { useBooking } from './booking-context'
import { Magnetic } from './Magnetic'
import { scrollToId } from '../lib/scroll'

export function Hero({ revealed }: { revealed: boolean }) {
  const { openBooking } = useBooking()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const ctaY = useTransform(scrollYProgress, [0, 0.45], ['0px', reduce ? '0px' : '-40px'])

  return (
    <section ref={ref} id="top" className="relative min-h-[100dvh] overflow-hidden bg-ink" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        OMA Osteria Moderna, ristorante a Roma in Via Costantino Maes 78
      </h1>

      {/* Foto: verticale su smartphone, orizzontale su desktop */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: imgY, scale: imgScale }}>
        <motion.picture
          className="block h-full w-full"
          initial={reduce ? false : { scale: 1.16 }}
          animate={revealed ? { scale: 1 } : undefined}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <source
            media="(max-width: 767px)"
            srcSet="./img/hero-mobile-sm.webp 627w, ./img/hero-mobile.webp 940w"
            sizes="100vw"
          />
          <source srcSet="./img/hero-desktop-sm.webp 1115w, ./img/hero-desktop.webp 1672w" sizes="100vw" />
          <img
            src="./img/hero-desktop.webp"
            alt="La sala di OMA Osteria Moderna: luci ambra, pareti nere e sedie in velluto arancio accanto alla vetrata"
            className="h-full w-full object-cover object-[50%_60%] md:object-center"
            width={1672}
            height={940}
            fetchPriority="high"
            decoding="async"
          />
        </motion.picture>
      </motion.div>

      {/* Velature minime: leggibilità della barra in alto e dei pulsanti, senza coprire la sala */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 46% 30% at 50% 52%, rgb(15 15 17 / 0.42), transparent 75%)' }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <motion.div
        className="relative z-10 flex min-h-[100dvh] items-center justify-center px-6"
        style={{ opacity: ctaOpacity, y: ctaY }}
      >
        <motion.div
          className="flex w-full max-w-[300px] flex-col items-stretch gap-3.5 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-4"
          initial={reduce ? false : 'hidden'}
          animate={reduce ? undefined : revealed ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } } }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
              show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <Magnetic>
              <button type="button" onClick={openBooking} className="btn-primary w-full sm:w-auto">
                <CalendarCheck size={19} weight="bold" />
                Prenota un tavolo
              </button>
            </Magnetic>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
              show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <Magnetic>
              <a
                href="#dove-siamo"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('dove-siamo')
                }}
                className="btn-ghost w-full sm:w-auto"
              >
                <MapPin size={19} weight="bold" />
                Dove siamo
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
