/*
  Menu, orari, avviso e lavagna letti dal Foglio Google di OMA (SITE.sheetId).
  - All'avvio il sito mostra subito i dati salvati (ultimo caricamento riuscito, oppure quelli in site.ts).
  - Poi legge il foglio: se la lettura va a buon fine aggiorna la pagina, altrimenti resta tutto com'è.
  Il foglio deve essere condiviso come "Chiunque abbia il link: visualizzatore".
*/
import { useSyncExternalStore } from 'react'
import {
  HOURS,
  LAVAGNA,
  MENU,
  SITE,
  type Dish,
  type MenuSection,
  type Slot,
  type TipoLavagna,
  type Turno,
  type VoceLavagna,
} from '../data/site'

export type LiveData = {
  menu: MenuSection[]
  hours: Record<number, Slot[]>
  notice: string
  lavagna: VoceLavagna[]
}

const CACHE_KEY = 'oma-dati-foglio-v2'

let data: LiveData = readCache() ?? { menu: MENU, hours: HOURS, notice: '', lavagna: LAVAGNA }
const listeners = new Set<() => void>()

function emit(next: LiveData) {
  data = next
  listeners.forEach((l) => l())
}

export function useLiveData() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => data,
  )
}

/** Orari correnti, per le funzioni che non sono componenti (stato aperto/chiuso, orari prenotabili). */
export const getHours = () => data.hours

/** Voci della lavagna correnti (servono anche per bloccare ferie e chiusure nelle prenotazioni). */
export const getLavagna = () => data.lavagna

/* ---------- Lettura del foglio ---------- */

const sheetUrl = (tab: string) =>
  `https://docs.google.com/spreadsheets/d/${SITE.sheetId}/gviz/tq?tqx=out:csv&headers=1&sheet=${encodeURIComponent(tab)}`

async function fetchTab(tab: string) {
  const res = await fetch(sheetUrl(tab), { cache: 'no-store' })
  if (!res.ok) throw new Error(`Foglio "${tab}": ${res.status}`)
  const text = await res.text()
  // senza condivisione pubblica Google risponde con una pagina di accesso, non con il CSV
  if (text.trimStart().startsWith('<')) throw new Error(`Foglio "${tab}" non pubblico`)
  return parseCsv(text)
}

let started = false

export async function loadLiveData() {
  if (started || !SITE.sheetId) return
  started = true
  try {
    const [menuRows, hourRows, noticeRows, lavagnaRows] = await Promise.all([
      fetchTab('Menu'),
      fetchTab('Orari'),
      fetchTab('Avviso').catch(() => [] as string[][]),
      fetchTab('Lavagna').catch(() => null),
    ])
    const menu = parseMenu(menuRows)
    const hours = parseHours(hourRows)
    const next: LiveData = {
      // un foglio vuoto o rovinato non deve svuotare il sito
      menu: menu.length ? menu : data.menu,
      hours: hours ?? data.hours,
      // la prima riga della scheda Avviso è l'intestazione con le istruzioni
      notice: noticeRows.map((r) => (r[0] ?? '').trim()).find((t) => t && !t.startsWith('Avviso sul sito')) ?? '',
      // senza la scheda Lavagna restano le voci scritte in site.ts
      lavagna: lavagnaRows ? parseLavagna(lavagnaRows) : data.lavagna,
    }
    writeCache(next)
    emit(next)
  } catch (err) {
    console.warn('Dati del foglio non disponibili, uso quelli salvati.', err)
  }
}

/* ---------- Conversione delle righe ---------- */

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()

const slug = (s: string) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'portata'

function formatPrice(raw: string) {
  const p = raw.replace(/€/g, '').trim().replace('.', ',')
  return p.replace(/,0+$/, '')
}

function parseMenu(rows: string[][]): MenuSection[] {
  if (rows.length < 2) return []
  const header = rows[0].map(norm)
  const col = (name: string) => header.findIndex((h) => h.startsWith(name))
  const iPortata = col('portata')
  const iSezione = col('sezione')
  const iPiatto = col('piatto')
  const iDescr = col('descrizione')
  const iPrezzo = col('prezzo')
  const iVisibile = col('visibile')
  if (iPortata < 0 || iPiatto < 0 || iPrezzo < 0) return []

  const sections: MenuSection[] = []
  for (const r of rows.slice(1)) {
    const portata = (r[iPortata] ?? '').trim()
    const name = (r[iPiatto] ?? '').trim()
    const price = formatPrice(r[iPrezzo] ?? '')
    if (!portata || !name) continue
    if (iVisibile >= 0 && norm(r[iVisibile] ?? '') === 'no') continue

    let section = sections.find((s) => norm(s.title) === norm(portata))
    if (!section) {
      const known = MENU.find((m) => norm(m.title) === norm(portata))
      section = { id: known?.id ?? slug(portata), title: known?.title ?? portata, intro: known?.intro ?? '', groups: [] }
      sections.push(section)
    }
    const groupTitle = iSezione >= 0 ? (r[iSezione] ?? '').trim() : ''
    let group = section.groups.find((g) => (g.title ?? '') === groupTitle)
    if (!group) {
      group = { title: groupTitle || undefined, dishes: [] }
      section.groups.push(group)
    }
    const known = MENU.flatMap((m) => m.groups.flatMap((g) => g.dishes)).find((d) => norm(d.name) === norm(name))
    const dish: Dish = { name, price, detail: (r[iDescr] ?? '').trim() || undefined, pick: known?.pick }
    group.dishes.push(dish)
  }
  return sections
}

