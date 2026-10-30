# Istruzioni per Claude

Questo file viene letto all'inizio di ogni sessione. È la memoria permanente del progetto:
tutto ciò che deve valere sempre va scritto qui.

## Lingua

- Rispondi sempre in italiano.
- Rivolgiti sempre all'utente chiamandolo "signore".

## Nuovo sito per un cliente: skill `nuovo-sito`

Quando l'utente chiede un nuovo sito, una bozza o una demo per un'attività, usa SEMPRE la skill
**`nuovo-sito`** (`.claude/skills/nuovo-sito/SKILL.md`): capisce il settore (o lo chiede), propone i 2-3
stili più adatti tra gli 84 DESIGN.md di `design-references/` (indice per settore in
`design-references/INDICE.md`), aspetta la scelta, adatta colori e font al cliente (solo Google Fonts,
tabella in `.claude/skills/nuovo-sito/font-google.md`) e costruisce il sito con `design-taste-frontend`,
responsive e in italiano. Le regole qui sotto (21st, Motion, sezione del titolare…) restano valide.

## Creazione di siti e interfacce: usa 21st

Quando ti viene chiesto di creare un sito, una pagina o un componente UI, usa le skill di 21st:

1. **`21st-ui-explore`** — se la direzione visiva non è decisa, proponi prima alcune varianti.
2. **`21st-ui-build`** — per costruire le pagine partendo dai componenti del catalogo 21st.
3. **`21st-cli-use`** — per cercare (`21st search`) e installare (`21st add`) i componenti.
   Cerca sempre nel catalogo prima di scrivere un componente da zero.
4. **`21st-ui-review`** — alla fine, controlla accessibilità, responsive e coerenza.

Insieme a 21st usa anche queste skill:
- **`design-taste-frontend`** — sempre, per siti, landing page, portfolio, restyling e interfacce. È la
  tasteskill v2.1.5 (github.com/Leonxlnx/taste-skill) salvata nel repo in `.claude/skills/design-taste-frontend/`;
  script con Node 22+ e Chromium (già presente nelle sessioni cloud). Le versioni vecchie del profilo
  (`design-taste-frontend` e `-v1`) sono state disattivate dall'utente il 25/10: non usarle.
- **`impeccable`** — (v4.7.1, github.com/pbakaus/impeccable, nel repo in `.claude/skills/impeccable/`, dal 25/10)
  per revisionare e rifinire un'interfaccia: `audit`, `critique`, `polish`, `typeset`, `layout`, `harden`…
- **`redesign-existing-projects`** — quando si migliora un sito già esistente.
- Skill di stile, solo se l'utente chiede quello stile: `minimalist-ui`, `high-end-visual-design`,
  `industrial-brutalist-ui`, `gpt-taste`.
- **`motion-animations`** — per tutte le animazioni usa Motion (ex Framer Motion): `npm install motion`,
  import da `motion/react`, mai `framer-motion` nei progetti nuovi.
- **`full-output-enforcement`** — scrivi sempre il codice completo, senza segnaposto.
- **`web-design-guidelines`** — alla fine, controlla i file con le linee guida di Vercel.
- Non usare le skill che generano immagini (`imagegen-frontend-*`, `image-to-code`, `brandkit`): qui non
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
  Siti già esistenti: giudicarli da uno SCREENSHOT (Chromium headless, desktop + telefono), mai solo dal testo HTML.
  Lezione 18/10: BIG Cucina e Grill (EUR, big-grill.it su Wix) l'avevo detto "vecchio" dal codice, l'utente l'ha trovato molto bello.
  Lezione: Padel CAT sembrava senza sito ma aveva padelcatroma.it; dimensionebellezza.it era di un altro salone.
- LEZIONE (16/10): dopo ~40 messaggi WhatsApp a numeri sconosciuti l'account dell'utente è stato
  limitato da WhatsApp. Non proporre più invii a freddo in serie: primo contatto con telefonata o visita,
  WhatsApp solo dopo un "sì, mi scriva" al telefono, max ~5-10 al giorno, testo breve, niente link.
  In Italia i messaggi commerciali non richiesti richiedono il consenso (Codice privacy art. 130).
