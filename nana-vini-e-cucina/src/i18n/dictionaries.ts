/*
  Testi del sito in italiano e inglese.
  La storia di Nanà è tratta dal menù ufficiale (che riporta già la versione inglese).
  Le recensioni sono citazioni autentiche: l'inglese è una traduzione dichiarata.
*/

export type Lang = "it" | "en";

export type Review = {
  quote: string;
  translation?: string;
  author: string;
  source: string;
  sourceUrl: string;
};

const it = {
  meta: {
    title: "Nanà Vini e Cucina | Cucina napoletana e romana a Fontana di Trevi, Roma",
    description:
      "Ristorante a pochi passi da Fontana di Trevi: le tradizioni napoletane e romane, piatti di pesce e di carne. Aperti tutti i giorni dalle 12:00 alle 23:00. Prenota su TheFork o allo 06 6919 0750.",
  },
  common: {
    newTab: "(si apre in una nuova scheda)",
  },
  nav: {
    skip: "Vai al contenuto",
    label: "Navigazione principale",
    home: "Nanà Vini e Cucina, torna all'inizio",
    kitchen: "La cucina",
    menu: "Menù",
    gallery: "Galleria",
    reviews: "Recensioni",
    visit: "Dove siamo",
    book: "Prenota",
    openMenu: "Apri il menù di navigazione",
    closeMenu: "Chiudi il menù di navigazione",
    langLabel: "Lingua del sito",
  },
  hero: {
    h1: "Nanà Vini e Cucina, cucina napoletana e romana a due passi da Fontana di Trevi, Roma",
    photoAlt: "L'ingresso di Nanà Vini e Cucina in Via della Panetteria: la tenda con il logo, i tavoli all'aperto e le piante",
    book: "Prenota un tavolo",
    where: "Dove siamo",
  },
  booking: {
    title: "Prenota un tavolo",
    intro: "Siamo aperti tutti i giorni, dalle 12:00 alle 23:00. Scegli come preferisci prenotare.",
    thefork: {
      title: "Prenota con TheFork",
      desc: "Scegli online giorno, orario e numero di persone.",
    },
    phone: {
      title: "Prenota telefonicamente",
    },
    note: "Allergie o intolleranze? Il menù con la lista degli allergeni è disponibile su richiesta.",
    close: "Chiudi",
    copy: "Copia il numero di telefono",
    copied: "Numero copiato negli appunti",
  },
  story: {
    statement: "La nostra cucina napoletana nel cuore di Roma.",
    title: "Nanà era venuta alla luce in una casa-cucina",
    paragraphs: [
      "Tende separavano la zona notte dalla zona giorno, che era appunto la cucina. In cucina si svolgeva la vita, sempre intorno allo stesso tavolo, per gioire o per soffrire.",
      "Da quella cucina Donna Amalia, la madre di Nanà, aveva cresciuto i suoi cinque figli. I suoi piatti “poveri”, chiusi da un altro piatto e stretti in un panno annodato, arrivavano agli operai che ricostruivano la Napoli del dopoguerra.",
      "Nanà non ebbe mai un ricettario: solo la vista, l'olfatto e l'udito, attraverso i quali la madre le aveva dettato il mestiere.",
    ],
    quote: "Gli insegnamenti, la cortesia e la generosità di Antonio Lombardi rivivono nei piatti e nell'atmosfera di Nanà.",
    quoteSource: "Dal menù di Nanà Vini e Cucina",
    photoRoomAlt: "La sala di Nanà, con il finestrone ad arco e la cucina a vista",
    photoDishAlt: "Un piatto di pasta appena uscito dalla cucina",
  },
  traditions: {
    title: "Due tradizioni, una tavola",
    intro: "Le paste della tradizione napoletana accanto ai grandi classici romani, a pochi passi da Fontana di Trevi.",
    napoli: { city: "Napoli", body: "Le ricette di casa, quelle che arrivano da Napoli." },
    roma: { city: "Roma", body: "I quattro classici della città che ci ospita." },
    napoliPhotoAlt: "Pasta al ragù servita su un piatto di ceramica a righe",
    romaPhotoAlt: "Pasta corta con crema d'uovo, guanciale e pecorino",
    cta: "Vedi nel menù",
  },
  menu: {
    title: "Il menù",
    intro: "La carta di Nanà, tra Napoli e Roma: dagli antipasti di mare ai dolci fatti in casa.",
    tabsLabel: "Categorie del menù",
    cover: "Pane e servizio",
    perPerson: "a persona",
    frozen: "Prodotto congelato",
    allergens: "È disponibile su richiesta il menù con la lista degli allergeni.",
    coldChain: "Alcuni ingredienti potrebbero aver ricevuto il ciclo del freddo secondo la loro stagionalità.",
    pdf: "Scarica il menù in PDF",
  },
  gallery: {
    title: "La sala, la cucina, la tavola",
    intro: "Ceramiche colorate, boiserie verde petrolio e una cucina a vista.",
    open: "Ingrandisci la foto",
    close: "Chiudi",
    prev: "Foto precedente",
    next: "Foto successiva",
    of: "di",
  },
  reviews: {
    title: "Dicono di noi",
    googleLabel: "su Google",
    reviewsWord: "recensioni",
    updated: "Dato verificato a ottobre 2026",
    readGoogle: "Leggi le recensioni su Google",
    readTheFork: "TheFork",
    readTripadvisor: "Tripadvisor",
    elsewhere: "Altre recensioni",
    translated: "",
    googleGuest: "Recensione Google",
    starsLabel: "4,6 stelle su 5",
  },
  visit: {
    title: "Dove siamo",
    lead: "In Via della Panetteria, nel centro storico, a pochi passi da Fontana di Trevi.",
    addressLabel: "Indirizzo",
    hoursLabel: "Orari",
    everyday: "Tutti i giorni",
    lunchDinner: "Pranzo e cena, orario continuato",
    openNow: "Aperto ora",
    closedNow: "Ora chiuso, riapriamo alle 12:00",
    phoneLabel: "Telefono",
    call: "Chiama",
    directions: "Indicazioni stradali",
    openMaps: "Apri in Google Maps",
    mapTitle: "Mappa di Nanà Vini e Cucina, Via della Panetteria 37, Roma",
    showMap: "Mostra la mappa",
    mapNote: "La mappa viene caricata da Google Maps, che può impostare cookie.",
    goodToKnow: "Buono a sapersi",
    services: [
      { icon: "wheelchair", text: "Accessibile in sedia a rotelle: ingresso, tavoli e bagno" },
      { icon: "sun", text: "Tavoli all'aperto, sotto la tenda" },
      { icon: "chef", text: "Cucina a vista" },
      { icon: "leaf", text: "Piatti vegetariani in carta" },
      { icon: "list", text: "Menù con gli allergeni su richiesta" },
      { icon: "card", text: "Pagamenti con carta" },
    ],
    social: "Seguici",
  },
  footer: {
    tagline: "Un pezzo di Napoli nel cuore di Roma.",
    explore: "Esplora",
    contacts: "Contatti",
    privacy: "Informativa privacy",
    photos: "Fotografie: archivio Nanà Vini e Cucina",
    rights: "Tutti i diritti riservati.",
    backTop: "Torna su",
  },
};

