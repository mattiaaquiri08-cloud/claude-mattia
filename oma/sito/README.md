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

## Brand

Colori e font sono quelli dei social di OMA, indicati dalla social media manager:
avorio `#f8f7e8` per lo sfondo, nero `#171415` principale, ocra `#AD6A21` per i dettagli.
Font alternati 50 e 50: Sprite Graffiti (nomi delle sezioni e metà dei titoli) e Playfair Display (l'altra
metà dei titoli e i testi). I token sono in `src/index.css`.

Sprite Graffiti è un font commerciale e non è nel repository: per vederlo va copiato il file
`public/fonts/sprite-graffiti.woff2` (cartella esclusa da git). Senza il file il sito usa Permanent Marker.

## Menu, orari e avviso

Il menu della settimana e la carta dei vini sono i PDF del ristorante su Linktree (`SITE.menuUrl`, lo stesso
link del QR code al tavolo): i pulsanti "Menu" e "Carta dei vini" portano lì.

Orari e avviso in alto arrivano dal Foglio Google **"OMA - Menu e orari del sito"** (id in `SITE.sheetId`,
schede `Orari` e `Avviso`). Il foglio deve essere condiviso come **"Chiunque abbia il link: visualizzatore"**.
Se il foglio non risponde, il sito usa l'ultimo caricamento riuscito oppure i dati di `src/data/site.ts`.
Il codice è in `src/lib/live-data.ts`.

## Dove si cambiano i contenuti

Tutto è in **`src/data/site.ts`**:

| Cosa | Voce |
|---|---|
| Testi delle macro-sezioni (chi siamo, food, mercato, menù, piatti, aperitivo, wine, eventi) | `TESTI` |
| Numero WhatsApp delle prenotazioni | `SITE.whatsapp` (solo cifre, con 39 davanti) |
| Telefono, indirizzo, Instagram, link del menu | `SITE` |
| Orari (usati anche per gli orari prenotabili) | `HOURS` |

Le foto sono in `public/img/`; quelle delle sezioni sono provvisorie, in attesa delle foto del ristorante.
La hero usa `public/img/hero-desktop.webp` (orizzontale) e `public/img/hero-mobile.webp` (verticale).

## Come funziona la prenotazione

Il modulo chiede nome, giorno, orario, persone, email, telefono e note facoltative.
I giorni di chiusura sono disattivati e gli orari si calcolano da `HOURS`, fino a un'ora prima della chiusura
e saltando quelli già passati (fuso orario di Roma).
Premendo **Invia prenotazione** si apre WhatsApp verso il numero di OMA con il messaggio già compilato:
la richiesta parte solo quando il cliente preme Invia su WhatsApp. Il sito non mostra conferme finte.

## Struttura

- `src/components/Splash.tsx`: intro con la scritta OMA "dipinta" e doppio sipario
- `src/components/Hero.tsx`: foto a tutto schermo, OMA, slogan e i pulsanti Prenota ora e Menu
- `src/components/Sezioni.tsx`: le macro-sezioni nell'ordine dei testi (Chi siamo, Food, Il mercato,
  Il menù, I nostri piatti, L'aperitivo del sabato, Wine, Gli eventi)
- `src/components/Visit.tsx`: indirizzo, mappa, orari con stato "aperto ora"
- `src/components/BookingDialog.tsx`: modulo di prenotazione via WhatsApp

Le animazioni rispettano l'impostazione di sistema "riduci movimento".
