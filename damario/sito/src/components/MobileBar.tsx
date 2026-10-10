import { CalendarCheck, Phone } from '@phosphor-icons/react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { SITE } from '../data/site'
import { UI } from '../data/ui'
import { useBooking } from '../lib/booking'
import { useI18n } from '../lib/i18n'

/** Su smartphone, dopo la hero: prenotazione e telefono sempre a un tocco. */
export function MobileBar({ hidden }: { hidden: boolean }) {
  const { t } = useI18n()
  const { openBooking } = useBooking()
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > window.innerHeight * 0.75
    if (next !== show) setShow(next)
  })

  return (
    <AnimatePresence>
      {show && !hidden && (
        <motion.div
          role="region"
          aria-label={t(UI.mobileBar.label)}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 34 }}
        >
          <div className="flex gap-2">
            <button type="button" onClick={openBooking} className="btn-primary flex-1 !px-4">
              <CalendarCheck size={18} weight="bold" />
              {t(UI.cta.book)}
            </button>
            <a href={SITE.phoneHref} aria-label={`${t(UI.cta.call)} ${SITE.phoneDisplay}`} className="btn-ghost !px-5">
              <Phone size={19} weight="bold" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
