// Lettura del menù e degli eventi da Google Sheets.
//
// Il foglio resta modificabile solo da chi ha l'accesso in modifica: il sito lo legge
// in sola lettura come CSV (prima scheda), senza chiavi o credenziali. In config.ts si mette
// l'ID del foglio condiviso in lettura oppure il link CSV di "Pubblica sul web".
// L'esportazione CSV riporta le celle così come sono scritte (anche testo e numeri mescolati).
// Se il foglio non risponde si usa l'ultima copia salvata nel browser, poi i dati dimostrativi.

import { FOGLIO } from "./config";

export type Riga = Record<string, string>;
export type Origine = "foglio" | "copia" | "demo";

const ATTESA_MAX = 8000;

// CSV secondo RFC 4180: virgolette, virgole e a capo dentro le celle
export function leggiCsv(testo: string): Riga[] {
  const righe: string[][] = [];
  let riga: string[] = [];
  let cella = "";
  let tra = false;
  for (let i = 0; i < testo.length; i++) {
    const c = testo[i];
    if (tra) {
      if (c === '"') {
        if (testo[i + 1] === '"') {
          cella += '"';
          i++;
        } else tra = false;
      } else cella += c;
    } else if (c === '"') tra = true;
    else if (c === ",") {
      riga.push(cella);
      cella = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && testo[i + 1] === "\n") i++;
      riga.push(cella);
      righe.push(riga);
      riga = [];
      cella = "";
    } else cella += c;
  }
  if (cella !== "" || riga.length) {
    riga.push(cella);
    righe.push(riga);
  }
  const [intestazione, ...dati] = righe;
  if (!intestazione) return [];
  const chiavi = intestazione.map((k) => normalizza(k));
  return dati
    .filter((r) => r.some((v) => v.trim() !== ""))
    .map((r) => Object.fromEntries(chiavi.map((k, i) => [k, (r[i] ?? "").trim()])));
}

// "Nome piatto (EN)" -> "nome_piatto_en": le intestazioni restano leggibili per chi compila
function normalizza(k: string) {
  return k
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

function indirizzo(scheda: "menu" | "eventi") {
  const v = FOGLIO[scheda].trim();
  if (!v || /^https?:\/\//.test(v)) return v;
  return `https://docs.google.com/spreadsheets/d/${v}/export?format=csv&gid=0`;
}

export async function caricaScheda(
  scheda: "menu" | "eventi",
): Promise<{ righe: Riga[]; origine: Origine; aggiornato?: number }> {
  const url = indirizzo(scheda);
  const chiaveCopia = `100c-${scheda}`;
  if (url) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ATTESA_MAX);
    try {
      const risposta = await fetch(url, { signal: ctrl.signal, cache: "no-store" });
      if (!risposta.ok) throw new Error(String(risposta.status));
      const testo = await risposta.text();
      // un foglio non condiviso restituisce la pagina di accesso di Google, non un CSV
      if (/^\s*</.test(testo)) throw new Error("non è un CSV");
      const righe = leggiCsv(testo);
      if (!righe.length) throw new Error("vuoto");
      try {
        localStorage.setItem(chiaveCopia, JSON.stringify({ righe, quando: Date.now() }));
      } catch {
        /* archivio del browser non disponibile: si va avanti senza copia */
      }
      return { righe, origine: "foglio", aggiornato: Date.now() };
    } catch {
      try {
        const copia = JSON.parse(localStorage.getItem(chiaveCopia) ?? "null");
        if (copia?.righe?.length) return { righe: copia.righe, origine: "copia", aggiornato: copia.quando };
      } catch {
        /* nessuna copia leggibile */
      }
    } finally {
      clearTimeout(timer);
    }
  }
  return { righe: [], origine: "demo" };
}

// "sì", "si", "x", "1", "true", "yes" e cella vuota contano come disponibile
export function vero(v: string | undefined, vuoto = true) {
  if (!v) return vuoto;
  return /^(s[iì]|x|1|true|yes|y|ok)$/i.test(v.trim());
}

// "12" -> "12 €"; "12,5" -> "12,50 €"; testo libero ("s.q.", "all'etto") resta com'è
export function prezzo(v: string, lingua: "it" | "en") {
  const n = Number(v.replace(/€/g, "").replace(",", ".").trim());
  if (!v.trim()) return "";
  if (Number.isNaN(n)) return v;
  const testo = n.toLocaleString(lingua === "it" ? "it-IT" : "en-GB", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return lingua === "it" ? `${testo} €` : `€${testo}`;
}
