import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { Sito } from "./Sito";
import { PAGINE } from "./pagine";

const radice = document.getElementById("root")!;
// La pagina è scritta nell’HTML già pronto; in sviluppo la ricavo dall’indirizzo.
const slug =
  radice.dataset.pagina ??
  PAGINE.find((p) => p.slug && window.location.pathname.includes(`/${p.slug}`))?.slug ??
  "";

if (radice.hasChildNodes()) {
  hydrateRoot(radice, <Sito slug={slug} />);
} else {
  createRoot(radice).render(<Sito slug={slug} />);
}
