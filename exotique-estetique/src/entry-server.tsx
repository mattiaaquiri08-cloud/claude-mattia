import { renderToString } from 'react-dom/server'
import App from './App'
import { business, categories, highlights } from './content'

/* Usato solo in fase di build: HTML statico della pagina e dati per i motori di ricerca. */
export function render() {
  return renderToString(<App />)
}

export { business, categories, highlights }
