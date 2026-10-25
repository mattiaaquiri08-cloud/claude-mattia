# Design System: Exotique & Estetique

Sistema di design del sito di Exotique & Estetique, centro estetico e parrucchiere a La Storta (Roma).
Descrive il sito com'è oggi (`src/index.css` e `src/components/`) ed è la fonte unica da seguire
per ogni nuova pagina o sezione, anche se generata con Google Stitch.

Parametri di gusto: **Varianza 7** (asimmetrico ma ordinato), **Movimento 7** (coreografia fluida,
mai invadente), **Densità 3** (arioso, da galleria).

## 1. Atmosfera visiva

Un salone caldo e accogliente: crema rosata, cacao al posto del nero e un solo tocco di rosa
antico, come uno smalto nude. L'interfaccia è editoriale e calma, con
molto spazio vuoto, titoli serif grandi e pieni e righe sottili al posto delle card. La sensazione è quella
di una rivista di bellezza stampata su carta opaca: angoli vivi ovunque (raggio zero, come le
cornici degli specchi), grana leggera fissa sullo sfondo e fotografie reali del centro come
protagoniste. Niente immagini di repertorio, niente decorazioni senza funzione.

## 2. Palette e ruoli

Palette «nude e rosa antico», scelta dal cliente il 25/10/2026 al posto di nero e rosso lacca.
Nel codice l'accento si chiama ancora `lacca` (nome storico delle variabili CSS).

