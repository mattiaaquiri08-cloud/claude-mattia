import { motion, useReducedMotion } from "motion/react";
import { Check, MagnifyingGlass } from "@phosphor-icons/react";
import type { PaginaSettore as Dati } from "../pagine";
import { AltrePagine } from "./AltrePagine";
import { Briciole } from "./Briciole";
import { Contatti } from "./Contatti";
import { Domande } from "./Domande";
import { Metodo } from "./Metodo";
import { Appare, PulsanteBozza, PulsanteSecondario, Titolo } from "./ui";

export function PaginaSettore({ pagina }: { pagina: Dati }) {
  const ridotto = useReducedMotion();
  const entra = (ritardo: number) => ({
    initial: ridotto ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: ritardo, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <>
      <section id="inizio" className="relative isolate overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 420px at 50% 85%, rgba(124,58,237,.20), transparent 70%), radial-gradient(700px 360px at 80% 30%, rgba(236,72,153,.09), transparent 70%)",
          }}
        />
        <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-24 pt-10 text-center sm:px-8 lg:pb-32">
          <Briciole attuale={pagina.etichetta} />
          <motion.p
            {...entra(0.1)}
            className="bordo-sfumato mt-10 rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm"
          >
            {pagina.pillola}
          </motion.p>
          <motion.h1
            {...entra(0.2)}
            className="mt-8 text-[36px] font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {pagina.h1[0]}
            <span className="testo-sfumato">{pagina.h1[1]}</span>
          </motion.h1>
          <motion.p {...entra(0.32)} className="mt-7 max-w-[56ch] text-lg leading-relaxed text-tenue">
            {pagina.intro}
          </motion.p>
          <motion.div {...entra(0.44)} className="mt-11 flex w-full max-w-xl flex-col gap-4 sm:flex-row">
            <PulsanteBozza largo />
            <PulsanteSecondario href="#metodo" largo>
              Come funziona
            </PulsanteSecondario>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:pb-32" aria-labelledby="titolo-bisogni">
        <Appare className="mx-auto max-w-3xl text-center">
          <Titolo>
            <span id="titolo-bisogni">{pagina.titoloBisogni}</span>
          </Titolo>
        </Appare>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pagina.bisogni.map((b, i) => (
            <Appare key={b.titolo} ritardo={0.06 * i} className="h-full">
              <div className="h-full rounded-[24px] border border-linea bg-scheda p-7">
                <span className="testo-sfumato text-lg font-bold">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold">{b.titolo}</h3>
                <p className="mt-3 leading-relaxed text-tenue">{b.testo}</p>
              </div>
            </Appare>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:pb-32" aria-labelledby="titolo-contenuti">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Appare>
            <Titolo>
              <span id="titolo-contenuti">
                Cosa c’è nel <span className="testo-sfumato">vostro sito</span>
              </span>
            </Titolo>
            <ul className="mt-10 space-y-5">
              {pagina.contenuti.map((c) => (
                <li key={c} className="flex items-start gap-4 text-lg">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full sfondo-sfumato">
                    <Check size={16} weight="bold" className="text-white" />
                  </span>
                  <span className="text-white/90">{c}</span>
                </li>
              ))}
              <li className="flex items-start gap-4 text-lg">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full sfondo-sfumato">
                  <Check size={16} weight="bold" className="text-white" />
                </span>
                <span className="text-white/90">Una parte dedicata a voi: la vostra storia e il vostro percorso</span>
              </li>
            </ul>
          </Appare>

          <Appare ritardo={0.1}>
            <div className="relative h-full overflow-hidden rounded-[28px] border border-linea bg-scheda p-8 sm:p-10">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-35 blur-3xl sfondo-sfumato"
                aria-hidden="true"
              />
              <h3 className="relative text-2xl font-bold">Farsi trovare su Google</h3>
              <p className="relative mt-3 text-tenue">Ricerche come queste:</p>
              <ul className="relative mt-5 flex flex-wrap gap-3">
                {pagina.ricerche.map((r) => (
                  <li
                    key={r}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-notte"
                  >
                    <MagnifyingGlass size={15} className="text-black/50" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="relative mt-7 leading-relaxed text-tenue">{pagina.testoGoogle}</p>
              <div className="relative mt-8">
                <PulsanteBozza />
              </div>
            </div>
          </Appare>
        </div>
      </section>

      <Metodo />
      <Domande voci={pagina.domande} />
      <AltrePagine escludi={pagina.slug} />
      <Contatti />
    </>
  );
}
