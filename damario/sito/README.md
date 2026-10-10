# Ristorante da Mario di Valerio Palermo: sito web

Sito ufficiale del Ristorante da Mario (Via Silvio Spaventa 19, Roma), in italiano e inglese.
React 19 + Vite + Tailwind CSS v4 + Motion (`motion/react`), icone Phosphor.
Font: Cormorant Garamond (titoli, come la scritta sulla tenda) e Hanken Grotesk (testi).

## Avviare e pubblicare

```bash
npm install
npm run dev       # anteprima locale su http://localhost:5173
npm run build     # crea dist/ pronta da pubblicare (percorsi relativi)
npm run bozze     # crea le bozze offline in ../../consegna (PC e smartphone)
```

`dist/` è statica: si pubblica su Netlify, Vercel, Cloudflare Pages, GitHub Pages o qualunque hosting.

## Dove si cambiano i contenuti

| Cosa | File / voce |
|---|---|
| Numero WhatsApp delle prenotazioni (**da confermare**) | `src/data/site.ts` → `SITE.whatsapp` |
| Telefono, indirizzo, link Google/Tripadvisor, Instagram/Facebook | `SITE` |
| Orari (usati anche per gli orari prenotabili e per "aperto ora") | `HOURS` |
| Menù, prezzi, traduzioni inglesi | `MENU` |
| Recensioni e voto Google | `REVIEWS`, `RATING` |
| Foto della galleria (file in `public/img/`) | `GALLERY` |
| Ritratto di Valerio | `VALERIO_PHOTO` |
| Testi delle sezioni, in italiano e inglese | `src/data/ui.ts` |

Le foto vanno in `public/img/` in WebP e AVIF, con la larghezza nel nome (es. `carbonara-900.webp`).
Nella galleria gli spazi con `base: null` mostrano "Foto in arrivo": basta indicare il nome del file.

## Prenotazione

Il modulo chiede nome, giorno, orario, persone, email, telefono e note facoltative.
Le date passate e la domenica non si possono scegliere; gli orari vengono da `HOURS`
(ogni 30 minuti, fino a un'ora prima della chiusura, saltando quelli già passati, fuso di Roma).
**Invia prenotazione** apre WhatsApp verso il ristorante con il messaggio già compilato (sempre in italiano;
se il cliente usa il sito in inglese il messaggio lo segnala). Nessuna conferma automatica.

## Struttura

- `Splash`: "DA MARIO" in capitali romane, linea di brace, la tenda a festoni che si alza (3 s; versione ferma con "riduci movimento")
- `Hero`: foto verticale su smartphone, orizzontale da tablet in su, solo i due pulsanti
- `Intro`, `Pillars` (Brace, Vino, Tartufo), `Menu` (a schede), `Valerio`, `Gallery` (con visore),
  `Reviews`, `Visit` (orari, mappa caricata su richiesta), `Footer`, `BookingDialog`, `MobileBar`
- Lingua: `src/lib/i18n.tsx` (scelta salvata; `?lang=en` nell'indirizzo forza l'inglese)

## Fonti dei contenuti (verificate il 10/10/2026)

- Scheda Google Maps del ristorante: indirizzo, telefono, orari, voto 4,7 su 491 recensioni, descrizione, recensioni.
- Menù pubblicato dal ristorante su TheFork (aggiornato al 5 gennaio 2026) e piatti indicati dal cliente.
- Foto: hero fornite dal cliente; `sala` e `tartufo` pubblicate dal ristorante sulla propria scheda Google.