export type Dictionary = typeof it;

const en: Dictionary = {
  meta: {
    title: "Nanà Vini e Cucina | Neapolitan & Roman cooking by the Trevi Fountain, Rome",
    description:
      "Restaurant a short walk from the Trevi Fountain: Neapolitan and Roman traditions, seafood and meat dishes. Open every day from 12:00 to 23:00. Book on TheFork or call +39 06 6919 0750.",
  },
  common: {
    newTab: "(opens in a new tab)",
  },
  nav: {
    skip: "Skip to content",
    label: "Main navigation",
    home: "Nanà Vini e Cucina, back to top",
    kitchen: "Our kitchen",
    menu: "Menu",
    gallery: "Gallery",
    reviews: "Reviews",
    visit: "Find us",
    book: "Book",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    langLabel: "Site language",
  },
  hero: {
    h1: "Nanà Vini e Cucina, Neapolitan and Roman cooking a short walk from the Trevi Fountain, Rome",
    photoAlt: "The entrance of Nanà Vini e Cucina on Via della Panetteria: the awning with the logo, outdoor tables and plants",
    book: "Book a table",
    where: "Find us",
  },
  booking: {
    title: "Book a table",
    intro: "We are open every day, from 12:00 to 23:00. Choose how you would like to book.",
    thefork: {
      title: "Book with TheFork",
      desc: "Pick the day, time and party size online.",
    },
    phone: {
      title: "Book by phone",
    },
    note: "Allergies or intolerances? A menu listing allergens is available on request.",
    close: "Close",
    copy: "Copy phone number",
    copied: "Number copied to clipboard",
  },
  story: {
    statement: "Our Neapolitan cooking, in the heart of Rome.",
    title: "Nanà was born in a kitchen-house",
    paragraphs: [
      "Curtains separated the sleeping area from the living area, which was actually the kitchen. The kitchen was where life went on, always around the same table, the chosen place to celebrate and to suffer.",
      "From that kitchen Nanà's mother, Donna Amalia, raised her five children. Her “simple” dishes, covered with a second plate and wrapped in a tied cloth, also fed the workers busy rebuilding Naples after the war.",
      "There was never a recipe book: only what Nanà had seen, smelt and heard while her mother taught her the job.",
    ],
    quote: "The teachings, courtesy and generosity of Antonio Lombardi live again in the food and in the atmosphere of Nanà.",
    quoteSource: "From the Nanà Vini e Cucina menu",
    photoRoomAlt: "The dining room at Nanà, with its arched window and open kitchen",
    photoDishAlt: "A plate of pasta just out of the kitchen",
  },
  traditions: {
    title: "Two traditions, one table",
    intro: "Traditional Neapolitan pastas alongside the great Roman classics, a short walk from the Trevi Fountain.",
    napoli: { city: "Naples", body: "Home recipes, the ones that come from Naples." },
    roma: { city: "Rome", body: "The four classics of the city we call home." },
    napoliPhotoAlt: "Pasta with ragù on a striped ceramic plate",
    romaPhotoAlt: "Short pasta with egg cream, guanciale and pecorino",
    cta: "See in the menu",
  },
  menu: {
    title: "The menu",
    intro: "Nanà's menu, between Naples and Rome: from seafood starters to homemade desserts. Italian names, with English descriptions.",
    tabsLabel: "Menu categories",
    cover: "Bread and service",
    perPerson: "per person",
    frozen: "Frozen product",
    allergens: "A menu with allergen information is available on request.",
    coldChain: "Some ingredients may have been blast-chilled according to their seasonality.",
    pdf: "Download the menu (PDF)",
  },
  gallery: {
    title: "The room, the kitchen, the table",
    intro: "Colourful ceramics, petrol green woodwork and an open kitchen.",
    open: "Enlarge photo",
    close: "Close",
    prev: "Previous photo",
    next: "Next photo",
    of: "of",
  },
  reviews: {
    title: "What our guests say",
    googleLabel: "on Google",
    reviewsWord: "reviews",
    updated: "Figure checked in October 2026",
    readGoogle: "Read the reviews on Google",
    readTheFork: "TheFork",
    readTripadvisor: "Tripadvisor",
    elsewhere: "More reviews",
    translated: "Translated from Italian",
    googleGuest: "Google review",
    starsLabel: "4.6 out of 5 stars",
  },
  visit: {
    title: "Find us",
    lead: "On Via della Panetteria, in the historic centre, a short walk from the Trevi Fountain.",
    addressLabel: "Address",
    hoursLabel: "Opening hours",
    everyday: "Every day",
    lunchDinner: "Lunch and dinner, open all day",
    openNow: "Open now",
    closedNow: "Closed now, we reopen at 12:00",
    phoneLabel: "Phone",
    call: "Call",
    directions: "Get directions",
    openMaps: "Open in Google Maps",
    mapTitle: "Map of Nanà Vini e Cucina, Via della Panetteria 37, Rome",
    showMap: "Show the map",
    mapNote: "The map is loaded from Google Maps, which may set cookies.",
    goodToKnow: "Good to know",
    services: [
      { icon: "wheelchair", text: "Wheelchair accessible: entrance, seating and toilet" },
      { icon: "sun", text: "Outdoor tables under the awning" },
      { icon: "chef", text: "Open kitchen" },
      { icon: "leaf", text: "Vegetarian dishes on the menu" },
      { icon: "list", text: "Allergen menu available on request" },
      { icon: "card", text: "Card payments accepted" },
    ],
    social: "Follow us",
  },
  footer: {
    tagline: "A piece of Naples in the heart of Rome.",
    explore: "Explore",
    contacts: "Contact",
    privacy: "Privacy policy (Italian)",
    photos: "Photography: Nanà Vini e Cucina archive",
    rights: "All rights reserved.",
    backTop: "Back to top",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { it, en };

/* Recensioni autentiche. Fonti: recensioni TheFork riportate su aziende.virgilio.it/roma-rm/cahore
   ed estratti mostrati da Google Maps per la scheda del ristorante (verificati il 12/10/2026). */
export const REVIEWS: Review[] = [
  {
    quote: "Cibo ottimo in un ambiente tranquillo e rilassante. Personale attento e cordiale. Un vero angolo di Napoli in centro a Roma.",
    translation: "Excellent food in a calm, relaxing setting. Attentive, friendly staff. A true corner of Naples in the centre of Rome.",
    author: "Chiara C.",
    source: "TheFork",
    sourceUrl: "https://www.thefork.it/ristorante/nana-vini-e-cucina-r736495/recensioni",
  },
  {
    quote: "Cucina tradizionale napoletana davvero buonissima dagli antipasti ai dolci!",
    translation: "Truly delicious traditional Neapolitan cooking, from the starters to the desserts!",
    author: "",
    source: "Google",
    sourceUrl: "https://search.google.com/local/reviews?placeid=ChIJrS4WuKxhLxMR_Or65BVB8hQ",
  },
  {
    quote: "Abbiamo trovato cibi sia della tradizione romana e napoletana, essendo io romana e mio marito napoletano… Tutto ottimo, personale super gentile.",
    translation: "We found dishes from both the Roman and the Neapolitan tradition, as I am Roman and my husband is Neapolitan. Everything excellent, super kind staff.",
    author: "Giuliana L.",
    source: "TheFork",
    sourceUrl: "https://www.thefork.it/ristorante/nana-vini-e-cucina-r736495/recensioni",
  },
  {
    quote: "Pesce super buono, contorni come fatti in casa e gentilezza.",
    translation: "Superb fish, side dishes just like homemade, and kindness.",
    author: "",
    source: "Google",
    sourceUrl: "https://search.google.com/local/reviews?placeid=ChIJrS4WuKxhLxMR_Or65BVB8hQ",
  },
  {
    quote: "Abbiamo pranzato qui e ci siamo trovati davvero benissimo. Il posto è molto bello, curato e con un'atmosfera accogliente.",
    translation: "We had lunch here and had a really lovely time. The place is beautiful and well kept, with a welcoming atmosphere.",
    author: "Valentina V.",
    source: "TheFork",
    sourceUrl: "https://www.thefork.it/ristorante/nana-vini-e-cucina-r736495/recensioni",
  },
];
