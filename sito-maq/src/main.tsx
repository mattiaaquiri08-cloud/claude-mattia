import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { Sito } from "./Sito";
import { PAGINE } from "./pagine";
import { attivaScorrimentoCentrato } from "./scorrimento";

const radice = document.getElementById("root")!;
// La pagina è scritta nell’HTML già pronto; in sviluppo la ricavo dall’indirizzo.
const slug =
  radice.dataset.pagina ?? PAGINE.find((p) => p.slug && window.location.pathname.includes(`/${p.slug}`))?.slug ?? "";

// Le pagine si aprono sempre dall'inizio (anche dentro l'anteprima di Claude, che altrimenti
// mantiene la posizione di scorrimento della pagina precedente). Tornando indietro resta la posizione salvata.
const navigazione = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
if (!window.location.hash && navigazione?.type !== "back_forward") {
  const inCima = () => {
    const html = document.documentElement;
    html.style.scrollPaddingTop = "0px"; // lo spazio per il menu servirebbe solo per le ancore
    window.scrollTo(0, 0);
    html.scrollIntoView({ block: "start", behavior: "instant" });
    html.style.scrollPaddingTop = "";
  };
  inCima();
  window.addEventListener(
    "load",
    () => {
      inCima();
      setTimeout(inCima, 150);
    },
    { once: true },
  );
}

attivaScorrimentoCentrato();

// chi entra nel sito da una pagina interna l'ha già "aperto": tornando alla home niente splash
if (slug) {
  try {
    sessionStorage.setItem("maq-splash", "1");
  } catch {
    // memoria del browser non disponibile
  }
}

if (radice.hasChildNodes()) {
  hydrateRoot(radice, <Sito slug={slug} />);
} else {
  createRoot(radice).render(<Sito slug={slug} />);
}
