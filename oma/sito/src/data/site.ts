/*
  Tutti i contenuti del sito in un unico posto.
  Per cambiare menu, orari, numero o recensioni basta modificare questo file.
*/

export const SITE = {
  name: 'OMA Osteria Moderna',
  slogan: ["Mangi bene come da tu' nonna.", "Senza le domande de tu' zia."],
  address: 'Via Costantino Maes 78',
  city: '00162 Roma',
  phoneDisplay: '377 301 7230',
  phoneHref: 'tel:+393773017230',
  // Numero WhatsApp per le prenotazioni (prefisso internazionale, solo cifre)
  whatsapp: '393773017230',
  instagram: 'https://www.instagram.com/oma_osteriamoderna',
  instagramHandle: '@oma_osteriamoderna',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Oma+osteria+moderna+Via+Costantino+Maes+78+Roma',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Via+Costantino+Maes+78,+00162+Roma',
  mapEmbed: 'https://www.google.com/maps?q=Oma+osteria+moderna,+Via+Costantino+Maes+78,+00162+Roma&z=16&output=embed',
  priceRange: '20-30 € a persona',
  // Foglio Google "OMA - Menu e orari del sito": menu, orari e avviso modificabili dal ristorante
  sheetId: '1omQ0g1XPfdXOwEmJykII2BDh1DOqi2_z0fcROg64AUk',
} as const

/* ---------- Orari (fonte: scheda Google) ---------- */

export type Slot = [open: string, close: string]

// Chiave = giorno della settimana JavaScript (0 domenica ... 6 sabato)
export const HOURS: Record<number, Slot[]> = {
  1: [['12:30', '15:00'], ['18:00', '22:30']],
  2: [['12:30', '15:00'], ['18:00', '22:30']],
  3: [],
  4: [['12:30', '15:30'], ['18:00', '23:00']],
  5: [['12:30', '15:30'], ['18:00', '23:30']],
  6: [['12:00', '15:00'], ['18:00', '23:30']],
  0: [['12:00', '15:00'], ['18:00', '23:00']],
}

export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]
export const DAY_NAMES = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']

/* ---------- Menu (fonte: menu ufficiale aggiornato + carta dei vini) ---------- */

export type Dish = {
  name: string
  detail?: string
  price: string
  pick?: boolean // piatto citato più spesso nelle recensioni
}

export type MenuSection = {
  id: string
  title: string
  intro: string
  groups: { title?: string; dishes: Dish[] }[]
}

