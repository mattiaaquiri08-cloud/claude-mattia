import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { REVIEWS } from '../data/site'
import { UI } from '../data/ui'
import { useI18n } from '../lib/i18n'

/* Le risposte di Valerio agli ospiti su Google: la sua voce, con le sue parole. */
const REPLIES = REVIEWS.filter((r) => r.reply).map((r) => r.reply as string)

function Photo({ base, widths, width, height, alt, sizes, className }: {
  base: string
  widths: number[]
  width: number
  height: number
  alt: string
  sizes: string
  className?: string
}) {
  return (
    <picture>
      <source type="image/avif" srcSet={widths.map((w) => `./img/${base}-${w}.avif ${w}w`).join(', ')} sizes={sizes} />
      <img
        src={`./img/${base}-${widths[widths.length - 1]}.webp`}
        srcSet={widths.map((w) => `./img/${base}-${w}.webp ${w}w`).join(', ')}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  )
}

/**
 * Valerio: il ritratto in sala e, in sovrapposizione, il momento del tartufo al carrello.
 * La seconda foto scorre appena più veloce della prima: profondità, non spettacolo.
 */
export function Valerio() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50])

  return (
    <section id="valerio" className="relative px-4 py-24 sm:px-6 md:py-36 lg:px-10" aria-labelledby="valerio-title">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 md:grid-cols-12 md:gap-10 lg:gap-16">
        {/* Le due foto */}
        <motion.div
          ref={ref}
          className="relative pr-[14%] pb-[22%] md:col-span-6 md:pr-[16%]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-media)] bg-coal">
            <Photo
              base="valerio"
              widths={[640, 1152]}
              width={1152}
              height={1366}
              alt={t(UI.valerio.photoMain)}
              sizes="(min-width: 768px) 42vw, 86vw"
              className="h-full w-full object-cover object-[35%_30%]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[var(--radius-media)] ring-1 ring-bone/10 ring-inset" />
          </figure>

          <motion.figure
            style={{ y }}
            className="absolute right-0 bottom-0 aspect-[3/4] w-[46%] overflow-hidden rounded-[var(--radius-media)] bg-coal shadow-[0_30px_80px_-20px_rgb(0_0_0/0.75)] ring-[6px] ring-ink"
          >
            <Photo
              base="valerio-carrello"
              widths={[640, 1086]}
              width={1086}
              height={1448}
              alt={t(UI.valerio.photoTruffle)}
              sizes="(min-width: 768px) 20vw, 40vw"
              className="h-full w-full object-cover object-[55%_40%]"
            />
          </motion.figure>

          <p className="absolute bottom-0 left-0 max-w-[50%] pr-5 font-display text-[1.05rem] leading-snug text-mute italic sm:text-[1.2rem]">
            {t(UI.valerio.caption)}
          </p>
        </motion.div>

        {/* Racconto */}
        <div className="md:col-span-6">
          <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-ember uppercase">{t(UI.valerio.eyebrow)}</p>
          <h2 id="valerio-title" className="h-section mt-4">
            {t(UI.valerio.heading)}
          </h2>
          <p className="mt-7 max-w-[44ch] font-display text-[1.65rem] leading-[1.3] text-bone sm:text-[1.9rem]">{t(UI.valerio.lead)}</p>
          <p className="mt-6 max-w-[58ch] text-[1.05rem] leading-relaxed text-mute">{t(UI.valerio.body)}</p>

          <div className="mt-10">
            <p className="text-sm text-mute">{t(UI.valerio.traitsLabel)}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {UI.valerio.traits.map((tr) => (
                <li key={tr.it} className="rounded-[var(--radius-btn)] border border-line px-4 py-2 font-display text-[1.1rem] text-bone/90 italic">
                  {t(tr)}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-2">
            {REPLIES.map((reply, i) => (
              <motion.figure
                key={reply}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote lang="it" className="font-display text-[1.75rem] leading-[1.15] text-bone italic">
                  “{reply}”
                </blockquote>
                <figcaption className="mt-3 text-sm text-mute">{t(UI.valerio.replyLabel)}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
