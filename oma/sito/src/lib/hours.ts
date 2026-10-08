import { DAY_NAMES, HOURS, type Slot } from '../data/site'

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

export const formatSlot = ([a, b]: Slot) => `${a.replace(':00', '')}-${b.replace(':00', '')}`

export function formatDayHours(weekday: number) {
  const slots = HOURS[weekday]
  if (!slots.length) return 'Chiuso'
  return slots.map(([a, b]) => `${a} - ${b}`).join(' / ')
}

/** Stato del locale adesso: aperto, in pausa o chiuso, con il prossimo orario utile. */
export function openStatus() {
  const now = romeNow()
  const today = HOURS[now.weekday]
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
  // prossimo giorno con orari
  for (let i = 1; i <= 7; i++) {
    const wd = (now.weekday + i) % 7
    const slots = HOURS[wd]
    if (slots.length) {
      const when = i === 1 ? 'domani' : DAY_NAMES[wd].toLowerCase()
      return { open: false, label: `Chiuso ora, apre ${when} alle ${slots[0][0]}` }
    }
  }
  return { open: false, label: 'Chiuso' }
}

/**
 * Orari prenotabili per un giorno: ogni 30 minuti, fino a un'ora prima della chiusura.
 * Se il giorno è oggi, salta gli orari già passati (con 30 minuti di margine).
 */
export function bookingSlots(iso: string) {
  const wd = weekdayOf(iso)
  const now = romeNow()
  const isToday = iso === now.iso
  return HOURS[wd].map(([a, b], i) => {
    const times: string[] = []
    for (let t = toMinutes(a); t <= toMinutes(b) - 60; t += 30) {
      if (isToday && t < now.minutes + 30) continue
      times.push(fromMinutes(t))
    }
    return { label: i === 0 ? 'Pranzo' : 'Cena', times }
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
      closed: HOURS[wd].length === 0,
      dayShort: i === 0 ? 'Oggi' : i === 1 ? 'Domani' : DAY_NAMES[wd].slice(0, 3),
      dayNum: d.getUTCDate(),
      month: d.toLocaleDateString('it-IT', { month: 'short', timeZone: 'UTC' }).replace('.', ''),
    }
  })
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
