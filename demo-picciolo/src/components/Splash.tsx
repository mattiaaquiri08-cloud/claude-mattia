import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { SPLASH } from "../avvio";
import { EASE } from "./ui";

const NOME = ["Enrico", "Picciolo"];
const CLASSI_NOME =
  "flex flex-wrap justify-center gap-x-[0.28em] text-[clamp(2.9rem,13vw,7rem)] font-semibold leading-[1.02] tracking-[-0.045em]";

// Apertura di circa 2,5 secondi: il nome sale, la barra petrolio si apre dal centro e un fascio
// di luce passa sul nome come quello del faro del sito di Enrico. Poi il pannello si alza.
// Solo alla prima visita della sessione; un tocco o Esc la saltano.
export default function Splash() {
  const ridotto = useReducedMotion();
  const [visibile, setVisibile] = useState(SPLASH);

  useEffect(() => {
    if (!visibile) return;
    try {
      sessionStorage.setItem("picciolo-splash", "1");
    } catch {
      /* archivio non disponibile */
    }
    document.documentElement.style.overflow = "hidden";
    const fine = setTimeout(() => setVisibile(false), ridotto ? 900 : 2000);
    const chiudi = (e: KeyboardEvent) => e.key === "Escape" && setVisibile(false);
    window.addEventListener("keydown", chiudi);
    return () => {
      clearTimeout(fine);
      window.removeEventListener("keydown", chiudi);
      document.documentElement.style.overflow = "";
    };
  }, [visibile, ridotto]);

  return (
    <AnimatePresence>
      {visibile && (
        <motion.div
          key="splash"
          role="presentation"
          onClick={() => setVisibile(false)}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-[#0b2545] text-white"
          exit={ridotto ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: ridotto ? 0.3 : 0.7, ease: [0.7, 0, 0.2, 1] }}
        >
          {/* bagliore di fondo, fermo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(60% 50% at 50% 55%, rgba(92,200,220,0.16), transparent 70%)" }}
          />

          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.p
              className="text-[0.8rem] font-medium uppercase tracking-[0.28em] text-[#8adae8] md:text-[0.9rem]"
              initial={ridotto ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              Consulente finanziario Fineco
            </motion.p>

            {/* il nome, con il fascio di luce che lo attraversa una volta */}
            <div className="relative mt-4">
              <p className={CLASSI_NOME} translate="no">
                {NOME.map((parola, i) => (
                  <span key={parola} className="inline-block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className="inline-block"
                      initial={ridotto ? false : { y: "130%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: EASE }}
                    >
                      {parola}
                    </motion.span>
                  </span>
                ))}
              </p>
              {/* stesso testo sopra, trasparente: solo il riflesso petrolio che scorre resta visibile */}
              {!ridotto && (
                <motion.p
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 ${CLASSI_NOME} bg-clip-text text-transparent`}
                  style={{
                    backgroundImage: "linear-gradient(100deg, transparent 42%, #8adae8 50%, transparent 58%)",
                    backgroundSize: "250% 100%",
                  }}
                  initial={{ backgroundPosition: "150% 0" }}
                  animate={{ backgroundPosition: "-50% 0" }}
                  transition={{ duration: 1.1, delay: 0.85, ease: [0.45, 0, 0.25, 1] }}
                >
                  {NOME.map((parola) => (
                    <span key={parola} className="inline-block pb-[0.06em]">
                      {parola}
                    </span>
                  ))}
                </motion.p>
              )}
            </div>

            {/* barra che si apre dal centro, come nel logo MAQ */}
            <motion.div
              aria-hidden="true"
              className="mt-6 h-[2px] w-[min(70vw,420px)] origin-center rounded-full bg-[#5cc8dc]"
              initial={ridotto ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            />

            <motion.p
              className="mt-6 text-[clamp(1.05rem,4.2vw,1.4rem)] text-white/80"
              initial={ridotto ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
            >
              Obiettivo serenità
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
