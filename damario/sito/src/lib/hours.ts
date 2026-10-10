import { DAY_NAMES, HOURS, type Lang, type Slot } from '../data/site'
import { UI } from '../data/ui'

const TZ = 'Europe/Rome'
const LOCALE: Record<Lang, string> = { it: 'it-IT', en: 'en-GB' }

/** Data e ora correnti a Roma, indipendentemente dal fuso del visitatore. */
export function romeNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value)
  const date = new Date(Date.UTC(get('year'), get('month') - 1, get('day')))
  return { iso: toISO(date), weekday: date.getUTCDay(), minutes: get('hour') * 60 + get('minute') }
}

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export const fromMinutes = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

export function toISO(d: Date) {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
}

export function parseISO(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

export const weekdayOf = (iso: string) => parseISO(iso).getUTCDay()

export const isPast = (iso: string) => iso < romeNow().iso

export const formatSlot = ([a, b]: Slot) => `${a} - ${b}`

/** Aperto, chiuso, o in pausa: con il prossimo orario utile. */
export function openStatus(lang: Lang) {
  const v = UI.visit
  const now = romeNow()
  for (const [a, b] of HOURS[now.weekday]) {
    if (now.minutes >= toMinutes(a) && now.minutes < toMinutes(b)) {
      return { open: true, label: `${v.openNow[lang]} ${b}` }
    }
    if (now.minutes < toMinutes(a)) return { open: false, label: `${v.closedNow[lang]}, ${v.opensAt[lang]} ${a}` }
  }
  for (let i = 1; i <= 7; i++) {
    const wd = (now.weekday + i) % 7
    if (HOURS[wd].length) {
      const when = i === 1 ? v.tomorrow[lang] : DAY_NAMES[lang][wd]
      return { open: false, label: `${v.closedNow[lang]}, ${v.opensDay[lang]} ${when} ${lang === 'it' ? 'alle' : 'at'} ${HOURS[wd][0][0]}` }
    }
  }
  return { open: false, label: v.closedNow[lang] }
}

/**
 * Orari prenotabili per un giorno: ogni 30 minuti, fino a un'ora prima della chiusura.
 * Se il giorno è oggi salta quelli già passati (con 30 minuti di margine, ora di Roma).
 */
export function bookingSlots(iso: string) {
  const now = romeNow()
  if (iso < now.iso) return []
  const isToday = iso === now.iso
  return HOURS[weekdayOf(iso)].map(([a, b]) => {
    const times: string[] = []
    for (let t = toMinutes(a); t <= toMinutes(b) - 60; t += 30) {
      if (isToday && t < now.minutes + 30) continue
      times.push(fromMinutes(t))
    }
    return { meal: toMinutes(a) < 17 * 60 ? ('lunch' as const) : ('dinner' as const), times }
  })
}

/** I prossimi giorni a partire da oggi (fuso di Roma). */
export function nextDays(count: number, lang: Lang) {
  const start = parseISO(romeNow().iso)
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start)
    d.setUTCDate(start.getUTCDate() + i)
    const wd = d.getUTCDay()
    return {
      iso: toISO(d),
      closed: HOURS[wd].length === 0,
      dayShort: i === 0 ? UI.booking.today[lang] : i === 1 ? UI.booking.tomorrow[lang] : DAY_NAMES[lang][wd].slice(0, 3),
      dayNum: d.getUTCDate(),
      month: d.toLocaleDateString(LOCALE[lang], { month: 'short', timeZone: 'UTC' }).replace('.', ''),
    }
  })
}

export function longDate(iso: string, lang: Lang) {
  return parseISO(iso).toLocaleDateString(LOCALE[lang], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function shortDate(iso: string, lang: Lang) {
  return parseISO(iso).toLocaleDateString(LOCALE[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

/** Prezzo all'italiana: 13 → "13", 6.5 → "6,50" */
export function formatPrice(n: number, lang: Lang) {
  return Number.isInteger(n)
    ? String(n)
    : n.toLocaleString(LOCALE[lang], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
