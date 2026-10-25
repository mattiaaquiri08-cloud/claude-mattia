/*
 * Dati reali presi dal sito principale (../exotique-estetique/src/content.ts):
 * prezzi dal listino cartaceo, orari e recensioni da Google Maps.
 * Qui si aggiunge solo ciò che serve alla homepage, senza duplicare i dati.
 */
import { business, categories, highlights, naomiPhoto, naomiQuote, reviews } from '../../exotique-estetique/src/content'
import type { Category } from '../../exotique-estetique/src/content'

export { business, categories, highlights, naomiPhoto, naomiQuote, reviews }
export type { Category }

const euroInt = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const euroDec = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 })

/* 55 € oppure 14,90 € */
export const euro = (n: number) => (Number.isInteger(n) ? euroInt : euroDec).format(n)

/* Prezzo più basso di una categoria, per il "da …" delle card. */
export function fromPrice(c: Category) {
  const prices = c.services.map((s) => s.price).filter((p): p is number => p !== null)
  return prices.length ? Math.min(...prices) : null
}

export function duration(min: number) {
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h} h ${m} min` : `${h} h`
}

/* Messaggio WhatsApp già scritto per la prenotazione. */
export function whatsappLink(trattamento?: string) {
  const text = trattamento
    ? `Buongiorno, vorrei prenotare un appuntamento per: ${trattamento.toLowerCase()}.`
    : 'Buongiorno, vorrei prenotare un appuntamento.'
  return `${business.mobile.whatsapp}?text=${encodeURIComponent(text)}`
}
