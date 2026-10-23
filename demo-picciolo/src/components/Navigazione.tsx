import { EnvelopeSimple, List, Phone, WhatsappLogo, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { CONTATTI, linkEmail, linkTelefono, linkWhatsApp } from "../config";
import { EASE } from "./ui";

const VOCI = [
  { href: "#metodo", testo: "Metodo" },
  { href: "#servizi", testo: "Servizi" },
  { href: "#libro", testo: "Il libro" },
  { href: "#chi-sono", testo: "Chi sono" },
];

export function Marchio() {
  return (
    <span className="flex flex-col leading-none" translate="no">
      <span className="text-[1.05rem] font-semibold tracking-[-0.02em] text-testo">Enrico Picciolo</span>
      <span className="mt-1 text-[0.72rem] font-medium tracking-[0.02em] text-testo-2">
        Consulente finanziario <span className="text-accento">Fineco</span>
      </span>
    </span>
  );
}

export default function Navigazione() {
  const [aperto, setAperto] = useState(false);
  const [scorso, setScorso] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScorso(y > 16));

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
          scorso || aperto ? "bg-sfondo/90 shadow-[0_1px_0_var(--linea)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-4 md:h-[72px] md:px-8">
          <a href="#inizio" aria-label="Enrico Picciolo, torna all'inizio" onClick={() => setAperto(false)}>
            <Marchio />
          </a>

          <ul className="hidden items-center gap-8 text-[0.95rem] lg:flex">
            {VOCI.map((v) => (
              <li key={v.href}>
                <a
                  href={v.href}
                  className="relative py-2 text-testo-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accento after:transition-transform after:duration-300 hover:text-testo hover:after:scale-x-100"
                >
                  {v.testo}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contatti"
              className="hidden min-h-11 items-center rounded-full bg-accento px-5 text-[0.92rem] font-medium text-su-accento transition-colors hover:bg-accento-forte active:scale-[0.98] sm:inline-flex"
            >
              Contattami
            </a>
            <button
              type="button"
              className="-mr-2 flex size-11 items-center justify-center rounded-full text-testo lg:hidden"
              aria-expanded={aperto}
              aria-controls="menu-mobile"
              aria-label={aperto ? "Chiudi il menu" : "Apri il menu"}
              onClick={() => setAperto((a) => !a)}
            >
              {aperto ? <X size={26} /> : <List size={26} />}
            </button>
          </div>
        </nav>
      </header>

      {/* fuori dall'header: il suo backdrop-filter ingabbierebbe il pannello "fixed" */}
      <AnimatePresence>
        {aperto && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-x-0 bottom-0 top-16 z-30 flex flex-col justify-between overflow-y-auto overscroll-contain bg-sfondo px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 md:top-[72px] md:px-8 lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ul>
              {[...VOCI, { href: "#contatti", testo: "Contatti" }].map((v, i) => (
                <motion.li
                  key={v.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.45, ease: EASE }}
                  className="border-b border-linea"
                >
                  <a
                    href={v.href}
                    onClick={() => setAperto(false)}
                    className="block py-4 text-[2rem] font-semibold tracking-[-0.03em] text-testo"
                  >
                    {v.testo}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="text-sm text-testo-2">Parliamone subito</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { href: linkTelefono, testo: "Chiama", Icona: Phone },
                  { href: linkWhatsApp(), testo: "WhatsApp", Icona: WhatsappLogo, esterno: true },
                  { href: linkEmail, testo: "Email", Icona: EnvelopeSimple },
                ].map(({ href, testo, Icona, esterno }) => (
                  <a
                    key={testo}
                    href={href}
                    {...(esterno ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-[20px] bg-superficie text-sm font-medium text-testo shadow-[0_1px_0_var(--linea)] active:scale-[0.98]"
                  >
                    <Icona size={24} className="text-accento" aria-hidden="true" />
                    {testo}
                  </a>
                ))}
              </div>
              <p className="mt-4 text-sm text-testo-2">
                {CONTATTI.telefono} · {CONTATTI.indirizzo}, Roma
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
