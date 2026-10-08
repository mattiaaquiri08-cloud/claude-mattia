import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { FilePdf, Heart } from '@phosphor-icons/react'
import { MENU, type Dish } from '../data/site'

export function Menu() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(MENU[0].id)
  const tabsRef = useRef<HTMLDivElement>(null)
  const section = MENU.find((s) => s.id === active)!
  const count = section.groups.reduce((n, g) => n + g.dishes.length, 0)

  const select = (id: string) => {
    setActive(id)
    // porta in vista la scheda attiva sulla barra scorrevole (smartphone)
    tabsRef.current
      ?.querySelector<HTMLElement>(`[data-tab="${id}"]`)
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = MENU.findIndex((s) => s.id === active)
    let next = -1
    if (e.key === 'ArrowRight') next = (i + 1) % MENU.length
    if (e.key === 'ArrowLeft') next = (i - 1 + MENU.length) % MENU.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = MENU.length - 1
    if (next < 0) return
    e.preventDefault()
    select(MENU[next].id)
    tabsRef.current?.querySelector<HTMLElement>(`[data-tab="${MENU[next].id}"]`)?.focus()
  }

  return (
    <section id="menu" className="relative border-t border-line bg-coal px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-5xl leading-none font-semibold tracking-[-0.03em] md:text-7xl">Il menu</h2>
          <p className="max-w-[52ch] text-lg leading-relaxed text-cream/75">
            Cambia con le stagioni. Questo è quello che trovi in tavola adesso.
          </p>
        </div>

        {/* Schede delle portate */}
        <LayoutGroup id="menu-tabs">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Portate del menu"
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-4 mt-12 flex snap-x gap-1 overflow-x-auto border-b border-line px-4 md:mx-0 md:px-0"
          >
            {MENU.map((s) => {
              const isActive = s.id === active
              return (
                <button
                  key={s.id}
                  data-tab={s.id}
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={isActive}
                  aria-controls="menu-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(s.id)}
                  className={`relative shrink-0 snap-start px-4 pt-2 pb-4 text-[0.95rem] font-medium transition-colors md:px-5 ${
                    isActive ? 'text-cream' : 'text-mute hover:text-cream'
                  }`}
                >
                  {s.title}
                  {isActive && (
                    <motion.span
                      layoutId="menu-tab-underline"
                      className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-ochre"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </LayoutGroup>

        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
          {/* Colonna sinistra: titolo della portata, fisso durante lo scroll */}
          <aside className="md:sticky md:top-28 md:col-span-4 md:self-start">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={section.id}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-display text-[clamp(3rem,6vw,5.2rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-ochre">
                  {section.title}
                </p>
                <p className="mt-5 max-w-[34ch] leading-relaxed text-cream/75">{section.intro}</p>
                <p className="mt-3 text-sm text-mute">
                  {count} {count === 1 ? 'proposta' : 'proposte'}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 hidden overflow-hidden rounded-[var(--radius-media)] md:block">
              <img
                src="./img/g-tavolo.webp"
                alt="Un tavolo di OMA apparecchiato per la cena"
                width={880}
                height={740}
                loading="lazy"
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
          </aside>

          {/* Colonna destra: piatti */}
          <div className="md:col-span-7 md:col-start-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={section.id}
                id="menu-panel"
                role="tabpanel"
                aria-labelledby={`tab-${section.id}`}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.18 } }}
                variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.045 } } }}
                className="flex flex-col gap-12"
              >
                {section.groups.map((g, gi) => (
                  <div key={g.title ?? gi}>
                    {g.title && (
                      <motion.h3
                        variants={item(reduce)}
                        className="mb-5 font-display text-2xl font-semibold tracking-tight text-cream"
                      >
                        {g.title}
                      </motion.h3>
                    )}
                    <ul className="flex flex-col gap-7">
                      {g.dishes.map((d) => (
                        <DishRow key={d.name} dish={d} reduce={!!reduce} />
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-[44ch] text-sm leading-relaxed text-mute">
                Allergie o intolleranze? Diccelo prima di ordinare. Sul menu in sala trovi la lista dei 14 allergeni.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
                <a
                  href="./menu/menu-oma.pdf"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center gap-2 text-cream underline decoration-line underline-offset-[6px] transition-colors hover:text-ochre hover:decoration-ochre"
                >
                  <FilePdf size={20} />
                  Menu in PDF
                </a>
                <a
                  href="./menu/vini-e-bevande.pdf"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center gap-2 text-cream underline decoration-line underline-offset-[6px] transition-colors hover:text-ochre hover:decoration-ochre"
                >
                  <FilePdf size={20} />
                  Vini e drink in PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const item = (reduce: boolean | null) => ({
  hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
})

function DishRow({ dish, reduce }: { dish: Dish; reduce: boolean }) {
  return (
    <motion.li variants={item(reduce)} className="group">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-xl leading-snug font-medium tracking-tight text-cream transition-colors duration-300 group-hover:text-ochre md:text-[1.4rem]">
          {dish.name}
        </span>
        <span aria-hidden="true" className="leader h-[0.7em] min-w-6 flex-1 translate-y-[-0.15em]" />
        <span className="font-display text-xl font-medium whitespace-nowrap tabular-nums md:text-[1.4rem]">
          {dish.price} €
        </span>
      </div>
      {(dish.detail || dish.pick) && (
        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 pr-14 text-[0.95rem] leading-relaxed text-mute">
          {dish.detail && <span>{dish.detail}</span>}
          {dish.pick && (
            <span className="inline-flex items-center gap-1.5 text-ochre">
              <Heart size={14} weight="fill" />
              Citato nelle recensioni
            </span>
          )}
        </p>
      )}
    </motion.li>
  )
}
