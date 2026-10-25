---
name: nuovo-sito
description: >-
  Crea un nuovo sito (o una bozza/demo) per un cliente di MAQ Web Design partendo da uno stile reale
  della raccolta `design-references/` (84 DESIGN.md di siti famosi). Capisce il settore dell'attività,
  propone i 2-3 DESIGN.md più adatti con una riga di spiegazione ciascuno, adatta lo stile scelto ai
  colori del cliente con soli font gratuiti di Google Fonts e costruisce il sito con la skill
  design-taste-frontend, responsive e in italiano. Usala ogni volta che l'utente chiede un nuovo sito,
  una bozza, una demo o un'anteprima per un'attività ("fammi il sito per…", "nuovo sito per…",
  "prepara la bozza per…", "demo per il ristorante…").
---

# Nuovo sito per un cliente

Flusso in sei passi. I passi 1-3 sono veloci e si fanno sempre, anche quando l'utente ha fretta: il passo
3 si ferma finché l'utente non sceglie lo stile. Rispondi in italiano e chiama l'utente "signore", come
dice il `CLAUDE.md`.

File di questa skill:
- `design-references/INDICE.md` (nella radice del repo) — gli 84 stili raggruppati per carattere, con i
  settori a cui si adattano. È la prima cosa da leggere al passo 2.
- `design-references/<cartella>/DESIGN.md` — il sistema completo di uno stile (colori, tipografia,
  componenti, spaziature, regole). `README.md` nella stessa cartella ha il link all'anteprima su getdesign.md.
- `.claude/skills/nuovo-sito/font-google.md` — tabella font proprietari → alternative su Google Fonts.

## 1. Capire il cliente e il settore

Ricava dalla richiesta: nome dell'attività, **settore**, quartiere o città, e cosa esiste davvero (scheda
Google con recensioni, Instagram, foto, logo, menù, listino). Se l'attività è nei file di `lead/` o in
un ramo `claude/...` recente, leggi lì quello che sai già (`git fetch` e
`git log --all --since="3 days ago"`, come dice il `CLAUDE.md`). Per i dati Google usa
`lead/strumenti/gcheck.py` se c'è.

- Se il settore si capisce dalla richiesta o dal nome ("Trattoria da Mario", "Barber Shop Pigneto"),
  dichiaralo in una riga e vai avanti.
