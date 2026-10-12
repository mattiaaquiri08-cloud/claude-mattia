import { FilePdf } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { COVER_CHARGE, MENU, type Dish, type DishGroup } from "../data/menu";
import { SITE } from "../data/site";
import { useLang } from "../i18n/context";
import type { Lang } from "../i18n/dictionaries";
import { Blossom5, Garland } from "./Botanical";

/*
  Il menù come elemento di design: categorie in schede che restano a portata di pollice,
  righe con i puntini di guida (dal blocco 21st "Restaurant Menu Block"),
  titoli scritti a mano come sul menù cartaceo di Nanà.
*/

// formattazione deterministica (identica sul server e nel browser, niente differenze di Intl)
export function formatPrice(value: number, lang: Lang) {
  const n = Number.isInteger(value) ? String(value) : value.toFixed(2).replace(".", lang === "it" ? "," : ".");
  return lang === "it" ? `${n}\u00a0€` : `€${n}`;
}

export function Menu() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(MENU[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const category = MENU.find((c) => c.id === active) ?? MENU[0];

  // apertura di una scheda da altre sezioni (es. "Vedi nel menù")
  useEffect(() => {
    const onTab = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (MENU.some((c) => c.id === id)) setActive(id);
    };
    window.addEventListener("nana:menu-tab", onTab);
    return () => window.removeEventListener("nana:menu-tab", onTab);
  }, []);

  // tiene la scheda attiva visibile nella barra scorrevole
  // (scorre solo la barra in orizzontale, mai la pagina)
  useEffect(() => {
    const bar = tabsRef.current;
    const el = bar?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!bar || !el) return;
    bar.scrollTo({ left: el.offsetLeft - bar.clientWidth / 2 + el.offsetWidth / 2, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  const select = (id: string) => {
    setActive(id);
    const top = sectionRef.current?.querySelector<HTMLElement>("[data-menu-panel]")?.getBoundingClientRect().top;
    if (top !== undefined && top < 0) {
      sectionRef.current?.querySelector<HTMLElement>("[data-menu-anchor]")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = MENU.findIndex((c) => c.id === active);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % MENU.length;
    if (e.key === "ArrowLeft") next = (i - 1 + MENU.length) % MENU.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = MENU.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(MENU[next].id);
    tabsRef.current?.querySelector<HTMLElement>(`[data-tab="${MENU[next].id}"]`)?.focus();
  };

  return (
    <section ref={sectionRef} id="menu" aria-labelledby="menu-titolo" className="relative bg-bianco py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="menu-titolo" className="font-display text-[44px] leading-[1.02] font-medium text-petrol-800 sm:text-[64px]">
            {t.menu.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-soft">{t.menu.intro}</p>
        </div>
      </div>

      <div data-menu-anchor className="scroll-mt-16 lg:scroll-mt-[72px]" />
      <div className="sticky top-16 z-20 mt-12 border-y border-petrol-600/12 bg-bianco/94 backdrop-blur-md lg:top-[72px]">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label={t.menu.tabsLabel}
          onKeyDown={onKeyDown}
          className="no-scrollbar relative mx-auto flex max-w-[1180px] snap-x gap-1 overflow-x-auto px-4 py-2.5 sm:px-8 lg:justify-center"
        >
          {MENU.map((c) => {
            const selected = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                data-tab={c.id}
                aria-selected={selected}
                aria-controls="menu-pannello"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(c.id)}
                className={`relative shrink-0 cursor-pointer snap-center rounded-full px-4 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 ${
                  selected ? "text-bianco" : "text-petrol-700 hover:text-petrol-900"
                }`}
              >
                {selected ? (
                  <motion.span
                    layoutId="menu-tab-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-petrol-600"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                ) : null}
                <span className="relative">{c.title[lang]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-4 sm:px-8">
        <div data-menu-panel id="menu-pannello" role="tabpanel" aria-labelledby={`tab-${category.id}`} tabIndex={0} className="min-h-[34rem] rounded-[6px] pt-14 outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 focus-visible:ring-offset-8 focus-visible:ring-offset-bianco sm:pt-20">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="flex flex-col items-center text-center">
                <div className="flex items-center gap-4 text-petrol-400 sm:gap-6">
                  <Garland className="hidden w-24 sm:block" />
                  <h3 className="sign-type text-[52px] leading-none text-petrol-700 sm:text-[68px]">{category.title[lang]}</h3>
                  <Garland className="hidden w-24 sm:block" flip />
                </div>
                <p className="mt-2 text-[12px] font-semibold tracking-[0.2em] text-petrol-500 uppercase">{category.subtitle[lang]}</p>
              </header>

              <div className={`mt-12 grid gap-x-16 gap-y-12 ${category.columns ? "lg:grid-cols-2" : ""}`}>
                {category.groups.map((group, gi) => (
                  <GroupBlock key={gi} group={group} lang={lang} twoCols={!category.columns} divider={!category.columns && gi > 0} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="mt-16 grid gap-6 border-t border-petrol-600/12 pt-8 text-[13px] leading-relaxed text-ink-soft sm:grid-cols-[1fr_auto] sm:items-end">
          <ul className="space-y-1.5">
            <li>
              <span className="font-semibold text-petrol-700">{t.menu.cover}</span> {formatPrice(COVER_CHARGE, lang)} {t.menu.perPerson}
            </li>
            <li>
              <span aria-hidden className="font-semibold text-petrol-700">
                *{" "}
              </span>
              {t.menu.frozen}
            </li>
            <li>{t.menu.allergens}</li>
            <li>{t.menu.coldChain}</li>
          </ul>
          <a
            href={SITE.links.menuPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 justify-self-start rounded-full px-1 py-1 text-[13px] font-semibold text-petrol-700 underline decoration-petrol-300 underline-offset-4 transition-colors hover:text-petrol-900 sm:justify-self-end"
          >
            <FilePdf size={18} weight="light" aria-hidden />
            {t.menu.pdf}
            <span className="sr-only">{t.common.newTab}</span>
          </a>
        </footer>
      </div>
    </section>
  );
}

function GroupBlock({ group, lang, twoCols, divider }: { group: DishGroup; lang: Lang; twoCols: boolean; divider: boolean }) {
  return (
    <div className={twoCols ? "lg:col-span-1" : ""}>
      {divider ? (
        <div aria-hidden className="mb-12 flex items-center justify-center gap-3 text-petrol-300">
          <span className="h-px w-12 bg-current" />
          <Blossom5 className="size-4" />
          <span className="h-px w-12 bg-current" />
        </div>
      ) : null}
      {group.title ? (
        <h4 className="mb-6 border-b border-petrol-600/15 pb-3 text-center font-display text-[26px] font-medium text-petrol-800 italic lg:text-left">
          {group.title[lang]}
        </h4>
      ) : null}
      <ul className={`grid gap-x-16 gap-y-6 ${twoCols ? "md:grid-cols-2" : ""}`}>
        {group.dishes.map((d) => (
          <DishRow key={d.name} dish={d} lang={lang} />
        ))}
      </ul>
    </div>
  );
}

function DishRow({ dish, lang }: { dish: Dish; lang: Lang }) {
  const desc = lang === "it" ? dish.it : dish.en;
  return (
    <li className="break-inside-avoid">
      <div className="flex items-baseline gap-2.5">
        <span translate="no" className="font-display text-[20px] leading-snug font-semibold text-ink sm:text-[21px]">{dish.name}</span>
        <span aria-hidden className="menu-leader" />
        <span className="shrink-0 text-[15px] font-semibold text-petrol-700 tabular">
          {formatPrice(dish.price, lang)}
          {dish.unit ? <span className="ml-1 text-[12px] font-medium text-ink-soft">{dish.unit[lang]}</span> : null}
        </span>
      </div>
      {desc ? <p className="mt-1 max-w-[52ch] text-[13.5px] leading-relaxed text-ink-soft">{desc}</p> : null}
    </li>
  );
}
