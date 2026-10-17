import { CheckCircle, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, type FormEvent } from "react";
import { LOCALE, ORARI, linkTelefono, linkWhatsApp } from "../config";
import { useLingua } from "../lingua";
import { Comparsa, EASE, Etichetta } from "./ui";

const BASE = import.meta.env.BASE_URL;

type Campi = { nome: string; data: string; ora: string; persone: string; telefono: string; note: string };
type Errori = Partial<Record<keyof Campi, string>>;

const minuti = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const hhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

// orari prenotabili ogni 30 minuti, fino a un'ora prima della chiusura
function orariDelGiorno(data: string) {
  if (!data) return null;
  const [a, m, g] = data.split("-").map(Number);
  const giorno = new Date(a, m - 1, g).getDay();
  const fasce = ORARI.find((o) => o.giorno === giorno)?.fasce ?? [];
  const lista: string[] = [];
  for (const [inizio, fine] of fasce) {
    for (let t = minuti(inizio); t <= minuti(fine) - 60; t += 30) lista.push(hhmm(t));
  }
  return lista;
}

const oggiIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const stileCampo =
  "w-full min-h-12 border border-inchiostro/30 bg-insegna px-4 py-3 text-base text-inchiostro placeholder:text-grigio/80 transition-colors focus:border-inchiostro focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosso aria-[invalid=true]:border-rosso";

