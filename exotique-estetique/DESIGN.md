# Design System: Exotique & Estetique

Sistema di design del sito di Exotique & Estetique, centro estetico e parrucchiere a La Storta (Roma).
Descrive il sito com'è oggi (`src/index.css` e `src/components/`) ed è la fonte unica da seguire
per ogni nuova pagina o sezione, anche se generata con Google Stitch.

Parametri di gusto: **Varianza 7** (asimmetrico ma ordinato), **Movimento 7** (coreografia fluida,
mai invadente), **Densità 3** (arioso, da galleria).

## 1. Atmosfera visiva

Un salone fotografato di sera: pareti porcellana, cornici e poltrone nere, e un solo tocco di
rosso lacca, quello della cassettiera e degli smalti. L'interfaccia è editoriale e calma, con
molto spazio vuoto, titoli serif grandi e righe sottili al posto delle card. La sensazione è quella
di una rivista di bellezza stampata su carta opaca: angoli vivi ovunque (raggio zero, come le
cornici degli specchi), grana leggera fissa sullo sfondo e fotografie reali del centro come
protagoniste. Niente immagini di repertorio, niente decorazioni senza funzione.

## 2. Palette e ruoli

Tema chiaro (predefinito):
- **Carta porcellana** (#F3F2EF) — sfondo principale di tutte le sezioni chiare
- **Carta ombra** (#E8E6E1) — superfici secondarie, fasce alternate, riempimenti delle foto in caricamento
- **Inchiostro** (#151414) — testo principale, pulsanti scuri, cornici. Mai nero puro
- **Inchiostro tenue** (#4B4846) — testi descrittivi, didascalie, metadati
- **Filo** (rgba(21,20,20,0.14)) — righe da 1px che separano voci di listino, sezioni e colonne
- **Rosso lacca** (#B3201C) — l'unico accento: pulsante principale, «&» del logo, stato attivo,
  anello di focus, selezione del testo
- **Avorio su lacca** (#FBF8F5) — testo sopra il rosso lacca

Sezioni notte (hero, splash, fasce scure):
- **Notte** (#151414) e **Notte rialzata** (#1F1D1C) — sfondi scuri
- **Avorio notte** (#EEEBE6) — testo su scuro
- **Cenere** (#A9A49E) — testo secondario su scuro
- **Filo notte** (rgba(238,235,230,0.16)) — righe su scuro

Tema scuro automatico (`prefers-color-scheme: dark`): carta #121111, carta ombra #1C1B1A,
inchiostro #EEEBE6, inchiostro tenue #A9A49E, lacca schiarita **Lacca accesa** (#DD3F33) per
mantenere il contrasto.

Regole: un solo accento, il rosso lacca. Niente grigi freddi accanto a quelli caldi. Niente
gradienti colorati: le sole sfumature ammesse sono i veli scuri sopra la foto della hero, che
servono a leggere il testo.

## 3. Tipografia

- **Display:** `Cormorant Garamond` (variabile, Google Fonts), peso 500 ai corpi medi e 450 ai corpi
  molto grandi. Interlinea molto stretta nei titoli grandi (0.64 nella hero), tracking leggermente
  negativo (-0.025em). Il corsivo serve per la seconda riga dei titoli («su misura.»).
  Ha numeri «all'antica»: sui prezzi va sempre `lining-nums`, anche accanto a `tabular-nums`.
- **Testo:** `Geist` (variabile), 15–17px, interlinea rilassata, massimo 65 caratteri per riga.
  Etichette e pulsanti in maiuscoletto: 12–13px, tracking ampio (0.14–0.22em), peso 500.
- **Scala dei titoli** (sempre con `clamp()`): hero `clamp(3.1rem, 13vw, 8.5rem)`, titoli di
  sezione `clamp(2.6rem, 6vw, 5.25rem)`, titoli di scheda 1.75–2rem.
- **Il simbolo «&»** nel logo è dritto, non corsivo, in rosso lacca.
- **Eccezione consapevole:** la regola generale vieta i serif «Garamond». Qui Cormorant Garamond è
  una scelta esplicita del cliente (preferito a Bodoni Moda) e resta. Non usare Inter, Times o
  font di sistema come display.

## 4. Componenti

- **Pulsanti:** rettangoli ad angoli vivi, altezza 48px, testo in maiuscoletto. Al passaggio del
  mouse un riempimento sale dal basso (500ms, curva expo) e il testo cambia colore; alla pressione
  scala a 0.98. Varianti: lacca (principale), inchiostro, contorno scuro, contorno chiaro sopra
  la foto. Nessun bagliore, nessun cursore personalizzato. Un solo pulsante principale per vista.
- **Card:** quasi assenti. La gerarchia si fa con righe da 1px, spazio vuoto e fotografie. Le
  poche superfici evidenziate (offerte laser e BB Glow) sono rettangoli pieni senza ombra.
- **Listino prezzi:** schede per categoria, voci con nome a sinistra, linea puntinata di guida e
  prezzo a destra in Cormorant con numeri allineati. «da» indica un prezzo minimo.
- **Pannello di prenotazione:** foglio che sale dal basso su mobile e si apre di lato su desktop,
  con la scelta del trattamento e il messaggio WhatsApp già scritto.
- **Barra mobile:** fissa in basso solo su smartphone, compare dopo la hero e sparisce vicino ai
  contatti. Contiene «Prenota ora» e il pulsante per chiamare.
- **Foto in arrivo:** dove manca una foto vera (es. Naomi) si usa una cornice con la dicitura
  «Foto in arrivo», mai un'immagine inventata o di repertorio.
- **Focus:** anello di 2px in rosso lacca, distanziato di 3px.

## 5. Layout

- Contenitore massimo di 1400px, margini laterali di 20px (mobile), 40px (tablet), 64px (desktop).
- Sezioni ariose: 96px di spazio verticale su mobile e 144px da tablet in su.
- Hero a tutto schermo (`min-h-[100svh]`): foto del salone a pieno formato, scelta per mobile
  (verticale) e desktop (orizzontale) con `<picture>`. Il testo è allineato a sinistra e in
  basso, sopra un velo scuro che garantisce il contrasto. È l'unico punto dove testo e immagine
  si sovrappongono, ed è voluto.
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
- Niente nero puro (#000000), niente bagliori al neon, niente viola o blu «da AI».
- Niente angoli arrotondati: il raggio è zero ovunque.
- Niente gradienti sul testo, niente cursori personalizzati.
- Niente tre card uguali in orizzontale.
- Niente testi da riempitivo («Scorri per scoprire», frecce che rimbalzano).
- Niente frasi fatte da marketing («Eleva», «Senza confini», «Esperienza unica»).
- Niente immagini di repertorio o generate: solo foto reali del centro.
