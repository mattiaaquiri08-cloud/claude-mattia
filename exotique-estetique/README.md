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

Apertura: splash di circa 3 secondi (una volta per sessione, si salta con un clic): la linea rossa dello specchio diventa la "&" e il nome sale lettera per lettera, poi la tenda si alza sulla hero.

Percorso: Hero → Il centro → Trattamenti → Lo spazio (foto esplorabile) → Le stanze del centro (galleria) → Naomi → Listino → Recensioni → Contatti e prenotazione.

## Contenuti: un solo file

Tutti i dati sono in [`src/content.ts`](src/content.ts), con la fonte di ogni campo. **Nessun dato commerciale è inventato.**
Fonti verificate il 3 ottobre 2026:

| Dato | Fonte | Note |
|---|---|---|
| Indirizzo, telefono 388 090 3695, orari mar-sab 9:30-18:00 | Google Maps | |
| Valutazione 4,6 su 34 recensioni | Google Maps | |
| Recensioni (4 estratti fedeli) | Google Maps | nomi abbreviati; per scelta del cliente nessuna recensione o link Treatwell |
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

## Bozze da inviare (offline)

`npm run bozze` crea in `../consegna/` due file HTML unici, apribili senza internet e senza server:

- `Exotique-Estetique_bozza_PC.html`: il sito completo;
- `Exotique-Estetique_bozza_smartphone.html`: su computer mostra il sito dentro una cornice di telefono, su smartphone lo apre a tutto schermo.

Si possono mandare via WhatsApp, email o Drive: chi li riceve li apre con un doppio clic (o con il browser del telefono).

## Immagini

`src/assets/photo/` contiene la foto della hero in versioni responsive (AVIF/WebP) e i suoi ritagli: nessuna immagine stock o generata.
Le foto in `src/assets/photo/real/` provengono dai profili pubblici del centro (Treatwell, Google Maps): verificarne con la titolare l’uso sul sito.
