import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowDownRight } from '@phosphor-icons/react'
import deskAvif from '../assets/photo/hero/desktop-1189.avif'
import deskWebp from '../assets/photo/hero/desktop-1189.webp'
import deskWebp800 from '../assets/photo/hero/desktop-800.webp'
import mobAvif from '../assets/photo/hero/mobile-472.avif'
import mobWebp from '../assets/photo/hero/mobile-472.webp'
import { business } from '../content'
import { CURTAIN, EASE } from '../lib'
import { useBooking } from './booking-context'
import { Button, ButtonLink } from './Button'
import { MaskLines } from './Reveal'
import { useIntroDone } from './intro-context'

/*
 * La fotografia si apre da una fessura verticale, poi si allarga a tutto schermo.
 */
export function Hero() {
  const { open } = useBooking()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const ready = useIntroDone()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      aria-label="Benvenuta"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night text-white"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduce ? false : { clipPath: 'inset(9% 42% 9% 42%)' }}
        animate={ready ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={{ duration: 1.5, delay: 0.15, ease: CURTAIN }}
      >
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imgY }}>
          <motion.picture
            className="block size-full"
            initial={reduce ? false : { scale: 1.32 }}
            animate={ready ? { scale: 1.06 } : undefined}
            transition={{ duration: 2.2, delay: 0.15, ease: EASE }}
          >
            {/* Foto verticale sugli smartphone, orizzontale da tablet e computer */}
            <source media="(max-width: 767px)" type="image/avif" srcSet={mobAvif} />
            <source media="(max-width: 767px)" type="image/webp" srcSet={mobWebp} />
            <source type="image/avif" srcSet={deskAvif} />
            <source type="image/webp" srcSet={`${deskWebp800} 800w, ${deskWebp} 1189w`} sizes="100vw" />
            <img
              src={deskWebp}
              alt="L'interno di Exotique & Estetique: poltrone in pelle nera, specchi, la parete in pietra con l'orologio, il lavatesta e il divano d'attesa."
              className="size-full object-cover object-center"
              fetchPriority="high"
              decoding="async"
              width={1189}
              height={941}
            />
          </motion.picture>
        </motion.div>
        {/* Velature per la leggibilità: in alto per la navigazione, in basso a sinistra per il testo */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/65 to-transparent md:h-40 md:from-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_11_11/0.92)_0%,rgb(12_11_11/0.55)_38%,rgb(12_11_11/0)_70%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgb(12_11_11/0.55)_0%,rgb(12_11_11/0)_55%)] md:block" />
      </motion.div>

      <motion.div
        className="wrap relative pb-10 pt-32 md:pb-16 lg:pb-20"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="mb-6 text-[0.75rem] font-medium uppercase tracking-[0.22em] text-white/80"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Centro estetico a {business.district}, {business.city}
        </motion.p>

        <h1 className="font-display opsz-xl max-w-[14ch] text-[clamp(3.1rem,13vw,8.5rem)] font-normal leading-[0.98] tracking-[-0.025em]">
          <MaskLines
            animateOnMount
            play={ready}
            delay={0.9}
            lines={[
              'Bellezza,',
              <em key="i" className="italic">
                su misura.
              </em>,
            ]}
          />
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[minmax(0,26rem)_auto] md:items-end md:justify-between">
          <motion.p
            className="max-w-[26rem] text-[1.0625rem] leading-relaxed text-white/85"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 1.35, ease: EASE }}
          >
            Viso, corpo, laser, unghie e capelli in un unico spazio luminoso, curato in ogni dettaglio.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 1.5, ease: EASE }}
          >
            <Button onClick={() => open()}>Prenota ora</Button>
            <ButtonLink href="#trattamenti" variant="ghost-light">
              I trattamenti
              <ArrowDownRight size={16} weight="regular" aria-hidden />
            </ButtonLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
