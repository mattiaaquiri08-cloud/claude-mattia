import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUp } from '@phosphor-icons/react'
import { navLinks, salon } from '../data/salon'
import { handleAnchorClick } from '../lib/smooth-scroll'

const YEAR = new Date().getFullYear()

export function Footer() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? '0%' : '35%', '0%'])

  return (
    <footer ref={ref} className="on-night overflow-hidden bg-night px-4 pt-10 pb-28 text-paper md:px-8 md:pb-8">
      <div className="mx-auto max-w-[1440px] border-t border-night-line pt-10">
        <div className="grid gap-10 text-[0.9375rem] md:grid-cols-12 md:gap-8">
          <div className="text-night-muted md:col-span-4">
            <p className="text-paper">{salon.name}</p>
            <p className="mt-1">
              {salon.street}, {salon.postalCode} {salon.city}
            </p>
            <a href={salon.phoneHref} className="mt-1 inline-block tabular transition-colors hover:text-sun">
              {salon.phoneDisplay}
            </a>
          </div>

          <nav aria-label="Piè di pagina" className="md:col-span-4">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={handleAnchorClick} className="text-night-muted transition-colors hover:text-paper">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-1.5 md:col-span-4 md:items-end">
            <a href={salon.bookingUrl} target="_blank" rel="noopener" className="text-night-muted transition-colors hover:text-paper">
              Treatwell<span className="sr-only"> (si apre in una nuova scheda)</span>
            </a>
            <a href={salon.googleUrl} target="_blank" rel="noopener" className="text-night-muted transition-colors hover:text-paper">
              Google Maps<span className="sr-only"> (si apre in una nuova scheda)</span>
            </a>
            <a
              href="#top"
              onClick={handleAnchorClick}
              className="group mt-4 inline-flex items-center gap-2 text-paper"
            >
              Torna su
              <ArrowUp size={15} aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-16 overflow-hidden md:mt-24" aria-hidden>
          <motion.p
            translate="no"
            style={{ y }}
            className="text-display text-center text-[17.4vw] whitespace-nowrap text-paper/95 xl:text-[16.6rem]"
          >
            Claudia Fulli
          </motion.p>
        </div>

        <p className="mt-8 text-[0.8125rem] text-night-muted">© {YEAR} {salon.name}. Tutti i diritti riservati.</p>
      </div>
    </footer>
  )
}
