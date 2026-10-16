import { useState, type FormEvent } from "react";
import { EnvelopeSimple, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { CONTATTI } from "../config";
import { Appare, Titolo } from "./ui";

type Campi = { nome: string; attivita: string; telefono: string; messaggio: string };
type Errori = Partial<Record<keyof Campi, string>>;

const VUOTO: Campi = { nome: "", attivita: "", telefono: "", messaggio: "" };

function componiTesto(c: Campi) {
  const righe = [
    "Salve Mattia, vorrei ricevere la bozza gratuita del sito.",
    `Nome: ${c.nome.trim()}`,
    `Attività: ${c.attivita.trim()}`,
  ];
  if (c.telefono.trim()) righe.push(`Telefono: ${c.telefono.trim()}`);
  if (c.messaggio.trim()) righe.push(`Messaggio: ${c.messaggio.trim()}`);
  return righe.join("\n");
}

const stileCampo =
  "w-full rounded-2xl border bg-notte px-4 py-3.5 text-base text-testo placeholder:text-white/40 transition-colors focus:border-rosa focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosa";

export function Contatti() {
  const [campi, setCampi] = useState<Campi>(VUOTO);
  const [errori, setErrori] = useState<Errori>({});
  const [stato, setStato] = useState<"pronto" | "inviato" | "senza-contatti">("pronto");

  const aggiorna = (k: keyof Campi) => (e: { target: { value: string } }) => {
    setCampi((c) => ({ ...c, [k]: e.target.value }));
    if (errori[k]) setErrori((x) => ({ ...x, [k]: undefined }));
  };

  const invia = (e: FormEvent) => {
    e.preventDefault();
    const nuovi: Errori = {};
    if (!campi.nome.trim()) nuovi.nome = "Scrivete il vostro nome.";
    if (!campi.attivita.trim()) nuovi.attivita = "Scrivete il nome della vostra attività.";
    if (campi.telefono.trim() && !/^[+\d][\d\s]{5,}$/.test(campi.telefono.trim()))
      nuovi.telefono = "Controllate il numero: solo cifre e spazi.";
    setErrori(nuovi);
    const primo = (Object.keys(nuovi) as (keyof Campi)[])[0];
    if (primo) {
      document.getElementById(`campo-${primo}`)?.focus();
      return;
    }

    const testo = componiTesto(campi);
    if (CONTATTI.whatsapp) {
      window.open(`https://wa.me/${CONTATTI.whatsapp}?text=${encodeURIComponent(testo)}`, "_blank", "noopener");
      setStato("inviato");
    } else if (CONTATTI.email) {
      window.location.href = `mailto:${CONTATTI.email}?subject=${encodeURIComponent(
        `Bozza gratuita per ${campi.attivita.trim()}`,
      )}&body=${encodeURIComponent(testo)}`;
      setStato("inviato");
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
                Avete un’attività senza sito?{" "}
                <span className="testo-sfumato">Vediamo cosa possiamo fare insieme.</span>
              </span>
            </Titolo>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-tenue">
              Lasciatemi il vostro nome e quello dell’attività: vi preparo la bozza gratuita e vi ricontatto io.
            </p>

            {(CONTATTI.whatsapp || CONTATTI.email || CONTATTI.instagram) && (
              <ul className="mt-10 space-y-4">
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
            onSubmit={invia}
            noValidate
            className="flex flex-col gap-5 rounded-[24px] border border-linea bg-notte/60 p-5 sm:p-8"
          >
            {campo("nome", "Il vostro nome", { obbligatorio: true, auto: "name", esempio: "Es. Giulia Ferri…" })}
            {campo("attivita", "Nome dell’attività", { obbligatorio: true, auto: "organization", esempio: "Es. Trattoria da Giulia…" })}
            {campo("telefono", "Telefono", { tipo: "tel", auto: "tel", esempio: "Es. 333 123 4567…" })}
            {campo("messaggio", "Messaggio", { area: true, esempio: "Es. Siamo una trattoria a Monti e vorremmo un sito con il menu…" })}
            <button
              type="submit"
              className="fuoco mt-2 inline-flex w-full items-center justify-center rounded-full sfondo-sfumato px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap sm:px-8 sm:text-[13px] sm:tracking-[0.28em] text-white transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              Richiedi la bozza
            </button>
            <p className="text-sm text-tenue" role="status" aria-live="polite">
              {stato === "inviato" &&
                "Perfetto! Si è aperta la chat: inviate il messaggio e vi rispondo al più presto."}
              {stato === "senza-contatti" && "I contatti sono in aggiornamento: riprovate tra poco, grazie."}
              {stato === "pronto" && "Nessun impegno: la bozza è gratuita."}
            </p>
          </form>
        </div>
      </Appare>
    </section>
  );
}
