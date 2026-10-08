import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { CalendarCheck } from '@phosphor-icons/react'
import { useBooking } from './booking-context'
import { Magnetic } from './Magnetic'

export function FinalCta() {
  const { openBooking } = useBooking()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '12%'])

  return (
    <section ref={ref} className="relative isolate overflow-hidden px-4 py-32 md:px-8 md:py-48" aria-labelledby="cta-title">
      <motion.img
        src="./img/hero-desktop.webp"
        alt=""
        width={1672}
        height={940}
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 h-[124%] w-full object-cover"
        style={{ y, top: '-12%' }}
      />
      <div className="absolute inset-0 -z-10 bg-ink/78" />
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-ink to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink to-transparent" />

      <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-10">
        <h2
          id="cta-title"
          className="max-w-[14ch] font-display text-[clamp(3rem,8vw,7rem)] leading-[0.98] font-semibold tracking-[-0.04em]"
        >
          Ti teniamo un posto a tavola?
        </h2>
        <p className="max-w-[44ch] text-lg leading-relaxed text-cream/80">
          Scegli giorno, orario e quante persone siete. La richiesta ci arriva su WhatsApp e ti confermiamo noi.
        </p>
        <Magnetic>
          <button type="button" onClick={openBooking} className="btn-primary !px-9 !py-5">
            <CalendarCheck size={20} weight="bold" />
            Prenota un tavolo
          </button>
        </Magnetic>
      </div>
    </section>
  )
}
