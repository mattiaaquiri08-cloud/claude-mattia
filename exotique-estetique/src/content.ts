import cabina from './assets/photo/real/cabina.webp'
import massaggi from './assets/photo/real/massaggi.webp'
import insegna from './assets/photo/real/insegna.webp'
import smalti from './assets/photo/real/smalti.webp'
import lavatesta from './assets/photo/real/lavatesta.webp'
import vetrina from './assets/photo/vetrina.webp'
import naomi from './assets/photo/real/naomi.webp'

/*
 * Tutti i contenuti del sito vivono qui.
 *
 * Regola: nessun dato commerciale inventato. Ogni campo indica la fonte.
 * I campi a `null` non sono verificabili e il sito li gestisce con uno stato
 * dedicato invece di mostrare dati falsi.
 *
 * Fonti consultate il 3 ottobre 2026:
 *  - Google Maps, scheda "Exotique & Estetique": valutazione 4,6 su 34 recensioni,
 *    telefono, orari, descrizione scritta dalla titolare, recensioni.
 *  - Treatwell, profili "exotique-estetique" ed "exotique-estetique-1": elenco dei
 *    servizi con durata, foto del centro e di Naomi, una recensione.
 *    Treatwell non mostra prezzi e i profili non accettano prenotazioni.
 */

export type Service = {
  name: string
  /** Prezzo in euro. null = non pubblicato (Treatwell non mostra prezzi). */
  price: number | null
  /** Durata in minuti, dal listino Treatwell. */
  duration: number | null
  from?: boolean
}

export type Category = {
  id: string
  title: string
  intro: string
  image: string
  imageAlt: string
  services: Service[]
}

export type Review = {
  author: string
  /** Estratto fedele del testo originale (i tagli sono segnati con "…"). */
  text: string
  source: 'Google' | 'Treatwell'
}

const s = (name: string, duration: number | null): Service => ({ name, duration, price: null })

export const business = {
  name: 'Exotique & Estetique',
  owner: 'Naomi',
  street: 'Via Giuseppe Calenzuoli, 3',
  postalCode: '00123',
  city: 'Roma',
  district: 'La Storta',
  // Google Maps
  mobile: { display: '388 090 3695', href: 'tel:+393880903695', whatsapp: 'https://wa.me/393880903695' },
  // Google Maps
  hours: [
    { days: 'Martedì - Sabato', time: '9:30 - 18:00' },
    { days: 'Domenica e lunedì', time: 'Chiuso' },
  ] as null | { days: string; time: string }[],
  // Google Maps
  rating: { value: 4.6, count: 34, source: 'Google' as const },
  // Treatwell: i profili non accettano prenotazioni online. Le CTA usano WhatsApp e telefono.
  treatwellBookingUrl: null as string | null,
  mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ0z_MP-9cLxMRyb_HBQZJnOE',
  reviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJ0z_MP-9cLxMRyb_HBQZJnOE',
  writeReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ0z_MP-9cLxMRyb_HBQZJnOE',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Exotique%20%26%20Estetique&destination_place_id=ChIJ0z_MP-9cLxMRyb_HBQZJnOE',
  facebookUrl: 'https://www.facebook.com/Exotique.Estetique/',
}

