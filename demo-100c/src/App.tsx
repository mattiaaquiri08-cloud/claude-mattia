import BarraMobile from "./components/BarraMobile";
import Cantina from "./components/Cantina";
import Cucina from "./components/Cucina";
import DoveSiamo from "./components/DoveSiamo";
import Eventi from "./components/Eventi";
import Footer from "./components/Footer";
import Galleria from "./components/Galleria";
import Hero from "./components/Hero";
import Luca from "./components/Luca";
import Manifesto from "./components/Manifesto";
import Menu from "./components/Menu";
import Navigazione from "./components/Navigazione";
import Prenota from "./components/Prenota";
import Recensioni from "./components/Recensioni";
import Splash from "./components/Splash";
import Vino from "./components/Vino";
import { ProviderLingua } from "./lingua";

export default function App() {
  return (
    <ProviderLingua>
      <Splash />
      <Navigazione />
      <main>
        <Hero />
        <Manifesto />
        <Vino />
        <Menu />
        <Cucina />
        <Luca />
        <Cantina />
        <Eventi />
        <Recensioni />
        <Galleria />
        <Prenota />
        <DoveSiamo />
      </main>
      <Footer />
      <BarraMobile />
    </ProviderLingua>
  );
}
