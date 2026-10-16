import { StrictMode } from "react";
import App from "./App";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PaginaSettore } from "./components/PaginaSettore";
import { PaginaGuida } from "./components/PaginaGuida";
import { trovaPagina } from "./pagine";
import { RadiceContext } from "./radice";

// Contenitore di tutte le pagine: la home resta App, le altre usano lo stesso header e footer.
export function Sito({ slug }: { slug: string }) {
  const pagina = trovaPagina(slug);
  if (pagina.tipo === "home") {
    return (
      <StrictMode>
        <RadiceContext.Provider value="./">
          <App />
        </RadiceContext.Provider>
      </StrictMode>
    );
  }
  return (
    <StrictMode>
      <RadiceContext.Provider value="../">
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-notte"
        >
          Vai al contenuto
        </a>
        <Header />
        <main id="contenuto">
          {pagina.tipo === "settore" ? <PaginaSettore pagina={pagina} /> : <PaginaGuida pagina={pagina} />}
        </main>
        <Footer />
      </RadiceContext.Provider>
    </StrictMode>
  );
}
