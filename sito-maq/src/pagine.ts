// Tutte le pagine del sito. Ognuna diventa un file HTML già pronto per Google
// (vedi scripts/prerender.mjs), con il suo titolo, la sua descrizione e il suo indirizzo.

export type Domanda = { d: string; r: string };

type Base = {
  slug: string; // "" per la home
  titoloSeo: string; // la riga blu su Google (circa 60 caratteri)
  descrizione: string; // il testo grigio sotto (circa 155 caratteri)
  etichetta: string; // nome breve nei menu e nei link
};

export type PaginaHome = Base & { tipo: "home" };

export type PaginaSettore = Base & {
  tipo: "settore";
  pillola: string;
  h1: [string, string]; // seconda parte in sfumatura
  intro: string;
  titoloBisogni: string;
  bisogni: { titolo: string; testo: string }[];
  contenuti: string[];
  ricerche: string[]; // esempi di ricerche su Google
  testoGoogle: string;
  domande: Domanda[];
};

export type PaginaGuida = Base & {
  tipo: "guida";
  pillola: string;
  h1: [string, string];
  intro: string;
  pubblicata: string; // AAAA-MM-GG
  sezioni: { titolo: string; paragrafi?: string[]; elenco?: { titolo: string; testo: string }[] }[];
};

export type Pagina = PaginaHome | PaginaSettore | PaginaGuida;

const PREZZO: Domanda = {
  d: "Quanto costa?",
  r: "Indicativamente dai 390 ai 690 €: il prezzo esatto dipende dal preventivo, che cambia da attività ad attività. Prima vi mostro la bozza gratuita, poi decidiamo insieme. Se la bozza non vi piace, non pagate nulla.",
};

export const HOME: PaginaHome = {
  tipo: "home",
  slug: "",
  etichetta: "Home",
  titoloSeo: "Web designer a Roma · Siti web per attività | MAQ Web Design",
  descrizione:
    "Web designer a Roma: Mattia Aquiri realizza siti web su misura per ristoranti, saloni, palestre e attività locali. Bozza gratuita e senza impegno.",
};

export const RISTORANTI: PaginaSettore = {
  tipo: "settore",
  slug: "sito-web-ristoranti-roma",
  etichetta: "Siti per ristoranti",
  titoloSeo: "Sito web per ristoranti a Roma · Menù, foto e prenotazioni | MAQ",
  descrizione:
    "Siti web per ristoranti, pizzerie, trattorie e wine bar di Roma: menù dal telefono, foto, prenotazioni e Google. Bozza gratuita e senza impegno.",
  pillola: "Siti web per ristoranti a Roma",
  h1: ["Un sito web per il vostro ristorante, ", "che porta clienti a tavola"],
  intro:
    "Quando qualcuno cerca «ristorante Trastevere» o «pizzeria Prati», sceglie in pochi secondi guardando foto, menù e recensioni. Realizzo siti web per ristoranti, pizzerie, trattorie, wine bar e bistrot di Roma: chiari, veloci dal telefono e pensati per farvi trovare su Google.",
  titoloBisogni: "Cosa guarda un cliente prima di prenotare",
  bisogni: [
    {
      titolo: "Il menù, sempre aggiornato",
      testo: "Il menù leggibile dal telefono, con piatti e prezzi. Niente PDF sgranati o foto storte della lavagna.",
    },
    {
      titolo: "Le foto vere del locale",
      testo: "La sala, i piatti, il dehors: chi vi cerca vuole capire dove andrà a sedersi e cosa mangerà.",
    },
    {
      titolo: "Prenotare in un attimo",
      testo: "Un tasto per chiamare, scrivere su WhatsApp o prenotare con l’app che usate già.",
    },
    {
      titolo: "Dove siete e quando siete aperti",
      testo: "Indirizzo, mappa, orari e giorno di chiusura, senza doverli cercare altrove.",
    },
  ],
  contenuti: [
    "Menù digitale, comodo da leggere dal telefono",
    "Galleria di foto del locale e dei piatti",
    "La storia del locale, dello chef e del titolare",
    "Prenotazioni con telefono, WhatsApp o la vostra app",
    "Mappa, orari e indicazioni per arrivare",
    "Collegamento a Google, Instagram, TripAdvisor e TheFork",
    "Versione in inglese per i turisti, se vi serve",
  ],
  ricerche: ["ristorante Testaccio", "pizzeria Monti", "wine bar centro storico", "trattoria romana Prati"],
  testoGoogle:
    "A Roma si cerca quasi sempre per zona. Scrivo i testi del sito pensando proprio a queste ricerche, lo collego alla vostra scheda Google e lo rendo veloce dal telefono: così è più facile che chi cerca trovi voi, e non il locale accanto.",
  domande: [
    {
      d: "Ho già TheFork e TripAdvisor: mi serve anche un sito?",
      r: "Sì, perché lì siete uno tra tanti, accanto ai locali concorrenti. Il sito è solo vostro: racconta la vostra cucina e porta le prenotazioni direttamente a voi. Lo colleghiamo comunque alle piattaforme che usate.",
    },
    {
      d: "Come si aggiorna il menù?",
      r: "Mi mandate le modifiche e aggiorno io il sito, oppure prevediamo un menù che potete cambiare voi in modo semplice.",
    },
    {
      d: "Fate anche il sito in inglese?",
      r: "Sì: se avete molti clienti turisti possiamo aggiungere la versione in inglese.",
    },
    PREZZO,
  ],
};

