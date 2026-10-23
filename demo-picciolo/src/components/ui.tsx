import { motion, useReducedMotion } from "motion/react";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Motivo } from "../config";

export const EASE = [0.16, 1, 0.3, 1] as const;

// comparsa all'ingresso nello schermo: accompagna la lettura, una volta sola
export function Comparsa({
  children,
  ritardo = 0,
  className,
  y = 20,
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
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: ritardo, ease: EASE }}
    >
      {children}
    </motion.div>
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

// pulsanti a pillola, spinta leggera al tocco
export function Pulsante({ href, children, variante = "pieno", className = "", esterno, onClick }: PropsPulsante) {
  const stili = {
    pieno: "bg-accento text-su-accento hover:bg-accento-forte",
    contorno: "border border-linea text-testo hover:border-testo",
    chiaro: "bg-white text-[#0b2545] hover:bg-white/90",
  }[variante];
  return (
    <a
      href={href}
      onClick={onClick}
      {...(esterno ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[0.95rem] font-medium transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.98] ${stili} ${className}`}
    >
      {children}
    </a>
  );
}

export function TitoloSezione({ titolo, testo, chiaro = false }: { titolo: ReactNode; testo?: ReactNode; chiaro?: boolean }) {
  return (
    <Comparsa className="max-w-[46rem]">
      <h2 className={`text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] md:text-[2.75rem] ${chiaro ? "text-white" : "text-testo"}`}>
        {titolo}
      </h2>
      {testo && (
        <p className={`mt-4 max-w-[60ch] text-[1.05rem] leading-relaxed ${chiaro ? "text-white/75" : "text-testo-2"}`}>{testo}</p>
      )}
    </Comparsa>
  );
}

// Il motivo scelto in una sezione ("richiedi la diagnosi") arriva già selezionato nel modulo contatti
const ContestoMotivo = createContext<{ motivo: Motivo; richiedi: (m: Motivo) => void; scegli: (m: Motivo) => void }>({
  motivo: "diagnosi",
  richiedi: () => {},
  scegli: () => {},
});

export function MotivoProvider({ children }: { children: ReactNode }) {
  const [motivo, scegli] = useState<Motivo>("diagnosi");
  const richiedi = (m: Motivo) => {
    scegli(m);
    document.getElementById("contatti")?.scrollIntoView({ block: "start" });
  };
  return <ContestoMotivo.Provider value={{ motivo, richiedi, scegli }}>{children}</ContestoMotivo.Provider>;
}

export const useMotivo = () => useContext(ContestoMotivo);
