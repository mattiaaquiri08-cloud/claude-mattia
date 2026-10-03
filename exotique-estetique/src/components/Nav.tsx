import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import { business } from '../content'
import { CURTAIN, EASE, cn } from '../lib'
import { useBooking } from './booking-context'
import { Button } from './Button'

const links = [
  { href: '#centro', label: 'Il centro' },
  { href: '#trattamenti', label: 'Trattamenti' },
  { href: '#spazio', label: 'Lo spazio' },
  { href: '#naomi', label: 'Naomi' },
  { href: '#listino', label: 'Listino' },
  { href: '#visita', label: 'Contatti' },
]

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-display whitespace-nowrap tracking-[-0.01em]', className)}>
      Exotique <em className="text-lacca">&amp;</em> Estetique
    </span>
  )
}

export function Nav() {
  const { open } = useBooking()
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [menu, setMenu] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > window.innerHeight * 0.82))

  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [menu])

  const light = !solid && !menu

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <div
          className={cn(
            'absolute inset-0 transition-[background-color,border-color,backdrop-filter] duration-500',
            solid && !menu
              ? 'border-b border-line bg-paper/85 backdrop-blur-md'
              : 'border-b border-transparent bg-transparent',
          )}
        />
        <nav
          aria-label="Principale"
          className={cn(
            'wrap relative flex h-16 items-center justify-between gap-6 transition-colors duration-500 md:h-[4.5rem]',
            light ? 'text-white' : 'text-ink',
          )}
        >
          <a href="#top" className="text-[1.15rem] md:text-[1.3rem]" aria-label={`${business.name}, torna all'inizio`}>
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-[0.8125rem] tracking-[0.04em] opacity-85 transition-opacity hover:opacity-100"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden md:block">
              <Button variant={light ? 'ghost-light' : 'lacca'} className="h-10 px-5" onClick={() => open()}>
                Prenota ora
              </Button>
            </span>
            <button
              type="button"
              className="-mr-2 grid size-11 place-items-center lg:hidden"
              aria-expanded={menu}
              aria-controls="menu-mobile"
              aria-label={menu ? 'Chiudi il menu' : 'Apri il menu'}
              onClick={() => setMenu((m) => !m)}
            >
              {menu ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="menu-mobile"
            key="menu"
            className="fixed inset-0 z-30 flex flex-col bg-paper pt-16 lg:hidden"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.7, ease: CURTAIN }}
          >
            <ul className="wrap flex flex-1 flex-col justify-center gap-1">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setMenu(false)}
                    className="font-display block py-1.5 text-[2.6rem] leading-[1.1] text-ink"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, delay: 0.18 + i * 0.05, ease: EASE }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="wrap flex flex-col gap-4 border-t border-line py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button
                className="w-full"
                onClick={() => {
                  setMenu(false)
                  open()
                }}
              >
                Prenota ora
              </Button>
              <p className="text-sm text-ink-soft">
                {business.street}, {business.district}, {business.city}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
