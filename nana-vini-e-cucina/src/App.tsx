import { MotionConfig } from "motion/react";
import { BookingDialog } from "./components/BookingDialog";
import { BookingProvider } from "./components/booking";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Menu } from "./components/Menu";
import { Reviews } from "./components/Reviews";
import { Splash } from "./components/Splash";
import { Story } from "./components/Story";
import { Visit } from "./components/Visit";
import { LangProvider } from "./i18n/context";
import type { Lang } from "./i18n/dictionaries";

export default function App({ lang }: { lang: Lang }) {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider initialLang={lang}>
        <BookingProvider>
          <Splash />
          <Header />
          <main id="contenuto" tabIndex={-1} className="outline-none">
            <Hero />
            <Story />
            <Menu />
            <Gallery />
            <Reviews />
            <Visit />
          </main>
          <Footer />
          <BookingDialog />
        </BookingProvider>
      </LangProvider>
    </MotionConfig>
  );
}
