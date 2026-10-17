// Dati dimostrativi, usati solo finché il foglio Google non è collegato.
// Sono piatti citati dalla stampa (Gambero Rosso, The Foodzilla, Puntarella Rossa) come esempi
// della cucina: non sono il menù della settimana e non hanno prezzi, che arrivano dal foglio.
// Stesse colonne del foglio vero, così il percorso dei dati è identico.

import type { Riga } from "./fogli";

const piatto = (categoria: string, categoria_en: string, nome: string, nome_en: string, ordine: number): Riga => ({
  categoria,
  categoria_en,
  piatto: nome,
  piatto_en: nome_en,
  descrizione: "",
  descrizione_en: "",
  prezzo: "",
  disponibile: "sì",
  ordine: String(ordine),
});

export const MENU_DEMO: Riga[] = [
  piatto("Antipasti", "Starters", "Alici fritte", "Fried anchovies", 1),
  piatto("Antipasti", "Starters", "Moscardini alla Luciana", "Baby octopus alla Luciana", 2),
  piatto("Antipasti", "Starters", "Totanetti alla cacciatora", "Baby squid alla cacciatora", 3),
  piatto("Antipasti", "Starters", "Cocktail di gamberi", "Prawn cocktail", 4),
  piatto("Antipasti", "Starters", "Cuori di mare con pane caldo", "Cockles with warm bread", 5),
  piatto("Primi", "Pasta", "Linguine cacio, pepe e cozze", "Linguine with cacio, pepper and mussels", 6),
  piatto("Primi", "Pasta", "Paccheri con genovese di tonno", "Paccheri with tuna genovese", 7),
  piatto("Primi", "Pasta", "Spaghetto alle vongole veraci", "Spaghetti with clams", 8),
  piatto("Secondi", "Mains", "Seppie con piselli", "Cuttlefish with peas", 9),
  piatto("Secondi", "Mains", "Frittura di paranza", "Fried paranza (small mixed fish)", 10),
  piatto("Secondi", "Mains", "Pesce fresco del giorno", "Fresh fish of the day", 11),
];

// fasce di prezzo per portata riportate da Gambero Rosso (gennaio 2026), solo per la demo
export const FASCE_DEMO: Record<string, string> = {
  Antipasti: "8-10 €",
  Starters: "€8-10",
  Primi: "fino a 14 €",
  Pasta: "up to €14",
  Secondi: "fino a 20 €",
  Mains: "up to €20",
};

// Colonne del foglio "Eventi": Data (GG/MM/AAAA), Ora, Titolo, Titolo EN, Descrizione,
// Descrizione EN, Immagine (link), Prezzo, Prenotazione (WhatsApp, telefono o link), Pubblica.
// Primo evento: reale (post del locale, luglio 2026), quindi appare tra i passati.
// Gli altri due sono esempi senza data, segnalati come tali.
export const EVENTI_DEMO: Riga[] = [
  {
    data: "03/07/2026",
    ora: "",
    titolo: "Vignaioli a Centocelle",
    titolo_en: "Winemakers in Centocelle",
    descrizione: "Cena con i vini di Riccardo Magno e Andrea Occhipinti, con Luca Boccoli in sala.",
    descrizione_en: "Dinner with the wines of Riccardo Magno and Andrea Occhipinti, with Luca Boccoli hosting.",
    immagine: "",
    prezzo: "",
    prenotazione: "",
    pubblica: "sì",
  },
  {
    data: "",
    ora: "",
    titolo: "Degustazione al buio con Luca Boccoli",
    titolo_en: "Blind tasting with Luca Boccoli",
    descrizione: "Si assaggia con la mascherina sugli occhi: niente etichette, solo naso e palato.",
    descrizione_en: "Tasting with a mask over your eyes: no labels, only nose and palate.",
    immagine: "",
    prezzo: "",
    prenotazione: "whatsapp",
    pubblica: "sì",
    esempio: "sì",
  },
  {
    data: "",
    ora: "",
    titolo: "Serata territorio",
    titolo_en: "Wine region night",
    descrizione: "Una zona del vino raccontata attraverso le bottiglie della cantina, con piatti di mare in abbinamento.",
    descrizione_en: "One wine area told through the cellar's bottles, paired with seafood dishes.",
    immagine: "",
    prezzo: "",
    prenotazione: "whatsapp",
    pubblica: "sì",
    esempio: "sì",
  },
];
