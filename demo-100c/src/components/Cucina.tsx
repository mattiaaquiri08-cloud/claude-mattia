import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLingua } from "../lingua";
import { Comparsa } from "./ui";

const BASE = import.meta.env.BASE_URL;

export default function Cucina() {
  const { t } = useLingua();
  const ridotto = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ridotto ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section id="cucina" className="px-4 pb-24 md:px-8 md:pb-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-20">
        <figure className="relative pb-16 sm:pb-24">
          <div ref={ref} className="relative aspect-[4/3] w-[86%] overflow-hidden bg-carta">
            <motion.img
              style={{ y }}
              src={`${BASE}foto/totanetti-1600.webp`}
              srcSet={`${BASE}foto/totanetti-900.webp 900w, ${BASE}foto/totanetti-1600.webp 1600w`}
              sizes="(min-width: 1024px) 50vw, 86vw"
              alt={t.cucina.altFoto}
              loading="lazy"
              decoding="async"
              className="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover"
            />
          </div>
          {/* secondo piatto sovrapposto: due ricette della casa, una accanto all'altra */}
          <img
            src={`${BASE}foto/cuori-di-mare-900.webp`}
            srcSet={`${BASE}foto/cuori-di-mare-900.webp 900w, ${BASE}foto/cuori-di-mare-1600.webp 1600w`}
            sizes="(min-width: 1024px) 26vw, 48vw"
            width={2560}
            height={1920}
            alt={t.cucina.altFoto2}
            loading="lazy"
            decoding="async"
            className="absolute bottom-0 right-0 aspect-square w-[48%] border-[6px] border-insegna object-cover sm:border-8"
          />
          <figcaption className="mt-3 text-sm text-grigio">{t.cucina.credito}</figcaption>
        </figure>
        <div>
          <Comparsa>
            <h2 className="stretto text-[clamp(2.5rem,6vw,4.6rem)] font-[720] uppercase leading-[0.92]">
              {t.cucina.titolo}
            </h2>
            {t.cucina.testo.map((p) => (
              <p key={p} className="mt-6 max-w-[52ch] text-lg leading-relaxed text-grigio">
                {p}
              </p>
            ))}
            <p className="mt-6 max-w-[52ch] border-l-2 border-rosso pl-4 leading-relaxed text-inchiostro">
              {t.cucina.hostaria}
            </p>
          </Comparsa>
          <Comparsa ritardo={0.1} className="mt-12">
            <h3 className="semistretto text-sm font-semibold uppercase tracking-[0.16em] text-grigio">
              {t.cucina.classiciTitolo}
            </h3>
            <ul className="stretto mt-4 text-[clamp(1.6rem,3.2vw,2.2rem)] font-[680] uppercase leading-[1.15]">
              {t.cucina.classici.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-grigio">{t.cucina.classiciNota}</p>
          </Comparsa>
        </div>
      </div>
    </section>
  );
}
