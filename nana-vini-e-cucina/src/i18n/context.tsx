import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dictionaries, type Dictionary, type Lang } from "./dictionaries";

type LangContextValue = {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export const LANG_PATH: Record<Lang, string> = { it: "/", en: "/en/" };

export function LangProvider({ initialLang, children }: { initialLang: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const t = dictionaries[lang];

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("nana-lang", next);
    } catch {
      /* archiviazione non disponibile: nessun problema */
    }
    // nella versione "file unico" l'indirizzo non cambia (non esiste /en/)
    if (import.meta.env.VITE_SINGLE !== "1") {
      const url = new URL(window.location.href);
      url.pathname = LANG_PATH[next];
      window.history.replaceState(null, "", url);
    }
  }, []);

  // allinea <html lang>, titolo e descrizione alla lingua attiva
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [lang, t]);

  const value = useMemo(() => ({ lang, t, setLang }), [lang, t, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang deve stare dentro <LangProvider>");
  return ctx;
}
