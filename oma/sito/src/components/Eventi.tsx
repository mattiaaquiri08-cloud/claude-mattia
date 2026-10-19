import { motion, useReducedMotion } from 'motion/react'
import { InstagramLogo } from '@phosphor-icons/react'
import { SITE, TESTI } from '../data/site'

/** Degustazioni e serate: non c'è un calendario fisso, si rimanda a Instagram. */
export function Eventi() {
  const reduce = useReducedMotion()

  return (
    <section id="eventi" aria-labelledby="eventi-title" className="px-4 py-24 md:px-8 md:py-32">
      <motion.div
        className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-8"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="md:col-span-6">
          <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-ochre uppercase">Gli eventi</p>
          <h2
            id="eventi-title"
            className="max-w-[16ch] font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-balance md:text-6xl"
          >
            {TESTI.eventi.titolo}
          </h2>
        </div>
        <div className="flex flex-col items-start gap-7 md:col-span-5 md:col-start-8">
          <p className="max-w-[52ch] text-lg leading-relaxed text-cream/80">{TESTI.eventi.testo}</p>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <InstagramLogo size={18} weight="bold" />
            Seguici su Instagram
          </a>
        </div>
      </motion.div>
    </section>
  )
}
