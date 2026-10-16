import { ScrittaMaq } from "./ScrittaMaq";

type Props = {
  dimensione?: "piccolo" | "grande";
  conSlogan?: boolean;
};

// Logo orizzontale: MAQ | WEB DESIGN, barra sfumata a tutta larghezza e slogan sotto.
export function Logo({ dimensione = "piccolo", conSlogan = false }: Props) {
  const grande = dimensione === "grande";
  return (
    <span className="inline-flex flex-col" aria-label="MAQ Web Design">
      <span className={`flex items-center ${grande ? "gap-6 sm:gap-9" : "gap-3"}`}>
        <span
          className={`leading-[1.1] whitespace-nowrap tracking-[0.02em] ${
            grande ? "text-[64px] sm:text-[120px]" : "text-[26px]"
          }`}
        >
          <ScrittaMaq />
        </span>
        <span className={`w-px self-stretch bg-white/20 ${grande ? "my-5 sm:my-7" : "my-1.5"}`} />
        <span
          className={`uppercase text-tenue ${
            grande
              ? "text-[13px] sm:text-[22px] tracking-[0.34em] leading-[1.75]"
              : "text-[9px] tracking-[0.3em] leading-[1.5]"
          }`}
        >
          Web
          <br />
          Design
        </span>
      </span>
      {conSlogan && (
        <>
          <span className={`block h-px sfondo-sfumato ${grande ? "mt-3 sm:mt-4" : "mt-1"}`} />
          <span
            className={`text-center uppercase font-light text-tenue whitespace-nowrap ${
              grande
                ? "mt-3 sm:mt-4 text-[10px] sm:text-[16px] tracking-[0.38em] pl-[0.38em]"
                : "mt-1.5 text-[8px] tracking-[0.3em] pl-[0.3em]"
            }`}
          >
            Grow Online / Roma
          </span>
        </>
      )}
    </span>
  );
}
