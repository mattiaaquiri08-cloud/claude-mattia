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

- Lavoro dell'utente: crea siti web per business locali che non ne hanno ancora uno.
- Ricerca clienti: preferisce attività di nicchia "che non contatta nessuno" (artigiani, botteghe,
  servizi), in centro e periferia di Roma e provincia, con poche recensioni. Elenco in `lead/`.
- Come trovare attività senza sito: scaricare l'estratto OSM della provincia da
  osmit-estratti.wmcloud.org (`/output/pbf/province/058_Roma_Capitale.osm.pbf`) e filtrarlo con
  `osmium` in Python. Pagine Gialle, Paginebianche e Cylex (403), Overpass e Geofabrik sono bloccati
  dalla rete; Nominatim non fa ricerche per categoria; Clay ha solo aziende LinkedIn (inutile qui).
  OSM non ha le recensioni. Le verifico io su Google Maps con curl: pagina
  `google.com/maps/search/?api=1&hl=it&query=...` → URL `/search?tbm=map...` → JSON con "N recensioni",
  voto, sito; se contiene "Riapri l'attività" il luogo è segnato chiuso. Verificare SEMPRE prima di
  proporre un lead: su 37 lead OSM, circa 1 su 4 era chiuso o aveva già un sito.
- Contatti, come vuole lavorare: gli do UN lead alla volta (preferibilmente con cellulare) con un
  messaggio WhatsApp personalizzato e il link wa.me con il testo già pronto; l'utente lo invia e, se dice
  "manda un altro" passo al successivo. Segno l'esito nella colonna "Stato contatto" del file in `lead/`.
  Il messaggio è firmato "Mattia": chiedere conferma del nome se non è già confermato.
- Offerta dell'utente (da mettere in ogni messaggio): anteprima del sito totalmente gratuita; se non
  piace non si paga niente, se piace si tratta il prezzo; disponibile per una chiamata, il cliente può
  chiamarlo a quel numero. Il sito di prova si mostra su Zoom. Testo delle chiamate in
  `lead/script-chiamata.md`. Al telefono dice "te ne ho già preparato uno": la bozza va fatta PRIMA della call.
- Lead preferiti (dal 15/10): attività più strutturate, 70–200 recensioni, settori moderni con gestione
  giovane (estetica, nail, parrucchieri/barbieri, palestre, padel, ristoranti/wine bar, centri benessere,
  tatuaggi, officine, autolavaggi/detailing, termoidraulica), non botteghe tradizionali. Serve un
  cellulare su Google per WhatsApp. Lista verificata nel foglio "Lead strutturati". Consegna a blocchi da 10.
  Dal blocco 4: SOLO CENTRO di Roma (entro ~3,5 km da Piazza Venezia), soprattutto ristoranti, wine bar,
  enoteche e attività a cui serve davvero un sito; NO autolavaggi o attività "da quattro soldi" fuori Roma.
  In centro ~55% dei ristoranti ha già un sito: controllarne molti (500+) per trovarne 10.
  Dal blocco 6: MIX di tutti i settori (palestre, pilates, estetica, nail, massaggi, tatuaggi, ristoranti,
  bistrot, officine, studi professionali…) e mix centro/periferia, con gestione giovane (proxy: attivi su
  Instagram/Facebook/Treatwell). Metodo migliore: ricerca DIRETTA su Google Maps "categoria + quartiere"
  (20 risultati per ricerca) con `lead/strumenti/gmaps_search.py` (verifica singola: `lead/strumenti/gcheck.py`): trova molte più attività di OSM.
- Messaggi: seguono lo schema del testo chiamate (cercato su Google, ottime recensioni, nessun sito "come
  mai?", mi occupo di questo, anteprima del sito su Zoom, nessun impegno, se piace si tratta il prezzo,
  può chiamarmi), dando del Lei. Incentivare il "sì": guardare la bozza non costa nulla e non toglie niente,
  basta un sì e gliela manda; se piace si parla di prezzo, se non piace non paga nulla. Inizia con "Salve" e subito dopo: il messaggio è per il titolare, se chi legge non lo è
  lo faccia leggere al titolare (spesso risponde la reception). Poi dice "ho trovato [attività] su Google" (non "ho cercato").
  Formato: una scheda per attività con controllo Google, testo completo e link wa.me ben visibile (no tabelle). Non scrivere "l'ho già preparato" se la bozza non esiste.
- Contenuti del sito proposto (nei messaggi e nelle bozze): includere SEMPRE una parte dedicata al
  titolare: la sua storia, il suo percorso, la sua immagine.
- Presenza online (prima di ogni messaggio): verificare dove è DAVVERO online l'attività e citarlo nel
  messaggio ("l'ho trovata su Google, Instagram, Treatwell…"), solo cose verificate. Fonti: link nella
  scheda Google; WebSearch "nome + via"; pagine Fresha/Treatwell/Playtomic (i dati "sameAs" di Fresha
  danno Instagram e Facebook); domini nome.it/.com confermati solo se riportano lo stesso telefono o
  indirizzo. Nel messaggio scrivere "cercando online non sono riuscito a trovare un vostro sito".
  Citare SEMPRE social/app di prenotazione: se verificati, "vedo che siete già attivi sui social";
  se non verificati, "immagino che siate presenti anche sui social o su qualche app di prenotazione"
  (formula vera in ogni caso, scelta dall'utente per non affermare cose non viste).
  Lezione: Padel CAT sembrava senza sito ma aveva padelcatroma.it; dimensionebellezza.it era di un altro salone.
- LEZIONE (16/10): dopo ~40 messaggi WhatsApp a numeri sconosciuti l'account dell'utente è stato
  limitato da WhatsApp. Non proporre più invii a freddo in serie: primo contatto con telefonata o visita,
  WhatsApp solo dopo un "sì, mi scriva" al telefono, max ~5-10 al giorno, testo breve, niente link.
  In Italia i messaggi commerciali non richiesti richiedono il consenso (Codice privacy art. 130).
- Email ai titolari (quando la reception al telefono dice di scrivere via email): stesso schema dei messaggi
  WhatsApp, citando che la reception ha indicato l'email; firma "Mattia Aquiri, Siti web per attività locali".
  Preferisce che crei la BOZZA in Gmail (non l'invio diretto): la controlla, aggiunge il numero e invia lui.
  Profilo WhatsApp Business: copertine "Grow Online" in `whatsapp/` (usa quella bianca, scritta centrata,
  "Web Design" e "Based in Rome" in basso).
- Brand dell'utente (16/10): nome scelto **MAQ Web Design** (MAQ = Mattia AQuiri), slogan "Grow Online",
  stile: bianco/nero con sfumatura viola→rosa→pesca, font Sora. Dominio maqwebdesign.com libero al 16/10.
  Scartati: nomi con "AQ" (troppe aziende omonime), "Digital Studio". Proposte logo in `brand/`: scelto lo stile "MA sottile + Q spessa sfumata" (varianti in `brand/logo8-varianti.png`).
- Per OGNI lead proposto indica sempre: aperto o chiuso (e l'orario di oggi), numero di recensioni e
  voto su Google, se ha già un sito, e che il telefono coincide con quello su Google.
- Per i siti si usano le skill e i componenti di 21st, più le skill di design del profilo (vedi sopra).
- Semplicità e complessità: 50 e 50. Proponi la soluzione più adatta, ma se è complessa
  offri anche un'alternativa semplice e lascia scegliere all'utente.
