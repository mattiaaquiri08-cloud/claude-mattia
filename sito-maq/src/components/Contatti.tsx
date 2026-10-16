import { useState, type FormEvent } from "react";
import { EnvelopeSimple, InstagramLogo, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { CHIAVE_MODULO, CONTATTI, NOME, TITOLARE } from "../config";
import { Appare, Titolo } from "./ui";

type Campi = { nome: string; attivita: string; recapito: string; messaggio: string };
type Errori = Partial<Record<keyof Campi, string>>;
type Stato = "pronto" | "invio" | "inviato" | "inviato-whatsapp" | "errore" | "senza-contatti";

const VUOTO: Campi = { nome: "", attivita: "", recapito: "", messaggio: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO = /^[+\d][\d\s]{5,}$/;

function componiTesto(c: Campi) {
  const righe = [
    "Salve Mattia, vorrei ricevere la bozza gratuita del sito.",
    `Nome: ${c.nome.trim()}`,
    `Attività: ${c.attivita.trim()}`,
    `Recapito: ${c.recapito.trim()}`,
  ];
  if (c.messaggio.trim()) righe.push(`Messaggio: ${c.messaggio.trim()}`);
  return righe.join("\n");
}

const linkWhatsApp = (testo: string) => `https://wa.me/${CONTATTI.whatsapp}?text=${encodeURIComponent(testo)}`;

// Invio automatico con Web3Forms: la richiesta arriva per email, senza che il cliente debba fare altro.
async function inviaEmail(c: Campi, botcheck: boolean) {
  const recapito = c.recapito.trim();
  const risposta = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: CHIAVE_MODULO,
      subject: `Nuova richiesta di bozza: ${c.attivita.trim()}`,
      from_name: "Sito MAQ Web Design",
      ...(EMAIL.test(recapito) ? { replyto: recapito } : {}),
      Nome: c.nome.trim(),
      Attività: c.attivita.trim(),
      Recapito: recapito,
      Messaggio: c.messaggio.trim() || "—",
      botcheck,
    }),
  });
  const dati = (await risposta.json().catch(() => ({}))) as { success?: boolean };
  if (!risposta.ok || !dati.success) throw new Error("invio non riuscito");
}

const stileCampo =
  "w-full rounded-2xl border bg-notte px-4 py-3.5 text-base text-testo placeholder:text-white/40 transition-colors focus:border-rosa focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosa";

