import { motion, useReducedMotion } from 'motion/react'
import { useLiveData } from '../lib/live-data'
import { romeNow, shortDate, weekdayOf } from '../lib/hours'
import { DAY_NAMES, type TipoLavagna, type VoceLavagna } from '../data/site'
import { scrollToId } from '../lib/scroll'

type Riga = VoceLavagna & { giorni: string[] }

const ETICHETTA: Record<TipoLavagna, string> = {
  ferie: 'Ferie',
  chiuso: 'Chiusi',
  promo: 'Promo',
  evento: 'Evento',
  avviso: 'Avviso',
}

const giorno = (iso: string) => `${DAY_NAMES[weekdayOf(iso)].slice(0, 3).toLowerCase()} ${shortDate(iso)}`

/** "sab 25 ott", più giorni separati da virgole, "dal 24 dic al 6 gen"; senza data il turno ("a pranzo"). */
function quando(r: Riga) {
  if (!r.dal) return r.turno === 'cena' ? 'a cena' : r.turno === 'pranzo' ? 'a pranzo' : 'sempre'
  if (r.al) return `dal ${shortDate(r.dal)} al ${shortDate(r.al)}`
  return r.giorni.map(giorno).join(', ')
}

/** Le voci uguali su giorni diversi (es. tre chiusure a cena) diventano una riga sola. */
function raggruppa(voci: VoceLavagna[]): Riga[] {
  const righe: Riga[] = []
  for (const v of voci) {
    const simile = v.dal && !v.al
      ? righe.find((r) => r.dal && !r.al && r.tipo === v.tipo && r.turno === v.turno && r.testo === v.testo)
      : undefined
    if (simile) simile.giorni.push(v.dal!)
    else righe.push({ ...v, giorni: v.dal ? [v.dal] : [] })
  }
  return righe
}

/*
  La lavagna di OMA: ferie, giorni di chiusura, promozioni ed eventi, scritti a gessetto.
  Le voci passate spariscono da sole; senza voci la lavagna dice che si è aperti come sempre.
  Sta sul nero, attaccata alla hero, senza la fascia avorio in mezzo.
*/
export function Lavagna() {
  const reduce = useReducedMotion()
  const { lavagna } = useLiveData()
  const oggi = romeNow().iso
  // prima le voci sempre valide, poi le altre in ordine di data
  const voci = raggruppa(
    lavagna
      .filter((v) => !v.dal || (v.al ?? v.dal) >= oggi)
      .sort((a, b) => (a.dal ?? '').localeCompare(b.dal ?? '')),
  )

  return (
    <section id="lavagna" aria-labelledby="lavagna-t" className="bg-ink px-4 pt-2 pb-16 md:px-8 md:pt-6 md:pb-24">
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
                  key={`${v.dal ?? 'sempre'}-${v.tipo}-${v.testo}`}
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
