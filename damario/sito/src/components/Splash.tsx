import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

const RISE = [0.16, 1, 0.3, 1] as const
const AWNING = [0.76, 0, 0.24, 1] as const
/** Quanto resta a schermo prima che la tenda si alzi (in tutto circa 3 secondi) */
const HOLD_MS = 2300
const HOLD_REDUCED_MS = 1100

const WORD = 'DA MARIO'.split('')

/**
 * Splash: le lettere romane di "da MARIO" salgono come incise, sotto si accende una linea di brace,
 * poi il pannello si alza come la tenda bianca del locale (con il suo bordo a festoni) e scopre la hero.
 * Con "riduci movimento": scritta ferma e dissolvenza breve. Un clic o un tasto la chiude subito.
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

  // niente scroll della pagina mentre la splash è a schermo
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
          className="fixed inset-0 z-[90] cursor-pointer select-none"
          onClick={finish}
          aria-hidden="true"
          translate="no"
          initial={false}
          exit={reduce ? { opacity: 0 } : { y: 'calc(-100% - 26px)' }}
          transition={reduce ? { duration: 0.45 } : { duration: 0.95, ease: AWNING }}
        >
          <div className="absolute inset-0 bg-ink" />

          {/* bagliore della brace, fermo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
            style={{ background: 'radial-gradient(60% 70% at 50% 100%, rgb(227 104 58 / 0.16), transparent 70%)' }}
          />

          <motion.div
            className="relative flex h-full flex-col items-center justify-center px-6 text-center"
            exit={reduce ? undefined : { y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: AWNING }}
          >
            <motion.p
              className="font-sans text-[0.7rem] font-semibold text-mute uppercase sm:text-xs"
              initial={reduce ? false : { opacity: 0, letterSpacing: '0.9em' }}
              animate={{ opacity: 1, letterSpacing: '0.55em' }}
              transition={{ duration: 1.2, ease: RISE, delay: 0.1 }}
            >
              Ristorante
            </motion.p>

            <p
              className="mt-4 flex font-display text-[clamp(3.4rem,15vw,9.5rem)] leading-[0.9] font-medium tracking-[0.04em] text-bone"
            >
              {WORD.map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.06em]" aria-hidden="true">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? false : { y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.9, ease: RISE, delay: 0.3 + i * 0.055 }}
                  >
                    {ch === ' ' ? ' ' : ch}
                  </motion.span>
                </span>
              ))}
            </p>

            {/* la linea di brace che si accende */}
            <motion.span
              aria-hidden="true"
              className="mt-5 block h-px w-[min(62vw,420px)] origin-center bg-ember"
              style={{ boxShadow: '0 0 18px 2px rgb(227 104 58 / 0.55)' }}
              initial={reduce ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: RISE, delay: 1.0 }}
            />

            <motion.p
              className="mt-5 font-display text-2xl text-bone/85 italic sm:text-3xl"
              initial={reduce ? false : { opacity: 0, y: 10, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: RISE, delay: 1.35 }}
            >
              di Valerio Palermo
            </motion.p>
          </motion.div>

          {/* il bordo a festoni della tenda, visibile mentre si alza */}
          <div aria-hidden="true" className="scallop absolute inset-x-0 top-full h-[22px]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
