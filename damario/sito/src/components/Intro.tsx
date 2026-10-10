import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { UI } from '../data/ui'
import { useI18n } from '../lib/i18n'

/** Una parola che si accende mentre la frase entra nello schermo: si legge al ritmo dello scroll. */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  )
}

export function Intro() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = t(UI.intro.body).split(' ')

  return (
    <section className="relative px-5 pt-24 pb-28 sm:px-8 md:pt-36 md:pb-40" aria-labelledby="intro-title">
      <div className="mx-auto max-w-[1100px]">
        <h2 id="intro-title" className="font-display text-[3.1rem] leading-[0.98] font-medium tracking-[-0.01em] text-balance sm:text-7xl lg:text-[6.2rem]">
          {t(UI.intro.lead)}
        </h2>

        <p ref={ref} className="mt-10 max-w-[34ch] text-[1.32rem] leading-[1.5] text-bone sm:text-[1.6rem] md:mt-14 md:ml-[18%] lg:text-[1.85rem]">
          {reduce
            ? t(UI.intro.body)
            : words.map((w, i) => (
                <Word key={`${i}-${w}`} progress={scrollYProgress} range={[i / words.length, (i + 1.5) / words.length]}>
                  {w}
                </Word>
              ))}
        </p>

        <motion.p
          className="mt-12 flex max-w-[52ch] items-start gap-4 text-[0.98rem] leading-relaxed text-mute md:ml-[18%]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span aria-hidden="true" className="mt-3 h-px w-10 shrink-0 bg-ember" />
          <span className="font-display text-[1.35rem] leading-snug text-bone/80 italic">{t(UI.intro.signature)}</span>
        </motion.p>
      </div>
    </section>
  )
}
