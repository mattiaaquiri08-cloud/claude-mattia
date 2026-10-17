import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { SPLASH } from "../avvio";
import { EASE } from "./ui";

// Apertura di circa 3 secondi: l'insegna si compone e poi la serranda si alza
// (il locale era una carrozzeria). Solo alla prima visita della sessione.
export default function Splash() {
  const ridotto = useReducedMotion();
  const [visibile, setVisibile] = useState(SPLASH);

  useEffect(() => {
    if (!visibile) return;
    try {
      sessionStorage.setItem("100c-splash", "1");
    } catch {
      /* archivio non disponibile */
    }
    document.documentElement.style.overflow = "hidden";
    const fine = setTimeout(() => setVisibile(false), ridotto ? 900 : 2450);
    const chiudi = (e: KeyboardEvent) => e.key === "Escape" && setVisibile(false);
    window.addEventListener("keydown", chiudi);
    return () => {
      clearTimeout(fine);
      window.removeEventListener("keydown", chiudi);
      document.documentElement.style.overflow = "";
    };
  }, [visibile, ridotto]);

  const cifre = ["1", "0", "0"];

  return (
    <AnimatePresence>
      {visibile && (
        <motion.div
          key="splash"
          role="presentation"
          onClick={() => setVisibile(false)}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-insegna"
          exit={ridotto ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: ridotto ? 0.3 : 0.75, ease: [0.7, 0, 0.2, 1] }}
        >
          {/* lamelle della serranda, appena accennate */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "repeating-linear-gradient(180deg, #16213a 0 1px, transparent 1px 26px)",
            }}
          />
          <div className="relative flex flex-col items-center px-6">
            <div className="stretto flex items-baseline text-[clamp(6.5rem,30vw,15rem)] font-[780] leading-[0.82] tracking-[-0.01em]">
              {cifre.map((c, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.04em]">
                  <motion.span
                    className="inline-block text-rosso"
                    initial={ridotto ? false : { y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.75, delay: 0.1 + i * 0.09, ease: EASE }}
                  >
                    {c}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="inline-block text-inchiostro"
                  initial={ridotto ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.42, ease: EASE }}
                >
                  C
                </motion.span>
              </span>
              <motion.span
                className="inline-block text-inchiostro"
                initial={ridotto ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 16, delay: 0.85 }}
              >
                .
              </motion.span>
            </div>
            <motion.div
              aria-hidden="true"
              className="mt-5 h-px w-full origin-left bg-inchiostro/40"
              initial={ridotto ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            />
            <motion.p
              className="stretto mt-4 text-[clamp(1.35rem,5.6vw,2.6rem)] font-[680] uppercase leading-none text-inchiostro"
              initial={ridotto ? false : { opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.12em" }}
              transition={{ duration: 1.1, delay: 0.95, ease: EASE }}
            >
              Vino <span className="text-[0.62em]">e</span> Pesce
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
