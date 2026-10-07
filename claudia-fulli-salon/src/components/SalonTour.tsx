import { useLayoutEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { tourStops } from '../data/salon'
import { scrollToY } from '../lib/smooth-scroll'
import { Reveal, SalonPicture } from './ui'
import { EASE, cn } from '../lib/utils'

// Una sola foto, letta come una visita: scorrendo, l'inquadratura si sposta
// e si avvicina ai dettagli del salone. La foto non viene mai coperta dal testo.

const PHOTO = { w: 1672, h: 941 }
const N = tourStops.length
const HOLD_SHARE = 0.5 // metà di ogni tratto è movimento, metà è sosta sul dettaglio

type Frame = { k: number; x: number; y: number }

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/** Calcola zoom e spostamento che portano il punto a fuoco al centro del riquadro. */
function framesFor(size: { w: number; h: number }, mobile: boolean): Frame[] {
  const s0 = Math.max(size.w / PHOTO.w, size.h / PHOTO.h)
  const dw = PHOTO.w * s0
  const dh = PHOTO.h * s0
  return tourStops.map((stop) => {
    const k = mobile ? Math.min(stop.zoom, 1.45) : stop.zoom
    const maxX = Math.max(0, (k * dw - size.w) / 2)
    const maxY = Math.max(0, (k * dh - size.h) / 2)
    const x = Math.max(-maxX, Math.min(maxX, k * (0.5 - stop.focus.x) * dw))
    const y = Math.max(-maxY, Math.min(maxY, k * (0.5 - stop.focus.y) * dh))
    return { k, x, y }
  })
}

function sample(frames: Frame[], p: number): Frame {
  if (frames.length === 0) return { k: 1, x: 0, y: 0 }
  const pos = Math.max(0, Math.min(1, p)) * N
  const i = Math.min(N - 1, Math.floor(pos))
  const local = pos - i
  if (i === 0 || local >= HOLD_SHARE) {
    // nel primo tratto e nella seconda metà di ogni tratto si resta fermi sul dettaglio
    if (i === 0) return frames[0]
    return frames[i]
  }
  const t = easeInOut(local / HOLD_SHARE)
  const a = frames[i - 1]
  const b = frames[i]
  return { k: a.k + (b.k - a.k) * t, x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }
}

export function SalonTour() {
  const reduce = useReducedMotion()
  if (reduce) return <StaticTour />
  return <ScrollTour />
}

function TourHeading({ className }: { className?: string }) {
  return (
    <h2
      id="visita-titolo"
      className={cn('text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[0.98] font-light tracking-[-0.04em]', className)}
    >
      Dentro
      <br />
      il salone
    </h2>
  )
}

function ScrollTour() {
  const section = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [mobile, setMobile] = useState(false)
  const [active, setActive] = useState(0)
  const frames = useRef<Frame[]>([])
  const version = useMotionValue(0)

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.6 })

  useLayoutEffect(() => {
    const el = frame.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      const isMobile = window.innerWidth < 1024
      setSize({ w: width, h: height })
      setMobile(isMobile)
      frames.current = framesFor({ w: width, h: height }, isMobile)
      version.set(version.get() + 1)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [version])

  const current = useTransform([progress, version], ([p]) => sample(frames.current, p as number))
  const k = useTransform(current, (f) => f.k)
  const x = useTransform(current, (f) => f.x)
  const y = useTransform(current, (f) => f.y)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.max(0, Math.min(N - 1, Math.floor(p * N - 0.25 + 0.0001)))
    if (next !== active) setActive(next)
  })

  // Porta lo scroll al momento in cui il dettaglio scelto è fermo al centro
  const goTo = (i: number) => {
    const el = section.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const length = el.offsetHeight - window.innerHeight
    const share = i === 0 ? 0 : (i + HOLD_SHARE + 0.15) / N
    scrollToY(top + length * share)
  }

  const s0 = size.w ? Math.max(size.w / PHOTO.w, size.h / PHOTO.h) : 0
  const dw = PHOTO.w * s0
  const dh = PHOTO.h * s0
  const stop = tourStops[active]

  return (
    <section
      ref={section}
      aria-labelledby="visita-titolo"
      className="relative bg-paper"
      style={{ height: `${N * (mobile ? 80 : 100)}vh` }}
    >
      {/* Su mobile il titolo resta per i lettori di schermo: lo spazio fisso è della foto */}
      <h2 className="sr-only lg:hidden">Dentro il salone</h2>
      <div className="sticky top-0 flex h-[100dvh] flex-col gap-5 px-2 pt-[72px] pb-24 md:px-4 md:pb-5 lg:grid lg:grid-cols-12 lg:gap-8 lg:pt-[96px] lg:pb-6">
        {/* Didascalie (desktop) */}
        <div className="hidden flex-col justify-between pl-4 lg:col-span-4 lg:flex xl:col-span-3">
          <TourHeading />

          <div>
            <ol className="flex flex-col" aria-label="Dettagli del salone">
              {tourStops.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active ? 'step' : undefined}
                    className="group flex w-full items-center gap-4 py-2 text-left text-[1.0625rem] transition-colors duration-500"
                  >
                    <span className="relative h-px w-8 overflow-hidden bg-line">
                      <span
                        className={cn(
                          'absolute inset-0 origin-left bg-ink transition-transform duration-500 ease-out-expo',
                          i === active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50',
                        )}
                      />
                    </span>
                    <span className={cn('transition-colors duration-500', i === active ? 'text-ink' : 'text-muted group-hover:text-ink')}>
                      {s.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="mt-8 min-h-[5.5rem] border-t border-line pt-5" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={stop.id}
                  className="max-w-[30ch] text-[0.9375rem] leading-relaxed text-muted"
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {stop.text}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Riquadro foto */}
        <div ref={frame} className="relative min-h-0 flex-1 overflow-hidden bg-stone lg:col-span-8 xl:col-span-9">
          {dw > 0 && (
            <motion.div
              className="absolute will-change-transform"
              style={{
                width: dw,
                height: dh,
                left: (size.w - dw) / 2,
                top: (size.h - dh) / 2,
                x,
                y,
                scale: k,
              }}
            >
              <SalonPicture
                sizes="(min-width: 1024px) 75vw, 100vw"
                className="h-full w-full object-cover"
                alt="Interno di Claudia Fulli Salon visto per intero e nei dettagli: poltrone gialle, postazioni con specchi, pavimento nero e sedute alla finestra."
              />
            </motion.div>
          )}
        </div>

        {/* Didascalie (mobile e tablet) */}
        <div className="px-2 lg:hidden" aria-live="polite">
          <div className="flex gap-1.5" aria-hidden>
            {tourStops.map((s, i) => (
              <span key={s.id} className="relative h-0.5 flex-1 overflow-hidden bg-line">
                <span
                  className={cn(
                    'absolute inset-0 origin-left bg-ink transition-transform duration-500 ease-out-expo',
                    i <= active ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </span>
            ))}
          </div>
          <div className="mt-4 min-h-[5.75rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h3 className="text-2xl font-light tracking-[-0.03em]">{stop.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{stop.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Versione senza movimento: la foto intera e l'elenco dei dettagli. */
function StaticTour() {
  return (
    <section aria-labelledby="visita-titolo" className="bg-paper px-4 py-24 md:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <TourHeading />
          <ul className="mt-10 flex flex-col gap-6">
            {tourStops.map((s) => (
              <Reveal as="li" key={s.id}>
                <h3 className="text-xl font-normal tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden lg:col-span-8">
          <SalonPicture sizes="(min-width: 1024px) 66vw, 100vw" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  )
}
