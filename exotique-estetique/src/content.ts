import cabina from './assets/photo/real/cabina.webp'
import naomiFoto from './assets/photo/real/naomi.webp'
import massaggi from './assets/photo/real/massaggi.webp'
import insegna from './assets/photo/real/insegna.webp'
import smalti from './assets/photo/real/smalti.webp'
import lavatesta from './assets/photo/real/lavatesta.webp'
import vetrina from './assets/photo/vetrina.webp'

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
 *    servizi con durata, foto del centro e di Naomi.
 *    Treatwell non mostra prezzi e i profili non accettano prenotazioni.
 *  - Listino cartaceo del centro (foto del 24 ottobre 2026): prezzi, durate dei
 *    trattamenti corpo, offerta laser, email; locandine in salone: BB Glow, OPI.
 */

export type Service = {
  name: string
  /** Prezzo in euro dal listino cartaceo. null = non indicato. */
  price: number | null
  /** Durata in minuti, solo dove il listino la riporta. */
  duration: number | null
  /** Prezzo "a partire da". */
  from?: boolean
  /** Testo al posto del prezzo (es. "dopo consulto gratuito"). */
  note?: string
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
  source: 'Google'
}

/* p(nome, prezzo, durata?, opzioni?) */
const p = (name: string, price: number | null, duration: number | null = null, extra: Partial<Service> = {}): Service => ({
  name,
  price,
  duration,
  ...extra,
})
const da = { from: true }

export const business = {
  name: 'Exotique & Estetique',
  owner: 'Naomi',
  street: 'Via Giuseppe Calenzuoli, 3',
  postalCode: '00123',
  city: 'Roma',
  district: 'La Storta',
  // Listino cartaceo
  directions: 'traversa di Via Valle della Storta, zona Cassia / Olgiata',
  email: 'exotiqueestetique.roma@yahoo.com',
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
  // Marchi professionali usati in salone, indicati dall'utente il 25/10/2026.
  brands: [
    { name: 'OPI', use: 'smalti' },
    { name: 'Clear System', use: 'tinta capelli' },
    { name: 'Sea of Life', use: 'prodotti del Mar Morto per viso e corpo' },
  ],
  // Profilo Instagram indicato dall'utente il 25/10/2026.
  instagramUrl: 'https://www.instagram.com/exotiqueestetique/' as string | null,
}

/* Listino: prezzi dal listino cartaceo del centro (ottobre 2026). */
export const categories: Category[] = [
  {
    id: 'viso',
    title: 'Viso',
    intro: 'Pulizia, trattamenti antietà, couperose e acne, e il BB Glow per una pelle radiosa e uniforme.',
    image: cabina,
    imageAlt: 'La cabina dei trattamenti, con lettino in legno e parete in pietra.',
    services: [
      p('Pulizia viso con massaggio', 55),
      p('Trattamento antirughe', 55),
      p('Trattamento couperose e macchie', 55),
      p('Trattamento acne', 60),
      p('BB Glow, seduta singola', 120),
      p('BB Glow in pacchetto, a seduta', 80),
    ],
  },
  {
    id: 'corpo',
    title: 'Corpo e massaggi',
    intro: 'Dal massaggio firmato Exotique Estetique allo shiatsu, fino a scrub, fanghi e bendaggi.',
    image: massaggi,
    imageAlt: 'Il lettino da massaggio in una luce soffusa.',
    services: [
      p('Massaggio Exotique Estetique', 95, 50),
      p('Massaggio rilassante', 80, 50),
      p('Massaggio tonificante', 85, 50),
      p('Massaggio anticellulite', 85, 50),
      p('Massaggio ayurvedico', 90, 50),
      p('Massaggio circolatorio', 85, 50),
      p('Linfodrenaggio', 90, 60),
      p('Shiatsu', 95, 60),
      p('Massaggio californiano', 95, 60),
      p('Massaggio gambe', 55, 30),
      p('Massaggio schiena', 55, 30),
      p('Scrub corpo: tonificante, anticellulite, antigonfiore', 45, 30),
      p('Fanghi: anticellulite, snellente minerale', 55, 30),
      p('Bendaggi: riducente, tonificante', 55, 40),
    ],
  },
  {
    id: 'epilazione',
    title: 'Epilazione',
    intro: 'Laser a diodo per uomo e donna, con valutazione di pelle e pelo e prima prova gratuita, e ceretta per ogni zona.',
    image: insegna,
    imageAlt: "L'ingresso del centro in Via Calenzuoli, con l'insegna e la vetrina dedicata al laser a diodo.",
    services: [
      p('Laser a diodo, a zona (offerta)', 14.9),
      p('Ceretta gamba intera e inguine', 38),
      p('Ceretta gamba intera', 30),
      p('Ceretta mezza gamba', 20),
      p('Ceretta inguine', 13),
      p('Ceretta top inguine', 18),
      p('Ceretta inguine totale', 21),
      p('Ceretta ascelle', 13),
      p('Ceretta braccia', 18),
      p('Ceretta glutei', 15),
      p('Ceretta labbro superiore', 7),
      p('Ceretta mento', 7),
      p('Ceretta petto uomo', 28),
      p('Ceretta schiena', 28),
    ],
  },
  {
    id: 'mani-piedi',
    title: 'Mani e piedi',
    intro: 'Manicure, semipermanente e ricostruzione con Original Gel American System e smalti OPI, pedicure estetico e curativo.',
    image: smalti,
    imageAlt: 'La cartella colori degli smalti del centro.',
    services: [
      p('Applicazione smalto', 10),
      p('Applicazione smalto french', 15),
      p('Manicure semplice', 18),
      p('French manicure', 20),
      p('Gel smalto semipermanente', 28),
      p('Ricostruzione unghie', 90),
      p('Ricostruzione di un\u2019unghia', 15),
      p('Riparazione di un\u2019unghia naturale', 20),
      p('Ritocco gel', 45),
      p('Ritocco con acrilico', 60),
      p('Ritocco acrilico french', 65),
      p('Pedicure estetico', 35),
      p('French pedicure', 40),
      p('Pedicure curativo', 45),
      p('Riparazione di un\u2019unghia naturale (piedi)', 20),
    ],
  },
  {
    id: 'sguardo',
    title: 'Sguardo e trucco',
    intro: 'Ciglia, sopracciglia e trucco per ogni occasione, fino al trucco sposa con tre prove e al trucco semipermanente.',
    image: vetrina,
    imageAlt: 'La vetrina dei prodotti del centro.',
    services: [
      p('Tintura sopracciglia', 18),
      p('Tintura ciglia', 23),
      p('Permanente ciglia', 55),
      p('Extension ciglia', 90),
      p('Ritocco ciglia', 60),
      p('Trucco occhi', 35),
      p('Trucco giorno', 45),
      p('Trucco sera', 60),
      p('Trucco antietà (pelle grassa, secca, impura)', 60),
      p('Trucco sposa con 3 prove', 460),
      p('Trucco semipermanente sopracciglia', 350, null, da),
      p('Trucco semipermanente occhi', 300, null, da),
      p('Trucco permanente labbra', 380, null, da),
    ],
  },
  {
    id: 'capelli',
    title: 'Capelli',
    intro: 'Taglio, piega, colore e schiariture, cheratina ed extension di ogni tipo, con consulto gratuito.',
    image: lavatesta,
    imageAlt: 'La postazione lavatesta del centro.',
    services: [
      p('Donna taglio', 38),
      p('Uomo taglio e shampoo', 25),
      p('Piega', 18, null, da),
      p('Colore', 38, null, da),
      p('Bagno di colore', 22, null, da),
      p('Mèches', 60, null, da),
      p('Colpi di luce', 55, null, da),
      p('Shatush', 55, null, da),
      p('Degradé', 60, null, da),
      p('Decapage', 60, null, da),
      p('Permanente', 55, null, da),
      p('Tiraggio', 60, null, da),
      p('Allisciatura', 60, null, da),
      p('Trattamento cheratina curativo', 65, null, da),
      p('Extension: cucitura, ciocca a ciocca, cheratina, treccine', null, null, { note: 'dopo consulto gratuito' }),
    ],
  },
]

