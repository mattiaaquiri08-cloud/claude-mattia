import { createContext, useContext } from 'react'

export type BookingApi = {
  open: (categoryId?: string) => void
  close: () => void
  isOpen: boolean
}

export const BookingContext = createContext<BookingApi | null>(null)

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking deve essere usato dentro BookingProvider')
  return ctx
}
