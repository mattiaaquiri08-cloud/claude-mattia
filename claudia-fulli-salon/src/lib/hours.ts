import { openingHours } from '../data/salon'

const TIME_ZONE = 'Europe/Rome'

/** Giorno della settimana (0-6) e ora decimale nel fuso orario del salone. */
export function romeNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  const hour = Number(get('hour')) + Number(get('minute')) / 60
  return { day, hour }
}

export type OpenStatus = { open: boolean; label: string }

export function openStatus(date = new Date()): OpenStatus {
  const { day, hour } = romeNow(date)
  const today = openingHours.find((d) => d.day === day)

  if (today?.hours && hour >= today.hours[0] && hour < today.hours[1]) {
    return { open: true, label: `Aperto ora, fino alle ${today.hours[1]}:00` }
  }

  if (today?.hours && hour < today.hours[0]) {
    return { open: false, label: `Chiuso ora, apre oggi alle ${today.hours[0]}:00` }
  }

  for (let offset = 1; offset <= 7; offset++) {
    const next = openingHours.find((d) => d.day === (day + offset) % 7)
    if (next?.hours) {
      const when = offset === 1 ? 'domani' : next.label.toLowerCase()
      return { open: false, label: `Chiuso ora, riapre ${when} alle ${next.hours[0]}:00` }
    }
  }

  return { open: false, label: 'Chiuso' }
}
