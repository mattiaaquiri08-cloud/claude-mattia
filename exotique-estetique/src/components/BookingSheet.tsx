import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { EnvelopeSimple, Phone, WhatsappLogo, X } from '@phosphor-icons/react'
import { business, categories } from '../content'
import { EASE, cn } from '../lib'
import { Button } from './Button'

/* Orari dal profilo Google: martedì - sabato 9:30 - 18:00, domenica e lunedì chiuso. */
const CLOSED_DAYS = [0, 1]
const SLOTS = ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']
const ANY_TIME = 'Qualsiasi orario'
const ANY_SERVICE = ''

const pad = (n: number) => String(n).padStart(2, '0')
const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const euroInt = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const euroDec = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const euro = (n: number) => (Number.isInteger(n) ? euroInt : euroDec).format(n)
const longDate = new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })

/* Primo giorno di apertura da oggi in poi. */
function firstOpenDay() {
  const d = new Date()
  while (CLOSED_DAYS.includes(d.getDay())) d.setDate(d.getDate() + 1)
  return isoDate(d)
}

/*
 * Il centro non accetta prenotazioni online su Treatwell: la richiesta
 * viene composta qui e inviata su WhatsApp, oppure si chiama direttamente.
 */
export function BookingSheet({
  isOpen,
  initialCategory,
  onClose,
}: {
  isOpen: boolean
  initialCategory?: string
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && <Sheet key="sheet" initialCategory={initialCategory} onClose={onClose} />}
    </AnimatePresence>
  )
}

