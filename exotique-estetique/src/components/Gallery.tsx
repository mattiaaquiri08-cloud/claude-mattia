import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import interno from '../assets/photo/real/interno.webp'
import insegna from '../assets/photo/real/insegna.webp'
import cabina from '../assets/photo/real/cabina.webp'
import pedicure from '../assets/photo/real/pedicure.webp'
import ingresso from '../assets/photo/real/ingresso.webp'
import macchinari from '../assets/photo/real/macchinari.webp'
import cabina2 from '../assets/photo/real/cabina2.webp'
import prodotti from '../assets/photo/real/prodotti.webp'
import { MaskLines } from './Reveal'

/* Fotografie reali del centro (Treatwell e Google Maps). */
const photos = [
  { src: insegna, caption: "L'ingresso in Via Calenzuoli", alt: "La facciata del centro con l'insegna Exotique Estetique, centro estetico e parrucchiere." },
  { src: interno, caption: 'La sala, con le postazioni capelli e unghie', alt: 'La sala principale con specchi, poltrone nere e la postazione unghie.' },
  { src: cabina, caption: 'La cabina dei trattamenti viso e corpo', alt: 'Cabina con lettino in legno, lavabo e parete in pietra.' },
  { src: pedicure, caption: 'La poltrona pedicure', alt: 'Poltrona pedicure in pelle nera con vaschetta.' },
  { src: macchinari, caption: 'Le apparecchiature per viso e corpo', alt: 'Vaporizzatore e apparecchiatura per trattamenti corpo davanti alla parete in pietra.' },
  { src: cabina2, caption: 'La cabina verde, per massaggi e trattamenti', alt: 'Cabina con pareti verdi, lettino e apparecchiature.' },
  { src: ingresso, caption: 'Luce naturale dalle vetrate', alt: 'La sala vista verso le vetrate su strada.' },
  { src: prodotti, caption: 'I prodotti professionali', alt: 'Flaconi di prodotti professionali per capelli.' },
]

function Item({ p }: { p: (typeof photos)[number] }) {
  return (
    <figure className="w-[78vw] shrink-0 snap-start sm:w-[52vw] md:w-auto">
      <div className="aspect-[3/2] overflow-hidden bg-night md:h-[min(56vh,480px)]">
        <img
          src={p.src}
          alt={p.alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </div>
      <figcaption className="mt-3 text-[0.875rem] text-ink-soft">{p.caption}</figcaption>
    </figure>
  )
}

export function Gallery() {
  const wrap = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  // Distanza orizzontale da percorrere, ricalcolata al ridimensionamento.
  useLayoutEffect(() => {
    const measure = () => {
      const el = track.current
      if (!el) return
      const desktop = window.matchMedia('(min-width: 768px)').matches
      setDistance(desktop && !reduce ? Math.max(0, el.scrollWidth - window.innerWidth) : 0)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [reduce])

  const pinned = distance > 0

  return (
    <section
      ref={wrap}
      aria-labelledby="galleria-titolo"
      className="relative border-t border-line"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={pinned ? 'sticky top-0 flex h-[100vh] flex-col justify-center overflow-hidden' : 'py-24'}>
        <div className="wrap">
          <h2
            id="galleria-titolo"
            className="font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.05] tracking-[-0.02em]"
          >
            <MaskLines lines={['Le stanze del centro']} />
          </h2>
        </div>
        <motion.div
          ref={track}
          style={pinned ? { x } : undefined}
          className={
            pinned
              ? 'mt-10 flex w-max gap-6 pl-[max(2.5rem,calc((100vw-1400px)/2+4rem))] pr-16 will-change-transform'
              : 'no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2'
          }
        >
          {photos.map((p) => (
            <Item key={p.caption} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
