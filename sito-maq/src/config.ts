// Contatti di MAQ Web Design: cambiando questi valori si aggiornano
// tutti i pulsanti, il modulo e il footer del sito.
export const CONTATTI = {
  // numero WhatsApp Business in formato internazionale, solo cifre (es. 393331234567)
  whatsapp: "",
  // email professionale
  email: "",
  // profilo Instagram senza @ (es. maqwebdesign)
  instagram: "",
};

export const NOME = "MAQ Web Design";
export const TITOLARE = "Mattia Aquiri";

const MESSAGGIO_BOZZA =
  "Salve Mattia, ho visto il sito di MAQ Web Design e vorrei ricevere la bozza gratuita del sito per la mia attività.";

// Link principale per chiedere la bozza: WhatsApp se c’è il numero, altrimenti email,
// altrimenti la sezione contatti della pagina.
export function linkBozza(testo: string = MESSAGGIO_BOZZA): string {
  if (CONTATTI.whatsapp) {
    return `https://wa.me/${CONTATTI.whatsapp}?text=${encodeURIComponent(testo)}`;
  }
  if (CONTATTI.email) {
    return `mailto:${CONTATTI.email}?subject=${encodeURIComponent("Richiesta bozza gratuita")}&body=${encodeURIComponent(testo)}`;
  }
  return "#contatti";
}

export function apreAltraScheda(link: string): boolean {
  return link.startsWith("http");
}
