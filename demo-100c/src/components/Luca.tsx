import { useLingua } from "../lingua";
import { Comparsa, Etichetta } from "./ui";

// Foto di Luca Boccoli (Gambero Rosso, gennaio 2026): per la versione ufficiale usare gli originali del locale.
// Se si svuota, la sezione resta solo tipografica.
const FOTO_LUCA = "foto/luca-scaffale";
const BASE = import.meta.env.BASE_URL;

export default function Luca() {
  const { t, lingua } = useLingua();
  const [apri, chiudi] = lingua === "it" ? ["«", "»"] : ["\u201C", "\u201D"];
  return (
    <section id="persone" className="border-t border-inchiostro/12 px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <Comparsa>
            <Etichetta>{t.luca.etichetta}</Etichetta>
            <h2 className="stretto text-[clamp(3.6rem,10vw,8rem)] font-[740] uppercase leading-[0.86]">
              {t.luca.titolo.split(" ").map((parola, i) => (
                <span key={parola} className={`block ${i === 1 ? "text-rosso" : ""}`}>
                  {parola}
                </span>
              ))}
            </h2>
            <p className="semistretto mt-5 text-lg font-medium uppercase tracking-[0.06em] text-grigio">
              {t.luca.ruolo}
            </p>
            {FOTO_LUCA && (
              <figure className="mt-10">
                <img
                  src={`${BASE}${FOTO_LUCA}-1400.webp`}
                  srcSet={`${BASE}${FOTO_LUCA}-720.webp 720w, ${BASE}${FOTO_LUCA}-1400.webp 1400w`}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  width={1666}
                  height={1333}
                  alt={t.luca.altFoto}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[5/4] w-full object-cover"
                />
                <figcaption className="mt-3 text-sm text-grigio">{t.luca.didascalia}</figcaption>
              </figure>
            )}
          </Comparsa>
        </div>

        <div>
          <Comparsa>
            <blockquote className="stretto text-[clamp(2rem,4.4vw,3.4rem)] font-[650] uppercase leading-[1.02] text-inchiostro">
              <p>
                {apri}
                {t.luca.citazione}
                {chiudi}
              </p>
              <footer className="semistretto mt-4 text-sm font-medium normal-case tracking-normal text-grigio">
                {t.luca.citazioneFonte}
              </footer>
            </blockquote>
          </Comparsa>
          <div className="mt-12 max-w-[60ch] space-y-6 text-[1.1rem] leading-[1.75] text-inchiostro/85">
            {t.luca.paragrafi.map((p, i) => (
              <Comparsa key={p} ritardo={0.04 * i} y={12}>
                <p>{p}</p>
              </Comparsa>
            ))}
          </div>
          <Comparsa className="mt-14">
            <div className="bg-notte px-7 py-8 text-insegna md:px-10 md:py-10">
              <h3 className="stretto text-[2.2rem] font-[720] uppercase leading-none">{t.luca.buio.titolo}</h3>
              <p className="mt-4 max-w-[54ch] leading-relaxed text-insegna/80">{t.luca.buio.testo}</p>
              <a
                href="#eventi"
                className="semistretto mt-6 inline-flex min-h-11 items-center text-sm font-semibold uppercase tracking-[0.1em] text-insegna underline decoration-rosso decoration-2 underline-offset-[6px] hover:decoration-insegna"
              >
                {t.luca.buio.link}
              </a>
            </div>
          </Comparsa>
        </div>
      </div>
    </section>
  );
}
