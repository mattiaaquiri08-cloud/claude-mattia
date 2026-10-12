import { LOGO_BUBBLES, LOGO_FISH, LOGO_RING, LOGO_TAGLINE, LOGO_WORD } from "../data/logo-paths";

/*
  Logo di Nanà Vini e Cucina, con i tracciati vettoriali originali estratti dal menù ufficiale.
  Il pesce è un calice da vino coricato: lo stelo e il piede formano la coda.
  Disco verde petrolio #527b6d, campionato dal logo pubblicato sul sito.
*/

export const DISC = { cx: 127, cy: 121, r: 108 };
export const VIEWBOX = "19 13 216 216";

type Part = "fish" | "bubbles" | "word" | "tagline";

type LogoProps = {
  className?: string;
  title?: string;
  /**
   * "disc": disco petrolio con disegno bianco (come sulla tenda).
   * "mark": solo disco, pesce e bollicine, per i formati minuscoli.
   * "line": disegno verde con l'anello a pennello, come sul menù cartaceo.
   */
  variant?: "disc" | "mark" | "line";
};

export function LogoPaths({ parts = ["fish", "bubbles", "word", "tagline"] }: { parts?: Part[] }) {
  return (
    <g fill="currentColor">
      {parts.includes("fish") && LOGO_FISH.map((d, i) => <path key={`f${i}`} d={d} />)}
      {parts.includes("bubbles") && LOGO_BUBBLES.map((d, i) => <path key={`b${i}`} d={d} />)}
      {parts.includes("word") && LOGO_WORD.map((d, i) => <path key={`w${i}`} d={d} />)}
      {parts.includes("tagline") && LOGO_TAGLINE.map((d, i) => <path key={`t${i}`} d={d} />)}
    </g>
  );
}

export function LogoMark({ className = "", title, variant = "disc" }: LogoProps) {
  const a11y = title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };

  if (variant === "line") {
    return (
      <svg viewBox={VIEWBOX} className={`text-petrol-600 ${className}`} {...a11y}>
        <path d={LOGO_RING} fill="currentColor" />
        <LogoPaths />
      </svg>
    );
  }

  if (variant === "mark") {
    // pesce e bollicine ingranditi e centrati nel disco
    return (
      <svg viewBox={VIEWBOX} className={`text-bianco ${className}`} {...a11y}>
        <circle {...DISC} className="fill-petrol-600" />
        <g transform="translate(127 121) scale(1.6) translate(-126 -59)">
          <LogoPaths parts={["fish", "bubbles"]} />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox={VIEWBOX} className={`text-bianco ${className}`} {...a11y}>
      <circle {...DISC} className="fill-petrol-600" />
      <LogoPaths />
    </svg>
  );
}
