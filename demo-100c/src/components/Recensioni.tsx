import { ArrowUpRight, GoogleLogo } from "@phosphor-icons/react";
import { GOOGLE, LOCALE } from "../config";
import { useLingua } from "../lingua";
import { Comparsa, Stelle } from "./ui";

export default function Recensioni() {
  const { t, lingua } = useLingua();
  const voto = GOOGLE.voto.toLocaleString(lingua === "it" ? "it-IT" : "en-GB", { minimumFractionDigits: 1 });
  const [apri, chiudi] = lingua === "it" ? ["«", "»"] : ["“", "”"];

  return (
    <section className="bg-carta/60 px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
          <Comparsa>
            <h2 className="stretto text-[clamp(2.6rem,6vw,4.6rem)] font-[720] uppercase leading-[0.92]">
              {t.recensioni.titolo}
            </h2>
            <div className="mt-10 flex items-end gap-5">
              <p className="stretto text-[clamp(6rem,14vw,9rem)] font-[760] leading-[0.8] text-inchiostro">{voto}</p>
              <div className="pb-1">
                <Stelle voto={GOOGLE.voto} size={22} className="text-rosso" />
                <p className="mt-2 flex items-center gap-1.5 text-sm font-medium">
                  <GoogleLogo size={16} weight="bold" aria-hidden="true" />
                  {t.recensioni.numero(GOOGLE.recensioni)} {t.recensioni.su}
                </p>
              </div>
            </div>
            <p className="sr-only">
              {voto} / 5, {t.recensioni.numero(GOOGLE.recensioni)} {t.recensioni.su}
            </p>
            <p className="mt-3 text-xs text-grigio">{t.recensioni.aggiornato(GOOGLE.aggiornato)}</p>

            <h3 className="semistretto mt-12 text-sm font-semibold uppercase tracking-[0.16em] text-grigio">
              {t.recensioni.temiTitolo}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {t.recensioni.temi.map((tema) => (
                <li key={tema} className="border border-inchiostro/20 bg-insegna px-3.5 py-2 text-[0.95rem]">
                  {tema}
                </li>
              ))}
            </ul>
            <a
              href={LOCALE.mappa}
              target="_blank"
              rel="noopener noreferrer"
              className="semistretto mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] underline decoration-rosso decoration-2 underline-offset-[6px] hover:text-rosso"
            >
              {t.recensioni.leggi}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Comparsa>

          {/* recensioni vere, a scalini: niente carosello, si leggono tutte */}
          <ul className="grid gap-5 md:grid-cols-2">
            {t.recensioni.citazioni.map((c, i) => (
              <li key={c.autore} className={i % 2 === 1 ? "md:translate-y-12" : ""}>
                <Comparsa ritardo={0.07 * i} y={16}>
                  <figure className="flex h-full flex-col bg-insegna p-7 md:p-8">
                    <Stelle voto={c.stelle} size={16} className="text-rosso" />
                    <span className="sr-only">{c.stelle} / 5</span>
                    <blockquote className="mt-5 flex-1 text-[1.12rem] leading-relaxed" lang="it">
                      {apri}
                      {c.testo}
                      {chiudi}
                    </blockquote>
                    {c.traduzione && (
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-grigio">
                        {c.traduzione} <span className="text-xs">(translated from Italian)</span>
                      </p>
                    )}
                    <figcaption className="mt-6 text-sm">
                      <span className="font-semibold">{c.autore}</span>
                      <span className="text-grigio">, {t.recensioni.fonte}</span>
                    </figcaption>
                  </figure>
                </Comparsa>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24 border-t border-inchiostro/15 pt-12 md:mt-32">
          <h3 className="semistretto text-sm font-semibold uppercase tracking-[0.16em] text-grigio">
            {t.recensioni.stampaTitolo}
          </h3>
          <ul className="mt-8 grid gap-10 md:grid-cols-3 md:gap-12">
            {t.recensioni.stampa.map((s, i) => (
              <li key={s.fonte}>
                <Comparsa ritardo={0.07 * i} y={14}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <p className="stretto text-[1.75rem] font-[650] uppercase leading-[1.08] transition-colors group-hover:text-rosso">
                      {apri}
                      {s.testo}
                      {chiudi}
                    </p>
                    <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold">
                      {s.fonte}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </p>
                  </a>
                </Comparsa>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