export function Contatti() {
  const [campi, setCampi] = useState<Campi>(VUOTO);
  const [errori, setErrori] = useState<Errori>({});
  const [stato, setStato] = useState<Stato>("pronto");
  const [ultimoTesto, setUltimoTesto] = useState("");

  const aggiorna = (k: keyof Campi) => (e: { target: { value: string } }) => {
    setCampi((c) => ({ ...c, [k]: e.target.value }));
    if (errori[k]) setErrori((x) => ({ ...x, [k]: undefined }));
  };

  const invia = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (stato === "invio") return;
    const nuovi: Errori = {};
    if (!campi.nome.trim()) nuovi.nome = "Scrivete il vostro nome.";
    if (!campi.attivita.trim()) nuovi.attivita = "Scrivete il nome della vostra attività.";
    const recapito = campi.recapito.trim();
    if (!recapito) nuovi.recapito = "Lasciate un telefono o un’email per essere ricontattati.";
    else if (!EMAIL.test(recapito) && !TELEFONO.test(recapito))
      nuovi.recapito = "Controllate il recapito: un numero di telefono o un indirizzo email.";
    setErrori(nuovi);
    const primo = (Object.keys(nuovi) as (keyof Campi)[])[0];
    if (primo) {
      document.getElementById(`campo-${primo}`)?.focus();
      return;
    }

    const testo = componiTesto(campi);
    setUltimoTesto(testo);
    if (CHIAVE_MODULO) {
      setStato("invio");
      const botcheck = new FormData(e.currentTarget).get("botcheck") === "on";
      try {
        await inviaEmail(campi, botcheck);
        setStato("inviato");
        setCampi(VUOTO);
      } catch {
        setStato("errore");
      }
    } else if (CONTATTI.whatsapp) {
      window.open(linkWhatsApp(testo), "_blank", "noopener");
      setStato("inviato-whatsapp");
    } else if (CONTATTI.email) {
      window.location.href = `mailto:${CONTATTI.email}?subject=${encodeURIComponent(
        `Bozza gratuita per ${campi.attivita.trim()}`,
      )}&body=${encodeURIComponent(testo)}`;
      setStato("inviato-whatsapp");
    } else {
      setStato("senza-contatti");
    }
  };

  const campo = (
    k: keyof Campi,
    etichetta: string,
    opzioni: { obbligatorio?: boolean; tipo?: string; auto?: string; area?: boolean; esempio?: string } = {},
  ) => {
    const id = `campo-${k}`;
    const errore = errori[k];
    const classi = `${stileCampo} ${errore ? "border-red-400" : "border-white/15"}`;
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-white/90">
          {etichetta}
          {!opzioni.obbligatorio && <span className="font-normal text-tenue"> (facoltativo)</span>}
        </label>
        {opzioni.area ? (
          <textarea
            id={id}
            name={k}
            rows={4}
            placeholder={opzioni.esempio}
            value={campi[k]}
            onChange={aggiorna(k)}
            className={`${classi} resize-y`}
            aria-invalid={!!errore}
            aria-describedby={errore ? `${id}-errore` : undefined}
          />
        ) : (
          <input
            id={id}
            name={k}
            type={opzioni.tipo ?? "text"}
            inputMode={opzioni.tipo === "tel" ? "tel" : undefined}
            placeholder={opzioni.esempio}
            autoComplete={opzioni.auto}
            value={campi[k]}
            onChange={aggiorna(k)}
            className={classi}
            aria-invalid={!!errore}
            aria-describedby={errore ? `${id}-errore` : undefined}
            required={opzioni.obbligatorio}
          />
        )}
        {errore && (
          <p id={`${id}-errore`} className="text-sm text-red-300">
            {errore}
          </p>
        )}
      </div>
    );
  };

  return (
    <section id="contatti" className="px-5 pb-24 sm:px-8 lg:pb-32" aria-labelledby="titolo-contatti">
      <Appare className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-linea bg-scheda">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(700px 400px at 15% 0%, rgba(109,40,246,.25), transparent 70%), radial-gradient(600px 380px at 95% 100%, rgba(240,138,198,.16), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative grid gap-12 p-5 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
          <div>
            <Titolo>
              <span id="titolo-contatti">
                Avete un’attività senza sito? <span className="testo-sfumato">Vediamo cosa possiamo fare insieme.</span>
              </span>
            </Titolo>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-tenue">
              Lasciatemi il vostro nome, quello dell’attività e un recapito: vi preparo la bozza gratuita e vi
              ricontatto io.
            </p>

            {(CONTATTI.whatsapp || CONTATTI.email || CONTATTI.instagram) && (
              <ul className="mt-10 space-y-4">
                {CONTATTI.telefono && (
                  <li>
                    <a
                      className="fuoco inline-flex items-center gap-3 rounded text-lg hover:text-rosa"
                      href={`tel:${CONTATTI.telefono.replace(/\s/g, "")}`}
                    >
                      <Phone size={26} weight="light" className="text-rosa" />
                      {CONTATTI.telefono}
                    </a>
                  </li>
                )}
                {CONTATTI.whatsapp && (
                  <li>
                    <a
                      className="fuoco inline-flex items-center gap-3 rounded text-lg hover:text-rosa"
                      href={`https://wa.me/${CONTATTI.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsappLogo size={26} weight="light" className="text-rosa" />
                      WhatsApp
                    </a>
                  </li>
                )}
                {CONTATTI.email && (
                  <li>
                    <a
                      className="fuoco inline-flex items-center gap-3 rounded text-lg hover:text-rosa"
                      href={`mailto:${CONTATTI.email}`}
                    >
                      <EnvelopeSimple size={26} weight="light" className="text-rosa" />
                      {CONTATTI.email}
                    </a>
                  </li>
                )}
                {CONTATTI.instagram && (
                  <li>
                    <a
                      className="fuoco inline-flex items-center gap-3 rounded text-lg hover:text-rosa"
                      href={`https://instagram.com/${CONTATTI.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InstagramLogo size={26} weight="light" className="text-rosa" />@{CONTATTI.instagram}
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>

          <form
            id="modulo"
            aria-label="Richiesta della bozza gratuita"
            onSubmit={invia}
            noValidate
            className="flex flex-col gap-5 rounded-[24px] border border-linea bg-notte/60 p-5 sm:p-8"
          >
            {campo("nome", "Il vostro nome", { obbligatorio: true, auto: "name", esempio: "Es. Giulia Ferri…" })}
            {campo("attivita", "Nome dell’attività", {
              obbligatorio: true,
              auto: "organization",
              esempio: "Es. Trattoria da Giulia…",
            })}
            {campo("recapito", "Telefono o email", {
              obbligatorio: true,
              esempio: "Es. 333 123 4567 o email…",
            })}
            {/* campo trappola per i programmi automatici: le persone non lo vedono */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            {campo("messaggio", "Messaggio", {
              area: true,
              esempio: "Es. Siamo una trattoria a Monti e vorremmo un sito con il menu…",
            })}
            <button
              type="submit"
              disabled={stato === "invio"}
              className="fuoco mt-2 disabled:cursor-wait disabled:opacity-70 inline-flex w-full items-center justify-center rounded-full sfondo-sfumato px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap sm:px-8 sm:text-[13px] sm:tracking-[0.28em] text-white transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              {stato === "invio" ? "Invio in corso…" : "Richiedi la bozza"}
            </button>
            <div className="text-sm leading-relaxed text-tenue" role="status" aria-live="polite">
              {stato === "inviato" && (
                <p className="text-white/90">
                  Richiesta inviata, grazie. Vi ricontatto io al più presto.
                  {CONTATTI.whatsapp && (
                    <>
                      {" "}
                      Se preferite, potete scrivermi anche su{" "}
                      <a
                        className="fuoco rounded underline underline-offset-2 hover:text-rosa"
                        href={linkWhatsApp(ultimoTesto)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp
                      </a>
                      .
                    </>
                  )}
                </p>
              )}
              {stato === "inviato-whatsapp" && (
                <p>Si è aperta la chat: inviate il messaggio e vi rispondo al più presto.</p>
              )}
              {stato === "errore" && (
                <p className="text-red-300">
                  L’invio non è riuscito. Riprovate tra poco oppure scrivetemi{" "}
                  {CONTATTI.whatsapp ? (
                    <a
                      className="fuoco rounded underline underline-offset-2"
                      href={linkWhatsApp(ultimoTesto)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      su WhatsApp
                    </a>
                  ) : (
                    <a className="fuoco rounded underline underline-offset-2" href={`mailto:${CONTATTI.email}`}>
                      per email
                    </a>
                  )}
                  .
                </p>
              )}
              {stato === "senza-contatti" && <p>I contatti sono in aggiornamento: riprovate tra poco, grazie.</p>}
              {(stato === "pronto" || stato === "invio") && <p>Nessun impegno: la bozza è gratuita.</p>}
            </div>
            <details className="text-xs leading-relaxed text-tenue">
              <summary className="fuoco cursor-pointer rounded hover:text-testo">
                Inviando il modulo i vostri dati servono solo a rispondervi. Informativa privacy
              </summary>
              <div className="mt-3 space-y-2">
                <p>
                  Titolare del trattamento: {TITOLARE} ({NOME}), {CONTATTI.email}. I dati del modulo (nome, attività,
                  recapito e messaggio) vengono usati solo per rispondere alla vostra richiesta e preparare la bozza: la
                  base giuridica è la vostra richiesta stessa (art. 6.1.b GDPR).
                </p>
                <p>
                  Il modulo è inviato tramite il servizio Web3Forms, che recapita il messaggio per email. I dati non
                  vengono ceduti a terzi né usati per pubblicità e sono conservati solo per il tempo necessario a
                  gestire la richiesta.
                </p>
                <p>
                  Potete chiedere in qualsiasi momento di vedere, correggere o cancellare i vostri dati scrivendo a{" "}
                  {CONTATTI.email}, e avete diritto di reclamo al Garante per la protezione dei dati personali.
                </p>
              </div>
            </details>
          </form>
        </div>
      </Appare>
    </section>
  );
}
