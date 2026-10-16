import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Clock, MagnifyingGlass, MapPin, Storefront } from "@phosphor-icons/react";
import { Appare, Etichetta, Titolo } from "./ui";

const RICERCHE = [
  { attivita: "Calzolaio", zona: "Talenti" },
  { attivita: "Bar", zona: "Trastevere" },
  { attivita: "Parrucchiere", zona: "Monteverde" },
  { attivita: "Pizzeria", zona: "Prati" },
  { attivita: "Centro estetico", zona: "EUR" },
];

const MOTIVI = [
  {
    icona: MagnifyingGlass,
    titolo: "Vi cercano già",
    testo:
      "Ogni giorno qualcuno scrive su Google il vostro mestiere e il vostro quartiere. Con un sito fatto bene, la risposta siete voi.",
  },
  {
    icona: Storefront,
    titolo: "Senza sito, vince chi è accanto",
    testo:
      "Chi cerca sceglie in pochi secondi tra quello che vede. Se trova solo l’attività della porta a fianco, il cliente va da lei.",
  },
  {
    icona: Clock,
    titolo: "Lavora anche quando siete chiusi",
    testo:
      "Orari, servizi, foto, la vostra storia e come contattarvi: il sito risponde a tutte le domande, a qualsiasi ora.",
  },
];

// Barra di ricerca finta che scrive da sola "attività + zona", come farebbe un cliente.
function RicercaGoogle() {
  const ridotto = useReducedMotion();
  const [indice, setIndice] = useState(0);
  const [lettere, setLettere] = useState(0);
  const ricerca = RICERCHE[indice];
  const testo = `${ricerca.attivita.toLowerCase()} ${ricerca.zona}`;
  const finito = ridotto || lettere >= testo.length;

  useEffect(() => {
    if (ridotto) {
      const t = setTimeout(() => setIndice((i) => (i + 1) % RICERCHE.length), 3200);
      return () => clearTimeout(t);
    }
    if (lettere < testo.length) {
      const t = setTimeout(() => setLettere((n) => n + 1), 70);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLettere(0);
      setIndice((i) => (i + 1) % RICERCHE.length);
    }, 2600);
    return () => clearTimeout(t);
  }, [lettere, testo, ridotto]);

  return (
    <div
      className="relative overflow-hidden rounded-[28px] border border-linea bg-scheda p-5 sm:p-7"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl sfondo-sfumato" />
      <div className="relative flex items-center gap-3 rounded-full bg-white px-5 py-3.5 text-[15px] text-notte shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)]">
        <MagnifyingGlass size={20} className="shrink-0 text-black/50" />
        <span className="min-w-0 truncate">
          {ridotto ? testo : testo.slice(0, lettere)}
          {!ridotto && <span className="ml-px inline-block h-[1.1em] w-px translate-y-[3px] animate-pulse bg-notte" />}
        </span>
      </div>

      {/* i risultati restano sempre al loro posto (cambia solo la trasparenza): così la pagina non salta */}
      <div className="relative mt-6">
        <motion.div
          className="space-y-3"
          initial={false}
          animate={{ opacity: finito ? 1 : 0.15, y: finito || ridotto ? 0 : 8 }}
          transition={{ duration: finito ? 0.45 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bordo-sfumato rounded-2xl p-4">
            <p className="text-xs text-tenue">www.la-vostra-attivita.it</p>
            <p className="mt-1 truncate text-lg font-semibold text-[#b9a6ff]">
              {ricerca.attivita} a {ricerca.zona} · Il vostro sito
            </p>
            <p className="mt-1 text-sm leading-relaxed text-tenue">
              Servizi, orari, foto e la storia del titolare. Chiamate o scrivete su WhatsApp con un tocco.
            </p>
          </div>
          <div className="rounded-2xl border border-linea p-4 opacity-60">
            <p className="text-xs text-tenue">www.attivita-accanto.it</p>
            <p className="mt-1 text-lg font-semibold text-white/80">L’attività della porta a fianco</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-tenue">
              <MapPin size={14} /> Stessa zona, stesso servizio
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function TrovatiSuGoogle() {
  return (
    <section id="google" className="border-y border-linea bg-notte-2" aria-labelledby="titolo-google">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Appare>
            <Etichetta>Perché serve un sito</Etichetta>
            <Titolo className="mt-6">
              <span id="titolo-google">
                Quando vi cercano su Google, <span className="testo-sfumato">dovete esserci voi</span>
              </span>
            </Titolo>
            <p className="mt-6 text-lg leading-relaxed text-tenue">
              Oggi chi ha bisogno di un calzolaio a Talenti o di un bar a Trastevere non chiede in giro: apre Google e
              scrive cosa cerca e dove. I primi risultati si prendono il cliente.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-tenue">
              Il sito che preparo è costruito anche per questo (la cosiddetta SEO): testi chiari sul vostro lavoro e
              sulla vostra zona, pagine veloci e leggibili dal telefono, collegate alla vostra scheda Google. Così è più
              facile che chi cerca trovi voi, e non{" "}
              <span className="text-white">regaliate clienti all’attività della porta a fianco</span>.
            </p>
          </Appare>

          <Appare ritardo={0.1}>
            <RicercaGoogle />
          </Appare>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {MOTIVI.map(({ icona: Icona, titolo, testo }, i) => (
            <Appare key={titolo} ritardo={0.08 * i}>
              <div className="h-full rounded-[24px] border border-linea bg-scheda p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-full sfondo-sfumato">
                  <Icona size={22} weight="bold" className="text-white" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{titolo}</h3>
                <p className="mt-3 leading-relaxed text-tenue">{testo}</p>
              </div>
            </Appare>
          ))}
        </div>
      </div>
    </section>
  );
}
