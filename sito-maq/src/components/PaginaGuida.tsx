import type { PaginaGuida as Dati } from "../pagine";
import { TITOLARE } from "../config";
import { AltrePagine } from "./AltrePagine";
import { Briciole } from "./Briciole";
import { Contatti } from "./Contatti";
import { Appare, PulsanteBozza } from "./ui";

function dataEstesa(iso: string) {
  const [a, m, g] = iso.split("-").map(Number);
  const mesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
  return `${g} ${mesi[m - 1]} ${a}`;
}

export function PaginaGuida({ pagina }: { pagina: Dati }) {
  return (
    <>
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8 lg:pb-32">
        <header className="text-center">
          <Briciole attuale={pagina.etichetta} />
          <p className="bordo-sfumato mx-auto mt-10 w-fit rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm">
            {pagina.pillola}
          </p>
          <h1 className="mt-8 text-[36px] font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl">
            {pagina.h1[0]}
            <span className="testo-sfumato">{pagina.h1[1]}</span>
          </h1>
          <p className="mt-6 text-sm text-tenue">
            di {TITOLARE} · <time dateTime={pagina.pubblicata}>{dataEstesa(pagina.pubblicata)}</time>
          </p>
        </header>

        <p className="mt-12 text-xl leading-relaxed text-white/90">{pagina.intro}</p>

        {pagina.sezioni.map((s) => (
          <Appare key={s.titolo}>
            <section className="mt-14">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{s.titolo}</h2>
              {s.paragrafi?.map((t) => (
                <p key={t.slice(0, 30)} className="mt-5 text-lg leading-relaxed text-tenue">
                  {t}
                </p>
              ))}
              {s.elenco && (
                <dl className="mt-6 space-y-4">
                  {s.elenco.map((e) => (
                    <div key={e.titolo} className="rounded-2xl border border-linea bg-scheda p-5">
                      <dt className="font-semibold">{e.titolo}</dt>
                      <dd className="mt-1.5 leading-relaxed text-tenue">{e.testo}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          </Appare>
        ))}

        <Appare>
          <div className="relative mt-16 overflow-hidden rounded-[28px] border border-linea bg-scheda p-8 text-center sm:p-10">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-35 blur-3xl sfondo-sfumato"
              aria-hidden="true"
            />
            <p className="relative text-2xl font-bold">Volete vedere come sarebbe il vostro sito?</p>
            <p className="relative mx-auto mt-3 max-w-[46ch] leading-relaxed text-tenue">
              La bozza è gratuita e senza impegno: decidete solo dopo averla vista.
            </p>
            <div className="relative mt-8 flex justify-center">
              <PulsanteBozza />
            </div>
          </div>
        </Appare>
      </article>

      <AltrePagine escludi={pagina.slug} />
      <Contatti />
    </>
  );
}