export const SALONI: PaginaSettore = {
  tipo: "settore",
  slug: "sito-web-parrucchieri-centri-estetici-roma",
  etichetta: "Siti per parrucchieri ed estetica",
  titoloSeo: "Sito web per parrucchieri e centri estetici a Roma | MAQ",
  descrizione:
    "Siti web per parrucchieri, barbieri, centri estetici e nail bar di Roma: foto dei lavori, listino, prenotazioni online. Bozza gratuita e senza impegno.",
  pillola: "Siti web per saloni ed estetica a Roma",
  h1: ["Un sito per il vostro salone, ", "bello come il vostro lavoro"],
  intro:
    "Chi cerca «parrucchiere Monteverde» o «centro estetico EUR» vuole vedere i lavori, i trattamenti e i prezzi prima di prenotare. Realizzo siti web per parrucchieri, barber shop, centri estetici, nail bar e centri benessere di Roma.",
  titoloBisogni: "Cosa guarda una cliente prima di prenotare",
  bisogni: [
    {
      titolo: "I vostri lavori in foto",
      testo: "Tagli, colori, unghie, trattamenti: una galleria curata racconta il vostro stile meglio di qualsiasi parola.",
    },
    {
      titolo: "Servizi e prezzi chiari",
      testo: "L’elenco dei trattamenti con durata e prezzo indicativo: meno domande al telefono, più prenotazioni.",
    },
    {
      titolo: "Prenotare senza chiamare",
      testo: "Il collegamento a Treatwell, Fresha o all’agenda che usate già, oppure un messaggio WhatsApp con un tocco.",
    },
    {
      titolo: "Chi c’è dietro il salone",
      testo: "Il titolare e lo staff, la loro formazione e il loro stile: le persone scelgono le persone.",
    },
  ],
  contenuti: [
    "Galleria dei vostri lavori",
    "Listino di servizi e trattamenti",
    "Prenotazione online collegata alla vostra app",
    "Pagina dedicata al titolare e allo staff",
    "Link alle vostre recensioni Google",
    "Mappa, orari e contatti",
    "Collegamento a Instagram e TikTok",
  ],
  ricerche: ["barbiere San Giovanni", "nail bar Prati", "estetista Tuscolano", "parrucchiere Monteverde"],
  testoGoogle:
    "Chi cerca un salone lo fa quasi sempre vicino a casa o al lavoro. Scrivo i testi del sito sui vostri servizi e sulla vostra zona, lo collego alla scheda Google e lo rendo perfetto dal telefono: così è più facile che chi cerca trovi voi.",
  domande: [
    {
      d: "Uso già Treatwell o Fresha: a cosa serve il sito?",
      r: "Sulle app siete in mezzo agli altri saloni della zona. Sul sito ci siete solo voi, con il vostro stile; il tasto «Prenota» può comunque portare alla vostra agenda sull’app.",
    },
    {
      d: "Posso usare le foto di Instagram?",
      r: "Certo: usiamo le vostre foto migliori e colleghiamo il profilo, così chi vi scopre sul sito vi segue anche lì.",
    },
    {
      d: "Devo scrivere io i testi?",
      r: "No. Mi raccontate la vostra storia e i vostri servizi, i testi li scrivo io e li sistemiamo insieme.",
    },
    PREZZO,
  ],
};

