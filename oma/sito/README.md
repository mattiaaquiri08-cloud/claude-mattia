# OMA Osteria Moderna: sito web

Sito ufficiale di OMA Osteria Moderna (Via Costantino Maes 78, Roma).
React 19 + Vite + Tailwind CSS v4 + Motion (`motion/react`), icone Phosphor.

## Avviare e pubblicare

```bash
npm install
npm run dev       # anteprima locale su http://localhost:5173
npm run build     # crea la cartella dist/ pronta da pubblicare
npm run preview   # prova la versione finale
```

La cartella `dist/` è statica: si pubblica così com'è su Netlify (trascinandola su app.netlify.com/drop),
Vercel, GitHub Pages o qualunque hosting. I percorsi sono relativi, quindi funziona anche in una sottocartella.

## Dove si cambiano i contenuti

Tutto è in **`src/data/site.ts`**:

| Cosa | Voce |
|---|---|
| Numero WhatsApp delle prenotazioni | `SITE.whatsapp` (solo cifre, con 39 davanti) |
| Telefono, indirizzo, Instagram | `SITE` |
| Orari (usati anche per gli orari prenotabili) | `HOURS` |
| Menu, vini e drink | `MENU` |
| Aperitivo | `APERITIVO` |
| Foto della galleria | `GALLERY` (file in `public/img/`) |
| Recensioni e voti | `REVIEWS`, `RATINGS` |

I PDF del menu sono in `public/menu/`. Le foto della hero sono `public/img/hero-desktop.webp`
(orizzontale) e `public/img/hero-mobile.webp` (verticale).

## Come funziona la prenotazione

Il modulo chiede nome, giorno, orario, persone, email, telefono e note facoltative.
I giorni di chiusura sono disattivati e gli orari si calcolano da `HOURS`, fino a un'ora prima della chiusura
e saltando quelli già passati (fuso orario di Roma).
Premendo **Invia prenotazione** si apre WhatsApp verso il numero di OMA con il messaggio già compilato:
la richiesta parte solo quando il cliente preme Invia su WhatsApp. Il sito non mostra conferme finte.

## Struttura

- `src/components/Splash.tsx`: intro con la scritta OMA "dipinta" e doppio sipario
- `src/components/Hero.tsx`: foto a tutto schermo con i due pulsanti
- `src/components/Manifesto.tsx`: slogan che si accende con lo scroll e la storia
- `src/components/Menu.tsx`: menu a schede (antipasti, primi, secondi, contorni, dolci, vini, drink)
- `src/components/Aperitivo.tsx`: fascia dell'aperitivo
- `src/components/Gallery.tsx`: griglia di foto con visore (frecce, tastiera, swipe)
- `src/components/Reviews.tsx`: voto Google e mazzo di recensioni
- `src/components/Visit.tsx`: indirizzo, mappa, orari con stato "aperto ora"
- `src/components/BookingDialog.tsx`: modulo di prenotazione via WhatsApp

Le animazioni rispettano l'impostazione di sistema "riduci movimento".
