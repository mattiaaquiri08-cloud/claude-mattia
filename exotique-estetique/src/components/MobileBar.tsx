import { AnimatePresence, motion } from 'motion/react'
import { Phone } from '@phosphor-icons/react'
import { business } from '../content'
import { EASE } from '../lib'
import { useBooking } from './booking-context'
import { Button } from './Button'

/* Barra di prenotazione sempre a portata di pollice, solo su smartphone. */
export function MobileBar({ visible }: { visible: boolean }) {
  const { open, isOpen } = useBooking()
  return (
    <AnimatePresence>
      {visible && !isOpen && (
        <motion.div
          key="bar"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/92 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => open()}>
              Prenota ora
            </Button>
            <a
              href={business.mobile.href}
              aria-label={`Chiama ${business.mobile.display}`}
              className="grid size-12 shrink-0 place-items-center border border-ink/35 text-ink"
            >
              <Phone size={20} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
