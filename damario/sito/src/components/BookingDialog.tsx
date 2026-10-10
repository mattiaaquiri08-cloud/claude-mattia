import { ArrowLeft, ArrowSquareOut, CalendarBlank, CheckCircle, Minus, Plus, WhatsappLogo, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react'
import { HOURS, SITE, type Lang } from '../data/site'
import { UI } from '../data/ui'
import { bookingSlots, isPast, longDate, nextDays, weekdayOf } from '../lib/hours'
import { useI18n } from '../lib/i18n'

type Props = { open: boolean; onClose: () => void }

type Form = { name: string; date: string; time: string; people: number; email: string; phone: string; notes: string }
type Errors = Partial<Record<keyof Form, string>>

const EMPTY: Form = { name: '', date: '', time: '', people: 2, email: '', phone: '', notes: '' }
const MAX_PEOPLE = 30
const B = UI.booking

function validate(f: Form, lang: Lang): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 3 || !/\p{L}/u.test(f.name)) e.name = B.err.name[lang]
  if (!f.date) e.date = B.err.date[lang]
  else if (isPast(f.date)) e.date = B.err.past[lang]
  else if (HOURS[weekdayOf(f.date)].length === 0) e.date = B.err.closed[lang]
  // l'orario deve esistere davvero per quel giorno (e non essere già passato)
  if (!f.time || !bookingSlots(f.date || '0000-00-00').some((s) => s.times.includes(f.time))) e.time = B.err.time[lang]
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = B.err.email[lang]
  const digits = f.phone.replace(/\D/g, '')
  if (digits.length < 8 || digits.length > 15 || /[^\d\s+().-]/.test(f.phone)) e.phone = B.err.phone[lang]
  return e
}

/** Il messaggio per il ristorante è sempre in italiano; se il cliente usa il sito in inglese lo segnala. */
function buildMessage(f: Form, lang: Lang) {
  const lines = [
    'Buongiorno Da Mario! Vorrei prenotare un tavolo.',
    '',
    `*Nome:* ${f.name.trim()}`,
    `*Giorno:* ${longDate(f.date, 'it')}`,
    `*Orario:* ${f.time}`,
    `*Persone:* ${f.people}`,
    `*Email:* ${f.email.trim()}`,
    `*Telefono:* ${f.phone.trim()}`,
  ]
  if (f.notes.trim()) lines.push(`*Note:* ${f.notes.trim()}`)
  if (lang === 'en') lines.push('*Lingua:* inglese (English speaker)')
  lines.push('', 'Resto in attesa della vostra conferma. Grazie!')
  return lines.join('\n')
}

