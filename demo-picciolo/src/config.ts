// Recapiti di Enrico Picciolo, presi dal suo sito attuale (enricopicciolo.it)
export const CONTATTI = {
  nome: "Enrico Picciolo",
  telefono: "+39 335 529 6282",
  email: "Enrico.picciolo@pfafineco.it",
  indirizzo: "Via Ezio, 49",
  citta: "00195 Roma",
  sede: "Fineco Point, Prati",
  mappa: "https://share.google/rTpFBvMuhRkH6oHTq",
  linkedin: "https://www.linkedin.com/in/enrico-picciolo-512b46138",
  amazon: "https://amzn.eu/d/eKOfUQq",
};

const numero = CONTATTI.telefono.replace(/[^\d+]/g, "");
export const linkTelefono = `tel:${numero}`;
export const linkEmail = `mailto:${CONTATTI.email}`;

export function linkWhatsApp(testo = "Buongiorno Enrico, ho visto il suo sito e vorrei qualche informazione.") {
  return `https://wa.me/${numero.replace("+", "")}?text=${encodeURIComponent(testo)}`;
}

// motivi della richiesta: li usano il modulo e i pulsanti delle sezioni
export const MOTIVI = [
  { id: "diagnosi", testo: "Diagnosi gratuita degli investimenti" },
  { id: "previdenza", testo: "Check-up previdenziale" },
  { id: "call", testo: "Call di confronto" },
  { id: "ebook", testo: "Ebook del libro in regalo" },
  { id: "altro", testo: "Altro" },
] as const;

export type Motivo = (typeof MOTIVI)[number]["id"];
