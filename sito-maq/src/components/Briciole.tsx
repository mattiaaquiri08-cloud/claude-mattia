import { CaretRight } from "@phosphor-icons/react";
import { useRadice } from "../radice";

// Percorso "Home › pagina" in cima alle pagine interne.
export function Briciole({ attuale }: { attuale: string }) {
  const radice = useRadice();
  return (
    <nav aria-label="Percorso" className="text-sm text-tenue">
      <ol className="flex flex-wrap items-center justify-center gap-1.5">
        <li>
          <a href={radice} className="fuoco rounded hover:text-testo">
            Home
          </a>
        </li>
        <li aria-hidden="true">
          <CaretRight size={12} />
        </li>
        <li aria-current="page" className="text-white/80">
          {attuale}
        </li>
      </ol>
    </nav>
  );
}
