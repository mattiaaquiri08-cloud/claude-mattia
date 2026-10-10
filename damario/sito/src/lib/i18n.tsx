import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lang, T } from '../data/site'
import { UI } from '../data/ui'

type I18n = { lang: Lang; setLang: (l: Lang) => void; t: (s: T) => string }

const I18nContext = createContext<I18n>({ lang: 'it', setLang: () => {}, t: (s) => s.it })

const KEY = 'damario-lang'

/** Lingua iniziale: ?lang= nell'indirizzo, poi la scelta salvata, altrimenti quella del browser (italiano per chi ha il browser in italiano). */
function initialLang(): Lang {
  const fromUrl = new URLSearchParams(location.search).get('lang')
  if (fromUrl === 'it' || fromUrl === 'en') return fromUrl
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'it' || saved === 'en') return saved
  } catch {
    /* archiviazione non disponibile: si usa la lingua del browser */
  }
  return navigator.language?.toLowerCase().startsWith('it') ? 'it' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {
      /* nessun problema: la scelta vale per questa visita */
    }
  }, [])

  // lingua del documento, titolo e descrizione seguono la scelta
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = UI.meta.title[lang]
    document.querySelector('meta[name="description"]')?.setAttribute('content', UI.meta.description[lang])
  }, [lang])

  const value = useMemo<I18n>(() => ({ lang, setLang, t: (s: T) => s[lang] }), [lang, setLang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)