/* Listino: servizi e durate dal profilo Treatwell più recente ("exotique-estetique-1"). */
export const categories: Category[] = [
  {
    id: 'viso',
    title: 'Viso',
    intro: 'Pulizia, trattamenti antietà, couperose e acne: ogni trattamento parte da come sta la tua pelle oggi.',
    image: cabina,
    imageAlt: 'La cabina dei trattamenti, con lettino in legno e parete in pietra.',
    services: [
      s('Pulizia viso con massaggio', 60),
      s('Trattamento viso antirughe', 60),
      s('Trattamento couperose e macchie', 60),
      s("Trattamento viso all'acqua termale", 60),
      s('Trattamento viso antiacne', 60),
    ],
  },
  {
    id: 'corpo',
    title: 'Corpo e massaggi',
    intro: 'Dal massaggio firmato Exotique Estetique allo shiatsu, fino a scrub, fanghi e bendaggi.',
    image: massaggi,
    imageAlt: 'Il lettino da massaggio in una luce soffusa.',
    services: [
      s('Massaggio Exotique Estetique', 60),
      s('Massaggio rilassante', 60),
      s('Massaggio californiano', 60),
      s('Massaggio ayurvedico', 60),
      s('Massaggio shiatsu', 60),
      s('Massaggio tonificante', 60),
      s('Massaggio anticellulite', 60),
      s('Massaggio circolatorio', 60),
      s('Linfodrenaggio', 60),
      s('Massaggio gambe', 30),
      s('Massaggio schiena', 30),
      s('Scrub rinfrescante', 30),
      s('Scrub anticellulite', 30),
      s('Scrub antigonfiore', 30),
      s('Fanghi', 30),
      s('Bendaggi', 45),
    ],
  },
  {
    id: 'epilazione',
    title: 'Epilazione',
    intro: 'Laser a diodo per l’epilazione definitiva, uomo e donna, e ceretta per ogni zona.',
    image: insegna,
    imageAlt: "L'ingresso del centro in Via Calenzuoli, con l'insegna e la vetrina dedicata al laser a diodo.",
    services: [
      s('Epilazione laser', 15),
      s('Ceretta gamba intera', 30),
      s('Ceretta gamba intera e inguine', 45),
      s('Ceretta mezza gamba', 30),
      s('Ceretta inguine', 15),
      s('Ceretta inguine totale', 15),
      s('Ceretta top inguine', 15),
      s('Ceretta ascelle', 15),
      s('Ceretta braccia', 15),
      s('Ceretta glutei', 15),
      s('Ceretta labbro superiore', 15),
      s('Ceretta mento', 15),
      s('Ceretta sopracciglia', 15),
      s('Ceretta schiena uomo', 30),
      s('Ceretta petto uomo', 30),
    ],
  },
  {
    id: 'mani-piedi',
    title: 'Mani e piedi',
    intro: 'Manicure, semipermanente, ricostruzione in gel e acrilico, pedicure estetico e curativo.',
    image: smalti,
    imageAlt: 'La cartella colori degli smalti del centro.',
    services: [
      s('Manicure', 30),
      s('Manicure french', 30),
      s('Applicazione smalto', 15),
      s('Applicazione smalto french', 15),
      s('Smalto semipermanente', 60),
      s('Gel smalto color', 90),
      s('Gel smalto french', 90),
      s('Rinforzo gel unghie naturali', 90),
      s('Ricostruzione unghie gel tip e french', 90),
      s('Allungamento in gel', 90),
      s('Ritocco gel', 90),
      s('Ritocco con acrilico', 90),
      s('Ricostruzione unghia singola', 15),
      s('Rimozione gel', 15),
      s('Pedicure estetico', 45),
      s('Pedicure curativo', 60),
      s('Pedicure french', 60),
      s('Semipermanente piedi', 15),
      s('Ricostruzione unghie piedi', 60),
    ],
  },
  {
    id: 'sguardo',
    title: 'Sguardo e trucco',
    intro: 'Ciglia, sopracciglia e trucco per ogni occasione, fino al trucco sposa con tre prove.',
    image: vetrina,
    imageAlt: 'La vetrina dei prodotti del centro.',
    services: [
      s('Permanente ciglia', 60),
      s('Extension ciglia a ciuffetti', 90),
      s('Extension ciglia one to one', 90),
      s('Colore ciglia', 15),
      s('Colore sopracciglia', 15),
      s('Trucco giorno', 30),
      s('Trucco occhi', 30),
      s('Trucco sera', 45),
      s('Trucco antietà', 45),
      s('Trucco sposa con tre prove', 60),
      s('Trucco semipermanente sopracciglia', 180),
      s('Trucco semipermanente labbra', 120),
      s('Trucco permanente occhi', 90),
    ],
  },
  {
    id: 'capelli',
    title: 'Capelli',
    intro: 'Taglio, piega, colore e schiariture, trattamenti alla cheratina ed extension.',
    image: lavatesta,
    imageAlt: 'La postazione lavatesta del centro.',
    services: [
      s('Taglio', 60),
      s('Piega', 30),
      s('Piega con piastra', 30),
      s('Colore', 75),
      s('Bagno di colore', 75),
      s('Mèches', 120),
      s('Colpi di luce', 120),
      s('Shatush', 120),
      s('Degradè', 120),
      s('Decapage', 120),
      s('Permanente', 150),
      s('Lisciatura', 150),
      s('Tiraggio', 135),
      s('Trattamento cheratina', 75),
      s('Extension a ciocca', 60),
      s('Taglio uomo', 30),
    ],
  },
]

/* Recensioni reali: Google Maps (scheda del centro) e Treatwell. */
export const reviews: Review[] = [
  {
    author: 'Paola D.',
    source: 'Google',
    text: 'Ti senti a casa. Un luogo che infonde molta professionalità in un clima rilassante. Naomi sa come farti stare bene e come far bene il suo lavoro.',
  },
  {
    author: 'Elisa C.',
    source: 'Google',
    text: 'Naomi è davvero brava e professionale… ti mette da subito a tuo agio e ti fa sentire a casa. Ci si sente tra amiche.',
  },
  {
    author: 'Valeri D.',
    source: 'Google',
    text: 'Lei è la signora della bellezza, non c’è niente che non può fare… Quando vado nel suo negozio lei mi concede due ore tutte per me.',
  },
  {
    author: 'Monica C.',
    source: 'Google',
    text: 'Naomi brava e cordiale. Ha rimesso a nuovo i miei piedi.',
  },
  {
    author: 'Lorenza',
    source: 'Treatwell',
    text: 'Naomi è stata bravissima! Piega fantastica! Accoglienza meravigliosa! Tornerò presto!',
  },
]

/* Treatwell, foto del profilo. */
export const naomiPhoto: string | null = naomi

/* Dalla descrizione che Naomi ha scritto sulla scheda Google del centro. */
export const naomiQuote =
  'Credo che la bellezza sia un riflesso del benessere interiore ed esteriore.'
