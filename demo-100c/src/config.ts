// Dati del locale: cambiando questi valori si aggiornano pulsanti, prenotazioni, orari e footer.

export const LOCALE = {
  nome: "100C Vino e Pesce",
  // numero per chiamate e WhatsApp (formato internazionale, solo cifre per WhatsApp)
  telefono: "+39 349 242 2046",
  whatsapp: "393492422046",
  // Google, Zero.eu e Puntarella Rossa: "Viale delle Orchidee 12" (Gambero Rosso: "via delle Orchidee 10/12")
  via: "Viale delle Orchidee 12",
  cap: "00171",
  citta: "Roma",
  quartiere: "Centocelle",
  instagram: "https://www.instagram.com/100c_roma/",
  instagramNome: "@100c_roma",
  // pagina Facebook: da inserire solo dopo averla verificata
  facebook: "",
  mappa: "https://www.google.com/maps/search/?api=1&query=100C+Vino+e+Pesce+Viale+delle+Orchidee+12+Roma",
  indicazioni: "https://www.google.com/maps/dir/?api=1&destination=100C+Vino+e+Pesce+Viale+delle+Orchidee+12+Roma",
  mappaIncorporata: "https://www.google.com/maps?q=100C+Vino+e+Pesce,+Viale+delle+Orchidee+12,+Roma&output=embed",
};

// Valutazione Google: aggiornare qui quando cambia
export const GOOGLE = {
  voto: 4.6,
  recensioni: 44,
  aggiornato: "ottobre 2026",
};

// Orari (fonte: scheda Google, ottobre 2026). DA CONFERMARE con il locale:
// articoli precedenti indicavano lunedì chiuso e venerdì aperto anche a pranzo.
// giorno: 0 = domenica ... 6 = sabato; fasce in formato "HH:MM"
export const ORARI: { giorno: number; fasce: [string, string][] }[] = [
  { giorno: 1, fasce: [["18:30", "22:30"]] },
  { giorno: 2, fasce: [["18:30", "22:30"]] },
  { giorno: 3, fasce: [["18:30", "22:30"]] },
  { giorno: 4, fasce: [["18:30", "22:30"]] },
  { giorno: 5, fasce: [["18:30", "22:30"]] },
  { giorno: 6, fasce: [["12:30", "15:00"], ["18:30", "22:30"]] },
  { giorno: 0, fasce: [["12:30", "15:00"]] },
];

// Collegamento a Google Sheets (vedi LEGGIMI.md): due fogli, uno per il menù e uno per gli eventi.
// Per ognuno si incolla l'ID del foglio (la parte tra /d/ e /edit nel link), con il foglio condiviso
// come "Chiunque abbia il link: Visualizzatore"; in alternativa il link CSV di "Pubblica sul web".
// Il sito legge sempre la prima scheda. Se il campo è vuoto si vedono i dati dimostrativi, segnalati come tali.
export const FOGLIO = {
  menu: "1vzrYa-GubFSBiP2Hp92vn7ZNe1LuOWYIGAMHbcTitfY",
  eventi: "1h4MVQgON1OdqkdkdkM7l41D7s-eECbzjkdYLD1fvHjE",
};

// Bozza da presentare: i fogli contengono ancora piatti di esempio, quindi il sito lo dice.
// Quando il locale compila il menù vero, mettere false.
export const DIMOSTRATIVO = true;

export const linkWhatsApp = (testo: string) =>
  `https://wa.me/${LOCALE.whatsapp}?text=${encodeURIComponent(testo)}`;
export const linkTelefono = `tel:${LOCALE.telefono.replace(/\s/g, "")}`;
