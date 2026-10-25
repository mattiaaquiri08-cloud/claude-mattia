import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Clock, List, MapPin, Phone, Star, StarHalf, WhatsappLogo, X } from '@phosphor-icons/react'
import heroDeskAvif from '../../exotique-estetique/src/assets/photo/hero/desktop-1189.avif'
import heroDeskWebp from '../../exotique-estetique/src/assets/photo/hero/desktop-1189.webp'
import heroMobAvif from '../../exotique-estetique/src/assets/photo/hero/mobile-472.avif'
import heroMobWebp from '../../exotique-estetique/src/assets/photo/hero/mobile-472.webp'
import bbGlowImg from '../../exotique-estetique/src/assets/photo/real/bbglow.webp'
import { business, categories, duration, euro, fromPrice, highlights, naomiQuote, reviews, whatsappLink } from './data'

const EASE = [0.22, 1, 0.36, 1] as const

/* Tinta piena per ogni categoria, a rotazione come da DESIGN.md */
const tint: Record<string, { bg: string; text: string; soft: string }> = {
  viso: { bg: 'bg-cipria', text: 'text-ink', soft: 'text-body' },
  corpo: { bg: 'bg-nude', text: 'text-ink', soft: 'text-body' },
  epilazione: { bg: 'bg-sabbia', text: 'text-ink', soft: 'text-body' },
  'mani-piedi': { bg: 'bg-malva', text: 'text-ink', soft: 'text-body' },
  sguardo: { bg: 'bg-pesca', text: 'text-ink', soft: 'text-body' },
  capelli: { bg: 'bg-cacao', text: 'text-on-dark', soft: 'text-on-dark-soft' },
}

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function Logo({ className = '' }: { className?: string }) {
  return (
    <span translate="no" className={`font-display whitespace-nowrap ${className}`}>
      Exotique <span className="text-accent">&amp;</span> Estetique
    </span>
  )
}

function PrimaryButton({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-primary px-6 text-[15px] font-medium tracking-[0.02em] text-on-dark transition-[background-color,transform] duration-300 hover:bg-primary-active active:scale-[0.98] ${className}`}
    >
      {children}
    </a>
  )
}

function SecondaryButton({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-ink/70 px-6 text-[15px] font-medium tracking-[0.02em] text-ink transition-[background-color,color,transform] duration-300 hover:bg-ink hover:text-on-dark active:scale-[0.98] ${className}`}
    >
      {children}
    </a>
  )
}

const navLinks = [
  { href: '#trattamenti', label: 'Trattamenti' },
  { href: '#offerte', label: 'Offerte' },
  { href: '#listino', label: 'Listino' },
  { href: '#recensioni', label: 'Recensioni' },
  { href: '#contatti', label: 'Contatti' },
]

