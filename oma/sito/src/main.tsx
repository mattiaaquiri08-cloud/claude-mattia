import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/playfair-display'
import '@fontsource-variable/playfair-display/wght-italic.css'
import '@fontsource-variable/urbanist'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