- Email ai titolari (quando la reception al telefono dice di scrivere via email): stesso schema dei messaggi
  WhatsApp, citando che la reception ha indicato l'email; firma "Mattia Aquiri, Siti web per attività locali".
  INVIO EMAIL: sempre da maq.webdesign@outlook.it tramite Zapier (app Microsoft Outlook, azione send_email,
  connessione predefinita già impostata), NON dal vecchio Gmail. Allegati: campo "file" con URL pubblico
  (immagini nel repo pubblico, link raw.githubusercontent.com fissato su un commit). Gmail con alias Outlook
  non funziona (Microsoft ha disattivato SMTP con password). Se dice "manda" invio, altrimenti chiedo prima. Firma: "Mattia Aquiri,
  MAQ Web Design, Siti web per le attività di Roma"; recapito: telefono e WhatsApp +39 328 102 6484, email maq.webdesign@outlook.it (entrambi nel sito dal 16/10).
  Allegati: copiare a mano il base64 non funziona (errori). Le immagini vanno messe nel repo (pubblico) e
  inserite nell'HTML con URL raw.githubusercontent.com fissato su un commit (es. brand/email-anteprima-sito.jpg).
  Profilo WhatsApp Business: copertine "Grow Online" in `whatsapp/` (usa quella bianca, scritta centrata,
  "Web Design" e "Based in Rome" in basso).
- Brand dell'utente (16/10): nome scelto **MAQ Web Design** (MAQ = Mattia AQuiri), slogan "Grow Online",
  stile: bianco/nero con sfumatura viola→rosa→pesca, font Sora. Dominio maqwebdesign.com libero al 16/10.
  Scartati: nomi con "AQ" (troppe aziende omonime), "Digital Studio". Proposte logo in `brand/`: scelto lo stile "MA sottile + Q spessa sfumata" (varianti in `brand/logo8-varianti.png`). Logo definitivo: versione orizzontale "MAQ | Web Design" con barra sfumata sottilissima lunga tutto il logo (sotto MAQ e Web Design) e "Grow Online / Roma" centrato sotto; splash animata in `brand/logo-maq-splash.html` (scelta: barra dal centro); nel sito si vede solo alla prima apertura (sessionStorage), non cambiando pagina.
