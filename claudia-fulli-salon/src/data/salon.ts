// Dati reali e verificabili di Claudia Fulli Salon.
// Fonti (ottobre 2026):
// - Scheda Treatwell: https://www.treatwell.it/salone/claudia-fulli-salon/
//   (listino, durate, team, orari, servizi, pagamenti, mezzi pubblici, recensioni verificate)
// - Scheda Google Maps (telefono, orari, valutazione 5,0 su 20 recensioni, testi delle recensioni)
// Non aggiungere servizi, prezzi o recensioni che non compaiano in queste fonti.

export const salon = {
  name: 'Claudia Fulli Salon',
  owner: 'Claudia Fulli',
  street: 'Via Ruggero Fauro, 1',
  postalCode: '00197',
  city: 'Roma',
  district: 'Parioli',
  phoneDisplay: '06 807 8927',
  phoneHref: 'tel:+39068078927',
  bookingUrl: 'https://www.treatwell.it/salone/claudia-fulli-salon/',
  googleUrl:
    'https://www.google.com/maps/search/?api=1&query=Claudia+Fulli+Salon+Via+Ruggero+Fauro+1+Roma',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Claudia+Fulli+Salon,+Via+Ruggero+Fauro+1,+00197+Roma',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Claudia+Fulli+Salon,+Via+Ruggero+Fauro+1,+00197+Roma&z=16&output=embed',
  transport: 'A 2 minuti a piedi dalla fermata Parioli/Oxilia, autobus 52, 53 e 223.',
  payments: 'Contanti, carte di credito e di debito.',
  extras: ['Wi-Fi gratuito', 'Animali ammessi', 'Si parla italiano e inglese'],
  brands: ['Joico', 'Ref', 'Nevitaly'],
  ratings: {
    google: { score: '5,0', count: 20 },
    treatwell: { score: '4,8', count: 10 },
  },
} as const

/** 0 = domenica ... 6 = sabato, come Date.getDay(). null = chiuso. */
export const openingHours: { day: number; label: string; hours: [number, number] | null }[] = [
  { day: 1, label: 'Lunedì', hours: null },
  { day: 2, label: 'Martedì', hours: [10, 19] },
  { day: 3, label: 'Mercoledì', hours: [10, 19] },
  { day: 4, label: 'Giovedì', hours: [10, 19] },
  { day: 5, label: 'Venerdì', hours: [10, 19] },
  { day: 6, label: 'Sabato', hours: [10, 19] },
  { day: 0, label: 'Domenica', hours: null },
]

export type Service = {
  name: string
  duration: string
  price: string
  note?: string
}

export type ServiceGroup = {
  id: string
  title: string
  note?: string
  items: Service[]
}

// Listino pubblicato su Treatwell. Le fasce di prezzo sono quelle indicate dal salone.
export const serviceGroups: ServiceGroup[] = [
  {
    id: 'taglio-piega',
    title: 'Taglio e piega',
    items: [
      { name: 'Taglio', duration: '40 min', price: '€ 60' },
      { name: 'Piega', duration: '45 min', price: '€ 30' },
      { name: 'Piega elaborata', duration: '50 min', price: '€ 40' },
    ],
  },
  {
    id: 'colore',
    title: 'Colore',
    items: [
      { name: 'Colore', duration: '25 min', price: '€ 60' },
      { name: 'Colore in 10 minuti', duration: '15 min', price: '€ 70' },
      { name: 'Colore senza ammoniaca Ialu', duration: '50 min', price: '€ 65' },
      { name: 'Toner', duration: '30 min', price: '€ 30' },
    ],
  },
  {
    id: 'effetti-luce',
    title: 'Effetti luce',
    items: [
      { name: 'Hair contouring e toner', duration: '1 h 30 min', price: '€ 80-120' },
      { name: 'Schiariture totali', duration: '1 h', price: '€ 100-200' },
    ],
  },
  {
    id: 'trattamenti',
    title: 'Trattamenti',
    items: [
      {
        name: 'Trattamenti olistici per capelli e cute',
        duration: '45 min',
        price: '€ 25-40',
      },
      { name: 'Ricostruzione capelli luxury Help NB', duration: '45 min', price: '€ 130' },
      { name: 'Trattamento al collagene NB', duration: '1 h', price: '€ 70' },
      { name: 'Cheratina Biotrixx', duration: '40 min', price: '€ 200-250' },
    ],
  },
  {
    id: 'acconciature-trucco',
    title: 'Acconciature e trucco',
    note: 'Il trucco è eseguito da Claudia e dalla truccatrice del salone.',
    items: [
      { name: 'Acconciatura', duration: '45 min - 1 h', price: '€ 50-70' },
      { name: 'Acconciatura sposa', duration: '2 h', price: 'da € 50' },
      { name: 'Make-up', duration: '1 h', price: 'da € 60' },
      { name: 'Prova make-up', duration: '1 h', price: '€ 60' },
    ],
  },
]

