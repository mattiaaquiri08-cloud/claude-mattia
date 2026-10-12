import { ArrowUpRight, Check, Copy, ForkKnife, Phone, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { SITE } from "../data/site";
import { useLang } from "../i18n/context";
import { useModal } from "../lib/useModal";
import { useBooking } from "./booking";
import { Sprig } from "./Botanical";

export function BookingDialog() {
  const { isOpen, close } = useBooking();
  return <AnimatePresence>{isOpen ? <BookingPanel onClose={close} /> : null}</AnimatePresence>;
}

function BookingPanel({ onClose }: { onClose: () => void }) {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  useModal(ref, true, onClose);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(SITE.phone.display);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* appunti non disponibili: il numero resta comunque visibile */
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-petrol-950/55 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="prenota-titolo"
        aria-describedby="prenota-intro"
        className="relative w-full max-w-[34rem] overflow-hidden rounded-t-[28px] bg-crema px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-ink shadow-[0_30px_80px_-20px_rgb(15_38_34/0.55)] sm:rounded-[28px] sm:px-10 sm:pt-10 sm:pb-10"
        initial={{ y: "100%", opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 600) onClose();
        }}
      >
        <div aria-hidden className="mx-auto mb-5 h-1 w-10 rounded-full bg-petrol-600/25 sm:hidden" />
        <Sprig className="pointer-events-none absolute -top-1 right-12 hidden w-36 text-petrol-300 sm:block" />

        <button
          type="button"
          onClick={onClose}
          aria-label={t.booking.close}
          className="absolute top-4 right-4 grid size-10 cursor-pointer place-items-center rounded-full bg-bianco text-petrol-700 ring-1 ring-petrol-600/15 transition-colors hover:bg-petrol-50"
        >
          <X size={18} weight="regular" />
        </button>

        <h2 id="prenota-titolo" className="pr-12 font-display text-[34px] leading-[1.05] font-medium text-petrol-800 sm:text-[40px]">
          {t.booking.title}
        </h2>
        <p id="prenota-intro" className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-ink-soft">
          {t.booking.intro}
        </p>

        <div className="mt-7 grid gap-3">
          <a
            href={lang === "it" ? SITE.links.thefork : SITE.links.theforkEn}
            target="_blank"
            rel="noopener noreferrer"
            data-autofocus
            className="group flex items-center gap-4 rounded-[20px] bg-petrol-600 p-4 pr-5 text-bianco shadow-[inset_0_1px_0_rgb(255_255_255/0.14)] transition-colors hover:bg-petrol-700 sm:p-5"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/12 ring-1 ring-white/25">
              <ForkKnife size={22} weight="light" aria-hidden />
            </span>
            <span className="flex-1">
              <span className="block text-[13px] font-bold tracking-[0.18em] uppercase">{t.booking.thefork.title}</span>
              <span className="mt-1 block text-[13.5px] leading-snug text-white/80">{t.booking.thefork.desc}</span>
            </span>
            <ArrowUpRight size={20} aria-hidden className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">{t.common.newTab}</span>
          </a>

          <div className="flex items-stretch gap-2">
            <a
              href={SITE.phone.href}
              className="group flex flex-1 items-center gap-4 rounded-[20px] bg-bianco p-4 pr-5 text-petrol-800 ring-1 ring-petrol-600/18 transition-colors hover:bg-petrol-50 sm:p-5"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-petrol-50 ring-1 ring-petrol-600/15">
                <Phone size={22} weight="light" aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block text-[13px] font-bold tracking-[0.18em] uppercase">{t.booking.phone.title}</span>
                <span className="mt-1 block text-[15px] font-semibold text-petrol-700 tabular">{SITE.phone.display}</span>
              </span>
            </a>
            <button
              type="button"
              onClick={copyNumber}
              aria-label={copied ? t.booking.copied : t.booking.copy}
              className="hidden w-14 cursor-pointer place-items-center rounded-[20px] bg-bianco text-petrol-700 ring-1 ring-petrol-600/18 transition-colors hover:bg-petrol-50 sm:grid"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "ok" : "copy"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                >
                  {copied ? <Check size={20} /> : <Copy size={20} weight="light" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
          <p aria-live="polite" className="sr-only">
            {copied ? t.booking.copied : ""}
          </p>
        </div>

        <p className="mt-6 text-[13px] leading-relaxed text-ink-soft">{t.booking.note}</p>
      </motion.div>
    </div>
  );
}
