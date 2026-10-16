// Solo per la build: genera l’HTML delle pagine.
// oxlint-disable react/only-export-components
import { renderToString } from "react-dom/server";
import { Sito } from "./Sito";

export { PAGINE } from "./pagine";
export { CONTATTI, NOME, TITOLARE, SITO_URL } from "./config";

export function render(slug: string) {
  return renderToString(<Sito slug={slug} />);
}
