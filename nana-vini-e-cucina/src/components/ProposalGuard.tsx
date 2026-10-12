import { Info } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLang } from "../i18n/context";
import { PROPOSAL } from "../lib/mode";

/** Fascia della versione "proposta": sempre visibile, non si chiude. */
export function ProposalBanner() {
  const { t } = useLang();
  if (!PROPOSAL) return null;
  return (
    <div className="flex h-[30px] items-center justify-center bg-petrol-900 px-4 text-center text-[11.5px] font-semibold tracking-[0.04em] text-white/90 [text-shadow:none]">
      <span className="truncate sm:hidden">{t.proposal.bannerShort}</span>
      <span className="hidden truncate sm:inline">{t.proposal.banner}</span>
    </div>
  );
}

/** Nella proposta le prenotazioni e le chiamate non partono: compare un avviso. */
export function ProposalGuard() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!PROPOSAL) return;
    let timer = 0;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:") || href.includes("thefork.")) {
        e.preventDefault();
        e.stopPropagation();
        setVisible(true);
        window.clearTimeout(timer);
        timer = window.setTimeout(() => setVisible(false), 3200);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(timer);
    };
  }, []);

  if (!PROPOSAL) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]" aria-live="polite">
      <AnimatePresence>
        {visible ? (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="flex max-w-md items-center gap-3 rounded-full bg-petrol-900 px-5 py-3 text-[13.5px] leading-snug text-bianco shadow-[0_18px_40px_-16px_rgb(19_35_31/0.7)]"
          >
            <Info size={18} aria-hidden className="shrink-0" />
            {t.proposal.toast}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