function Sheet({ initialCategory, onClose }: { initialCategory?: string; onClose: () => void }) {
  const titleId = useId()
  const nameId = useId()
  const errId = useId()
  const noteId = useId()
  const panel = useRef<HTMLDivElement>(null)
  const serviceId = useId()
  const dateId = useId()
  const timeId = useId()
  const dateErrId = useId()
  const [cat, setCat] = useState<string | null>(initialCategory ?? null)
  const [service, setService] = useState(ANY_SERVICE)
  const [date, setDate] = useState(firstOpenDay)
  const [time, setTime] = useState(ANY_TIME)
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState(false)
  const today = isoDate(new Date())
  const day = date ? new Date(`${date}T12:00:00`) : null
  const dateError = !date ? 'Scegli un giorno.' : date < today ? 'Scegli un giorno da oggi in poi.' : day && CLOSED_DAYS.includes(day.getDay()) ? 'Domenica e lunedì il centro è chiuso: scegli un altro giorno.' : null
  const current = categories.find((c) => c.id === cat)
  const [desktop] = useState(() => window.matchMedia('(min-width: 768px)').matches)
  const hiddenPos = desktop ? { x: '100%' } : { y: '100%' }

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null
    const el = panel.current
    // Su desktop il cursore va nel campo nome; su smartphone non apriamo la tastiera.
    if (window.matchMedia('(pointer: fine)').matches) el?.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    else el?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && el) {
        const f = el.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus?.()
    }
  }, [onClose])

  const message = () => {
    const what = service || (current ? current.title.toLowerCase() : '')
    return [
      `Buongiorno, sono ${name.trim()}.`,
      what ? `Vorrei prenotare: ${what}.` : 'Vorrei prenotare un appuntamento.',
      day ? `Giorno preferito: ${longDate.format(day)}${time !== ANY_TIME ? `, verso le ${time}` : ''}.` : '',
      note.trim(),
      'Attendo conferma, grazie!',
    ]
      .filter(Boolean)
      .join('\n')
  }

  const valid = () => {
    if (!name.trim()) {
      setError(true)
      panel.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus()
      return false
    }
    return !dateError
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid()) return
    window.open(`${business.mobile.whatsapp}?text=${encodeURIComponent(message())}`, '_blank', 'noopener,noreferrer')
  }

  const sendEmail = () => {
    if (!valid()) return
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent('Richiesta di appuntamento')}&body=${encodeURIComponent(message())}`
  }

  return (
    <div className="fixed inset-0 z-60" role="presentation">
      <motion.div
        className="absolute inset-0 bg-[rgb(36_25_22/0.55)] backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        data-lenis-prevent
        className="absolute inset-x-0 bottom-0 flex max-h-[92svh] flex-col overflow-y-auto overscroll-contain bg-paper text-ink md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[min(32rem,100%)]"
        initial={hiddenPos}
        animate={{ x: 0, y: 0 }}
        exit={hiddenPos}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="flex items-start justify-between gap-6 px-6 pb-2 pt-6 md:px-10 md:pt-10">
          <h2 id={titleId} className="font-display text-[2.4rem] leading-[1.05] tracking-[-0.02em]">
            Prenota il tuo <em>momento</em>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi"
            className="-mr-2 -mt-1 grid size-11 shrink-0 place-items-center"
          >
            <X size={22} weight="light" />
          </button>
        </div>

        <form onSubmit={submit} noValidate className="flex flex-1 flex-col gap-8 px-6 pb-8 pt-4 md:px-10">
          <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
            Scegli trattamento, giorno e orario: la richiesta arriva al centro e Naomi ti conferma
            l&apos;appuntamento il prima possibile.
          </p>

          <fieldset>
            <legend className="mb-3 text-[0.875rem] font-medium">1. Trattamento</legend>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const on = cat === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setCat(on ? null : c.id)
                      setService(ANY_SERVICE)
                    }}
                    className={cn(
                      'h-10 border px-4 text-[0.875rem] transition-colors duration-300',
                      on ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink',
                    )}
                  >
                    {c.title}
                  </button>
                )
              })}
            </div>
            {current && (
              <div className="mt-4 flex flex-col gap-2">
                <label htmlFor={serviceId} className="text-[0.8125rem] text-ink-soft">
                  Quale trattamento di {current.title.toLowerCase()}?
                </label>
                <select id={serviceId} value={service} onChange={(e) => setService(e.target.value)} className="h-12 w-full border border-ink/30 bg-transparent px-4 text-[1rem] transition-colors focus:border-ink">
                  <option value={ANY_SERVICE}>Non so ancora, mi consiglia Naomi</option>
                  {current.services.map((sv) => (
                    <option key={sv.name} value={sv.name}>
                      {sv.name}
                      {sv.price !== null ? ` · ${sv.from ? 'da ' : ''}${euro(sv.price)}` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </fieldset>

          <fieldset className="grid grid-cols-[1.2fr_1fr] gap-3">
            <legend className="mb-3 text-[0.875rem] font-medium">2. Giorno e orario preferiti</legend>
            <div className="flex flex-col gap-2">
              <label htmlFor={dateId} className="text-[0.8125rem] text-ink-soft">
                Giorno
              </label>
              <input
                id={dateId}
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-invalid={Boolean(dateError)}
                aria-describedby={dateError ? dateErrId : undefined}
                className={cn('h-12 w-full border border-ink/30 bg-transparent px-4 text-[1rem] transition-colors focus:border-ink', dateError && 'border-lacca')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={timeId} className="text-[0.8125rem] text-ink-soft">
                Orario
              </label>
              <select id={timeId} value={time} onChange={(e) => setTime(e.target.value)} className="h-12 w-full border border-ink/30 bg-transparent px-4 text-[1rem] transition-colors focus:border-ink">
                <option>{ANY_TIME}</option>
                {SLOTS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <p id={dateErrId} className={cn('col-span-2 text-[0.8125rem]', dateError ? 'text-lacca' : 'text-ink-soft')}>
              {dateError ?? 'Aperti da martedì a sabato, 9:30 - 18:00.'}
            </p>
          </fieldset>

          <div className="flex flex-col gap-2">
            <label htmlFor={nameId} className="text-[0.875rem] font-medium">
              3. Il tuo nome
            </label>
            <input
              id={nameId}
              data-autofocus
              name="nome"
              value={name}
              autoComplete="given-name"
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError(false)
              }}
              aria-invalid={error}
              aria-describedby={error ? errId : undefined}
              className={cn(
                'h-12 border bg-transparent px-4 text-[1rem] transition-colors focus:border-ink',
                error ? 'border-lacca' : 'border-ink/30',
              )}
            />
            {error && (
              <p id={errId} className="text-[0.8125rem] text-lacca">
                Scrivi il tuo nome per inviare la richiesta: così sappiamo chi ricontattare.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={noteId} className="text-[0.875rem] font-medium">
              Note <span className="font-normal text-ink-soft">(facoltativo)</span>
            </label>
            <textarea
              id={noteId}
              name="note"
              rows={3}
              autoComplete="off"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="resize-none border border-ink/30 bg-transparent px-4 py-3 text-[1rem] transition-colors focus:border-ink"
            />
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-2">
            <Button type="submit" className="w-full">
              <WhatsappLogo size={18} aria-hidden />
              Invia la richiesta su WhatsApp
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={sendEmail}
                className="inline-flex h-12 items-center justify-center gap-2 border border-ink/35 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors hover:border-ink"
              >
                <EnvelopeSimple size={18} aria-hidden />
                Via email
              </button>
              <a
                href={business.mobile.href}
                className="inline-flex h-12 items-center justify-center gap-2 border border-ink/35 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors hover:border-ink"
              >
                <Phone size={18} aria-hidden />
                Chiama
              </a>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
