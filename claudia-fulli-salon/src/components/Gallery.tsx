import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { Camera, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { galleryItems } from '../data/salon'
import { EASE, cn } from '../lib/utils'
import { MaskedLines, Reveal } from './ui'

// Galleria orizzontale: si sfoglia col dito, trascinando col mouse, con le frecce o da tastiera.
// Lo scroll verticale della pagina non viene mai dirottato.
// I riquadri sono segnaposto: le foto dei lavori verranno inserite in `galleryItems`.

const ratios = {
  tall: 'aspect-[4/5] w-[78vw] sm:w-[22rem] lg:w-[26rem]',
  wide: 'aspect-[5/4] w-[86vw] sm:w-[30rem] lg:w-[36rem]',
  slim: 'aspect-[3/4] w-[70vw] sm:w-[19rem] lg:w-[22rem]',
} as const

export function Gallery() {
  const reduce = useReducedMotion()
  const track = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [dragging, setDragging] = useState(false)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })

  const { scrollXProgress } = useScroll({ container: track })
  const progress = useSpring(scrollXProgress, { stiffness: 200, damping: 40 })

  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => {
      setAtStart(el.scrollLeft <= 4)
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  /** Scorre di circa una schermata di riquadri nella direzione scelta. */
  const page = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' })
  }

  // Trascinamento col mouse (sul touch resta lo scorrimento nativo)
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== 'mouse' || !track.current) return
    drag.current = { active: true, startX: e.clientX, startScroll: track.current.scrollLeft, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current
    if (!d.active || !track.current) return
    const dx = e.clientX - d.startX
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true
      setDragging(true)
      track.current.setPointerCapture(e.pointerId)
    }
    if (d.moved) track.current.scrollLeft = d.startScroll - dx
  }
  const endDrag = () => {
    drag.current.active = false
    setDragging(false)
  }

  return (
    <section id="galleria" aria-labelledby="galleria-titolo" className="overflow-hidden bg-paper pb-28 md:pb-40">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <MaskedLines
            id="galleria-titolo"
            lines={['Acconciature', 'e trucchi']}
            className="text-[clamp(2.75rem,5.4vw,5rem)] leading-[0.95] font-light tracking-[-0.045em]"
          />
          <Reveal>
            <p className="mt-6 max-w-[40ch] text-[1.0625rem] leading-relaxed text-muted">
              Alcuni lavori realizzati in salone. Scorri di lato per vederli tutti.
            </p>
          </Reveal>
        </div>

        <div className="flex items-center gap-2" role="group" aria-label="Scorri la galleria">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={atStart}
            aria-label="Foto precedenti"
            aria-controls="galleria-lista"
            className="inline-flex size-12 items-center justify-center rounded-full ring-1 ring-inset ring-ink/20 transition-[background-color,color,box-shadow,opacity,transform] duration-300 hover:bg-ink hover:text-paper hover:ring-ink active:scale-95 disabled:pointer-events-none disabled:opacity-35"
          >
            <CaretLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label="Foto successive"
            aria-controls="galleria-lista"
            className="inline-flex size-12 items-center justify-center rounded-full ring-1 ring-inset ring-ink/20 transition-[background-color,color,box-shadow,opacity,transform] duration-300 hover:bg-ink hover:text-paper hover:ring-ink active:scale-95 disabled:pointer-events-none disabled:opacity-35"
          >
            <CaretRight size={18} aria-hidden />
          </button>
        </div>
      </div>

      {/* L'ingresso è comandato dalla lista: i riquadri fuori schermo a destra entrano insieme ai primi */}
      <motion.ul
        id="galleria-lista"
        ref={track}
        initial={reduce ? false : 'hidden'}
        whileInView="shown"
        viewport={{ once: true, amount: 0.25 }}
        tabIndex={0}
        aria-label="Galleria dei lavori, scorrimento orizzontale"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            page(1)
          }
          if (e.key === 'ArrowLeft') {
            e.preventDefault()
            page(-1)
          }
        }}
        className={cn(
          'mt-12 flex gap-4 overflow-x-auto overscroll-x-contain px-4 pb-4 select-none md:mt-16 md:gap-6 md:px-8',
          'scroll-px-4 md:scroll-px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'focus-visible:outline-offset-[-2px]',
          dragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory',
          // allinea il primo riquadro al bordo del contenuto anche oltre i 1440px
          'xl:px-[max(2rem,calc((100vw-1440px)/2+2rem))] xl:scroll-px-[max(2rem,calc((100vw-1440px)/2+2rem))]',
        )}
      >
        {galleryItems.map((item, i) => (
          <motion.li
            key={item.id}
            className="shrink-0 snap-start"
            variants={{
              hidden: { opacity: 0, x: 48 },
              shown: { opacity: 1, x: 0, transition: { duration: 0.9, delay: Math.min(i, 4) * 0.07, ease: EASE } },
            }}
          >
            <figure className="group">
              {item.src ? (
                <div className={cn('overflow-hidden bg-stone', ratios[item.shape])}>
                  <img
                    src={item.src}
                    alt={item.category}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div
                  role="img"
                  aria-label={`Segnaposto: foto progetti modello, ${item.category.toLowerCase()}`}
                  className={cn('relative overflow-hidden bg-stone', ratios[item.shape])}
                >
                  <div className="absolute inset-3 flex flex-col items-center justify-center gap-3 border border-dashed border-ink/25 text-center transition-colors duration-500 group-hover:border-ink/50">
                    <Camera size={30} weight="light" aria-hidden className="text-muted" />
                    <p className="text-lg font-light tracking-[-0.02em]">Foto progetti modello</p>
                  </div>
                </div>
              )}
              <figcaption className="mt-3 text-[0.9375rem]">{item.category}</figcaption>
            </figure>
          </motion.li>
        ))}
      </motion.ul>

      {/* Avanzamento della galleria */}
      <div className="mx-auto mt-6 max-w-[1440px] px-4 md:px-8" aria-hidden>
        <div className="relative h-px w-full overflow-hidden bg-line md:w-1/3">
          <motion.span className="absolute inset-0 origin-left bg-ink" style={{ scaleX: progress }} />
        </div>
      </div>
    </section>
  )
}
