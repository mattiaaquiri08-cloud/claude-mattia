import { useLingua } from "../lingua";
import { Comparsa } from "./ui";

export default function Manifesto() {
  const { t } = useLingua();
  return (
    <section className="px-4 pb-24 pt-20 md:px-8 md:pb-32 md:pt-28">
      <div className="mx-auto max-w-[1400px]">
        <Comparsa>
          <h2 className="stretto max-w-[22ch] text-[clamp(2.6rem,7vw,5.8rem)] font-[720] uppercase leading-[0.92] text-inchiostro">
            {t.manifesto.titolo}
          </h2>
        </Comparsa>
        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <Comparsa ritardo={0.1}>
            <p className="max-w-[46ch] text-lg leading-relaxed text-grigio">{t.manifesto.testo}</p>
            <div aria-hidden="true" className="cementine mt-10 h-24 w-full md:h-32" />
          </Comparsa>
          <ul className="border-t border-inchiostro/15">
            {t.manifesto.pilastri.map((p, i) => (
              <li key={p.nome} className="border-b border-inchiostro/15">
                <Comparsa ritardo={0.08 * i} y={14}>
                  <div className="grid gap-2 py-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:items-baseline sm:gap-8 md:py-8">
                    <p
                      className={`stretto text-[clamp(2.2rem,5vw,3.6rem)] font-[720] uppercase leading-none ${
                        i === 0 ? "text-rosso" : "text-inchiostro"
                      }`}
                    >
                      {p.nome}
                    </p>
                    <p className="text-[1.05rem] leading-relaxed text-grigio">{p.testo}</p>
                  </div>
                </Comparsa>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
