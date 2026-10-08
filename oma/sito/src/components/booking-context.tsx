import { createContext, useContext } from 'react'

type BookingCtx = { openBooking: () => void }

export const BookingContext = createContext<BookingCtx>({ openBooking: () => {} })

export const useBooking = () => useContext(BookingContext)
