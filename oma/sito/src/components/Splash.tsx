import { AnimatePresence, motion, useReducedMotion, type TargetAndTransition, type Transition } from 'motion/react'
import { useEffect, useState } from 'react'
import { LOGO_PEZZI, type PezzoLogo } from '../data/logo-pezzi'
import { RIGHE_LOGO, rigaBox } from '../data/logo-sottotitolo'
import { RigaSottotitolo } from './LogoTondo'

const CURTAIN = [0.76, 0, 0.24, 1] as const
const OUT = [0.16, 1, 0.3, 1] as const
// pezzi montati in ~1,3 s, poi il logo completo resta ~1,2 s per leggere la scritta
const HOLD_MS = 2450

// Quando parte ogni gruppo di pezzi (secondi) e quanto aspetta tra un pezzo e il successivo
const TEMPI = {
  disco: { start: 0, step: 0 },
  onda: { start: 0.1, step: 0.09 },
  perla: { start: 0.5, step: 0.04 },
  lettera: { start: 0.65, step: 0.07 },
  riga: { start: 0.9, step: 0.08 },
} as const

/** Come entra ogni pezzo: il disco si apre, le onde girano al loro posto, le perle saltano fuori, le lettere si stampano. */
function montaggio(p: PezzoLogo, i: number) {
  const n = LOGO_PEZZI.slice(0, i).filter((q) => q.tipo === p.tipo).length
  const delay = TEMPI[p.tipo].start + TEMPI[p.tipo].step * n
  // le onde ruotano attorno al centro del logo, non al proprio
  const centro = `${((50 - p.x) / p.w) * 100}% ${((50 - p.y) / p.h) * 100}%`
  let from: TargetAndTransition
  const to: TargetAndTransition = { opacity: 1, scale: 1, rotate: 0 }
  let transition: Transition
  let origin = '50% 50%'
  switch (p.tipo) {
    case 'disco':
      from = { opacity: 0, scale: 0.35, rotate: -25 }
      transition = { duration: 0.4, ease: OUT, delay }
      break
    case 'onda':
      origin = centro
      from = { opacity: 0, scale: 0.72, rotate: -75 }
      transition = { duration: 0.5, ease: OUT, delay }
      break
    case 'perla':
      from = { opacity: 0, scale: 0 }
      transition = { type: 'spring', stiffness: 640, damping: 18, delay }
      break
    case 'lettera':
      from = { opacity: 0, scale: 1.9 }
      transition = { duration: 0.24, ease: [0.3, 1.4, 0.5, 1], delay }
      break
  }
  return { from, to, transition, origin }
}

/**
 * Splash: il logo tondo di OMA (versione urban) si monta un pezzo alla volta: disco, onde, perle,
 * lettere e sottotitolo. Poi due sipari (avorio e ocra) si alzano e scoprono la sala della hero.
 */
export function Splash({ onReveal }: { onReveal: () => void }) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [ready, setReady] = useState(false)

  // Con "riduci movimento" niente splash: si entra subito nel sito
  useEffect(() => {
    if (reduce) onReveal()
  }, [reduce, onReveal])

  // Aspetta tutti i pezzi del logo (al massimo 1,2 s) per non montare immagini vuote
  useEffect(() => {
    if (reduce) return
    let done = false
    const go = () => {
      if (!done) setReady(true)
      done = true
    }
    const fallback = window.setTimeout(go, 1200)
    Promise.all(
      LOGO_PEZZI.map(
        (p) =>
          new Promise<void>((res) => {
            const img = new Image()
            img.onload = img.onerror = () => res()
            img.src = p.src
          }),
      ),
    ).then(go)
    return () => {
      done = true
      window.clearTimeout(fallback)
    }
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
        <motion.div key="splash" className="fixed inset-0 z-[90]" aria-hidden="true" exit={{ opacity: 1 }} transition={{ duration: 1 }}>
          {/* Sipario ocra: si alza per secondo */}
          <motion.div
            className="absolute inset-0 bg-ochre"
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.8, ease: CURTAIN, delay: 0.14 }}
          />

          {/* Sipario avorio con il logo tondo: si alza per primo */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-paper"
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.75, ease: CURTAIN }}
          >
            <motion.div
              className="pointer-events-none absolute top-1/2 left-1/2 size-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle, rgb(173 106 33 / 0.16), transparent 62%)' }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.div
              className="relative aspect-square w-[min(72vw,60vh,420px)]"
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.6, ease: CURTAIN }}
            >
              {LOGO_PEZZI.map((p, i) => {
                const anim = montaggio(p, i)
                return (
                  <motion.img
                    key={p.src}
                    src={p.src}
                    alt=""
                    draggable={false}
                    className="absolute max-w-none select-none"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      width: `${p.w}%`,
                      height: `${p.h}%`,
                      transformOrigin: anim.origin,
                    }}
                    initial={anim.from}
                    animate={ready ? anim.to : {}}
                    transition={anim.transition}
                  />
                )
              })}
              {/* Il sottotitolo si scrive da sinistra a destra, in testo vero (nitido) */}
              {RIGHE_LOGO.map((r, i) => (
                <motion.div
                  key={r.testo}
                  style={{ ...rigaBox, top: `${r.top}%` }}
                  initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
                  animate={ready ? { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' } : {}}
                  transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1], delay: TEMPI.riga.start + TEMPI.riga.step * i }}
                >
                  <RigaSottotitolo riga={r} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
