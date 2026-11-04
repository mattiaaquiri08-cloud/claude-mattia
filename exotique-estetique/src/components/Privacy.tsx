import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from '@phosphor-icons/react'
import { business, legal } from '../content'
import { EASE } from '../lib'

/*
 * Informativa privacy e cookie (GDPR art. 13, Linee guida del Garante sui cookie
 * del 10 giugno 2021). Si apre con il link #privacy, anche dalle bozze offline.
 * Il sito non usa cookie di profilazione né statistiche: per questo non c'è banner.
 */
export function Privacy({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return <AnimatePresence>{isOpen && <Panel key="privacy" onClose={onClose} />}</AnimatePresence>
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-6">
      <h3 className="font-display text-[1.5rem] leading-tight">{title}</h3>
      <div className="mt-3 flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-ink-soft [&_strong]:font-medium [&_strong]:text-ink">
        {children}
      </div>
    </section>
  )
}

function Panel({ onClose }: { onClose: () => void }) {
  const titleId = useId()
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null
    panel.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus?.()
    }
  }, [onClose])

  const holder = legal.holder ? `${legal.holder}, titolare di ${business.name}` : business.name

  return (
    <motion.div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      data-lenis-prevent
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-paper text-ink outline-none"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <p className="text-[0.75rem] font-medium uppercase tracking-[0.22em] text-ink-soft">{business.name}</p>
          <button type="button" onClick={onClose} aria-label="Chiudi l'informativa" className="-mr-2 grid size-11 place-items-center">
            <X size={22} weight="light" />
          </button>
        </div>
      </div>

      <article className="wrap max-w-3xl pb-24 pt-12 md:pt-16">
        <h2 id={titleId} className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-[1.02] tracking-[-0.02em]">
          Privacy e <em>cookie</em>
        </h2>
        <p className="mt-4 text-[0.875rem] text-ink-soft">Ultimo aggiornamento: {legal.updated}</p>
        <p className="mt-8 text-[1.0625rem] leading-relaxed">
          Questa pagina spiega come vengono trattati i dati di chi visita il sito e di chi chiede un appuntamento,
          secondo il Regolamento europeo 2016/679 (GDPR) e il Codice privacy (d.lgs. 196/2003).
        </p>

        <div className="mt-12 flex flex-col gap-10">
          <Section title="Chi è il titolare">
            <p>
              <strong>{holder}</strong>
              <br />
              {business.street}, {business.postalCode} {business.city}
              {legal.vatNumber && (
                <>
                  <br />
                  P. IVA {legal.vatNumber}
                </>
              )}
              <br />
              Email: <a className="underline underline-offset-4" href={`mailto:${business.email}`}>{business.email}</a>
              {legal.pec && (
                <>
                  <br />
                  PEC: {legal.pec}
                </>
              )}
              <br />
              Telefono: <a className="underline underline-offset-4" href={business.mobile.href}>{business.mobile.display}</a>
            </p>
          </Section>

          <Section title="Quali dati trattiamo">
            <p>
              <strong>Navigazione.</strong> Per mostrare il sito, il servizio di hosting (Cloudflare) riceve i dati tecnici
              che ogni browser invia, come indirizzo IP, tipo di dispositivo e pagina richiesta. Servono solo a far
              funzionare il sito e a proteggerlo da attacchi; non li usiamo per profilarti.
            </p>
            <p>
              <strong>Richieste di appuntamento.</strong> Il modulo «Prenota» non salva nulla su questo sito: prepara un
              messaggio con nome, trattamento, giorno, orario e note, che decidi tu se inviare su WhatsApp o via email.
              In quel momento riceviamo anche il tuo numero di telefono o il tuo indirizzo email.
            </p>
            <p>
              <strong>Telefonate, email e messaggi.</strong> Se ci contatti, trattiamo i dati che ci comunichi per
              risponderti.
            </p>
            <p>
              Ti chiediamo di non scrivere nei messaggi informazioni sulla salute. Quelle necessarie per eseguire un
              trattamento in sicurezza (per esempio prima del laser) vengono raccolte di persona in centro, con
              un&apos;informativa dedicata.
            </p>
          </Section>

          <Section title="Perché e su quale base">
            <p>
              Per rispondere alle tue richieste e gestire gli appuntamenti (art. 6.1.b GDPR, misure precontrattuali e
              contrattuali richieste da te); per adempiere agli obblighi di legge, per esempio fiscali (art. 6.1.c); per
              la sicurezza del sito (art. 6.1.f, legittimo interesse).
            </p>
            <p>Non inviamo pubblicità o newsletter senza il tuo consenso e non vendiamo né cediamo i tuoi dati a nessuno.</p>
          </Section>

          <Section title="Per quanto tempo">
            <p>
              I messaggi di prenotazione sono conservati per il tempo necessario a gestire la richiesta e il rapporto con
              te; i documenti fiscali per il tempo previsto dalla legge (di norma 10 anni). I dati tecnici di navigazione
              sono conservati dal servizio di hosting per brevi periodi, secondo le sue regole.
            </p>
          </Section>

          <Section title="A chi arrivano i dati">
            <p>
              Solo ai fornitori che servono a farli arrivare: <strong>Cloudflare</strong> per l&apos;hosting del sito,
              <strong> WhatsApp (Meta)</strong> o il <strong>servizio email</strong> che scegli tu per scriverci. Alcuni
              hanno sede fuori dall&apos;Unione europea e trasferiscono i dati con le garanzie previste dal GDPR
              (clausole contrattuali standard o EU-US Data Privacy Framework).
            </p>
            <p>
              I link a Google Maps, Facebook, Instagram e WhatsApp portano ai loro siti: lì valgono le loro informative.
              Questo sito non incorpora i loro contenuti (mappe, pulsanti «mi piace», video) e quindi non attiva i loro
              cookie.
            </p>
          </Section>

          <Section title="Cookie e archiviazione locale">
            <p>
              Il sito <strong>non usa cookie di profilazione, né cookie pubblicitari, né strumenti di statistica</strong>{' '}
              (come Google Analytics), né cookie di terze parti. I caratteri e le immagini sono ospitati sul sito
              stesso, senza collegamenti a server esterni.
            </p>
            <p>
              Usa solo una voce tecnica nella memoria del browser (<code className="text-[0.875em]">ee-splash-vista</code>,
              archiviazione locale) per non ripetere l&apos;animazione iniziale a ogni visita. Non contiene dati personali
              e non serve a riconoscerti. Il servizio di hosting può usare cookie tecnici di sicurezza per bloccare il
              traffico automatico.
            </p>
            <p>
              Gli strumenti tecnici non richiedono consenso (art. 122 del Codice privacy e Linee guida del Garante del 10
              giugno 2021): per questo il sito non mostra un banner. Puoi comunque cancellarli in qualsiasi momento
              dalle impostazioni del browser.
            </p>
          </Section>

          <Section title="Foto e recensioni">
            <p>
              Le foto dei lavori ritraggono clienti del centro, che hanno dato il loro consenso, senza mostrarne il volto.
              Le recensioni sono brevi estratti di recensioni pubbliche lasciate su Google, con il nome abbreviato.
              Se ti riconosci e vuoi che una foto o una recensione venga tolta, scrivici: la rimuoviamo subito.
            </p>
          </Section>

          <Section title="I tuoi diritti">
            <p>
              Puoi chiedere in ogni momento di accedere ai tuoi dati, correggerli, cancellarli, limitarne l&apos;uso,
              opporti al trattamento o riceverli in un formato leggibile (artt. 15-22 GDPR), scrivendo a{' '}
              <a className="underline underline-offset-4" href={`mailto:${business.email}`}>{business.email}</a>. Ti
              rispondiamo entro 30 giorni.
            </p>
            <p>
              Se ritieni che i tuoi dati siano trattati in modo non corretto, puoi presentare reclamo al Garante per la
              protezione dei dati personali (
              <a className="underline underline-offset-4" href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
                garanteprivacy.it
              </a>
              ).
            </p>
          </Section>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-14 inline-flex h-12 items-center border border-ink/35 px-6 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors hover:border-ink"
        >
          Torna al sito
        </button>
      </article>
    </motion.div>
  )
}