export type Review = {
  quote: string
  author: string
  source: 'Google' | 'Treatwell'
}

// Testi riportati dalle recensioni pubbliche, accorciati dove serve senza cambiarne il senso.
export const reviews: Review[] = [
  {
    quote: 'La migliore in assoluto su Roma, mai avuto capelli più belli e sani.',
    author: 'Michela',
    source: 'Google',
  },
  {
    quote: 'Taglio sempre impeccabile, preciso e in linea con quello che desidero.',
    author: 'Gabriella',
    source: 'Treatwell',
  },
  {
    quote: 'Una vera professionista! Colore super e piega a onde pazzesca!',
    author: 'Alessandra G.',
    source: 'Google',
  },
  {
    quote: 'Claudia è attenta, capace e sa ascoltare le esigenze del cliente.',
    author: 'Marzia',
    source: 'Google',
  },
  {
    quote: 'I miei capelli da quando vado da lei sono cambiati!',
    author: 'Lidia M.',
    source: 'Google',
  },
  {
    quote: 'Salone super accogliente, colore e piega impeccabili, tornerò sicuramente!',
    author: 'Sara P.',
    source: 'Google',
  },
]

export const team = [
  {
    name: 'Claudia Fulli',
    role: 'Titolare',
    text: 'Taglio, colore, piega e trucco. Ascolta cosa desideri e ti consiglia il risultato giusto per te.',
    quote: { text: 'Gentile, disponibile e bravissima. La piega di Claudia era perfetta.', author: 'Rossella, Treatwell' },
  },
  {
    name: 'Lella',
    role: 'Collaboratrice',
    text: 'Segue piega e colore insieme a Claudia.',
    quote: { text: 'Bravissimi, colore e piega perfetti! Tornerò', author: 'Flaminia, Treatwell' },
  },
] as const

/** Punti della foto (in % della larghezza e altezza) mostrati nella visita del salone. */
export const tourStops = [
  {
    id: 'insieme',
    title: 'Il salone',
    text: 'Pareti bianche, luce naturale dalle finestre e faretti dalla luce calda.',
    focus: { x: 0.5, y: 0.5 },
    zoom: 1,
  },
  {
    id: 'poltrone',
    title: 'Le poltrone gialle',
    text: 'Il colore del salone, davanti agli specchi con la luce integrata.',
    focus: { x: 0.15, y: 0.66 },
    zoom: 1.75,
  },
  {
    id: 'postazioni',
    title: 'Quattro postazioni',
    text: 'Un unico piano in pietra chiara e specchi a tutta parete.',
    focus: { x: 0.48, y: 0.55 },
    zoom: 1.6,
  },
  {
    id: 'pavimento',
    title: 'Il pavimento nero',
    text: 'Una superficie lucida e venata che riflette la luce dei faretti.',
    focus: { x: 0.56, y: 0.84 },
    zoom: 1.7,
  },
  {
    id: 'finestre',
    title: 'Le sedute alla finestra',
    text: 'Cuscini ocra sotto le finestre, lo stesso tono delle poltrone.',
    focus: { x: 0.8, y: 0.52 },
    zoom: 1.8,
  },
] as const

export const navLinks = [
  { href: '#salone', label: 'Il salone' },
  { href: '#claudia', label: 'Claudia' },
  { href: '#servizi', label: 'Servizi' },
  { href: '#recensioni', label: 'Recensioni' },
  { href: '#contatti', label: 'Contatti' },
] as const
