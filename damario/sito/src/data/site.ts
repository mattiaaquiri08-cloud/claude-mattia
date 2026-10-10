/*
 * Tutti i contenuti del sito, in italiano e in inglese.
 * Per aggiornare menù, prezzi, orari, recensioni o foto si cambia solo questo file.
 *
 * Fonti (verificate il 10/10/2026):
 *  - Scheda Google Maps "Ristorante da Mario - di Valerio Palermo": indirizzo, telefono, orari,
 *    voto 4,7 su 491 recensioni, descrizione del ristorante, recensioni e risposte del titolare.
 *  - Menù pubblicato dal ristorante su TheFork (aggiornato al 5 gennaio 2026) e piatti indicati dal cliente.
 *  - Foto: hero fornite dal cliente; "sala" e "tartufo" pubblicate dal ristorante sulla sua scheda Google.
 */

export type Lang = 'it' | 'en'
export type T = { it: string; en: string }

/** Una fascia oraria: [apertura, chiusura] nel formato "HH:MM" */
export type Slot = [string, string]

export const SITE = {
  name: 'Ristorante da Mario',
  owner: 'Valerio Palermo',
  street: 'Via Silvio Spaventa 19',
  city: '00187 Roma RM',
  phoneDisplay: '+39 06 488 5042',
  phoneHref: 'tel:+39064885042',
  /*
   * Numero WhatsApp delle prenotazioni: solo cifre, con 39 davanti.
   * DA CONFERMARE CON IL RISTORANTE: per ora è il numero fisso del locale.
   */
  whatsapp: '39064885042',
  googlePlaceId: 'ChIJt0zZBghhLxMRNNjIUQBPTlM',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Ristorante%20da%20Mario%20di%20Valerio%20Palermo%2C%20Via%20Silvio%20Spaventa%2019%2C%20Roma&query_place_id=ChIJt0zZBghhLxMRNNjIUQBPTlM',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Ristorante%20da%20Mario%2C%20Via%20Silvio%20Spaventa%2019%2C%2000187%20Roma&destination_place_id=ChIJt0zZBghhLxMRNNjIUQBPTlM',
  mapEmbed: (lang: Lang) =>
    `https://maps.google.com/maps?q=Ristorante%20da%20Mario%20di%20Valerio%20Palermo%2C%20Via%20Silvio%20Spaventa%2019%2C%2000187%20Roma&z=16&hl=${lang}&output=embed`,
  googleReviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJt0zZBghhLxMRNNjIUQBPTlM',
  googleWriteReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJt0zZBghhLxMRNNjIUQBPTlM',
  tripadvisorUrl:
    'https://www.tripadvisor.it/Restaurant_Review-g187791-d3679862-Reviews-Ristorante_Da_Mario-Rome_Lazio.html',
  /* Profili social ufficiali: non verificati, quindi non mostrati. Inserire l'URL quando confermato. */
  instagramUrl: null as string | null,
  facebookUrl: null as string | null,
}

/** Orari per giorno della settimana (0 = domenica). Usati anche per gli orari prenotabili. */
export const HOURS: Slot[][] = [
  [],
  [['12:00', '15:00'], ['18:00', '23:30']],
  [['12:00', '15:00'], ['18:00', '23:30']],
  [['12:00', '15:00'], ['18:00', '23:30']],
  [['12:00', '15:00'], ['18:00', '23:30']],
  [['12:00', '15:00'], ['18:00', '23:30']],
  [['12:00', '15:00'], ['18:00', '23:30']],
]

export const DAY_NAMES: Record<Lang, string[]> = {
  it: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
}

export const RATING = { value: 4.7, count: 491, source: 'Google' }

/* ------------------------------------------------------------------ */
/* Menù                                                                */
/* ------------------------------------------------------------------ */

export type Dish = {
  /** Nome come sul menù del ristorante (resta in italiano anche nella versione inglese) */
  name: string
  /** Traduzione o spiegazione per gli ospiti stranieri */
  en: string
  /** Prezzo in euro; null = da chiedere in sala */
  price: number | null
  /** Testo del prezzo quando non è a porzione (es. all'etto) */
  priceNote?: T
  note?: T
}

