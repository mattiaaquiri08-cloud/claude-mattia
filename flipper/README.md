# FLIPPER, il Salva Infradito

Sito ufficiale: un'unica esperienza in cui lo scroll controlla la rotazione di FLIPPER.

```bash
npm install
npm run dev      # sviluppo
npm run build    # produzione in dist/
```

## Come funziona

- **Rotazione**: 200 frame WebP (un giro completo, 1,8° per frame) in `public/frames/d`
  (desktop, 600×990) e `public/frames/m` (mobile, 480×792), disegnati su `<canvas>`.
  Il frame è una funzione diretta della posizione di scroll: fermo se la pagina è ferma,
  all'indietro se si scrolla in su. Tra due frame c'è un crossfade per una rotazione continua.
- **Un solo oggetto**: il canvas è fisso e copia posizione e dimensione di "dock" invisibili
  nel layout (`.sdock` nel palco della storia, `.dock` nei capitoli). Il layout desktop e
  mobile si cambia solo dal CSS.
- **Coreografia**: in `src/main.ts`, `STORY_DOCKS` (dove sta FLIPPER) e `STORY_SPIN`
  (quale angolo mostra) in funzione del progresso della storia. Le frasi hanno
  `data-in`/`data-out` (e `data-in-m`/`data-out-m` per il mobile) nell'HTML.
  Dopo la storia, gli elementi con `data-frame` fanno fermare la rotazione su un angolo
  preciso quando sono al centro dello schermo (0 profilo, 50 fronte, 140 testa a cuore).
- **Caricamento**: frame 0 subito (poster), poi gli altri in ordine "binario".
- **Accessibilità**: con `prefers-reduced-motion` FLIPPER resta fermo sulla testa a cuore
  e cambia posizione con una dissolvenza; senza JavaScript la storia è testo statico.

Per rigenerare i frame da un nuovo video: `scripts/estrai-frame.sh video.mp4`.
