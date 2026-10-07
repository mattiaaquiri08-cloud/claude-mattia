import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
// `npm run build:artifact` crea un unico file HTML (JS, CSS e font inclusi) per l'anteprima condivisa.
export default defineConfig(({ mode }) =>
  mode === 'artifact'
    ? {
        base: './',
        plugins: [react(), tailwindcss(), viteSingleFile()],
        build: { outDir: 'dist-artifact', assetsInlineLimit: 100_000_000 },
      }
    : { plugins: [react(), tailwindcss()] },
)
