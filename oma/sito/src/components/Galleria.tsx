import { useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

export type FotoGalleria = { src: string; alt: string }

const AVANTI_MS = 4200

/** Porta la galleria alla foto i (ricominciando dalla prima dopo l'ultima). */
function scorriA(el: HTMLDivElement | null, i: number, n: number, smooth: boolean) {
  if (!el) return
  const k = (i + n) % n
  el.scrollTo({
    left: k * el.clientWidth,
    behavior: smooth ? 'smooth' : 'auto',
  })
}

/**
 * Le foto di una sezione, una alla volta: si scorrono col dito (o con le frecce su PC)
 * e, finché nessuno le tocca, vanno avanti da sole quando la galleria è a schermo.
 */
export function Galleria({ foto, label, className = '' }: { foto: FotoGalleria[]; label: string; className?: string }) {
  const reduce = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)
  const inView = useInView(track, { amount: 0.5 })
  const [attiva, setAttiva] = useState(0)
  const [toccata, setToccata] = useState(false)

  const n = foto.length
  const vai = (i: number) => scorriA(track.current, i, n, !reduce)

  // va avanti da sola solo se è visibile e nessuno l'ha ancora toccata
  useEffect(() => {
    if (reduce || toccata || !inView || n < 2) return
    const t = window.setInterval(() => {
      const el = track.current
      if (el) scorriA(el, Math.round(el.scrollLeft / el.clientWidth) + 1, n, true)
    }, AVANTI_MS)
    return () => window.clearInterval(t)
  }, [reduce, toccata, inView, n])

  return (
    <div
      className={`group relative overflow-hidden rounded-[var(--radius-media)] bg-paper-3 ${className}`}
      role="region"
      aria-roledescription={n > 1 ? 'carosello' : undefined}
      aria-label={label}
    >
      <div
        ref={track}
        onScroll={(e) => setAttiva(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        onPointerDown={() => setToccata(true)}
        onWheel={() => setToccata(true)}
        className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {foto.map((f, i) => (
          <img
            key={f.src}
            src={f.src}
            alt={f.alt}
            width={1080}
            height={1350}
            loading="lazy"
            draggable={false}
            aria-hidden={i !== attiva}
            className="h-full w-full shrink-0 snap-center object-cover"
          />
        ))}
      </div>

      {/* Frecce e pallini solo se c'è più di una foto */}
      {n > 1 && (
        <>
          {/* Frecce: su PC compaiono passando sopra la foto */}
          {(['prev', 'next'] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => {
                setToccata(true)
                vai(attiva + (d === 'next' ? 1 : -1))
              }}
              aria-label={d === 'next' ? 'Foto successiva' : 'Foto precedente'}
              className={`absolute top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-paper/85 text-ink opacity-0 shadow-md backdrop-blur transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 md:grid ${
                d === 'next' ? 'right-3' : 'left-3'
              }`}
            >
              {d === 'next' ? <CaretRight size={20} weight="bold" /> : <CaretLeft size={20} weight="bold" />}
            </button>
          ))}

          {/* Pallini: quale foto si sta guardando */}
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {foto.map((f, i) => (
              <button
                key={f.src}
                type="button"
                onClick={() => {
                  setToccata(true)
                  vai(i)
                }}
                aria-label={`Foto ${i + 1} di ${foto.length}`}
                aria-current={i === attiva}
                className="grid h-6 place-items-center px-0.5"
              >
                <span
                  className={`block h-1.5 rounded-full shadow-[0_0_0_1px_rgb(23_20_21/0.25)] transition-all duration-300 ${
                    i === attiva ? 'w-6 bg-paper' : 'w-1.5 bg-paper/60'
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
