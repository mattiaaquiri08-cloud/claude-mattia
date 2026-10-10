import { IconContext } from '@phosphor-icons/react'
import { MotionConfig } from 'motion/react'
import { useCallback, useMemo, useState } from 'react'
import { BookingDialog } from './components/BookingDialog'
import { FinalCta, Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Menu } from './components/Menu'
import { MobileBar } from './components/MobileBar'
import { Nav } from './components/Nav'
import { Pillars } from './components/Pillars'
import { Reviews } from './components/Reviews'
import { Splash } from './components/Splash'
import { Valerio } from './components/Valerio'
import { Visit } from './components/Visit'
import { UI } from './data/ui'
import { BookingContext } from './lib/booking'
import { I18nProvider, useI18n } from './lib/i18n'

function Site() {
  const { t } = useI18n()
  const [revealed, setRevealed] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  const onReveal = useCallback(() => setRevealed(true), [])
  const openBooking = useCallback(() => setBookingOpen(true), [])
  const closeBooking = useCallback(() => setBookingOpen(false), [])
  const ctx = useMemo(() => ({ openBooking }), [openBooking])

  return (
    <BookingContext.Provider value={ctx}>
      <Splash onReveal={onReveal} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-[var(--radius-btn)] focus:bg-fill focus:px-5 focus:py-3 focus:text-on-fill"
      >
        {t(UI.skip)}
      </a>
      <Nav revealed={revealed} />
      <main id="main">
        <Hero revealed={revealed} />
        <Intro />
        <Pillars />
        <Menu />
        <Valerio />
        <Gallery />
        <Reviews />
        <Visit />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar hidden={bookingOpen} />
      <BookingDialog open={bookingOpen} onClose={closeBooking} />
      <div className="grain" aria-hidden="true" />
    </BookingContext.Provider>
  )
}

export default function App() {
  // le icone accompagnano sempre un testo o un aria-label: per gli screen reader sono decorative
  const icons = useMemo(() => ({ 'aria-hidden': true as const }), [])
  return (
    <MotionConfig reducedMotion="user">
      <IconContext.Provider value={icons}>
        <I18nProvider>
          <Site />
        </I18nProvider>
      </IconContext.Provider>
    </MotionConfig>
  )
}
