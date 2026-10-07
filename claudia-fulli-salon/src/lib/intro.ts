import { createContext, useContext } from 'react'

/** Vero quando la schermata d'apertura ha finito: le animazioni d'ingresso partono da qui. */
export const IntroContext = createContext(true)

export function useIntroDone() {
  return useContext(IntroContext)
}
