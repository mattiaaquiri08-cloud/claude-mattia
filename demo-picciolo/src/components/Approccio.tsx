import { Check, X } from "@phosphor-icons/react";
import { Comparsa, TitoloSezione } from "./ui";

const SI = [
  "Un professionista sempre al tuo fianco, con servizi su misura",
  "Soluzioni trasparenti, di qualità e a bassi costi",
  "Una banca solida e innovativa, che semplifica",
  "Capire davvero dove e come investi",
];

const NO = ["Fare soldi in poco tempo", "Trading system", "La dritta del momento"];

export default function Approccio() {
  return (
    <section id="approccio" className="mx-auto max-w-[1280px] px-4 py-20 md:px-8 md:py-28">
      <TitoloSezione
        titolo="Prima di tutto: faccio per te?"
        testo="Ogni decisione finanziaria dovrebbe partire da te, non dal prodotto. Per questo preferisco essere chiaro da subito."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <Comparsa className="rounded-[20px] bg-superficie p-6 ring-1 ring-linea md:p-9">
          <h3 className="text-lg font-semibold text-testo">Ti sarò utile se cerchi</h3>
          <ul className="mt-6 space-y-4">
            {SI.map((s) => (
              <li key={s} className="flex gap-3 text-[1.05rem] leading-snug text-testo">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accento text-su-accento">
                  <Check size={14} weight="bold" aria-hidden="true" />
                </span>
                {s}
              </li>
            ))}
          </ul>
        </Comparsa>

        <Comparsa ritardo={0.08} className="rounded-[20px] bg-velo p-6 md:p-9">
          <h3 className="text-lg font-semibold text-testo">Perderai il tuo tempo se cerchi</h3>
          <ul className="mt-6 space-y-4">
            {NO.map((s) => (
              <li key={s} className="flex gap-3 text-[1.05rem] leading-snug text-testo-2">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ring-1 ring-testo-2/40">
                  <X size={13} weight="bold" aria-hidden="true" />
                </span>
                <span className="line-through decoration-testo-2/50">{s}</span>
              </li>
            ))}
          </ul>
          <blockquote className="mt-10 border-t border-linea pt-6">
            <p className="text-[1.05rem] italic leading-snug text-testo">
              “Non esiste vento favorevole per il marinaio che non sa dove andare.”
            </p>
            <footer className="mt-2 text-sm text-testo-2">Seneca</footer>
          </blockquote>
        </Comparsa>
      </div>
    </section>
  );
}
