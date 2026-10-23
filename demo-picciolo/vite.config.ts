import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// base relativo: la demo funziona in qualsiasi cartella (es. maqwebdesign.com/demo/100c/)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
