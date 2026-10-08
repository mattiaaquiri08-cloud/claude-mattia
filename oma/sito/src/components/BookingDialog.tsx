import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  ArrowSquareOut,
  CalendarBlank,
  CheckCircle,
  Minus,
  Plus,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react'
import { SITE } from '../data/site'
import { bookingSlots, longDate, nextDays, weekdayOf } from '../lib/hours'
import { HOURS } from '../data/site'

type Props = { open: boolean; onClose: () => void }

type Form = {
  name: string
  date: string
  time: string
  people: number
  email: string
  phone: string
  notes: string
}

type Errors = Partial<Record<keyof Form, string>>

const EMPTY: Form = { name: '', date: '', time: '', people: 2, email: '', phone: '', notes: '' }
const MAX_PEOPLE = 20

function validate(f: Form): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Scrivi il tuo nome.'
  if (!f.date) e.date = 'Scegli il giorno.'
  else if (HOURS[weekdayOf(f.date)].length === 0) e.date = 'Il mercoledì siamo chiusi. Scegli un altro giorno.'
  if (!f.time) e.time = "Scegli l'orario."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Controlla l'indirizzo email."
  if (f.phone.replace(/\D/g, '').length < 8) e.phone = 'Inserisci un numero di telefono valido.'
  return e
}

function buildMessage(f: Form) {
  const lines = [
    'Ciao OMA! Vorrei prenotare un tavolo.',
    '',
    `*Nome:* ${f.name.trim()}`,
    `*Giorno:* ${longDate(f.date)}`,
    `*Orario:* ${f.time}`,
    `*Persone:* ${f.people}`,
    `*Email:* ${f.email.trim()}`,
    `*Telefono:* ${f.phone.trim()}`,
  ]
  if (f.notes.trim()) lines.push(`*Note:* ${f.notes.trim()}`)
  lines.push('', 'Attendo la vostra conferma. Grazie!')
  return lines.join('\n')
}

