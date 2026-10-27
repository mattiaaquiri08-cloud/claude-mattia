import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { ArrowUpRight, InstagramLogo } from '@phosphor-icons/react'
import { FOTO_SEZIONI, SITE, TESTI, type Sezione } from '../data/site'
import { Galleria } from './Galleria'

/*
  Le macro-sezioni del sito, nell'ordine dei testi della social media manager.
  Ogni sezione ha il nome (a pennello, come nei loro post), il titolo e il testo (Playfair Display).
  I titoli alternano i due font del brand: una sezione Playfair Display, la successiva il pennello.
  Ogni sezione ha tre foto dello shooting in una galleria che scorre (FOTO_SEZIONI in site.ts).
*/

const EASE = [0.16, 1, 0.3, 1] as const

function useReveal(delay = 0) {
  const reduce = useReducedMotion()
  return {
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.8, delay, ease: EASE },
  } as const
}

/** Nome della sezione a pennello, come le scritte delle loro storie, con un filo ocra. */
function Nome({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 font-pennello text-xl tracking-[0.04em] uppercase md:text-2xl ${
        dark ? 'text-paper/80' : 'text-ochre-deep'
      }`}
    >
      <span className="h-px w-8 bg-ochre" aria-hidden="true" />
      {children}
    </p>
  )
}

/**
 * Titolo: dalla seconda frase in poi va in ocra (es. "Di idee, mai.").
 * serif = Playfair Display con la seconda frase in corsivo; pennello = scritta a mano maiuscola.
 */
function Titolo({
  testo,
  font = 'serif',
  className = '',
  id,
}: {
  testo: string
  font?: 'serif' | 'pennello'
  className?: string
  id?: string
}) {
  const cut = testo.indexOf('. ')
  const first = cut === -1 ? testo : testo.slice(0, cut + 1)
  const rest = cut === -1 ? '' : testo.slice(cut + 2)
  const serif = font === 'serif'
  return (
    <h2
      id={id}
      className={`pb-1 text-balance ${
        serif
          ? 'font-display leading-[1.1] font-medium tracking-[-0.01em]'
          : 'font-pennello leading-[1.08] tracking-[0.01em] uppercase'
      } ${className}`}
    >
      {first}
      {rest && (
        <>
          {' '}
          {serif ? <em className="text-ochre">{rest}</em> : <span className="text-ochre">{rest}</span>}
        </>
      )}
    </h2>
  )
}

function Testo({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`max-w-[56ch] text-lg leading-relaxed text-ink/85 ${className}`}>{children}</p>
}

/** La galleria delle tre foto di una sezione. */
function Foto3({ s, className = '' }: { s: Sezione; className?: string }) {
  return <Galleria foto={FOTO_SEZIONI[s.id]} label={`Foto: ${s.nome}`} className={className} />
}

/* ---------- Chi siamo: foto dei titolari e presentazione ---------- */

function ChiSiamo({ s }: { s: Sezione }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-3, 2])
  const reveal = useReveal()

  return (
    <section id={s.id} aria-labelledby={`${s.id}-t`} className="px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-8">
        <div ref={ref} className="md:col-span-5">
          <motion.figure style={{ rotate }} className="mx-auto w-[86%] md:w-[88%]">
            <Foto3 s={s} className="aspect-[4/5] shadow-[0_40px_80px_-40px_rgb(23_20_21/0.45)]" />
          </motion.figure>
        </div>
        <motion.div {...reveal} className="md:col-span-6 md:col-start-7">
          <Nome>{s.nome}</Nome>
          <Titolo id={`${s.id}-t`} testo={s.titolo} className="mt-6 text-4xl md:text-6xl" />
          <Testo className="mt-7">{s.testo}</Testo>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Food: titolo e testo a sinistra, galleria compatta a destra ---------- */

function Food({ s }: { s: Sezione }) {
  const reveal = useReveal()
  const revealLate = useReveal(0.15)
  return (
    <section id={s.id} aria-labelledby={`${s.id}-t`} className="border-t border-line px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-8">
        <motion.div {...reveal} className="md:col-span-6">
          <Nome>{s.nome}</Nome>
          <Titolo id={`${s.id}-t`} testo={s.titolo} font="pennello" className="mt-6 text-[1.75rem] md:text-5xl" />
          <Testo className="mt-7">{s.testo}</Testo>
        </motion.div>
        <motion.div {...revealLate} className="mx-auto w-[78%] max-w-[360px] md:col-span-4 md:col-start-8 md:w-full md:max-w-none">
          <Foto3 s={s} className="aspect-[4/5]" />
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Il mercato: manifesto tipografico centrato, con una galleria piccola ---------- */

function Mercato({ s }: { s: Sezione }) {
  const reveal = useReveal()
  return (
    <section id={s.id} aria-labelledby={`${s.id}-t`} className="bg-paper-2 px-4 py-20 md:px-8 md:py-28">
      <motion.div {...reveal} className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
        <Nome>{s.nome}</Nome>
        <Titolo id={`${s.id}-t`} testo={s.titolo} className="mt-6 text-5xl italic md:text-7xl" />
        <Testo className="mt-7 max-w-[52ch]">{s.testo}</Testo>
        <Foto3 s={s} className="mt-10 aspect-[4/5] w-[78%] max-w-[320px]" />
      </motion.div>
    </section>
  )
}

/* ---------- Il menù: pannello compatto con galleria e pulsante verso il menu della settimana ---------- */

function Menu({ s }: { s: Sezione }) {
  const reveal = useReveal()
  return (
    <section id={s.id} aria-labelledby={`${s.id}-t`} className="px-4 py-20 md:px-8 md:py-28">
      <motion.div
        {...reveal}
        className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 rounded-[var(--radius-media)] border border-line p-6 md:grid-cols-12 md:gap-12 md:p-10"
      >
        <div className="mx-auto w-[78%] max-w-[320px] md:col-span-4 md:w-full md:max-w-none">
          <Foto3 s={s} className="aspect-[4/5]" />
        </div>
        <div className="flex flex-col gap-6 md:col-span-8">
          <Nome>{s.nome}</Nome>
          <Titolo id={`${s.id}-t`} testo={s.titolo} font="pennello" className="text-[1.75rem] md:text-5xl" />
          <Testo>{s.testo}</Testo>
          <a href={SITE.menuUrl} target="_blank" rel="noopener noreferrer" className="btn-primary self-start">
            Menu
            <ArrowUpRight size={18} weight="bold" />
          </a>
        </div>
      </motion.div>
    </section>
  )
}

/* ---------- I nostri piatti: testo e mosaico di foto ---------- */

function Piatti({ s }: { s: Sezione }) {
  const reveal = useReveal()
  return (
    <section id={s.id} aria-labelledby={`${s.id}-t`} className="border-t border-line px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
        <motion.div {...reveal} className="md:col-span-5 md:pt-6">
          <Nome>{s.nome}</Nome>
          <Titolo id={`${s.id}-t`} testo={s.titolo} className="mt-6 text-4xl md:text-6xl" />
          <Testo className="mt-7">{s.testo}</Testo>
        </motion.div>
        <motion.div {...reveal} className="md:col-span-5 md:col-start-8">
          <Foto3 s={s} className="aspect-[4/5]" />
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- L'aperitivo del sabato: l'unico blocco nero della pagina ---------- */

function Aperitivo({ s }: { s: Sezione }) {
  const reveal = useReveal()
  return (
    <section id={s.id} aria-labelledby={`${s.id}-t`} className="bg-ink px-4 py-24 text-paper md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-8">
        <motion.div {...reveal} className="md:col-span-6">
          <Nome dark>{s.nome}</Nome>
          <Titolo id={`${s.id}-t`} testo={s.titolo} font="pennello" className="mt-6 text-4xl md:text-6xl" />
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-paper/85">{s.testo}</p>
        </motion.div>
        <motion.div {...reveal} className="md:col-span-5 md:col-start-8">
          <Foto3 s={s} className="aspect-[4/5]" />
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Wine: testo e foto verticale, pulsante verso la carta dei vini ---------- */

function Vino({ s }: { s: Sezione }) {
  const reveal = useReveal()
  const revealLate = useReveal(0.15)
  return (
    <section id={s.id} aria-labelledby={`${s.id}-t`} className="px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-8">
        <motion.div {...reveal} className="md:col-span-6">
          <Nome>{s.nome}</Nome>
          <Titolo id={`${s.id}-t`} testo={s.titolo} className="mt-6 text-5xl md:text-7xl" />
          <Testo className="mt-7">{s.testo}</Testo>
          <a href={SITE.menuUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-9">
            Carta dei vini
            <ArrowUpRight size={18} weight="bold" />
          </a>
        </motion.div>
        <motion.div {...revealLate} className="mx-auto w-[78%] md:col-span-4 md:col-start-9 md:w-full">
          <Foto3 s={s} className="aspect-[4/5]" />
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Gli eventi: chiusura con rimando a Instagram ---------- */

function Eventi({ s }: { s: Sezione }) {
  const reveal = useReveal()
  return (
    <section id={s.id} aria-labelledby={`${s.id}-t`} className="border-t border-line px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-8">
        <motion.div {...reveal} className="md:col-span-6">
          <Nome>{s.nome}</Nome>
          <Titolo id={`${s.id}-t`} testo={s.titolo} font="pennello" className="mt-6 text-4xl md:text-6xl" />
          <Testo className="mt-8">{s.testo}</Testo>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn-primary mt-10">
            <InstagramLogo size={18} weight="bold" />
            Seguici su Instagram
          </a>
        </motion.div>
        <motion.div {...reveal} className="mx-auto w-[78%] max-w-[360px] md:col-span-4 md:col-start-8 md:w-full md:max-w-none">
          <Foto3 s={s} className="aspect-[4/5]" />
        </motion.div>
      </div>
    </section>
  )
}

export function Sezioni() {
  return (
    <>
      <ChiSiamo s={TESTI.chiSiamo} />
      <Food s={TESTI.food} />
      <Mercato s={TESTI.mercato} />
      <Menu s={TESTI.menu} />
      <Piatti s={TESTI.piatti} />
      <Aperitivo s={TESTI.aperitivo} />
      <Vino s={TESTI.vino} />
      <Eventi s={TESTI.eventi} />
    </>
  )
}