- Sito personale (16/10): `sito-maq/` (Vite + React + Tailwind v4 + Motion, font Sora), scuro e molto simile a
  edlu.it come richiesto (pillola in alto, titolo centrato, pulsanti sfumati a pillola, schede scure). Testi al "voi",
  solo cose vere: niente numeri inventati, recensioni o clienti finti. Zona: di Roma, lavora in Roma e
  provincia ma è disponibile in tutta Italia (fuori Roma: telefono + bozza su Zoom). Niente "piatto di spaghetti" nel sito. Contatti (WhatsApp, email, Instagram) in
  `sito-maq/src/config.ts`; modulo bozza (16/10): tutti i pulsanti "Richiedi la bozza" portano al modulo (#modulo), che invia
  in automatico un'email con Web3Forms (chiave `CHIAVE_MODULO` in config.ts, pubblica; se vuota apre WhatsApp), con informativa privacy; foto del titolare: `sito-maq/public/mattia.jpg`. Build: `npm run build` in `sito-maq/`. Ordine sezioni home SCELTO DALL'UTENTE (16/10): Hero + nastro settori, Come funziona (4 passi: Mi scrivete → Ci conosciamo → Bozza gratuita → Online), Servizi, Perché serve un sito (SEO, ricerca finta), Chi sono, Domande, Contatti (modulo bozza); ogni sezione ha un'etichetta (`Etichetta` in ui.tsx). Tolte Numeri e Perché. Scroll a scatti: evitare `dvh` (usare `svh`), elementi che cambiano altezza durante animazioni, colonne grid senza `minmax(0,1fr)` (testo lungo le allarga); i font Sora sono precaricati. Menu: cliccando una voce la sezione arriva CENTRATA sotto il menu (`src/scorrimento.ts`), richiesta dell'utente. Scritta MAQ in SVG (`ScrittaMaq.tsx`): il font Sora lascia segni nella stanghetta della A.
  SEO (16/10): obiettivo farsi trovare per "web designer Roma". La build (`npm run build`) genera HTML già pronto per
  ogni pagina (`scripts/prerender.mjs`: titolo, descrizione, canonical, dati strutturati, sitemap.xml, robots.txt).
  Pagine definite in `src/pagine.ts` (home + settori ristoranti, saloni/estetica, palestre + guida "Quanto costa un
  sito web"): per aggiungerne una basta un nuovo oggetto lì. Dominio previsto in `SITO_URL` (config.ts). Mai promettere
  "primi su Google". Prezzi (16/10): sito indicativamente 390–690 €, il preventivo cambia da attività ad attività (nella guida costi, nelle FAQ e nei dati per Google). ONLINE dal 17/10: dominio maqwebdesign.com comprato su Cloudflare (intestato a Mattia, rinnovo automatico);
  sito pubblicato con Cloudflare Workers (progetto "claude-mattia", root `sito-maq`, build `npm run build`, deploy
  `npx wrangler deploy`, config `sito-maq/wrangler.jsonc`, ramo claude/intelligent-albattani-bti0iy): ogni push su quel
  ramo va online da solo. Domini: maqwebdesign.com e www. Search Console verificata (proprietà Dominio), sitemap
  `https://maqwebdesign.com/sitemap.xml` (per le proprietà Dominio serve l'URL completo). Il modulo Web3Forms FUNZIONA (provato
  dall'utente il 18/10 dal sito online); non si può provare dall'anteprima Claude né da questo server (Cloudflare blocca i server). Scheda Google Business "MAQ Web Design" creata il 17/10 (categoria Web Designer, zone Roma + Città
  metropolitana, sede nascosta), spunta blu il 18/10 ma al 20/10 NON compare ancora nelle ricerche pubbliche (Maps "MAQ Web Design" = 0 risultati,
  il profilo diceva "Non visibile pubblicamente"; 2 recensioni 5★); orari, descrizione, logo e copertina
  (`google-business/`) inseriti. Togliere i servizi suggeriti da Google che non fa (app, software). Prossimo passo:
  recensioni vere dai primi clienti. Su iPhone il pannello si apre meglio dall'app Google Maps (Safari dava errore).
  Instagram: @maqwebdesign (17/10), nome profilo "MAQ Web Design | Web Designer Roma"; nel sito (config.ts) e nei dati
  Google (sameAs). Foto profilo: `google-business/foto-profilo-instagram.png`. Icone del sito in `sito-maq/public/`
  (favicon.ico/svg, icon-192/512, apple-touch-icon), link con ?v=2 per forzare l'aggiornamento nei browser.
- Lead "nascosti" (17/10, richiesta dell'utente: attività che nessuno contatta e che l'AI non mostra): artigiani e
  botteghe (sarti, tappezzieri, calzolai, fabbri, fioristi, norcinerie, barberie di paese…) in periferia e provincia,
  12–80 recensioni, voto ≥4,3, nessun sito, cellulare; verificare con WebSearch che online ci sia solo Google. Le
  attività con 150+ recensioni in zone centrali sono già state chiamate da tanti: evitarle.
- Lead da CHIAMARE (dal 17/10): per ogni attività link tel: e sotto il testo di `lead/script-chiamata.md` quasi parola per
  parola (dà del tu), con nome, recensioni e servizi inseriti; "te ne preparo uno" finché la bozza non esiste. Niente WhatsApp.
  Ristoranti appena aperti: ricerca Maps "ristorante/trattoria/bistrot… + quartiere", filtro 3–70 recensioni, voto ≥4,3,
  nessun sito (Linktree/TheFork non contano), va bene anche il fisso. Controllare domini nome.it/.com (KIN Ponte Milvio: "sito in costruzione").
- Bozze dimostrative per i clienti (17/10): prima demo completa `demo-100c/` (100C Vino e Pesce, Centocelle):
  Vite + React + Tailwind v4 + Motion, bilingue IT/EN, splash, menù ed eventi letti da Google Sheets (cartella
  Drive "100C Vino e Pesce - Sito", CSV `export?format=csv&gid=0`, il foglio va condiviso "chiunque col link:
  visualizzatore"), prenotazione con messaggio WhatsApp precompilato, footer "Concept dimostrativo... non
  ufficiale", `noindex`. Codice e istruzioni (`demo-100c/LEGGIMI.md`) sul ramo
  `claude/friendly-cray-in10av`; riusarla come modello per le prossime demo.
  Link demo per i clienti: GitHub Pages, ramo `gh-pages`, una cartella per attività
  (https://mattiaaquiri08-cloud.github.io/claude-mattia/100c/), scelta dell'utente (non sul sito MAQ).
  Messaggio WhatsApp dopo la telefonata (il titolare ha detto sì): "Salve, sono Mattia di MAQ Web Design, ci siamo
  sentiti al telefono. Come d'accordo le mando la bozza…", link come testo, elenco puntato di cosa c'è nella bozza,
  "è una bozza, si sistema insieme", "se le piace le preparo un preventivo su misura", nessun impegno, recapito, firma.
  Foto: le immagini mandate a metà lavoro NON vengono salvate su disco; gli originali delle foto di stampa si
  ritrovano dagli URL negli articoli (Gambero Rosso static.gamberorosso.it, The Foodzilla wp-content). Su Google
  Maps senza browser si leggono solo ~10 foto, tutte dei clienti nelle recensioni: non usarle.
- Ramo principale (25/10): il repo NON ha un ramo `main`; il ramo predefinito ("main" di fatto) è
  `claude/intelligent-albattani-bti0iy`, da cui partono le nuove sessioni e che va online da solo su Cloudflare.
  "Unisci al main" = unire lì (fast-forward), così skill e file nuovi arrivano alle sessioni future.
- Più schede/sessioni di Claude (18/10): NON comunicano tra loro; la memoria comune è questo repo. Ogni sessione lavora
  su un suo ramo `claude/...`: all'inizio fare `git fetch` e guardare gli altri rami recenti (es. `git log --all --since="2 days ago"`)
  per sapere cosa è già stato fatto, e riportare qui le lezioni utili. 100C: bozza fatta e inviata in un'altra sessione.
- Casa MAQ (29-30/10): pagina privata "di vetro" (glassmorphism, luci viola/rosa/pesca, font Sora) da cui l'utente vuole
  lavorare al posto della schermata nera di Claude Code. URL fisso: https://claude.ai/artifact/7mNJKpYPCR3dh9ecbVfbTu .
  Contiene: chiamate di oggi (`al_giorno`, 10), promemoria, lavoro sui siti (commit di tutti i rami), stato dei siti,
  sessioni di Claude dal vivo, lead, e una CHAT CON CLAUDE CODE VERO (connettore "Claude Code Remote": create_session sul
  repo con tag `casa-maq`, send_message, list_events, get_session, list_sessions). Le sessioni nate dalla chat ricevono
  istruzioni di rispondere brevi, in italiano: l'utente legge solo il testo, non gli strumenti, e non può approvare permessi.
  File in `casa-maq/`: `modello.html` (grafica e codice), `dati-manuali.json` (stato dei siti e promemoria),
  `chiamate.json` (lead da chiamare con stato: Da chiamare / Chiamato / Richiamare / Interessato / No), `aggiorna.py`
  (legge Excel + git + JSON e genera `casa.html`, non committato). Aggiornare: `python3 casa-maq/aggiorna.py`, poi Artifact
  read dell'URL e publish con `url` + `file_path` casa-maq/casa.html SENZA `capabilities` (restano quelle salvate).
  Farlo a fine lavoro quando cambia un sito, un lead, una chiamata o un promemoria. Stato siti al 30/10: clienti certi
  OMA ed Exotique & Estetique (Naomi ha firmato il preventivo); in attesa Nanà (Giuseppe), Claudia Fulli (Dario Fulli),
  Da Mario (Valerio); Picciolo (zio) da completare; 100C e FLIPPER tolti dall'elenco.
- Lead "nascosti" per le chiamate (30/10, definizione dell'utente): NON vuol dire periferia, ma GESTIONI NUOVE/giovani
  che cercano chi gli offra questo servizio: ricerca Maps "categoria + quartiere" (`gmaps_search.py`), 12-60 recensioni,
  voto >= 4,8, nessun sito (controllare domini nome.it/.com: Reformer Hub ce l'ha, East End Tattoo "coming soon"),
  cellulare, aperte. Mix di settori e quartieri. Primo blocco di 19 in `casa-maq/chiamate.json`.
- Stile Casa MAQ (30/10, scelto dall'utente): IDENTICA al reel "Glassy Dashboard V5" (foto di soggiorno al tramonto
  `casa-maq/sfondo.jpg` da Unsplash, vetro grigio fumé, barra in alto, dock a sinistra, colori di sistema Mac, font SF)
  con tocco Mac (semafori nelle finestre). Tutto deve essere "meccanico": ogni scheda, colonna, riga, stato o settore si
  apre in un foglio con i dettagli (chi sono i clienti, modifiche per sito/giorno, lead per stato, testo della chiamata
  con esiti da mandare a Claude). La pagina è un file solo (~500 KB con la foto in base64).
  Numeri delle chiamate (30/10, richiesta dell'utente): ogni lead in `chiamate.json` ha un numero FISSO `n` (assegnato
  da aggiorna.py, mai riusato): l'utente dice "il 7 non risponde" invece del nome. Ogni messaggio della chat porta in
  coda un blocco <contesto-casa> con "numero = nome" delle chiamate di oggi (nascosto nella pagina).
  CHAT (30/10, l'utente vuole una VERA pagina di chat, non i commenti): pagina "Chat" dentro la Casa (#chat, dock,
  "Chiedi a Claude"), stile Messaggi del Mac. I messaggi stanno nel database della pagina (capacità `db`, collezione
  `chat`, doc {chi:"io"|"claude", testo, quando ISO}); ogni messaggio dell'utente manda anche un commento "Invia a
  Claude" che sveglia la sessione session_014fGtWeyuJbunQc9Az6duVZ (watch con ArtifactComments). PROTOCOLLO al
  risveglio: ArtifactData list "chat" → messaggi "io" senza risposta; update "chat-stato"/"claude" {scrive:true} (i
  puntini nella pagina); fai il lavoro; ArtifactData set "chat"/<AAAAMMGGhhmmss+suffisso> {chi:"claude", testo, quando};
  poi {scrive:false}. `quando` = ora vera (`date -u`), altrimenti l'ordine dei messaggi si sbaglia. NON rispondere nei
  commenti (l'utente non li vuole). 30/10: l'utente NON vuole vedere le "modifiche ai siti" (commit): tolte dalla pagina. Il connettore "Claude Code Remote" dalla
  pagina non funziona (upstream_error): tolto. Capacità della pagina: comments + db.
- Aggiornamento automatico della Casa MAQ (30/10, richiesto dall'utente): attività programmata "Casa MAQ – aggiornamento
  del mattino" (trig_019sTVUeD4d1kbuaWjhX7gKg), ogni giorno alle 8:40 ora di Roma, che si risveglia nella sessione
  session_014fGtWeyuJbunQc9Az6duVZ: legge gli esiti dalle chat con tag casa-maq, aggiorna chiamate/siti/promemoria,
  cerca nuovi lead se ne restano meno di 20, ripubblica la pagina e fa push sul ramo principale.
  LEZIONE 30/10: la prima versione (trig_01S68gU1gtQE9ACP9z5nGcAd, ora disattivata) apriva una sessione NUOVA ogni
  mattina: quelle sessioni non hanno il repo tra le fonti (push 403 dal proxy) né gli strumenti claude-code-remote,
  quindi i 19 lead trovati il 30/10 non sono stati salvati. Le attività programmate vanno fatte risvegliare in una
  sessione che ha già il repo. Gli esiti delle chiamate l'utente li dice in chat.
- Per OGNI lead proposto indica sempre: aperto o chiuso (e l'orario di oggi), numero di recensioni e
  voto su Google, se ha già un sito, e che il telefono coincide con quello su Google.
- Per i siti si usano le skill e i componenti di 21st, più le skill di design del profilo (vedi sopra).
- Semplicità e complessità: 50 e 50. Proponi la soluzione più adatta, ma se è complessa
  offri anche un'alternativa semplice e lascia scegliere all'utente.