export type Course = {
  id: string
  title: T
  /** Una riga di introduzione, solo per le portate che lo meritano */
  intro?: T
  /** BRACE, VINO, TARTUFO: le portate dei tre pilastri */
  pillar?: 'brace' | 'vino' | 'tartufo'
  dishes: Dish[]
}

export const MENU: Course[] = [
  {
    id: 'antipasti',
    title: { it: 'Antipasti', en: 'Starters' },
    dishes: [
      { name: 'Prosciutto al coltello', en: 'Hand-carved prosciutto', price: 14 },
      {
        name: 'Prosciutto al coltello con mozzarella di bufala o melone',
        en: 'Hand-carved prosciutto with buffalo mozzarella or melon',
        price: 15,
      },
      {
        name: 'Tartare di filetto di manzo alla francese',
        en: 'Beef fillet tartare, French style, assembled at your table',
        price: 18,
      },
      { name: 'Carpaccio di roast beef con salsa tonnata', en: 'Roast beef carpaccio with tuna sauce', price: 15 },
      { name: 'Moscardini alla luciana', en: 'Baby octopus stewed in tomato, Neapolitan style', price: 14 },
      { name: 'Parmigiana di melanzane', en: 'Baked aubergine parmigiana', price: 10 },
      { name: 'Insalata caprese', en: 'Tomato and mozzarella salad', price: 12 },
      { name: 'Caesar salad', en: 'Caesar salad', price: 10 },
    ],
  },
  {
    id: 'brace',
    pillar: 'brace',
    title: { it: 'La brace del forno Josper', en: 'From the Josper charcoal oven' },
    intro: {
      it: 'Il forno alimentato a carbone esalta la cottura alla brace e dà alla carne un gusto in più.',
      en: 'The charcoal-fired oven brings out the best of ember cooking and gives the meat that extra depth of flavour.',
    },
    dishes: [
      { name: 'Tagliata di manzo con rosmarino', en: 'Sliced beef steak with rosemary', price: 23 },
      { name: 'Lombata di vitella', en: 'Veal loin', price: 21 },
      { name: 'Galletto', en: 'Spring chicken', price: 18 },
      { name: 'Filetto di manzo', en: 'Beef fillet', price: 25 },
      { name: 'Entrecôte di manzo', en: 'Beef entrecôte', price: 24 },
      { name: 'Costata di manzo', en: 'Beef rib steak', price: 30 },
      {
        name: 'Fiorentina',
        en: 'T-bone steak, Florentine style',
        price: 6.5,
        priceNote: { it: "all'etto", en: 'per 100 g' },
        note: { it: 'Minimo 1 kg', en: 'Minimum 1 kg' },
      },
      {
        name: 'Chateaubriand con patate e verdure',
        en: 'Chateaubriand with potatoes and vegetables',
        price: 60,
        note: { it: 'Per due persone', en: 'For two' },
      },
    ],
  },
  {
    id: 'primi',
    title: { it: 'Primi della tradizione romana', en: 'Roman pasta classics' },
    dishes: [
      {
        name: 'Spaghetti alla carbonara',
        en: 'The Roman classic: guanciale, egg, pecorino romano and black pepper',
        price: 13,
      },
      { name: 'Rigatoni alla gricia', en: 'Guanciale, pecorino romano and black pepper', price: 13 },
      { name: 'Spaghetti cacio e pepe', en: 'Pecorino romano and black pepper', price: 13 },
      { name: "Rigatoni all'amatriciana", en: 'Guanciale, tomato and pecorino romano', price: 13 },
      { name: "Penne all'arrabbiata", en: 'Tomato sauce spiced with chilli', price: 11 },
      { name: "Fettuccine al ragù d'anatra", en: 'Fresh fettuccine with duck ragù', price: 15 },
      { name: 'Ravioli ricotta e spinaci', en: 'Ricotta and spinach ravioli', price: 15 },
      { name: 'Spaghetti ai tre pomodori', en: 'Spaghetti with three kinds of tomato', price: 11 },
    ],
  },
  {
    id: 'risotti',
    title: { it: 'Risotti e zuppe', en: 'Risotto and soups' },
    dishes: [
      { name: 'Risotto con tartufo nero', en: 'Risotto with black truffle', price: 20 },
      { name: 'Risotto bianco secondo stagionalità', en: 'Seasonal risotto', price: null },
      { name: 'La zuppa frantoiana', en: 'Tuscan-style vegetable and bean soup with olive oil', price: 12 },
    ],
  },
  {
    id: 'tartufo',
    pillar: 'tartufo',
    title: { it: 'Il tartufo fresco', en: 'Fresh truffle' },
    intro: {
      it: 'Un menù speciale dedicato al tartufo fresco.',
      en: 'A dedicated menu built around fresh truffle.',
    },
    dishes: [
      {
        name: 'Crostino con caciocavallo di Agnone e tartufo',
        en: 'Toasted bread with Agnone caciocavallo cheese and truffle',
        price: 16,
      },
      {
        name: 'Uova al tegamino con fonduta di pecorino romano e tartufo',
        en: 'Pan-fried eggs with pecorino romano fondue and truffle',
        price: 16,
      },
      {
        name: 'Fettuccine al tartufo nero con burro Beppino Occelli',
        en: 'Fettuccine with black truffle and Beppino Occelli butter',
        price: 20,
      },
      { name: 'Risotto con tartufo nero', en: 'Risotto with black truffle', price: 20 },
      { name: 'Filetto di manzo al tartufo nero', en: 'Beef fillet with black truffle', price: 30 },
    ],
  },
  {
    id: 'carne',
    title: { it: 'Secondi di carne', en: 'Meat mains' },
    dishes: [
      { name: 'Filetto di manzo al pepe verde', en: 'Beef fillet with green peppercorn sauce', price: 26 },
      {
        name: "Guancia di manzo brasata all'Amarone",
        en: 'Beef cheek braised in Amarone wine',
        price: 24,
      },
      { name: 'Lombata di vitella alla milanese', en: 'Breaded veal loin, Milanese style', price: 22 },
      { name: 'Coda alla vaccinara', en: 'Roman oxtail stew in tomato sauce', price: 18 },
    ],
  },
  {
    id: 'pesce',
    title: { it: 'Secondi di pesce', en: 'Fish mains' },
    dishes: [
      { name: 'Tentacoli di polpo alla brace', en: 'Charcoal-grilled octopus tentacles', price: 21 },
      { name: 'Pesce bianco alla brace', en: 'Charcoal-grilled white fish', price: 26 },
    ],
  },
  {
    id: 'contorni',
    title: { it: 'Contorni', en: 'Sides' },
    dishes: [
      { name: 'Patate al forno affumicate', en: 'Smoked roast potatoes', price: 6 },
      { name: 'Verdure saltate di stagione', en: 'Sautéed seasonal greens', price: 6 },
      { name: 'Verdure grigliate', en: 'Grilled vegetables', price: 6 },
      { name: 'Insalata mista', en: 'Mixed salad', price: 6 },
      { name: 'Rucola, pachino e parmigiano', en: 'Rocket, cherry tomatoes and parmesan', price: 7 },
    ],
  },
  {
    id: 'dolci',
    title: { it: 'Dolci', en: 'Desserts' },
    dishes: [
      { name: 'Tiramisù', en: 'Tiramisù', price: 7 },
      { name: 'Cannolo siciliano', en: 'Sicilian cannolo with ricotta', price: 7 },
      { name: 'Cheesecake al caramello salato', en: 'Salted caramel cheesecake', price: 7 },
      {
        name: 'Tartufo di Pizzo al cioccolato fondente o pistacchio',
        en: 'Pizzo ice-cream truffle, dark chocolate or pistachio',
        price: 7,
      },
      { name: 'Crème brûlée', en: 'Crème brûlée', price: 7 },
    ],
  },
  {
    id: 'bevande',
    title: { it: 'Bevande', en: 'Drinks' },
    dishes: [
      { name: 'Acqua', en: 'Water', price: 3 },
      { name: 'Birra 50 cl', en: 'Beer, 50 cl', price: 8 },
      { name: 'Soft drink e succhi', en: 'Soft drinks and juices', price: 4 },
      { name: 'Spremute', en: 'Freshly squeezed juice', price: 5 },
      { name: 'Aperitivo', en: 'Aperitivo', price: 10 },
      { name: 'Caffè', en: 'Espresso', price: 2 },
      { name: 'Caffè americano, cappuccino', en: 'Americano, cappuccino', price: 3 },
      { name: 'Tè e infusi', en: 'Tea and infusions', price: 4 },
      { name: 'Amari e grappe', en: 'Amari and grappa', price: 4 },
    ],
  },
  {
    id: 'vini',
    pillar: 'vino',
    title: { it: 'Vini', en: 'Wines' },
    intro: {
      it: 'Appassionati di vino e di olio, abbiamo selezionato oltre cento etichette. La carta completa vi aspetta al tavolo: chiedete pure un consiglio.',
      en: 'We love wine and olive oil, and have chosen over a hundred labels. The full wine list is waiting at your table, so feel free to ask for a suggestion.',
    },
    /* Le bottiglie si aggiungono qui quando il ristorante manda la carta dei vini. */
    dishes: [],
  },
]

