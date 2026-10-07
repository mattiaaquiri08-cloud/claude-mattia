import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { ArrowDown } from '@phosphor-icons/react'
import { handleAnchorClick } from '../lib/smooth-scroll'
import { Reveal } from './ui'

// Testo tratto dalla descrizione ufficiale del salone su Treatwell.
const TEXT: { word: string; em?: boolean }[] = [
  'Un hair studio nel cuore dei Parioli. Claudia e le sue collaboratrici',
  { word: 'ascoltano', em: true },
  'cosa desideri, ti consigliano il trattamento giusto e lo realizzano con prodotti Joico, Ref e Nevitaly.',
].flatMap((part) =>
  typeof part === 'string' ? part.split(' ').map((word) => ({ word })) : [part],
)

function Word({
  progress,
  range,
  children,
  em,
}: {
  progress: MotionValue<number>
  range: [number, number]
  children: string
  em?: boolean
}) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={{ opacity }} className={em ? 'italic' : undefined}>
      {children}{' '}
    </motion.span>
  )
}

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })

  return (
    <section id="salone" aria-labelledby="salone-titolo" className="bg-paper px-4 py-28 md:px-8 md:py-44">
      <div className="mx-auto max-w-[1440px]">
        <h2 id="salone-titolo" className="sr-only">
          Il salone
        </h2>
        <p
          ref={ref}
          className="max-w-[22ch] text-[clamp(2rem,5.2vw,4.75rem)] leading-[1.06] font-light tracking-[-0.035em] md:ml-[8.333%]"
        >
          {reduce
            ? TEXT.map(({ word, em }, i) => (
                <span key={i} className={em ? 'italic' : undefined}>
                  {word}{' '}
                </span>
              ))
            : TEXT.map(({ word, em }, i) => {
                const start = i / TEXT.length
                return (
                  <Word
                    key={i}
                    progress={scrollYProgress}
                    range={[start, start + 1 / TEXT.length]}
                    em={em}
                  >
                    {word}
                  </Word>
                )
              })}
        </p>

        <Reveal className="mt-14 flex md:mt-20 md:ml-[8.333%]">
          <a
            href="#servizi"
            onClick={handleAnchorClick}
            className="group inline-flex items-center gap-3 text-[0.9375rem] font-medium"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-full ring-1 ring-inset ring-ink/20 transition-colors duration-300 group-hover:bg-sun group-hover:ring-sun">
              <ArrowDown size={16} aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5" />
            </span>
            Vedi servizi e listino
          </a>
        </Reveal>
      </div>
    </section>
  )
}
