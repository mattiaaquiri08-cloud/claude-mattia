import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import { Appare, Titolo } from "./ui";

const DOMANDE = [
  {
    d: "La bozza è davvero gratuita?",
    r: "Sì. Preparo la bozza del vostro sito senza chiedervi nulla. Se vi piace parliamo del prezzo, se non vi piace non pagate niente.",
  },
  {
    d: "Quanto costa il sito?",
    r: "Dipende da cosa serve alla vostra attività. Prima vedete la bozza, poi decidiamo insieme il prezzo, senza sorprese.",
  },
  {
    d: "Ho già Instagram, Facebook o un’app di prenotazione. Mi serve un sito?",
    r: "I social sono utili, ma il sito è casa vostra: lo trovate su Google, raccoglie tutto in un posto e lo controllate voi. Lo colleghiamo ai profili e alle app che usate già.",
  },
  {
    d: "Come vedo la bozza?",
    r: "Ve la mostro in videochiamata su Zoom oppure di persona, quando preferite. Così possiamo sistemarla insieme.",
  },
  {
    d: "Lavorate solo a Roma?",
    r: "Lavoro soprattutto con attività di Roma e provincia, perché mi piace conoscere di persona chi c’è dietro ogni sito.",
  },
];

function Voce({ d, r }: { d: string; r: string }) {
  const [aperta, setAperta] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-linea">
      <h3>
        <button
          type="button"
          className="fuoco flex w-full items-center justify-between gap-6 rounded-lg py-6 text-left text-lg font-semibold"
          aria-expanded={aperta}
          aria-controls={id}
          onClick={() => setAperta((v) => !v)}
        >
          {d}
          <Plus
            size={22}
            className={`shrink-0 text-rosa transition-transform duration-300 ${aperta ? "rotate-45" : ""}`}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {aperta && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[65ch] pb-6 leading-relaxed text-tenue">{r}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Domande() {
  return (
    <section id="domande" className="mx-auto max-w-3xl px-5 py-24 sm:px-8 lg:py-28" aria-labelledby="titolo-domande">
      <Appare>
        <Titolo className="text-center">
          <span id="titolo-domande">Domande frequenti</span>
        </Titolo>
      </Appare>
      <Appare ritardo={0.1} className="mt-12 border-t border-linea">
        {DOMANDE.map((x) => (
          <Voce key={x.d} {...x} />
        ))}
      </Appare>
    </section>
  );
}