const DAYS: Record<string, number> = {
  lunedi: 1,
  martedi: 2,
  mercoledi: 3,
  giovedi: 4,
  venerdi: 5,
  sabato: 6,
  domenica: 0,
}

const two = (n: string) => n.padStart(2, '0')

function parseSlot(raw: string): Slot | null {
  const m = raw.match(/(\d{1,2})(?:[:.](\d{2}))?\s*[-–a]\s*(\d{1,2})(?:[:.](\d{2}))?/)
  if (!m) return null
  return [`${two(m[1])}:${m[2] ?? '00'}`, `${two(m[3])}:${m[4] ?? '00'}`]
}

function parseHours(rows: string[][]): Record<number, Slot[]> | null {
  const out: Record<number, Slot[]> = {}
  for (const r of rows.slice(1)) {
    const day = DAYS[norm(r[0] ?? '')]
    if (day === undefined) continue
    out[day] = r
      .slice(1, 3)
      .map((c) => parseSlot(c ?? ''))
      .filter((s): s is Slot => s !== null)
  }
  // servono tutti e sette i giorni, altrimenti si tengono gli orari precedenti
  return Object.keys(out).length === 7 ? out : null
}

/** Data scritta come 24/12/2026, 24-12-2026 o 2026-12-24, convertita in AAAA-MM-GG. */
function parseDate(raw: string) {
  const t = raw.trim()
  let m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
  if (m) return `${m[1]}-${two(m[2])}-${two(m[3])}`
  m = t.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})$/)
  if (m) return `${m[3].length === 2 ? `20${m[3]}` : m[3]}-${two(m[2])}-${two(m[1])}`
  return null
}

function parseTipo(raw: string): TipoLavagna {
  const t = norm(raw)
  if (t.startsWith('feri')) return 'ferie'
  if (t.startsWith('chius')) return 'chiuso'
  if (t.startsWith('promo') || t.startsWith('offert')) return 'promo'
  if (t.startsWith('event') || t.startsWith('serat')) return 'evento'
  return 'avviso'
}

function parseTurno(raw: string): Turno | undefined {
  const t = norm(raw)
  if (t.includes('cena')) return 'cena'
  if (t.includes('pranz')) return 'pranzo'
  return undefined
}

function parseLavagna(rows: string[][]): VoceLavagna[] {
  if (rows.length < 1) return []
  const header = rows[0].map(norm)
  const col = (name: string) => header.findIndex((h) => h.startsWith(name))
  const iDal = col('dal')
  const iAl = col('al')
  const iTurno = col('turno')
  const iTipo = col('tipo')
  const iTesto = col('testo')
  if (iTesto < 0) return []
  const out: VoceLavagna[] = []
  for (const r of rows.slice(1)) {
    const testo = (r[iTesto] ?? '').trim()
    if (!testo) continue
    // senza data la voce vale sempre (es. una promozione fissa)
    const dal = iDal >= 0 ? (parseDate(r[iDal] ?? '') ?? undefined) : undefined
    const al = dal && iAl >= 0 ? parseDate(r[iAl] ?? '') : null
    out.push({
      dal,
      al: dal && al && al > dal ? al : undefined,
      turno: iTurno >= 0 ? parseTurno(r[iTurno] ?? '') : undefined,
      tipo: parseTipo(iTipo >= 0 ? (r[iTipo] ?? '') : ''),
      testo,
    })
  }
  return out
}

/** CSV secondo RFC 4180: virgolette, virgole e a capo dentro le celle. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"'
        i++
      } else if (c === '"') quoted = false
      else cell += c
    } else if (c === '"') quoted = true
    else if (c === ',') {
      row.push(cell)
      cell = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else cell += c
  }
  if (cell || row.length) {
    row.push(cell)
    rows.push(row)
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ''))
}

/* ---------- Copia locale dell'ultimo caricamento ---------- */

function readCache(): LiveData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as LiveData
    return parsed.menu?.length && parsed.hours ? { ...parsed, lavagna: parsed.lavagna ?? LAVAGNA } : null
  } catch {
    return null
  }
}

function writeCache(d: LiveData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(d))
  } catch {
    /* archivio del browser non disponibile: si legge il foglio a ogni visita */
  }
}
