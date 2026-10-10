import { ArrowRight } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { UI } from '../data/ui'
import { openMenuTab } from '../lib/booking'
import { useI18n } from '../lib/i18n'
import { scrollToId } from '../lib/scroll'

type Key = 'brace' | 'vino' | 'tartufo'

const PILLARS: { key: Key; menuId: string; word: string }[] = [
  { key: 'brace', menuId: 'brace', word: 'Brace' },
  { key: 'vino', menuId: 'vini', word: 'Vino' },
  { key: 'tartufo', menuId: 'tartufo', word: 'Tartufo' },
]

function Visual({ k }: { k: Key }) {
  if (k === 'brace')
    return (
      <picture>
        <source type="image/avif" srcSet="./img/fiorentine-640.avif 640w, ./img/fiorentine-1400.avif 1400w" sizes="(min-width: 1024px) 50vw, 100vw" />
        <img
          src="./img/fiorentine-1400.webp"
          srcSet="./img/fiorentine-640.webp 640w, ./img/fiorentine-1400.webp 1400w"
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt=""
          width={1400}
          height={1050}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full scale-[1.1] object-cover object-[50%_70%] transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.16]"
        />
      </picture>
    )
  const photo =
    k === 'vino'
      ? { base: 'parete-vini', pos: '45% 30%' }
      : { base: 'tagliatelle-tartufo', pos: '50% 55%' }
  return (
    <picture>
      <source type="image/avif" srcSet={`./img/${photo.base}-640.avif 640w, ./img/${photo.base}-1100.avif 1100w`} sizes="(min-width: 1024px) 50vw, 100vw" />
      <img
        src={`./img/${photo.base}-1100.webp`}
        srcSet={`./img/${photo.base}-640.webp 640w, ./img/${photo.base}-1100.webp 1100w`}
        sizes="(min-width: 1024px) 50vw, 100vw"
        alt=""
        width={1100}
        height={1467}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-[1.05] object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.11]"
        style={{ objectPosition: photo.pos }}
      />
    </picture>
  )
}

/**
 * I tre pilastri: tre pannelli alti affiancati. Su desktop quello attivo si allarga (passaggio del mouse o focus),
 * su smartphone sono uno sotto l'altro con il testo sempre visibile.
 */
export function Pillars() {
  const { t, lang } = useI18n()
  const [active, setActive] = useState<Key>('brace')

  const goToMenu = (id: string) => {
    openMenuTab(id)
    scrollToId('menu')
  }

  return (
    <section id="pilastri" className="px-4 pb-24 sm:px-6 md:pb-36 lg:px-10" aria-labelledby="pillars-title">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 max-w-[40ch] md:mb-14">
          <h2 id="pillars-title" className="h-section">
            {t(UI.pillars.heading)}
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-mute">{t(UI.pillars.sub)}</p>
        </div>

        <div className="flex flex-col gap-3 lg:h-[min(78svh,760px)] lg:flex-row">
          {PILLARS.map((p, i) => {
            const isActive = active === p.key
            const copy = UI.pillars[p.key]
            return (
              <motion.article
                key={p.key}
                onMouseEnter={() => setActive(p.key)}
                onFocusCapture={() => setActive(p.key)}
                className={`group relative isolate flex min-h-[420px] overflow-hidden rounded-[var(--radius-media)] bg-coal transition-[flex-grow] duration-500 ease-out-expo md:min-h-[460px] lg:min-h-0 lg:basis-0 ${
                  isActive ? 'lg:grow-[2.4]' : 'lg:grow'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Visual k={p.key} />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5"
                />

                <div className="relative mt-auto flex w-full flex-col p-6 sm:p-8 lg:p-10">
                  <h3
                    className={`font-display text-[4.2rem] leading-[0.9] font-medium tracking-[-0.01em] text-bone transition-[font-size] duration-500 ease-out-expo sm:text-[5rem] ${
                      isActive ? 'lg:text-[6rem]' : 'lg:text-[3.4rem] xl:text-[3.8rem]'
                    }`}
                  >
                    {p.word}
                  </h3>
                  {lang === 'en' && (
                    <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-bone/70 uppercase">{t(copy.word)}</p>
                  )}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo lg:grid-rows-[0fr] lg:opacity-0 ${
                      isActive ? 'lg:!grid-rows-[1fr] lg:!opacity-100' : ''
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="mt-5 max-w-[40ch] text-[1.02rem] leading-relaxed text-bone/85">{t(copy.text)}</p>
                      <button
                        type="button"
                        onClick={() => goToMenu(p.menuId)}
                        className="group/link mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-[0.12em] text-ember uppercase"
                      >
                        {t(copy.link)}
                        <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover/link:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
