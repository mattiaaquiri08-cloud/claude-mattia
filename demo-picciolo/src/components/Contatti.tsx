import { ArrowUpRight, CheckCircle, EnvelopeSimple, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { CONTATTI, linkEmail, linkTelefono, linkWhatsApp, MOTIVI, type Motivo } from "../config";
import { Comparsa, EASE, TitoloSezione, useMotivo } from "./ui";

const CANALI = [
  { Icona: Phone, nome: "Chiamami", valore: CONTATTI.telefono, href: linkTelefono },
  { Icona: WhatsappLogo, nome: "Scrivimi su WhatsApp", valore: CONTATTI.telefono, href: linkWhatsApp(), esterno: true },
  { Icona: EnvelopeSimple, nome: "Email", valore: CONTATTI.email, href: linkEmail },
  { Icona: MapPin, nome: CONTATTI.sede, valore: `${CONTATTI.indirizzo}, ${CONTATTI.citta}`, href: CONTATTI.mappa, esterno: true },
];

type Errori = Partial<Record<"nome" | "recapito" | "privacy", string>>;

const campo =
  "mt-2 w-full rounded-[12px] border border-linea bg-sfondo px-4 py-3 text-[1rem] text-testo placeholder:text-testo-2/80 transition-colors focus-visible:border-accento focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accento/30 aria-[invalid=true]:border-red-600";

export default function Contatti() {
  const { motivo, scegli } = useMotivo();
  const [errori, setErrori] = useState<Errori>({});
  const [inviato, setInviato] = useState<null | "email" | "whatsapp">(null);

  const invia = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === "whatsapp" ? "whatsapp" : "email";
    const d = new FormData(e.currentTarget);
    const nome = String(d.get("nome") ?? "").trim();
    const telefono = String(d.get("telefono") ?? "").trim();
    const email = String(d.get("email") ?? "").trim();
    const messaggio = String(d.get("messaggio") ?? "").trim();

    const nuovi: Errori = {};
    if (nome.length < 2) nuovi.nome = "Scrivi il tuo nome, così so come chiamarti.";
    if (!telefono && !email) nuovi.recapito = "Lascia almeno un telefono o un'email per essere ricontattato.";
    else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nuovi.recapito = "L'email non sembra corretta.";
    if (!d.get("privacy")) nuovi.privacy = "Serve il consenso per poterti rispondere.";
    setErrori(nuovi);
    if (Object.keys(nuovi).length) {
      const primo = e.currentTarget.querySelector<HTMLElement>("[aria-invalid=true]");
      primo?.focus();
      return;
    }

    const richiesta = MOTIVI.find((m) => m.id === motivo)?.testo ?? "";
    const testo = [
      `Buongiorno Enrico, sono ${nome}.`,
      `Mi interessa: ${richiesta.toLowerCase()}.`,
      messaggio && `\n${messaggio}`,
      `\nRecapiti: ${[telefono, email].filter(Boolean).join(" / ")}`,
    ]
      .filter(Boolean)
      .join("\n");

    if (via === "whatsapp") {
      window.open(linkWhatsApp(testo), "_blank", "noopener");
    } else {
      window.location.href = `${linkEmail}?subject=${encodeURIComponent(`Richiesta dal sito: ${richiesta}`)}&body=${encodeURIComponent(testo)}`;
    }
    setInviato(via);
  };

  return (
    <section id="contatti" className="bg-superficie py-20 md:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 md:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <TitoloSezione
            titolo="Parliamone"
            testo="Un confronto, una diagnosi gratuita o un check-up previdenziale. Scegli tu come: rispondo personalmente."
          />
          <Comparsa ritardo={0.06}>
            <ul className="mt-10 divide-y divide-linea border-y border-linea">
              {CANALI.map(({ Icona, nome, valore, href, esterno }) => (
                <li key={nome}>
                  <a
                    href={href}
                    {...(esterno ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-h-[4.5rem] items-center gap-4 py-4"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-velo text-accento transition-colors group-hover:bg-accento group-hover:text-su-accento">
                      <Icona size={22} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-testo-2">{nome}</span>
                      <span className="block truncate text-[1.05rem] font-medium text-testo">{valore}</span>
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="shrink-0 text-testo-2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accento"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Comparsa>
        </div>

        <Comparsa ritardo={0.1} className="rounded-[20px] bg-sfondo p-6 ring-1 ring-linea md:p-10">
          <AnimatePresence mode="wait">
            {inviato ? (
              <motion.div
                key="fatto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                role="status"
                className="flex min-h-[26rem] flex-col items-start justify-center"
              >
                <CheckCircle size={48} weight="light" className="text-accento" aria-hidden="true" />
                <h3 className="mt-5 text-[1.6rem] font-semibold tracking-[-0.02em] text-testo">Messaggio pronto</h3>
                <p className="mt-3 max-w-[42ch] leading-relaxed text-testo-2">
                  {inviato === "whatsapp"
                    ? "Si è aperto WhatsApp con il testo già scritto: premi invia e ti rispondo al più presto."
                    : "Si è aperta la tua email con il testo già scritto: premi invia e ti rispondo al più presto."}
                </p>
                <button
                  type="button"
                  onClick={() => setInviato(null)}
                  className="mt-6 min-h-11 text-[0.95rem] font-medium text-accento hover:underline"
                >
                  Torna al modulo
                </button>
              </motion.div>
            ) : (
              <motion.form key="modulo" noValidate onSubmit={invia} exit={{ opacity: 0 }} className="grid gap-5">
                <h3 className="text-[1.4rem] font-semibold tracking-[-0.02em] text-testo">Scrivimi un messaggio</h3>

                <div>
                  <label htmlFor="motivo" className="text-sm font-medium text-testo">
                    Mi interessa
                  </label>
                  <select
                    id="motivo"
                    name="motivo"
                    value={motivo}
                    onChange={(e) => scegli(e.target.value as Motivo)}
                    className={`${campo} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath fill='%2364748b' d='M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32z'/%3E%3C/svg%3E\")",
                    }}
                  >
                    {MOTIVI.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.testo}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="nome" className="text-sm font-medium text-testo">
                    Nome e cognome
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    autoComplete="name"
                    aria-invalid={!!errori.nome}
                    aria-describedby={errori.nome ? "errore-nome" : undefined}
                    className={campo}
                  />
                  {errori.nome && (
                    <p id="errore-nome" aria-live="polite" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                      {errori.nome}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="telefono" className="text-sm font-medium text-testo">
                      Telefono
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      aria-invalid={!!errori.recapito}
                      aria-describedby="aiuto-recapito"
                      className={campo}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-testo">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      spellCheck={false}
                      aria-invalid={!!errori.recapito}
                      aria-describedby="aiuto-recapito"
                      className={campo}
                    />
                  </div>
                  <p
                    id="aiuto-recapito"
                    aria-live="polite"
                    className={`-mt-3 text-sm sm:col-span-2 ${errori.recapito ? "text-red-600 dark:text-red-400" : "text-testo-2"}`}
                  >
                    {errori.recapito ?? "Basta uno dei due."}
                  </p>
                </div>

                <div>
                  <label htmlFor="messaggio" className="text-sm font-medium text-testo">
                    Messaggio <span className="font-normal text-testo-2">(facoltativo)</span>
                  </label>
                  <textarea id="messaggio" name="messaggio" rows={4} className={`${campo} resize-y`} />
                </div>

                <div>
                  <label className="flex gap-3 text-sm leading-snug text-testo-2">
                    <input
                      type="checkbox"
                      name="privacy"
                      aria-invalid={!!errori.privacy}
                      aria-describedby={errori.privacy ? "errore-privacy" : undefined}
                      className="mt-0.5 size-5 shrink-0 accent-[var(--accento)]"
                    />
                    <span>
                      Ho letto l'
                      <a
                        href="https://www.enricopicciolo.it/privacy-policy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accento underline underline-offset-2"
                      >
                        informativa privacy
                      </a>{" "}
                      e acconsento al trattamento dei dati (Reg. UE 679/2016), solo per rispondere alla mia richiesta.
                    </span>
                  </label>
                  {errori.privacy && (
                    <p id="errore-privacy" aria-live="polite" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                      {errori.privacy}
                    </p>
                  )}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="submit"
                    value="email"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accento px-6 text-[0.95rem] font-medium text-su-accento transition-colors hover:bg-accento-forte active:scale-[0.98]"
                  >
                    <EnvelopeSimple size={20} aria-hidden="true" />
                    Invia via email
                  </button>
                  <button
                    type="submit"
                    value="whatsapp"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-linea px-6 text-[0.95rem] font-medium text-testo transition-colors hover:border-testo active:scale-[0.98]"
                  >
                    <WhatsappLogo size={20} aria-hidden="true" />
                    Invia su WhatsApp
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Comparsa>
      </div>
    </section>
  );
}
