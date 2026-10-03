import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowDownRight } from '@phosphor-icons/react'
import avif1584 from '../assets/photo/salone-1584.avif'
import avif1024 from '../assets/photo/salone-1024.avif'
import webp1584 from '../assets/photo/salone-1584.webp'
import webp1024 from '../assets/photo/salone-1024.webp'
import webp640 from '../assets/photo/salone-640.webp'
import { business } from '../content'
import { CURTAIN, EASE } from '../lib'
import { useBooking } from './booking-context'
import { Button, ButtonLink } from './Button'
import { MaskLines } from './Reveal'

/*
 * La fotografia si apre da una fessura verticale con le proporzioni degli
 * specchi del salone, poi si allarga a tutto schermo.
 */
export function Hero() {
  const { open } = useBooking()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
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
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.5, delay: 0.15, ease: CURTAIN }}
      >
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imgY }}>
          <motion.picture
            className="block size-full"
            initial={reduce ? false : { scale: 1.32 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 2.2, delay: 0.15, ease: EASE }}
          >
            <source type="image/avif" srcSet={`${avif1024} 1024w, ${avif1584} 1584w`} sizes="100vw" />
            <source
              type="image/webp"
              srcSet={`${webp640} 640w, ${webp1024} 1024w, ${webp1584} 1584w`}
              sizes="100vw"
            />
            <img
              src={webp1584}
              alt="L'interno di Exotique & Estetique: specchi a tutta altezza con cornice nera, poltrone in pelle, la vetrina dei prodotti e la postazione unghie."
              className="size-full object-cover object-[56%_50%] md:object-center"
              fetchPriority="high"
              decoding="async"
              width={1584}
              height={993}
            />
          </motion.picture>
        </motion.div>
        {/* Velature per la leggibilità: in alto per la navigazione, in basso a sinistra per il testo */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
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
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Centro estetico a {business.district}, {business.city}
        </motion.p>

        <h1 className="font-display opsz-xl max-w-[14ch] text-[clamp(3.1rem,13vw,8.5rem)] font-normal leading-[0.98] tracking-[-0.025em]">
          <MaskLines
            animateOnMount
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.35, ease: EASE }}
          >
            Viso, corpo, laser, unghie e capelli in un unico spazio luminoso, curato in ogni dettaglio.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
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
