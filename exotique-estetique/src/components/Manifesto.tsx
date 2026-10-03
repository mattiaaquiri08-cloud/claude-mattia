import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { EASE } from '../lib'

const text =
  'Un centro estetico moderno a La Storta, dove viso, corpo, mani e capelli ricevono lo stesso tempo e la stessa attenzione.'

/* Le parole si accendono una dopo l'altra mentre si legge. */
function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <span className="relative inline-block">
      <motion.span style={{ opacity }}>{word}</motion.span>
      {' '}
    </span>
  )
}

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')

  return (
    <section id="centro" aria-labelledby="centro-titolo" className="wrap py-28 md:py-40">
      <h2 id="centro-titolo" className="sr-only">
        Il centro
      </h2>
      <div className="grid gap-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-11 lg:col-span-10">
          <p
            ref={ref}
            className="font-display text-[clamp(2rem,4.6vw,4.1rem)] leading-[1.12] tracking-[-0.015em] text-ink"
          >
            {words.map((w, i) => {
              const start = i / words.length
              return <Word key={i} word={w} progress={scrollYProgress} range={[start, start + 1 / words.length]} />
            })}
          </p>

          <motion.dl
            className="mt-14 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 text-[0.9375rem] md:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="border-t border-line pt-4">
              <dt className="text-ink-soft">Dove</dt>
              <dd className="mt-1 text-ink">Via Giuseppe Calenzuoli 3, Roma</dd>
            </div>
            <div className="border-t border-line pt-4">
              <dt className="text-ink-soft">Cosa</dt>
              <dd className="mt-1 text-ink">Centro estetico e parrucchiere</dd>
            </div>
          </motion.dl>
        </div>

      </div>
    </section>
  )
}
