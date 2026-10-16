import type { Icon } from "@phosphor-icons/react";
import {
  ArrowsClockwise,
  Browser,
  CalendarCheck,
  ListChecks,
  MagnifyingGlass,
  UserCircle,
} from "@phosphor-icons/react";
import { Appare, Etichetta, Titolo } from "./ui";
import { PAGINE } from "../pagine";
import { useLinkPagina } from "../radice";

type Servizio = { titolo: string; testo: string; icona: Icon; evidenza?: boolean; striscia?: boolean };

const SERVIZI: Servizio[] = [
  {
    titolo: "La vostra storia",
    testo:
      "In ogni sito c’è una parte dedicata al titolare: la storia dell’attività, il vostro percorso e la vostra immagine. È quello che vi rende diversi da tutti gli altri.",
    icona: UserCircle,
    evidenza: true,
  },
  {
    titolo: "Sito su misura",
    testo: "Pensato per la vostra attività, veloce e bello da vedere sul telefono.",
    icona: Browser,
  },
  {
    titolo: "Menu, servizi e listini",
    testo: "Piatti, trattamenti, corsi e prezzi sempre aggiornati e facili da leggere.",
    icona: ListChecks,
  },
  {
    titolo: "Prenotazioni e WhatsApp",
    testo: "Un tocco per chiamarvi, scrivervi o prenotare. Anche con le app che usate già.",
    icona: CalendarCheck,
  },
  {
    titolo: "Visibilità su Google",
    testo: "Orari, mappa e scheda Google collegati al sito, così vi trova chi vi cerca in zona.",
    icona: MagnifyingGlass,
  },
  {
    titolo: "Restyling",
    testo: "Avete già un sito vecchio o che non vi piace? Lo rifacciamo da capo.",
    icona: ArrowsClockwise,
    striscia: true,
  },
];

export function Servizi() {
  const linkPagina = useLinkPagina();
  return (
    <section id="servizi" className="border-y border-linea bg-notte-2" aria-labelledby="titolo-servizi">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <Appare className="max-w-3xl">
          <Etichetta>Servizi</Etichetta>
          <Titolo className="mt-5">
            <span id="titolo-servizi">
              Dal primo incontro al sito online, <span className="testo-sfumato">sono al vostro fianco</span>
            </span>
          </Titolo>
        </Appare>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVIZI.map(({ titolo, testo, icona: Icona, evidenza, striscia }, i) => (
            <Appare
              key={titolo}
              ritardo={0.05 * i}
              className={
                evidenza ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : striscia ? "md:col-span-2 lg:col-span-3" : ""
              }
            >
              <article
                className={`group flex h-full rounded-[24px] border p-7 transition-colors duration-300 sm:p-8 ${
                  striscia ? "flex-col gap-6 sm:flex-row sm:items-center" : "flex-col"
                } ${
                  evidenza
                    ? "border-transparent sfondo-sfumato text-white"
                    : "border-linea bg-scheda hover:border-white/20 hover:bg-scheda-2"
                }`}
              >
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                    evidenza ? "bg-white/20" : "bg-white/5"
                  }`}
                >
                  <Icona size={30} weight="light" className={evidenza ? "text-white" : "text-rosa"} />
                </span>
                <div className={striscia ? "sm:flex-1" : ""}>
                  <h3 className={`font-bold ${evidenza ? "mt-6 text-3xl" : striscia ? "text-xl" : "mt-6 text-xl"}`}>
                    {titolo}
                  </h3>
                  <p className={`mt-3 leading-relaxed ${evidenza ? "text-lg text-white/90" : "text-tenue"}`}>{testo}</p>
                </div>
                {evidenza && (
                  <p className="mt-auto pt-10 text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
                    Inclusa in ogni sito
                  </p>
                )}
              </article>
            </Appare>
          ))}
        </div>
        <Appare className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-3 text-sm">
          <span className="text-tenue">Approfondite:</span>
          {PAGINE.filter((x) => x.slug).map((x) => (
            <a
              key={x.slug}
              href={linkPagina(x.slug)}
              className="fuoco rounded-full border border-linea px-4 py-2 text-white/85 transition-colors hover:border-white/30 hover:text-white"
            >
              {x.etichetta}
            </a>
          ))}
        </Appare>
      </div>
    </section>
  );
}
