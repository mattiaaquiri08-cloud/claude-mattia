import type { CSSProperties } from 'react'

/*
  Il sottotitolo del logo tondo ("—OSTERIA—" e "MODERNA TRADIZIONE") è testo vero in SVG, non immagine:
  ricavato dal logo piccolo veniva grosso e sfocato. Posizioni in percentuale del riquadro del logo.
*/
export const RIGHE_LOGO = [
  { testo: 'OSTERIA', top: 52.1, larghezza: 12.4, trattini: true },
  { testo: 'MODERNA TRADIZIONE', top: 56.4, larghezza: 37.3, trattini: false },
] as const

export type RigaLogo = (typeof RIGHE_LOGO)[number]

/** Riquadro (in % del logo) che contiene una riga del sottotitolo. */
export const rigaBox: CSSProperties = { position: 'absolute', left: '30%', width: '40%', height: '3.6%' }
