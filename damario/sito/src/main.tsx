import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/cormorant-garamond'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/hanken-grotesk'
import './index.css'
import App from './App.tsx'

// Direzione visiva in prova: ?tema=vino (predefinita), ?tema=oliva, ?tema=tovaglia
const tema = new URLSearchParams(location.search).get('tema')
if (tema === 'oliva' || tema === 'tovaglia') document.documentElement.dataset.theme = tema

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
