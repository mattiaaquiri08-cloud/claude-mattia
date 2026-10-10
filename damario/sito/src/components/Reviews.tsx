import { ArrowUpRight, CaretLeft, CaretRight, GoogleLogo, Star } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { RATING, REVIEWS, SITE, type Review } from '../data/site'
import { UI } from '../data/ui'
import { shortDate } from '../lib/hours'
import { useI18n } from '../lib/i18n'

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-ember">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} weight={i < Math.round(value) ? 'fill' : 'regular'} />
      ))}
    </span>
  )
}

function ReviewCard({ r }: { r: Review }) {
  const { t, lang } = useI18n()
  const [open, setOpen] = useState(false)
  const text = lang === 'it' ? r.it : r.en
  const long = text.length > 260

  return (
    <article className="relative flex h-auto w-[85%] max-w-[440px] shrink-0 snap-start flex-col rounded-[var(--radius-media)] border border-line bg-coal p-6 sm:w-[420px] sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <Stars value={r.rating} />
        <span className="sr-only">
          {r.rating} {t(UI.reviews.stars)}
        </span>
        <GoogleLogo size={18} className="text-mute" />
      </div>

      <blockquote lang={lang} className="mt-5 flex-1">
        <p
          className={`text-[1.02rem] leading-relaxed whitespace-pre-line text-bone/90 ${long && !open ? 'line-clamp-6' : ''}`}
        >
          “{text}”
        </p>
        {long && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-3 min-h-11 text-sm font-semibold text-ember underline-offset-4 hover:underline"
          >
            {open ? t(UI.reviews.less) : t(UI.reviews.more)}
          </button>
        )}
      </blockquote>

      {r.reply && open && (
        <p className="mt-4 border-l-2 border-ember/60 pl-4 text-sm leading-relaxed text-mute" lang="it">
          <span className="block font-semibold text-bone/80">{t(UI.reviews.reply)}</span>
          {r.reply}
        </p>
      )}

      <footer className="mt-6 border-t border-line pt-5">
        <p className="font-semibold text-bone">{r.author}</p>
        <p className="mt-0.5 text-sm text-mute">
          {r.badge ? `${t(r.badge)}, ` : ''}
          <span className="capitalize">{shortDate(r.date, lang)}</span>
          {lang === 'en' && <span className="block text-xs text-mute/80">{t(UI.reviews.translated)}</span>}
        </p>
      </footer>
    </article>
  )
}

export function Reviews() {
  const { t, lang } = useI18n()
  const track = useRef<HTMLDivElement>(null)

  const scrollBy = (d: number) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector('article')
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8
    el.scrollBy({ left: d * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <section id="recensioni" className="border-t border-line/60 bg-coal/40 py-24 md:py-36" aria-labelledby="reviews-title">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-ember uppercase">{t(UI.reviews.eyebrow)}</p>
          <h2 id="reviews-title" className="h-section mt-4">
            {t(UI.reviews.heading)}
          </h2>

          <motion.div
            className="mt-10 flex items-end gap-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-display text-[6.5rem] leading-[0.8] font-medium tabular-nums">
              {RATING.value.toLocaleString(lang === 'it' ? 'it-IT' : 'en-GB')}
            </span>
            <span className="pb-1.5">
              <Stars value={RATING.value} size={20} />
              <span className="mt-2 block text-sm text-mute">
                {RATING.count} {t(UI.reviews.basedOn)}
              </span>
            </span>
          </motion.div>

          <div className="mt-10 flex flex-col items-start gap-1">
            <a href={SITE.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-center gap-2 font-semibold text-bone">
              {t(UI.reviews.readAll)}
              <ArrowUpRight size={16} weight="bold" className="text-ember transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href={SITE.googleWriteReviewUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-center gap-2 text-mute hover:text-bone">
              {t(UI.reviews.write)}
              <ArrowUpRight size={16} weight="bold" />
            </a>
            <a href={SITE.tripadvisorUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-center gap-2 text-mute hover:text-bone">
              {t(UI.reviews.tripadvisor)}
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>
          <p className="mt-6 text-xs text-mute/80">{t(UI.reviews.snapshot)}</p>
        </div>

        <div className="relative min-w-0 lg:col-span-8">
          <div
            ref={track}
            className="no-scrollbar relative -mx-4 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
            tabIndex={0}
            aria-label={t(UI.reviews.heading)}
          >
            {REVIEWS.map((r) => (
              <ReviewCard key={r.author} r={r} />
            ))}
          </div>
          <div className="mt-6 flex gap-2">
            <button type="button" onClick={() => scrollBy(-1)} aria-label={t(UI.reviews.prev)} className="grid size-12 place-items-center rounded-[var(--radius-btn)] border border-line text-bone transition-colors hover:border-mute hover:bg-smoke">
              <CaretLeft size={18} weight="bold" />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label={t(UI.reviews.next)} className="grid size-12 place-items-center rounded-[var(--radius-btn)] border border-line text-bone transition-colors hover:border-mute hover:bg-smoke">
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
