import { Comparsa } from "./ui";

const FATTI = [
  { numero: "25+", testo: "anni di esperienza sul campo" },
  { numero: "OCF", testo: "iscritto all'albo unico dei consulenti" },
  { numero: "Roma", testo: "Fineco Point a Prati, e a distanza" },
];

const LOGHI = [
  { src: "./foto/ocf.webp", alt: "OCF, Organismo di vigilanza dei consulenti finanziari", w: 289, h: 98 },
  { src: "./foto/ivass.webp", alt: "IVASS, Istituto per la vigilanza sulle assicurazioni", w: 352, h: 78 },
  { src: "./foto/efpa.svg", alt: "EFPA Italia, European Financial Planning Association", w: 212, h: 46 },
];

export default function Garanzie() {
  return (
    <section aria-label="Esperienza e abilitazioni" className="border-y border-linea bg-superficie">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 md:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center">
        <Comparsa className="grid grid-cols-3 gap-4 md:gap-8">
          {FATTI.map((f) => (
            <div key={f.numero}>
              <p className="text-[1.6rem] font-semibold tracking-[-0.03em] text-testo md:text-[2.1rem]">{f.numero}</p>
              <p className="mt-1 text-[0.85rem] leading-snug text-testo-2 md:text-[0.95rem]">{f.testo}</p>
            </div>
          ))}
        </Comparsa>
        <Comparsa ritardo={0.1} className="grid grid-cols-3 gap-3">
          {LOGHI.map((l) => (
            <div key={l.alt} className="flex h-16 items-center justify-center rounded-[12px] bg-white px-3 ring-1 ring-black/5 md:h-20">
              <img src={l.src} alt={l.alt} width={l.w} height={l.h} loading="lazy" className="max-h-9 w-auto max-w-full object-contain md:max-h-11" />
            </div>
          ))}
        </Comparsa>
      </div>
    </section>
  );
}
