import { ArrowUp, FacebookLogo, InstagramLogo } from "@phosphor-icons/react";
import { LOCALE, linkTelefono } from "../config";
import { useLingua } from "../lingua";
import { Marchio } from "./ui";

export default function Footer() {
  const { t } = useLingua();
  const voci = [
    { href: "#vino", testo: t.nav.vino },
    { href: "#menu", testo: t.nav.menu },
    { href: "#persone", testo: t.nav.storia },
    { href: "#eventi", testo: t.nav.eventi },
    { href: "#prenota", testo: t.nav.prenota },
    { href: "#dove", testo: t.nav.dove },
  ];
  return (
    <footer className="bg-notte px-4 pb-28 pt-20 text-insegna md:px-8 md:pb-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-[minmax(0,6fr)_minmax(0,3fr)_minmax(0,3fr)]">
          <div>
            <p className="flex items-baseline gap-3">
              <Marchio chiaro className="text-[4.5rem]" />
              <span className="stretto text-xl font-[650] uppercase tracking-[0.14em]">
                Vino <span className="text-[0.75em]">e</span> Pesce
              </span>
            </p>
            <p className="mt-4 max-w-[36ch] text-insegna/75">{t.footer.descrizione}</p>
            <address className="mt-6 not-italic leading-relaxed text-insegna/90">
              {LOCALE.via}, {LOCALE.cap} {LOCALE.citta}
              <br />
              <a href={linkTelefono} className="underline-offset-4 hover:underline">
                {LOCALE.telefono}
              </a>
            </address>
          </div>
          <nav aria-label={t.footer.link}>
            <h2 className="semistretto text-sm font-semibold uppercase tracking-[0.16em] text-insegna/60">{t.footer.link}</h2>
            <ul className="mt-4 grid gap-1">
              {voci.map((v) => (
                <li key={v.href}>
                  <a href={v.href} className="inline-flex min-h-10 items-center text-insegna/90 hover:text-white hover:underline">
                    {v.testo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="semistretto text-sm font-semibold uppercase tracking-[0.16em] text-insegna/60">{t.footer.seguici}</h2>
            <ul className="mt-4 grid gap-1">
              <li>
                <a
                  href={LOCALE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 text-insegna/90 hover:text-white hover:underline"
                >
                  <InstagramLogo size={20} aria-hidden="true" /> Instagram
                </a>
              </li>
              {LOCALE.facebook && (
                <li>
                  <a
                    href={LOCALE.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 text-insegna/90 hover:text-white hover:underline"
                  >
                    <FacebookLogo size={20} aria-hidden="true" /> Facebook
                  </a>
                </li>
              )}
            </ul>
            <a
              href="#inizio"
              className="semistretto mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-insegna/80 hover:text-white"
            >
              <ArrowUp size={16} aria-hidden="true" /> {t.footer.torna}
            </a>
          </div>
        </div>

        {/* dicitura della demo: visibile ma discreta */}
        <div className="mt-16 flex flex-col gap-2 border-t border-insegna/15 pt-6 text-sm text-insegna/70 md:flex-row md:items-center md:justify-between">
          <p>
            <a
              href="https://maqwebdesign.com"
              target="_blank"
              rel="noopener"
              className="text-insegna underline decoration-insegna/40 underline-offset-4 hover:decoration-insegna"
            >
              {t.footer.demo}
            </a>
          </p>
          <p>{t.footer.marchio}</p>
        </div>
      </div>
    </footer>
  );
}
