import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { Claudia } from './components/Claudia'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Manifesto } from './components/Manifesto'
import { MobileBookingBar } from './components/MobileBookingBar'
import { Nav } from './components/Nav'
import { Reviews } from './components/Reviews'
import { SalonTour } from './components/SalonTour'
import { Services } from './components/Services'
import { Splash } from './components/Splash'
import { Visit } from './components/Visit'
import { IntroContext } from './lib/intro'
import { setScrollLocked, startSmoothScroll } from './lib/smooth-scroll'
import { IS_PREVIEW } from './lib/utils'

export default function App() {
  const [splash, setSplash] = useState(true)
  const finishSplash = useCallback(() => setSplash(false), [])

  useEffect(() => {
    // La schermata d'apertura parte sempre dall'inizio della pagina.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    return startSmoothScroll()
  }, [])

  useEffect(() => {
    setScrollLocked(splash)
  }, [splash])

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={!splash}>
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
          <Claudia />
          <Services />
          <Reviews />
          <Visit />
        </main>
        <Footer />
        <MobileBookingBar />

        {IS_PREVIEW && (
          <p className="pointer-events-none fixed bottom-4 left-4 z-30 hidden rounded-full bg-ink/85 px-4 py-2 text-[0.75rem] text-paper backdrop-blur md:block">
            Bozza di proposta, non è il sito ufficiale del salone
          </p>
        )}

        <AnimatePresence>{splash && <Splash key="splash" onFinish={finishSplash} />}</AnimatePresence>
      </IntroContext.Provider>
    </MotionConfig>
  )
}
