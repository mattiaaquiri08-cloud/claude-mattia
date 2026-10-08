import { motion, useReducedMotion } from 'motion/react'
import { Asterisk } from '@phosphor-icons/react'
import { APERITIVO } from '../data/site'

/** Fascia ocra con l'unico marquee della pagina: i drink dell'aperitivo. */
export function Aperitivo() {
  const reduce = useReducedMotion()
  const row = [...APERITIVO.drinks, ...APERITIVO.drinks]

  return (
    <section aria-labelledby="aperitivo-title" className="relative overflow-hidden bg-ochre py-14 text-ink md:py-20">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 md:flex-row md:items-end md:justify-between md:px-8">
        <motion.h2
          id="aperitivo-title"
          className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-balance md:text-6xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {APERITIVO.title}: drink e tagliere a {APERITIVO.price} €
        </motion.h2>
        <p className="max-w-[30ch] text-lg leading-snug font-medium text-ink/80">
          {APERITIVO.detail}, per cominciare bene la serata.
        </p>
      </div>

      <div className="marquee mt-12 flex overflow-hidden border-y border-ink/15 py-5 md:mt-16" aria-hidden="true">
        <div className={`flex shrink-0 items-center ${reduce ? '' : 'marquee-track'}`}>
          {row.map((d, i) => (
            <span
              key={i}
              className="flex items-center gap-8 pr-8 font-display text-3xl font-semibold tracking-tight whitespace-nowrap md:text-5xl"
            >
              {d}
              <Asterisk size={28} weight="bold" className="opacity-60" />
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">Drink disponibili: {APERITIVO.drinks.join(', ')}.</p>
    </section>
  )
}
