import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { Phone } from '@phosphor-icons/react'
import { salon } from '../data/salon'
import { EASE } from '../lib/utils'

/** Barra "Chiama / Prenota" sul telefono: compare dopo l'apertura, sparisce sui contatti. */
export function MobileBookingBar() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const [pastHero, setPastHero] = useState(false)
  const [contactsVisible, setContactsVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setPastHero(y > window.innerHeight * 0.85))

  useEffect(() => {
    const el = document.getElementById('contatti')
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setContactsVisible(entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const show = pastHero && !contactsVisible

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
          initial={reduce ? { opacity: 0 } : { y: '120%' }}
          animate={reduce ? { opacity: 1 } : { y: 0 }}
          exit={reduce ? { opacity: 0 } : { y: '120%' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="grid grid-cols-[auto_1fr] gap-2 rounded-full bg-ink/90 p-1.5 shadow-[0_12px_40px_-12px_var(--color-ink)] backdrop-blur-xl">
            <a
              href={salon.phoneHref}
              aria-label={`Chiama il salone, ${salon.phoneDisplay}`}
              className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium text-paper ring-1 ring-inset ring-paper/20 active:scale-[0.97]"
            >
              <Phone size={17} aria-hidden />
              Chiama
            </a>
            <a
              href={salon.bookingUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center justify-center rounded-full bg-sun text-[0.9375rem] font-medium text-ink active:scale-[0.97]"
            >
              Prenota<span className="sr-only"> (si apre in una nuova scheda)</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
