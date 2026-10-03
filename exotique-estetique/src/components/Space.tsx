import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import webp1584 from '../assets/photo/salone-1584.webp'
import webp1024 from '../assets/photo/salone-1024.webp'
import webp640 from '../assets/photo/salone-640.webp'
import vetrina from '../assets/photo/vetrina.webp'
import specchio from '../assets/photo/specchio.webp'
import casco from '../assets/photo/casco.webp'
import unghie from '../assets/photo/unghie.webp'
import orologio from '../assets/photo/orologio.webp'
import { EASE, cn } from '../lib'
import { MaskLines } from './Reveal'

/* Punti della fotografia, in percentuale sulla foto originale 1584x993. */
const spots = [
  { id: 'vetrina', x: 14, y: 40, title: 'La vetrina', text: 'Prodotti professionali e una parete di smalti, sempre a vista.', img: vetrina },
  { id: 'specchi', x: 42, y: 30, title: 'Gli specchi', text: 'Specchi a tutta altezza e poltrone in pelle per taglio, piega e colore.', img: specchio },
  { id: 'casco', x: 71, y: 33, title: 'Il casco', text: 'Il casco a parete per i trattamenti dedicati ai capelli.', img: casco },
  { id: 'unghie', x: 77, y: 61, title: 'La postazione unghie', text: 'Il tavolo per mani e unghie, con la sua cassettiera rossa.', img: unghie },
  { id: 'orologio', x: 87, y: 23, title: "L'orologio", text: 'Gli appuntamenti hanno il loro tempo, senza fretta.', img: orologio },
]

export function Space() {
  const [active, setActive] = useState(0)
  const frame = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1])
  const spot = spots[active]

  return (
    <section id="spazio" aria-labelledby="spazio-titolo" className="py-24 md:py-36">
      <div className="wrap">
        <p className="mb-6 text-[0.75rem] font-medium uppercase tracking-[0.22em] text-ink-soft">Lo spazio</p>
        <h2
          id="spazio-titolo"
          className="font-display max-w-[18ch] text-[clamp(2.6rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.02em]"
        >
          <MaskLines lines={['Luminoso, ordinato,', <em key="e">pensato nei dettagli.</em>]} />
        </h2>
        <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          Esplora il centro: tocca i punti sulla fotografia.
        </p>
      </div>

      <div className="wrap mt-14 md:mt-20">
        <div ref={frame} className="relative overflow-hidden bg-night">
          <motion.div className="relative origin-center" style={{ scale }}>
          <img
            src={webp1584}
            srcSet={`${webp640} 640w, ${webp1024} 1024w, ${webp1584} 1584w`}
            sizes="(min-width: 1400px) 1272px, 100vw"
            alt="Panoramica dell'interno del centro."
            width={1584}
            height={993}
            loading="lazy"
            decoding="async"
            className="block aspect-[1584/993] w-full object-cover"
          />

          {spots.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              aria-label={s.title}
              className="group absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <span
                className={cn(
                  'absolute inset-1.5 rounded-full border transition-[transform,border-color] duration-500 ease-out-expo md:inset-0',
                  active === i ? 'scale-100 border-white' : 'scale-75 border-white/70 group-hover:scale-100',
                )}
              />
              <span
                className={cn(
                  'relative size-2.5 rounded-full transition-colors duration-500 md:size-3',
                  active === i ? 'bg-lacca' : 'bg-white',
                )}
              />
            </button>
          ))}
          </motion.div>
        </div>

        {/* Dettagli: galleria orizzontale, sincronizzata con i punti */}
        <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4" aria-live="polite">
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <h3 className="font-display text-[1.9rem] leading-tight">{spot.title}</h3>
              <p className="mt-2 max-w-[34ch] text-[1rem] leading-relaxed text-ink-soft">{spot.text}</p>
            </motion.div>
          </div>
          <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:col-span-8 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
            {spots.map((s, i) => (
              <li key={s.id} className="w-[38%] shrink-0 snap-start sm:w-[26%] md:w-auto">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Mostra ${s.title.toLowerCase()}`}
                  className="group block w-full text-left"
                >
                  <span
                    className={cn(
                      'block aspect-[3/4] overflow-hidden border-2 transition-colors duration-500',
                      active === i ? 'border-lacca' : 'border-transparent',
                    )}
                  >
                    <img
                      src={s.img}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        'size-full object-cover transition-[transform,filter] duration-700 ease-out-expo group-hover:scale-105',
                        active === i ? '' : 'grayscale-[35%]',
                      )}
                    />
                  </span>
                  <span className="mt-2 block text-[0.8125rem] text-ink-soft">{s.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
