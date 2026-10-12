import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Comportamento da finestra modale accessibile:
 * blocca lo scroll della pagina, chiude con Esc, tiene il focus dentro
 * e lo restituisce all'elemento di partenza alla chiusura.
 */
export function useModal(ref: RefObject<HTMLElement | null>, active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const focusFirst = window.setTimeout(() => {
      const first = ref.current?.querySelector<HTMLElement>("[data-autofocus]") ?? ref.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus({ preventScroll: true });
    }, 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !ref.current) return;
      const nodes = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [active, onClose, ref]);
}