export default function Prenota() {
  const { t, lingua } = useLingua();
  const [campi, setCampi] = useState<Campi>({ nome: "", data: "", ora: "", persone: "2", telefono: "", note: "" });
  const [errori, setErrori] = useState<Errori>({});
  const [inviato, setInviato] = useState(false);

  const orari = useMemo(() => orariDelGiorno(campi.data), [campi.data]);
  const imposta = (k: keyof Campi, v: string) => {
    setCampi((c) => ({ ...c, [k]: v, ...(k === "data" ? { ora: "" } : {}) }));
    setErrori((e) => ({ ...e, [k]: undefined }));
    setInviato(false);
  };

  const invia = (e: FormEvent) => {
    e.preventDefault();
    const err: Errori = {};
    if (campi.nome.trim().length < 3) err.nome = t.prenota.errori.nome;
    if (!campi.data) err.data = t.prenota.errori.data;
    else if (campi.data < oggiIso()) err.data = t.prenota.errori.dataPassata;
    else if (orari && !orari.length) err.data = t.prenota.chiuso;
    if (!err.data && !campi.ora) err.ora = t.prenota.errori.ora;
    if (!campi.persone) err.persone = t.prenota.errori.persone;
    if (campi.telefono.replace(/[^\d]/g, "").length < 8) err.telefono = t.prenota.errori.telefono;
    setErrori(err);
    if (Object.keys(err).length) {
      document.getElementById(`campo-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    const [a, m, g] = campi.data.split("-").map(Number);
    const data = new Date(a, m - 1, g).toLocaleDateString(lingua === "it" ? "it-IT" : "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const testo = t.prenota.messaggio({ ...campi, data, nome: campi.nome.trim(), note: campi.note.trim() });
    window.open(linkWhatsApp(testo), "_blank", "noopener");
    setInviato(true);
  };

  const errore = (k: keyof Campi) =>
    errori[k] ? (
      <p id={`errore-${k}`} className="text-sm font-medium text-rosso">
        {errori[k]}
      </p>
    ) : null;
  const attr = (k: keyof Campi) => ({
    id: `campo-${k}`,
    name: k,
    "aria-invalid": Boolean(errori[k]),
    "aria-describedby": errori[k] ? `errore-${k}` : undefined,
  });

  return (
    <section id="prenota" className="bg-carta/60 px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <Comparsa>
            <Etichetta>{t.prenota.etichetta}</Etichetta>
            <h2 className="stretto text-[clamp(2.8rem,7.5vw,5.6rem)] font-[720] uppercase leading-[0.9]">
              {t.prenota.titolo}
            </h2>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-grigio">{t.prenota.testo}</p>
          </Comparsa>
          <Comparsa ritardo={0.1} className="mt-10 hidden lg:block">
            <img
              src={`${BASE}foto/tavola-verticale-600.webp`}
              srcSet={`${BASE}foto/tavola-verticale-600.webp 600w, ${BASE}foto/tavola-verticale-941.webp 941w`}
              sizes="35vw"
              alt={t.prenota.altFoto}
              loading="lazy"
              width={941}
              height={1672}
              className="aspect-[4/5] w-full max-w-md object-cover"
            />
          </Comparsa>
        </div>

        <Comparsa ritardo={0.05}>
          <form noValidate onSubmit={invia} className="bg-insegna p-6 sm:p-8 md:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid content-start gap-2 sm:col-span-2">
                <label htmlFor="campo-nome" className="text-sm font-semibold">
                  {t.prenota.nome}
                </label>
                <input
                  {...attr("nome")}
                  type="text"
                  autoComplete="name"
                  value={campi.nome}
                  onChange={(e) => imposta("nome", e.target.value)}
                  className={stileCampo}
                />
                {errore("nome")}
              </div>
              <div className="grid content-start gap-2">
                <label htmlFor="campo-data" className="text-sm font-semibold">
                  {t.prenota.data}
                </label>
                <input
                  {...attr("data")}
                  type="date"
                  min={oggiIso()}
                  value={campi.data}
                  onChange={(e) => imposta("data", e.target.value)}
                  className={stileCampo}
                />
                {errore("data") ??
                  (orari && !orari.length ? <p className="text-sm font-medium text-rosso">{t.prenota.chiuso}</p> : null)}
              </div>
              <div className="grid content-start gap-2">
                <label htmlFor="campo-ora" className="text-sm font-semibold">
                  {t.prenota.ora}
                </label>
                <select
                  {...attr("ora")}
                  value={campi.ora}
                  disabled={!orari?.length}
                  onChange={(e) => imposta("ora", e.target.value)}
                  className={`${stileCampo} disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <option value="">{t.prenota.scegliOra}</option>
                  {orari?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {errore("ora")}
              </div>
              <div className="grid content-start gap-2">
                <label htmlFor="campo-persone" className="text-sm font-semibold">
                  {t.prenota.persone}
                </label>
                <select
                  {...attr("persone")}
                  value={campi.persone}
                  onChange={(e) => imposta("persone", e.target.value)}
                  className={stileCampo}
                >
                  {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-grigio">{t.prenota.gruppi}</p>
              </div>
              <div className="grid content-start gap-2">
                <label htmlFor="campo-telefono" className="text-sm font-semibold">
                  {t.prenota.telefono}
                </label>
                <input
                  {...attr("telefono")}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={campi.telefono}
                  onChange={(e) => imposta("telefono", e.target.value)}
                  className={stileCampo}
                />
                {errore("telefono")}
              </div>
              <div className="grid content-start gap-2 sm:col-span-2">
                <label htmlFor="campo-note" className="text-sm font-semibold">
                  {t.prenota.note}
                </label>
                <textarea
                  {...attr("note")}
                  rows={3}
                  value={campi.note}
                  placeholder={t.prenota.notePlaceholder}
                  onChange={(e) => imposta("note", e.target.value)}
                  className={`${stileCampo} resize-y`}
                />
              </div>
            </div>

            <p className="mt-6 border-l-2 border-rosso pl-4 text-[0.95rem] leading-relaxed">{t.prenota.attesa}</p>

            <button
              type="submit"
              className="semistretto mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 bg-rosso px-6 text-base font-semibold uppercase tracking-[0.08em] text-insegna transition-colors hover:bg-rosso-scuro active:scale-[0.99] sm:w-auto"
            >
              <WhatsappLogo size={22} aria-hidden="true" />
              {t.prenota.invia}
            </button>

            <AnimatePresence>
              {inviato && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mt-5 flex items-start gap-2 text-[0.95rem]"
                >
                  <CheckCircle size={22} weight="fill" className="shrink-0 text-inchiostro" aria-hidden="true" />
                  {t.prenota.inviato}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-10 flex flex-col gap-3 border-t border-inchiostro/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-grigio">{t.prenota.oppure}</p>
              <a
                href={linkTelefono}
                className="semistretto inline-flex min-h-12 items-center justify-center gap-2.5 border border-inchiostro px-5 text-[0.95rem] font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-inchiostro hover:text-insegna"
              >
                <Phone size={20} aria-hidden="true" />
                {t.prenota.chiama} {LOCALE.telefono.replace("+39 ", "")}
              </a>
            </div>
          </form>
        </Comparsa>
      </div>
    </section>
  );
}
