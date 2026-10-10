import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

const RISE = [0.16, 1, 0.3, 1] as const
const ROLL = [0.7, 0, 0.2, 1] as const
/** Quanto resta giù la tenda prima di alzarsi (in tutto circa 3 secondi) */
const HOLD_MS = 2100
const HOLD_REDUCED_MS = 1300

/* I colori della tenda vera di Via Silvio Spaventa: tela avorio, scritta scura */
const CANVAS = '#ebe4d5'
const CANVAS_SHADE = '#ddd3bf'
const VALANCE = '#e7dfcd'
const INK_ON_CANVAS = '#2a2420'

/**
 * Splash: la tenda di Da Mario a tutto schermo. In alto il tubo di ferro, la tela avorio con la cucitura,
 * la mantovana con la scritta "da MARIO" e il bordo a festoni. Dopo la scritta la tenda si alza
 * e scopre la sala. Con "riduci movimento": tenda ferma e dissolvenza breve. Un tocco o un tasto la chiude.
 */
export function Splash({ onReveal }: { onReveal: () => void }) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const done = useRef(false)

  const finish = useCallback(() => {
    if (done.current) return
    done.current = true
    setVisible(false)
    onReveal()
  }, [onReveal])

  useEffect(() => {
    const timer = window.setTimeout(finish, reduce ? HOLD_REDUCED_MS : HOLD_MS)
    const onKey = () => finish()
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [finish, reduce])

  // niente scroll della pagina mentre la tenda è giù
  useEffect(() => {
    if (!visible) return
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prev
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[90] cursor-pointer overflow-hidden select-none"
          onClick={finish}
          aria-hidden="true"
          translate="no"
          initial={false}
          exit={{ opacity: 1 }}
          transition={{ duration: reduce ? 0.45 : 1.25 }}
        >
          {/* il buio della porta sotto la tenda: sparisce mentre la tenda sale */}
          <motion.div
            className="absolute inset-0 bg-ink"
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.45 : 0.7, delay: reduce ? 0 : 0.25 }}
          />

          {/* la tenda */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[calc(100%-clamp(28px,5vw,44px))]"
            exit={reduce ? { opacity: 0 } : { y: '-112%' }}
            transition={reduce ? { duration: 0.45 } : { duration: 1.15, ease: ROLL }}
          >
            {/* tela inclinata: luce dall'alto, cucitura centrale, pieghe leggere */}
            <div
              className="absolute inset-x-0 top-0 h-[58%]"
              style={{
                background: `linear-gradient(180deg, ${CANVAS_SHADE} 0%, ${CANVAS} 30%, ${CANVAS} 85%, ${CANVAS_SHADE} 100%)`,
              }}
            >
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, transparent 0 calc(16.66% - 1px), rgb(42 36 32 / 0.06) calc(16.66% - 1px) 16.66%)',
                }}
              />
              <div className="absolute inset-y-0 left-1/2 w-px bg-[rgb(42_36_32/0.14)]" />
              {/* il tubo di ferro in alto */}
              <div className="absolute inset-x-0 top-0 h-3 bg-[#2b2622] shadow-[0_3px_10px_rgb(0_0_0/0.35)] sm:h-4" />
              <motion.p
                className="absolute inset-x-0 bottom-[14%] text-center font-sans text-[0.68rem] font-semibold uppercase sm:text-xs"
                style={{ color: INK_ON_CANVAS, opacity: 0.55 }}
                initial={reduce ? false : { opacity: 0, letterSpacing: '0.9em' }}
                animate={{ opacity: 0.55, letterSpacing: '0.6em' }}
                transition={{ duration: 1.1, ease: RISE, delay: 0.15 }}
              >
                Ristorante
              </motion.p>
            </div>

            {/* la piega dove la tela diventa mantovana */}
            <div className="absolute inset-x-0 top-[58%] h-3 bg-gradient-to-b from-[rgb(42_36_32/0.16)] to-transparent" />

            {/* la mantovana con la scritta, come sulla tenda vera */}
            <div className="absolute inset-x-0 top-[58%] bottom-0 flex flex-col items-center justify-center px-6" style={{ background: VALANCE }}>
              <p
                className="flex items-baseline font-display leading-none font-medium"
                style={{ color: INK_ON_CANVAS }}
              >
                <motion.span
                  className="mr-[0.45em] text-[clamp(2.6rem,11vw,6.8rem)]"
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: RISE, delay: 0.35 }}
                >
                  da
                </motion.span>
                <motion.span
                  className="text-[clamp(3.4rem,15vw,9.5rem)] tracking-[0.04em]"
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: RISE, delay: 0.5 }}
                >
                  MARIO
                </motion.span>
              </p>
              <motion.p
                className="mt-[0.6em] font-display text-[clamp(1.25rem,3.4vw,2rem)] italic"
                style={{ color: 'var(--color-fill)' }}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: RISE, delay: 1.0 }}
              >
                di Valerio Palermo
              </motion.p>
            </div>

            {/* il bordo a festoni, ben visibile sopra il buio della porta */}
            <div
              className="absolute inset-x-0 top-full h-[clamp(28px,5vw,44px)] drop-shadow-[0_8px_10px_rgb(0_0_0/0.35)]"
              style={{
                background: `radial-gradient(ellipse 50% 100% at 50% 0, ${VALANCE} 98%, transparent 100%) 0 0 / clamp(56px,10vw,88px) 100% repeat-x`,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
