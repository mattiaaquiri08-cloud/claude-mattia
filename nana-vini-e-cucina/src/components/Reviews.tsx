import { ArrowUpRight, Star, StarHalf } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { SITE } from "../data/site";
import { useLang } from "../i18n/context";
import { REVIEWS } from "../i18n/dictionaries";
import { Blossom5 } from "./Botanical";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reviews() {
  const { t, lang } = useLang();
  const { value, count } = SITE.rating.google;
  const fmt = (n: number, digits = 0) => {
    const [int, dec] = n.toFixed(digits).split(".");
    const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, lang === "it" ? "." : ",");
    return dec ? `${grouped}${lang === "it" ? "," : "."}${dec}` : grouped;
  };

  return (
    <section id="recensioni" aria-labelledby="recensioni-titolo" className="relative overflow-hidden bg-bianco py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-4 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start"
        >
          <h2 id="recensioni-titolo" className="font-display text-[42px] leading-[1.04] font-medium text-petrol-800 sm:text-[56px]">
            {t.reviews.title}
          </h2>

          <div className="mt-10 flex items-end gap-5">
            <p className="font-display text-[104px] leading-[0.8] font-medium text-petrol-600 tabular sm:text-[128px]">{fmt(value, 1)}</p>
            <div className="pb-1.5">
              <div className="flex gap-0.5 text-petrol-600" role="img" aria-label={t.reviews.starsLabel}>
                {[0, 1, 2, 3].map((i) => (
                  <Star key={i} size={20} weight="fill" aria-hidden />
                ))}
                <StarHalf size={20} weight="fill" aria-hidden />
              </div>
              <p className="mt-2 text-[14px] leading-snug text-ink-soft">
                <span className="font-semibold text-ink tabular">{fmt(count)}</span> {t.reviews.reviewsWord}
                <br />
                {t.reviews.googleLabel}
              </p>
            </div>
          </div>
          <p className="mt-4 text-[12px] text-ink-soft">{t.reviews.updated}</p>

          <a
            href={SITE.links.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-petrol-600 px-6 text-[12.5px] font-bold tracking-[0.14em] text-bianco uppercase shadow-[inset_0_1px_0_rgb(255_255_255/0.14)] transition-colors hover:bg-petrol-700"
          >
            {t.reviews.readGoogle}
            <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">{t.common.newTab}</span>
          </a>
          <p className="mt-6 text-[13px] text-ink-soft">
            {t.reviews.elsewhere}:{" "}
            <a href={lang === "it" ? SITE.links.thefork : SITE.links.theforkEn} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-700 underline decoration-petrol-300 underline-offset-4 hover:text-petrol-900">
              {t.reviews.readTheFork}
            </a>
            ,{" "}
            <a href={lang === "it" ? SITE.links.tripadvisor : SITE.links.tripadvisorEn} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-700 underline decoration-petrol-300 underline-offset-4 hover:text-petrol-900">
              {t.reviews.readTripadvisor}
            </a>
          </p>
        </motion.div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:gap-6">
          {REVIEWS.map((r, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: EASE }}
              className={`flex flex-col rounded-[28px] p-7 sm:p-8 ${i % 2 === 1 ? "sm:translate-y-12" : ""} ${
                i === 0 ? "bg-petrol-50 ring-1 ring-petrol-600/10" : "bg-crema ring-1 ring-petrol-600/8"
              }`}
            >
              <Blossom5 className="size-5 text-petrol-400" />
              <figure className="mt-5 flex flex-1 flex-col">
                <blockquote lang={lang === "en" && r.translation ? "en" : "it"} className="font-display text-[22px] leading-[1.35] text-ink sm:text-[23px]">
                  “{lang === "en" && r.translation ? r.translation : r.quote}”
                </blockquote>
                <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-2 text-[13px] text-ink-soft">
                  <span className="font-semibold text-petrol-700">{r.author || t.reviews.googleGuest}</span>
                  {r.author ? (
                    <span>
                      {lang === "it" ? "su" : "on"} {r.source}
                    </span>
                  ) : null}
                  {lang === "en" && r.translation ? <span className="basis-full text-[12px] italic">{t.reviews.translated}</span> : null}
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