export const MENU: MenuSection[] = [
  {
    id: 'antipasti',
    title: 'Antipasti',
    intro: 'Per cominciare, o per dividere al centro del tavolo.',
    groups: [
      {
        dishes: [
          { name: 'Polpette di pane', detail: 'Mayo alla menta', price: '11' },
          { name: 'Battuta di manzo', detail: 'Funghi finferli e fondo bruno', price: '14', pick: true },
          { name: 'Carpaccio di ricciola', detail: 'Chimichurri', price: '13' },
          { name: 'Roast beef tonnato', price: '13' },
          { name: 'Crostone', detail: 'Ricotta e scapece di zucchine', price: '11' },
          { name: 'Focaccia bianca', price: '2,5' },
        ],
      },
    ],
  },
  {
    id: 'primi',
    title: 'Primi',
    intro: 'La pasta come la faceva la nonna. Con qualche idea in più.',
    groups: [
      {
        dishes: [
          { name: 'Pacchero', detail: 'Ricciola, burro affumicato e polvere di pescatora', price: '15' },
          { name: 'Rigatone al ragù bolognese', price: '14' },
          { name: 'Fusilli', detail: "Pesto, 'nduja e bitter", price: '14' },
          { name: 'Spaghettone', detail: 'Zucca e guanciale', price: '13' },
        ],
      },
    ],
  },
  {
    id: 'secondi',
    title: 'Secondi',
    intro: 'Cotture lente, sughi veri e il burger di casa.',
    groups: [
      {
        dishes: [
          { name: 'Pollo alla cacciatora', price: '17' },
          { name: 'Pescato alla mugnaia', price: '18' },
          { name: 'Costine laccate alla soia', detail: 'Patate al forno', price: '16' },
          { name: 'Burger 180 g', detail: 'Bun artigianale, lattuga, pomodoro e salsa Oma. Con patate fritte', price: '15' },
        ],
      },
    ],
  },
  {
    id: 'contorni',
    title: 'Contorni',
    intro: 'Le verdure di stagione, trattate con rispetto.',
    groups: [
      {
        dishes: [
          { name: 'Patate fritte', price: '6' },
          { name: 'Finocchi gratinati', price: '6' },
          { name: 'Zucchine alla scapece', price: '6', pick: true },
        ],
      },
    ],
  },
  {
    id: 'dolci',
    title: 'Dolci',
    intro: 'Il finale, come a casa della nonna. Lasciate spazio.',
    groups: [
      {
        dishes: [
          { name: 'Tiramisù', price: '6', pick: true },
          { name: 'Crostatina della nonna', price: '6' },
          { name: 'Biscottino per sentirti meno in colpa', price: '6' },
        ],
      },
    ],
  },
  {
    id: 'vini',
    title: 'Vini',
    intro: 'Piccoli produttori, tanto Lazio e qualche fuga fuori regione. Prezzi a bottiglia, al calice dove indicato.',
    groups: [
      {
        title: 'Bianchi',
        dishes: [
          { name: 'La Torretta "Foglia"', detail: 'Trebbiano, Malvasia. Calice 6', price: '28' },
          { name: 'Nina Nunic "Ribolla Gialla"', detail: '100% Ribolla Gialla. Calice 7', price: '29' },
          { name: 'Icaro "Nemico"', detail: 'Trebbiano, Malvasia', price: '27' },
          { name: 'Tenuta Montemagno "Nymphae"', detail: 'Sauvignon Blanc, Timorasso', price: '30' },
          { name: 'Cataldi Madonna "Giulia"', detail: '100% Pecorino', price: '34' },
        ],
      },
      {
        title: 'Bollicine',
        dishes: [
          { name: 'Philippe Deval Crémant de Loire Brut', detail: 'Chardonnay, Chenin Blanc. 18 mesi sui lieviti', price: '27' },
          { name: 'Corte de Pieri "Il Dritto"', detail: 'Ancestrale, 100% Glera', price: '29' },
          { name: 'Nina Nunic Metodo Classico', detail: 'Ribolla Gialla, 60 mesi sui lieviti', price: '30' },
        ],
      },
      {
        title: 'Rossi',
        dishes: [
          { name: 'VinViandante "Primo Passo"', detail: '100% Cesanese. Calice 6', price: '27' },
          { name: 'Tenuta Montemagno "Violae"', detail: 'Barbera, Syrah. Calice 7', price: '28' },
          { name: 'Icaro "Operaio"', detail: 'Cesanese, Montepulciano, Sangiovese', price: '30' },
          { name: 'Vico "Areia"', detail: '100% Cesanese', price: '34' },
          { name: 'Montemagno "Invictus"', detail: 'Ruché di Castagnole Monferrato DOCG, vendemmia tardiva', price: '44' },
        ],
      },
      {
        title: 'Rosé',
        dishes: [
          { name: 'VinViandante "Confine"', detail: '100% Cesanese', price: '32' },
          { name: 'Icaro "Schicchera"', detail: '100% Cesanese', price: '38' },
          { name: 'Progetto Sete "Clandestino"', detail: '100% Sangiovese', price: '40' },
        ],
      },
    ],
  },
  {
    id: 'drink',
    title: 'Drink',
    intro: "Si comincia con l'aperitivo. E un bicchiere dopo cena non si nega a nessuno.",
    groups: [
      {
        title: 'Cocktail',
        dishes: [
          { name: 'Oma Spicy', detail: 'Tequila, sweet & sour, peperoncino, tonica al pompelmo', price: '8' },
          { name: 'Sage Paloma', detail: 'Gin alla salvia, sweet & sour, tonica al pompelmo', price: '8' },
          { name: 'Orange Tonic', detail: "Gin all'arancia, sweet & sour, tonica", price: '8' },
          { name: 'Aperol, Campari o Hugo Spritz', price: '8' },
          { name: 'Negroni', detail: 'Gin, Campari, vermouth', price: '9' },
          { name: 'Americano', detail: 'Campari, vermouth, soda', price: '9' },
          { name: 'Manhattan', detail: 'Whiskey rye, vermouth, angostura', price: '10' },
          { name: 'Gin tonic premium', price: '11' },
        ],
      },
      {
        title: 'Birre e altro',
        dishes: [
          { name: 'Peroni', price: '3,5' },
          { name: 'Bulldog o Paulaner', price: '4' },
          { name: 'Amaro della casa', price: '6' },
          { name: 'Acqua', price: '2,5' },
          { name: 'Caffè', price: '2' },
        ],
      },
    ],
  },
]

