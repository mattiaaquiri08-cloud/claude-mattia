import { ArrowLeft, ArrowRight, CalendarCheck, Info } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { MENU, type Course } from '../data/site'
import { UI } from '../data/ui'
import { MENU_EVENT, useBooking } from '../lib/booking'
import { formatPrice } from '../lib/hours'
import { useI18n } from '../lib/i18n'

/** La foto della portata nella colonna del titolo; senza foto, il bagliore della brace */
function CourseVisual({ course }: { course: Course }) {
  const photo = course.photo
  if (!photo) return <div aria-hidden="true" className="embers absolute inset-0" />
  return (
    <picture>
      <source type="image/avif" srcSet={`./img/${photo.base}-${photo.width}.avif`} />
      <img
        src={`./img/${photo.base}-${photo.width}.webp`}
        alt=""
        width={photo.width}
        height={Math.round((photo.width * 4) / 3)}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: photo.position ?? '50% 50%' }}
      />
    </picture>
  )
}

export function Menu() {
  const { t, lang } = useI18n()
  const { openBooking } = useBooking()
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState(MENU[0].id)
  const tabsRef = useRef<HTMLDivElement>(null)
  const panelTop = useRef<HTMLDivElement>(null)

  const index = MENU.findIndex((c) => c.id === activeId)
  const course = MENU[index]
  const prev = MENU[index - 1]
  const next = MENU[index + 1]

  const select = (id: string, scroll = false) => {
    setActiveId(id)
    // la scheda scelta resta visibile nella barra orizzontale
    requestAnimationFrame(() => {
      // solo scorrimento orizzontale della barra: non deve interrompere lo scroll della pagina
      const bar = tabsRef.current
      const tab = bar?.querySelector<HTMLElement>(`[data-tab="${id}"]`)
      if (bar && tab) {
        const left = tab.offsetLeft - (bar.clientWidth - tab.offsetWidth) / 2
        bar.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' })
      }
      if (scroll && panelTop.current && panelTop.current.getBoundingClientRect().top < 0) {
        panelTop.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      }
    })
  }

  // i pannelli dei tre pilastri aprono direttamente la portata giusta
  useEffect(() => {
    const onTab = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      if (MENU.some((c) => c.id === id)) select(id)
    }
    window.addEventListener(MENU_EVENT, onTab)
    return () => window.removeEventListener(MENU_EVENT, onTab)
  })

  const onTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const to = MENU[(index + (e.key === 'ArrowRight' ? 1 : -1) + MENU.length) % MENU.length]
    select(to.id)
    tabsRef.current?.querySelector<HTMLElement>(`[data-tab="${to.id}"]`)?.focus({ preventScroll: true })
  }

  return (
    <section id="menu" className="relative border-t border-line/60 bg-coal/40 pt-24 pb-24 md:pt-32 md:pb-32" aria-labelledby="menu-title">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-ember uppercase">{t(UI.menu.eyebrow)}</p>
        <h2 id="menu-title" className="h-section mt-4">
          {t(UI.menu.heading)}
        </h2>
        <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-relaxed text-mute">{t(UI.menu.sub)}</p>
      </div>

      {/* Barra delle portate: resta in alto mentre si sfoglia */}
      <div ref={panelTop} className="scroll-mt-[68px] lg:scroll-mt-[76px]" />
      <div className="sticky top-[68px] z-30 mt-10 border-y border-line/70 bg-ink/90 backdrop-blur-xl lg:top-[76px]">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label={t(UI.menu.categories)}
          onKeyDown={onTabKey}
          className="no-scrollbar relative mx-auto flex max-w-[1400px] snap-x gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-10"
        >
          {MENU.map((c) => {
            const on = c.id === activeId
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                data-tab={c.id}
                aria-selected={on}
                aria-controls="menu-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => select(c.id, true)}
                className={`relative min-h-11 shrink-0 snap-start rounded-[var(--radius-btn)] px-4 text-[0.9rem] font-medium whitespace-nowrap transition-colors duration-300 ${
                  on ? 'text-ink' : 'text-bone/80 hover:text-bone'
                } ${c.pillar && !on ? 'font-display text-[1.08rem] italic' : ''}`}
              >
                {on && (
                  <motion.span
                    layoutId="menu-tab"
                    className="absolute inset-0 -z-10 rounded-[var(--radius-btn)] bg-bone"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative">{t(c.title)}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6 md:pt-14 lg:px-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={course.id}
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`tab-${course.id}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12"
          >
            {/* Colonna titolo */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="md:sticky md:top-[160px]">
                {course.pillar || course.photo ? (
                  <div className="relative isolate flex min-h-[260px] flex-col justify-end overflow-hidden rounded-[var(--radius-media)] bg-coal p-6 sm:min-h-[320px] sm:p-8">
                    <CourseVisual course={course} />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
                    <h3 className="relative font-display text-[2.6rem] leading-[1] font-medium text-balance sm:text-5xl">{t(course.title)}</h3>
                    {course.intro && <p className="relative mt-4 max-w-[38ch] leading-relaxed text-bone/85">{t(course.intro)}</p>}
                  </div>
                ) : (
                  <h3 className="font-display text-[2.6rem] leading-[1] font-medium text-balance sm:text-5xl">{t(course.title)}</h3>
                )}
              </div>
            </div>

            {/* Colonna piatti */}
            <div className="md:col-span-7 lg:col-span-8">
              {course.dishes.length > 0 ? (
                <ul className="flex flex-col gap-7 lg:grid lg:grid-cols-2 lg:gap-x-14 lg:gap-y-8">
                  {course.dishes.map((d, i) => (
                    <motion.li
                      key={`${d.name}-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.035, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-[1.42rem] leading-[1.15] font-medium text-bone" lang="it" translate="no">
                          {d.name}
                        </span>
                        <span aria-hidden="true" className="leader mb-[0.32em] h-[3px] min-w-6 flex-1" />
                        <span className="shrink-0 text-right text-[1.02rem] font-semibold text-bone tabular-nums">
                          {d.price === null ? (
                            <span className="text-sm font-medium text-mute">{t(UI.menu.ask)}</span>
                          ) : (
                            <>
                              <span className="sr-only">{lang === 'it' ? 'Prezzo: ' : 'Price: '}</span>
                              € {formatPrice(d.price, lang)}
                              {d.priceNote && <span className="ml-1 text-xs font-medium text-mute">{t(d.priceNote)}</span>}
                            </>
                          )}
                        </span>
                      </div>
                      {(lang === 'en' && d.en !== d.name) || d.note ? (
                        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-mute">
                          {lang === 'en' && d.en !== d.name && <span>{d.en}</span>}
                          {lang === 'en' && d.en !== d.name && d.note && <span aria-hidden="true">. </span>}
                          {d.note && <span className="text-bone/80">{t(d.note)}</span>}
                        </p>
                      ) : null}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-[var(--radius-media)] border border-line bg-ink/60 p-7 sm:p-10">
                  <p className="font-display text-[1.9rem] leading-[1.15] text-balance">{course.intro && t(course.intro)}</p>
                  <p className="mt-5 max-w-[52ch] leading-relaxed text-mute">{t(UI.menu.oil)}</p>
                  <button type="button" onClick={openBooking} className="btn-primary mt-8">
                    <CalendarCheck size={18} weight="bold" />
                    {t(UI.cta.book)}
                  </button>
                </div>
              )}

              {/* Portata precedente / successiva: comodo su smartphone */}
              <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
                {prev ? (
                  <button type="button" onClick={() => select(prev.id, true)} className="btn-line">
                    <ArrowLeft size={16} weight="bold" />
                    {t(prev.title)}
                  </button>
                ) : (
                  <span />
                )}
                {next && (
                  <button type="button" onClick={() => select(next.id, true)} className="btn-line ml-auto">
                    {t(next.title)}
                    <ArrowRight size={16} weight="bold" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex flex-col gap-2 text-sm leading-relaxed text-mute md:ml-[calc(41.666%+3rem)] lg:ml-[calc(33.333%+3rem)]">
          <p className="flex items-start gap-2">
            <Info size={17} className="mt-0.5 shrink-0" />
            {t(UI.menu.allergens)}
          </p>
          {lang === 'en' && <p className="pl-[25px]">{t(UI.menu.enNote)}</p>}
        </div>
      </div>
    </section>
  )
}
