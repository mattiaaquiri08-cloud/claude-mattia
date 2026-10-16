import { motion, useReducedMotion } from "motion/react";
import { Appare, Etichetta, PulsanteBozza, Titolo } from "./ui";

const PASSI = [
  {
    n: "01",
    titolo: "Mi scrivete",
    testo: "Cliccate il tasto «Richiedi la bozza» qui sotto: la vostra richiesta mi arriva subito. Bastano il vostro nome e quello dell’attività.",
  },
  {
    n: "02",
    titolo: "Ci conosciamo",
    testo: "Una telefonata o un incontro di persona: mi raccontate la vostra attività, la vostra storia e cosa vi serve.",
  },
  {
    n: "03",
    titolo: "Bozza gratuita",
    testo: "Preparo la bozza del vostro sito e ve la mostro su Zoom o di persona. Non pagate nulla.",
  },
  {
    n: "04",
    titolo: "Online",
    testo: "Se vi piace, parliamo del prezzo e pubblico il sito. Se non vi piace, finisce lì.",
  },
];

export function Metodo() {
  const ridotto = useReducedMotion();
  return (
    <section id="metodo" className="relative overflow-hidden border-y border-linea bg-notte-2 py-24 lg:py-32" aria-labelledby="titolo-metodo">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Appare className="mx-auto max-w-3xl text-center">
          <Etichetta>Come funziona</Etichetta>
          <Titolo className="mt-5">
            <span id="titolo-metodo">
              Iniziate con MAQ in <span className="testo-sfumato">4 semplici passi</span>
            </span>
          </Titolo>
        </Appare>

        <div className="relative mt-16">
          {/* la barra sfumata del logo, che si apre dal centro quando arriva la sezione */}
          <motion.div
            className="absolute left-0 right-0 top-[27px] hidden h-px origin-center sfondo-sfumato lg:block"
            initial={ridotto ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            aria-hidden="true"
          />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {PASSI.map((p, i) => (
              <Appare key={p.n} ritardo={0.1 * i}>
                <li className="relative">
                  <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-notte-2 text-lg font-bold">
                    <span className="testo-sfumato">{p.n}</span>
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{p.titolo}</h3>
                  <p className="mt-3 leading-relaxed text-tenue">{p.testo}</p>
                </li>
              </Appare>
            ))}
          </ol>
        </div>

        <Appare className="mt-16 flex justify-center">
          <PulsanteBozza />
        </Appare>
      </div>
    </section>
  );
}
