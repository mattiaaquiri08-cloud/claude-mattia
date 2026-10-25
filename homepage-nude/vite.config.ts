import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

/*
 * I contenuti (prezzi, orari, recensioni, foto) vengono dal sito principale
 * in ../exotique-estetique: una sola fonte per i dati reali.
 */
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: { fs: { allow: ['..'] } },
})
