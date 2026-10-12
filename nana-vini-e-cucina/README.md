# Nanà Vini e Cucina: sito ufficiale

Sito bilingue (italiano `/`, inglese `/en/`) del ristorante Nanà Vini e Cucina,
Via della Panetteria 37, Roma.

## Comandi

```bash
npm install
npm run dev      # sviluppo su http://localhost:5173
npm run build    # crea dist/ con le pagine IT ed EN già pronte (prerender)
npm run preview  # prova in locale la versione di produzione
npm run images   # rigenera le foto ottimizzate da assets-src/ (AVIF + WebP)
npm run icons    # rigenera favicon e icone dal logo
npm run build:single  # crea nana-vini-e-cucina.html: tutto il sito in un solo file (circa 4 MB)
npm run build:proposta  # crea nana-proposta.html: anteprima "proposta" con fascia in alto e prenotazioni disattivate
```

Il file unico si apre con un doppio clic, senza server: comodo per mostrare il sito in anteprima.
In quella versione la lingua cambia senza modificare l'indirizzo e le foto sono a 800 px.

La cartella `dist/` è un sito statico: si pubblica così com'è su Netlify, Vercel,
Cloudflare Pages o su qualsiasi hosting.

## Dove modificare i contenuti

| Cosa | File |
|---|---|
| Menù (piatti, descrizioni, prezzi) | `src/data/menu.ts` |
| Telefono, orari, link TheFork, social, mappe | `src/data/site.ts` |
| Tutti i testi del sito (IT ed EN) e le recensioni | `src/i18n/dictionaries.ts` |
| Foto della galleria e didascalie | `assets-src/galleria/` + `src/data/gallery.ts` |
| Foto dei riquadri "tradizione napoletana / romana" | `src/components/Story.tsx` (pannelli `napoli` e `roma`) |
| Foto della hero (giorno e sera) | `assets-src/hero/` |
| Colori e caratteri | `src/index.css` (blocco `@theme`) |

Dopo aver aggiunto o sostituito foto in `assets-src/` eseguire `npm run images`.

## Comportamenti utili

- **Splash** di circa 3 secondi, una volta per sessione. Per rivederla: aggiungere `?splash` all'indirizzo.
- **Hero giorno o sera** in automatico secondo l'ora di Roma (sera da circa 20 minuti prima del tramonto).
  Per forzarla: `?hero=giorno` oppure `?hero=sera`.
- La **mappa Google** si carica solo al clic, così non imposta cookie senza un'azione del visitatore.

## Fonti dei contenuti

Logo (vettoriale), menù e foto provengono dal sito ufficiale nanaviniecucina.it
(menù PDF del giugno 2026). Valutazione Google, link e recensioni sono stati verificati
il 12 ottobre 2026; le fonti sono annotate nei file in `src/data/`.
