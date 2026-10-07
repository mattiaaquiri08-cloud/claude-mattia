import { useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE, IS_PREVIEW } from '../lib/utils'

const WORDMARK = 'Claudia Fulli'
// Durata totale circa 3 secondi: 2,3 s di apertura più 0,7 s di sipario che sale.
const SPLASH_HOLD_MS = 2300

/** Schermata d'apertura: il nome compare, una linea sottile si traccia, poi il sipario sale. */
export function Splash({ onFinish }: { onFinish: () => void }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(onFinish, reduce ? 1400 : SPLASH_HOLD_MS)
    const skip = () => onFinish()
    window.addEventListener('keydown', skip)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', skip)
    }
  }, [onFinish, reduce])

  return (
    <motion.div
      aria-hidden
      onClick={onFinish}
      className="fixed inset-0 z-[70] flex cursor-default items-center justify-center bg-paper px-4"
      initial={false}
      exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      transition={{ duration: reduce ? 0.4 : 0.75, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="flex flex-col items-center"
        exit={reduce ? undefined : { y: -48, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        <p translate="no" className="text-display overflow-hidden pb-[0.08em] text-[clamp(3rem,10vw,7.5rem)] whitespace-nowrap">
          {WORDMARK.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={reduce ? false : { y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 0.15 + i * 0.04, ease: EASE }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </p>

        <span className="relative mt-6 block h-px w-[min(56vw,20rem)] overflow-hidden bg-line">
          <motion.span
            className="absolute inset-0 origin-left bg-ink"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.7, delay: 0.45, ease: [0.65, 0, 0.35, 1] }}
          />
        </span>

        <motion.p
          className="mt-5 text-[0.75rem] tracking-[0.24em] text-muted uppercase"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
        >
          Hair studio a Parioli, Roma
        </motion.p>

        {IS_PREVIEW && (
          <motion.p
            className="mt-10 text-[0.8125rem] text-muted"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
          >
            Proposta di sito web
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  )
}
