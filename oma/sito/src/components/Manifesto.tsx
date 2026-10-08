import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { SITE } from '../data/site'

const WORDS = `${SITE.slogan[0]} ${SITE.slogan[1]}`.split(' ')
const ACCENT = new Set(["nonna.", "zia."])

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className={`mr-[0.24em] inline-block ${ACCENT.has(word) ? 'text-ochre' : ''}`}>
      {word}
    </motion.span>
  )
}

export function Manifesto() {
  const reduce = useReducedMotion()
  const textRef = useRef<HTMLParagraphElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.45'] })
  const { scrollYProgress: photoProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] })
  const rotate = useTransform(photoProgress, [0, 1], reduce ? [0, 0] : [-4, 3])
  const photoY = useTransform(photoProgress, [0, 1], reduce ? ['0%', '0%'] : ['6%', '-6%'])

  return (
    <section id="chi-siamo" className="relative px-4 pt-28 pb-24 md:px-8 md:pt-40 md:pb-36">
      <div className="mx-auto max-w-[1400px]">
        <p
          ref={textRef}
          className="max-w-[16ch] font-display text-[clamp(2.5rem,7vw,6.4rem)] leading-[1.02] font-semibold tracking-[-0.035em] md:max-w-[17ch]"
          aria-label={`${SITE.slogan[0]} ${SITE.slogan[1]}`}
        >
          {WORDS.map((w, i) =>
            reduce ? (
              <span key={i} className={`mr-[0.24em] inline-block ${ACCENT.has(w) ? 'text-ochre' : ''}`}>
                {w}
              </span>
            ) : (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / WORDS.length, (i + 1) / WORDS.length]} />
            ),
          )}
        </p>

        <div className="mt-20 grid grid-cols-1 items-center gap-14 md:mt-32 md:grid-cols-12 md:gap-8">
          <div ref={photoRef} className="md:col-span-5 md:col-start-1">
            <motion.figure style={{ rotate, y: photoY }} className="relative mx-auto w-[86%] md:w-full">
              <img
                src="./img/g-leonardo-alessio.webp"
                alt="Leonardo e Alessio, i titolari di OMA, a tavola con un piatto e un calice di vino"
                width={1200}
                height={1200}
                loading="lazy"
                className="aspect-square w-full rounded-[var(--radius-media)] object-cover shadow-[0_40px_90px_-40px_rgb(210_119_44/0.45)]"
              />
              <figcaption className="mt-4 text-sm text-mute">Leonardo e Alessio, i padroni di casa.</figcaption>
            </motion.figure>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-ochre uppercase">Chi siamo</p>
            <motion.h2
              className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance md:text-5xl"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Oma vuol dire nonna. Il resto lo capisci al primo assaggio.
            </motion.h2>
            <div className="mt-7 max-w-[56ch] space-y-5 text-lg leading-relaxed text-cream/80">
              <p>
                Leonardo e Alessio hanno aperto OMA in Via Costantino Maes con un'idea semplice:{' '}
                <span className="text-cream">pochi piatti, fatti bene.</span> Le ricette di casa, rilette con il gusto di
                oggi.
              </p>
              <p>
                Materie prime scelte con cura, un menu che segue le stagioni e una carta di vini di piccoli produttori.
                A pranzo, a cena e per l'aperitivo.
              </p>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-8">
              {[
                { value: '4,7', label: 'su Google, 144 recensioni' },
                { value: '20-30 €', label: 'a persona' },
                { value: '6 su 7', label: 'giorni aperti' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-[clamp(1.6rem,3.6vw,2.6rem)] leading-none font-semibold tracking-tight whitespace-nowrap">
                    {s.value}
                  </dd>
                  <dd className="mt-2 text-sm leading-snug text-mute">{s.label}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
