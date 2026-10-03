import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { Phone, WhatsappLogo, X } from '@phosphor-icons/react'
import { business, categories } from '../content'
import { EASE, cn } from '../lib'
import { Button } from './Button'

const moments = ['Mattina', 'Pomeriggio', 'Indifferente'] as const

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
  const [cats, setCats] = useState<string[]>(initialCategory ? [initialCategory] : [])
  const [moment, setMoment] = useState<(typeof moments)[number]>('Indifferente')
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState(false)
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
        const f = el.querySelectorAll<HTMLElement>('button, a[href], input, textarea')
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

  const toggle = (id: string) => setCats((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError(true)
      return
    }
    const chosen = categories.filter((c) => cats.includes(c.id)).map((c) => c.title.toLowerCase())
    const lines = [
      `Buongiorno, sono ${name.trim()}.`,
      chosen.length
        ? `Vorrei prenotare un appuntamento per: ${chosen.join(', ')}.`
        : 'Vorrei prenotare un appuntamento.',
      moment !== 'Indifferente' ? `Preferirei di ${moment.toLowerCase()}.` : '',
      note.trim() ? note.trim() : '',
      'Grazie!',
    ].filter(Boolean)
    const url = `${business.mobile.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed inset-0 z-60" role="presentation">
      <motion.div
        className="absolute inset-0 bg-[rgb(12_11_11/0.55)] backdrop-blur-[3px]"
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
            Componi la richiesta: arriva al centro su WhatsApp e ti ricontattiamo per confermare giorno e ora.
          </p>

          <fieldset>
            <legend className="mb-3 text-[0.875rem] font-medium">Cosa desideri</legend>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const on = cats.includes(c.id)
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(c.id)}
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
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-[0.875rem] font-medium">Momento della giornata</legend>
            <div className="grid grid-cols-3 border border-line">
              {moments.map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={moment === m}
                  onClick={() => setMoment(m)}
                  className={cn(
                    'relative h-11 text-[0.875rem] transition-colors duration-300',
                    moment === m ? 'text-paper' : 'text-ink hover:bg-paper-2',
                  )}
                >
                  {moment === m && (
                    <motion.span layoutId="moment-pill" className="absolute inset-0 bg-ink" transition={{ duration: 0.45, ease: EASE }} />
                  )}
                  <span className="relative">{m}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2">
            <label htmlFor={nameId} className="text-[0.875rem] font-medium">
              Il tuo nome
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
              Invia su WhatsApp
            </Button>
            <a
              href={business.mobile.href}
              className="inline-flex h-12 items-center justify-center gap-3 border border-ink/35 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors hover:border-ink"
            >
              <Phone size={18} aria-hidden />
              Oppure chiama
            </a>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
