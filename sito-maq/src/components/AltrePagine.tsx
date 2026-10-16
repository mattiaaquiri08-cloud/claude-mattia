import type { Icon } from "@phosphor-icons/react";
import { ArrowRight, Barbell, Coins, ForkKnife, Scissors } from "@phosphor-icons/react";
import { PAGINE } from "../pagine";
import { useLinkPagina } from "../radice";
import { Appare, Titolo } from "./ui";

const ICONE: Record<string, Icon> = {
  "sito-web-ristoranti-roma": ForkKnife,
  "sito-web-parrucchieri-centri-estetici-roma": Scissors,
  "sito-web-palestre-roma": Barbell,
  "quanto-costa-un-sito-web": Coins,
};

// Collegamenti alle pagine per settore e alle guide: utili a chi legge e a Google.
export function AltrePagine({ escludi = "" }: { escludi?: string }) {
  const linkPagina = useLinkPagina();
  const pagine = PAGINE.filter((p) => p.slug && p.slug !== escludi);
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28" aria-labelledby="titolo-altre-pagine">
      <Appare className="mx-auto max-w-3xl text-center">
        <Titolo>
          <span id="titolo-altre-pagine">
            Siti web su misura <span className="testo-sfumato">per il vostro settore</span>
          </span>
        </Titolo>
      </Appare>
      <div className={`mt-14 grid gap-5 sm:grid-cols-2 ${pagine.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {pagine.map((p, i) => {
          const Icona = ICONE[p.slug] ?? ArrowRight;
          return (
            <Appare key={p.slug} ritardo={0.06 * i} className="h-full">
              <a
                href={linkPagina(p.slug)}
                className="fuoco group flex h-full flex-col rounded-[24px] border border-linea bg-scheda p-7 transition-colors hover:border-white/25"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full sfondo-sfumato">
                  <Icona size={22} weight="bold" className="text-white" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{p.etichetta}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-tenue">{p.descrizione}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rosa">
                  Scopri di più
                  <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </a>
            </Appare>
          );
        })}
      </div>
    </section>
  );
}