/* ------------------------------------------------------------------ */
/* Recensioni (Google, testo originale; traduzione inglese segnalata)  */
/* ------------------------------------------------------------------ */

export type Review = {
  author: string
  badge?: T
  date: string
  rating: number
  it: string
  en: string
  reply?: string
}

export const REVIEWS: Review[] = [
  {
    author: 'Andrea Podetta',
    date: '2024-07-16',
    rating: 5,
    it: 'Esperienza magnifica, cibo a dir poco spettacolare così come il personale, preparato in tutto e per tutto e gentile a tal punto da farci sentire ospiti e non clienti!\nCarbonara e gricia eccezionali così come la tartare di manzo preparata davanti a noi in modo veramente professionale. Anche la cheesecake era veramente squisita!\nGrazie Valerio e Valerio, ci rivedremo sicuramente!',
    en: 'A magnificent experience. The food was nothing short of spectacular, and so were the staff: skilled in every respect, and so kind that they made us feel like guests rather than customers!\nThe carbonara and gricia were exceptional, as was the beef tartare, prepared in front of us in a truly professional way. The cheesecake was really delicious too!\nThank you Valerio and Valerio, we will definitely see you again!',
  },
  {
    author: 'Mara Cianci',
    date: '2026-03-29',
    rating: 5,
    it: 'Sono venuta in questo ristorante con mia figlia e ci siamo trovate benissimo. Cibo ottimo, porzioni abbondanti e servizio professionale. Il titolare e i camerieri simpatici e cortesi. Ottimo anche il rapporto qualità prezzo. Consigliamo!!',
    en: 'I came to this restaurant with my daughter and we had a wonderful time. Excellent food, generous portions and professional service. The owner and the waiters were friendly and courteous. Great value for money too. We recommend it!!',
  },
  {
    author: 'Federico Barone',
    badge: { it: 'Local Guide', en: 'Local Guide' },
    date: '2024-07-03',
    rating: 5,
    it: 'Mi sono recato da Mario per la prima volta e sono rimasto piacevolmente colpito dalla gestione del titolare, cordiale, professionale, efficiente. Abbiamo optato per piatti "turistici" come carbonara e amatriciana perché non li mangiavamo da un po\' e siamo rimasti felicissimi. Piatti bollenti, pasta al dente cotta a puntino, guanciale croccante, materia prima ottima.\nCi ha inoltre accolti con del pane caldo e dell\'ottimo extravergine d\'oliva.\nCaffè buono con cantuccio (credo ci fossero dei pezzettini di arancia) anche questo molto buono.\nCi tornerò sicuramente nelle pause essendo a pochi minuti dal luogo di lavoro.',
    en: 'I went to Da Mario for the first time and was pleasantly struck by the way the owner runs it: warm, professional, efficient. We chose "touristy" dishes like carbonara and amatriciana because we had not had them for a while, and we were delighted. Piping hot plates, pasta cooked perfectly al dente, crispy guanciale, excellent ingredients.\nHe also welcomed us with warm bread and excellent extra virgin olive oil.\nGood coffee with a cantuccio (I think it had little pieces of orange in it), also very good.\nI will definitely be back on my breaks, as it is a few minutes from where I work.',
    reply: 'Saremo al top ad ogni visita! Promesso!',
  },
  {
    author: 'Roberta Chiarotto',
    badge: { it: 'Local Guide', en: 'Local Guide' },
    date: '2026-03-14',
    rating: 5,
    it: 'Buon ristorante di cucina romana tipica. La prima sera scelto perché vicino al nostro albergo poi tornati nuovamente perché conquistati dalla qualità del cibo.\nAbbiamo notato che parecchi commensali erano locals e che vanno spesso.\nPersonale attento e professionale. Sicuramente da tornare per provare la carne alla griglia.\nForse la sala è un po’ rumorosa ma tantè siamo a Roma',
    en: 'A good restaurant serving typical Roman food. We picked it the first evening because it was close to our hotel, then came back again, won over by the quality of the food.\nWe noticed that quite a few diners were locals who come often.\nAttentive, professional staff. We will definitely return to try the grilled meat.\nThe room may be a little noisy, but then again, this is Rome.',
  },
  {
    author: 'Flo 37',
    date: '2024-06-25',
    rating: 5,
    it: 'Ristorante consigliatissimo. Posizione ottima, per una cena tranquilla lontano dal caos del centro città. Cibo delizioso, proprietario e camerieri molto simpatici e alla mano. Porzioni giuste e rapporto qualità prezzo ottima. Allego la foto del piatto spazzolato con molto gusto. Sicuramente ci ritornerò. Ristorante da salvare nei preferiti per quando si viene a Roma.',
    en: 'Highly recommended. A great location for a quiet dinner away from the chaos of the city centre. Delicious food; the owner and waiters are very friendly and down to earth. Fair portions and excellent value for money. I am attaching a photo of the plate, wiped clean with great pleasure. I will definitely be back. One to save in your favourites for when you come to Rome.',
    reply: 'A Roma siamo e qui ti aspettiamo! A presto!',
  },
]