function Nav() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])
  return (
    <header className="sticky top-0 z-40 border-b border-hairline/70 bg-canvas/90 backdrop-blur-md">
      <nav aria-label="Principale" className="wrap flex h-[72px] items-center justify-between gap-4">
        <a href="#top" className="whitespace-nowrap text-[1.3rem] text-ink sm:text-[1.45rem]" aria-label="Exotique & Estetique, torna all'inizio">
          <Logo />
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[15px] text-body transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <PrimaryButton href={whatsappLink()} className="hidden h-11 px-5 md:inline-flex">
            Prenota ora
          </PrimaryButton>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
            className="-mr-2 grid size-11 place-items-center rounded-full text-ink lg:hidden"
          >
            {open ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute inset-x-0 top-[72px] h-[calc(100dvh-72px)] bg-canvas lg:hidden"
          >
            <ul className="wrap flex flex-col gap-1 pt-8">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-2 text-[2.4rem] leading-tight text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="wrap mt-8">
              <PrimaryButton href={whatsappLink()} className="w-full">
                Prenota ora
              </PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" aria-labelledby="hero-titolo" className="wrap grid gap-10 pb-16 pt-10 md:pt-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-24">
      <div className="lg:col-span-6 xl:col-span-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted"
        >
          Centro estetico a La Storta, Roma
        </motion.p>
        <motion.h1
          id="hero-titolo"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="font-display mt-5 text-[clamp(2.9rem,7vw,5.25rem)] leading-[0.95] tracking-[-0.02em]"
        >
          Bellezza, <em className="text-accent">su misura.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="mt-6 max-w-[34rem] text-[1.125rem] leading-relaxed text-body"
        >
          Viso, corpo, laser, unghie e capelli in un unico salone luminoso, curato in ogni dettaglio da Naomi.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <PrimaryButton href={whatsappLink()}>
            <WhatsappLogo size={18} aria-hidden />
            Prenota ora
          </PrimaryButton>
          <SecondaryButton href="#trattamenti">
            I trattamenti
            <ArrowRight size={16} aria-hidden />
          </SecondaryButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
        className="lg:col-span-6"
      >
        <picture className="block overflow-hidden rounded-xl bg-surface-card">
          <source media="(max-width: 767px)" type="image/avif" srcSet={heroMobAvif} />
          <source media="(max-width: 767px)" type="image/webp" srcSet={heroMobWebp} />
          <source type="image/avif" srcSet={heroDeskAvif} />
          <img
            src={heroDeskWebp}
            alt="L'interno del salone: poltrone in pelle nera, specchi, la parete in pietra con l'orologio e il divano d'attesa."
            width={1189}
            height={941}
            fetchPriority="high"
            className="aspect-[4/5] w-full object-cover md:aspect-[1189/941]"
          />
        </picture>
      </motion.div>
    </section>
  )
}

/* Tre fatti reali subito sotto la hero */
function Facts() {
  const { rating, hours } = business
  const open = hours?.[0]
  return (
    <section aria-label="In breve" className="wrap">
      <dl className="grid gap-6 border-y border-hairline py-8 sm:grid-cols-3 sm:gap-10">
        <div className="flex items-center gap-4">
          <dt className="sr-only">Valutazione</dt>
          <dd className="font-display text-[2.6rem] leading-none text-ink">{rating.value.toLocaleString('it-IT')}</dd>
          <dd className="text-[15px] leading-snug text-body">
            <span className="flex gap-0.5 text-accent" aria-hidden>
              {[0, 1, 2, 3].map((k) => (
                <Star key={k} size={14} weight="fill" />
              ))}
              <StarHalf size={14} weight="fill" />
            </span>
            su {rating.count} recensioni Google
          </dd>
        </div>
        <div className="flex items-start gap-3">
          <Clock size={22} weight="light" className="mt-0.5 shrink-0 text-accent" aria-hidden />
          <div>
            <dt className="text-[13px] text-muted">Orari</dt>
            <dd className="text-[15px] text-ink">
              {open ? `${open.days}, ${open.time}` : 'Su appuntamento'}
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={22} weight="light" className="mt-0.5 shrink-0 text-accent" aria-hidden />
          <div>
            <dt className="text-[13px] text-muted">Dove</dt>
            <dd className="text-[15px] text-ink">
              {business.street}, {business.district}
            </dd>
          </div>
        </div>
      </dl>
    </section>
  )
}

/* Mosaico dei trattamenti: una card colorata per categoria, nessuna cella vuota */
const layout: Record<string, string> = {
  viso: 'md:col-span-2 lg:col-span-4',
  corpo: 'lg:col-span-2',
  epilazione: 'lg:col-span-2',
  'mani-piedi': 'lg:col-span-2',
  sguardo: 'lg:col-span-2',
  capelli: 'md:col-span-2 lg:col-span-6',
}
const wide = new Set(['viso', 'capelli'])

