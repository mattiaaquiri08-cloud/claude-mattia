// Quando si clicca una voce del menu, la sezione arriva al centro dello schermo
// (sotto il menu in alto) invece di fermarsi troppo in basso per via dei margini.

// Parte utile di un elemento: senza i margini interni (padding) suoi e dell'unico contenitore dentro.
function areaContenuto(el: Element) {
  let alto = 0;
  let basso = 0;
  let nodo: Element | null = el;
  for (let i = 0; i < 2 && nodo; i++) {
    const r = nodo.getBoundingClientRect();
    const s = getComputedStyle(nodo);
    alto = r.top + parseFloat(s.paddingTop);
    basso = r.bottom - parseFloat(s.paddingBottom);
    nodo = nodo.children.length === 1 ? nodo.children[0] : null;
  }
  return { alto, basso };
}

function posizioneCentrata(el: Element) {
  const menu = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
  const spazio = window.innerHeight - menu;
  const { alto, basso } = areaContenuto(el);
  const altezza = basso - alto;
  const margine = altezza < spazio - 32 ? (spazio - altezza) / 2 : 24;
  return Math.max(0, window.scrollY + alto - menu - margine);
}

export function scorriA(id: string, fluido = true) {
  if (id === "inizio") {
    window.scrollTo({ top: 0, behavior: fluido ? "smooth" : "instant" });
    return true;
  }
  const el = document.getElementById(id);
  if (!el || !["SECTION", "FORM"].includes(el.tagName)) return false;
  const ridotto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: posizioneCentrata(el), behavior: fluido && !ridotto ? "smooth" : "instant" });
  return true;
}

export function attivaScorrimentoCentrato() {
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element | null)?.closest?.("a[href^='#']");
    if (!link) return;
    const id = decodeURIComponent(link.getAttribute("href")!.slice(1));
    // aspetto un fotogramma: il menu del telefono deve prima chiudersi e sbloccare lo scorrimento
    if (
      !document.getElementById(id) ||
      (id !== "inizio" && !["SECTION", "FORM"].includes(document.getElementById(id)!.tagName))
    )
      return;
    e.preventDefault();
    history.pushState(null, "", `#${id}`);
    requestAnimationFrame(() => requestAnimationFrame(() => scorriA(id)));
  });

  // arrivando da un'altra pagina con l'indirizzo che punta a una sezione (es. ../#chi-sono)
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (id) {
    const centra = () => scorriA(id, false);
    window.addEventListener(
      "load",
      () => {
        centra();
        setTimeout(centra, 300);
      },
      { once: true },
    );
  }
}
