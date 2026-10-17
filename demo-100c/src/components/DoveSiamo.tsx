import { ArrowUpRight, InstagramLogo, MapPin, NavigationArrow, Phone, WhatsappLogo, Wheelchair } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { LOCALE, ORARI, linkTelefono, linkWhatsApp } from "../config";
import { useLingua } from "../lingua";
import { Comparsa } from "./ui";

// giorno e minuti attuali a Roma, qualunque sia il fuso di chi guarda
function adessoARoma() {
  const parti = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Rome",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const v = (tipo: string) => parti.find((p) => p.type === tipo)?.value ?? "";
  const giorno = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(v("weekday"));
  return { giorno, minuti: Number(v("hour")) * 60 + Number(v("minute")) };
}

const min = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3));

export default function DoveSiamo() {
  const { t } = useLingua();
  const [mappa, setMappa] = useState(false);
  const [ora, setOra] = useState(adessoARoma);

  useEffect(() => {
    const id = setInterval(() => setOra(adessoARoma()), 60_000);
    return () => clearInterval(id);
  }, []);

  const fasceOggi = ORARI.find((o) => o.giorno === ora.giorno)?.fasce ?? [];
  const aperto = fasceOggi.some(([a, c]) => ora.minuti >= min(a) && ora.minuti < min(c));
  const prossima = fasceOggi.find(([a]) => min(a) > ora.minuti)?.[0];
  // lunedì in cima, come si legge un orario
  const ordinati = [...ORARI].sort((a, b) => ((a.giorno + 6) % 7) - ((b.giorno + 6) % 7));

  return (
    <section id="dove" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Comparsa>
          <h2 className="stretto text-[clamp(2.8rem,8vw,6rem)] font-[720] uppercase leading-[0.9]">{t.dove.titolo}</h2>
        </Comparsa>
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Comparsa className="grid content-start gap-10">
            <div>
              <h3 className="semistretto text-sm font-semibold uppercase tracking-[0.16em] text-grigio">{t.dove.indirizzo}</h3>
              <address className="mt-3 not-italic">
                <a
                  href={LOCALE.mappa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stretto group inline-flex items-start gap-2 text-[2rem] font-[700] uppercase leading-[1.05] hover:text-rosso"
                >
                  <MapPin size={26} weight="fill" className="mt-1 shrink-0 text-rosso" aria-hidden="true" />
                  <span>
                    {LOCALE.via}
                    <br />
                    {LOCALE.cap} {LOCALE.citta}, {LOCALE.quartiere}
                  </span>
                </a>
              </address>
              <p className="mt-4 flex items-center gap-2 text-sm text-grigio">
                <Wheelchair size={18} aria-hidden="true" /> {t.dove.accessibile}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="semistretto text-sm font-semibold uppercase tracking-[0.16em] text-grigio">{t.dove.orari}</h3>
                <p className={`text-sm font-semibold ${aperto ? "text-inchiostro" : "text-rosso"}`} aria-live="polite">
                  <span
                    aria-hidden="true"
                    className={`mr-2 inline-block size-2 rounded-full align-middle ${aperto ? "bg-emerald-600" : "bg-rosso"}`}
                  />
                  {aperto ? t.dove.aperto : prossima ? `${t.dove.chiuso}. ${t.dove.apre(prossima)}` : t.dove.chiuso}
                </p>
              </div>
              <dl className="mt-4">
                {ordinati.map((o) => {
                  const oggi = o.giorno === ora.giorno;
                  return (
                    <div
                      key={o.giorno}
                      className={`grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-inchiostro/10 py-2.5 ${
                        oggi ? "font-semibold text-inchiostro" : "text-inchiostro/80"
                      }`}
                    >
                      <dt>
                        {t.dove.giorni[o.giorno]}
                        {oggi && <span className="ml-2 text-xs uppercase tracking-[0.1em] text-rosso">{t.dove.oggi}</span>}
                      </dt>
                      <dd className="text-right tabular-nums">
                        {o.fasce.length ? o.fasce.map(([a, c]) => `${a}-${c}`).join(", ") : t.dove.chiusoOggi}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <p className="mt-4 text-sm text-grigio">{t.dove.spesa}</p>
            </div>

            <div>
              <h3 className="semistretto text-sm font-semibold uppercase tracking-[0.16em] text-grigio">{t.dove.contatti}</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  { href: linkTelefono, icona: <Phone size={20} />, testo: LOCALE.telefono, esterno: false },
                  { href: linkWhatsApp(""), icona: <WhatsappLogo size={20} />, testo: "WhatsApp", esterno: true },
                  { href: LOCALE.instagram, icona: <InstagramLogo size={20} />, testo: LOCALE.instagramNome, esterno: true },
                  { href: LOCALE.indicazioni, icona: <NavigationArrow size={20} />, testo: t.dove.indicazioni, esterno: true },
                ].map((c) => (
                  <li key={c.testo}>
                    <a
                      href={c.href}
                      {...(c.esterno ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex min-h-12 items-center gap-3 border border-inchiostro/20 px-4 font-medium transition-colors hover:border-inchiostro hover:bg-inchiostro hover:text-insegna"
                    >
                      <span aria-hidden="true">{c.icona}</span>
                      {c.testo}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Comparsa>

          {/* la mappa di Google si carica solo su richiesta: pagina più leggera e niente cookie senza consenso */}
          <Comparsa ritardo={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden bg-inchiostro sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]">
              {mappa ? (
                <iframe
                  title={t.dove.mappaTitolo}
                  src={LOCALE.mappaIncorporata}
                  className="absolute inset-0 size-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="cementine absolute inset-0 flex items-center justify-center p-6">
                  <div className="max-w-sm bg-insegna p-7 text-center">
                    <MapPin size={34} weight="fill" className="mx-auto text-rosso" aria-hidden="true" />
                    <p className="stretto mt-3 text-[1.8rem] font-[700] uppercase leading-none">{LOCALE.via}</p>
                    <p className="mt-1 text-grigio">
                      {LOCALE.quartiere}, {LOCALE.citta}
                    </p>
                    <button
                      type="button"
                      onClick={() => setMappa(true)}
                      className="semistretto mt-6 inline-flex min-h-12 items-center justify-center gap-2 bg-inchiostro px-5 text-[0.9rem] font-semibold uppercase tracking-[0.08em] text-insegna transition-colors hover:bg-notte"
                    >
                      {t.dove.mappaCarica}
                    </button>
                    <p className="mt-3 text-xs leading-relaxed text-grigio">{t.dove.mappaNota}</p>
                    <a
                      href={LOCALE.indicazioni}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-semibold underline decoration-rosso decoration-2 underline-offset-4"
                    >
                      {t.dove.indicazioni} <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Comparsa>
        </div>
      </div>
    </section>
  );
}
