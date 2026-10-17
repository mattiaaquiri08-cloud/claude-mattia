import { Star } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

// comparsa all'ingresso nello schermo: accompagna la lettura, una volta sola
export function Comparsa({
  children,
  ritardo = 0,
  className,
  y = 22,
}: {
  children: ReactNode;
  ritardo?: number;
  className?: string;
  y?: number;
}) {
  const ridotto = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={ridotto ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay: ritardo, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// marchio ricostruito dall'insegna (provvisorio, non è il logo ufficiale)
export function Marchio({ className = "", chiaro = false }: { className?: string; chiaro?: boolean }) {
  return (
    <span className={`stretto inline-flex items-baseline font-[750] leading-none tracking-[-0.01em] ${className}`}>
      <span className="text-rosso">100</span>
      <span className={chiaro ? "text-insegna" : "text-inchiostro"}>C.</span>
    </span>
  );
}

type PropsPulsante = {
  href: string;
  children: ReactNode;
  variante?: "pieno" | "contorno" | "chiaro";
  className?: string;
  esterno?: boolean;
  onClick?: () => void;
};

// pulsanti: angoli vivi come l'insegna, spinta leggera al tocco
export function Pulsante({ href, children, variante = "pieno", className = "", esterno, onClick }: PropsPulsante) {
  const stili = {
    pieno: "bg-rosso text-insegna hover:bg-rosso-scuro",
    contorno: "border border-current text-inchiostro hover:bg-inchiostro hover:text-insegna",
    chiaro: "bg-insegna text-inchiostro hover:bg-white",
  }[variante];
  return (
    <a
      href={href}
      onClick={onClick}
      {...(esterno ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`semistretto inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap px-6 text-[0.95rem] font-semibold uppercase tracking-[0.08em] transition-[background-color,color,transform] duration-300 active:translate-y-px active:scale-[0.98] ${stili} ${className}`}
    >
      {children}
    </a>
  );
}

export function Etichetta({ children, chiara = false }: { children: ReactNode; chiara?: boolean }) {
  return (
    <p
      className={`semistretto mb-5 text-[0.8rem] font-semibold uppercase tracking-[0.2em] ${chiara ? "text-insegna/70" : "text-rosso"}`}
    >
      {children}
    </p>
  );
}

export function Stelle({ voto, size = 20, className = "" }: { voto: number; size?: number; className?: string }) {
  // cinque stelle riempite in proporzione al voto (4,6 = quattro piene e una al 60%)
  const fila = (
    <span className="flex w-max gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} weight="fill" className="shrink-0" />
      ))}
    </span>
  );
  return (
    <span className={`relative inline-flex ${className}`} aria-hidden="true">
      <span className="opacity-25">{fila}</span>
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(voto / 5) * 100}%` }}>
        {fila}
      </span>
    </span>
  );
}
