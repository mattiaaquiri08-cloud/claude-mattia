import { motion, useReducedMotion } from 'motion/react'
import { useLiveData } from '../lib/live-data'
import { romeNow, shortDate, weekdayOf } from '../lib/hours'
import { DAY_NAMES, type TipoLavagna, type VoceLavagna } from '../data/site'
import { scrollToId } from '../lib/scroll'

const ETICHETTA: Record<TipoLavagna, string> = {
  ferie: 'Ferie',
  chiuso: 'Chiusi',
  promo: 'Promo',
  evento: 'Evento',
  avviso: 'Avviso',
}

/** "sab 25 ott" per un giorno, "dal 24 dic al 6 gen" per un periodo. */
function quando(v: VoceLavagna) {
  if (v.al) return `dal ${shortDate(v.dal)} al ${shortDate(v.al)}`
  return `${DAY_NAMES[weekdayOf(v.dal)].slice(0, 3).toLowerCase()} ${shortDate(v.dal)}`
}

/*
  La lavagna di OMA: ferie, giorni di chiusura, promozioni ed eventi, scritti a gessetto.
  Le voci passate spariscono da sole; senza voci la lavagna dice che si è aperti come sempre.
*/
export function Lavagna() {
  const reduce = useReducedMotion()
  const { lavagna } = useLiveData()
  const oggi = romeNow().iso
  const voci = lavagna.filter((v) => (v.al ?? v.dal) >= oggi).sort((a, b) => a.dal.localeCompare(b.dal))

  return (
    <section id="lavagna" aria-labelledby="lavagna-t" className="px-4 pt-20 md:px-8 md:pt-28">
      <motion.div
        className="lavagna relative mx-auto grid max-w-[1400px] grid-cols-1 gap-8 overflow-hidden rounded-[var(--radius-media)] p-7 text-paper md:grid-cols-12 md:gap-8 md:p-12"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="md:col-span-4">
          <h2 id="lavagna-t" className="font-pennello text-4xl tracking-[0.02em] uppercase md:text-5xl">
            La lavagna
          </h2>
          <p className="mt-3 max-w-[30ch] text-paper/70 italic">Ferie, chiusure, promozioni e serate speciali.</p>
        </div>

        <div className="md:col-span-8">
          {voci.length ? (
            <ul className="flex flex-col divide-y divide-dashed divide-paper/20">
              {voci.map((v) => (
                <li
                  key={`${v.dal}-${v.testo}`}
                  className="grid grid-cols-1 gap-x-6 gap-y-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]"
                >
                  <p className="font-pennello text-xl leading-snug tracking-[0.02em] text-ochre uppercase">
                    {quando(v)}
                  </p>
                  <p className="text-lg leading-snug text-paper/90">
                    <span className="mr-2 font-pennello tracking-[0.04em] text-paper/60 uppercase">
                      {ETICHETTA[v.tipo]}
                    </span>
                    {v.testo}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg leading-relaxed text-paper/85">
              Niente da segnalare: siamo aperti come sempre.{' '}
              <a
                href="#dove-siamo"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('dove-siamo')
                }}
                className="text-paper underline decoration-ochre underline-offset-4 hover:text-ochre"
              >
                Guarda gli orari
              </a>
            </p>
          )}
        </div>
      </motion.div>
    </section>
  )
}
