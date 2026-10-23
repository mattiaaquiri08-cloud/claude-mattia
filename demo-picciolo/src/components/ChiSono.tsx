import { ArrowLeft, ArrowRight, LinkedinLogo } from "@phosphor-icons/react";
import { useRef } from "react";
import { CONTATTI } from "../config";
import { Comparsa } from "./ui";

const VALORI = [
  { nome: "Competenza", testo: "oltre 25 anni di esperienza sul campo." },
  { nome: "Trasparenza", testo: "la base di un rapporto lungo, fondato sulla fiducia." },
  { nome: "Risultati", testo: "metodo, disciplina e soluzioni finanziariamente efficienti." },
];

const CRISI = [
  { anni: "2000-2003", testo: "Scoppia la bolla internet. Torri gemelle, default dell'Argentina, crac di Enron e WorldCom." },
  { anni: "2007-2008", testo: "Mutui subprime e fallimento di Lehman Brothers: il sistema finanziario sull'orlo del collasso." },
  { anni: "2011-2012", testo: "Crisi dell'eurozona e della Grecia, spread alle stelle, Italia a un passo dalla ristrutturazione del debito." },
  { anni: "2014", testo: "Inizia l'era dei tassi negativi: obbligazioni che rendono meno di zero, una situazione mai vista." },
  { anni: "2020-2021", testo: "La pandemia porta i mercati sulle montagne russe e mette in discussione ogni certezza." },
  { anni: "2022", testo: "Inflazione a due cifre e guerra in Ucraina: il peggior anno nella storia dei mercati obbligazionari." },
  { anni: "2025", testo: "Arrivano i dazi, anzi no. Di nuovo sulle montagne russe." },
];

export default function ChiSono() {
  const striscia = useRef<HTMLOListElement>(null);
  const scorri = (dir: number) => {
    const el = striscia.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 640), behavior: "smooth" });
  };

  return (
    <section id="chi-sono" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-[1280px] items-end gap-10 px-4 md:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Comparsa className="relative mx-auto w-full max-w-[420px]">
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-[18%] rounded-[20px] bg-velo" />
          <img
            src="./foto/enrico-camicia.webp"
            width={467}
            height={943}
            loading="lazy"
            alt="Enrico Picciolo in camicia, a braccia conserte"
            className="relative mx-auto h-[440px] w-auto object-contain object-bottom md:h-[540px]"
          />
        </Comparsa>

        <div className="lg:pb-6">
          <Comparsa>
            <h2 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-testo md:text-[2.75rem]">
              Venticinque anni accanto a chi investe
            </h2>
            <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-relaxed text-testo-2">
              Si rivolgono a me imprenditori, dirigenti, liberi professionisti e risparmiatori: non solo per investire,
              ma per gestire un patrimonio nel suo insieme e tramandarlo senza liti tra eredi.
            </p>
            <p className="mt-4 max-w-[60ch] text-[1.05rem] leading-relaxed text-testo-2">
              Sono iscritto all'albo unico dei consulenti finanziari tenuto dall'OCF e lavoro con FinecoBank, pioniera del
              digitale: proposte firmate dall'app in pochi clic e incontri anche a distanza, da Roma al più piccolo borgo.
            </p>
          </Comparsa>
          <Comparsa ritardo={0.08}>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {VALORI.map((v) => (
                <div key={v.nome} className="border-t border-accento pt-4">
                  <dt className="font-semibold text-testo">{v.nome}</dt>
                  <dd className="mt-1 text-[0.95rem] leading-snug text-testo-2">{v.testo}</dd>
                </div>
              ))}
            </dl>
            <a
              href={CONTATTI.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-medium text-accento hover:underline"
            >
              <LinkedinLogo size={22} aria-hidden="true" />
              Il mio profilo LinkedIn
            </a>
          </Comparsa>
        </div>
      </div>

      {/* le crisi attraversate insieme ai clienti: striscia orizzontale da sfogliare */}
      <div className="mx-auto mt-20 max-w-[1280px] px-4 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <Comparsa>
            <h3 className="max-w-[30ch] text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-testo md:text-[1.9rem]">
              Le crisi che ho attraversato insieme ai miei clienti
            </h3>
          </Comparsa>
          <div className="hidden gap-2 md:flex">
            {[
              { d: -1, Icona: ArrowLeft, l: "Crisi precedenti" },
              { d: 1, Icona: ArrowRight, l: "Crisi successive" },
            ].map(({ d, Icona, l }) => (
              <button
                key={d}
                type="button"
                onClick={() => scorri(d)}
                aria-label={l}
                className="flex size-12 items-center justify-center rounded-full ring-1 ring-linea transition-colors hover:bg-superficie active:scale-95"
              >
                <Icona size={20} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <ol
        ref={striscia}
        tabIndex={0}
        aria-label="Cronologia delle crisi finanziarie dal 2000 a oggi"
        className="senza-barra mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:scroll-px-8 md:px-8 xl:scroll-px-[calc((100vw-1280px)/2+2rem)] xl:px-[calc((100vw-1280px)/2+2rem)]"
      >
        {CRISI.map((c) => (
          <li
            key={c.anni}
            className="flex w-[78vw] max-w-[320px] shrink-0 snap-start flex-col rounded-[20px] bg-superficie p-6 ring-1 ring-linea"
          >
            <span className="text-[1.6rem] font-semibold tabular-nums tracking-[-0.03em] text-accento">{c.anni}</span>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-testo-2">{c.testo}</p>
          </li>
        ))}
        <li className="flex w-[78vw] max-w-[320px] shrink-0 snap-start flex-col justify-center rounded-[20px] bg-notte p-6 text-white">
          <p className="text-[1.15rem] font-medium leading-snug">
            Ogni crisi è diversa dalle precedenti. Il metodo, invece, resta lo stesso.
          </p>
        </li>
      </ol>
    </section>
  );
}