export const PALESTRE: PaginaSettore = {
  tipo: "settore",
  slug: "sito-web-palestre-roma",
  etichetta: "Siti per palestre e studi",
  titoloSeo: "Sito web per palestre, pilates e padel a Roma | MAQ Web Design",
  descrizione:
    "Siti web per palestre, studi di pilates e yoga, box e circoli di padel di Roma: corsi, orari, abbonamenti e prenotazioni. Bozza gratuita e senza impegno.",
  pillola: "Siti web per palestre e studi a Roma",
  h1: ["Un sito per la vostra palestra, ", "che riempie i corsi"],
  intro:
    "Chi cerca «palestra Tuscolano», «pilates Parioli» o «padel Roma nord» confronta corsi, orari e prezzi prima ancora di venire a provare. Realizzo siti web per palestre, studi di pilates e yoga, box di functional, centri sportivi e circoli di padel di Roma.",
  titoloBisogni: "Cosa guarda chi sta per iscriversi",
  bisogni: [
    {
      titolo: "Corsi e orari sempre chiari",
      testo: "Il calendario delle lezioni leggibile dal telefono, senza dover scrivere in chat per ogni informazione.",
    },
    {
      titolo: "Abbonamenti e lezione di prova",
      testo: "Le formule, cosa è incluso e, se la offrite, come prenotare una lezione di prova.",
    },
    {
      titolo: "Gli istruttori",
      testo: "Chi sono, cosa insegnano, la loro esperienza: è la prima cosa che crea fiducia.",
    },
    {
      titolo: "Gli spazi",
      testo: "Sala pesi, sale corsi, campi, spogliatoi: le foto vere convincono più di qualsiasi slogan.",
    },
  ],
  contenuti: [
    "Calendario di corsi e orari",
    "Pagina abbonamenti",
    "Richiesta della lezione di prova con WhatsApp o modulo",
    "Pagina dedicata a titolare e istruttori",
    "Galleria degli spazi",
    "Collegamento alla vostra app di prenotazione",
    "Mappa, parcheggio e come arrivare",
  ],
  ricerche: ["palestra Tuscolano", "pilates Parioli", "padel Roma nord", "yoga Pigneto"],
  testoGoogle:
    "Chi cerca una palestra la vuole vicina a casa o al lavoro. Scrivo i testi del sito sui vostri corsi e sulla vostra zona, lo collego alla scheda Google e lo rendo veloce dal telefono: così è più facile che chi cerca trovi voi.",
  domande: [
    {
      d: "Usiamo già un’app per le prenotazioni: va bene?",
      r: "Sì, il sito la affianca: presenta la palestra e porta le persone all’app che usate già.",
    },
    {
      d: "Possiamo cambiare orari e corsi?",
      r: "Sì: mi mandate le modifiche e aggiorno io il sito, oppure prevediamo una parte che potete modificare voi.",
    },
    {
      d: "Il sito ci aiuta a trovare nuovi iscritti?",
      r: "Aiuta chi vi cerca in zona a trovarvi e a capire subito cosa offrite. Nessuno può garantire il primo posto su Google, ma un sito fatto bene e collegato alla scheda Google vi rende molto più facili da scegliere.",
    },
    PREZZO,
  ],
};

