import { createContext, useContext } from "react";

// Percorso relativo verso la cartella principale del sito: "./" nella home, "../" nelle altre pagine.
// Così il sito funziona sia sul dominio sia aprendo i file in anteprima.
export const RadiceContext = createContext("./");

export function useRadice() {
  return useContext(RadiceContext);
}

// Link a una sezione della home (es. "chi-sono"): nella home resta "#chi-sono".
export function useAncora() {
  const radice = useRadice();
  return (id: string) => (radice === "./" ? `#${id}` : `${radice}#${id}`);
}

// Link a un’altra pagina del sito.
export function useLinkPagina() {
  const radice = useRadice();
  return (slug: string) => (slug ? `${radice}${slug}/` : radice);
}
