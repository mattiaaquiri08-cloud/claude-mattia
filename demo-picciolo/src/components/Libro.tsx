import { AmazonLogo, Gift } from "@phosphor-icons/react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { CONTATTI } from "../config";
import { Comparsa, Pulsante, useMotivo } from "./ui";

export default function Libro() {
  const ridotto = useReducedMotion();
  const { richiedi } = useMotivo();
  // il libro segue appena il puntatore: invita a "prenderlo in mano" (solo con il mouse)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 18 });
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });

  const muovi = (e: React.PointerEvent<HTMLDivElement>) => {
    if (ridotto || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const lascia = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="libro" className="relative overflow-hidden bg-notte py-20 text-white md:py-28">
      <img
        src="./foto/faro-1800.webp"
        srcSet="./foto/faro-900.webp 900w, ./foto/faro-1800.webp 1800w"
        sizes="100vw"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-[0.18]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-notte via-notte/85 to-notte/40" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-4 md:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="order-2 lg:order-1">
          <Comparsa>
            <p className="text-[0.95rem] font-medium text-[#5cc8dc]">Il mio libro</p>
            <h2 className="mt-4 text-[2.3rem] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[3.2rem]">
              Risparmiare, investire, proteggere
            </h2>
            <p className="mt-3 text-[1.1rem] italic text-white/70">
              Il metodo semplice per investire e proteggere un patrimonio da se stessi, dalla propria banca e dai mercati.
            </p>
          </Comparsa>
          <Comparsa ritardo={0.08}>
            <p className="mt-8 max-w-[56ch] text-[1.05rem] leading-relaxed text-white/80">
              L'ho scritto nel 2019 per aiutare i risparmiatori a orientarsi. Dentro ci sono le regole di buon senso dei
              grandi investitori e il contributo del mondo accademico, per evitare la frase più costosa della finanza:
              “questa volta è diverso”.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Pulsante href={CONTATTI.amazon} esterno variante="chiaro">
                <AmazonLogo size={20} aria-hidden="true" />
                Acquista su Amazon
              </Pulsante>
              <a
                href="#contatti"
                onClick={() => richiedi("ebook")}
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/30 px-6 text-[0.95rem] font-medium text-white transition-colors hover:border-white active:scale-[0.98]"
              >
                <Gift size={20} aria-hidden="true" />
                Ricevi l'ebook in regalo
              </a>
            </div>
          </Comparsa>
        </div>

        <div
          className="order-1 flex justify-center [perspective:1200px] lg:order-2"
          onPointerMove={muovi}
          onPointerLeave={lascia}
        >
          <motion.img
            src="./foto/libro-420.webp"
            srcSet="./foto/libro-420.webp 420w, ./foto/libro-760.webp 760w"
            sizes="(min-width: 1024px) 380px, 260px"
            width={420}
            height={646}
            loading="lazy"
            alt="Copertina del libro Risparmiare, investire, proteggere di Enrico Picciolo"
            style={ridotto ? undefined : { rotateX: rotX, rotateY: rotY }}
            initial={ridotto ? false : { opacity: 0, y: 40, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-[240px] drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)] md:w-[340px] lg:w-[380px]"
          />
        </div>
      </div>
    </section>
  );
}