/* In evidenza nel listino (listino cartaceo e locandine in salone). */
export const highlights = {
  laser: {
    title: 'Laser a diodo',
    price: 14.9,
    unit: 'a zona',
    points: ['Una prova gratuita', 'Sconto 20% per junior'],
    // Dal testo di Naomi (28/10/2026)
    intro:
      'Prima si valutano pelle e pelo, poi si decide il percorso più adatto. Con una macchina di qualità i primi cambiamenti si vedono già dalle prime sedute; i risultati variano da persona a persona.',
    quote: 'Ero scettica verso i macchinari: con questo laser ho cambiato idea.',
    caution:
      'In gravidanza, in allattamento e con alcune terapie o condizioni particolari il trattamento va valutato con attenzione, seguendo le indicazioni del medico e del produttore.',
  },
  bbGlow: {
    title: 'BB Glow',
    subtitle: 'Fondotinta semipermanente',
    // Indicati da Naomi (24/10/2026)
    prices: [
      { label: 'in pacchetto, a seduta', value: 80 },
      { label: 'seduta singola', value: 120 },
    ],
    points: ['Pelle radiosa', 'Tono uniforme', 'Idratazione profonda', 'Effetto antiage', 'Minimizza i pori', 'Correzione delle discromie'],
  },
}

/* Recensioni reali dalla scheda Google Maps del centro (scelta dell'utente: niente Treatwell). */
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
]

/* Foto di Naomi al lavoro con il laser, fornita dal centro il 25/10/2026. */
export const naomiPhoto: string | null = naomiFoto

/* Testi di Naomi, dal suo racconto inviato dall'utente il 28/10/2026 (riassunti, parole sue). */
export const naomiQuote = 'Questo per me non è solo un lavoro: è una passione che mi accompagna ogni giorno.'

export const naomiStory = [
  'Sono estetista e parrucchiera da quando avevo 16 anni: oltre trent\u2019anni di mestiere e tre attività a Roma, sempre con anima, cuore e tanta energia. Poi, per motivi familiari, mi sono trasferita a La Storta, dove continuo a fare il mio lavoro con lo stesso amore.',
  'Alcuni clienti mi chiamano \u201cNaomi con dieci mani\u201d, perché mi piace prendermi cura delle persone e dare sempre il massimo. Lavoro da sola per seguire ogni cliente con attenzione e dedicargli il tempo che merita.',
]

export const naomiValues = [
  { word: 'Sincerità', text: 'Ti dico sempre come stanno le cose, anche di no quando un trattamento non è adatto a te.' },
  { word: 'Su misura', text: 'Ogni pelle e ogni esigenza sono diverse: per questo ogni cliente ha il suo protocollo personalizzato.' },
  { word: 'Tempo', text: 'Niente trattamenti frettolosi o uguali per tutti: ascolto, esperienza e un rapporto che cresce giorno dopo giorno.' },
]
