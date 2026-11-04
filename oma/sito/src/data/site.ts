/*
  Tutti i contenuti del sito in un unico posto.
  Per cambiare orari, lavagna, avviso, foto o numeri basta modificare questo file.
*/

export const SITE = {
  name: 'OMA Osteria Moderna',
  // Dati legali dalla visura camerale (footer e informativa privacy)
  ragioneSociale: 'OMA S.R.L.',
  sedeLegale: 'Via Costantino Maes 74-80, 00162 Roma',
  piva: '18018171001',
  rea: 'RM-1756118',
  capitaleSociale: '5.000,00 € i.v.',
  pec: 'oma@pecimprese.it',
  // Firma in fondo al footer
  realizzatoDa: { nome: 'MAQ Web Design', url: 'https://maqwebdesign.com' },
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

/* ---------- Foto delle sezioni (shooting di ottobre 2026) ----------
  Tre o più foto per sezione, mostrate una alla volta in una galleria che scorre (con una sola foto è un'immagine fissa).
  File in public/img, tagliati 4:5 (1080×1350). Per cambiarle basta sostituire src e alt.
*/

export type FotoSezione = { src: string; alt: string }

export const FOTO_SEZIONI: Record<string, FotoSezione[]> = {
  'chi-siamo': [
    { src: './img/s-chi-siamo-1.webp', alt: 'Alessio e Leonardo in sala, uno abbraccia l’altro da dietro' },
    { src: './img/s-chi-siamo-4.webp', alt: 'Alessio e Leonardo in cucina con la nonna che pulisce il pesce' },
    { src: './img/s-chi-siamo-2.webp', alt: 'I titolari in cucina, uno lancia una zucca al volo' },
    { src: './img/s-chi-siamo-3.webp', alt: 'Lo chef al tagliere mentre prepara la battuta di manzo' },
  ],
  food: [
    { src: './img/s-food-1.webp', alt: 'Lo chef condisce le fette di zucca sulla teglia' },
    { src: './img/s-food-2.webp', alt: 'Pomodorini che saltano in padella con il vapore' },
    { src: './img/s-food-3.webp', alt: 'Rigatoni alla zucca saltati in padella' },
  ],
  mercato: [
    { src: './img/s-mercato-1.webp', alt: 'Una cassetta piena di verdure di stagione appena arrivate' },
    { src: './img/s-mercato-2.webp', alt: 'Un taglio intero di manzo tenuto in mano dallo chef' },
    { src: './img/s-mercato-3.webp', alt: 'Finferli, uva, cavolo nero e zucca' },
  ],
  menu: [
    { src: './img/s-menu-1.webp', alt: 'Una cliente sorride a tavola con più piatti e un calice di rosso' },
    { src: './img/s-menu-2.webp', alt: 'Zucca al forno con salsa verde e formaggio grattugiato al momento' },
    { src: './img/s-menu-3.webp', alt: 'Pollo arrosto con le carote, tagliato a tavola nel piatto a fiori' },
  ],
  piatti: [
    { src: './img/s-piatti-5.webp', alt: 'La nonna a tavola, sorridente, con un piatto e un calice di bianco' },
    { src: './img/s-piatti-1.webp', alt: 'Battuta di manzo con finferli nel piatto antico' },
    { src: './img/s-piatti-4.webp', alt: 'La nonna tira la sfoglia di pasta fresca con la macchinetta' },
    { src: './img/s-piatti-2.webp', alt: 'Rigatoni verdi al cavolo nero con pomodorini' },
    { src: './img/s-piatti-3.webp', alt: 'Gnocchi con funghi e formaggio grattugiato al momento' },
  ],
  aperitivo: [
    { src: './img/s-aperitivo-4.webp', alt: 'Un tagliere di salumi, formaggi e chips di pane con un calice di rosso' },
    { src: './img/s-aperitivo-1.webp', alt: 'Mani che prendono i crostini con le alici, bottiglie sullo sfondo' },
    { src: './img/s-aperitivo-2.webp', alt: 'Un vassoio di crostini con burro e alici' },
    { src: './img/s-aperitivo-3.webp', alt: 'L’alice posata con la pinza sul crostino' },
  ],
  wine: [
    { src: './img/s-wine-1.webp', alt: 'Una bottiglia offerta al tavolo, il titolare sorride dietro' },
    { src: './img/s-wine-2.webp', alt: 'Tre bottiglie I Ca Ro che brindano' },
    { src: './img/s-wine-3.webp', alt: 'Una bottiglia di Montepulciano tenuta in mano' },
  ],
}

// Video della sezione Eventi (verticale 9:16, muto, senza i secondi con una bambina): al posto delle foto
export const VIDEO_EVENTI = {
  src: './video/eventi.mp4',
  poster: './img/eventi-video-poster.webp',
  label: 'Video di una serata da OMA: la cucina al lavoro, i piatti e gli ospiti a tavola',
}

/* ---------- Lavagna: ferie, chiusure, promozioni, eventi ----------
  Si mostrano solo le voci non ancora passate. Ferie e chiusure bloccano anche quei giorni (o solo il
  turno indicato) nel modulo di prenotazione. Date AAAA-MM-GG: "al" si omette per un giorno solo,
  "dal" si omette per una voce sempre valida (es. una promozione fissa), da togliere quando finisce.
  OMA scrive a Mattia, che aggiorna queste voci.
*/

export type TipoLavagna = 'ferie' | 'chiuso' | 'promo' | 'evento' | 'avviso'
export type Turno = 'pranzo' | 'cena'
export type VoceLavagna = {
  dal?: string
  al?: string
  turno?: Turno
  // per le voci senza data: quando vale (es. "dal lunedì al venerdì a pranzo"); se manca si usa il turno
  quando?: string
  tipo: TipoLavagna
  testo: string
}

export const LAVAGNA: VoceLavagna[] = [
  { quando: 'dal lunedì al venerdì a pranzo', turno: 'pranzo', tipo: 'promo', testo: 'Un primo, acqua e caffè a 12\u00a0€.' },
  { quando: 'tutti i giorni tranne il mercoledì, dalle 18:30', tipo: 'promo', testo: 'Aperitivo: tagliere + drink a 12\u00a0€.' },
]

/* ---------- Avviso e orari ----------
  AVVISO: una riga che compare in cima al sito (es. "Chiusi per ferie fino al 6 gennaio"); vuota = nessun avviso.
  Se cambiano gli orari, aggiornare anche il JSON-LD in index.html (lo legge Google).
*/

export const AVVISO = ''


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
