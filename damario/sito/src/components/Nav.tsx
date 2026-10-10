import { List, Phone, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { SITE, type Lang } from '../data/site'
import { UI } from '../data/ui'
import { useBooking } from '../lib/booking'
import { useI18n } from '../lib/i18n'
import { scrollToId } from '../lib/scroll'

const NAV_LINKS = [
  { id: 'menu', label: UI.nav.menu },
  { id: 'valerio', label: UI.nav.valerio },
  { id: 'galleria', label: UI.nav.gallery },
  { id: 'recensioni', label: UI.nav.reviews },
  { id: 'dove-siamo', label: UI.nav.visit },
]

export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useI18n()
  const pillId = useId()
  return (
    <div
      role="group"
      aria-label={t(UI.nav.language)}
      className={`relative inline-flex items-center rounded-full border border-bone/20 bg-ink/40 p-1 backdrop-blur-md ${className}`}
    >
      {(['it', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          lang={l}
          aria-label={l === 'it' ? 'Italiano' : 'English'}
          className={`relative z-10 grid h-9 min-w-11 place-items-center rounded-full px-3 text-xs font-semibold tracking-[0.14em] uppercase transition-colors duration-300 ${
            lang === l ? 'text-ink' : 'text-bone/80 hover:text-bone'
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId={`lang-pill-${pillId}`}
              className="absolute inset-0 -z-10 rounded-full bg-bone"
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            />
          )}
          {l}
        </button>
      ))}
    </div>
  )
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex flex-col leading-none" translate="no">
      <span className={`font-display font-medium tracking-[0.02em] text-bone ${compact ? 'text-[1.6rem]' : 'text-[1.75rem]'}`}>
        da <span className="tracking-[0.06em]">MARIO</span>
      </span>
      <span className="mt-1 text-[0.62rem] font-medium tracking-[0.22em] text-bone/70 uppercase">
        di Valerio Palermo
      </span>
    </span>
  )
}

export function Nav({ revealed }: { revealed: boolean }) {
  const { t } = useI18n()
  const { openBooking } = useBooking()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuBtn = useRef<HTMLButtonElement>(null)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > 40
    if (next !== scrolled) setScrolled(next)
  })

  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const btn = menuBtn.current
    return () => {
      html.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      btn?.focus({ preventScroll: true })
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    // aspetta che il pannello si chiuda e lo scroll si sblocchi
    window.setTimeout(() => scrollToId(id), open ? 320 : 0)
  }

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !open ? 'border-b border-line/70 bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
        initial={{ opacity: 0, y: -12 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: revealed ? 0.35 : 0 }}
      >
        {/* velo in alto per leggere il menu sopra la foto */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-ink/70 to-transparent transition-opacity duration-500 ${
            scrolled ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <nav className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[76px] lg:px-10">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              setOpen(false)
              window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
            }}
            aria-label={t(UI.nav.home)}
            className="relative z-10 shrink-0 rounded-sm"
          >
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    go(l.id)
                  }}
                  className="group relative inline-flex h-11 items-center px-3.5 text-[0.92rem] font-medium text-bone/85 transition-colors hover:text-bone"
                >
                  {t(l.label)}
                  <span className="absolute inset-x-3.5 bottom-2 h-px origin-left scale-x-0 bg-ember transition-transform duration-300 ease-out-expo group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <LangSwitch />
            <button type="button" onClick={openBooking} className="btn-primary hidden !min-h-11 !px-5 !py-3 lg:inline-flex">
              {t(UI.cta.book)}
            </button>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t(UI.nav.close) : t(UI.nav.open)}
              className="grid size-11 place-items-center rounded-full border border-bone/25 bg-ink/40 text-bone backdrop-blur-md transition-colors hover:border-bone/60 xl:hidden"
            >
              {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pt-[96px] pb-[max(2rem,env(safe-area-inset-bottom))] xl:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line"
                >
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(l.id)
                    }}
                    className="flex min-h-16 items-center font-display text-[2.4rem] leading-none font-medium text-bone"
                  >
                    {t(l.label)}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-8">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  openBooking()
                }}
                className="btn-primary w-full"
              >
                {t(UI.cta.book)}
              </button>
              <a href={SITE.phoneHref} className="btn-ghost w-full">
                <Phone size={18} weight="bold" />
                {SITE.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
