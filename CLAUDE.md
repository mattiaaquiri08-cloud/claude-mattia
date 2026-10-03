# Istruzioni per Claude

Questo file viene letto all'inizio di ogni sessione. È la memoria permanente del progetto:
tutto ciò che deve valere sempre va scritto qui.

## Lingua

- Rispondi sempre in italiano.
- Rivolgiti sempre all'utente chiamandolo "signore".

## Creazione di siti e interfacce: usa 21st

Quando ti viene chiesto di creare un sito, una pagina o un componente UI, usa le skill di 21st:

1. **`21st-ui-explore`** — se la direzione visiva non è decisa, proponi prima alcune varianti.
2. **`21st-ui-build`** — per costruire le pagine partendo dai componenti del catalogo 21st.
3. **`21st-cli-use`** — per cercare (`21st search`) e installare (`21st add`) i componenti.
   Cerca sempre nel catalogo prima di scrivere un componente da zero.
4. **`21st-ui-review`** — alla fine, controlla accessibilità, responsive e coerenza.

Insieme a 21st usa anche queste skill del profilo:
- **`design-taste-frontend`** — sempre, per landing page, portfolio e restyling: fai la "design read",
  imposta i tre parametri ed evita i cliché da sito generato dall'AI.
- **`redesign-existing-projects`** — quando si migliora un sito già esistente.
- Skill di stile, solo se l'utente chiede quello stile: `minimalist-ui`, `high-end-visual-design`,
  `industrial-brutalist-ui`, `gpt-taste`.
- **`motion-animations`** — per tutte le animazioni usa Motion (ex Framer Motion): `npm install motion`,
  import da `motion/react`, mai `framer-motion` nei progetti nuovi.
- **`full-output-enforcement`** — scrivi sempre il codice completo, senza segnaposto.
- **`web-design-guidelines`** — alla fine, controlla i file con le linee guida di Vercel.
- Non usare `design-taste-frontend-v1` (versione vecchia, in conflitto con la principale) né le
  skill che generano immagini (`imagegen-frontend-*`, `image-to-code`, `brandkit`): qui non
  è possibile generare immagini.

Account e limiti (piano free):
- La chiave API è nella variabile d'ambiente `API_KEY_21ST` (non scriverla mai nel codice o nei commit).
- La ricerca nel catalogo è illimitata.
- Il download del codice dei componenti (`21st get` / `21st add`) è limitato a **2 al giorno**:
  usali per i componenti più importanti (es. hero, pricing) e scrivi il resto ispirandoti ai
  risultati della ricerca. Controlla la quota con `npx @21st-dev/cli usage`.
- La generazione AI di 21st (`21st generate`) **non è attiva**: non usarla.

## Come mantenere la memoria

Alla fine di ogni attività, se hai imparato qualcosa che vale anche per il futuro, aggiorna
la sezione "Preferenze e lezioni apprese" qui sotto e fai il commit insieme al resto del lavoro:
- preferenze dell'utente (stile, colori, tecnologie, modo di lavorare);
- decisioni prese sul progetto e il loro motivo;
- errori commessi e come evitarli.

Tieni le voci brevi e concrete; aggiorna o elimina quelle superate invece di accumularle.

## Preferenze e lezioni apprese

- Per i siti si usano le skill e i componenti di 21st, più le skill di design del profilo (vedi sopra).
- Semplicità e complessità: 50 e 50. Proponi la soluzione più adatta, ma se è complessa
  offri anche un'alternativa semplice e lascia scegliere all'utente.
- Rete: l'utente ha abilitato Treatwell e Google. Servono i domini con l'asterisco
  (`*.treatwell.it`, `*.treatwell.net`, `*.google.com`, `*.googleusercontent.com`): il dominio
  nudo da solo non basta. Chromium di Playwright non si fida del certificato del proxy: per Google
  Maps usare curl (la risposta `search?tbm=map&pb=...` contiene valutazione, orari, recensioni).
- Exotique & Estetique: Treatwell non mostra prezzi (nel JSON-LD c'è 10.00 fisso, è un segnaposto:
  non usarlo) e i profili non accettano prenotazioni. Il sito sarà pubblicato dall'utente su Cloudflare.
- Sito Exotique & Estetique in `exotique-estetique/`: tutti i contenuti in `src/content.ts`;
  i dati non verificati restano `null` e il sito li gestisce senza inventare nulla.
  Dati verificati il 3/10/2026 (Google Maps e Treatwell), con fonte indicata nel file.
- Con Motion, `whileInView` va messo su un contenitore non mascherato: un elemento traslato
  dentro un `overflow-hidden` non risulta mai visibile e l'animazione non parte.
