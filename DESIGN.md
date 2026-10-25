---
version: alpha
name: salone-nude-design-system
description: Sistema di design per un salone di bellezza, adattato dal DESIGN.md di Clay (VoltAgent/awesome-design-md, design-md/clay, licenza MIT). Dal sistema originale tiene la struttura (canvas caldo, CTA scure, card a tinta piena che scandiscono la pagina, footer chiaro, ritmo verticale generoso) e la riveste per l'estetica: toni nude, rosa cipria e crema, titoli in serif elegante e testi in sans-serif pulito, fotografie reali del salone al posto delle illustrazioni 3D.

colors:
  primary: "#3b2a26"
  primary-active: "#2a1d1a"
  primary-disabled: "#e6dbd3"
  ink: "#2e2220"
  body: "#5a4a45"
  body-strong: "#3b2a26"
  muted: "#6f5b55"
  muted-soft: "#a8968e"
  hairline: "#e8ddd4"
  hairline-soft: "#f1e9e2"
  canvas: "#fcf8f3"
  surface-soft: "#f7efe7"
  surface-card: "#f2e6dc"
  surface-strong: "#e8d6c8"
  surface-dark: "#3b2a26"
  surface-dark-elevated: "#4a3631"
  on-primary: "#fcf8f3"
  on-dark: "#fcf8f3"
  on-dark-soft: "#d9c7bd"
  accent: "#a0565a"
  accent-soft: "#c98b8c"
  brand-cipria: "#ebcbc5"
  brand-nude: "#ddbfa8"
  brand-sabbia: "#ede0d0"
  brand-malva: "#d6bcc3"
  brand-pesca: "#f0cdb5"
  brand-cacao: "#3b2a26"
  success: "#5f8a6b"
  warning: "#c08a3e"
  error: "#b4493f"

typography:
  display-xl:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: 84px
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: -1.5px
  display-lg:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: 60px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -1px
  display-md:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: 44px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -0.5px
  display-sm:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.2px
  title-lg:
    fontFamily: "Jost, sans-serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0
  title-md:
    fontFamily: "Jost, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "Jost, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "Jost, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "Jost, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  caption:
    fontFamily: "Jost, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "Jost, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 2px
  button:
    fontFamily: "Jost, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.3px
  nav-link:
    fontFamily: "Jost, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  price:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0

rounded:
  xs: 6px
  sm: 10px
  md: 14px
  lg: 20px
  xl: 28px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 112px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 14px 26px
    height: 48px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 14px 26px
    height: 48px
  button-on-color:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 14px 26px
    height: 48px
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 72px
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xl}"
    padding: 96px
  hero-photo-card:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.xl}"
  service-card-cipria:
    backgroundColor: "{colors.brand-cipria}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 32px
  service-card-nude:
    backgroundColor: "{colors.brand-nude}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 32px
  service-card-sabbia:
    backgroundColor: "{colors.brand-sabbia}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 32px
  service-card-malva:
    backgroundColor: "{colors.brand-malva}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 32px
  service-card-pesca:
    backgroundColor: "{colors.brand-pesca}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 32px
  service-card-cacao:
    backgroundColor: "{colors.brand-cacao}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.xl}"
    padding: 32px
  offer-card:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.xl}"
    padding: 40px
  testimonial-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 28px
  price-row:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
  badge-pill:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 6px 14px
  cta-band:
    backgroundColor: "{colors.brand-cipria}"
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
    rounded: "{rounded.xl}"
    padding: 80px
  footer:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    padding: 80px
---

## Origine

