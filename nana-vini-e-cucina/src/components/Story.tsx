import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MENU } from "../data/menu";
import { useLang } from "../i18n/context";
import { Garland, Sprig } from "./Botanical";
import { Photo } from "./Photo";

export const openMenuTab = (id: string) => {
  window.dispatchEvent(new CustomEvent("nana:menu-tab", { detail: id }));
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

export function Story() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);

  return (
    <section id="cucina" aria-labelledby="cucina-titolo" className="relative overflow-hidden bg-crema pt-24 pb-28 sm:pt-36 sm:pb-36">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <motion.div {...reveal} className="mx-auto text-center">
          <Sprig className="mx-auto mb-6 w-36 text-petrol-400" />
          <h2 id="cucina-titolo" className="mx-auto max-w-[15ch] font-display text-[42px] leading-[1.05] font-medium text-petrol-800 text-balance sm:text-[68px] lg:text-[80px]">
            {t.story.statement}
          </h2>
        </motion.div>

        <div ref={ref} className="mt-20 grid items-start gap-14 sm:mt-28 lg:grid-cols-12 lg:gap-10">
          <motion.div {...reveal} className="relative lg:col-span-5 lg:col-start-1">
            <Photo
              id="galleria/sala"
              alt={t.story.photoRoomAlt}
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="rounded-[999px_999px_6px_6px] shadow-[0_40px_80px_-40px_rgb(27_48_42/0.45)]"
              intrinsic={false}
              imgClassName="aspect-[4/5]"
            />
            <motion.div style={{ y: lift }} className="absolute -right-3 -bottom-14 w-[44%] sm:-right-8 lg:-right-16">
              <Photo
                id="galleria/piatto-servito"
                alt={t.story.photoDishAlt}
                sizes="(min-width: 1024px) 18vw, 44vw"
                className="rounded-[6px] ring-[6px] ring-crema"
                intrinsic={false}
                imgClassName="aspect-[3/4]"
              />
            </motion.div>
          </motion.div>

          <div className="pt-16 sm:pt-20 lg:col-span-6 lg:col-start-7 lg:pt-10">
            <motion.h3 {...reveal} className="sign-type text-[40px] leading-[1.05] text-petrol-700 sm:text-[48px]">
              {t.story.title}
            </motion.h3>
            <motion.div {...reveal} className="mt-6 space-y-5 text-[16.5px] leading-[1.75] text-ink-soft">
              {t.story.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mt-1.5 first-letter:mr-3 first-letter:font-display first-letter:text-[64px] first-letter:leading-[0.8] first-letter:font-medium first-letter:text-petrol-600" : ""}>
                  {p}
                </p>
              ))}
            </motion.div>
            <motion.figure {...reveal} className="mt-12 border-l border-petrol-300 pl-6">
              <blockquote className="font-display text-[24px] leading-snug text-petrol-800 italic sm:text-[27px]">“{t.story.quote}”</blockquote>
              <figcaption className="mt-3 text-[13px] text-ink-soft">{t.story.quoteSource}</figcaption>
            </motion.figure>
          </div>
        </div>

        <Traditions />
      </div>
    </section>
  );
}

function Traditions() {
  const { t, lang } = useLang();
  const traditions = MENU.find((c) => c.id === "tradizioni");
  if (!traditions) return null;
  const [napoli, roma] = traditions.groups;

  const panels = [
    { key: "napoli", group: napoli, text: t.traditions.napoli, tone: "petrol" as const, photo: "galleria/pasta-ragu", photoAlt: t.traditions.napoliPhotoAlt },
    { key: "roma", group: roma, text: t.traditions.roma, tone: "linen" as const, photo: "galleria/pasta-romana", photoAlt: t.traditions.romaPhotoAlt },
  ];

  return (
    <div className="mt-36 sm:mt-44">
      <motion.div {...reveal} className="mx-auto max-w-2xl text-center">
        <h3 className="font-display text-[38px] leading-[1.05] font-medium text-petrol-800 sm:text-[54px]">{t.traditions.title}</h3>
        <p className="mx-auto mt-5 max-w-[48ch] text-[16px] leading-relaxed text-ink-soft">{t.traditions.intro}</p>
      </motion.div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
        {panels.map(({ key, group, text, tone, photo, photoAlt }, i) => (
          <motion.article
            key={key}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex flex-col overflow-hidden rounded-[28px] p-8 sm:p-12 ${
              tone === "petrol" ? "bg-petrol-600 text-bianco" : "bg-lino text-ink ring-1 ring-petrol-600/10"
            }`}
          >
            <div className="flex items-start gap-5 sm:gap-8">
              <div className="min-w-0 flex-1">
                <p className={`text-[12px] font-semibold tracking-[0.2em] uppercase ${tone === "petrol" ? "text-white/75" : "text-petrol-500"}`}>{text.city}</p>
                <h4 className={`sign-type mt-3 text-[34px] leading-none sm:text-[52px] ${tone === "petrol" ? "text-bianco" : "text-petrol-700"}`}>
                  {group.title?.[lang]}
                </h4>
                <p className={`mt-5 max-w-[40ch] text-[15px] leading-relaxed ${tone === "petrol" ? "text-white/85" : "text-ink-soft"}`}>{text.body}</p>
              </div>
              <Photo
                id={photo}
                alt={photoAlt}
                sizes="(min-width: 640px) 160px, 104px"
                intrinsic={false}
                className={`w-22 shrink-0 rounded-[999px_999px_6px_6px] ring-4 sm:w-40 ${tone === "petrol" ? "ring-white/15" : "ring-bianco"}`}
                imgClassName="aspect-[3/4]"
              />
            </div>

            <ul className="mt-8 grid gap-4">
              {group.dishes.map((d) => (
                <li key={d.name} className="flex items-baseline gap-3">
                  <Garland className={`w-5 shrink-0 translate-y-[-2px] ${tone === "petrol" ? "text-white/45" : "text-petrol-300"}`} />
                  <span>
                    <span translate="no" className="font-display text-[23px] leading-tight font-semibold">{d.name}</span>
                    <span className={`block text-[13.5px] leading-snug ${tone === "petrol" ? "text-white/75" : "text-ink-soft"}`}>{lang === "it" ? d.it : d.en}</span>
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => openMenuTab("tradizioni")}
              className={`group mt-10 inline-flex cursor-pointer items-center gap-2 self-start rounded-full py-2 text-[13px] font-bold tracking-[0.14em] uppercase ${
                tone === "petrol" ? "text-bianco" : "text-petrol-700"
              }`}
            >
              {t.traditions.cta}
              <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
