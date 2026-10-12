import { ArrowUp } from "@phosphor-icons/react";
import { SITE } from "../data/site";
import { useLang } from "../i18n/context";
import { useBooking } from "./booking";
import { LogoMark } from "./Logo";

export function Footer() {
  const { t } = useLang();
  const { open } = useBooking();
  const year = 2026;

  const links = [
    { href: "#cucina", label: t.nav.kitchen },
    { href: "#menu", label: t.nav.menu },
    { href: "#galleria", label: t.nav.gallery },
    { href: "#recensioni", label: t.nav.reviews },
    { href: "#dove-siamo", label: t.nav.visit },
  ];

  return (
    <footer className="bg-petrol-900 text-white/80">
      <div className="mx-auto max-w-[1280px] px-4 pt-20 pb-10 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <LogoMark variant="disc" title={SITE.name} className="size-28" />
            <p className="mt-6 max-w-[30ch] font-display text-[24px] leading-snug text-bianco italic">{t.footer.tagline}</p>
          </div>

          <nav aria-label={t.footer.explore} className="md:col-span-3">
            <h2 className="text-[12px] font-semibold tracking-[0.18em] text-white/55 uppercase">{t.footer.explore}</h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-bianco">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <button type="button" onClick={open} className="cursor-pointer font-semibold text-bianco underline decoration-white/30 underline-offset-4 hover:decoration-white">
                  {t.hero.book}
                </button>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-[12px] font-semibold tracking-[0.18em] text-white/55 uppercase">{t.footer.contacts}</h2>
            <address className="mt-5 space-y-3 text-[15px] not-italic">
              <p>
                {SITE.name}
                <br />
                {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}
              </p>
              <p>
                <a href={SITE.phone.href} className="tabular transition-colors hover:text-bianco">
                  {SITE.phone.display}
                </a>
              </p>
              <p className="tabular">
                {t.visit.everyday}, {SITE.hours.opens} - {SITE.hours.closes}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/12 pt-8 text-[12.5px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.company} {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={SITE.links.privacyPdf} target="_blank" rel="noopener noreferrer" className="hover:text-bianco">
              {t.footer.privacy}
              <span className="sr-only">{t.common.newTab}</span>
            </a>
            <span>{t.footer.photos}</span>
            <a href="#top" className="inline-flex items-center gap-1.5 font-semibold text-white/80 hover:text-bianco">
              <ArrowUp size={14} aria-hidden /> {t.footer.backTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
