import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// Pulsante principale: sempre e solo "Richiedi la bozza". Porta al modulo in fondo alla pagina.
export function PulsanteBozza({
  largo = false,
  className = "",
  onClick,
}: {
  largo?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href="#modulo"
      onClick={onClick}
      className={`fuoco inline-flex items-center justify-center rounded-full sfondo-sfumato px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] sm:px-8 sm:text-[13px] sm:tracking-[0.28em] whitespace-nowrap text-white shadow-[0_18px_40px_-18px_rgba(176,92,230,0.75)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${
        largo ? "w-full" : ""
      } ${className}`}
    >
      Richiedi la bozza
    </a>
  );
}

export function PulsanteSecondario({
  href,
  children,
  largo = false,
}: {
  href: string;
  children: ReactNode;
  largo?: boolean;
}) {
  return (
    <a
      href={href}
      className={`fuoco inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] sm:px-8 sm:text-[13px] sm:tracking-[0.28em] whitespace-nowrap text-testo transition-colors duration-200 hover:bg-white hover:text-notte active:scale-[0.98] ${
        largo ? "w-full" : ""
      }`}
    >
      {children}
    </a>
  );
}

// Comparsa morbida quando la sezione entra nello schermo.
export function Appare({
  children,
  ritardo = 0,
  className = "",
}: {
  children: ReactNode;
  ritardo?: number;
  className?: string;
}) {
  const ridotto = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={ridotto ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: ritardo, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Titolo({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`text-3xl font-bold leading-[1.15] tracking-tight text-balance sm:text-4xl lg:text-[44px] ${className}`}
    >
      {children}
    </h2>
  );
}

// Piccola etichetta sopra il titolo di ogni sezione, così le parti del sito si distinguono a colpo d’occhio.
export function Etichetta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-tenue ${className}`}
    >
      <span className="h-px w-6 sfondo-sfumato" aria-hidden="true" />
      {children}
    </p>
  );
}
