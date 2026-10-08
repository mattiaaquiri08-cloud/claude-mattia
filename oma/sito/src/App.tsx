import { IconContext } from '@phosphor-icons/react'
import { MotionConfig } from 'motion/react'
import { useCallback, useMemo, useState } from 'react'
import { Aperitivo } from './components/Aperitivo'
import { BookingContext } from './components/booking-context'
import { BookingDialog } from './components/BookingDialog'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Manifesto } from './components/Manifesto'
import { Menu } from './components/Menu'
import { Nav } from './components/Nav'
import { Reviews } from './components/Reviews'
import { Splash } from './components/Splash'
import { Visit } from './components/Visit'

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  const onReveal = useCallback(() => setRevealed(true), [])
  const openBooking = useCallback(() => setBookingOpen(true), [])
  const closeBooking = useCallback(() => setBookingOpen(false), [])
  const ctx = useMemo(() => ({ openBooking }), [openBooking])
  // le icone accompagnano sempre un testo o un aria-label: per gli screen reader sono decorative
  const icons = useMemo(() => ({ 'aria-hidden': true as const }), [])

  return (
    <MotionConfig reducedMotion="user">
      <IconContext.Provider value={icons}>
        <BookingContext.Provider value={ctx}>
          <Splash onReveal={onReveal} />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ochre focus:px-5 focus:py-3 focus:text-ink"
          >
            Vai al contenuto
          </a>
          <Nav revealed={revealed} />
          <main id="main">
            <Hero revealed={revealed} />
            <Manifesto />
            <Menu />
            <Aperitivo />
            <Gallery />
            <Reviews />
            <Visit />
            <FinalCta />
          </main>
          <Footer />
          <BookingDialog open={bookingOpen} onClose={closeBooking} />
          <div className="grain" aria-hidden="true" />
        </BookingContext.Provider>
      </IconContext.Provider>
    </MotionConfig>
  )
}
