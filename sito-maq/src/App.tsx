import { Splash } from "./components/Splash";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Settori } from "./components/Settori";
import { TrovatiSuGoogle } from "./components/TrovatiSuGoogle";
import { ChiSono } from "./components/ChiSono";
import { Numeri } from "./components/Numeri";
import { Servizi } from "./components/Servizi";
import { Metodo } from "./components/Metodo";
import { Perche } from "./components/Perche";
import { Domande } from "./components/Domande";
import { Contatti } from "./components/Contatti";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Splash />
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-notte"
      >
        Vai al contenuto
      </a>
      <Header />
      <main id="contenuto">
        <Hero />
        <Settori />
        <TrovatiSuGoogle />
        <ChiSono />
        <Numeri />
        <Servizi />
        <Metodo />
        <Perche />
        <Domande />
        <Contatti />
      </main>
      <Footer />
    </>
  );
}
