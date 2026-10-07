# Claudia Fulli Salon: sito web

Sito one-page per Claudia Fulli Salon, hair studio a Parioli (Via Ruggero Fauro 1, Roma).

## Avvio

```bash
npm install
npm run dev      # sviluppo su http://localhost:5173
npm run build    # versione di produzione in dist/
npm run preview  # anteprima della build
```

La cartella `dist/` è un sito statico: si pubblica così com'è su Vercel, Netlify o qualsiasi hosting.

## Tecnologie

- React 19, Vite, TypeScript
- Tailwind CSS v4 (colori e font in `src/index.css`)
- Motion (`motion/react`) per le animazioni, Lenis per lo scroll morbido
- Font Albert Sans (self-hosted con Fontsource), icone Phosphor
- Componenti 21st usati come base: "Editorial Image Hero" (apertura) ed "Editorial Testimonial" (recensioni)

## Sezioni

1. Apertura: la foto del salone a tutta larghezza, il nome e i pulsanti Prenota e Chiama.
2. Il salone: presentazione con il testo che si illumina parola per parola.
3. Dentro il salone: scorrendo, l'inquadratura della foto si avvicina a cinque dettagli.
4. Servizi e listino: 17 servizi in 5 categorie, con durate e prezzi.
5. Team: Claudia e Lella.
6. Recensioni: valutazioni Google e Treatwell, carosello di recensioni reali.
7. Contatti: orari con stato "aperto ora", indirizzo, mezzi pubblici, telefono, mappa.

Su telefono compare una barra fissa con Chiama e Prenota.

## Dati

Tutti i contenuti stanno in `src/data/salon.ts` e vengono da fonti pubbliche, consultate a ottobre 2026:

- scheda Treatwell del salone (listino, durate, team, orari, servizi, mezzi pubblici, recensioni verificate);
- scheda Google Maps (telefono, valutazione 5,0 su 20 recensioni, testi delle recensioni).

Per aggiornare prezzi, orari o recensioni basta modificare quel file.

## Da completare con la titolare

- Foto del team e altre foto del salone, se disponibili (ora il sito usa una sola foto).
- Dominio definitivo: poi rendere assoluti gli URL di `og:image` in `index.html`.
- Profili social, se esistono.
- Privacy e cookie policy. La mappa Google si carica solo quando l'utente la apre, quindi finché non la apre il sito non imposta cookie di terze parti.
- Conferma del listino e dei ruoli del team.
