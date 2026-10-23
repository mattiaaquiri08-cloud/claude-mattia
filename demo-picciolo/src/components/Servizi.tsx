import {
  Bank,
  ChartLineUp,
  Check,
  type Icon,
  MagnifyingGlass,
  Plus,
  ShieldCheck,
  Strategy,
  Umbrella,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { Comparsa, EASE, TitoloSezione } from "./ui";

type Servizio = { id: string; titolo: string; Icona: Icon; testo: string; punti: string[] };

const SERVIZI: Servizio[] = [
  {
    id: "diagnosi",
    titolo: "Diagnosi degli investimenti",
    Icona: MagnifyingGlass,
    testo: "Un parere esterno e oggettivo su quello che hai presso altre banche o intermediari.",
    punti: ["Azioni, fondi, obbligazioni, ETF e polizze", "Costi nascosti e qualità degli strumenti", "Report finale con cosa tenere e cosa migliorare"],
  },
  {
    id: "portafoglio",
    titolo: "Gestione di portafoglio",
    Icona: ChartLineUp,
    testo: "Portafogli costruiti con strumenti efficienti e a basso costo, seguiti nel tempo.",
    punti: ["Profilo di rischio e orizzonte su misura", "Proposte su app con firma digitale", "Rendiconti evoluti su obiettivi, rischi e qualità"],
  },
  {
    id: "pianificazione",
    titolo: "Pianificazione finanziaria",
    Icona: Strategy,
    testo: "Casa, figli, pensione, liquidità: ogni obiettivo ha il suo piano e il suo portafoglio.",
    punti: ["Analisi di budget e capacità di risparmio", "Goal-based investing", "Per i dirigenti: anche le RSU detenute all'estero, fiscalità compresa"],
  },
  {
    id: "patrimonio",
    titolo: "Patrimonio e successione",
    Icona: Bank,
    testo: "Il passaggio generazionale pianificato per tempo: meno imposte, eredi tutelati, nessuna lite.",
    punti: ["Private banking e gestione evoluta", "Strumenti giuridici per la successione", "Supporto fiscale su donazioni, eredità e holding"],
  },
  {
    id: "previdenza",
    titolo: "Previdenza e TFR",
    Icona: Umbrella,
    testo: "Una pensione integrativa efficace, sfruttando agevolazioni fiscali e strumenti a basso costo.",
    punti: ["Calcolo del gap previdenziale", "Quanto risparmi in tasse con il TFR", "Scelta del fondo pensione giusto"],
  },
  {
    id: "assicurazioni",
    titolo: "Soluzioni assicurative",
    Icona: ShieldCheck,
    testo: "Analisi dei rischi di persona, famiglia e impresa. Solo le coperture davvero utili.",
    punti: ["Protezione della persona e della famiglia", "Rischi legati all'attività d'impresa", "Nessuna polizza superflua"],
  },
];

function Dettaglio({ s }: { s: Servizio }) {
  return (
    <>
      <p className="text-[1.1rem] leading-relaxed text-testo">{s.testo}</p>
      <ul className="mt-6 space-y-3">
        {s.punti.map((p) => (
          <li key={p} className="flex gap-3 text-[1rem] leading-snug text-testo-2">
            <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accento" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Servizi() {
  const [attivo, setAttivo] = useState(0);
  const [apertoMobile, setApertoMobile] = useState<number | null>(0);
  const base = useId();
  const s = SERVIZI[attivo];

  // frecce della tastiera tra le schede, come previsto per i tablist
  const tasto = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + SERVIZI.length) % SERVIZI.length;
    setAttivo(n);
    document.getElementById(`${base}-tab-${n}`)?.focus();
  };

  return (
    <section id="servizi" className="bg-superficie py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <TitoloSezione
          titolo="I miei servizi"
          testo="La consulenza non è una lista di prodotti: è un insieme di strategie per proteggere, far crescere e tramandare."
        />

        {/* computer e tablet: elenco a sinistra, dettaglio a destra */}
        <Comparsa className="mt-12 hidden gap-6 md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div role="tablist" aria-orientation="vertical" aria-label="Servizi" className="flex flex-col gap-1">
            {SERVIZI.map((v, i) => (
              <button
                key={v.id}
                id={`${base}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={i === attivo}
                aria-controls={`${base}-pannello`}
                tabIndex={i === attivo ? 0 : -1}
                onClick={() => setAttivo(i)}
                onKeyDown={(e) => tasto(e, i)}
                className={`relative flex min-h-14 items-center gap-4 rounded-[12px] px-5 text-left text-[1.05rem] transition-colors ${
                  i === attivo ? "text-testo" : "text-testo-2 hover:bg-sfondo hover:text-testo"
                }`}
              >
                {i === attivo && (
                  <motion.span layoutId="servizio-attivo" className="absolute inset-0 rounded-[12px] bg-velo" transition={{ duration: 0.4, ease: EASE }} />
                )}
                <v.Icona size={22} className={`relative ${i === attivo ? "text-accento" : ""}`} aria-hidden="true" />
                <span className="relative font-medium">{v.titolo}</span>
              </button>
            ))}
          </div>

          <div
            id={`${base}-pannello`}
            role="tabpanel"
            aria-labelledby={`${base}-tab-${attivo}`}
            className="relative min-h-[22rem] overflow-hidden rounded-[20px] bg-notte p-10 text-white"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="[&_li]:text-white/80 [&_p]:text-white [&_svg]:text-[#5cc8dc]"
              >
                <s.Icona size={40} weight="light" aria-hidden="true" />
                <h3 className="mb-4 mt-6 text-[1.8rem] font-semibold tracking-[-0.02em]">{s.titolo}</h3>
                <Dettaglio s={s} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Comparsa>

        {/* telefono: fisarmonica, una voce aperta alla volta */}
        <div className="mt-10 divide-y divide-linea border-y border-linea md:hidden">
          {SERVIZI.map((v, i) => {
            const aperto = apertoMobile === i;
            return (
              <div key={v.id}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={aperto}
                    aria-controls={`${base}-m-${i}`}
                    onClick={() => setApertoMobile(aperto ? null : i)}
                    className="flex min-h-16 w-full items-center gap-4 py-4 text-left"
                  >
                    <v.Icona size={24} className="shrink-0 text-accento" aria-hidden="true" />
                    <span className="flex-1 text-[1.1rem] font-medium text-testo">{v.titolo}</span>
                    <Plus
                      size={20}
                      className={`shrink-0 text-testo-2 transition-transform duration-300 ${aperto ? "rotate-45" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {aperto && (
                    <motion.div
                      id={`${base}-m-${i}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-10">
                        <Dettaglio s={v} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
