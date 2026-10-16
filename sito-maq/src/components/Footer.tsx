import { EnvelopeSimple, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { CONTATTI, NOME, TITOLARE } from "../config";
import { Logo } from "./Logo";

const LINK = [
  { href: "#chi-sono", etichetta: "Chi sono" },
  { href: "#servizi", etichetta: "Servizi" },
  { href: "#metodo", etichetta: "Come funziona" },
  { href: "#domande", etichetta: "Domande" },
  { href: "#contatti", etichetta: "Contatti" },
];

const ANNO = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-linea">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo conSlogan />
          <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-tenue">
            Siti web su misura per le attività di Roma. Bozza gratuita e senza impegno: decidete solo dopo averla
            vista.
          </p>
        </div>

        <nav aria-label="Link utili">
          <p className="text-sm font-semibold">Link utili</p>
          <ul className="mt-4 space-y-3">
            {LINK.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="fuoco rounded text-sm text-tenue hover:text-testo">
                  {l.etichetta}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold">Contatti</p>
          <ul className="mt-4 space-y-3 text-sm text-tenue">
            {CONTATTI.whatsapp && (
              <li>
                <a className="fuoco inline-flex items-center gap-2 rounded hover:text-testo" href={`https://wa.me/${CONTATTI.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <WhatsappLogo size={18} /> WhatsApp
                </a>
              </li>
            )}
            {CONTATTI.email && (
              <li>
                <a className="fuoco inline-flex items-center gap-2 rounded hover:text-testo" href={`mailto:${CONTATTI.email}`}>
                  <EnvelopeSimple size={18} /> {CONTATTI.email}
                </a>
              </li>
            )}
            {CONTATTI.instagram && (
              <li>
                <a className="fuoco inline-flex items-center gap-2 rounded hover:text-testo" href={`https://instagram.com/${CONTATTI.instagram}`} target="_blank" rel="noopener noreferrer">
                  <InstagramLogo size={18} /> @{CONTATTI.instagram}
                </a>
              </li>
            )}
            <li>Roma e provincia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-linea">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-tenue sm:px-8">
          © {ANNO} {NOME} di {TITOLARE}
        </p>
      </div>
    </footer>
  );
}
