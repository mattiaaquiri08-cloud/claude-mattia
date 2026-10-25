# Font proprietari → alternative gratuite su Google Fonts

Quasi tutti i DESIGN.md di `design-references/` usano font proprietari (non si possono usare nei siti dei
clienti). Sostituiscili con uno di questi, tutti gratuiti su [Google Fonts](https://fonts.google.com).
Scegli guardando il **carattere** del font originale (geometrico, grottesco, umanista, serif editoriale,
condensato), non solo il nome. Controlla sempre su fonts.google.com che il font scelto abbia i pesi che
servono, il corsivo se usato e il sottoinsieme **latin-ext** o almeno le lettere accentate italiane (à è é ì ò ù).

## Sans geometrici e "amichevoli"

| Originale | Alternative Google Fonts |
|---|---|
| Airbnb Cereal, Circular, Euclid Circular A, Pin Sans | Figtree, Plus Jakarta Sans, DM Sans |
| GT Walsheim, Cal Sans, Averta | Outfit, Sora, DM Sans |
| Gotham | Montserrat |
| Degular, Wise Sans, Optimistic | Bricolage Grotesque, Onest, Figtree |
| SF Pro Rounded | Nunito, Nunito Sans |
| Aeonik Pro, arcadiaDisplay | Manrope, Urbanist |

## Grotteschi neutri e precisi

| Originale | Alternative Google Fonts |
|---|---|
| SF Pro / SF Pro Display, Helvetica, Neue Haas Grotesk, Haas Groot Disp | Inter, Inter Tight (titoli), Instrument Sans |
| Söhne (Stripe), Saans, Super Sans, Linear Display | Inter Tight, Hanken Grotesk, Schibsted Grotesk |
| Geist | Geist (è già su Google Fonts) |
| Roobert, abcDiatype, Waldenburg | Space Grotesk, Familjen Grotesk, Hanken Grotesk |
| Notion Sans, Salesforce Sans, hashicorpSans, figmaSans, CohereText | Inter, Public Sans, Work Sans |
| WF Visual Sans, Forma DJR Micro, Sentri Display | Instrument Sans, Red Hat Display |

## Automobili, lusso, sport (larghi, condensati, monumentali)

| Originale | Alternative Google Fonts |
|---|---|
| BMW Type Next, Universal Sans (Tesla), UberMove, FerrariSans | Archivo, Hanken Grotesk, Red Hat Display |
| Bugatti Display, LamboType, NouvelR | Unbounded, Archivo (asse larghezza espansa), Syne |
| Nike Futura ND (condensato maiuscolo) | Anton, Bebas Neue, Oswald, Barlow Condensed |
| Futura (normale) | Jost |
| Vodafone, BinanceNova, PlayStation SST, NVIDIA | Red Hat Display, Archivo Black (titoli), Lexend |
| Titillium Web (Jobright) | Titillium Web (è già su Google Fonts) |

## Serif editoriali

| Originale | Alternative Google Fonts |
|---|---|
| Copernicus (Claude), Tiempos | Newsreader, Fraunces, Source Serif 4 |
| Editorial New (Oura), PP Editorial Old (Mistral) | Instrument Serif, Fraunces, Cormorant Garamond |
| Domaine Display (Resend) | Playfair Display, DM Serif Display |
| WiredDisplay, serif da quotidiano | Playfair Display, Libre Caslon Text, Source Serif 4 |
| Georgia (Oracle) | Lora, Source Serif 4 |

## Monospazio e retrò

| Originale | Alternative Google Fonts |
|---|---|
| Berkeley Mono, SF Mono, Geist Mono | JetBrains Mono, IBM Plex Mono, Geist Mono |
| Arial Black (Dell 1996) | Archivo Black |
| Arial / Times (siti anni '90-2000) | Arimo / Tinos (metricamente uguali) |

## Già su Google Fonts (si usano così come sono)

Inter, Roboto, Open Sans, DM Sans, IBM Plex Sans / Mono, Titillium Web, Geist, Sora.

## Regole

- Al massimo **due famiglie** per sito (una per i titoli e una per il testo, oppure una sola con più pesi).
- Rispetta la gerarchia del DESIGN.md originale: dimensioni, pesi, interlinea, spaziatura tra lettere. Se il
  font sostitutivo è più largo o più stretto, correggi il `letterSpacing` e controlla a occhio sugli screenshot.
- Carica i font da Google Fonts (`<link>` con `display=swap` e `preconnect`) oppure installali con
  `@fontsource/<nome>` (sono gli stessi file di Google Fonts, serviti dal sito). Precarica il font dei titoli
  per evitare salti di impaginazione.
- Mai usare font a pagamento o presi da altri siti, nemmeno "per la bozza".
