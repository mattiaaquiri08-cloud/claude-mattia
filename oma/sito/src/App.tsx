import { IconContext } from '@phosphor-icons/react'
import { MotionConfig } from 'motion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BookingContext } from './components/booking-context'
import { BookingDialog } from './components/BookingDialog'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Lavagna } from './components/Lavagna'
import { Nav } from './components/Nav'
import { Sezioni } from './components/Sezioni'
import { Splash } from './components/Splash'
import { Visit } from './components/Visit'
import { loadLiveData } from './lib/live-data'

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  const onReveal = useCallback(() => setRevealed(true), [])
  const openBooking = useCallback(() => setBookingOpen(true), [])
  const closeBooking = useCallback(() => setBookingOpen(false), [])
  const ctx = useMemo(() => ({ openBooking }), [openBooking])
  // le icone accompagnano sempre un testo o un aria-label: per gli screen reader sono decorative
  const icons = useMemo(() => ({ 'aria-hidden': true as const }), [])

  // orari, avviso e lavagna aggiornati dal Foglio Google
  useEffect(() => {
    loadLiveData()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <IconContext.Provider value={icons}>
        <BookingContext.Provider value={ctx}>
          <Splash onReveal={onReveal} />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
          >
            Vai al contenuto
          </a>
          <Nav revealed={revealed} />
          <main id="main">
            <Hero revealed={revealed} />
            <Lavagna />
            <Sezioni />
            <Visit />
          </main>
          <Footer />
          <BookingDialog open={bookingOpen} onClose={closeBooking} />
          <div className="grain" aria-hidden="true" />
        </BookingContext.Provider>
      </IconContext.Provider>
    </MotionConfig>
  )
}
