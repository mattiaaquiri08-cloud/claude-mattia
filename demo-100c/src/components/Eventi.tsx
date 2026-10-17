import { CaretDown, InstagramLogo, Info } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { DIMOSTRATIVO, LOCALE, linkTelefono, linkWhatsApp } from "../config";
import { EVENTI_DEMO } from "../dati-demo";
import { caricaScheda, prezzo, vero, type Origine, type Riga } from "../fogli";
import { useLingua, type Lingua } from "../lingua";
import { Comparsa, Etichetta, Pulsante } from "./ui";

type Evento = {
  data: Date | null;
  ora: string;
  titolo: string;
  descrizione: string;
  immagine: string;
  prezzo: string;
  prenotazione: string;
  esempio: boolean;
};

// accetta 25/11/2026, 25-11-2026 e 2026-11-25
function leggiData(v: string): Date | null {
  const s = v.trim();
  let m = s.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return null;
}

function daRiga(r: Riga, lingua: Lingua): Evento {
  const scegli = (base: string) => (lingua === "en" && r[`${base}_en`]) || r[base] || "";
  return {
    data: leggiData(r.data ?? ""),
    ora: r.ora ?? "",
    titolo: scegli("titolo"),
    descrizione: scegli("descrizione"),
    immagine: r.immagine ?? "",
    prezzo: r.prezzo ?? "",
    prenotazione: (r.prenotazione ?? "").trim(),
    esempio: vero(r.esempio, false),
  };
}