- Se il settore **manca** e non si deduce, chiedilo con `AskUserQuestion` (opzioni: i settori più
  probabili; l'utente può sempre scrivere "Altro"). Non fare altre domande che puoi risolvere da solo.

Annota anche il **carattere** dell'attività, che conta quanto il settore: fascia (popolare, media, alta),
gestione (tradizionale o giovane), colori già suoi (insegna, logo, divise, arredo, foto su Instagram),
e se ci sono **foto vere** di buona qualità. Alcuni stili reggono solo con foto forti (`tesla`, `nike`,
`spacex`, `apple`): senza foto scartali.

## 2. Scegliere i 2-3 DESIGN.md più adatti

1. Leggi `design-references/INDICE.md` e fai una prima lista di 4-6 candidati per settore e carattere.
2. Di ogni candidato apri `DESIGN.md` e leggi l'inizio (descrizione o "Visual Theme & Atmosphere") per
   confermare che l'atmosfera regga il cliente: una trattoria di quartiere non è un ristorante stellato,
   un barbiere giovane non è una sartoria di lusso.
3. Tieni i **2-3** migliori, **diversi tra loro** (per esempio uno caldo e chiaro, uno scuro e
   cinematografico, uno più audace), così la scelta è vera. Metti per primo quello che consiglieresti.

Non scegliere mai uno stile per il nome del marchio ("è Apple, quindi è bello"): conta solo se il suo
linguaggio visivo racconta questo cliente.

## 3. Proporli all'utente e aspettare la scelta

Proponili con `AskUserQuestion`: una domanda, un'opzione per stile.
- `label`: il nome della cartella (es. `oura`), con " (consigliato)" sul primo.
- `description`: **una riga** che spiega perché è adatto a questo cliente, in parole semplici (es. "Fondo
  crema e titoli serif eleganti: dà al centro estetico un'aria calda e curata").

Nel messaggio prima della domanda metti, per ogni stile, il link all'anteprima che trovi nel suo
`README.md` (`https://getdesign.md/<cartella>/design-md`), così l'utente può vederlo. Poi **fermati**: non
costruire nulla finché l'utente non ha scelto. Se scrive un'altra cartella o chiede altri stili, rifai il
passo 2.

## 4. Adattare lo stile scelto al cliente

Leggi **tutto** il `DESIGN.md` scelto. Poi scrivi nella cartella del progetto un `DESIGN.md` adattato
(es. `demo-<nome>/DESIGN.md`): diventa la fonte unica di colori, font e componenti per tutto il lavoro.
In cima scrivi da quale stile deriva e cosa hai cambiato.

**Colori.** Dello stile originale tieni la *struttura*: quanti colori, i ruoli (fondo, testo, accento,
superfici, bordi), le proporzioni (es. "un solo accento, usato pochissimo"), chiaro o scuro, il contrasto.
Sostituisci i colori di marchio con quelli del cliente: logo, insegna, arredo, materiali, foto. Se il
cliente non ha colori suoi, ricavali dal settore e dal luogo (il tufo, il travertino, il verde di una
bottega, il rame di un'enoteca), coerenti con l'atmosfera dello stile scelto. Controlla che testo e
pulsanti abbiano contrasto WCAG AA (4,5:1 per il testo normale, 3:1 per i titoli grandi).

**Font.** Solo font **gratuiti di Google Fonts**. Sostituisci ogni font proprietario con
`font-google.md`, mantenendo dimensioni, pesi, interlinea e spaziatura del sistema originale. Al massimo
due famiglie. Verifica che il font abbia le lettere accentate italiane.

**Cosa togliere.** Nomi di prodotti, loghi, slogan e riferimenti al marchio da cui deriva lo stile: si
prende il linguaggio visivo, mai l'identità di un'altra azienda.

**Cosa tenere.** Raggi degli angoli, forma dei pulsanti, ombre, spaziature, griglia, comportamento al
passaggio del mouse, ritmo delle sezioni: è quello che rende lo stile riconoscibile.

## 5. Costruire il sito con design-taste-frontend

Invoca la skill `design-taste-frontend` (con lo strumento Skill) e segui la sua procedura dall'inizio,
con queste regole in più:

- Al passo "Draw the direction" passa `--keep palette,type`: palette e font li decide il `DESIGN.md`
  adattato, la skill decide composizione, sezioni, idea, testi e immagini. Mappa i colori e i font del
  `DESIGN.md` adattato sui ruoli del foglio di direzione.
- Componenti (pulsanti, schede, menu, moduli) come li descrive il `DESIGN.md` adattato. Se una sua regola
  va contro le regole della casa di design-taste-frontend, vince design-taste-frontend, tranne quando è
  il tratto che rende lo stile riconoscibile: in quel caso tienila e scrivilo nel resoconto.
- **In italiano**: tutti i testi, `lang="it"`, date, orari e prezzi in formato italiano (es. "12,50 €",
  "lun–ven 9:00–19:30"). Tono adatto al cliente.
- **Responsive**: pensato prima per il telefono (la maggior parte dei clienti arriva da Google Maps sul
  cellulare), poi tablet e computer. Controlla gli screenshot a 375, 768 e 1440 px: niente scorrimento
  orizzontale, testi leggibili, pulsanti facili da toccare (almeno 44 px).
- Valgono le regole del `CLAUDE.md` per siti e bozze: cerca nel catalogo 21st prima di scrivere un
  componente da zero, animazioni con Motion (`motion/react`), una sezione dedicata al titolare (storia,
  percorso, immagine), solo contenuti veri (niente recensioni, numeri o clienti inventati), foto dei
  clienti nelle recensioni Google mai usate. Per le bozze dimostrative: modello `demo-100c` (Vite + React
  + Tailwind v4 + Motion, sul ramo `claude/friendly-cray-in10av`), footer "Concept dimostrativo… non ufficiale" e `noindex`.
- Semplicità e complessità 50 e 50: se il cliente non ha bisogno di una app React (per esempio una pagina
  sola), proponi anche la versione semplice in HTML/CSS e lascia scegliere all'utente.

## 6. Controlli finali e consegna

1. Esegui la build e guarda gli screenshot finali (telefono e computer) prima di dire che è pronto.
2. Controllo con `21st-ui-review` o `web-design-guidelines` (accessibilità, responsive, coerenza).
3. Commit sul ramo della sessione insieme al `DESIGN.md` adattato. La pubblicazione (GitHub Pages, ramo
   `gh-pages`, una cartella per attività) si fa solo se l'utente lo chiede.
4. Resoconto breve all'utente: stile di partenza, colori e font scelti (con il motivo), cosa contiene il
   sito, cosa manca (foto, testi da confermare col titolare), link o percorso per vederlo.
5. Se hai imparato qualcosa che vale anche in futuro (uno stile che funziona per un settore, uno che non
   regge), aggiornalo nel `CLAUDE.md` e, se serve, nell'`INDICE.md`.
