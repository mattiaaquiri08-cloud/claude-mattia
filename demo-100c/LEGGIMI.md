# 100C Vino e Pesce: sito dimostrativo

Bozza non ufficiale preparata da MAQ Web Design da mostrare ai titolari di 100C Vino e Pesce
(Viale delle Orchidee 12, Centocelle, Roma). Vite + React + Tailwind v4 + Motion, font Archivo.

## Comandi

```
npm install
npm run dev      # anteprima locale
npm run build    # sito pronto in dist/ (percorsi relativi: funziona in qualsiasi cartella)
```

## Dove si cambiano le cose

| Cosa | File |
| --- | --- |
| Telefono, WhatsApp, indirizzo, Instagram, Facebook, mappa | `src/config.ts` (`LOCALE`) |
| Orari (anche quelli prenotabili nel modulo) | `src/config.ts` (`ORARI`) |
| Voto e numero di recensioni Google | `src/config.ts` (`GOOGLE`) |
| Fogli Google del menù e degli eventi | `src/config.ts` (`FOGLIO`, `DIMOSTRATIVO`) |
| Tutti i testi in italiano e inglese | `src/testi.ts` |
| Foto della galleria | `src/components/Galleria.tsx` (file in `public/foto/`) |
| Foto di Luca Boccoli | `src/components/Luca.tsx` (`FOTO_LUCA`) |

## Pubblicazione (link per i titolari)

Online con GitHub Pages: https://mattiaaquiri08-cloud.github.io/claude-mattia/100c/
Il ramo `gh-pages` contiene solo il sito pronto, nella cartella `100c/`. Per aggiornarlo:
`npm run build`, copiare `dist/` in `100c/` sul ramo `gh-pages` e fare il push.
Le prossime demo possono stare accanto (`/claude-mattia/nome-attivita/`).

## Menù ed eventi da Google Sheets

Il sito legge due fogli Google (cartella Drive "100C Vino e Pesce - Sito"):

- **100C - Menù del sito**: Categoria, Categoria EN, Piatto, Piatto EN, Descrizione, Descrizione EN,
  Prezzo, Disponibile (sì/no), Ordine.
- **100C - Eventi del sito**: Data (GG/MM/AAAA), Ora, Titolo, Titolo EN, Descrizione, Descrizione EN,
  Immagine (link), Prezzo, Prenotazione (whatsapp, telefono o un link), Pubblica (sì/no).

Come funziona:

1. Ogni foglio va condiviso come **"Chiunque abbia il link: Visualizzatore"** (Condividi > Accesso generale).
   Così il sito può leggerlo, ma solo chi ha l'accesso in modifica può cambiarlo. Nessuna chiave nel codice.
2. In `config.ts` c'è l'ID di ogni foglio (la parte del link tra `/d/` e `/edit`).
   In alternativa si può incollare il link CSV di "File > Condividi > Pubblica sul web".
3. Chi modifica il foglio vede il sito aggiornato al prossimo caricamento della pagina: nessuna
   ripubblicazione. Le colonne EN sono facoltative (se vuote si usa l'italiano).
4. Se il foglio non risponde, il sito mostra l'ultima versione salvata nel browser; se non c'è,
   i dati dimostrativi (`src/dati-demo.ts`), sempre segnalati come tali.
5. Gli eventi con data passata finiscono da soli tra gli "Appuntamenti passati": non vengono mai
   mostrati come futuri.
6. Impostare la lingua del foglio su Italia (File > Impostazioni) così le date restano GG/MM/AAAA.

Quando il locale compila il menù vero: `DIMOSTRATIVO = false` in `config.ts` (toglie gli avvisi "dimostrativo").
Per passare i fogli al locale: in Drive, Condividi > aggiungere l'email del titolare come Editor
(o trasferire la proprietà).

## Prenotazioni

Il modulo (nome, data, orario, persone, telefono, note) apre WhatsApp verso il numero in `config.ts`
con il messaggio già scritto. È una richiesta: il tavolo è confermato quando il locale risponde.
Gli orari proposti seguono `ORARI` (ogni 30 minuti, fino a un'ora prima della chiusura).

## Dati da confermare con il locale

- Orari: quelli di Google (lun-ven 18:30-22:30, sab 12:30-15 e 18:30-22:30, dom 12:30-15).
  Articoli precedenti indicavano lunedì chiuso e venerdì aperto anche a pranzo.
- Indirizzo: Google scrive "Viale delle Orchidee 12", Gambero Rosso "via delle Orchidee 10/12".
- Pagina Facebook (probabile: facebook.com/942531335610180, non verificata): `LOCALE.facebook`.
- Marchio: ricostruito dall'insegna, non è il file ufficiale.
- Foto di Luca Boccoli e di cantina, tavolo sociale, pesce e piatti.

## Fonti dei contenuti

Gambero Rosso (6/1/2026 e intervista del 31/10/2019), The Foodzilla (4/2/2026), Puntarella Rossa
(4/3/2026), Zero.eu, Linkiesta (24/10/2024), scheda Google del locale (ottobre 2026). Le recensioni
sono estratti testuali di recensioni Google reali.
