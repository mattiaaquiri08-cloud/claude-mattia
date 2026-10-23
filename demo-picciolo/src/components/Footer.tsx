import { CONTATTI, linkEmail, linkTelefono } from "../config";

export default function Footer() {
  return (
    <footer className="bg-notte text-white/75">
      <div className="mx-auto max-w-[1280px] px-4 pb-28 pt-14 md:px-8 md:pb-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <img src="./foto/logo-bianco.webp" alt="Enrico Picciolo, Financial Advisor Fineco" width={900} height={196} loading="lazy" className="h-11 w-auto" />
            <p className="mt-5 max-w-[36ch] text-sm leading-relaxed">
              Consulente finanziario abilitato all'offerta fuori sede per FinecoBank S.p.A., soggetto autorizzato e vigilato
              da Consob. Delibera Consob n. 12283 del 22/12/1999.
            </p>
          </div>
          <div className="text-sm leading-relaxed">
            <p className="font-medium text-white">Contatti</p>
            <p className="mt-3">
              {CONTATTI.sede}
              <br />
              {CONTATTI.indirizzo}, {CONTATTI.citta}
            </p>
            <p className="mt-3">
              <a href={linkTelefono} className="hover:text-white">
                {CONTATTI.telefono}
              </a>
              <br />
              <a href={linkEmail} className="break-all hover:text-white">
                {CONTATTI.email}
              </a>
            </p>
          </div>
          <div className="text-sm leading-relaxed">
            <p className="font-medium text-white">Link utili</p>
            <ul className="mt-3 space-y-1.5">
              {[
                { t: "Privacy policy", h: "https://www.enricopicciolo.it/privacy-policy/" },
                { t: "Cookie policy", h: "https://www.enricopicciolo.it/cookie-policy/" },
                { t: "Albo OCF", h: "https://www.organismocf.it/portal/web/portale-ocf/home" },
                { t: "FinecoBank", h: "https://it.finecobank.com/" },
              ].map((l) => (
                <li key={l.t}>
                  <a href={l.h} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {l.t}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/55">
          Le informazioni contenute in questo sito sono curate dal consulente e hanno scopo puramente informativo: non
          costituiscono raccomandazioni personalizzate e potrebbero non essere adeguate alle conoscenze, all'esperienza,
          alla situazione finanziaria e agli obiettivi di investimento del singolo lettore. FinecoBank S.p.A. non si assume
          alcuna responsabilità sulla correttezza, completezza e veridicità delle informazioni fornite.
        </p>
      </div>
    </footer>
  );
}
