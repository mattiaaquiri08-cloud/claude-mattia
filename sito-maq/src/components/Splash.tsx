import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ScrittaMaq } from "./ScrittaMaq";

const DURATA_MS = 2600;
const CHIAVE = "maq-splash";

function giaVista() {
  try {
    return sessionStorage.getItem(CHIAVE) === "1";
  } catch {
    return false;
  }
}

// Schermata d’apertura: il logo compare, la barra sfumata si apre dal centro
// verso i lati, poi appare lo slogan. Si vede solo la prima volta che si apre il sito;
// passando da una pagina all’altra non riappare (vedi anche lo script in index.html).
export function Splash() {
  const ridotto = useReducedMotion();
  const [visibile, setVisibile] = useState(true);

  useEffect(() => {
    if (giaVista()) {
      // qui e non nello stato iniziale: l'HTML già pronto contiene sempre la splash
      // oxlint-disable-next-line react/set-state-in-effect
      setVisibile(false);
      return;
    }
    try {
      sessionStorage.setItem(CHIAVE, "1");
    } catch {
      // senza memoria del browser la splash si vede a ogni apertura
    }
  }, []);

  useEffect(() => {
    if (!visibile) return;
    const t = window.setTimeout(() => setVisibile(false), ridotto ? 600 : DURATA_MS);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [visibile, ridotto]);

  const facile = [0.2, 0.7, 0.2, 1] as const;

  return (
    <AnimatePresence>
      {visibile && (
        <motion.div
          key="splash"
          className="splash-maq fixed inset-0 z-50 flex items-center justify-center bg-notte"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div className="inline-flex flex-col scale-[0.62] sm:scale-100">
            <div className="flex items-center gap-9">
              <motion.span
                className="text-[120px] leading-[1.1] tracking-[0.02em] whitespace-nowrap"
                initial={ridotto ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: facile }}
              >
                <ScrittaMaq />
              </motion.span>
              <motion.span
                className="w-px self-stretch my-7 bg-white/20"
                initial={ridotto ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              />
              <motion.span
                className="uppercase text-tenue text-[22px] tracking-[0.34em] leading-[1.75]"
                initial={ridotto ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                Web
                <br />
                Design
              </motion.span>
            </div>
            <motion.span
              className="mt-4 block h-px sfondo-sfumato origin-center"
              initial={ridotto ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.span
              className="mt-4 text-center uppercase font-light text-tenue text-[16px] tracking-[0.38em] pl-[0.38em] whitespace-nowrap"
              initial={ridotto ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.35 }}
            >
              Grow Online / Roma
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
