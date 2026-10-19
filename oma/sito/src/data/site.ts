/*
  Tutti i contenuti del sito in un unico posto.
  Per cambiare menu, orari, numero o recensioni basta modificare questo file.
*/

export const SITE = {
  name: 'OMA Osteria Moderna',
  slogan: ['Mangi bene come da tu’ nonna.', 'Senza le domande de tu’ zia.'],
  address: 'Via Costantino Maes 78',
  city: '00162 Roma',
  phoneDisplay: '377 301 7230',
  phoneHref: 'tel:+393773017230',
  // Numero WhatsApp per le prenotazioni (prefisso internazionale, solo cifre)
  whatsapp: '393927641873',
  instagram: 'https://www.instagram.com/oma_osteriamoderna',
  instagramHandle: '@oma_osteriamoderna',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Oma+osteria+moderna+Via+Costantino+Maes+78+Roma',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Via+Costantino+Maes+78,+00162+Roma',
  mapEmbed: 'https://www.google.com/maps?q=Oma+osteria+moderna,+Via+Costantino+Maes+78,+00162+Roma&z=16&output=embed',
  priceRange: '20-30 € a persona',
  // Menu della settimana: lo stesso link del QR code al tavolo (il ristorante aggiorna lì il PDF)
  menuUrl: 'https://linktr.ee/omaosteriamoderna',
  // Foglio Google "OMA - Menu e orari del sito": menu, orari e avviso modificabili dal ristorante
  sheetId: '1omQ0g1XPfdXOwEmJykII2BDh1DOqi2_z0fcROg64AUk',
} as const

/* ---------- Testi del sito ----------
  Forniti dalla social media manager di OMA (Lilla Milli), in continuità con i loro social.
  Ogni voce è una macro-sezione del sito, nell'ordine in cui compare. Non riscriverli.
*/

export type Sezione = { id: string; nome: string; titolo: string; testo: string }

export const TESTI = {
  chiSiamo: {
    id: 'chi-siamo',
    nome: 'Chi siamo',
    titolo: 'Due teste diverse. Una stessa idea di cucina.',
    testo:
      'Siamo Alessio e Leonardo. OMA è la nostra Osteria Moderna: un posto dove la tradizione incontra tutto quello che ci piace mangiare, scoprire e sperimentare. Facciamo le cose a modo nostro. E ci mettiamo la faccia.',
  },
  food: {
    id: 'food',
    nome: 'Food',
    titolo: 'Una cucina povera. Di idee, mai.',
    testo:
      'La cucina di OMA è semplice, pura e autentica. Ingredienti buoni, zero sprechi e rispetto per la materia prima. Riscopriamo le ricette delle nostre nonne e le portiamo ai giorni nostri. Una cucina povera, vera e circolare, dove nulla si spreca e tutto si trasforma.',
  },
  mercato: {
    id: 'mercato',
    nome: 'Il mercato',
    titolo: 'Se non c’è, non c’è.',
    testo:
      'Ogni mattina il mercato decide. Noi seguiamo. Scegliamo le materie prime in base a quello che troviamo, non a quello che dobbiamo per forza avere in menù. Sulla qualità, invece, non trattiamo.',
  },
  menu: {
    id: 'menu',
    nome: 'Il menù',
    titolo: 'Il menù c’ha rotto er c***o.',
    testo:
      'Il menù cambia ogni settimana. A volte anche prima. Ci piace lavorare con quello che offre la stagione, cambiare idea, provare ricette nuove e rimettere mano a quelle che già conoscete. Se trovi un piatto che ti piace, goditelo. Non è detto che la prossima volta ci sia.',
  },
  piatti: {
    id: 'piatti',
    nome: 'I nostri piatti',
    titolo: 'Nonna approva. (Quasi sempre.)',
    testo:
      'Partiamo dai piatti con cui siamo cresciuti. Quelli delle nonne, delle domeniche in famiglia e delle pentole lasciate sul fuoco per ore. Poi ci mettiamo quello che abbiamo imparato viaggiando, assaggiando e sperimentando: tecniche nuove, abbinamenti diversi e qualche idea che a nonna forse non sarebbe venuta. La tradizione ci piace. Ma non significa fare sempre le stesse cose.',
  },
  aperitivo: {
    id: 'aperitivo',
    nome: 'L’aperitivo del sabato',
    titolo: 'Il sabato si fa sul serio. Ma non troppo.',
    testo:
      'Il sabato da OMA è tapas, calici e voglia di stare insieme. Piccoli piatti da condividere, qualcosa di buono da bere e un aperitivo che vogliamo diventi un appuntamento fisso per il Quartiere Africano. E pure per chi arriva da un po’ più lontano.',
  },
  vino: {
    id: 'wine',
    nome: 'Wine',
    titolo: 'Ci piace il vino. Di brutto.',
    testo:
      'La nostra carta dei vini non segue schemi tradizionali: niente classificazioni per stile, regione o gusto, ma una selezione in continua evoluzione. Ogni etichetta nasce da una scelta consapevole, fondata sul rispetto per i vignaioli, il loro lavoro e la storia che ogni bottiglia porta con sé.',
  },
  eventi: {
    id: 'eventi',
    nome: 'Gli eventi',
    titolo: 'Ogni tanto ci inventiamo qualcosa.',
    testo:
      'Degustazioni, serate speciali, collaborazioni con produttori e amici che condividono la nostra stessa passione per il cibo e il vino. Ci piace creare occasioni per incontrarsi, conoscersi e passare una bella serata. Senza troppe cerimonie. Non abbiamo un calendario sempre uguale: per sapere cosa bolle in pentola, seguici su Instagram. Magari la prossima volta ci sei pure tu.',
  },
} satisfies Record<string, Sezione>

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
