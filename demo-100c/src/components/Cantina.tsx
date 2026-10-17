import { WhatsappLogo } from "@phosphor-icons/react";
import { linkWhatsApp } from "../config";
import { useLingua } from "../lingua";
import { Comparsa, Pulsante } from "./ui";

const BASE = import.meta.env.BASE_URL;

// Il tavolo sociale: la foto della sala, incorniciata dal motivo delle cementine
export default function Cantina() {
  const { t } = useLingua();
  return (
    <section id="tavolo-sociale" className="cementine px-4 py-20 md:px-8 md:py-28">
      <Comparsa className="mx-auto max-w-[1400px]">
        <div className="grid bg-insegna lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <figure className="relative min-h-[320px] sm:min-h-[440px]">
            <img
              src={`${BASE}foto/sala-tavolo-sociale-1600.webp`}
              srcSet={`${BASE}foto/sala-tavolo-sociale-900.webp 900w, ${BASE}foto/sala-tavolo-sociale-1600.webp 1600w`}
              sizes="(min-width: 1024px) 58vw, 100vw"
              width={2560}
              height={1920}
              alt={t.cantina.altFoto}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
          </figure>
          <div className="px-7 py-10 md:px-12 md:py-14">
            <div className="flex items-end gap-4">
              <p className="stretto text-[clamp(6rem,14vw,9rem)] font-[760] leading-[0.78] text-rosso">
                {t.cantina.numero}
              </p>
              <p className="semistretto max-w-[20ch] pb-1 text-[0.95rem] font-semibold uppercase leading-snug tracking-[0.06em] text-grigio">
                {t.cantina.numeroTesto}
              </p>
            </div>
            <h2 className="stretto mt-10 text-[clamp(2.4rem,5vw,4rem)] font-[720] uppercase leading-[0.92]">
              {t.cantina.titolo}
            </h2>
            <p className="mt-6 max-w-[50ch] text-lg leading-relaxed text-grigio">{t.cantina.testo}</p>
            <Pulsante href={linkWhatsApp(t.cantina.messaggio)} esterno variante="contorno" className="mt-8">
              <WhatsappLogo size={20} aria-hidden="true" />
              {t.cantina.cta}
            </Pulsante>
            <p className="mt-6 text-xs text-grigio">{t.cantina.credito}</p>
          </div>
        </div>
      </Comparsa>
    </section>
  );
}
