import { ArrowRight, List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { useLang } from "../i18n/context";
import { useModal } from "../lib/useModal";
import { useBooking } from "./booking";
import { Sprig } from "./Botanical";
import { LangSwitch } from "./LangSwitch";
import { LogoMark } from "./Logo";
import { ProposalBanner } from "./ProposalGuard";

export function Header() {
  const { t } = useLang();
  const { open: openBooking } = useBooking();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // la barra diventa piena solo quando si supera la foto principale
  useMotionValueEvent(scrollY, "change", (y) => {
    const threshold = typeof window === "undefined" ? 600 : window.innerHeight * 0.82;
    const next = y > threshold;
    setSolid((prev) => (prev === next ? prev : next));
  });

  const links = [
    { href: "#cucina", label: t.nav.kitchen },
    { href: "#menu", label: t.nav.menu },
    { href: "#galleria", label: t.nav.gallery },
    { href: "#recensioni", label: t.nav.reviews },
    { href: "#dove-siamo", label: t.nav.visit },
  ];

  const onDark = !solid && !menuOpen;
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <a
        href="#contenuto"
        className="sr-only z-[80] rounded-full bg-petrol-700 px-4 py-2 text-sm text-bianco focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.nav.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top,0px)] transition-[background-color,box-shadow,color] duration-500 ease-out ${
          solid && !menuOpen
            ? "bg-crema/92 text-petrol-800 shadow-[0_1px_0_rgb(43_94_84/0.12)] backdrop-blur-md"
            : menuOpen
              ? "text-petrol-800"
              : "text-white [text-shadow:0_1px_12px_rgb(19_35_31/0.55)]"
        }`}
      >
        <ProposalBanner />
        {onDark ? (
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-petrol-950/55 via-petrol-950/20 to-transparent" />
        ) : null}
        <nav aria-label={t.nav.label} className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-10">
          <a href="#top" className="group flex shrink-0 items-center gap-3" aria-label={t.nav.home}>
            <LogoMark variant="mark" className="size-10 transition-transform duration-500 ease-out group-hover:rotate-[-8deg] lg:size-11" />
            <span translate="no" className="hidden flex-col leading-none sm:flex">
              <span className="sign-type text-[26px] tracking-[0.22em]">Nanà</span>
              <span className="sign-type -mt-0.5 text-[13px] tracking-[0.2em] opacity-90">Vini e cucina</span>
            </span>
          </a>

          <ul className="ml-auto hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative rounded-full px-3.5 py-2 text-[13.5px] font-medium tracking-[0.02em] transition-opacity hover:opacity-100"
                >
                  {l.label}
                  <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:ml-4">
            <div className="hidden sm:block">
              <LangSwitch tone={onDark ? "dark" : "light"} id="header-lang" />
            </div>
            <motion.button
              type="button"
              onClick={openBooking}
              whileTap={{ scale: 0.97 }}
              className={`h-10 cursor-pointer rounded-full px-5 text-[12px] font-bold tracking-[0.16em] uppercase transition-colors duration-300 ${
                onDark
                  ? "bg-bianco text-petrol-800 hover:bg-petrol-50"
                  : "bg-petrol-600 text-bianco shadow-[inset_0_1px_0_rgb(255_255_255/0.14)] hover:bg-petrol-700"
              }`}
            >
              {t.nav.book}
            </motion.button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="grid size-10 cursor-pointer place-items-center rounded-full lg:hidden"
            >
              {menuOpen ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>{menuOpen ? <MobileMenu links={links} onClose={closeMenu} /> : null}</AnimatePresence>
    </>
  );
}

function MobileMenu({ links, onClose }: { links: { href: string; label: string }[]; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  useModal(ref, true, onClose);

  return (
    <motion.div
      ref={ref}
      id="menu-mobile"
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.label}
      className="fixed inset-0 z-30 flex flex-col overflow-y-auto overscroll-contain bg-crema px-6 pt-[calc(6rem+var(--chrome-top))] pb-10 text-petrol-800 lg:hidden"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
    >
      <ul className="flex flex-col">
        {links.map((l, i) => (
          <motion.li
            key={l.href}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-petrol-600/12"
          >
            <a href={l.href} onClick={onClose} className="flex items-center justify-between py-4 font-display text-[34px] leading-tight font-medium">
              {l.label}
              <ArrowRight aria-hidden size={20} weight="light" className="text-petrol-400" />
            </a>
          </motion.li>
        ))}
      </ul>
      <div className="mt-8 flex items-center justify-between">
        <LangSwitch tone="light" id="mobile-lang" />
        <a href="tel:+390669190750" className="text-sm font-semibold text-petrol-700 underline decoration-petrol-300 underline-offset-4">
          +39 06 6919 0750
        </a>
      </div>
      <Sprig className="mt-auto w-44 self-end pt-10 text-petrol-400" />
    </motion.div>
  );
}
