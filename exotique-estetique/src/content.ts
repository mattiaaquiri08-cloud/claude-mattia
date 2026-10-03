import vetrina from './assets/photo/vetrina.webp'
import orologio from './assets/photo/orologio.webp'
import poltrona from './assets/photo/poltrona.webp'
import unghie from './assets/photo/unghie.webp'
import casco from './assets/photo/casco.webp'

/*
 * Tutti i contenuti del sito vivono qui.
 *
 * Regola: nessun dato commerciale inventato. Ogni campo indica la fonte.
 * I campi impostati a `null` (o le liste vuote) non sono stati verificabili
 * e il sito li gestisce con uno stato dedicato invece di mostrare dati falsi.
 *
 * Fonti consultate (ottobre 2026):
 *  - Treatwell, profilo "Exotique & Estetique" (indirizzo, descrizione, servizi,
 *    prenotazioni online non attive)
 *  - Directory pubbliche (Fresha, mybestshops, PagineGialle): numeri di telefono
 *    -> DA CONFERMARE con la titolare prima della pubblicazione.
 */

export type Service = {
  name: string
  /** Prezzo in euro come da listino Treatwell. null = non verificato. */
  price: number | null
  /** Durata in minuti come da listino Treatwell. null = non verificata. */
  duration: number | null
  /** Indica un prezzo "a partire da". */
  from?: boolean
}

export type Category = {
  id: string
  title: string
  /** Testo editoriale breve, senza claim tecnici. */
  intro: string
  image: string
  imageAlt: string
  services: Service[]
}

export type Review = {
  author: string
  /** Testo originale, accorciato al massimo a tre righe. */
  text: string
  rating: number
  source: 'Google' | 'Treatwell'
  date: string
}

export const business = {
  name: 'Exotique & Estetique',
  owner: 'Naomi',
  // Treatwell
  street: 'Via Giuseppe Calenzuoli, 3',
  postalCode: '00123',
  city: 'Roma',
  district: 'La Storta',
  // Directory pubbliche: da confermare con la titolare.
  phone: { display: '06 3089 1368', href: 'tel:+390630891368' },
  mobile: { display: '388 090 3695', href: 'tel:+393880903695', whatsapp: 'https://wa.me/393880903695' },
  // Orari non verificabili da fonte primaria: il sito invita a contattare il centro.
  hours: null as null | { days: string; time: string }[],
  // Treatwell: "al momento non accetta prenotazioni" online. Le CTA usano telefono e WhatsApp.
  treatwellBookingUrl: null as string | null,
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Exotique%20%26%20Estetique%2C%20Via%20Giuseppe%20Calenzuoli%203%2C%2000123%20Roma',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Via%20Giuseppe%20Calenzuoli%203%2C%2000123%20Roma',
  facebookUrl: 'https://www.facebook.com/Exotique.Estetique/',
  treatwellUrl: 'https://www.treatwell.it/salone/exotique-estetique/',
}

/*
 * Categorie e servizi come elencati su Treatwell:
 * trattamenti viso e corpo, pulizia viso, massaggi, depilazione con cera,
 * manicure, pedicure, taglio, piega e colore.
 * Prezzi e durate: da inserire dal listino Treatwell (pagina non raggiungibile
 * dall'ambiente di sviluppo al momento della stesura).
 */
export const categories: Category[] = [
  {
    id: 'viso',
    title: 'Viso',
    intro: 'Pelle pulita, luminosa, rispettata. Ogni trattamento parte da come sta la tua pelle oggi.',
    image: vetrina,
    imageAlt: 'La vetrina dei prodotti del centro, con creme, sieri e smalti.',
    services: [
      { name: 'Pulizia viso', price: null, duration: null },
      { name: 'Trattamenti viso', price: null, duration: null },
    ],
  },
  {
    id: 'corpo',
    title: 'Corpo e massaggi',
    intro: 'Un tempo che è soltanto tuo. Trattamenti corpo e massaggi per rimettere in pausa il resto.',
    image: orologio,
    imageAlt: "L'orologio a parete del centro sopra la porta in legno.",
    services: [
      { name: 'Trattamenti corpo', price: null, duration: null },
      { name: 'Massaggi', price: null, duration: null },
    ],
  },
  {
    id: 'depilazione',
    title: 'Depilazione',
    intro: 'Ceretta eseguita con calma e precisione, in un ambiente riservato.',
    image: poltrona,
    imageAlt: 'Una poltrona in pelle nera davanti agli specchi del centro.',
    services: [{ name: 'Depilazione con cera', price: null, duration: null }],
  },
  {
    id: 'mani-piedi',
    title: 'Mani e piedi',
    intro: 'La postazione unghie, la lampada, la palette di smalti. Il dettaglio che si nota.',
    image: unghie,
    imageAlt: 'La postazione unghie con cassettiera rossa, lampada e scaffale di smalti.',
    services: [
      { name: 'Manicure', price: null, duration: null },
      { name: 'Pedicure', price: null, duration: null },
    ],
  },
  {
    id: 'capelli',
    title: 'Capelli',
    intro: 'Taglio, piega e colore nello stesso spazio in cui ti prendi cura di tutto il resto.',
    image: casco,
    imageAlt: 'Il casco a parete per i trattamenti capelli.',
    services: [
      { name: 'Taglio', price: null, duration: null },
      { name: 'Piega', price: null, duration: null },
      { name: 'Colore', price: null, duration: null },
    ],
  },
]

/*
 * Recensioni reali da Google Maps / Treatwell.
 * Lasciare vuoto finché non sono copiate dalla fonte: il sito mostra allora
 * un invito a leggere e lasciare recensioni sul profilo Google.
 */
export const reviews: Review[] = []

export const rating: null | { value: number; count: number; source: 'Google' | 'Treatwell' } = null

/* Foto di Naomi da Treatwell: da inserire quando disponibile (src/assets/photo/naomi.webp). */
export const naomiPhoto: string | null = null
