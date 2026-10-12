import {
  ArrowUpRight,
  ChefHat,
  Clock,
  CreditCard,
  FacebookLogo,
  ForkKnife,
  InstagramLogo,
  Leaf,
  ListChecks,
  MapPin,
  NavigationArrow,
  Phone,
  Star,
  Umbrella,
  Wheelchair,
  type Icon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SITE } from "../data/site";
import { useLang } from "../i18n/context";
import { Sprig } from "./Botanical";

const ICONS: Record<string, Icon> = {
  wheelchair: Wheelchair,
  sun: Umbrella,
  chef: ChefHat,
  leaf: Leaf,
  list: ListChecks,
  card: CreditCard,
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Aperto ora? Calcolato sull'ora di Roma, solo nel browser. */
function useOpenNow() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => {
      const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Rome", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
      const h = Number(parts.find((p) => p.type === "hour")?.value);
      const m = Number(parts.find((p) => p.type === "minute")?.value);
      const minutes = h * 60 + m;
      const [oh, om] = SITE.hours.opens.split(":").map(Number);
      const [ch, cm] = SITE.hours.closes.split(":").map(Number);
      setOpen(minutes >= oh * 60 + om && minutes < ch * 60 + cm);
    };
    check();
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return open;
}

export function Visit() {
  const { t, lang } = useLang();
  const open = useOpenNow();
  const [mapLoaded, setMapLoaded] = useState(false);

  const social = [
    { href: SITE.links.instagram, label: "Instagram", icon: InstagramLogo },
    { href: SITE.links.facebook, label: "Facebook", icon: FacebookLogo },
    { href: lang === "it" ? SITE.links.tripadvisor : SITE.links.tripadvisorEn, label: "Tripadvisor", icon: Star },
    { href: lang === "it" ? SITE.links.thefork : SITE.links.theforkEn, label: "TheFork", icon: ForkKnife },
  ];

  return (
    <section id="dove-siamo" aria-labelledby="dove-titolo" className="relative overflow-hidden bg-petrol-700 py-24 text-bianco sm:py-32">
      <Sprig className="pointer-events-none absolute top-10 -left-10 w-72 text-white/15" />
      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-4 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-6"
        >
          <h2 id="dove-titolo" className="font-display text-[44px] leading-[1.02] font-medium sm:text-[64px]">
            {t.visit.title}
          </h2>
          <p className="mt-5 max-w-[42ch] text-[16.5px] leading-relaxed text-white/80">{t.visit.lead}</p>

          <dl className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.18em] text-white/65 uppercase">
                <MapPin size={16} aria-hidden /> {t.visit.addressLabel}
              </dt>
              <dd className="mt-3 font-display text-[24px] leading-snug">
                <address className="not-italic">
                  {SITE.address.street}
                  <br />
                  {SITE.address.postalCode} {SITE.address.city}
                </address>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.18em] text-white/65 uppercase">
                <Clock size={16} aria-hidden /> {t.visit.hoursLabel}
              </dt>
              <dd className="mt-3">
                <p className="font-display text-[24px] leading-snug">
                  {t.visit.everyday}
                  <br />
                  <span className="tabular">
                    {SITE.hours.opens} - {SITE.hours.closes}
                  </span>
                </p>
                <p className="mt-1 text-[13.5px] text-white/70">{t.visit.lunchDinner}</p>
                <p className="mt-3 inline-flex min-h-6 items-center gap-2 text-[13px] font-semibold" aria-live="polite">
                  {open === null ? null : (
                    <>
                      <span aria-hidden className={`size-2 rounded-full ${open ? "bg-[#9fe0bf] shadow-[0_0_0_4px_rgb(159_224_191/0.18)]" : "bg-white/40"}`} />
                      {open ? t.visit.openNow : t.visit.closedNow}
                    </>
                  )}
                </p>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.18em] text-white/65 uppercase">
                <Phone size={16} aria-hidden /> {t.visit.phoneLabel}
              </dt>
              <dd className="mt-3">
                <a href={SITE.phone.href} className="font-display text-[30px] leading-none tabular underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-white">
                  {SITE.phone.display}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={SITE.links.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-bianco px-7 text-[12.5px] font-bold tracking-[0.16em] text-petrol-800 uppercase transition-colors hover:bg-petrol-50"
            >
              <NavigationArrow size={18} weight="fill" aria-hidden />
              {t.visit.directions}
              <span className="sr-only">{t.common.newTab}</span>
            </a>
            <a
              href={SITE.phone.href}
              className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full px-7 text-[12.5px] font-bold tracking-[0.16em] text-bianco uppercase ring-1 ring-white/45 transition-colors hover:bg-white/10"
            >
              <Phone size={18} aria-hidden />
              {t.visit.call}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="lg:col-span-5 lg:col-start-8"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[999px_999px_28px_28px] bg-petrol-900 ring-1 ring-white/15 sm:aspect-[5/5] lg:aspect-[4/5]">
            {mapLoaded ? (
              <iframe
                title={t.visit.mapTitle}
                src={SITE.mapEmbed}
                className="absolute inset-0 size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="map-cover absolute inset-0 flex flex-col items-center justify-end bg-cover bg-center p-8 text-center">
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-petrol-950/85 via-petrol-950/25 to-transparent" />
                <button
                  type="button"
                  onClick={() => setMapLoaded(true)}
                  className="relative inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-bianco px-6 text-[12.5px] font-bold tracking-[0.14em] text-petrol-800 uppercase transition-colors hover:bg-petrol-50"
                >
                  <MapPin size={18} weight="fill" aria-hidden />
                  {t.visit.showMap}
                </button>
                <p className="relative mt-3 max-w-[34ch] text-[12px] leading-snug text-white/75">{t.visit.mapNote}</p>
              </div>
            )}
          </div>
          <a
            href={SITE.links.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/85 underline decoration-white/30 underline-offset-4 hover:text-white"
          >
            {t.visit.openMaps}
            <ArrowUpRight size={14} aria-hidden />
            <span className="sr-only">{t.common.newTab}</span>
          </a>
        </motion.div>

        <div className="border-t border-white/15 pt-12 lg:col-span-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h3 className="sign-type text-[34px] leading-none">{t.visit.goodToKnow}</h3>
              <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {t.visit.services.map((s) => {
                  const Ico = ICONS[s.icon] ?? ListChecks;
                  return (
                    <li key={s.text} className="flex items-start gap-3 text-[15px] leading-snug text-white/90">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                        <Ico size={18} weight="light" aria-hidden />
                      </span>
                      <span className="pt-2">{s.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="lg:col-span-4">
              <h3 className="sign-type text-[34px] leading-none">{t.visit.social}</h3>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {social.map(({ href, label, icon: Ico }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 items-center gap-2.5 rounded-full px-4 text-[13.5px] font-semibold ring-1 ring-white/25 transition-colors hover:bg-white/10"
                    >
                      <Ico size={18} weight="light" aria-hidden />
                      {label}
                      <span className="sr-only">{t.common.newTab}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
