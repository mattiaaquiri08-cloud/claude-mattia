import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowUpRight, CalendarCheck } from '@phosphor-icons/react'
import { useBooking } from './booking-context'
import { Magnetic } from './Magnetic'
import { SITE } from '../data/site'

const EASE = [0.16, 1, 0.3, 1] as const
const PAINT = [0.65, 0, 0.35, 1] as const

/* Schizzi di vernice ai bordi: posizione, grandezza e ritardo con cui "colpiscono" il muro */
const SCHIZZI = [
  { src: './img/schizzo-1.webp', w: 878, h: 823, cls: '-top-[6%] -left-[24%] w-[min(60vw,480px)] md:-top-[12%] md:-left-[7%] md:w-[min(30vw,460px)]', rot: -8, delay: 0.15 },
  { src: './img/schizzo-2.webp', w: 607, h: 656, cls: '-right-[22%] -bottom-[6%] w-[min(54vw,400px)] md:-right-[4%] md:-bottom-[16%] md:w-[min(24vw,380px)]', rot: 12, delay: 0.3 },
  { src: './img/schizzo-3.webp', w: 486, h: 461, cls: 'top-[13%] -right-[12%] w-[min(32vw,200px)] md:top-[15%] md:right-[9%] md:w-[min(13vw,210px)]', rot: 24, delay: 0.45 },
  { src: './img/schizzo-4.webp', w: 394, h: 380, cls: 'bottom-[5%] -left-[8%] w-[min(24vw,140px)] md:bottom-[12%] md:left-[11%] md:w-[min(10vw,160px)]', rot: -18, delay: 0.6 },
]

/*
  Hero come la foto profilo di OMA su Instagram: sfondo avorio, logo al centro (OMA a pennello,
  "osteria moderna", pennellata con gli schizzi) e qualche schizzo di vernice ocra e nera ai bordi.
  Sotto il logo i due pulsanti affiancati: Prenota ora e Menu (Linktree).
  La foto di Alessio e Leonardo è subito dopo, a tutta larghezza (FotoTitolari).
*/
export function Hero() {
  const { openBooking } = useBooking()
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-14"
      aria-labelledby="hero-title"
    >
      {SCHIZZI.map((s) => (
        <motion.img
          key={s.src}
          src={s.src}
          alt=""
          aria-hidden="true"
          width={s.w}
          height={s.h}
          className={`pointer-events-none absolute -z-10 h-auto select-none ${s.cls}`}
          initial={reduce ? false : { opacity: 0, scale: 0.55, rotate: s.rot - 10 }}
          animate={{ opacity: 1, scale: 1, rotate: s.rot }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: s.delay }}
        />
      ))}

      <h1 id="hero-title" className="flex w-[min(80vw,560px)] flex-col items-center">
        <span className="sr-only">
          {SITE.name}. {SITE.slogan[0]} {SITE.slogan[1]}
        </span>
        {/* OMA dipinto da sinistra a destra, come una pennellata */}
        <motion.img
          src="./img/logo-oma.png"
          alt=""
          width={620}
          height={303}
          className="w-full"
          initial={reduce ? false : { clipPath: 'inset(0% 100% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1, ease: PAINT, delay: 0.2 }}
        />
        <motion.img
          src="./img/logo-sottotitolo-nero.png"
          alt=""
          width={642}
          height={70}
          className="mt-[4%] w-[78%]"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1 }}
        />
        <motion.img
          src="./img/logo-pennellata-nero.png"
          alt=""
          width={783}
          height={187}
          className="mt-[3%] w-[92%]"
          initial={reduce ? false : { clipPath: 'inset(0% 100% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1], delay: 1.3 }}
        />
      </h1>

      <motion.div
        className="mt-12 grid w-full max-w-[420px] grid-cols-2 gap-3 sm:gap-4"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.5 }}
      >
        <Magnetic className="flex">
          <button type="button" onClick={openBooking} className="btn-primary w-full !px-4 sm:!px-7">
            <CalendarCheck size={19} weight="bold" />
            Prenota ora
          </button>
        </Magnetic>
        <Magnetic className="flex">
          <a href={SITE.menuUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full !px-4 sm:!px-7">
            Menu
            <ArrowUpRight size={19} weight="bold" />
          </a>
        </Magnetic>
      </motion.div>
    </section>
  )
}

/*
  Alessio e Leonardo a tavola, subito sotto la hero. Su desktop la foto orizzontale a tutta larghezza,
  su smartphone quella verticale intera (4:5), così non si taglia nessuno dei due.
*/
export function FotoTitolari() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-5%', '5%'])

  return (
    <section ref={ref} aria-label="Alessio e Leonardo, i titolari" className="relative overflow-hidden bg-ink">
      <motion.picture className="block" style={{ y }}>
        <source
          media="(max-width: 767px)"
          srcSet="./img/hero-mobile-sm.webp 1080w, ./img/hero-mobile.webp 1600w"
          sizes="100vw"
        />
        <source
          srcSet="./img/hero-desktop-sm.webp 1600w, ./img/hero-desktop-md.webp 2400w, ./img/hero-desktop.webp 3200w"
          sizes="100vw"
        />
        <img
          src="./img/hero-desktop.webp"
          alt="Alessio e Leonardo, i titolari di OMA, a tavola in sala con due piatti di pasta e i calici di vino rosso"
          width={3200}
          height={2133}
          className="aspect-[4/5] w-full scale-110 object-cover md:aspect-auto md:h-[min(100svh,66vw)] md:object-[50%_40%]"
          decoding="async"
        />
      </motion.picture>
    </section>
  )
}
