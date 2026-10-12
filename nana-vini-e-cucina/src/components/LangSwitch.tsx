import { motion } from "motion/react";
import { useLang } from "../i18n/context";
import type { Lang } from "../i18n/dictionaries";

const LANGS: Lang[] = ["it", "en"];

export function LangSwitch({ tone = "light", id = "lang" }: { tone?: "light" | "dark"; id?: string }) {
  const { lang, setLang, t } = useLang();
  const onDark = tone === "dark";

  return (
    <div
      role="group"
      aria-label={t.nav.langLabel}
      className={`relative flex items-center rounded-full p-0.5 text-[11px] font-semibold tracking-[0.14em] ${
        onDark ? "bg-white/12 ring-1 ring-white/30" : "bg-petrol-50 ring-1 ring-petrol-600/20"
      }`}
    >
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={active}
            aria-label={l === "it" ? "Italiano" : "English"}
            onClick={() => setLang(l)}
            className={`relative z-0 h-8 min-w-10 cursor-pointer rounded-full px-2.5 uppercase transition-colors duration-300 ${
              active ? (onDark ? "text-petrol-900" : "text-bianco") : onDark ? "text-white/85 hover:text-white" : "text-petrol-700 hover:text-petrol-900"
            }`}
          >
            {active ? (
              <motion.span
                layoutId={`${id}-pill`}
                className={`absolute inset-0 -z-10 rounded-full ${onDark ? "bg-bianco" : "bg-petrol-600"}`}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            {l}
          </button>
        );
      })}
    </div>
  );
}