function Treatments({ onPick }: { onPick: (id: string) => void }) {
  return (
    <section id="trattamenti" aria-labelledby="tratt-titolo" className="wrap py-[72px] md:py-[112px]">
      <Reveal>
        <h2 id="tratt-titolo" className="font-display max-w-[16ch] text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.015em]">
          Sei mondi, <em className="text-accent">una sola cura.</em>
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-6">
        {categories.map((c, i) => {
          const t = tint[c.id]
          const min = fromPrice(c)
          const isWide = wide.has(c.id)
          return (
            <Reveal key={c.id} delay={(i % 3) * 0.06} className={layout[c.id]}>
              <article
                className={`group flex h-full flex-col gap-6 overflow-hidden rounded-xl p-6 md:p-8 ${t.bg} ${
                  isWide ? 'lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-10' : ''
                }`}
              >
                <div className={`overflow-hidden rounded-lg ${isWide ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[280px]' : 'aspect-[4/3]'}`}>
                  <img
                    src={c.image}
                    alt={c.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
                  />
                </div>
                <div className={`flex flex-1 flex-col ${isWide ? 'lg:py-4' : ''}`}>
                  <h3 className={`font-display text-[2rem] leading-tight ${t.text}`}>{c.title}</h3>
                  <p className={`mt-3 max-w-[44ch] text-[15px] leading-relaxed ${t.soft}`}>{c.intro}</p>
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                    {min !== null && (
                      <p className={t.text}>
                        <span className={`text-[13px] ${t.soft}`}>da </span>
                        <span className="font-display text-[1.75rem] leading-none">{euro(min)}</span>
                      </p>
                    )}
                    <a
                      href="#listino"
                      onClick={() => onPick(c.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors ${
                        c.id === 'capelli'
                          ? 'border-on-dark/50 text-on-dark hover:bg-on-dark hover:text-ink'
                          : 'border-ink/40 text-ink hover:bg-ink hover:text-on-dark'
                      }`}
                    >
                      Vedi i prezzi
                      <ArrowRight size={14} aria-hidden />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function Offers() {
  const { laser, bbGlow } = highlights
  return (
    <section id="offerte" aria-labelledby="offerte-titolo" className="bg-surface-soft py-[72px] md:py-[112px]">
      <div className="wrap">
        <Reveal>
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted">In evidenza</p>
          <h2 id="offerte-titolo" className="font-display mt-4 text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.015em]">
            Da provare <em className="text-accent">adesso.</em>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-xl bg-cacao p-8 text-on-dark md:p-10">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-on-dark-soft">Offerta</p>
              <h3 className="font-display mt-3 text-[2.2rem] leading-tight text-on-dark">{laser.title}</h3>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-[4rem] leading-none">{euro(laser.price)}</span>
                <span className="text-[15px] text-on-dark-soft">{laser.unit}</span>
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {laser.points.map((p) => (
                  <li key={p} className="rounded-full border border-on-dark/30 px-4 py-2 text-[14px]">
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <a
                  href={whatsappLink('epilazione laser')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2.5 rounded-full bg-canvas px-6 text-[15px] font-medium text-ink transition-transform active:scale-[0.98]"
                >
                  Prenota la prova gratuita
                  <ArrowUpRight size={16} aria-hidden />
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-3" delay={0.08}>
            <div className="grid h-full gap-6 rounded-xl bg-cipria p-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8 md:p-8">
              <div className="overflow-hidden rounded-lg bg-white">
                <img
                  src={bbGlowImg}
                  alt="Lo stesso volto prima e dopo il BB Glow: a sinistra la pelle con macchie, a destra la pelle uniforme."
                  width={632}
                  height={516}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[632/516] w-full object-cover sm:aspect-auto sm:h-full"
                />
              </div>
              <div>
                <h3 className="font-display text-[2.2rem] leading-tight">{bbGlow.title}</h3>
                <p className="font-display mt-1 text-[1.2rem] italic text-body">{bbGlow.subtitle}</p>
                <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                  {bbGlow.prices.map((pr) => (
                    <div key={pr.label} className="flex items-baseline gap-2">
                      <dt className="order-2 text-[14px] text-body">{pr.label}</dt>
                      <dd className="font-display text-[1.9rem] leading-none text-ink">{euro(pr.value)}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] text-ink">
                  {bbGlow.points.map((p) => (
                    <li key={p} className="flex items-baseline gap-2.5">
                      <span aria-hidden className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-ink/50" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function PriceList({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const cat = categories.find((c) => c.id === active) ?? categories[0]
  const half = Math.ceil(cat.services.length / 2)
  return (
    <section id="listino" aria-labelledby="listino-titolo" className="wrap py-[72px] md:py-[112px]">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="listino-titolo" className="font-display text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.015em]">
          Il listino
        </h2>
        <p className="max-w-[36ch] text-[15px] text-muted md:text-right">
          Prezzi del listino del centro. Dove c&apos;è scritto &ldquo;da&rdquo;, il prezzo varia in base al trattamento.
        </p>
      </Reveal>

      <div role="tablist" aria-label="Categorie del listino" className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
        {categories.map((c) => {
          const on = c.id === cat.id
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={on}
              aria-controls="listino-pannello"
              onClick={() => setActive(c.id)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-[15px] transition-colors ${on ? 'text-on-dark' : 'text-body hover:bg-surface-card'}`}
            >
              {on && (
                <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ duration: 0.45, ease: EASE }} />
              )}
              <span className="relative">{c.title}</span>
            </button>
          )
        })}
      </div>

      <div id="listino-pannello" role="tabpanel" aria-labelledby={`tab-${cat.id}`} className="mt-8 min-h-[14rem] rounded-xl border border-hairline bg-canvas p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="grid gap-x-14 md:grid-cols-2"
          >
            {[cat.services.slice(0, half), cat.services.slice(half)].map((col, k) => (
              <ul key={k}>
                {col.map((s) => (
                  <li key={s.name} className="py-3">
                    <div className="flex items-baseline gap-3">
                      <span className="min-w-0 text-[16px] text-ink">{s.name}</span>
                      <span className="leader text-ink" aria-hidden />
                      {s.price !== null ? (
                        <span className="shrink-0 font-display text-[1.375rem] font-semibold leading-none text-ink">
                          {s.from && <span className="mr-1 font-sans text-[12px] font-normal text-muted">da</span>}
                          {euro(s.price)}
                        </span>
                      ) : (
                        <span className="shrink-0 font-display text-[1.125rem] italic text-muted">{s.note ?? 'su richiesta'}</span>
                      )}
                    </div>
                    {s.duration !== null && <span className="mt-0.5 block text-[13px] text-muted">{duration(s.duration)}</span>}
                  </li>
                ))}
              </ul>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Naomi() {
  return (
    <section aria-labelledby="naomi-titolo" className="bg-surface-strong/60 py-[72px] md:py-[112px]">
      <Reveal className="wrap text-center">
        <h2 id="naomi-titolo" className="sr-only">
          Naomi, la titolare
        </h2>
        <p className="font-display mx-auto max-w-[24ch] text-[clamp(2rem,4.4vw,3.4rem)] italic leading-[1.15] text-ink">
          &ldquo;{naomiQuote}&rdquo;
        </p>
        <p className="mt-8 text-[15px] text-body">
          <span className="font-display text-[1.5rem] not-italic text-ink">Naomi</span>
          <span className="mx-3 text-muted" aria-hidden>
            /
          </span>
          titolare di Exotique &amp; Estetique
        </p>
      </Reveal>
    </section>
  )
}

function Reviews() {
  return (
    <section id="recensioni" aria-labelledby="recensioni-titolo" className="wrap py-[72px] md:py-[112px]">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h2 id="recensioni-titolo" className="font-display text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.015em]">
            Le vostre <em className="text-accent">parole.</em>
          </h2>
          <p className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-[4.5rem] leading-none text-ink">{business.rating.value.toLocaleString('it-IT')}</span>
            <span className="text-[15px] text-body">su {business.rating.count} recensioni Google</span>
          </p>
          <SecondaryButton href={business.reviewsUrl} className="mt-8">
            Leggi su Google
            <ArrowUpRight size={16} aria-hidden />
          </SecondaryButton>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {reviews.map((r, i) => (
            <Reveal key={r.author} delay={(i % 2) * 0.08}>
              <figure className="flex h-full flex-col rounded-lg bg-surface-card p-7">
                <span className="flex gap-0.5 text-accent" aria-hidden>
                  {[0, 1, 2, 3, 4].map((k) => (
                    <Star key={k} size={14} weight="fill" />
                  ))}
                </span>
                <blockquote className="mt-4 flex-1 text-[16px] leading-relaxed text-ink">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-6 text-[14px] text-muted">
                  <span className="font-medium text-ink">{r.author}</span>, Google
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBand() {
  return (
    <section aria-labelledby="cta-titolo" className="wrap pb-[72px] md:pb-[112px]">
      <Reveal>
        <div className="rounded-xl bg-cipria px-6 py-14 text-center md:px-16 md:py-20">
          <h2 id="cta-titolo" className="font-display mx-auto max-w-[18ch] text-[clamp(2.2rem,4.6vw,3.25rem)] leading-[1.05]">
            Prenota il tuo <em>momento.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[40ch] text-[16px] text-body">
            Scrivi su WhatsApp o chiama: Naomi ti risponde per fissare giorno e ora.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <PrimaryButton href={whatsappLink()}>
              <WhatsappLogo size={18} aria-hidden />
              Prenota ora
            </PrimaryButton>
            <SecondaryButton href={business.mobile.href}>
              <Phone size={16} aria-hidden />
              Chiama {business.mobile.display}
            </SecondaryButton>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

const YEAR = new Date().getFullYear()

function Footer() {
  return (
    <footer id="contatti" className="bg-surface-soft">
      <div className="wrap grid gap-10 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-4">
        <div>
          <p className="text-[1.6rem] text-ink">
            <Logo />
          </p>
          <p className="mt-3 max-w-[28ch] text-[15px]">Centro estetico e parrucchiere a La Storta, Roma.</p>
        </div>
        <div>
          <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-muted">Dove</h2>
          <p className="mt-3 text-[15px] text-ink">
            {business.street}
            <br />
            {business.postalCode} {business.city}, {business.district}
          </p>
          <p className="mt-1 text-[14px] text-muted">{business.directions}</p>
          <a href={business.directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[15px] text-accent underline-offset-4 hover:underline">
            Indicazioni
            <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>
        <div>
          <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-muted">Contatti</h2>
          <ul className="mt-3 space-y-1.5 text-[15px] text-ink">
            <li>
              <a href={business.mobile.href} className="hover:text-accent">
                {business.mobile.display}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                WhatsApp
              </a>
            </li>
            <li className="break-all">
              <a href={`mailto:${business.email}`} className="hover:text-accent">
                {business.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-muted">Orari</h2>
          <ul className="mt-3 space-y-1.5 text-[15px] text-ink">
            {business.hours?.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="text-body">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap">
        <div className="flex flex-col gap-2 border-t border-hairline py-6 text-[14px] text-muted md:flex-row md:justify-between">
          <p>
            &copy; {YEAR} Exotique &amp; Estetique
          </p>
          <a href={business.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  )
}

/* Barra di prenotazione fissa, solo su smartphone */
function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-canvas/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
      <div className="flex gap-2">
        <PrimaryButton href={whatsappLink()} className="flex-1">
          <WhatsappLogo size={18} aria-hidden />
          Prenota ora
        </PrimaryButton>
        <a href={business.mobile.href} aria-label={`Chiama ${business.mobile.display}`} className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/40 text-ink">
          <Phone size={20} />
        </a>
      </div>
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState(categories[0].id)
  return (
    <MotionConfig reducedMotion="user">
      <a href="#trattamenti" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-3 focus:text-on-dark">
        Vai al contenuto
      </a>
      <Nav />
      <main className="pb-20 md:pb-0">
        <Hero />
        <Facts />
        <Treatments onPick={setActive} />
        <Offers />
        <PriceList active={active} setActive={setActive} />
        <Naomi />
        <Reviews />
        <CtaBand />
      </main>
      <Footer />
      <MobileBar />
    </MotionConfig>
  )
}