export function BookingDialog({ open, onClose }: Props) {
  const reduce = useReducedMotion()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  const [form, setForm] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [sentUrl, setSentUrl] = useState<string | null>(null)
  const [showOtherDate, setShowOtherDate] = useState(false)

  const days = useMemo(() => (open ? nextDays(14) : []), [open])
  const slots = useMemo(() => (form.date ? bookingSlots(form.date) : []), [form.date])
  const todayISO = days[0]?.iso ?? ''

  // Blocca lo scroll della pagina, chiude con Esc, riporta il focus dove era
  useEffect(() => {
    if (!open) return
    lastFocused.current = document.activeElement as HTMLElement
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPadding = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
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
    // su smartphone non apriamo la tastiera da soli: il focus va sul pannello
    const fine = window.matchMedia('(pointer: fine)').matches
    const t = window.setTimeout(
      () => (fine ? firstFieldRef.current : panelRef.current)?.focus({ preventScroll: true }),
      350,
    )
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPadding
      lastFocused.current?.focus?.({ preventScroll: true })
    }
  }, [open, onClose])

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => {
      const next = { ...f, [key]: value }
      // se cambia il giorno, l'orario scelto potrebbe non esistere più
      if (key === 'date' && f.time && !bookingSlots(value as string).some((s) => s.times.includes(f.time))) {
        next.time = ''
      }
      return next
    })
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    const firstError = Object.keys(errs)[0]
    if (firstError) {
      const box = panelRef.current?.querySelector<HTMLElement>(`[data-field="${firstError}"]`)
      box?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
      box?.querySelector<HTMLElement>('input:not([disabled]), button:not([disabled])')?.focus({ preventScroll: true })
      return
    }
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(buildMessage(form))}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSentUrl(url)
  }

  const resetAndClose = () => {
    onClose()
    window.setTimeout(() => {
      if (sentUrl) {
        setForm(EMPTY)
        setSentUrl(null)
      }
    }, 400)
  }

  const selectedDayIsInStrip = days.some((d) => d.iso === form.date)
  const noSlotsLeft = form.date && slots.every((s) => s.times.length === 0)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            aria-label="Chiudi la prenotazione"
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-ink/75 backdrop-blur-md"
            onClick={resetAndClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative grid h-[92dvh] outline-none focus-visible:ring-2 focus-visible:ring-ochre/60 w-full max-w-[1040px] grid-rows-[minmax(0,1fr)] overflow-hidden rounded-t-[28px] border border-line bg-coal shadow-[0_40px_120px_-30px_rgb(0_0_0/0.8)] md:h-[min(88dvh,860px)] md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:rounded-[28px]"
            initial={reduce ? { opacity: 0 } : { y: '100%', opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: '100%', opacity: 0.6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          >
            {/* Colonna foto (solo desktop) */}
            <div className="relative hidden overflow-hidden md:block">
              <img
                src="./img/g-sala-verticale.webp"
                alt=""
                width={940}
                height={1672}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <img src="./img/logo-oma.png" alt="" width={620} height={303} className="mb-5 w-24" />
                <p className="font-display text-2xl leading-tight font-semibold text-balance text-cream">
                  Ti teniamo un posto a tavola.
                </p>
                <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-cream/75">
                  La richiesta arriva a noi su WhatsApp. Ti rispondiamo per confermare il tavolo.
                </p>
              </div>
            </div>

            {/* Colonna modulo */}
            <div className="flex min-h-0 min-w-0 flex-col">
              <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 md:px-9">
                <div>
                  <h2 id={titleId} className="font-display text-2xl font-semibold tracking-tight">
                    Prenota un tavolo
                  </h2>
                  <p className="mt-0.5 text-sm text-mute">Ci vuole meno di un minuto.</p>
                </div>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-cream transition-colors hover:border-mute hover:bg-smoke"
                  aria-label="Chiudi"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-9">
                <AnimatePresence mode="wait" initial={false}>
                  {sentUrl ? (
                    <motion.div
                      key="sent"
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-start py-6"
                      role="status"
                    >
                      <span className="grid size-14 place-items-center rounded-full bg-whatsapp/15 text-whatsapp">
                        <WhatsappLogo size={30} weight="fill" />
                      </span>
                      <h3 className="mt-6 font-display text-3xl leading-tight font-semibold text-balance">
                        Ultimo passo: premi Invia su WhatsApp.
                      </h3>
                      <p className="mt-4 max-w-[46ch] leading-relaxed text-mute">
                        Abbiamo preparato il messaggio con tutti i tuoi dati. La richiesta parte solo quando lo invii,
                        poi ti rispondiamo noi per confermare il tavolo.
                      </p>
                      <ul className="mt-6 w-full space-y-2.5 rounded-[var(--radius-field)] border border-line bg-ink/60 p-5 text-sm">
                        <li className="flex justify-between gap-4">
                          <span className="text-mute">Giorno</span>
                          <span className="text-right capitalize">{longDate(form.date)}</span>
                        </li>
                        <li className="flex justify-between gap-4">
                          <span className="text-mute">Orario</span>
                          <span>{form.time}</span>
                        </li>
                        <li className="flex justify-between gap-4">
                          <span className="text-mute">Persone</span>
                          <span>{form.people}</span>
                        </li>
                      </ul>
                      <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
                        <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                          <ArrowSquareOut size={18} weight="bold" />
                          Riapri WhatsApp
                        </a>
                        <button type="button" onClick={() => setSentUrl(null)} className="btn-ghost">
                          <ArrowLeft size={18} weight="bold" />
                          Modifica i dati
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      noValidate
                      onSubmit={onSubmit}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col gap-7"
                    >
                      {/* Nome */}
                      <div className="flex flex-col gap-2" data-field="name">
                        <label htmlFor="b-name" className="text-sm font-medium">
                          Nome e cognome
                        </label>
                        <input
                          ref={firstFieldRef}
                          id="b-name"
                          className="field"
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => set('name', e.target.value)}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'b-name-err' : undefined}
                          name="nome"
                          placeholder="Mario Rossi…"
                        />
                        <FieldError id="b-name-err" msg={errors.name} />
                      </div>

                      {/* Giorno */}
                      <fieldset className="flex flex-col gap-2" data-field="date">
                        <legend className="mb-2 text-sm font-medium">Giorno</legend>
                        <div
                          className="no-scrollbar -mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-1 md:-mx-9 md:px-9"
                          role="radiogroup"
                          aria-label="Prossimi giorni"
                        >
                          {days.map((d) => {
                            const active = form.date === d.iso
                            return (
                              <button
                                key={d.iso}
                                type="button"
                                role="radio"
                                aria-checked={active}
                                disabled={d.closed}
                                onClick={() => set('date', d.iso)}
                                title={d.closed ? 'Chiuso il mercoledì' : undefined}
                                className={`flex w-[68px] shrink-0 snap-start flex-col items-center rounded-[16px] border px-2 py-3 transition-[background-color,border-color,transform] duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-35 ${
                                  active
                                    ? 'border-ochre bg-ochre text-ink'
                                    : 'border-line text-cream hover:border-mute disabled:hover:border-line'
                                }`}
                              >
                                <span className={`text-[11px] font-semibold uppercase ${active ? 'text-ink/80' : 'text-mute'}`}>
                                  {d.dayShort}
                                </span>
                                <span className="font-display text-2xl leading-tight font-semibold">{d.dayNum}</span>
                                <span className={`text-[11px] ${active ? 'text-ink/80' : 'text-mute'}`}>
                                  {d.closed ? 'chiuso' : d.month}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          {!showOtherDate ? (
                            <button
                              type="button"
                              onClick={() => setShowOtherDate(true)}
                              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ochre underline-offset-4 hover:underline"
                            >
                              <CalendarBlank size={18} />
                              Scegli un'altra data
                            </button>
                          ) : (
                            <div className="flex w-full flex-col gap-2 sm:w-auto">
                              <label htmlFor="b-date" className="text-sm text-mute">
                                Altra data
                              </label>
                              <input
                                id="b-date"
                                type="date"
                                className="field sm:w-60"
                                min={todayISO}
                                value={selectedDayIsInStrip ? '' : form.date}
                                name="data"
                                onChange={(e) => set('date', e.target.value)}
                              />
                            </div>
                          )}
                          {form.date && !selectedDayIsInStrip && !errors.date && (
                            <span className="text-sm text-cream capitalize">{longDate(form.date)}</span>
                          )}
                        </div>
                        <FieldError msg={errors.date} />
                      </fieldset>

                      {/* Orario */}
                      <fieldset className="flex flex-col gap-2" data-field="time">
                        <legend className="mb-2 text-sm font-medium">Orario</legend>
                        {!form.date ? (
                          <p className="rounded-[var(--radius-field)] border border-dashed border-line px-4 py-4 text-sm text-mute">
                            Prima scegli il giorno, poi ti mostriamo gli orari liberi.
                          </p>
                        ) : noSlotsLeft ? (
                          <p className="rounded-[var(--radius-field)] border border-dashed border-line px-4 py-4 text-sm text-mute">
                            Per questo giorno non ci sono più orari prenotabili online. Scegli un altro giorno o chiamaci al{' '}
                            <a href={SITE.phoneHref} className="text-ochre underline underline-offset-4">
                              {SITE.phoneDisplay}
                            </a>
                            .
                          </p>
                        ) : (
                          <div className="flex flex-col gap-4">
                            {slots.map(
                              (s) =>
                                s.times.length > 0 && (
                                  <div key={s.label}>
                                    <p className="mb-2 text-xs font-medium text-mute">{s.label}</p>
                                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={s.label}>
                                      {s.times.map((t) => (
                                        <button
                                          key={t}
                                          type="button"
                                          role="radio"
                                          aria-checked={form.time === t}
                                          onClick={() => set('time', t)}
                                          className="chip tabular-nums"
                                        >
                                          {t}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                ),
                            )}
                          </div>
                        )}
                        <FieldError msg={errors.time} />
                      </fieldset>

                      {/* Persone */}
                      <div className="flex flex-col gap-2">
                        <span id="b-people-label" className="text-sm font-medium">
                          Numero di persone
                        </span>
                        <div className="flex items-center gap-4">
                          <div
                            className="inline-flex items-center rounded-full border border-line bg-ink p-1"
                            role="group"
                            aria-labelledby="b-people-label"
                          >
                            <button
                              type="button"
                              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-smoke disabled:opacity-30"
                              onClick={() => set('people', Math.max(1, form.people - 1))}
                              disabled={form.people <= 1}
                              aria-label="Una persona in meno"
                            >
                              <Minus size={18} weight="bold" />
                            </button>
                            <output
                              aria-live="polite"
                              className="w-12 text-center font-display text-2xl font-semibold tabular-nums"
                            >
                              {form.people}
                            </output>
                            <button
                              type="button"
                              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-smoke disabled:opacity-30"
                              onClick={() => set('people', Math.min(MAX_PEOPLE, form.people + 1))}
                              disabled={form.people >= MAX_PEOPLE}
                              aria-label="Una persona in più"
                            >
                              <Plus size={18} weight="bold" />
                            </button>
                          </div>
                          <span className="text-sm text-mute">
                            {form.people >= 10 ? 'Gruppo numeroso? Scrivilo nelle note.' : form.people === 1 ? 'persona' : 'persone'}
                          </span>
                        </div>
                      </div>

                      {/* Email e telefono */}
                      <div className="grid gap-7 sm:grid-cols-2 sm:gap-4">
                        <div className="flex flex-col gap-2" data-field="email">
                          <label htmlFor="b-email" className="text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="b-email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            className="field"
                            value={form.email}
                            onChange={(e) => set('email', e.target.value)}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'b-email-err' : undefined}
                            name="email"
                            spellCheck={false}
                            placeholder="nome@email.it…"
                          />
                          <FieldError id="b-email-err" msg={errors.email} />
                        </div>
                        <div className="flex flex-col gap-2" data-field="phone">
                          <label htmlFor="b-phone" className="text-sm font-medium">
                            Telefono
                          </label>
                          <input
                            id="b-phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            className="field"
                            value={form.phone}
                            onChange={(e) => set('phone', e.target.value)}
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? 'b-phone-err' : undefined}
                            name="telefono"
                            placeholder="333 123 4567…"
                          />
                          <FieldError id="b-phone-err" msg={errors.phone} />
                        </div>
                      </div>

                      {/* Note */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="b-notes" className="text-sm font-medium">
                          Note <span className="font-normal text-mute">(facoltative)</span>
                        </label>
                        <textarea
                          id="b-notes"
                          rows={2}
                          className="field resize-none"
                          value={form.notes}
                          onChange={(e) => set('notes', e.target.value)}
                          name="note"
                          placeholder="Allergie, seggiolone, un compleanno da festeggiare…"
                        />
                      </div>

                      <div className="flex flex-col gap-3 pt-1">
                        <button type="submit" className="btn-primary w-full !py-[18px]">
                          <WhatsappLogo size={20} weight="fill" />
                          Invia prenotazione
                        </button>
                        <p className="flex items-start gap-2 text-xs leading-relaxed text-mute">
                          <CheckCircle size={16} className="mt-px shrink-0" />
                          Si apre WhatsApp con il messaggio già scritto: devi solo premere Invia. La prenotazione è
                          valida quando ti rispondiamo.
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function FieldError({ msg, id }: { msg?: string; id?: string }) {
  return (
    <AnimatePresence initial={false}>
      {msg && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0, transition: { duration: 0.15 } }}
          className="text-sm text-danger"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
