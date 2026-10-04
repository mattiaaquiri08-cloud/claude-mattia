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
- Sito FLIPPER in `flipper/` (Vite + TypeScript + Motion vanilla, testo in HTML statico per la SEO).
  La rotazione è una sequenza di 200 frame WebP su canvas guidata dallo scroll; per cambiare la
  coreografia si modificano `STORY_DOCKS`/`STORY_SPIN` in `src/main.ts` e i dock nel CSS.
- Stile FLIPPER scelto dall'utente: colori allegri stile estate brasiliana (Havaianas), sfondo che
  cambia colore scena per scena e FLIPPER colorato nei suoi colori reali (`STORY_COLORS`).
  La prima versione era nera e argento (vedi la storia git).
- Effetto metallico solo per FLIPPER Argento e Oro; tutti gli altri colori sono resi come gomma
  opaca (campo `metal` della tinta in `src/main.ts`).
- Anteprima pubblica: artifact claude.ai/artifact/DfobVxATYQyPtxJf4uYM62 (si ripubblica allo
  stesso link; l'utente lo rende pubblico dal menu Condividi).
- Il video 360° di FLIPPER non chiude perfettamente il giro: usare `flipper/scripts/estrai-frame.sh`,
  che interpola i frame mancanti. Informazioni sul prodotto: email da info@flippersalvainfradito.it
  e schede Amazon (il sito ufficiale e Amazon non sono raggiungibili dalla rete della sessione).
