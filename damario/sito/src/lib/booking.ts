import { createContext, useContext } from 'react'

type BookingCtx = { openBooking: () => void }

export const BookingContext = createContext<BookingCtx>({ openBooking: () => {} })

export const useBooking = () => useContext(BookingContext)

/** Apre il menù su una portata precisa (usato dai tre pilastri). */
export const MENU_EVENT = 'damario:menu-tab'
export function openMenuTab(id: string) {
  window.dispatchEvent(new CustomEvent(MENU_EVENT, { detail: id }))
}
