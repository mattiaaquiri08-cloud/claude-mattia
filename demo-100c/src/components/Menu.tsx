import { CloudSlash, Info } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { MENU_DEMO, FASCE_DEMO } from "../dati-demo";
import { DIMOSTRATIVO } from "../config";
import { caricaScheda, prezzo, vero, type Origine, type Riga } from "../fogli";
import { useLingua } from "../lingua";
import { Comparsa, EASE, Etichetta } from "./ui";

type Piatto = { categoria: string; nome: string; descrizione: string; prezzo: string; disponibile: boolean; ordine: number };

// Colonne del foglio "Menu" (vedi LEGGIMI.md): Categoria, Categoria EN, Piatto, Piatto EN,
// Descrizione, Descrizione EN, Prezzo, Disponibile, Ordine. Le colonne EN sono facoltative:
// se vuote si usa il testo italiano.
function daRiga(r: Riga, lingua: "it" | "en", indice: number): Piatto {
  const scegli = (base: string) => (lingua === "en" && r[`${base}_en`]) || r[base] || "";
  return {
    categoria: scegli("categoria"),
    nome: scegli("piatto"),
    descrizione: scegli("descrizione"),
    prezzo: r.prezzo ?? "",
    disponibile: vero(r.disponibile),
    ordine: Number(r.ordine) || 1000 + indice,
  };
}

export default function Menu() {
  const { t, lingua } = useLingua();
  const ridotto = useReducedMotion();
  const [stato, setStato] = useState<{ righe: Riga[]; origine: Origine } | null>(null);
  const [attiva, setAttiva] = useState(0);

  useEffect(() => {
    let vivo = true;
    caricaScheda("menu").then((r) => vivo && setStato(r.origine === "demo" ? { righe: MENU_DEMO, origine: "demo" } : r));
    return () => {
      vivo = false;
    };
  }, []);

  // categorie nell'ordine in cui compaiono, piatti per colonna "Ordine"
  const categorie = useMemo(() => {
    if (!stato) return [];
    const piatti = stato.righe
      .map((r, i) => daRiga(r, lingua, i))
      .filter((p) => p.nome)
      .sort((a, b) => a.ordine - b.ordine);
    const gruppi = new Map<string, Piatto[]>();
    for (const p of piatti) gruppi.set(p.categoria, [...(gruppi.get(p.categoria) ?? []), p]);
    return [...gruppi.entries()].map(([nome, piatti]) => ({ nome, piatti }));
  }, [stato, lingua]);

  const corrente = categorie[Math.min(attiva, Math.max(categorie.length - 1, 0))];
  const demo = stato?.origine === "demo";
  const esempio = demo || (DIMOSTRATIVO && Boolean(stato));

  return (
    <section id="menu" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Comparsa>
          <Etichetta>{t.menu.etichetta}</Etichetta>
          <h2 className="stretto max-w-[16ch] text-[clamp(2.6rem,7vw,5.4rem)] font-[720] uppercase leading-[0.92]">
            {t.menu.titolo}
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-grigio">{t.menu.testo}</p>
        </Comparsa>

        {esempio && (
          <div className="mt-10 flex gap-3 border-l-2 border-rosso bg-carta/70 px-5 py-4 text-[0.95rem] leading-relaxed">
            <Info size={22} className="mt-0.5 shrink-0 text-rosso" aria-hidden="true" />
            <p>
              <strong className="font-semibold">{t.menu.demoTitolo}.</strong>{" "}
              {stato?.origine === "foglio" ? t.menu.demoFoglio : t.menu.demoTesto}
            </p>
          </div>
        )}
        {stato?.origine === "copia" && (
          <p className="mt-10 flex items-center gap-2 text-sm text-grigio">
            <CloudSlash size={18} aria-hidden="true" /> {t.menu.copia}
          </p>
        )}

        {!stato ? (
          // scheletro con la stessa forma del menù mentre il foglio risponde
          <div className="mt-12 animate-pulse" role="status" aria-label={t.menu.caricamento}>
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-11 w-32 bg-carta" />
              ))}
            </div>
            <div className="mt-10 grid gap-8">
              {[0, 1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-7 w-2/3 bg-carta" />
                  <div className="mt-3 h-4 w-1/2 bg-carta/70" />
                </div>
              ))}
            </div>
          </div>
        ) : !categorie.length ? (
          <p className="mt-12 max-w-[50ch] text-lg text-grigio">{t.menu.vuoto}</p>
        ) : (
          <>
            {/* schede delle portate: scorrono in orizzontale sul telefono */}
            <div
              role="tablist"
              aria-label={t.nav.menu}
              className="-mx-4 mt-12 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:px-0"
            >
              {categorie.map((c, i) => {
                const sel = c === corrente;
                return (
                  <button
                    key={c.nome}
                    type="button"
                    role="tab"
                    id={`scheda-${i}`}
                    aria-selected={sel}
                    aria-controls="pannello-menu"
                    onClick={() => setAttiva(i)}
                    className={`semistretto relative min-h-12 shrink-0 px-5 text-[0.95rem] font-semibold uppercase tracking-[0.08em] transition-colors ${
                      sel ? "text-insegna" : "border border-inchiostro/20 text-inchiostro hover:border-inchiostro"
                    }`}
                  >
                    {sel && (
                      <motion.span
                        layoutId="scheda-menu"
                        className="absolute inset-0 bg-inchiostro"
                        transition={ridotto ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="relative">{c.nome}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${corrente?.nome}-${lingua}`}
                id="pannello-menu"
                role="tabpanel"
                aria-labelledby={`scheda-${categorie.indexOf(corrente!)}`}
                initial={ridotto ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={ridotto ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-8"
              >
                {esempio && FASCE_DEMO[corrente!.nome] && (
                  <p className="mb-6 text-sm text-grigio">
                    {t.menu.indicativo} {FASCE_DEMO[corrente!.nome]}
                    {", "}
                    {lingua === "it" ? "secondo la stampa" : "according to the press"}
                  </p>
                )}
                <ul className="grid max-w-[1100px] gap-x-14 md:grid-cols-2">
                  {corrente!.piatti.map((p) => (
                    <li key={p.nome} className="border-t border-inchiostro/12 py-5">
                      <div className="flex items-baseline gap-3">
                        <span
                          className={`stretto text-[1.7rem] font-[680] uppercase leading-[1.05] ${
                            p.disponibile ? "" : "text-inchiostro/40 line-through decoration-1"
                          }`}
                        >
                          {p.nome}
                        </span>
                        {p.prezzo && (
                          <>
                            <span
                              aria-hidden="true"
                              className="min-w-6 flex-1 -translate-y-1 border-b border-dotted border-inchiostro/30"
                            />
                            <span className="semistretto shrink-0 text-lg font-semibold tabular-nums">
                              {prezzo(p.prezzo, lingua)}
                            </span>
                          </>
                        )}
                      </div>
                      {(p.descrizione || !p.disponibile) && (
                        <p className="mt-1.5 max-w-[46ch] leading-relaxed text-grigio">
                          {!p.disponibile && <span className="mr-2 font-semibold text-rosso">{t.menu.nonDisponibile}.</span>}
                          {p.descrizione}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <p className="mt-10 max-w-[60ch] text-sm leading-relaxed text-grigio">
              {esempio ? `${t.menu.prezziDemo}. ` : ""}
              {t.menu.allergeni}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
