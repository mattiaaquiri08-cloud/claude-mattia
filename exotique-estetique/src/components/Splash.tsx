import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { CURTAIN, EASE, cn } from '../lib'

const TOTAL = 3000 // durata complessiva in ms, uscita compresa
const EXIT = 0.75 // durata della tenda in uscita, in s

function Letters({ text, delay, align }: { text: string; delay: number; align: string }) {
  return (
    <span className={cn("inline-flex overflow-hidden pb-[0.14em] -mb-[0.14em]", align)} aria-hidden>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '115%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.9, delay: delay + i * 0.035, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

/*
 * Apertura del sito, circa 3 secondi.
 * Una linea rossa verticale (la fessura dello specchio, come nella hero) diventa
 * la "&"; il nome sale lettera per lettera; poi la tenda si alza sulla foto.
 * Si salta con un clic o un tasto. Con "riduci movimento" dura meno di un secondo.
 */
export function Splash({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const stay = reduce ? 700 : TOTAL - EXIT * 1000
    const t = window.setTimeout(() => setVisible(false), stay)
    const skip = () => setVisible(false)
    window.addEventListener('keydown', skip)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', skip)
    }
  }, [reduce])

  // La hero parte mentre la tenda si alza, non dopo.
  useEffect(() => {
    if (!visible) onDone()
  }, [visible, onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          role="status"
          aria-label="Exotique & Estetique, caricamento"
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[65] flex cursor-pointer flex-col items-center justify-center bg-night text-night-ink"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: reduce ? 0.3 : EXIT, ease: CURTAIN }}
        >
          <motion.div
            className="flex flex-col items-center"
            exit={reduce ? undefined : { y: -60, opacity: 0 }}
            transition={{ duration: EXIT * 0.8, ease: CURTAIN }}
          >
            <div className="relative grid place-items-center">
              {/* La fessura dello specchio che diventa la "&" */}
              <motion.span
                aria-hidden
                className="absolute h-[34vh] w-px origin-center bg-lacca-glow"
                initial={{ scaleY: 0, opacity: 1 }}
                animate={{ scaleY: [0, 1, 1, 0], opacity: [1, 1, 1, 0] }}
                transition={{ duration: 1.25, times: [0, 0.45, 0.7, 1], ease: CURTAIN }}
              />
              <p className="font-display opsz-xl grid grid-cols-[1fr_auto_1fr] items-baseline gap-[0.22em] whitespace-nowrap text-[clamp(2.1rem,7.5vw,6.5rem)] leading-none tracking-[-0.02em]">
                <Letters text="Exotique" delay={0.55} align="justify-self-end" />
                <motion.em
                  aria-hidden
                  className="inline-block text-lacca-glow"
                  initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.95, ease: EASE }}
                >
                  &amp;
                </motion.em>
                <Letters text="Estetique" delay={0.75} align="justify-self-start" />
              </p>
            </div>

            <motion.p
              aria-hidden
              className="mt-8 text-[0.6875rem] font-medium uppercase tracking-[0.32em] text-night-soft md:text-[0.75rem]"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.32em' }}
              transition={{ duration: 1.1, delay: 1.35, ease: EASE }}
            >
              Centro estetico a La Storta, Roma
            </motion.p>
          </motion.div>

          {/* Avanzamento: una linea sottile che si riempie */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-night-line">
            <motion.div
              className="h-full origin-left bg-lacca-glow"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: (TOTAL - EXIT * 1000) / 1000, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
