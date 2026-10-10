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
- Stack dei siti: Vite + React + Tailwind v4 + Motion + icone Phosphor, contenuti in un file dati
  (`src/data/site.ts` + `ui.ts` per i testi bilingue). Prenotazioni ristoranti: modulo che apre
  WhatsApp con il messaggio compilato (modello OMA, branch `claude/vigilant-edison-50pdj9`).
- Bozze per il cliente: `npm run bozze` crea due HTML offline in `consegna/` (PC e smartphone con cornice).
- Progetto Da Mario (`damario/sito`): tema scuro, accento ROSSO VINO scelto dall'utente (l'arancione brace
  non gli piaceva: "orrendo"), Cormorant Garamond + Hanken Grotesk, splash con la tenda a festoni.
  Colori in token (`ember` = accento su fondo scuro, `fill`/`on-fill` = pulsante, `radius-btn`).
  Foto dei piatti e della sala fornite dall'utente in `public/img/` (WebP + AVIF).
  Preventivo Da Mario: Completo 690 €, Base 500 € (doc Claude Docs "Preventivo sito web Ristorante da Mario",
  PDF in `consegna/`). Messaggio WhatsApp per Valerio in `consegna/Messaggio_WhatsApp_Valerio.txt`.
  Valerio Palermo è chef E proprietario (stessa persona nelle foto `valerio` e `valerio-carrello`). WhatsApp prenotazioni NON confermato (provvisorio il fisso).
  Instagram/Facebook non verificati: non mostrati finché l'utente non dà gli URL.
- Ricerca dati: Google Maps via curl (`/maps/place/...` poi l'URL `preview/place?...` contenuto nella pagina:
  voto, numero recensioni, orari, recensioni con autori e risposte del titolare, foto con autore).
  TheFork e Tripadvisor bloccano (captcha/403): il menù TheFork si ricava solo dalle ricerche web.
  Le foto caricate dal proprietario hanno l'etichetta `bizbuilder` nei dati Google.
  Il sito su Aruba funziona senza `www` quando il `www` non risponde.
- Errore da evitare: elementi `sr-only` (position absolute) dentro un contenitore a scorrimento orizzontale
  senza `relative` allargano la pagina su smartphone. Mettere `relative` sui contenitori `overflow-x-auto`
  e `grid-cols-1` sulle griglie che diventano a più colonne solo da md/lg.
- Più componenti con lo stesso `layoutId` di Motion montati insieme si rubano l'animazione: usare `useId`.
- Non usare `pkill -f` con un testo presente nel comando stesso: termina anche la shell.
- Scelte visive (colori, stile): proporre SEMPRE 2-3 varianti con screenshot affiancati (`21st-ui-explore`)
  prima di fissarne una; mai decidere da solo il colore d'accento.
- Preventivi: stessa struttura del documento Claude Docs "Preventivo sito web OMA Osteria Moderna"
  (Oggetto, Il progetto, Le due opzioni Completo/Base, Costi a parte, Tempi, Accettazione); esportato in PDF
  in `consegna/`. Al cliente si manda un messaggio WhatsApp con i link githack alle due bozze (PC e
  smartphone), cosa contiene il sito, le due opzioni e cosa serve; il PDF lo allega l'utente.
- Le immagini inviate dall'utente mentre lavoro (messaggio a metà turno) non vengono salvate su disco:
  si vedono ma non si possono usare. Chiedere di rimandarle in un messaggio nuovo.
