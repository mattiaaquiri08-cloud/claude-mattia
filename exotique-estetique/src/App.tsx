import { MotionConfig, useInView, useMotionValueEvent, useScroll } from 'motion/react'
import Lenis from 'lenis'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BookingContext, type BookingApi } from './components/booking-context'
import { BookingSheet } from './components/BookingSheet'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { IntroContext } from './components/intro-context'
import { Splash } from './components/Splash'
import { Manifesto } from './components/Manifesto'
import { MobileBar } from './components/MobileBar'
import { Naomi } from './components/Naomi'
import { Nav } from './components/Nav'
import { PriceList } from './components/PriceList'
import { Reviews } from './components/Reviews'
import { Treatments } from './components/Treatments'
import { Visit } from './components/Visit'

function useLenis(paused: boolean) {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const l = new Lenis({ duration: 1.15, anchors: { offset: -64 } })
    lenis.current = l
    let raf = 0
    const tick = (t: number) => {
      l.raf(t)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      l.destroy()
      lenis.current = null
    }
  }, [])
  useEffect(() => {
    if (paused) lenis.current?.stop()
    else lenis.current?.start()
  }, [paused])
}

const SPLASH_KEY = 'ee-splash-vista'

function splashAlreadySeen() {
  try {
    return window.sessionStorage.getItem(SPLASH_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  // La splash compare una volta per sessione del browser.
  const [introDone, setIntroDone] = useState(splashAlreadySeen)
  // Resta montata fino alla fine della sua animazione di uscita.
  const [needSplash] = useState(() => !splashAlreadySeen())
  const finishIntro = useCallback(() => {
    setIntroDone(true)
    try {
      window.sessionStorage.setItem(SPLASH_KEY, '1')
    } catch {
      /* archiviazione non disponibile: nessun problema */
    }
  }, [])
  const [booking, setBooking] = useState<{ open: boolean; cat?: string }>({ open: false })
  const open = useCallback((cat?: string) => setBooking({ open: true, cat }), [])
  const close = useCallback(() => setBooking((b) => ({ ...b, open: false })), [])
  const api = useMemo<BookingApi>(() => ({ open, close, isOpen: booking.open }), [open, close, booking.open])

  const locked = booking.open || !introDone
  useLenis(locked)
  useEffect(() => {
    document.documentElement.style.overflow = locked ? 'hidden' : ''
  }, [locked])

  // Barra mobile: compare dopo la hero, sparisce sul blocco contatti.
  const { scrollY } = useScroll()
  const [pastHero, setPastHero] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setPastHero(y > window.innerHeight * 0.9))
  const visitRef = useRef<HTMLElement>(null)
  const atVisit = useInView(visitRef, { amount: 0.15 })

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={introDone}>
      <BookingContext.Provider value={api}>
        <a
          href="#centro"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Vai al contenuto
        </a>
        <Nav />
        <main>
          <Hero />
          <Manifesto />
          <Treatments />
          <Gallery />
          <Naomi />
          <PriceList />
          <Reviews />
          <Visit ref={visitRef} />
        </main>
        <MobileBar visible={pastHero && !atVisit} />
        <BookingSheet isOpen={booking.open} initialCategory={booking.cat} onClose={close} />
        {needSplash && <Splash onDone={finishIntro} />}
        <div className="grain" aria-hidden />
      </BookingContext.Provider>
      </IntroContext.Provider>
    </MotionConfig>
  )
}
