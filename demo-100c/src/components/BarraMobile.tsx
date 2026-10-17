import { CalendarCheck, Phone } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { linkTelefono } from "../config";
import { useLingua } from "../lingua";

// Sul telefono, dopo l'hero, prenotare o chiamare resta sempre a un tocco
export default function BarraMobile() {
  const { t } = useLingua();
  const { scrollY } = useScroll();
  const [visibile, setVisibile] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prenota = document.getElementById("prenota")?.getBoundingClientRect();
    const sopraPrenota = prenota ? prenota.top > window.innerHeight * 0.6 || prenota.bottom < 0 : true;
    setVisibile(y > window.innerHeight * 0.8 && sopraPrenota);
  });

  return (
    <AnimatePresence>
      {visibile && (
        <motion.div
          className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <a
            href="#prenota"
            className="semistretto flex min-h-13 items-center justify-center gap-2 bg-rosso text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-insegna shadow-[0_12px_30px_-10px_rgba(15,24,48,0.5)]"
          >
            <CalendarCheck size={20} aria-hidden="true" />
            {t.barra.prenota}
          </a>
          <a
            href={linkTelefono}
            className="semistretto flex min-h-13 items-center justify-center gap-2 bg-inchiostro text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-insegna shadow-[0_12px_30px_-10px_rgba(15,24,48,0.5)]"
          >
            <Phone size={20} aria-hidden="true" />
            {t.barra.chiama}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