/* ------------------------------------------------------------------ */
/* Galleria                                                            */
/* ------------------------------------------------------------------ */

export type Photo = {
  /** Nome base del file in public/img (es. "sala" per sala-1200.webp); null = foto da ricevere */
  base: string | null
  widths: number[]
  width: number
  height: number
  alt: T
  /** Per gli spazi ancora vuoti: cosa ci andrà */
  slot?: T
}

export const GALLERY: Photo[] = [
  {
    base: 'sala',
    widths: [700, 1200, 2000],
    width: 2000,
    height: 1333,
    alt: {
      it: 'La sala di Da Mario: boiserie in legno, tovaglie bianche e la parete delle bottiglie sotto la volta',
      en: 'The dining room at Da Mario: wood panelling, white tablecloths and the wall of wine bottles under the vault',
    },
  },
  {
    base: 'hero-mobile',
    widths: [640, 941],
    width: 941,
    height: 1672,
    alt: {
      it: 'L\'ingresso di Da Mario in Via Silvio Spaventa, con la tenda bianca e la porta a vetri',
      en: 'The entrance of Da Mario on Via Silvio Spaventa, with its white awning and glazed door',
    },
  },
  {
    base: 'tartufo',
    widths: [900, 1600],
    width: 1600,
    height: 1200,
    alt: { it: 'Tartufi neri freschi su un piatto bianco', en: 'Fresh black truffles on a white plate' },
  },
  {
    base: 'hero-desktop',
    widths: [800, 1280, 1672],
    width: 1672,
    height: 941,
    alt: {
      it: 'La sala apparecchiata alla luce delle candele, con le bottiglie esposte sotto l\'arco',
      en: 'The dining room set by candlelight, with bottles displayed under the arch',
    },
  },
  {
    base: null,
    widths: [],
    width: 1200,
    height: 1000,
    alt: { it: 'Spaghetti alla carbonara', en: 'Spaghetti alla carbonara' },
    slot: { it: 'La carbonara', en: 'The carbonara' },
  },
  {
    base: null,
    widths: [],
    width: 1600,
    height: 1000,
    alt: { it: 'Una costata dal forno Josper', en: 'A rib steak from the Josper oven' },
    slot: { it: 'La brace del Josper', en: 'The Josper grill' },
  },
  {
    base: null,
    widths: [],
    width: 1200,
    height: 1000,
    alt: { it: 'La tartare preparata al tavolo', en: 'Tartare prepared at the table' },
    slot: { it: 'La tartare al tavolo', en: 'Tartare at the table' },
  },
]

/** Ritratto di Valerio: null finché il cliente non manda la foto (file in public/img). */
export const VALERIO_PHOTO: { base: string; widths: number[]; width: number; height: number } | null = null

export const NEARBY = ['Stazione Termini', 'Via XX Settembre', 'Via Veneto', 'Piazza Barberini', 'Piazza Fiume', 'Piazza della Repubblica']
