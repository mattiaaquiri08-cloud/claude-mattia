import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { Info, InstagramLogo, List, Phone, X } from '@phosphor-icons/react'
import { useBooking } from './booking-context'
import { SITE } from '../data/site'
import { scrollToId } from '../lib/scroll'
import { useLiveData } from '../lib/live-data'

const LINKS = [
  { id: 'chi-siamo', label: 'Chi siamo' },
  { id: 'food', label: 'Food' },
  { id: 'menu', label: 'Menù' },
  { id: 'aperitivo', label: 'Aperitivo' },
  { id: 'wine', label: 'Wine' },
  { id: 'eventi', label: 'Eventi' },
  { id: 'dove-siamo', label: 'Dove siamo' },
]

export function Nav() {
  const { openBooking } = useBooking()
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { notice } = useLiveData()
  // in cima la barra è trasparente sull'avorio della hero, scorrendo diventa un vetro avorio
  const bar = solid || menuOpen

  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > 40
    if (next !== solid) setSolid(next)
  })

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const go = (id: string) => {
    setMenuOpen(false)
    // lascia chiudere il menu prima di scorrere
    window.setTimeout(() => scrollToId(id), menuOpen ? 280 : 0)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[60]"
        initial={reduce ? false : { y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Avviso scritto dal ristorante nel foglio (ferie, chiusure, serate speciali) */}
        {notice && (
          <p
            role="status"
            className="flex items-center justify-center gap-2 bg-ink px-4 py-2 text-center text-sm font-medium text-balance text-paper"
          >
            <Info size={16} weight="bold" className="shrink-0" />
            {notice}
          </p>
        )}
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
            bar ? 'border-b border-line/70 bg-paper/85 backdrop-blur-xl' : 'border-b border-transparent'
          }`}
        >
          <nav
            className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-6 px-[max(1rem,env(safe-area-inset-left))] md:h-[76px] md:px-8"
            aria-label="Navigazione principale"
          >
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                go('top')
              }}
              className="flex items-center"
              aria-label="OMA Osteria Moderna, torna all'inizio"
            >
              {/* in cima c'è già il logo grande della hero: quello piccolo compare quando si scorre */}
              <img
                src="./img/logo-oma.png"
                alt=""
                width={620}
                height={303}
                className={`h-8 w-auto transition-opacity duration-500 md:h-9 ${bar ? 'opacity-100' : 'opacity-0'}`}
              />
            </a>

            <ul className="hidden items-center gap-0.5 xl:flex">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(l.id)
                    }}
                    className="group relative rounded-full px-3.5 py-2.5 text-[0.95rem] font-semibold text-ink/80 transition-colors hover:text-ink"
                  >
                    {l.label}
                    <span className="absolute inset-x-3.5 bottom-1.5 h-px origin-left scale-x-0 bg-ochre transition-transform duration-300 ease-out-expo group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram di OMA (${SITE.instagramHandle})`}
                className="grid size-11 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink/50"
              >
                <InstagramLogo size={20} weight="bold" />
              </a>
              <button
                type="button"
                onClick={openBooking}
                className="btn-primary !px-5 !py-3 !text-[0.75rem] md:!px-6"
              >
                Prenota ora
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="grid size-11 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink/50 xl:hidden"
                aria-expanded={menuOpen}
                aria-controls="menu-mobile"
                aria-label={menuOpen ? 'Chiudi il menu' : 'Apri il menu'}
              >
                {menuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Menu a tutto schermo per smartphone e tablet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-[55] flex flex-col bg-paper px-6 pt-[100px] pb-10 xl:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.ul
              className="flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              {LINKS.map((l) => (
                <motion.li
                  key={l.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(l.id)
                    }}
                    className="block py-1.5 font-display text-[2.3rem] leading-[1.15] font-medium text-ink active:text-ochre"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-auto flex flex-col gap-4 border-t border-line pt-6 text-ink/85"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p>
                {SITE.address}, {SITE.city}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={SITE.phoneHref} className="btn-ghost !px-5 !py-3">
                  <Phone size={18} weight="bold" />
                  Chiama
                </a>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-5 !py-3">
                  <InstagramLogo size={18} weight="bold" />
                  Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