Tema chiaro (predefinito):
- **Crema rosata** (#F7F1EB) — sfondo principale di tutte le sezioni chiare
- **Nude** (#EEE3D9) — superfici secondarie, fasce alternate, riempimenti delle foto in caricamento
- **Cacao** (#3B2C27) — testo principale, pulsanti scuri, cornici. Mai nero puro
- **Cacao tenue** (#6E5A52) — testi descrittivi, didascalie, metadati
- **Filo** (rgba(59,44,39,0.14)) — righe da 1px che separano voci di listino, sezioni e colonne
- **Rosa antico** (#9E5A55) — l'unico accento: pulsante principale, «&» del logo, stato attivo,
  anello di focus, selezione del testo
- **Avorio su rosa** (#FBF8F5) — testo sopra il rosa antico

Sezioni scure (splash, contatti, card offerta):
- **Cacao** (#3B2C27) e **Cacao rialzato** (#46352F) — sfondi scuri
- **Avorio** (#F4ECE5) — testo su scuro
- **Cipria scura** (#CDBBB0) — testo secondario su scuro
- **Filo chiaro** (rgba(244,236,229,0.18)) — righe su scuro
- **Rosa cipria** (#D99A93) — l'accento su fondo scuro o sopra la foto (la «&» del logo, l'etichetta
  «Offerta»), perché il rosa antico lì non avrebbe contrasto

Tema scuro automatico (`prefers-color-scheme: dark`): sfondo #1F1715, superficie #2A201D, testo
#F4ECE5, testo secondario #CDBBB0, accento rosa cipria #D99A93 con testo cacao #2A1E1B sopra.

Contrasti verificati: cacao su crema 11.9:1, cacao tenue su crema 5.8:1, rosa antico su crema 4.6:1,
avorio su rosa antico 4.9:1.

Regole: un solo accento, il rosa antico. Niente grigi freddi: tutti i neutri tendono al caldo.
Niente gradienti colorati: le sole sfumature ammesse sono i veli cacao sopra la foto della hero,
che servono a leggere il testo.

## 3. Tipografia

- **Display:** `DM Serif Display` (Google Fonts), scelto dal cliente il 25/10/2026 al posto di
  Cormorant Garamond. Un solo peso (400), tratti pieni e contrastati: si legge bene anche sul
  telefono. Interlinea stretta nei titoli grandi (0.78 nella hero), tracking leggermente negativo.
  Il corsivo serve per la seconda riga dei titoli («su misura.»). Numeri sempre `lining-nums`.
- **Testo:** `Geist` (variabile), 15–17px, interlinea rilassata, massimo 65 caratteri per riga.
  Etichette e pulsanti in maiuscoletto: 12–13px, tracking ampio (0.14–0.22em), peso 500.
- **Scala dei titoli** (sempre con `clamp()`): hero `clamp(3.1rem, 13vw, 8.5rem)`, titoli di
  sezione `clamp(2.6rem, 6vw, 5.25rem)`, titoli di scheda 1.75–2rem.
- **Il simbolo «&»** nel logo è dritto, non corsivo, in rosa antico (rosa cipria su scuro).
- Non usare Inter, Times o font di sistema come display.

## 4. Componenti

- **Pulsanti:** rettangoli ad angoli vivi, altezza 48px, testo in maiuscoletto. Al passaggio del
  mouse un riempimento sale dal basso (500ms, curva expo) e il testo cambia colore; alla pressione
  scala a 0.98. Varianti: rosa antico (principale), inchiostro, contorno scuro, contorno chiaro sopra
  la foto. Nessun bagliore, nessun cursore personalizzato. Un solo pulsante principale per vista.
- **Card:** quasi assenti. La gerarchia si fa con righe da 1px, spazio vuoto e fotografie. Le
  poche superfici evidenziate (offerte laser e BB Glow) sono rettangoli pieni senza ombra.
- **Listino prezzi:** schede per categoria, voci con nome a sinistra, linea puntinata di guida e
  prezzo a destra in DM Serif Display con numeri allineati. «da» indica un prezzo minimo.
- **Pannello di prenotazione:** foglio che sale dal basso su mobile e si apre di lato su desktop,
  con la scelta del trattamento e il messaggio WhatsApp già scritto.
- **Barra mobile:** fissa in basso solo su smartphone, compare dopo la hero e sparisce vicino ai
  contatti. Contiene «Prenota ora» e il pulsante per chiamare.
- **Foto in arrivo:** dove manca una foto vera (es. Naomi) si usa una cornice con la dicitura
  «Foto in arrivo», mai un'immagine inventata o di repertorio.
- **Focus:** anello di 2px in rosa antico, distanziato di 3px.

## 5. Layout

- Contenitore massimo di 1400px, margini laterali di 20px (mobile), 40px (tablet), 64px (desktop).
- Sezioni ariose: 96px di spazio verticale su mobile e 144px da tablet in su.
- Hero a tutto schermo (`min-h-[100svh]`): foto del salone a pieno formato, scelta per mobile
  (verticale) e desktop (orizzontale) con `<picture>`. Il testo è allineato a sinistra e in
  basso, sopra un velo scuro che garantisce il contrasto. È l'unico punto dove testo e immagine
  si sovrappongono, ed è voluto.
- Hero su smartphone essenziale e centrata: etichetta, titolo su una sola riga («Bellezza, su
  misura.», 10.4vw) e un pulsante «Prenota ora» al centro, con un velo cacao uniforme sulla foto. Descrizione e «I trattamenti» compaiono da tablet in su.
- Griglie asimmetriche (per esempio 2 + 3 colonne nelle offerte); mai tre card uguali in fila.
- Sotto i 768px tutto collassa in una colonna; le schede del listino scorrono in orizzontale.
- Nessuno scorrimento orizzontale della pagina: provare a 320, 360 e 390px.
- Aree toccabili di almeno 44px.

## 6. Movimento

- Motore: Motion (`motion/react`), scorrimento morbido con Lenis.
- Curve: **expo** `cubic-bezier(0.16, 1, 0.3, 1)` per entrate e pulsanti, **sipario**
  `cubic-bezier(0.76, 0, 0.24, 1)` per aperture e splash. Durate tra 0.5 e 1.1s.
- Titoli rivelati riga per riga da sotto una maschera; immagini che si scoprono come un sipario;
  liste in cascata con piccoli ritardi.
- Splash iniziale di 3 secondi, una volta per sessione del browser.
- `whileInView` va sul contenitore non mascherato, mai sull'elemento traslato dentro un
  `overflow-hidden`, altrimenti l'animazione non parte.
- Si animano solo `transform` e `opacity`. La grana è un livello fisso che non si ridisegna.
- Con «riduci movimento» attivo tutte le animazioni si spengono (`MotionConfig reducedMotion="user"`).

## 7. Da non fare mai

- Nessuna emoji.
- Nessun dato inventato: prezzi solo dal listino cartaceo del centro, orari e recensioni solo da
  Google. Ciò che non è verificato resta vuoto.
- Niente link o recensioni Treatwell; niente foto di Naomi finché non la fornisce lei.
- Niente nero e rosso (palette scartata dal cliente), niente nero puro (#000000), niente bagliori al neon, niente viola o blu «da AI».
- Niente angoli arrotondati: il raggio è zero ovunque.
- Niente gradienti sul testo, niente cursori personalizzati.
- Niente tre card uguali in orizzontale.
- Niente testi da riempitivo («Scorri per scoprire», frecce che rimbalzano).
- Niente frasi fatte da marketing («Eleva», «Senza confini», «Esperienza unica»).
- Niente immagini di repertorio o generate: solo foto reali del centro.
