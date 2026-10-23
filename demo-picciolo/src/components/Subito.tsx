import { ArrowRight, ChartPieSlice, Gift, Umbrella, VideoCamera } from "@phosphor-icons/react";
import type { Motivo } from "../config";
import { Comparsa, TitoloSezione, useMotivo } from "./ui";

function Richiedi({ motivo, testo, chiaro = false }: { motivo: Motivo; testo: string; chiaro?: boolean }) {
  const { richiedi } = useMotivo();
  return (
    <a
      href="#contatti"
      onClick={() => richiedi(motivo)}
      className={`group mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-6 text-[0.95rem] font-medium ${
        chiaro ? "text-white" : "text-accento"
      }`}
    >
      {testo}
      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </a>
  );
}

export default function Subito() {
  return (
    <section id="subito" className="bg-superficie py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <TitoloSezione
          titolo="Cosa posso fare subito per te"
          testo="Tre modi per iniziare, senza impegno. Il primo incontro serve a capire, non a vendere."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:grid-rows-2">
          <Comparsa className="flex flex-col rounded-[20px] bg-notte p-7 text-white md:p-10 lg:row-span-2">
            <ChartPieSlice size={36} weight="light" className="text-[#5cc8dc]" aria-hidden="true" />
            <h3 className="mt-6 text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] md:text-[2.1rem]">
              Diagnosi dei tuoi investimenti
            </h3>
            <p className="mt-3 max-w-[44ch] text-[1.05rem] leading-relaxed text-white/75">
              Hai investimenti presso un'altra banca? Li analizzo uno per uno e ti consegno un report chiaro.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Quanto paghi davvero, costi nascosti compresi",
                "Quanto rischio ti stai assumendo",
                "Rendimenti a confronto con il mercato",
                "Minusvalenze ancora da recuperare",
              ].map((p) => (
                <li key={p} className="rounded-[12px] bg-white/[0.07] p-4 text-[0.95rem] leading-snug text-white/90">
                  {p}
                </li>
              ))}
            </ul>
            <Richiedi motivo="diagnosi" testo="Richiedi la diagnosi gratuita" chiaro />
          </Comparsa>

          <Comparsa ritardo={0.06} className="flex flex-col rounded-[20px] bg-sfondo p-7 ring-1 ring-linea md:p-9">
            <Umbrella size={32} weight="light" className="text-accento" aria-hidden="true" />
            <h3 className="mt-5 text-[1.4rem] font-semibold tracking-[-0.02em] text-testo">Check-up previdenziale</h3>
            <p className="mt-2 text-[1rem] leading-relaxed text-testo-2">
              Quanto ti mancherà alla pensione, quanto risparmi in tasse con il TFR nel fondo giusto. Rimandare ha un
              costo: misuriamolo.
            </p>
            <Richiedi motivo="previdenza" testo="Prenota il check-up" />
          </Comparsa>

          <Comparsa ritardo={0.12} className="flex flex-col rounded-[20px] bg-velo p-7 md:p-9">
            <VideoCamera size={32} weight="light" className="text-accento" aria-hidden="true" />
            <h3 className="mt-5 text-[1.4rem] font-semibold tracking-[-0.02em] text-testo">Una call di confronto</h3>
            <p className="mt-2 text-[1rem] leading-relaxed text-testo-2">
              Un dubbio, una domanda, un parere esterno. In ufficio a Roma o in video, ovunque tu sia.
            </p>
            <Richiedi motivo="call" testo="Fissa una call" />
          </Comparsa>
        </div>

        <Comparsa className="mt-6 flex items-start gap-3 md:items-center text-[0.98rem] text-testo-2">
          <Gift size={22} className="shrink-0 text-accento" aria-hidden="true" />
          <p>
            In regalo, a chi richiede uno di questi incontri: l'ebook del mio libro <em>Risparmiare, investire, proteggere</em>.
          </p>
        </Comparsa>
      </div>
    </section>
  );
}
