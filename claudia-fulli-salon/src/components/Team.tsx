import { motion, useReducedMotion } from 'motion/react'
import { team } from '../data/salon'
import { Reveal } from './ui'
import { EASE, cn } from '../lib/utils'

const HEADLINE = ['“Chi ha Claudia', 'non trema!”']

export function Team() {
  const reduce = useReducedMotion()

  return (
    <section id="team" aria-labelledby="team-titolo" className="bg-paper px-4 pb-28 md:px-8 md:pb-40">
      <div className="mx-auto max-w-[1440px] border-t border-line pt-24 md:pt-36">
        <h2 id="team-titolo" className="sr-only">
          Il team
        </h2>

        <figure className="lg:ml-[8.333%]">
          <blockquote>
            <motion.p
              className="text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] font-light tracking-[-0.05em]"
              initial={reduce ? false : 'hidden'}
              whileInView="shown"
              viewport={{ once: true, amount: 0.5 }}
            >
              {HEADLINE.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={cn('block', i === 1 && 'italic md:pl-[0.9em]')}
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
          <Reveal delay={0.2}>
            <figcaption className="mt-6 text-[0.9375rem] text-muted md:pl-[0.9em] md:text-base">
              Maria Chiara D., recensione Google
            </figcaption>
          </Reveal>
        </figure>

        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-8">
          {team.map((person, i) => (
            <Reveal
              key={person.name}
              delay={i * 0.12}
              className={cn(
                'group flex flex-col',
                i === 0 ? 'md:col-span-6 lg:col-span-5 lg:col-start-2' : 'md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-8 md:pt-24',
              )}
            >
              <p className="text-[0.875rem] text-muted">{person.role}</p>
              <h3 className="relative mt-2 inline-block self-start text-[clamp(2.5rem,4.6vw,4.25rem)] leading-none font-light tracking-[-0.045em]">
                {person.name}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 rounded-full bg-sun transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
                />
              </h3>
              <p className="mt-6 max-w-[38ch] text-[1.0625rem] leading-relaxed text-ink/80">{person.text}</p>
              <figure className="mt-8 border-l-2 border-sun pl-5">
                <blockquote className="text-[1.0625rem] leading-relaxed italic">“{person.quote.text}”</blockquote>
                <figcaption className="mt-2 text-[0.875rem] text-muted">{person.quote.author}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
