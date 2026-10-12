/*
  Dati di contatto e collegamenti ufficiali di Nanà Vini e Cucina.
  Ogni valore è stato verificato il 12 ottobre 2026; la fonte è indicata accanto.
*/

const PLACE_ID = "ChIJrS4WuKxhLxMR_Or65BVB8hQ"; // scheda Google Maps del ristorante
const ADDRESS_QUERY = encodeURIComponent("Nanà Vini e Cucina, Via della Panetteria 37, 00187 Roma RM");

export const SITE = {
  name: "Nanà Vini e Cucina",
  url: "https://nanaviniecucina.it",
  company: "Cahore S.r.l.", // piè di pagina del sito ufficiale

  address: {
    street: "Via della Panetteria, 37",
    postalCode: "00187",
    city: "Roma",
    region: "RM",
    country: "IT",
    lat: 41.9017876, // dal collegamento Google Maps del sito ufficiale
    lng: 12.4847713,
  },

  phone: {
    display: "+39 06 6919 0750",
    href: "tel:+390669190750",
  },

  // Sito ufficiale e Google: tutti i giorni, 12:00 - 23:00
  hours: { opens: "12:00", closes: "23:00" },

  rating: {
    google: { value: 4.6, count: 2452, checkedOn: "2026-10-12" },
  },

  links: {
    // partner di prenotazione indicato da Google per questa scheda
    thefork: "https://www.thefork.it/ristorante/nana-vini-e-cucina-r736495",
    theforkEn: "https://www.thefork.com/restaurant/nana-vini-e-cucina-r736495",
    googleMaps: `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}&query_place_id=${PLACE_ID}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS_QUERY}&destination_place_id=${PLACE_ID}`,
    googleReviews: `https://search.google.com/local/reviews?placeid=${PLACE_ID}`,
    googleWriteReview: `https://search.google.com/local/writereview?placeid=${PLACE_ID}`,
    tripadvisor: "https://www.tripadvisor.it/Restaurant_Review-g187791-d1650897-Reviews-Nana_Vini_e_Cucina-Rome_Lazio.html",
    tripadvisorEn: "https://www.tripadvisor.com/Restaurant_Review-g187791-d1650897-Reviews-Nana_Vini_e_Cucina-Rome_Lazio.html",
    // il menù di giugno 2026 riporta @nanaviniecucina; il vecchio sito collegava @nana_cucinadicostiera
    instagram: "https://www.instagram.com/nanaviniecucina/",
    facebook: "https://www.facebook.com/nanavinicucina",
    menuPdf: "https://nanaviniecucina.it/wp-content/uploads/2026/06/Nana-Menu-3-Ante.pdf",
    privacyPdf: "https://nanaviniecucina.it/wp-content/uploads/2022/06/nana-privacy-policy-it.pdf",
  },

  mapEmbed: `https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed&z=17`,
} as const;
