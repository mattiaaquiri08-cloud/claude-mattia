import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Percorsi relativi: il sito funziona anche in una sottocartella (GitHub Pages, Netlify, ecc.)
  base: './',
  plugins: [react(), tailwindcss()],
})
