import { Camera } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { REVIEWS, VALERIO_PHOTO } from '../data/site'
import { UI } from '../data/ui'
import { useI18n } from '../lib/i18n'

/* Le risposte di Valerio agli ospiti su Google: la sua voce, con le sue parole. */
const REPLIES = REVIEWS.filter((r) => r.reply).map((r) => r.reply as string)

export function Valerio() {
  const { t } = useI18n()
  const photo = VALERIO_PHOTO

  return (
    <section id="valerio" className="relative px-4 py-24 sm:px-6 md:py-36 lg:px-10" aria-labelledby="valerio-title">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
        {/* Ritratto */}
        <motion.div
          className="md:col-span-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <figure className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[var(--radius-media)] bg-coal">
            {photo ? (
              <picture>
                <source
                  type="image/avif"
                  srcSet={photo.widths.map((w) => `./img/${photo.base}-${w}.avif ${w}w`).join(', ')}
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
                <img
                  src={`./img/${photo.base}-${photo.widths[photo.widths.length - 1]}.webp`}
                  srcSet={photo.widths.map((w) => `./img/${photo.base}-${w}.webp ${w}w`).join(', ')}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  alt="Valerio Palermo"
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </picture>
            ) : (
              /* Spazio pronto per il ritratto: quando arriva la foto si imposta VALERIO_PHOTO in site.ts */
              <div className="flex h-full flex-col items-center justify-center border border-dashed border-line p-8 text-center">
                <span className="font-display text-[7rem] leading-none font-medium text-bone/10 italic select-none" aria-hidden="true">
                  VP
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-mute">
                  <Camera size={18} />
                  {t(UI.valerio.photoPending)}
                </span>
              </div>
            )}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[var(--radius-media)] ring-1 ring-bone/10 ring-inset" />
          </figure>
        </motion.div>

        {/* Racconto */}
        <div className="md:col-span-7">
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
                <li key={tr.it} className="rounded-full border border-line px-4 py-2 font-display text-[1.1rem] text-bone/90 italic">
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
