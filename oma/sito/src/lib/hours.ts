import { DAY_NAMES, type Slot } from '../data/site'
import { getHours, getLavagna } from './live-data'

const TZ = 'Europe/Rome'

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
  const year = get('year')
  const month = get('month')
  const day = get('day')
  const minutes = get('hour') * 60 + get('minute')
  const date = new Date(Date.UTC(year, month - 1, day))
  return { iso: toISO(date), weekday: date.getUTCDay(), minutes }
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

export function addDays(iso: string, n: number) {
  const d = parseISO(iso)
  d.setUTCDate(d.getUTCDate() + n)
  return toISO(d)
}

/** Ferie o chiusura scritta sulla lavagna per quel giorno. */
export const lavagnaClosure = (iso: string) =>
  getLavagna().find((v) => (v.tipo === 'ferie' || v.tipo === 'chiuso') && v.dal <= iso && iso <= (v.al ?? v.dal))

/** Chiuso quel giorno: giorno di riposo settimanale oppure ferie/chiusura sulla lavagna. */
export const isClosedOn = (iso: string) => getHours()[weekdayOf(iso)].length === 0 || !!lavagnaClosure(iso)

export const formatSlot = ([a, b]: Slot) => `${a.replace(':00', '')}-${b.replace(':00', '')}`

export function formatDayHours(weekday: number) {
  const slots = getHours()[weekday]
  if (!slots.length) return 'Chiuso'
  return slots.map(([a, b]) => `${a} - ${b}`).join(' / ')
}

/** Stato del locale adesso: aperto, in pausa o chiuso, con il prossimo orario utile. */
export function openStatus() {
  const now = romeNow()
  const today = isClosedOn(now.iso) ? [] : getHours()[now.weekday]
  for (const [a, b] of today) {
    const open = toMinutes(a)
    const close = toMinutes(b)
    if (now.minutes >= open && now.minutes < close) {
      return { open: true, label: `Aperto ora, fino alle ${b}` }
    }
    if (now.minutes < open) {
      return { open: false, label: `Chiuso ora, apre alle ${a}` }
    }
  }
  // prossimo giorno aperto, saltando anche ferie e chiusure della lavagna
  for (let i = 1; i <= 60; i++) {
    const iso = addDays(now.iso, i)
    if (isClosedOn(iso)) continue
    const wd = weekdayOf(iso)
    const slots = getHours()[wd]
    const when = i === 1 ? 'domani' : i < 7 ? DAY_NAMES[wd].toLowerCase() : `il ${shortDate(iso)}`
    return { open: false, label: `Chiuso ora, apre ${when} alle ${slots[0][0]}` }
  }
  return { open: false, label: 'Chiuso' }
}

/**
 * Orari prenotabili per un giorno: ogni 30 minuti, fino a un'ora prima della chiusura.
 * Se il giorno è oggi, salta gli orari già passati (con 30 minuti di margine).
 */
export function bookingSlots(iso: string) {
  if (lavagnaClosure(iso)) return []
  const wd = weekdayOf(iso)
  const now = romeNow()
  const isToday = iso === now.iso
  return getHours()[wd].map(([a, b], i) => {
    const times: string[] = []
    for (let t = toMinutes(a); t <= toMinutes(b) - 60; t += 30) {
      if (isToday && t < now.minutes + 30) continue
      times.push(fromMinutes(t))
    }
    return { label: toMinutes(a) < 17 * 60 ? 'Pranzo' : i === 0 ? 'Orari' : 'Cena', times }
  })
}

/** I prossimi giorni a partire da oggi (fuso di Roma). */
export function nextDays(count: number) {
  const start = parseISO(romeNow().iso)
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start)
    d.setUTCDate(start.getUTCDate() + i)
    const iso = toISO(d)
    const wd = d.getUTCDay()
    return {
      iso,
      weekday: wd,
      closed: isClosedOn(iso),
      dayShort: i === 0 ? 'Oggi' : i === 1 ? 'Domani' : DAY_NAMES[wd].slice(0, 3),
      dayNum: d.getUTCDate(),
      month: d.toLocaleDateString('it-IT', { month: 'short', timeZone: 'UTC' }).replace('.', ''),
    }
  })
}

/** "24 dic" */
export function shortDate(iso: string) {
  return parseISO(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', timeZone: 'UTC' }).replace('.', '')
}

export function longDate(iso: string) {
  return parseISO(iso).toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
