# Sito di Enrico Picciolo (bozza)

Nuova versione, più sintetica, del sito di Enrico Picciolo, consulente finanziario Fineco (enricopicciolo.it).
Vite + React + Tailwind v4 + Motion, font Geist, tema chiaro e scuro automatico.

- Testi, foto, libro e loghi: presi dal sito attuale di Enrico.
- Recapiti e link (telefono, email, Amazon, LinkedIn): `src/config.ts`.
- Il modulo contatti non ha un server: prepara il messaggio e apre l'email o WhatsApp già compilati.
  Per l'invio automatico si può collegare Web3Forms come nel sito MAQ.
- `noindex` in `index.html`: va tolto quando Enrico approva e il sito sostituisce quello attuale.

Comandi: `npm install`, `npm run dev`, `npm run build` (cartella `dist/`).
Bozza online: https://mattiaaquiri08-cloud.github.io/claude-mattia/picciolo/ (ramo `gh-pages`, cartella `picciolo/`).
