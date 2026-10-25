import treccine from '../assets/photo/lavori/treccine.webp'
import unghie from '../assets/photo/lavori/unghie.webp'
import ricci from '../assets/photo/lavori/ricci.webp'
import biondo from '../assets/photo/lavori/biondo.webp'
import { MaskLines, Reveal } from './Reveal'

/*
 * Lavori fatti da Naomi in salone (foto fornite dal centro, 25/10/2026).
 * Griglia asimmetrica: due righe sfalsate, la foto orizzontale fa da pausa.
 */
const works = [
  {
    src: treccine,
    w: 750,
    h: 1000,
    caption: 'Treccine boho con ciocche mosse',
    alt: 'Capelli lunghi castani con treccine sottili e ciocche ondulate, visti da dietro.',
    cell: 'col-span-1 md:col-span-5',
    ratio: 'aspect-[3/4]',
  },
  {
    src: ricci,
    w: 1000,
    h: 750,
    caption: 'Ricci definiti con riflessi caramello',
    alt: 'Chioma riccia castana con riflessi caramello, seduta sulla poltrona del salone.',
    cell: 'col-span-2 row-start-2 md:col-span-7 md:row-start-auto md:self-end',
    ratio: 'aspect-[4/3]',
  },
  {
    src: unghie,
    w: 750,
    h: 1000,
    caption: 'Semipermanente nero, pieno e french',
    alt: 'Due mani con unghie a mandorla: alcune smaltate di nero, altre con french nero su base rosa.',
    cell: 'col-span-1 md:col-span-4 md:col-start-2 md:mt-24',
    ratio: 'aspect-[3/4]',
  },
  {
    src: biondo,
    w: 750,
    h: 1000,
    caption: 'Schiariture bionde e piega a onde',
    alt: 'Capelli biondi con schiariture e piega mossa, visti da dietro sulla poltrona.',
    cell: 'col-span-2 md:col-span-5 md:col-start-7',
    ratio: 'aspect-[4/5]',
  },
]

export function Works() {
  return (
    <section id="lavori" aria-labelledby="lavori-titolo" className="border-t border-line py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="mb-5 text-[0.75rem] font-medium uppercase tracking-[0.22em] text-ink-soft">Dal salone</p>
            <h2
              id="lavori-titolo"
              className="font-display opsz-xl text-[clamp(2.6rem,6vw,5.25rem)] leading-[0.95] tracking-[-0.025em]"
            >
              <MaskLines lines={['I lavori', <em key="n">di Naomi.</em>]} />
            </h2>
          </div>
          <Reveal className="md:col-span-4 md:col-start-9">
            <p className="max-w-[34ch] text-[1rem] leading-relaxed text-ink-soft">
              Trecce, ricci, colore e unghie: alcune clienti appena uscite dalla poltrona, fotografate in salone.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-20 md:grid-cols-12 md:gap-x-6 md:gap-y-16">
          {works.map((w, i) => (
            <Reveal key={w.caption} as="div" delay={(i % 2) * 0.08} className={w.cell}>
              <figure>
                <div className={`overflow-hidden bg-paper-2 ${w.ratio}`}>
                  <img
                    src={w.src}
                    alt={w.alt}
                    width={w.w}
                    height={w.h}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-[1.2s] ease-out-expo hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-3 border-l-2 border-lacca pl-3 text-[0.875rem] leading-snug text-ink-soft">
                  {w.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
