import type { Icon } from "@phosphor-icons/react";
import {
  Barbell,
  Briefcase,
  Coffee,
  ForkKnife,
  HandHeart,
  PaintBrush,
  PenNib,
  Pizza,
  Scissors,
  Sparkle,
  Storefront,
  Wine,
  Wrench,
  Flower,
} from "@phosphor-icons/react";
import { Appare, Titolo } from "./ui";

const SETTORI: { nome: string; icona: Icon }[] = [
  { nome: "Ristoranti", icona: ForkKnife },
  { nome: "Pizzerie", icona: Pizza },
  { nome: "Wine bar", icona: Wine },
  { nome: "Bistrot e caffè", icona: Coffee },
  { nome: "Parrucchieri e barbieri", icona: Scissors },
  { nome: "Centri estetici", icona: Sparkle },
  { nome: "Nail bar", icona: PaintBrush },
  { nome: "Massaggi e benessere", icona: HandHeart },
  { nome: "Palestre e pilates", icona: Barbell },
  { nome: "Tatuatori", icona: PenNib },
  { nome: "Officine", icona: Wrench },
  { nome: "Studi professionali", icona: Briefcase },
  { nome: "Fioristi", icona: Flower },
  { nome: "Botteghe e negozi", icona: Storefront },
];

function Riga({ nascosta = false }: { nascosta?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={nascosta || undefined}>
      {SETTORI.map(({ nome, icona: Icona }) => (
        <li key={nome} className="flex items-center gap-3 whitespace-nowrap text-lg text-white/80">
          <Icona size={28} weight="light" className="text-rosa" />
          {nome}
        </li>
      ))}
    </ul>
  );
}

export function Settori() {
  return (
    <section className="px-5 sm:px-8" aria-labelledby="titolo-settori">
      <Appare className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-linea bg-scheda py-14 sm:py-16">
        <Titolo className="mx-auto max-w-3xl px-6 text-center">
          <span id="titolo-settori">
            Siti su misura per le attività che meritano di farsi trovare online
          </span>
        </Titolo>
        <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="nastro flex w-max">
            <Riga />
            <Riga nascosta />
          </div>
        </div>
      </Appare>
    </section>
  );
}
