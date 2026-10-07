import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'motion/react'
import { ArrowRight, Phone } from '@phosphor-icons/react'
import { salon } from '../data/salon'
import { useIntroDone } from '../lib/intro'
import { ButtonLink, SalonPicture } from './ui'
import { EASE } from '../lib/utils'

// Struttura ripresa dal componente 21st "Editorial Image Hero" (felipemenezes098/hero-07):
// foto a tutta larghezza sopra, testo sotto, comparsa a cascata con sfocatura.
// Qui la foto resta libera da testo e il nome del salone diventa il titolo.

const copy: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, delay: 0.95 + i * 0.1, ease: EASE },
  }),
}

const WORDMARK = 'Claudia Fulli'

export function Hero() {
  const reduce = useReducedMotion()
  const ready = useIntroDone()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])
  const wordY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-30%'])

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Claudia Fulli Salon"
      className="relative flex min-h-[100dvh] flex-col bg-paper pt-16 md:pt-[72px]"
    >
      {/* Foto: si apre dal centro, poi scorre più lenta della pagina */}
      <motion.div
        className="relative mx-2 min-h-[46dvh] flex-1 overflow-hidden bg-stone md:mx-4"
        initial={reduce ? false : { clipPath: 'inset(7% 9% 7% 9%)' }}
        animate={ready ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
          <motion.div
            className="h-full w-full"
            initial={reduce ? false : { scale: 1.18 }}
            animate={ready ? { scale: 1 } : undefined}
            transition={{ duration: 2.2, ease: EASE }}
          >
            <SalonPicture
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-[30%_55%] md:object-[50%_58%]"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-x-10 gap-y-5 px-4 pt-5 pb-6 md:px-8 md:pt-7 md:pb-8 lg:grid-cols-12 lg:items-end">
        <motion.h1
          className="text-display overflow-hidden pb-[0.06em] text-[clamp(3.25rem,13.6vw,10rem)] lg:col-span-8 lg:text-[clamp(5rem,9.4vw,10rem)]"
          style={{ y: wordY }}
        >
          <span className="sr-only">Claudia Fulli Salon, parrucchiere a Parioli, Roma</span>
          <span aria-hidden translate="no" className="block whitespace-nowrap">
            {WORDMARK.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={reduce ? false : { y: '105%' }}
                animate={ready ? { y: '0%' } : undefined}
                transition={{ duration: 1.2, delay: 0.35 + i * 0.035, ease: EASE }}
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <div className="flex flex-col gap-5 lg:col-span-4 lg:pb-[0.9vw]">
          <motion.p
            custom={0}
            variants={copy}
            initial={reduce ? false : 'hidden'}
            animate={ready ? 'visible' : 'hidden'}
            className="max-w-[26rem] text-[1.0625rem] leading-relaxed text-muted md:text-lg"
          >
            Hair studio a Parioli. Taglio, colore, effetti luce e piega in un salone luminoso di{' '}
            <span className="text-ink">Via Ruggero Fauro</span>.
          </motion.p>
          <motion.div
            custom={1}
            variants={copy}
            initial={reduce ? false : 'hidden'}
            animate={ready ? 'visible' : 'hidden'}
            className="flex flex-wrap items-center gap-3"
          >
            <ButtonLink href={salon.bookingUrl} tone="sun" icon={<ArrowRight size={16} weight="bold" />}>
              Prenota
            </ButtonLink>
            <ButtonLink href={salon.phoneHref} tone="ghost" icon={<Phone size={16} />}>
              Chiama
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
