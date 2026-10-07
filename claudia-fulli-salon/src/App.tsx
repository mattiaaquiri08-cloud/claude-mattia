import { useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Manifesto } from './components/Manifesto'
import { MobileBookingBar } from './components/MobileBookingBar'
import { Nav } from './components/Nav'
import { Reviews } from './components/Reviews'
import { SalonTour } from './components/SalonTour'
import { Services } from './components/Services'
import { Team } from './components/Team'
import { Visit } from './components/Visit'
import { startSmoothScroll } from './lib/smooth-scroll'

export default function App() {
  useEffect(() => startSmoothScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#contenuto"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-ink px-5 py-3 text-paper focus:translate-y-0"
      >
        Vai al contenuto
      </a>
      <Nav />
      <main id="contenuto">
        <Hero />
        <Manifesto />
        <SalonTour />
        <Services />
        <Team />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <MobileBookingBar />
    </MotionConfig>
  )
}
