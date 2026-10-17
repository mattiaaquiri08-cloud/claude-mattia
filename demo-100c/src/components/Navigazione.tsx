import { List, Phone, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { LOCALE } from "../config";
import { useLingua, type Lingua } from "../lingua";
import { EASE, Marchio } from "./ui";

export function SceltaLingua({ chiara = false }: { chiara?: boolean }) {
  const { lingua, cambia, t } = useLingua();
  return (
    <div role="group" aria-label={t.nav.lingua} className="semistretto flex items-center text-[0.85rem] font-semibold">
      {(["it", "en"] as Lingua[]).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className={`px-1 ${chiara ? "text-insegna/40" : "text-inchiostro/30"}`}>/</span>}
          <button
            type="button"
            onClick={() => cambia(l)}
            aria-pressed={lingua === l}
            lang={l}
            aria-label={l === "it" ? "Italiano" : "English"}
            className={`min-h-11 min-w-9 px-1 uppercase tracking-[0.08em] transition-colors ${
              lingua === l
                ? chiara
                  ? "text-insegna underline decoration-rosso decoration-2 underline-offset-[6px]"
                  : "text-inchiostro underline decoration-rosso decoration-2 underline-offset-[6px]"
                : chiara
                  ? "text-insegna/55 hover:text-insegna"
                  : "text-inchiostro/50 hover:text-inchiostro"
            }`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}

export default function Navigazione() {
  const { t } = useLingua();
  const [aperto, setAperto] = useState(false);
  const [scorso, setScorso] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScorso(y > 24));

  const voci = [
    { href: "#vino", testo: t.nav.vino },
    { href: "#menu", testo: t.nav.menu },
    { href: "#persone", testo: t.nav.storia },
    { href: "#eventi", testo: t.nav.eventi },
    { href: "#dove", testo: t.nav.dove },
  ];

  useEffect(() => {
    if (!aperto) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAperto(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", esc);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [aperto]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        scorso || aperto ? "bg-insegna/95 shadow-[0_1px_0_rgba(22,33,58,0.12)] backdrop-blur-md" : "bg-insegna"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 md:h-[72px] md:px-8">
        <a href="#inizio" className="flex items-baseline gap-2.5" aria-label="100C Vino e Pesce, torna all'inizio">
          <Marchio className="text-[2.1rem]" />
          <span className="stretto hidden text-[0.95rem] font-[650] uppercase tracking-[0.14em] text-inchiostro sm:inline">
            Vino <span className="text-[0.75em]">e</span> Pesce
          </span>
        </a>

        <ul className="semistretto hidden items-center gap-7 text-[0.92rem] font-medium uppercase tracking-[0.08em] lg:flex">
          {voci.map((v) => (
            <li key={v.href}>
              <a
                href={v.href}
                className="relative py-2 text-inchiostro/80 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-rosso after:transition-transform after:duration-300 hover:text-inchiostro hover:after:scale-x-100"
              >
                {v.testo}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 md:gap-5">
          <SceltaLingua />
          <a
            href="#prenota"
            className="semistretto hidden min-h-11 items-center bg-rosso px-5 text-[0.9rem] font-semibold uppercase tracking-[0.08em] text-insegna transition-colors hover:bg-rosso-scuro active:scale-[0.98] md:inline-flex"
          >
            {t.nav.prenota}
          </a>
          <button
            type="button"
            className="-mr-2 flex size-11 items-center justify-center text-inchiostro lg:hidden"
            aria-expanded={aperto}
            aria-controls="menu-mobile"
            aria-label={aperto ? t.nav.chiudi : t.nav.apri}
            onClick={() => setAperto((a) => !a)}
          >
            {aperto ? <X size={26} weight="regular" /> : <List size={26} weight="regular" />}
          </button>
        </div>
      </nav>
    </header>

      {/* fuori dall'header: il suo backdrop-filter ingabbierebbe il pannello "fixed" */}
      <AnimatePresence>
        {aperto && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-x-0 bottom-0 top-16 z-30 flex flex-col justify-between overflow-y-auto bg-insegna px-4 pb-8 pt-6 md:top-[72px] md:px-8 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <ul className="stretto">
              {[...voci, { href: "#prenota", testo: t.nav.prenota }].map((v, i) => (
                <motion.li
                  key={v.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.5, ease: EASE }}
                >
                  <a
                    href={v.href}
                    onClick={() => setAperto(false)}
                    className={`block py-2.5 text-[2.6rem] font-[700] uppercase leading-none ${
                      v.href === "#prenota" ? "text-rosso" : "text-inchiostro"
                    }`}
                  >
                    {v.testo}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={`tel:${LOCALE.telefono.replace(/\s/g, "")}`}
              className="semistretto mt-8 inline-flex items-center gap-3 text-lg font-semibold text-inchiostro"
            >
              <Phone size={22} />
              {LOCALE.telefono}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
