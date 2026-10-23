import { ChatCircleText, EnvelopeSimple, NotePencil, Phone, WhatsappLogo, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { linkEmail, linkTelefono, linkWhatsApp } from "../config";

const VOCI = [
  { testo: "Chiama", href: linkTelefono, Icona: Phone },
  { testo: "WhatsApp", href: linkWhatsApp(), Icona: WhatsappLogo, esterno: true },
  { testo: "Email", href: linkEmail, Icona: EnvelopeSimple },
  { testo: "Scrivi un messaggio", href: "#contatti", Icona: NotePencil },
];

// Menu contatti sempre a portata di mano: compare dopo l'apertura e si apre a ventaglio
export default function MenuContatti() {
  const ridotto = useReducedMotion();
  const [visibile, setVisibile] = useState(false);
  const [aperto, setAperto] = useState(false);
  const radice = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    // nascosto in cima (c'è già il pulsante nel menu) e quando si è già nella sezione contatti
    const contatti = document.getElementById("contatti")?.getBoundingClientRect();
    const dentroContatti = contatti ? contatti.top < window.innerHeight * 0.5 && contatti.bottom > 0 : false;
    const mostra = y > window.innerHeight * 0.6 && !dentroContatti;
    setVisibile(mostra);
    if (!mostra) setAperto(false);
  });

  useEffect(() => {
    if (!aperto) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAperto(false);
    const fuori = (e: PointerEvent) => !radice.current?.contains(e.target as Node) && setAperto(false);
    window.addEventListener("keydown", esc);
    window.addEventListener("pointerdown", fuori);
    return () => {
      window.removeEventListener("keydown", esc);
      window.removeEventListener("pointerdown", fuori);
    };
  }, [aperto]);

  const molla = ridotto ? { duration: 0 } : { type: "spring" as const, stiffness: 420, damping: 30 };

  return (
    <AnimatePresence>
      {visibile && (
        <motion.div
          ref={radice}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-2 md:bottom-8 md:right-8"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={molla}
        >
          <AnimatePresence>
            {aperto && (
              <motion.ul id="menu-contatti" className="flex flex-col items-end gap-2" aria-label="Contatta Enrico">
                {VOCI.map(({ testo, href, Icona, esterno }, i) => (
                  <motion.li
                    key={testo}
                    initial={{ opacity: 0, y: 16, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: { ...molla, delay: ridotto ? 0 : (VOCI.length - 1 - i) * 0.04 } }}
                    exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }}
                  >
                    <a
                      href={href}
                      onClick={() => setAperto(false)}
                      {...(esterno ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex min-h-12 items-center gap-3 rounded-full bg-superficie py-2 pl-5 pr-2 text-[0.95rem] font-medium text-testo shadow-[0_10px_30px_-12px_rgba(11,37,69,0.45)] ring-1 ring-linea transition-transform hover:-translate-x-0.5 active:scale-[0.98]"
                    >
                      {testo}
                      <span className="flex size-9 items-center justify-center rounded-full bg-velo text-accento">
                        <Icona size={20} aria-hidden="true" />
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setAperto((a) => !a)}
            aria-expanded={aperto}
            aria-controls="menu-contatti"
            className="flex min-h-14 items-center gap-2.5 rounded-full bg-accento pl-5 pr-6 text-[0.98rem] font-medium text-su-accento shadow-[0_14px_34px_-12px_rgba(14,116,144,0.7)] transition-colors hover:bg-accento-forte active:scale-[0.97]"
          >
            <motion.span animate={{ rotate: aperto ? 90 : 0 }} transition={molla} className="flex">
              {aperto ? <X size={22} aria-hidden="true" /> : <ChatCircleText size={22} aria-hidden="true" />}
            </motion.span>
            {aperto ? "Chiudi" : "Contattami"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
