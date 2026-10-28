import { useEffect, useRef, type ReactNode } from 'react'
import { X } from '@phosphor-icons/react'
import { SITE } from '../data/site'

/*
  Informativa privacy e cookie (art. 13 GDPR), in una finestra che si apre con il link "#privacy"
  (footer e modulo di prenotazione). Il sito non usa cookie di profilazione: la mappa di Google
  si carica solo su richiesta, quindi non serve il banner dei cookie.
*/

const AGGIORNATA = '27 ottobre 2026'

function Voce({ titolo, children }: { titolo: string; children: ReactNode }) {
  return (
    <section className="mt-7">
      <h3 className="font-pennello text-lg tracking-[0.03em] text-ochre-deep uppercase">{titolo}</h3>
      <div className="mt-2 space-y-2 leading-relaxed text-ink/90">{children}</div>
    </section>
  )
}

export function PrivacyDialog() {
  const ref = useRef<HTMLDialogElement>(null)

  // si apre quando l'indirizzo finisce con #privacy, si chiude togliendolo
  useEffect(() => {
    const sync = () => {
      const d = ref.current
      if (!d) return
      if (location.hash === '#privacy' && !d.open) d.showModal()
      if (location.hash !== '#privacy' && d.open) d.close()
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const togliHash = () => {
    if (location.hash === '#privacy') history.replaceState(null, '', location.pathname + location.search)
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="privacy-t"
      onClose={togliHash}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className="m-auto max-h-[88dvh] w-[min(92vw,720px)] overflow-hidden rounded-[24px] border border-line bg-paper p-0 text-ink shadow-[0_40px_120px_-30px_rgb(23_20_21/0.45)] backdrop:bg-ink/55 backdrop:backdrop-blur-sm"
    >
      <div className="max-h-[88dvh] overflow-y-auto px-6 py-8 md:px-10 md:py-10">
        <div className="flex items-start justify-between gap-6">
          <h2 id="privacy-t" className="font-display text-3xl leading-tight font-semibold md:text-4xl">
            Privacy e cookie
          </h2>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Chiudi l'informativa"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/20 hover:border-ink/50"
          >
            <X size={20} weight="bold" />
          </button>
        </div>
        <p className="mt-3 text-sm text-mute">Ultimo aggiornamento: {AGGIORNATA}</p>

        <Voce titolo="Chi tratta i dati">
          <p>
            {SITE.ragioneSociale}, sede legale {SITE.sedeLegale}. P.IVA {SITE.piva}, REA {SITE.rea}. PEC {SITE.pec}.
          </p>
        </Voce>

        <Voce titolo="Prenotazioni">
          <p>
            Il modulo di prenotazione non invia e non salva dati sul sito: prepara soltanto un messaggio, che parte da
            WhatsApp quando premi Invia. Nome, persone, giorno, orario e note ci servono solo per gestire la
            prenotazione; li conserviamo nella chat per il tempo necessario e non li usiamo per pubblicità.
          </p>
          <p>WhatsApp è un servizio di Meta, che tratta i messaggi secondo la propria informativa.</p>
        </Voce>

        <Voce titolo="Telefono e messaggi">
          <p>Se ci chiami o ci scrivi, usiamo il tuo numero solo per risponderti.</p>
        </Voce>

        <Voce titolo="Cookie">
          <p>
            Il sito non usa cookie di profilazione né statistiche. Salva nel tuo browser solo una copia degli orari e
            della lavagna, per mostrarli più in fretta: è un dato tecnico, non personale.
          </p>
        </Voce>

        <Voce titolo="Servizi esterni">
          <p>
            Orari e lavagna arrivano da un foglio Google: il browser li scarica da Google, che riceve l’indirizzo IP
            come per qualsiasi sito. La mappa di Google si carica solo se premi “Mostra la mappa”: da quel momento
            Google può usare i propri cookie.
          </p>
          <p>
            Il sito è ospitato su Cloudflare, che registra dati tecnici (come l’indirizzo IP) per sicurezza e
            funzionamento. I link a Instagram, WhatsApp, Google Maps e al menù su Linktree portano a siti esterni, con le
            loro regole.
          </p>
        </Voce>

        <Voce titolo="I tuoi diritti">
          <p>
            Puoi chiedere di vedere, correggere o cancellare i tuoi dati, o opporti al loro uso, scrivendo alla PEC{' '}
            {SITE.pec} o chiamando il {SITE.phoneDisplay}. Puoi anche rivolgerti al Garante per la protezione dei dati
            personali (garanteprivacy.it).
          </p>
        </Voce>
      </div>
    </dialog>
  )
}
