import { ArrowUpRight, BatteryFull, CellSignalFull, DeviceMobile, WifiHigh } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Sprig } from "./Botanical";
import { LogoMark } from "./Logo";

/*
  Presentazione della proposta su computer: il sito gira dentro un telefono.
  Il telefono contiene un iframe con la stessa pagina (?frame): dentro si comporta
  esattamente come su uno smartphone vero (390 x 844, layout mobile, splash, menù...).
  Solo nella versione "proposta"; dal telefono il sito si apre normalmente.
*/

const SCREEN_W = 390;
const SCREEN_H = 844;
const BEZEL = 13;
const STATUS_H = 47;
const PHONE_W = SCREEN_W + BEZEL * 2;
const PHONE_H = SCREEN_H + BEZEL * 2;

const TEXT = {
  it: {
    kicker: "Proposta di sito web",
    title: "Nanà Vini e Cucina",
    body: "Ecco come si vede il sito da smartphone. Scorri e tocca dentro il telefono, proprio come faresti dal tuo.",
    note: "Anteprima non ufficiale: prenotazioni e chiamate sono disattivate.",
    desktop: "Vedi la versione desktop",
    phoneHint: "Dal telefono il sito si apre a schermo intero.",
    frameTitle: "Anteprima del sito di Nanà Vini e Cucina su smartphone",
  },
  en: {
    kicker: "Website proposal",
    title: "Nanà Vini e Cucina",
    body: "This is how the site looks on a smartphone. Scroll and tap inside the phone, just as you would on yours.",
    note: "Unofficial preview: bookings and calls are disabled.",
    desktop: "See the desktop version",
    phoneHint: "On a phone the site opens full screen.",
    frameTitle: "Preview of the Nanà Vini e Cucina website on a smartphone",
  },
};

function useFitScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerHeight - 56) / PHONE_H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return scale;
}

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(new Intl.DateTimeFormat("it-IT", { timeZone: "Europe/Rome", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular">{time}</span>;
}

export function PhoneMockup() {
  const lang = navigator.language?.toLowerCase().startsWith("it") ? "it" : "en";
  const t = TEXT[lang];
  const scale = useFitScale();

  const frameUrl = new URL(window.location.href);
  frameUrl.searchParams.set("frame", "1");
  const desktopUrl = new URL(window.location.href);
  desktopUrl.searchParams.set("desktop", "1");

  useEffect(() => {
    document.title = lang === "it" ? "Proposta Nanà Vini e Cucina" : "Nanà Vini e Cucina proposal";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <main className="relative grid min-h-[100svh] overflow-hidden bg-crema text-ink">
      {/* luce morbida verde petrolio dietro al telefono */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_60%_at_68%_50%,rgb(82_123_109/0.16),transparent_70%)]" />
      <Sprig className="pointer-events-none absolute -bottom-14 -left-16 w-[380px] text-petrol-300/60" />

      <div className="relative mx-auto grid w-full max-w-[1180px] grid-cols-[minmax(0,1fr)_auto] items-center gap-16 px-10 py-7">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[440px]"
        >
          <LogoMark variant="line" title="Nanà Vini e Cucina" className="size-28" />
          <p className="sign-type mt-10 text-[30px] leading-none text-petrol-600">{t.kicker}</p>
          <h1 className="mt-3 font-display text-[64px] leading-[1.02] font-medium text-petrol-800 text-balance">{t.title}</h1>
          <p className="mt-6 max-w-[38ch] text-[16.5px] leading-relaxed text-ink-soft">{t.body}</p>

          <a
            href={desktopUrl.toString()}
            className="group mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-petrol-600 px-6 text-[12.5px] font-bold tracking-[0.14em] text-bianco uppercase shadow-[inset_0_1px_0_rgb(255_255_255/0.14)] transition-colors hover:bg-petrol-700"
          >
            {t.desktop}
            <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="mt-10 space-y-2 border-t border-petrol-600/15 pt-6 text-[13px] leading-relaxed text-ink-soft">
            <p className="flex items-center gap-2">
              <DeviceMobile size={16} weight="light" aria-hidden className="shrink-0 text-petrol-600" />
              {t.phoneHint}
            </p>
            <p>{t.note}</p>
          </div>
        </motion.div>

        {/* telefono, ridimensionato per stare nello schermo */}
        <div style={{ width: PHONE_W * scale, height: PHONE_H * scale }}>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.15 }}
            // la scala passa da Motion insieme all'animazione d'ingresso (un transform scritto a mano verrebbe sovrascritto)
            style={{ width: PHONE_W, height: PHONE_H, scale, originX: 0, originY: 0 }}
          >
            <div
              className="relative size-full rounded-[64px] bg-[#101614] shadow-[0_60px_120px_-40px_rgb(19_35_31/0.55),0_30px_60px_-30px_rgb(19_35_31/0.45),inset_0_0_0_1.5px_rgb(255_255_255/0.14),inset_0_0_0_5px_#1d2623]"
              style={{ padding: BEZEL }}
            >
              {/* tasti laterali */}
              <span aria-hidden className="absolute top-[178px] -left-[3px] h-[30px] w-[4px] rounded-l-sm bg-[#1d2623]" />
              <span aria-hidden className="absolute top-[232px] -left-[3px] h-[58px] w-[4px] rounded-l-sm bg-[#1d2623]" />
              <span aria-hidden className="absolute top-[302px] -left-[3px] h-[58px] w-[4px] rounded-l-sm bg-[#1d2623]" />
              <span aria-hidden className="absolute top-[262px] -right-[3px] h-[92px] w-[4px] rounded-r-sm bg-[#1d2623]" />

              <div className="relative flex size-full flex-col overflow-hidden rounded-[52px] bg-petrol-950">
                {/* barra di stato */}
                <div className="relative flex shrink-0 items-center justify-between px-8 text-[15px] font-semibold text-white" style={{ height: STATUS_H }}>
                  <Clock />
                  <span aria-hidden className="absolute top-[11px] left-1/2 h-[30px] w-[112px] -translate-x-1/2 rounded-full bg-black" />
                  <span className="flex items-center gap-1.5" aria-hidden>
                    <CellSignalFull size={16} weight="fill" />
                    <WifiHigh size={16} weight="bold" />
                    <BatteryFull size={22} weight="fill" />
                  </span>
                </div>
                <iframe
                  title={t.frameTitle}
                  src={frameUrl.toString()}
                  className="block w-full flex-1 border-0 bg-crema"
                  style={{ width: SCREEN_W, height: SCREEN_H - STATUS_H }}
                />
                {/* indicatore home */}
                <span aria-hidden className="pointer-events-none absolute bottom-2 left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-white/85 mix-blend-difference" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
