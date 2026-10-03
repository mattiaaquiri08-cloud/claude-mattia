# Exotique & Estetique, sito web

Sito one-page per **Exotique & Estetique**, centro estetico in Via Giuseppe Calenzuoli 3, La Storta (Roma).

## Avvio

```bash
npm install
npm run dev      # sviluppo su http://localhost:5173
npm run build    # build statica in dist/
npm run preview  # anteprima della build
```

Stack: Vite, React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Lenis, Phosphor Icons.
Font self-hosted: Bodoni Moda (titoli) e Geist (testo).

## Direzione visiva

Tutto parte dalla fotografia del salone:

- **palette**: porcellana delle pareti, nero di cornici e poltrone, rosso lacca della cassettiera e degli smalti (unico accento);
- **forma**: angoli a zero e cornici nere spesse, come gli specchi a tutta altezza;
- **movimento**: la hero si apre da una fessura con le proporzioni di uno specchio; le immagini scendono "a tenda"; i titoli salgono da una maschera; il manifesto si accende parola per parola. Tutto rispetta `prefers-reduced-motion`;
- **tema chiaro e scuro** automatici in base al dispositivo.

Percorso: Hero → Il centro → Trattamenti → Lo spazio (foto esplorabile) → Naomi → Listino → Recensioni → Contatti e prenotazione.

## Contenuti: un solo file

Tutti i dati sono in [`src/content.ts`](src/content.ts), con la fonte di ogni campo. **Nessun dato commerciale è inventato.**
Fonti verificate il 3 ottobre 2026:

| Dato | Fonte | Note |
|---|---|---|
| Indirizzo, telefono 388 090 3695, orari mar-sab 9:30-18:00 | Google Maps | |
| Valutazione 4,6 su 34 recensioni | Google Maps | |
| Recensioni (5 estratti fedeli) | Google Maps, Treatwell | nomi abbreviati per riservatezza |
| Servizi e durate (84 trattamenti) | Treatwell | Treatwell non pubblica i prezzi: il listino mostra le durate |
| Foto del centro e di Naomi | Treatwell, Google Maps | |
| Frase e principi di Naomi | descrizione scritta dalla titolare su Google | |
| Prenotazione online | - | i profili Treatwell non accettano prenotazioni: le CTA aprono WhatsApp e telefono |

Per aggiungere i prezzi basta compilare `price` nei servizi: il listino li mostra al posto della durata.

## Pubblicazione su Cloudflare Pages

- Root directory: `exotique-estetique`
- Build command: `npm run build`
- Output directory: `dist`
- `public/_headers` imposta la cache lunga sugli asset con hash.

Dopo aver scelto il dominio, rendere assoluto l'URL di `og:image` in `index.html` (es. `https://dominio.it/og.jpg`).

`npm run build:single` produce invece `dist-single/index.html`, un unico file apribile anche offline.

## Immagini

`src/assets/photo/` contiene la foto della hero in versioni responsive (AVIF/WebP) e i suoi ritagli: nessuna immagine stock o generata.
Le foto in `src/assets/photo/real/` provengono dai profili pubblici del centro (Treatwell, Google Maps): verificarne con la titolare l’uso sul sito.
