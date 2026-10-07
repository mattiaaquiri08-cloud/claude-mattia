import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'
import { salon, serviceGroups } from '../data/salon'
import { handleAnchorClick } from '../lib/smooth-scroll'
import { ButtonLink, MaskedLines } from './ui'
import { EASE, cn } from '../lib/utils'

function useActiveGroup() {
  const [active, setActive] = useState<string>(serviceGroups[0].id)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id.replace('gruppo-', ''))
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    serviceGroups.forEach((g) => {
      const el = document.getElementById(`gruppo-${g.id}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

export function Services() {
  const reduce = useReducedMotion()
  const active = useActiveGroup()

  return (
    <section id="servizi" aria-labelledby="servizi-titolo" className="bg-paper px-4 pt-28 pb-28 md:px-8 md:pt-40 md:pb-40">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Colonna fissa: titolo, categorie, prenotazione */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <MaskedLines
              id="servizi-titolo"
              lines={['Servizi', 'e listino']}
              className="text-[clamp(2.75rem,5.4vw,5rem)] leading-[0.95] font-light tracking-[-0.045em]"
            />
            <p className="mt-6 max-w-[34ch] text-[1.0625rem] leading-relaxed text-muted">
              Specializzato in taglio, piega, colore, effetti luce e trattamenti del capello.
            </p>

            <nav aria-label="Categorie del listino" className="mt-10 hidden lg:block">
              <ul className="flex flex-col">
                {serviceGroups.map((g) => (
                  <li key={g.id}>
                    <a
                      href={`#gruppo-${g.id}`}
                      onClick={handleAnchorClick}
                      aria-current={active === g.id ? 'true' : undefined}
                      className="group relative flex items-center gap-3 py-1.5 text-[0.9375rem]"
                    >
                      <span className="relative flex h-5 w-5 items-center justify-center">
                        {active === g.id && (
                          <motion.span
                            layoutId="servizi-attivo"
                            className="absolute h-[3px] w-4 rounded-full bg-sun"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                      </span>
                      <span className={cn('transition-colors duration-300', active === g.id ? 'text-ink' : 'text-muted group-hover:text-ink')}>
                        {g.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-10 hidden lg:block">
              <ButtonLink href={salon.bookingUrl} tone="ink" icon={<ArrowRight size={16} weight="bold" />}>
                Prenota
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Chip di categoria (mobile e tablet) */}
        <nav aria-label="Categorie del listino" className="sticky top-16 z-10 -mx-4 -mt-4 min-w-0 bg-paper/90 px-4 py-3 backdrop-blur-lg md:-mx-8 md:px-8 lg:hidden">
          <ul className="flex snap-x gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {serviceGroups.map((g) => (
              <li key={g.id} className="snap-start">
                <a
                  href={`#gruppo-${g.id}`}
                  onClick={handleAnchorClick}
                  aria-current={active === g.id ? 'true' : undefined}
                  className={cn(
                    'inline-flex h-10 items-center rounded-full px-4 text-[0.875rem] whitespace-nowrap transition-colors duration-300',
                    active === g.id ? 'bg-ink text-paper' : 'text-ink ring-1 ring-inset ring-ink/15',
                  )}
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Listino */}
        <div className="flex min-w-0 flex-col gap-16 md:gap-20 lg:col-span-7 lg:col-start-6">
          {serviceGroups.map((group) => (
            <div key={group.id} id={`gruppo-${group.id}`} className="scroll-mt-32">
              <motion.div
                className="flex items-end justify-between gap-6 border-b border-ink pb-4"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <h3 className="text-[clamp(1.75rem,2.6vw,2.375rem)] leading-none font-light tracking-[-0.035em]">
                  {group.title}
                </h3>
                <span className="pb-1 text-[0.8125rem] text-muted tabular">
                  {group.items.length} {group.items.length === 1 ? 'servizio' : 'servizi'}
                </span>
              </motion.div>

              <ul className="mt-3">
                {group.items.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
                    className="group relative -mx-3 grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 px-3 py-4 md:grid-cols-[1fr_7rem_7.5rem]"
                  >
                    {/* Fondo che si apre da sinistra al passaggio del mouse */}
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-left scale-x-0 bg-stone transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
                    />
                    <span className="relative text-[1.0625rem] leading-snug md:text-lg">{item.name}</span>
                    <span className="relative col-start-1 row-start-2 text-[0.875rem] text-muted tabular md:col-start-2 md:row-start-1 md:text-[0.9375rem]">
                      {item.duration}
                    </span>
                    <span className="relative col-start-2 row-span-2 row-start-1 text-right text-[1.0625rem] font-medium tabular md:col-start-3 md:row-span-1 md:text-lg">
                      {item.price}
                    </span>
                  </motion.li>
                ))}
              </ul>
              {group.note && <p className="mt-4 text-[0.875rem] text-muted">{group.note}</p>}
            </div>
          ))}

          <div className="flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[46ch] text-[0.875rem] leading-relaxed text-muted">
              Prezzi del listino pubblicato dal salone su Treatwell. Dove è indicata una fascia, il prezzo finale si
              definisce in salone.
            </p>
            <ButtonLink href={salon.bookingUrl} tone="ink" icon={<ArrowRight size={16} weight="bold" />} className="lg:hidden">
              Prenota
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
