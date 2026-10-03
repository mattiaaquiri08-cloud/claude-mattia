import { createContext, useContext } from 'react'

/* true quando la splash è terminata: la hero parte solo allora. */
export const IntroContext = createContext(true)
export const useIntroDone = () => useContext(IntroContext)
