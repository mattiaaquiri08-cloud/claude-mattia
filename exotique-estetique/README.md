# Exotique & Estetique, sito web

Sito one-page per **Exotique & Estetique**, centro estetico in Via Giuseppe Calenzuoli 3, La Storta (Roma).

## Avvio

```bash
npm install
npm run dev      # sviluppo su http://localhost:5173
npm run build    # build statica in dist/
npm run preview  # anteprima della build
```

Stack: Vite, React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Lenis, Phosphor Icons.
Font self-hosted: Bodoni Moda (titoli) e Geist (testo).

## Direzione visiva

Tutto parte dalla fotografia del salone:

- **palette**: porcellana delle pareti, nero di cornici e poltrone, rosso lacca della cassettiera e degli smalti (unico accento);
- **forma**: angoli a zero e cornici nere spesse, come gli specchi a tutta altezza;
- **movimento**: la hero si apre da una fessura con le proporzioni di uno specchio; le immagini scendono "a tenda"; i titoli salgono da una maschera; il manifesto si accende parola per parola. Tutto rispetta `prefers-reduced-motion`;
- **tema chiaro e scuro** automatici in base al dispositivo.

Percorso: Hero → Il centro → Trattamenti → Lo spazio (foto esplorabile) → Naomi → Listino → Recensioni → Contatti e prenotazione.

## Contenuti: un solo file

Tutti i dati sono in [`src/content.ts`](src/content.ts), con la fonte di ogni campo. **Nessun dato commerciale è inventato**: i campi non verificabili sono `null` o liste vuote e il sito mostra uno stato dedicato.

| Dato | Stato | Cosa fare |
|---|---|---|
| Indirizzo, servizi offerti | Verificati (Treatwell) | - |
| Prenotazione online Treatwell | Non attiva sul profilo | Le CTA "Prenota ora" aprono una richiesta via WhatsApp/telefono. Se Treatwell viene riattivato, impostare `treatwellBookingUrl` |
| Telefoni 06 3089 1368 e 388 090 3695 | Da directory pubbliche | **Confermare con Naomi**, e verificare che il cellulare usi WhatsApp |
| Orari | Non verificati | Compilare `business.hours` |
| Prezzi e durate | Non verificati | Compilare `price` e `duration` di ogni servizio dal listino Treatwell |
| Recensioni e valutazione | Non verificate | Compilare `reviews` e `rating` copiando testi reali da Google/Treatwell |
| Foto di Naomi | Non disponibile | Salvare `src/assets/photo/naomi.webp` e impostare `naomiPhoto` |

I testi della sezione Naomi (filosofia del centro) sono una proposta da far approvare alla titolare.

## Immagini

`src/assets/photo/` contiene la foto del salone in versioni responsive (AVIF/WebP) e i ritagli dei dettagli usati nelle sezioni. Tutte provengono dalla fotografia fornita: nessuna immagine stock o generata.
