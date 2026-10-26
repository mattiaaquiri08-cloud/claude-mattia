import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

const PAINT = [0.65, 0, 0.35, 1] as const
const CURTAIN = [0.76, 0, 0.24, 1] as const
const HOLD_MS = 2150
const LOGO = './img/logo-tondo-urban.webp'

/**
 * Splash: il logo tondo di OMA (versione urban: ocra e avorio sul nero) si apre dal centro,
 * poi due sipari (avorio e ocra) si alzano e scoprono la sala della hero.
 */
export function Splash({ onReveal }: { onReveal: () => void }) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [ready, setReady] = useState(false)

  // Con "riduci movimento" niente splash: si entra subito nel sito
  useEffect(() => {
    if (reduce) onReveal()
  }, [reduce, onReveal])

  // Aspetta il logo (al massimo 1,2 s) per non animare un'immagine vuota
  useEffect(() => {
    if (reduce) return
    const img = new Image()
    const fallback = window.setTimeout(() => setReady(true), 1200)
    img.onload = () => {
      window.clearTimeout(fallback)
      setReady(true)
    }
    img.src = LOGO
    return () => window.clearTimeout(fallback)
  }, [reduce])

  useEffect(() => {
    if (!ready || reduce) return
    const t = window.setTimeout(() => {
      setVisible(false)
      onReveal()
    }, HOLD_MS)
    return () => window.clearTimeout(t)
  }, [ready, reduce, onReveal])

  // Niente scroll mentre la splash è a schermo
  useEffect(() => {
    if (!visible || reduce) return
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prev
    }
  }, [visible, reduce])

  return (
    <AnimatePresence>
      {visible && !reduce && (
        <motion.div key="splash" className="fixed inset-0 z-[90]" aria-hidden="true" exit={{ opacity: 1 }} transition={{ duration: 1.25 }}>
          {/* Sipario ocra: si alza per secondo */}
          <motion.div
            className="absolute inset-0 bg-ochre"
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.95, ease: CURTAIN, delay: 0.18 }}
          />

          {/* Sipario avorio con il logo tondo: si alza per primo */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-paper"
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.9, ease: CURTAIN }}
          >
            <motion.div
              className="pointer-events-none absolute top-1/2 left-1/2 size-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle, rgb(173 106 33 / 0.16), transparent 62%)' }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.div
              className="relative w-[min(72vw,60vh,420px)]"
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.6, ease: CURTAIN }}
            >
              {/* Il disco si apre dal centro mentre le onde ruotano al loro posto */}
              <motion.img
                src={LOGO}
                alt=""
                width={800}
                height={800}
                className="w-full"
                initial={{ clipPath: 'circle(0% at 50% 50%)', rotate: -40, scale: 0.86 }}
                animate={ready ? { clipPath: 'circle(50% at 50% 50%)', rotate: 0, scale: 1 } : {}}
                transition={{
                  clipPath: { duration: 1.05, ease: PAINT },
                  rotate: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
