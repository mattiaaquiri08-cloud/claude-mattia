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
- Stack usato per i siti: Vite + React + Tailwind v4 + Motion + icone Phosphor, contenuti in un
  unico file dati (es. `oma/sito/src/data/site.ts`) così si aggiornano senza toccare i componenti.
- Prenotazioni dei ristoranti: modulo che apre WhatsApp con il messaggio già compilato, mai
  conferme simulate.
- Progetto OMA Osteria Moderna (cartella `oma/`): tema scuro, accento ocra del logo (#d2772c),
  font Bricolage Grotesque + Geist. WhatsApp prenotazioni: 377 301 7230 (confermato dall'utente).
  Referente: Alessio. Preventivo: Completo 550 €, Base 450 €.
  Il menu cambia ogni settimana: menu, orari e avviso li aggiorna il ristorante dal Foglio Google
  "OMA - Menu e orari del sito" (Drive dell'utente, id in `SITE.sheetId`), incluso nel Completo.
  Il foglio va condiviso "chiunque abbia il link: visualizzatore", altrimenti il sito usa i dati salvati.
- Le foto di Google Maps non si scaricano in automatico (la pagina non carica in headless):
  chiedere le foto all'utente.
- Con la CLI 21st la chiave si passa con `API_KEY_21ST` (già letta in automatico).
- Negli screenshot automatici aspetta la fine delle animazioni prima di giudicare un bug.
- Bozze per i clienti: due file HTML unici offline (PC e smartphone con cornice di telefono) in
  `consegna/`, creati con `npm run bozze`; link pubblici con
  `https://rawcdn.githack.com/mattiaaquiri08-cloud/claude-mattia/<SHA-commit>/consegna/<file>.html`
  (nuovo SHA a ogni aggiornamento). Le immagini di `public/` vanno incorporate dallo script.
- Preventivi: modello = il documento Claude Docs "Preventivo sito web Claudia Fulli Salon"
  (Oggetto, Il progetto, Le due opzioni Completo/Base, Costi a parte, Tempi, Accettazione);
  si crea un nuovo documento con la stessa struttura e i prezzi indicati dall'utente.
- Contenuti che il cliente vuole cambiare da solo (menu, orari): Foglio Google letto dal sito
  (endpoint `gviz/tq?tqx=out:csv&sheet=<scheda>`), con copia locale e dati di riserva nel codice.
  Il connettore Drive non può rendere pubblico un file: lo deve fare l'utente da Condividi.
