import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { ArrowUpRight, InstagramLogo } from '@phosphor-icons/react'
import { SITE, TESTI, type Sezione } from '../data/site'

/*
  Le macro-sezioni del sito, nell'ordine dei testi della social media manager.
  Ogni sezione ha il nome (Urbanist maiuscolo), il titolo e il testo (Urbanist).
  I titoli alternano i due font del brand: una sezione Playfair Display, la successiva Urbanist.
  Le foto sono provvisorie: verranno sostituite con quelle mandate dal ristorante.
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

/** Nome della sezione, come nei loro post: maiuscolo spaziato con un filo ocra. */
function Nome({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.8rem] font-extrabold tracking-[0.22em] uppercase ${
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
 * serif = Playfair Display con la seconda frase in corsivo; sans = Urbanist extrabold.
 */
function Titolo({
  testo,
  font = 'serif',
  className = '',
  id,
}: {
  testo: string
  font?: 'serif' | 'sans'
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
          : 'font-sans leading-[1.02] font-extrabold tracking-[-0.03em]'
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
  return <p className={`max-w-[56ch] text-lg leading-relaxed font-medium text-ink/85 ${className}`}>{children}</p>
}

function Foto({ src, alt, w, h, className = '' }: { src: string; alt: string; w: number; h: number; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      loading="lazy"
      className={`w-full rounded-[var(--radius-media)] object-cover ${className}`}
    />
  )
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
          <motion.figure style={{ rotate }} className="mx-auto w-[86%] md:w-full">
            <Foto
              src="./img/g-leonardo-alessio.webp"
              alt="Alessio e Leonardo, i titolari di OMA, a tavola con un piatto e un calice di vino"
              w={1200}
              h={1200}
              className="aspect-square shadow-[0_40px_80px_-40px_rgb(23_20_21/0.45)]"
            />
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

/* ---------- Food: titolo grande a tutta larghezza, due foto e il testo ---------- */

function Food({ s }: { s: Sezione }) {
  const reveal = useReveal()
  const revealLate = useReveal(0.15)
  return (
    <section id={s.id} aria-labelledby={`${s.id}-t`} className="border-t border-line px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <motion.div {...reveal}>
          <Nome>{s.nome}</Nome>
          <Titolo id={`${s.id}-t`} testo={s.titolo} font="sans" className="mt-6 max-w-[14ch] text-5xl md:text-8xl" />
        </motion.div>
        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-12 md:items-end">
          <motion.div {...revealLate} className="grid grid-cols-2 gap-4 md:col-span-7">
            <Foto src="./img/p-tavola.webp" alt="La tavola di OMA con salumi, crostoni, polpette e battuta" w={344} h={420} className="aspect-[4/5]" />
            <Foto src="./img/p-crudo.webp" alt="Un piatto di stagione servito nei piatti a fiori" w={344} h={448} className="aspect-[4/5] md:translate-y-12" />
          </motion.div>
          <motion.div {...revealLate} className="md:col-span-4 md:col-start-9">
            <Testo>{s.testo}</Testo>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Il mercato: manifesto tipografico centrato ---------- */

function Mercato({ s }: { s: Sezione }) {
  const reveal = useReveal()
  return (
    <section id={s.id} aria-labelledby={`${s.id}-t`} className="bg-paper-2 px-4 py-28 md:px-8 md:py-44">
      <motion.div {...reveal} className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
        <Nome>{s.nome}</Nome>
        <Titolo id={`${s.id}-t`} testo={s.titolo} className="mt-8 text-6xl italic md:text-9xl" />
        <Testo className="mt-10 max-w-[52ch]">{s.testo}</Testo>
      </motion.div>
    </section>
  )
}

/* ---------- Il menù: pannello con foto e pulsante verso il menu della settimana ---------- */

function Menu({ s }: { s: Sezione }) {
  const reveal = useReveal()
  return (
    <section id={s.id} aria-labelledby={`${s.id}-t`} className="px-4 py-24 md:px-8 md:py-36">
      <motion.div
        {...reveal}
        className="mx-auto grid max-w-[1400px] grid-cols-1 overflow-hidden rounded-[var(--radius-media)] border border-line md:grid-cols-12"
      >
        <div className="relative h-72 md:col-span-5 md:h-auto md:min-h-[520px]">
          <img
            src="./img/p-rigatoni.webp"
            alt="Un piatto di rigatoni al sugo con formaggio grattugiato"
            width={344}
            height={448}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-7 p-8 md:col-span-7 md:p-16">
          <Nome>{s.nome}</Nome>
          <Titolo id={`${s.id}-t`} testo={s.titolo} font="sans" className="text-4xl md:text-6xl" />
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
  const foto = [
    { src: './img/p-battuta.webp', alt: 'La battuta di manzo, condita al momento', w: 344, h: 412, cls: 'col-span-2 row-span-2 aspect-[4/5] md:aspect-auto md:h-full' },
    { src: './img/p-tiramisu.webp', alt: 'Il tiramisù servito in sala, accanto al calice', w: 344, h: 448, cls: 'aspect-[4/5]' },
    { src: './img/g-sala.webp', alt: 'La sala di OMA con le luci accese', w: 1400, h: 787, cls: 'aspect-[4/5]' },
  ]
  return (
    <section id={s.id} aria-labelledby={`${s.id}-t`} className="border-t border-line px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
        <motion.div {...reveal} className="md:col-span-5 md:pt-6">
          <Nome>{s.nome}</Nome>
          <Titolo id={`${s.id}-t`} testo={s.titolo} className="mt-6 text-4xl md:text-6xl" />
          <Testo className="mt-7">{s.testo}</Testo>
        </motion.div>
        <div className="grid grid-cols-3 grid-rows-2 gap-4 md:col-span-6 md:col-start-7">
          {foto.map((f, i) => (
            <motion.div
              key={f.src}
              className={f.cls}
              initial={reveal.initial === false ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            >
              <Foto src={f.src} alt={f.alt} w={f.w} h={f.h} className="h-full" />
            </motion.div>
          ))}
        </div>
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
          <Titolo id={`${s.id}-t`} testo={s.titolo} font="sans" className="mt-6 text-5xl md:text-7xl" />
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed font-medium text-paper/85">{s.testo}</p>
        </motion.div>
        <motion.div {...reveal} className="md:col-span-5 md:col-start-8">
          <Foto src="./img/g-sala.webp" alt="La sala di OMA la sera, con le luci ambra" w={1400} h={787} className="aspect-[4/3]" />
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
          <Foto src="./img/g-sala-verticale.webp" alt="Calici e bottiglie nella sala di OMA" w={940} h={1672} className="aspect-[3/4]" />
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
      <motion.div {...reveal} className="mx-auto max-w-[900px]">
        <Nome>{s.nome}</Nome>
        <Titolo id={`${s.id}-t`} testo={s.titolo} font="sans" className="mt-6 text-5xl md:text-7xl" />
        <Testo className="mt-8">{s.testo}</Testo>
        <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn-primary mt-10">
          <InstagramLogo size={18} weight="bold" />
          Seguici su Instagram
        </a>
      </motion.div>
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