Questo file adatta il DESIGN.md di **Clay** dalla raccolta
[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (cartella `design-md/clay`,
licenza MIT, Copyright (c) 2026 VoltAgent). Dal sistema originale restano:

- canvas caldo su tutta la pagina e footer chiaro, mai scuro;
- CTA primarie scure su fondo chiaro;
- card a tinta piena che si alternano lungo la pagina senza ripetere lo stesso colore due volte di fila;
- titoli display a peso 500, mai più pesanti;
- ritmo verticale ampio tra le sezioni.

Cambiano invece palette, font, raggi e immagini, per un salone di bellezza.

## Overview

Un salone di bellezza caldo e luminoso. La pagina poggia su un **canvas crema** (`{colors.canvas}`, #fcf8f3) con
testo color **cacao** (`{colors.ink}`), non nero. Il carattere viene da tre ingredienti:

1. **Fotografie reali del salone**, con angoli morbidi (`{rounded.xl}`), al posto delle illustrazioni 3D di Clay.
   Le immagini mostrano il posto vero: niente stock.
2. **Card a tinta piena** nei toni nude: cipria, nude, sabbia, malva, pesca e cacao. Ogni categoria di
   trattamento ha la sua tinta.
3. **Titoli in Cormorant Garamond**, serif elegante con un corsivo morbido per la parola da sottolineare.
   Il testo corre in **Jost**, sans-serif geometrico e pulito. Entrambi gratuiti su Google Fonts.

**Caratteristiche chiave**
- Canvas crema, mai grigio freddo.
- CTA primaria cacao (`{colors.primary}`) a pillola; secondaria con solo contorno.
- Un solo accento cromatico per testo e dettagli: `{colors.accent}` (rosa antico, #a0565a), contrasto AA su crema.
- Card servizi a tinta piena a rotazione: cipria → nude → sabbia → malva → pesca → cacao.
- Raggi morbidi: pillola per i bottoni, 20px per le card di contenuto, 28px per card colorate e foto.
- Footer crema (`{colors.surface-soft}`), come in Clay: la pagina chiude in luce.

## Colors

### Accenti e marchio
- **Primary / Cacao** (`{colors.primary}`, #3b2a26): bottoni principali, card scura, offerta in evidenza.
- **Accent / Rosa antico** (`{colors.accent}`, #a0565a): parole in corsivo nei titoli, link, piccoli segni grafici.
  È l'unico accento: non si introducono altri colori forti.
- **Cipria** (`{colors.brand-cipria}`, #ebcbc5): card viso, banda CTA finale.
- **Nude** (`{colors.brand-nude}`, #ddbfa8): card corpo e massaggi.
- **Sabbia** (`{colors.brand-sabbia}`, #ede0d0): card epilazione.
- **Malva** (`{colors.brand-malva}`, #d6bcc3): card mani e piedi.
- **Pesca** (`{colors.brand-pesca}`, #f0cdb5): card sguardo e trucco.
- **Cacao** (`{colors.brand-cacao}`, #3b2a26): card capelli, testo chiaro.

### Superfici
- **Canvas** (`{colors.canvas}`, #fcf8f3): fondo della pagina.
- **Surface Soft** (`{colors.surface-soft}`, #f7efe7): footer, bande secondarie.
- **Surface Card** (`{colors.surface-card}`, #f2e6dc): recensioni, badge, cornici foto.
- **Surface Strong** (`{colors.surface-strong}`, #e8d6c8): bande di enfasi.
- **Hairline** (`{colors.hairline}`, #e8ddd4): bordi da 1px e separatori del listino.

### Testo
- **Ink** (`{colors.ink}`, #2e2220): titoli e testo principale.
- **Body** (`{colors.body}`, #5a4a45): testo corrente.
- **Muted** (`{colors.muted}`, #6f5b55): didascalie, durate, note. Contrasto AA su crema e sulle card chiare.
- **On dark** (`{colors.on-dark}`, #fcf8f3): testo su cacao.

Tutto il testo su card colorate è `{colors.ink}` o `{colors.body}`, tranne su cacao, dove è `{colors.on-dark}`.
L'accento rosa antico si usa su crema, non come testo piccolo sopra le card colorate (contrasto insufficiente).

## Typography

### Famiglie
- **Cormorant Garamond** (Google Fonts) per i titoli display e i prezzi, peso 500, corsivo per la parola chiave.
  Sui prezzi vanno usati i numeri allineati (`font-variant-numeric: lining-nums`): di serie il font usa cifre
  "all'antica" di altezze diverse.
- **Jost** (Google Fonts) per testo, navigazione, bottoni ed etichette, pesi 400 e 500.
- Fallback: `Georgia, serif` per i titoli; `system-ui, sans-serif` per il testo.

### Gerarchia

| Token | Size | Weight | Line Height | Letter Spacing | Uso |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 84px | 500 | 0.95 | -1.5px | Titolo della hero |
| `{typography.display-lg}` | 60px | 500 | 1.0 | -1px | Titoli di sezione |
| `{typography.display-md}` | 44px | 500 | 1.05 | -0.5px | Banda CTA, titoli secondari |
| `{typography.display-sm}` | 32px | 500 | 1.1 | -0.2px | Titoli delle card |
| `{typography.title-lg}` | 22px | 500 | 1.3 | 0 | Sottotitoli, nomi pacchetto |
| `{typography.title-md}` | 18px | 500 | 1.4 | 0 | Introduzioni, card piccole |
| `{typography.body-md}` | 17px | 400 | 1.6 | 0 | Testo corrente |
| `{typography.body-sm}` | 15px | 400 | 1.55 | 0 | Footer, note |
| `{typography.caption-uppercase}` | 12px | 500 | 1.4 | 2px | Etichette di sezione (al massimo una ogni tre sezioni) |
| `{typography.button}` | 15px | 500 | 1.0 | 0.3px | Bottoni |
| `{typography.price}` | 22px | 600 | 1.0 | 0 | Prezzi del listino |

### Principi
- I titoli restano a peso 500: il serif sottile è l'eleganza del sistema, il grassetto la toglie.
- Una sola parola o frase in corsivo per titolo, nel colore `{colors.accent}` oppure nel colore del titolo.
- Niente mescolanza di famiglie nella stessa riga: serif per i titoli, Jost per il resto.

## Layout

### Spaziatura
- Unità di base 4px. Token: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 112 (sezione).
- Tra le sezioni principali `{spacing.section}` (112px desktop, 72px mobile).
- Padding interno delle card colorate `{spacing.xl}` (32px), 24px su mobile.

### Griglia
- Contenuto massimo 1280px, centrato, margini laterali 20px mobile / 40px tablet / 64px desktop.
- Hero con griglia 7/5: titolo, testo e bottoni a sinistra, foto a destra.
- Card servizi in griglia a mosaico (bento) con celle di dimensioni diverse, una per categoria, nessuna cella vuota.
- Sotto 768px ogni griglia diventa una colonna sola.

## Elevation & Depth

| Livello | Trattamento | Uso |
|---|---|---|
| Piatto | Nessuna ombra, nessun bordo | Sezioni, nav, hero |
| Filo | 1px `{colors.hairline}` | Listino, input, card chiare |
| Tinta piena | Card cipria / nude / sabbia / malva / pesca / cacao, senza ombra | Servizi |
| Ombra calda | `0 20px 40px -24px rgb(59 42 38 / 0.25)` | Solo foto in hover e card in primo piano |

La profondità nasce dal contrasto tra crema e tinte piene, non dalle ombre.

## Shapes

| Token | Valore | Uso |
|---|---|---|
| `{rounded.xs}` | 6px | Piccoli segni |
| `{rounded.sm}` | 10px | Input |
| `{rounded.md}` | 14px | Miniature |
| `{rounded.lg}` | 20px | Card recensioni, card chiare |
| `{rounded.xl}` | 28px | Card colorate, foto, banda CTA |
| `{rounded.pill}` | 9999px | Bottoni, badge, schede del listino |

Regola: bottoni e badge sempre a pillola; contenuti sempre arrotondati 20-28px. Niente angoli vivi.

## Components

- **`top-nav`**: crema, 72px, logo testuale in Cormorant a sinistra, voci in Jost al centro, "Prenota ora" a destra.
- **`button-primary`**: cacao a pillola, testo crema, 48px di altezza. Un solo nome per azione su tutta la pagina
  ("Prenota ora" per prenotare).
- **`button-secondary`**: solo contorno 1px ink, a pillola.
- **`hero-band`**: titolo display-xl con una parola in corsivo, sottotitolo di massimo 20 parole, due bottoni,
  foto reale del salone a destra in `hero-photo-card`.
- **`service-card-*`**: una card per categoria di trattamento con nome (display-sm), breve descrizione, prezzo
  "da" e una foto del salone. Colori a rotazione, mai due uguali vicini.
- **`offer-card`**: card cacao per l'offerta in corso, prezzo grande in Cormorant.
- **`testimonial-card`**: recensioni reali in card sabbia, nome abbreviato e fonte.
- **`price-row`**: nome del trattamento, linea puntinata, prezzo in `{typography.price}`, durata sotto in muted.
- **`cta-band`**: banda cipria arrotondata prima del footer con titolo display-md e bottoni.
- **`footer`**: crema, 3-4 colonne (contatti, orari, link), mai scuro.

## Do's and Don'ts

### Do
- Usare solo fotografie reali del salone.
- Alternare le tinte delle card servizi.
- Tenere i titoli a peso 500 con una parola in corsivo.
- Usare l'accento rosa antico con parsimonia: parole chiave, link, piccoli segni.
- Chiudere la pagina con banda cipria e footer crema.

### Don't
- Niente grigi freddi né nero puro: il testo è cacao.
- Niente immagini stock o generate.
- Niente footer scuro.
- Niente gradienti viola, effetti neon o vetro smerigliato.
- Niente trattini lunghi nei testi visibili.
- Niente dati commerciali inventati: prezzi, orari e recensioni solo da fonti reali.

## Responsive Behavior

| Nome | Larghezza | Cambi principali |
|---|---|---|
| Mobile | < 768px | Menu a scomparsa; hero a una colonna con foto sotto il testo; titolo 84 → 46px; card a una colonna; barra "Prenota ora" fissa in basso |
| Tablet | 768–1024px | Card servizi su due colonne |
| Desktop | 1024–1440px | Hero 7/5, mosaico servizi completo |
| Wide | > 1440px | Come desktop, contenuto massimo 1280px |

Aree toccabili di almeno 44 × 44px. Animazioni solo su `transform` e `opacity`, sempre disattivate con
`prefers-reduced-motion`.

## Known Gaps
- Tema scuro non previsto: per scelta il sistema resta crema e luminoso, come l'originale di Clay.
- Le foto attuali del salone hanno risoluzione limitata; servono originali ad alta qualità per la hero.