export function BookingDialog({ open, onClose }: Props) {
  const { t, lang } = useI18n()
  const reduce = useReducedMotion()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  const [form, setForm] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [sentUrl, setSentUrl] = useState<string | null>(null)
  const [showOtherDate, setShowOtherDate] = useState(false)

  const days = useMemo(() => (open ? nextDays(14, lang) : []), [open, lang])
  const slots = useMemo(() => (form.date ? bookingSlots(form.date) : []), [form.date])
  const todayISO = days[0]?.iso ?? ''

  // blocca lo scroll della pagina, chiude con Esc, tiene il focus nel pannello, poi lo riporta dov'era
  useEffect(() => {
    if (!open) return
    lastFocused.current = document.activeElement as HTMLElement
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])',
        )
        if (!f.length) return
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
    // su smartphone non apriamo la tastiera da soli: il focus va sul pannello
    const fine = window.matchMedia('(pointer: fine)').matches
    const timer = window.setTimeout(() => (fine ? firstFieldRef.current : panelRef.current)?.focus({ preventScroll: true }), 350)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
      html.style.overflow = prevOverflow
      lastFocused.current?.focus?.({ preventScroll: true })
    }
  }, [open, onClose])

  // cambiando lingua gli errori già mostrati si traducono
  useEffect(() => {
    setErrors((prev) => {
      if (!Object.keys(prev).length) return prev
      const all = validate(form, lang)
      const next: Errors = {}
      for (const k of Object.keys(prev) as (keyof Form)[]) if (prev[k]) next[k] = all[k]
      return next
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => {
      const next = { ...f, [key]: value }
      // se cambia il giorno, l'orario scelto potrebbe non esistere più
      if (key === 'date' && f.time && !bookingSlots(value as string).some((s) => s.times.includes(f.time))) next.time = ''
      return next
    })
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(form, lang)
    setErrors(errs)
    const firstError = (['name', 'date', 'time', 'email', 'phone'] as const).find((k) => errs[k])
    if (firstError) {
      const box = panelRef.current?.querySelector<HTMLElement>(`[data-field="${firstError}"]`)
      box?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
      box?.querySelector<HTMLElement>('input:not([disabled]), button:not([disabled])')?.focus({ preventScroll: true })
      return
    }
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(buildMessage(form, lang))}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSentUrl(url)
  }

  const resetAndClose = () => {
    onClose()
    window.setTimeout(() => {
      if (sentUrl) {
        setForm(EMPTY)
        setSentUrl(null)
        setShowOtherDate(false)
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
            aria-label={t(B.close)}
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-ink/80 backdrop-blur-md"
            onClick={resetAndClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative grid h-[92dvh] w-full max-w-[1060px] grid-rows-[minmax(0,1fr)] overflow-hidden rounded-t-[26px] border border-line bg-coal shadow-[0_40px_120px_-30px_rgb(0_0_0/0.85)] outline-none focus-visible:ring-2 focus-visible:ring-ember/60 md:h-[min(88dvh,860px)] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:rounded-[26px]"
            initial={reduce ? { opacity: 0 } : { y: '100%', opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: '100%', opacity: 0.6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          >
            {/* Colonna foto (solo desktop): la porta sotto la tenda */}
            <div className="relative hidden overflow-hidden md:block">
              <picture>
                <source type="image/avif" srcSet="./img/valerio-640.avif" />
                <img
                  src="./img/valerio-640.webp"
                  alt=""
                  width={640}
                  height={759}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-[30%_30%]"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="font-display text-[2rem] leading-[1.05] font-medium text-balance text-bone">{t(B.sideTitle)}</p>
                <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-bone/80">{t(B.sideText)}</p>
              </div>
            </div>

            {/* Colonna modulo */}
            <div className="flex min-h-0 min-w-0 flex-col">
              <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 md:px-9">
                <div>
                  <h2 id={titleId} className="font-display text-[2rem] leading-none font-medium">
                    {t(B.title)}
                  </h2>
                  <p className="mt-1.5 text-sm text-mute">{t(B.sub)}</p>
                </div>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-btn)] border border-line text-bone transition-colors hover:border-mute hover:bg-smoke"
                  aria-label={t(B.close)}
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
                      <span className="grid size-14 place-items-center rounded-[var(--radius-btn)] bg-whatsapp/15 text-whatsapp">
                        <WhatsappLogo size={30} weight="fill" />
                      </span>
                      <h3 className="mt-6 font-display text-[2.2rem] leading-[1.05] font-medium text-balance">{t(B.sentTitle)}</h3>
                      <p className="mt-4 max-w-[46ch] leading-relaxed text-mute">{t(B.sentText)}</p>
                      <ul className="mt-6 w-full space-y-2.5 rounded-[var(--radius-field)] border border-line bg-ink/60 p-5 text-sm">
                        <li className="flex justify-between gap-4">
                          <span className="text-mute">{t(B.day)}</span>
                          <span className="text-right">{longDate(form.date, lang)}</span>
                        </li>
                        <li className="flex justify-between gap-4">
                          <span className="text-mute">{t(B.time)}</span>
                          <span>{form.time}</span>
                        </li>
                        <li className="flex justify-between gap-4">
                          <span className="text-mute">{t(B.people)}</span>
                          <span>{form.people}</span>
                        </li>
                      </ul>
                      <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
                        <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                          <ArrowSquareOut size={18} weight="bold" />
                          {t(B.reopen)}
                        </a>
                        <button type="button" onClick={() => setSentUrl(null)} className="btn-ghost">
                          <ArrowLeft size={18} weight="bold" />
                          {t(B.edit)}
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
                          {t(B.name)}
                        </label>
                        <input
                          ref={firstFieldRef}
                          id="b-name"
                          name="name"
                          className="field"
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => set('name', e.target.value)}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'b-name-err' : undefined}
                          placeholder={t(B.namePh)}
                          maxLength={80}
                        />
                        <FieldError id="b-name-err" msg={errors.name} />
                      </div>

                      {/* Giorno */}
                      <fieldset className="flex flex-col gap-2" data-field="date">
                        <legend className="mb-2 text-sm font-medium">{t(B.day)}</legend>
                        <div className="no-scrollbar relative -mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-1 md:-mx-9 md:px-9" role="radiogroup" aria-label={t(B.nextDays)}>
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
                                title={d.closed ? t(B.closedTitle) : undefined}
                                className={`flex w-[70px] shrink-0 snap-start flex-col items-center rounded-[14px] border px-2 py-3 transition-[background-color,border-color,transform] duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-35 ${
                                  active ? 'border-fill bg-fill text-on-fill' : 'border-line text-bone hover:border-mute disabled:hover:border-line'
                                }`}
                              >
                                <span className={`text-[11px] font-semibold uppercase ${active ? 'text-on-fill/80' : 'text-mute'}`}>{d.dayShort}</span>
                                <span className="font-display text-[1.7rem] leading-tight font-semibold">{d.dayNum}</span>
                                <span className={`text-[11px] ${active ? 'text-on-fill/80' : 'text-mute'}`}>{d.closed ? t(B.closedDay) : d.month}</span>
                              </button>
                            )
                          })}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          {!showOtherDate ? (
                            <button
                              type="button"
                              onClick={() => setShowOtherDate(true)}
                              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ember underline-offset-4 hover:underline"
                            >
                              <CalendarBlank size={18} />
                              {t(B.otherDate)}
                            </button>
                          ) : (
                            <div className="flex w-full flex-col gap-2 sm:w-auto">
                              <label htmlFor="b-date" className="text-sm text-mute">
                                {t(B.otherDateLabel)}
                              </label>
                              <input
                                id="b-date"
                                name="date"
                                type="date"
                                className="field sm:w-60"
                                min={todayISO}
                                value={selectedDayIsInStrip ? '' : form.date}
                                onChange={(e) => set('date', e.target.value)}
                              />
                            </div>
                          )}
                          {form.date && !selectedDayIsInStrip && !errors.date && <span className="text-sm text-bone">{longDate(form.date, lang)}</span>}
                        </div>
                        <FieldError msg={errors.date} />
                      </fieldset>

                      {/* Orario */}
                      <fieldset className="flex flex-col gap-2" data-field="time">
                        <legend className="mb-2 text-sm font-medium">{t(B.time)}</legend>
                        {!form.date || isPast(form.date) || HOURS[weekdayOf(form.date)].length === 0 ? (
                          <p className="rounded-[var(--radius-field)] border border-dashed border-line px-4 py-4 text-sm text-mute">{t(B.pickDayFirst)}</p>
                        ) : noSlotsLeft ? (
                          <p className="rounded-[var(--radius-field)] border border-dashed border-line px-4 py-4 text-sm text-mute">
                            {t(B.noSlots)}{' '}
                            <a href={SITE.phoneHref} className="text-ember underline underline-offset-4">
                              {SITE.phoneDisplay}
                            </a>
                            .
                          </p>
                        ) : (
                          <div className="flex flex-col gap-4">
                            {slots.map(
                              (s) =>
                                s.times.length > 0 && (
                                  <div key={s.meal}>
                                    <p className="mb-2 text-xs font-medium text-mute">{t(B[s.meal])}</p>
                                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t(B[s.meal])}>
                                      {s.times.map((tm) => (
                                        <button key={tm} type="button" role="radio" aria-checked={form.time === tm} onClick={() => set('time', tm)} className="chip tabular-nums">
                                          {tm}
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
                          {t(B.people)}
                        </span>
                        <div className="flex items-center gap-4">
                          <div className="inline-flex items-center rounded-[var(--radius-btn)] border border-line bg-ink p-1" role="group" aria-labelledby="b-people-label">
                            <button
                              type="button"
                              className="grid size-11 place-items-center rounded-[var(--radius-btn)] transition-colors hover:bg-smoke disabled:opacity-30"
                              onClick={() => set('people', Math.max(1, form.people - 1))}
                              disabled={form.people <= 1}
                              aria-label={t(B.less)}
                            >
                              <Minus size={18} weight="bold" />
                            </button>
                            <output aria-live="polite" className="w-12 text-center font-display text-[1.7rem] font-semibold tabular-nums">
                              {form.people}
                            </output>
                            <button
                              type="button"
                              className="grid size-11 place-items-center rounded-[var(--radius-btn)] transition-colors hover:bg-smoke disabled:opacity-30"
                              onClick={() => set('people', Math.min(MAX_PEOPLE, form.people + 1))}
                              disabled={form.people >= MAX_PEOPLE}
                              aria-label={t(B.more)}
                            >
                              <Plus size={18} weight="bold" />
                            </button>
                          </div>
                          <span className="text-sm text-mute">
                            {form.people >= 10 ? t(B.bigGroup) : form.people === 1 ? t(B.person) : t(B.persons)}
                          </span>
                        </div>
                      </div>

                      {/* Email e telefono */}
                      <div className="grid gap-7 sm:grid-cols-2 sm:gap-4">
                        <div className="flex flex-col gap-2" data-field="email">
                          <label htmlFor="b-email" className="text-sm font-medium">
                            {t(B.email)}
                          </label>
                          <input
                            id="b-email"
                            name="email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            className="field"
                            value={form.email}
                            onChange={(e) => set('email', e.target.value)}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'b-email-err' : undefined}
                            spellCheck={false}
                            placeholder={t(B.emailPh)}
                            maxLength={120}
                          />
                          <FieldError id="b-email-err" msg={errors.email} />
                        </div>
                        <div className="flex flex-col gap-2" data-field="phone">
                          <label htmlFor="b-phone" className="text-sm font-medium">
                            {t(B.phone)}
                          </label>
                          <input
                            id="b-phone"
                            name="tel"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            className="field"
                            value={form.phone}
                            onChange={(e) => set('phone', e.target.value)}
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? 'b-phone-err' : undefined}
                            placeholder={t(B.phonePh)}
                            maxLength={24}
                          />
                          <FieldError id="b-phone-err" msg={errors.phone} />
                        </div>
                      </div>

                      {/* Note */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="b-notes" className="text-sm font-medium">
                          {t(B.notes)} <span className="font-normal text-mute">{t(B.optional)}</span>
                        </label>
                        <textarea
                          id="b-notes"
                          name="notes"
                          rows={2}
                          className="field resize-none"
                          value={form.notes}
                          onChange={(e) => set('notes', e.target.value)}
                          placeholder={t(B.notesPh)}
                          maxLength={400}
                        />
                      </div>

                      <div className="flex flex-col gap-3 pt-1">
                        <button type="submit" className="btn-primary w-full !py-[18px]">
                          <WhatsappLogo size={20} weight="fill" />
                          {t(B.submit)}
                        </button>
                        <p className="flex items-start gap-2 text-xs leading-relaxed text-mute">
                          <CheckCircle size={16} className="mt-px shrink-0" />
                          {t(B.disclaimer)}
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
