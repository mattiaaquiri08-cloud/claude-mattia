import { motion } from 'motion/react'
import { business, naomiPhoto, naomiQuote } from '../content'
import { EASE } from '../lib'
import { ClipReveal, MaskLines, Reveal } from './Reveal'

/* Dalla descrizione scritta da Naomi sulla scheda Google del centro. */
const principles = [
  { word: 'Qualità', text: 'Solo prodotti e trattamenti di alta qualità, che rispettano la salute della pelle e del corpo.' },
  { word: 'Accoglienza', text: 'Un ambiente accogliente e un servizio curato, che riflette la passione per l\u2019estetica.' },
  { word: 'Benessere', text: 'Non solo migliorare l\u2019aspetto esteriore, ma promuovere il benessere generale di chi viene in salone.' },
]

export function Naomi() {
  return (
    <section id="naomi" aria-labelledby="naomi-titolo" className="border-t border-line py-24 md:py-36">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <ClipReveal className="relative mx-auto aspect-[4/5] max-w-[26rem] overflow-hidden border-[6px] border-ink bg-paper-2 md:mx-0">
              {naomiPhoto ? (
                <img
                  src={naomiPhoto}
                  alt={`Naomi, titolare di ${business.name}, durante un trattamento laser.`}
                  className="size-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                /* Segnaposto finché non arriva la nuova foto di Naomi */
                <div className="flex size-full flex-col items-center justify-center gap-5 p-8 text-center" role="img" aria-label="Spazio per la foto di Naomi">
                  <div className="absolute inset-4 border border-line" aria-hidden />
                  <span aria-hidden className="font-display opsz-xl text-[clamp(6rem,12vw,9rem)] italic leading-none text-lacca/80">
                    N
                  </span>
                  <span aria-hidden className="text-[0.75rem] font-medium uppercase tracking-[0.22em] text-ink-soft">
                    Foto in arrivo
                  </span>
                </div>
              )}
            </ClipReveal>
          </div>
        </div>

        <div className="md:col-span-7 md:pt-4 lg:col-span-6 lg:col-start-7">
          <p className="mb-5 text-[0.75rem] font-medium uppercase tracking-[0.22em] text-ink-soft">La titolare</p>
          <h2
            id="naomi-titolo"
            className="font-display opsz-xl mb-10 text-[clamp(3.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em]"
          >
            <MaskLines lines={[<em key="n">Naomi</em>]} />
          </h2>
          <Reveal className="max-w-[46ch]">
            <p className="text-[1.1875rem] leading-relaxed text-ink">
              Capelli, unghie, massaggi, laser, ciglia: dietro ogni trattamento di {business.name} c&apos;è Naomi.
              Una cliente l&apos;ha descritta così: &ldquo;lei è 10 persone in una&rdquo;.
            </p>
          </Reveal>

          <Reveal className="mt-12" delay={0.1}>
            <figure className="border-l-2 border-lacca pl-6">
              <blockquote className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] italic leading-[1.25]">
                &ldquo;{naomiQuote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[0.875rem] text-ink-soft">Naomi, titolare</figcaption>
            </figure>
          </Reveal>

          <ul className="mt-14 border-t border-line">
            {principles.map((p, i) => (
              <motion.li
                key={p.word}
                className="grid gap-2 border-b border-line py-6 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-8"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              >
                <span className="font-display text-[1.75rem] italic leading-tight text-lacca">{p.word}</span>
                <span className="text-[1rem] leading-relaxed text-ink-soft">{p.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
