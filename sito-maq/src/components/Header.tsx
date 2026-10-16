import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { PulsanteBozza } from "./ui";

const VOCI = [
  { href: "#chi-sono", etichetta: "Chi sono" },
  { href: "#servizi", etichetta: "Servizi" },
  { href: "#metodo", etichetta: "Come funziona" },
  { href: "#domande", etichetta: "Domande" },
  { href: "#contatti", etichetta: "Contatti" },
];

export function Header() {
  const [aperto, setAperto] = useState(false);

  useEffect(() => {
    if (!aperto) return;
    const chiudi = (e: KeyboardEvent) => e.key === "Escape" && setAperto(false);
    window.addEventListener("keydown", chiudi);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", chiudi);
      document.body.style.overflow = "";
    };
  }, [aperto]);

  return (
    <header className="sticky top-0 z-40 border-b border-linea bg-notte/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#inizio" className="fuoco rounded-md" aria-label="MAQ Web Design, torna all’inizio">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Menu principale">
          {VOCI.map((v) => (
            <a
              key={v.href}
              href={v.href}
              className="fuoco rounded text-sm text-tenue transition-colors hover:text-testo"
            >
              {v.etichetta}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <PulsanteBozza className="!px-6 !py-3 !text-[11px]" />
        </div>

        <button
          type="button"
          onClick={() => setAperto(true)}
          className="fuoco -mr-2 rounded-lg p-2 text-testo lg:hidden"
          aria-label="Apri il menu"
          aria-expanded={aperto}
          aria-controls="menu-mobile"
        >
          <List size={30} weight="regular" />
        </button>
      </div>

      <AnimatePresence>
        {aperto && (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-notte px-5 pb-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-[76px] items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setAperto(false)}
                className="fuoco -mr-2 rounded-lg p-2"
                aria-label="Chiudi il menu"
              >
                <X size={30} />
              </button>
            </div>
            <nav className="mt-8 flex flex-col" aria-label="Menu principale">
              {VOCI.map((v, i) => (
                <motion.a
                  key={v.href}
                  href={v.href}
                  onClick={() => setAperto(false)}
                  className="fuoco border-b border-linea py-5 text-2xl font-semibold"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.08 }}
                >
                  {v.etichetta}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto">
              <PulsanteBozza largo />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
