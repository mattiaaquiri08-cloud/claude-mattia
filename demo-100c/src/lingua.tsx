import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { TESTI, type Testi } from "./testi";

export type Lingua = "it" | "en";

const Contesto = createContext<{ lingua: Lingua; t: Testi; cambia: (l: Lingua) => void }>({
  lingua: "it",
  t: TESTI.it,
  cambia: () => {},
});

function linguaIniziale(): Lingua {
  // ?lang=en nel link vince: serve per mandare la versione inglese a qualcuno
  const dalLink = new URLSearchParams(location.search).get("lang");
  if (dalLink === "en" || dalLink === "it") return dalLink;
  try {
    const salvata = localStorage.getItem("100c-lingua");
    if (salvata === "it" || salvata === "en") return salvata;
  } catch {
    /* archivio non disponibile */
  }
  return navigator.language?.toLowerCase().startsWith("it") ? "it" : "en";
}

export function ProviderLingua({ children }: { children: ReactNode }) {
  const [lingua, setLingua] = useState<Lingua>(linguaIniziale);

  useEffect(() => {
    document.documentElement.lang = lingua;
    document.title = TESTI[lingua].meta.titolo;
    document.querySelector('meta[name="description"]')?.setAttribute("content", TESTI[lingua].meta.descrizione);
  }, [lingua]);

  const cambia = (l: Lingua) => {
    setLingua(l);
    try {
      localStorage.setItem("100c-lingua", l);
    } catch {
      /* archivio non disponibile */
    }
  };

  return <Contesto.Provider value={{ lingua, t: TESTI[lingua], cambia }}>{children}</Contesto.Provider>;
}

export const useLingua = () => useContext(Contesto);
