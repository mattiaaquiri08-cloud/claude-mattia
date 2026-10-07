import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react'
import { ArrowUpRight, List, Phone, X } from '@phosphor-icons/react'
import { navLinks, salon } from '../data/salon'
import { handleAnchorClick, setScrollLocked } from '../lib/smooth-scroll'
import { ButtonLink } from './ui'
import { EASE, cn } from '../lib/utils'

export function Wordmark({ className }: { className?: string }) {
  return (
    <span translate="no" className={cn('inline-flex items-baseline gap-1.5 leading-none', className)}>
      <span className="text-[1.1875rem] font-medium tracking-[-0.03em]">Claudia Fulli</span>
      <span className="text-[0.8125rem] font-light tracking-[0.02em] text-current/60">Salon</span>
    </span>
  )
}

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0)
        let best: string | null = null
        let bestRatio = 0
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        setActive(best)
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.01, 0.2, 0.5] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

/** Vero quando sotto la barra c'è la parte scura della pagina (contatti e piè di pagina). */
function useNightUnderNav() {
  const [night, setNight] = useState(false)
  useEffect(() => {
    const targets = [document.getElementById('contatti'), document.querySelector('footer')].filter(
      (el): el is HTMLElement => el !== null,
    )
    const hits = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) hits.add(e.target)
          else hits.delete(e.target)
        }
        setNight(hits.size > 0)
      },
      { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - 72)}px 0px` },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])
  return night
}

export function Nav() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection()
  const night = useNightUnderNav() && !open
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    // Si nasconde scendendo, ricompare appena si risale.
    setHidden(y > 640 && y > prev + 2 && !open)
    if (y < prev - 2) setHidden(false)
  })

  useEffect(() => {
    setScrollLocked(open)
    if (open) firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const close = () => mq.matches && setOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500',
          night
            ? 'border-b border-night-line bg-night/80 text-paper backdrop-blur-xl'
            : scrolled && !open
              ? 'border-b border-line/70 bg-paper/80 text-ink backdrop-blur-xl backdrop-saturate-150'
              : 'border-b border-transparent bg-paper text-ink',
        )}
        onFocusCapture={() => setHidden(false)}
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: hidden ? '-100%' : 0, opacity: 1 }}
        transition={{ duration: hidden ? 0.45 : 0.7, ease: EASE }}
      >
        <nav
          aria-label="Principale"
          className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-4 md:h-[72px] md:px-8"
        >
          <a href="#top" onClick={handleAnchorClick} aria-label="Claudia Fulli Salon, torna all'inizio" className="-m-2 rounded-full p-2">
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleAnchorClick}
                    aria-current={isActive ? 'location' : undefined}
                    className="group relative inline-flex h-10 items-center rounded-full px-3.5 text-[0.9375rem] text-current/70 transition-colors duration-300 hover:text-current aria-[current]:text-current"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-x-3.5 bottom-1.5 h-px origin-left bg-current transition-transform duration-500 ease-out-expo',
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={salon.phoneHref}
              className="hidden h-10 items-center gap-2 rounded-full px-3.5 text-[0.9375rem] tabular text-current/70 transition-colors hover:text-current xl:inline-flex"
            >
              <Phone size={16} weight="regular" aria-hidden />
              {salon.phoneDisplay}
            </a>
            <ButtonLink href={salon.bookingUrl} tone="sun" className="hidden !h-10 !px-5 sm:inline-flex">
              Prenota
            </ButtonLink>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-[0.9375rem] font-medium ring-1 ring-inset ring-current/20 transition-colors hover:ring-current/50 lg:hidden"
            >
              {open ? <X size={18} aria-hidden /> : <List size={18} aria-hidden />}
              {open ? 'Chiudi' : 'Menu'}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-paper px-4 pt-20 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="absolute inset-x-0 top-0 flex h-16 items-center justify-between px-4">
              <Wordmark />
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  menuButton.current?.focus()
                }}
                className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-[0.9375rem] font-medium ring-1 ring-inset ring-ink/15"
              >
                <X size={18} aria-hidden />
                Chiudi
              </button>
            </div>

            <ul className="mt-6 flex flex-col">
              {navLinks.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.a
                    ref={i === 0 ? firstLink : undefined}
                    href={link.href}
                    onClick={(e) => {
                      // Sblocca lo scroll prima di partire, altrimenti lo scorrimento viene ignorato
                      setScrollLocked(false)
                      setOpen(false)
                      handleAnchorClick(e)
                    }}
                    className="flex items-center justify-between py-2.5 text-[2.5rem] leading-tight font-light tracking-[-0.04em]"
                    initial={reduce ? false : { y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease: EASE }}
                  >
                    {link.label}
                    <ArrowUpRight size={22} weight="light" aria-hidden className="text-muted" />
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              className="mt-auto flex flex-col gap-5 border-t border-line pt-6"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            >
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                {salon.street}, {salon.postalCode} {salon.city}
                <br />
                Da martedì a sabato, 10:00-19:00
              </p>
              <div className="grid grid-cols-2 gap-3">
                <ButtonLink href={salon.phoneHref} tone="ghost" icon={<Phone size={16} aria-hidden />}>
                  Chiama
                </ButtonLink>
                <ButtonLink href={salon.bookingUrl} tone="sun">
                  Prenota
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