export const GUIDA_COSTI: PaginaGuida = {
  tipo: "guida",
  slug: "quanto-costa-un-sito-web",
  etichetta: "Quanto costa un sito web",
  titoloSeo: "Quanto costa un sito web a Roma? Guida per le attività | MAQ",
  descrizione:
    "Quanto costa un sito web per un’attività a Roma: con MAQ indicativamente dai 390 ai 690 €. Da cosa dipende il prezzo, i costi fissi e cosa chiedere prima di firmare.",
  pillola: "Guida",
  h1: ["Quanto costa un sito web ", "per la vostra attività?"],
  intro:
    "È la prima domanda che mi fanno. La risposta onesta è: dipende da cosa vi serve. Qui vi spiego da cosa dipende il prezzo, quali costi mettere in conto ogni anno e cosa chiedere prima di firmare, così potete confrontare le offerte con tranquillità.",
  pubblicata: "2026-10-16",
  sezioni: [
    {
      titolo: "Quanto costa con me",
      paragrafi: [
        "Un sito web realizzato da me costa indicativamente dai 390 ai 690 €. Il prezzo esatto dipende dal preventivo, che cambia da attività ad attività: un sito di una pagina per una bottega non è come un sito con menù, galleria e prenotazioni per un ristorante.",
        "In ogni caso vedete prima la bozza gratuita: il preventivo lo facciamo insieme solo dopo, se vi piace.",
      ],
    },
    {
      titolo: "Da cosa dipende il prezzo",
      paragrafi: [
        "Sul mercato si trovano prezzi molto diversi, da poche centinaia a diverse migliaia di euro. La differenza la fanno queste voci:",
      ],
      elenco: [
        { titolo: "Quante pagine e sezioni", testo: "Un sito di una pagina sola costa meno di uno con menù, servizi, galleria e blog." },
        { titolo: "Testi e foto", testo: "Se li avete già si risparmia; se vanno scritti o scattati, è lavoro in più." },
        {
          titolo: "Funzioni particolari",
          testo: "Prenotazioni, menù aggiornabile da voi, più lingue, negozio online: ognuna aggiunge tempo e costo.",
        },
        { titolo: "Grafica su misura o modello", testo: "Un modello già pronto costa meno, ma il vostro sito somiglierà a tanti altri." },
        {
          titolo: "Pensato per Google",
          testo: "Testi scritti per le ricerche della vostra zona, collegamento alla scheda Google, velocità dal telefono.",
        },
      ],
    },
    {
      titolo: "I costi di ogni anno",
      paragrafi: [
        "Oltre alla realizzazione, un sito ha qualche costo fisso. Il dominio (il nome, per esempio vostraattivita.it) costa in genere poche decine di euro l’anno. Lo spazio dove il sito è ospitato (hosting), per un sito vetrina, va da piani gratuiti a pochi euro al mese.",
        "Ci sono poi voci facoltative: l’email con il vostro dominio e la manutenzione, cioè aggiornamenti e modifiche nel tempo. Chiedete sempre se sono comprese e quanto costano.",
      ],
    },
    {
      titolo: "Fai da te o web designer?",
      paragrafi: [
        "Con Wix, WordPress e simili potete fare un sito da soli, pagando un abbonamento. Il costo vero però è il tempo: scegliere il modello, scrivere i testi, sistemare le foto, capire come farsi trovare su Google.",
        "Un web designer fa tutto questo per voi e vi consegna un sito pensato per la vostra attività e per i vostri clienti. Voi continuate a fare il vostro lavoro.",
      ],
    },
    {
      titolo: "Cosa chiedere prima di firmare",
      elenco: [
        { titolo: "Il dominio è intestato a voi?", testo: "Deve esserlo: è il vostro indirizzo su internet." },
        { titolo: "Il sito resta vostro?", testo: "Chiedete cosa succede se un giorno smettete di pagare la manutenzione." },
        { titolo: "Ci sono costi annuali?", testo: "Fatevi dire per iscritto quanto pagherete ogni anno, oltre alla realizzazione." },
        { titolo: "Posso vedere qualcosa prima?", testo: "Una bozza o un esempio vi evita brutte sorprese." },
      ],
    },
    {
      titolo: "Come lavoro io",
      paragrafi: [
        "Prima vi preparo una bozza gratuita del vostro sito e ve la mostro su Zoom o di persona. Se vi piace, vi faccio un preventivo chiaro, indicativamente tra 390 e 690 €, in base a ciò che vi serve davvero. Se non vi piace, non pagate nulla.",
      ],
    },
  ],
};

export const PAGINE: Pagina[] = [HOME, RISTORANTI, SALONI, PALESTRE, GUIDA_COSTI];

export function trovaPagina(slug: string): Pagina {
  return PAGINE.find((p) => p.slug === slug) ?? HOME;
}
