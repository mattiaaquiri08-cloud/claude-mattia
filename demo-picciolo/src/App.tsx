import Approccio from "./components/Approccio";
import ChiSono from "./components/ChiSono";
import Contatti from "./components/Contatti";
import Footer from "./components/Footer";
import Garanzie from "./components/Garanzie";
import Hero from "./components/Hero";
import Libro from "./components/Libro";
import MenuContatti from "./components/MenuContatti";
import Metodo from "./components/Metodo";
import Navigazione from "./components/Navigazione";
import Servizi from "./components/Servizi";
import Splash from "./components/Splash";
import Subito from "./components/Subito";
import { MotivoProvider } from "./components/ui";

export default function App() {
  return (
    <MotivoProvider>
      <Splash />
      <a
        href="#approccio"
        className="sr-only z-50 rounded-full bg-accento px-4 py-2 text-su-accento focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Vai al contenuto
      </a>
      <Navigazione />
      <main>
        <Hero />
        <Garanzie />
        <Approccio />
        <Subito />
        <Metodo />
        <Servizi />
        <Libro />
        <ChiSono />
        <Contatti />
      </main>
      <Footer />
      <MenuContatti />
    </MotivoProvider>
  );
}