export default function Eventi() {
  const { t, lingua } = useLingua();
  const [stato, setStato] = useState<{ righe: Riga[]; origine: Origine } | null>(null);

  useEffect(() => {
    let vivo = true;
    caricaScheda("eventi").then((r) => vivo && setStato(r.origine === "demo" ? { righe: EVENTI_DEMO, origine: "demo" } : r));
    return () => {
      vivo = false;
    };
  }, []);

  // un evento resta tra i prossimi per tutto il suo giorno; quelli passati non vengono mai mostrati come futuri
  const { prossimi, passati } = useMemo(() => {
    const oggi = new Date();
    oggi.setHours(0, 0, 0, 0);
    const tutti = (stato?.righe ?? [])
      .filter((r) => vero(r.pubblica))
      .map((r) => daRiga(r, lingua))
      .filter((e) => e.titolo);
    return {
      prossimi: tutti
        .filter((e) => (e.data ? e.data >= oggi : e.esempio))
        .sort((a, b) => (a.data?.getTime() ?? Infinity) - (b.data?.getTime() ?? Infinity)),
      passati: tutti.filter((e) => e.data && e.data < oggi).sort((a, b) => b.data!.getTime() - a.data!.getTime()),
    };
  }, [stato, lingua]);

  const locale = lingua === "it" ? "it-IT" : "en-GB";
  const dataLunga = (d: Date) => d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });

  const azione = (e: Evento) => {
    const quando = e.data ? dataLunga(e.data) : "";
    const p = e.prenotazione.toLowerCase();
    if (/^https?:\/\//.test(e.prenotazione)) return { href: e.prenotazione, testo: t.eventi.prenota, esterno: true };
    if (p.startsWith("tel")) return { href: linkTelefono, testo: t.eventi.prenota, esterno: false };
    if (p) return { href: linkWhatsApp(t.eventi.messaggio(e.titolo, quando)), testo: t.eventi.info, esterno: true };
    return null;
  };

  return (
    <section id="eventi" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <Comparsa>
            <Etichetta>{t.eventi.etichetta}</Etichetta>
            <h2 className="stretto text-[clamp(2.6rem,7vw,5.2rem)] font-[720] uppercase leading-[0.92]">
              {t.eventi.titolo}
            </h2>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-grigio">{t.eventi.testo}</p>
          </Comparsa>
          <Comparsa ritardo={0.1} className="mt-12">
            <h3 className="semistretto text-sm font-semibold uppercase tracking-[0.16em] text-grigio">
              {t.eventi.formatiTitolo}
            </h3>
            <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {t.eventi.formati.map((f) => (
                <div key={f.nome}>
                  <dt className="stretto text-[1.7rem] font-[700] uppercase leading-none">{f.nome}</dt>
                  <dd className="mt-2 leading-relaxed text-grigio">{f.testo}</dd>
                </div>
              ))}
            </dl>
          </Comparsa>
        </div>

        <div>
          {(stato?.origine === "demo" || (DIMOSTRATIVO && stato)) && (
            <div className="mb-8 flex gap-3 border-l-2 border-rosso bg-carta/70 px-5 py-4 text-[0.95rem] leading-relaxed">
              <Info size={22} className="mt-0.5 shrink-0 text-rosso" aria-hidden="true" />
              <p>{stato?.origine === "demo" ? t.eventi.demoTesto : t.eventi.demoFoglio}</p>
            </div>
          )}
          <h3 className="semistretto text-sm font-semibold uppercase tracking-[0.16em] text-grigio">{t.eventi.prossimi}</h3>
          {!stato ? (
            <div className="mt-6 grid animate-pulse gap-4" aria-hidden="true">
              {[0, 1].map((i) => (
                <div key={i} className="h-36 bg-carta" />
              ))}
            </div>
          ) : prossimi.length ? (
            <ul className="mt-6 grid gap-4">
              {prossimi.map((e, i) => {
                const a = azione(e);
                return (
                  <li key={`${e.titolo}-${i}`}>
                    <Comparsa ritardo={0.06 * i} y={14}>
                      <article className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-5 bg-carta/60 p-5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-7 sm:p-7">
                        <div className="flex flex-col items-center justify-center bg-inchiostro py-4 text-insegna">
                          {e.data ? (
                            <>
                              <span className="semistretto text-xs font-semibold uppercase tracking-[0.12em] text-insegna/70">
                                {e.data.toLocaleDateString(locale, { month: "short" })}
                              </span>
                              <span className="stretto text-[3.2rem] font-[740] leading-none">{e.data.getDate()}</span>
                              <span className="semistretto text-xs uppercase tracking-[0.1em] text-insegna/70">
                                {e.data.toLocaleDateString(locale, { weekday: "short" })}
                              </span>
                            </>
                          ) : (
                            <span className="semistretto px-2 text-center text-xs font-semibold uppercase leading-snug tracking-[0.1em]">
                              {lingua === "it" ? "Data in arrivo" : "Date to come"}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          {e.esempio && (
                            <p className="semistretto mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-rosso">
                              {t.eventi.esempio}
                            </p>
                          )}
                          <h4 className="stretto text-[1.9rem] font-[700] uppercase leading-[1.02]">{e.titolo}</h4>
                          {(e.ora || e.prezzo) && (
                            <p className="mt-2 text-sm font-medium text-inchiostro">
                              {[e.ora, e.prezzo && (Number.isNaN(Number(e.prezzo.replace(",", "."))) ? e.prezzo : prezzo(e.prezzo, lingua))]
                                .filter(Boolean)
                                .join(" | ")}
                            </p>
                          )}
                          {e.descrizione && <p className="mt-2 leading-relaxed text-grigio">{e.descrizione}</p>}
                          {e.immagine && (
                            <img
                              src={e.immagine}
                              alt=""
                              loading="lazy"
                              className="mt-4 aspect-[16/9] w-full object-cover"
                            />
                          )}
                          {a && (
                            <a
                              href={a.href}
                              {...(a.esterno ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                              className="semistretto mt-4 inline-flex min-h-11 items-center text-sm font-semibold uppercase tracking-[0.1em] underline decoration-rosso decoration-2 underline-offset-[6px] hover:text-rosso"
                            >
                              {a.testo}
                            </a>
                          )}
                        </div>
                      </article>
                    </Comparsa>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-grigio">{t.eventi.nessuno}</p>
          )}

          <Pulsante href={LOCALE.instagram} esterno variante="contorno" className="mt-8">
            <InstagramLogo size={20} aria-hidden="true" />
            {t.eventi.seguici}
          </Pulsante>

          {passati.length > 0 && (
            <details className="group mt-12 border-t border-inchiostro/15 pt-6">
              <summary className="semistretto flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-semibold uppercase tracking-[0.16em] text-grigio [&::-webkit-details-marker]:hidden">
                {t.eventi.passati} ({passati.length})
                <CaretDown size={18} className="transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ul className="mt-4 grid gap-5">
                {passati.map((e, i) => (
                  <li key={`${e.titolo}-${i}`} className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                    <p className="text-sm text-grigio first-letter:uppercase">{dataLunga(e.data!)} {e.data!.getFullYear()}</p>
                    <div>
                      <p className="stretto text-[1.4rem] font-[680] uppercase leading-tight">{e.titolo}</p>
                      {e.descrizione && <p className="mt-1 text-sm leading-relaxed text-grigio">{e.descrizione}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </div>
    </section>
  );
}
