export const EASE = [0.16, 1, 0.3, 1] as const
export const CURTAIN = [0.76, 0, 0.24, 1] as const

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/* Livelli z-index del sito */
export const Z = { nav: 40, bar: 40, sheet: 60, grain: 70 } as const
