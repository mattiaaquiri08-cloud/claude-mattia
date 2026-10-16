import { useState } from "react";
import { Appare, Titolo } from "./ui";
import { TITOLARE } from "../config";

// Foto del titolare: basta mettere il file public/mattia.jpg. Finché non c’è,
// al suo posto compare il monogramma MAQ.
function FotoTitolare() {
  const [manca, setManca] = useState(false);
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-linea bg-scheda">
      {!manca ? (
        <img
          src={`${import.meta.env.BASE_URL}mattia.jpg`}
          alt={`${TITOLARE}, fondatore di MAQ Web Design`}
          width={800}
          height={1000}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setManca(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-[radial-gradient(420px_320px_at_50%_40%,rgba(176,92,230,.28),transparent_70%)]">
          <span className="text-[110px] leading-none tracking-[0.02em] sm:text-[140px]">
            <span className="font-light">MA</span>
            <span className="font-extrabold testo-sfumato">Q</span>
          </span>
          <span className="text-sm uppercase tracking-[0.34em] text-tenue">{TITOLARE}</span>
        </div>
      )}
    </div>
  );
}

const VALORI = [
  {
    titolo: "Il metodo",
    testo: "Prima vedete la bozza, poi decidete. Nessun anticipo e nessun impegno.",
  },
  {
    titolo: "La visione",
    testo: "Un sito semplice, umano e vostro, che racconta chi siete davvero.",
  },
  {
    titolo: "La missione",
    testo: "Dare alle vostre ottime recensioni il sito che meritano.",
  },
];

export function ChiSono() {
  return (
    <section id="chi-sono" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32" aria-labelledby="titolo-chi-sono">
      <div className="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <Appare>
          <FotoTitolare />
        </Appare>
        <Appare ritardo={0.1}>
          <Titolo>
            <span id="titolo-chi-sono">
              Prima conosco la vostra storia, <span className="testo-sfumato">poi costruisco il sito</span>
            </span>
          </Titolo>
          <div className="mt-7 max-w-[60ch] space-y-5 text-lg leading-relaxed text-tenue">
            <p>
              Sono Mattia Aquiri e con MAQ Web Design creo siti per le attività di Roma: ristoranti, saloni, palestre,
              studi e botteghe che hanno clienti contenti e ottime recensioni, ma ancora nessun sito.
            </p>
            <p>
              Preferisco conoscervi di persona, anche davanti a un piatto di spaghetti. Ascolto la vostra storia e la
              trasformo in un sito che vi somiglia, con una parte dedicata proprio a voi: il vostro percorso e la
              vostra immagine.
            </p>
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {VALORI.map((v) => (
              <div key={v.titolo} className="rounded-2xl border border-linea bg-scheda p-5">
                <dt className="font-semibold">{v.titolo}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-tenue">{v.testo}</dd>
              </div>
            ))}
          </dl>
        </Appare>
      </div>
    </section>
  );
}
