import { motion, useReducedMotion } from 'motion/react'
import { TESTI } from '../data/site'

/** La filosofia di OMA in tre righe: la cucina, il mercato, i piatti. */
export function Cucina() {
  const reduce = useReducedMotion()

  return (
    <section id="cucina" aria-labelledby="cucina-title" className="border-t border-line px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="cucina-title" className="sr-only">
          La nostra cucina
        </h2>
        <ol className="flex flex-col">
          {TESTI.cucina.map((b, i) => (
            <motion.li
              key={b.etichetta}
              className="grid grid-cols-1 gap-5 border-b border-line py-12 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-12 md:gap-8 md:py-16"
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="flex items-baseline gap-3 text-xs font-semibold tracking-[0.2em] text-ochre uppercase md:col-span-3 md:pt-3">
                <span className="text-mute tabular-nums">0{i + 1}</span>
                {b.etichetta}
              </p>
              <h3 className="font-display text-3xl leading-[1.05] font-semibold tracking-tight text-balance md:col-span-5 md:text-5xl">
                {b.titolo}
              </h3>
              <p className="max-w-[52ch] text-lg leading-relaxed text-cream/80 md:col-span-4 md:pt-2">{b.testo}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
