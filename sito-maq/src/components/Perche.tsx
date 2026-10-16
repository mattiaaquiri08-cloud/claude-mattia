import { ChatCircleText, Check } from "@phosphor-icons/react";
import { Appare, PulsanteBozza, Titolo } from "./ui";
import { TITOLARE } from "../config";

const PUNTI = [
  "Un solo referente: parlate sempre direttamente con me",
  "Parole semplici, niente tecnicismi",
  "A Roma e provincia vengo di persona, in tutta Italia lavoriamo in videochiamata",
  "Vedete il sito prima di decidere, senza impegno",
  "Un sito che vi somiglia, non un modello uguale per tutti",
];

export function Perche() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32" aria-labelledby="titolo-perche">
      <div className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <Appare>
          <Titolo>
            <span id="titolo-perche">
              Un web designer che lavora <span className="testo-sfumato">davvero al vostro fianco</span>
            </span>
          </Titolo>
          <ul className="mt-10 space-y-5">
            {PUNTI.map((p) => (
              <li key={p} className="flex items-start gap-4 text-lg">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full sfondo-sfumato">
                  <Check size={16} weight="bold" className="text-white" />
                </span>
                <span className="text-white/90">{p}</span>
              </li>
            ))}
          </ul>
        </Appare>

        <Appare ritardo={0.1}>
          <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-linea bg-scheda p-8 sm:p-10">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl sfondo-sfumato"
              aria-hidden="true"
            />
            <ChatCircleText size={44} weight="light" className="relative text-rosa" />
            <h3 className="relative mt-6 text-2xl font-bold">Mi basta un vostro sì</h3>
            <p className="relative mt-4 leading-relaxed text-tenue">
              Guardare la bozza non costa nulla e non toglie niente. Scrivetemi il nome della vostra attività: vi
              rispondo io, {TITOLARE.split(" ")[0]}, di persona.
            </p>
            <div className="relative mt-auto pt-10">
              <PulsanteBozza largo />
            </div>
          </div>
        </Appare>
      </div>
    </section>
  );
}
