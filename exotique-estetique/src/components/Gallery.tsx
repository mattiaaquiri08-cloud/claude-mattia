import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import insegna from '../assets/photo/real/insegna.webp'
import sala from '../assets/photo/locali/sala.webp'
import cabinaVerde from '../assets/photo/locali/cabina-verde.webp'
import cabinaViso from '../assets/photo/locali/cabina-viso.webp'
import pedicure from '../assets/photo/locali/pedicure.webp'
import lavatesta from '../assets/photo/locali/lavatesta.webp'
import attesa from '../assets/photo/locali/attesa.webp'
import postazioneUnghie from '../assets/photo/locali/postazione-unghie.webp'
import smalti from '../assets/photo/locali/smalti.webp'
import { MaskLines } from './Reveal'

/* Fotografie reali del centro, fornite dall'utente il 25/10/2026 (stanze e ingresso). */
const photos = [
  { src: sala, portrait: true, caption: 'La sala, con le postazioni capelli e unghie', alt: 'La sala principale con specchi a parete, poltrone nere, smalti, il casco e il lavatesta in fondo davanti alla parete in pietra.' },
  { src: cabinaVerde, portrait: false, caption: 'La cabina verde, per laser e trattamenti corpo', alt: 'Cabina con pareti verdi, lettino in legno, apparecchiature per laser e trattamenti corpo, asciugamani piegati.' },
  { src: cabinaViso, portrait: true, caption: 'La cabina viso e massaggi', alt: 'Cabina con lettino in legno, lavabo, parete in pietra con orologio e una pianta.' },
  { src: pedicure, portrait: false, caption: 'La poltrona pedicure', alt: 'Poltrona pedicure in pelle nera con vaschetta idromassaggio, accanto agli scaffali degli smalti.' },
  { src: postazioneUnghie, portrait: true, caption: 'La postazione unghie', alt: 'Tavolo bianco per la manicure con lampade, scaffale di smalti, casco e la porta in legno sulla parete in pietra.' },
  { src: smalti, portrait: true, caption: 'Smalti e gel', alt: 'Scaffale nero con smalti, gel e creme per mani e unghie, con piante pendenti.' },
  { src: attesa, portrait: true, caption: "L'attesa, con la vetrina dei prodotti", alt: 'Divano nero davanti alla vetrina illuminata dei prodotti per capelli; in fondo il lavatesta.' },
  { src: lavatesta, portrait: true, caption: 'Il lavatesta', alt: 'Poltrona lavatesta in pelle nera con lavabo nero, davanti alla parete in pietra.' },
  { src: insegna, portrait: false, caption: "L'ingresso in Via Calenzuoli", alt: "La facciata del centro con l'insegna Exotique Estetique, centro estetico e parrucchiere." },
]

function Item({ p }: { p: (typeof photos)[number] }) {
  return (
    <figure className={`shrink-0 snap-start md:w-auto ${p.portrait ? 'w-[58vw] sm:w-[38vw]' : 'w-[78vw] sm:w-[52vw]'}`}>
      <div className={`overflow-hidden bg-night md:h-[min(56vh,480px)] ${p.portrait ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
        <img
          src={p.src}
          alt={p.alt}
          width={p.portrait ? 900 : 1200}
          height={p.portrait ? 1200 : 900}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </div>
      <figcaption className="mt-3 max-w-[32ch] text-[0.875rem] text-ink-soft">{p.caption}</figcaption>
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
      id="spazio"
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
              : 'no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2'
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