export const APERITIVO = {
  title: 'Formula aperitivo',
  detail: 'Un drink a scelta e un tagliere',
  price: '12',
  drinks: ['Oma Spicy', 'Negroni', 'Sage Paloma', 'Aperol Spritz', 'Orange Tonic', 'Americano', 'Hugo Spritz', 'Manhattan'],
}

/* ---------- Galleria ---------- */

export type Photo = {
  src: string
  alt: string
  width: number
  height: number
  // posizione nella griglia desktop (4 colonne) e mobile (2 colonne)
  area: string
}

export const GALLERY: Photo[] = [
  { src: './img/g-sala.webp', alt: 'La sala di OMA: pareti nere, luci ambra e sedie in velluto arancio', width: 1400, height: 787, area: 'col-span-2 md:row-span-2' },
  { src: './img/p-battuta.webp', alt: 'La battuta di manzo, condita al momento', width: 344, height: 412, area: 'row-span-2' },
  { src: './img/p-tiramisu.webp', alt: 'Il tiramisù servito in sala, accanto al calice di OMA', width: 344, height: 448, area: 'row-span-2' },
  { src: './img/p-rigatoni.webp', alt: 'Un piatto di rigatoni al sugo con formaggio grattugiato', width: 344, height: 448, area: 'row-span-2' },
  { src: './img/p-tavola.webp', alt: 'La tavola apparecchiata con i piatti della nonna: salumi, crostoni, polpette e battuta', width: 344, height: 420, area: 'col-span-2 md:row-span-2' },
  { src: './img/p-crudo.webp', alt: 'Un piatto di stagione servito nei piatti a fiori', width: 344, height: 448, area: 'row-span-2' },
]

/* ---------- Recensioni (fonte: Google Maps) ---------- */

export const RATINGS = [
  { source: 'Google', value: '4,7', scale: 'su 5', count: '144 recensioni' },
  { source: 'Tripadvisor', value: '5,0', scale: 'su 5', count: '' },
  { source: 'TheFork', value: '8,6', scale: 'su 10', count: '' },
]

export const REVIEW_TAGS = ['materie prime', 'tiramisù', 'passione', 'tradizione']

export type Review = { quote: string; author: string; meta: string }

export const REVIEWS: Review[] = [
  {
    quote: 'Il locale è moderno, accogliente, elegante e tutti i dettagli sono ben curati. Il cibo è pazzesco!',
    author: 'Valentina Amatulli',
    meta: 'Local Guide su Google',
  },
  {
    quote: 'I proprietari, Leonardo e Alessio, hanno davvero tanta passione per questo lavoro. Materie prime di qualità ottima, piatti equilibrati ed atmosfera rilassante.',
    author: 'Riccardo De Lellis',
    meta: 'Recensione su Google',
  },
  {
    quote: 'Locale piccolino e molto accogliente, con prezzi veramente ottimi. Consigliatissima la battuta di manzo, MERAVIGLIOSA.',
    author: 'Linda Allas',
    meta: 'Local Guide su Google',
  },
  {
    quote: 'Cuochi eccellenti e la magia di un menù romano con un tocco di raffinatezza!',
    author: 'Cliente di OMA',
    meta: 'Recensione su Google',
  },
  {
    quote: 'I proprietari sono gentilissimi e servono dei taglieri buonissimi.',
    author: 'Cliente di OMA',
    meta: 'Recensione su Google',
  },
]
