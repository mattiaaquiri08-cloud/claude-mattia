import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Camera } from '@phosphor-icons/react'
import { salon, team } from '../data/salon'
import { EASE, cn } from '../lib/utils'
import { ButtonLink, Reveal } from './ui'

const HEADLINE = ['“Chi ha Claudia', 'non trema!”']

/** Sezione dedicata alla titolare: spazio per il ritratto, la frase più citata dalle clienti, il team. */
export function Claudia() {
  const reduce = useReducedMotion()
  const [claudia, lella] = team

  return (
    <section id="claudia" aria-labelledby="claudia-titolo" className="bg-paper px-4 pb-28 md:px-8 md:pb-40">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 border-t border-line pt-24 md:pt-36 lg:grid-cols-12 lg:gap-8">
        {/* Riquadro del ritratto: si apre dal basso quando entra nello schermo */}
        {/* L'osservatore sta sulla colonna: un elemento ritagliato del tutto non risulta mai visibile */}
        <motion.div
          className="lg:col-span-5 lg:col-start-1 xl:col-span-4 xl:col-start-2"
          initial={reduce ? false : 'hidden'}
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="relative mx-auto aspect-[408/512] w-full max-w-[26rem] overflow-hidden bg-stone lg:sticky lg:top-28"
            variants={{
              hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
              shown: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.4, ease: EASE } },
            }}
          >
            {/* Segnaposto: qui andrà il ritratto di Claudia */}
            <div
              role="img"
              aria-label="Spazio per la foto di Claudia Fulli"
              className="absolute inset-3 flex flex-col items-center justify-center gap-4 border border-dashed border-ink/25 text-center"
            >
              <Camera size={36} weight="light" aria-hidden className="text-muted" />
              <p className="text-[1.375rem] font-light tracking-[-0.02em]">La foto di Claudia</p>
              <p className="max-w-[22ch] text-[0.8125rem] leading-relaxed text-muted">Ritratto verticale, da inserire qui</p>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="text-[0.875rem] text-muted">
              {claudia.role} di {salon.name}
            </p>
            <h2 id="claudia-titolo" className="mt-2 text-[clamp(2.5rem,4.6vw,4.25rem)] leading-none font-light tracking-[-0.045em]">
              {claudia.name}
            </h2>
          </Reveal>

          <figure className="mt-12 md:mt-16">
            <blockquote>
              <motion.p
                className="text-[clamp(2.75rem,6.4vw,6.25rem)] leading-[0.94] font-light tracking-[-0.05em]"
                initial={reduce ? false : 'hidden'}
                whileInView="shown"
                viewport={{ once: true, amount: 0.5 }}
              >
                {HEADLINE.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className={cn('block', i === 1 && 'italic')}
                      variants={{
                        hidden: { y: '110%' },
                        shown: { y: '0%', transition: { duration: 1.2, delay: i * 0.1, ease: EASE } },
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </motion.p>
            </blockquote>
            <figcaption className="mt-5 text-[0.9375rem] text-muted">Maria Chiara D., recensione Google</figcaption>
          </figure>

          <Reveal className="mt-12 flex flex-col gap-8 md:mt-16">
            <p className="max-w-[40ch] text-lg leading-relaxed text-ink/85">{claudia.text}</p>
            <figure className="border-l-2 border-sun pl-5">
              <blockquote className="max-w-[44ch] text-[1.0625rem] leading-relaxed italic">“{claudia.quote.text}”</blockquote>
              <figcaption className="mt-2 text-[0.875rem] text-muted">{claudia.quote.author}</figcaption>
            </figure>
            <div>
              <ButtonLink href={salon.bookingUrl} tone="ink" icon={<ArrowRight size={16} weight="bold" />}>
                Prenota
              </ButtonLink>
            </div>
          </Reveal>

          {/* Il team accanto a Claudia */}
          <Reveal className="mt-20 border-t border-line pt-10 md:mt-24">
            <p className="text-[0.875rem] text-muted">In salone con lei</p>
            <div className="mt-4 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-10">
              <h3 className="text-[clamp(2rem,3.2vw,2.75rem)] leading-none font-light tracking-[-0.04em]">{lella.name}</h3>
              <div className="flex flex-col gap-4">
                <p className="text-[1.0625rem] leading-relaxed text-ink/85">
                  {lella.role}. {lella.text}
                </p>
                <figure className="border-l-2 border-sun pl-5">
                  <blockquote className="text-[1.0625rem] leading-relaxed italic">“{lella.quote.text}”</blockquote>
                  <figcaption className="mt-2 text-[0.875rem] text-muted">{lella.quote.author}</figcaption>
                </figure>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
