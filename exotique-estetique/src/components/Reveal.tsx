import { motion } from 'motion/react'
import { Fragment, type ReactNode } from 'react'
import { CURTAIN, EASE, cn } from '../lib'

/* Comparsa allo scroll: leggero sollevamento e dissolvenza, una sola volta. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'p' | 'section'
}) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/*
 * Titolo che sale riga per riga da una maschera, come un testo che emerge
 * da dietro la cornice. L'osservazione avviene sul contenitore (non mascherato),
 * le righe seguono tramite varianti.
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  animateOnMount = false,
  play = true,
}: {
  lines: ReactNode[]
  className?: string
  /** Classi aggiuntive per ogni riga (es. righe affiancate su smartphone). */
  lineClassName?: string
  delay?: number
  animateOnMount?: boolean
  /** Con animateOnMount: parte solo quando diventa true. */
  play?: boolean
}) {
  const line = {
    hidden: { y: '110%' },
    show: (i: number) => ({ y: '0%', transition: { duration: 1.1, delay: delay + i * 0.09, ease: EASE } }),
  }
  return (
    <motion.span
      className={cn('block', className)}
      initial="hidden"
      {...(animateOnMount ? { animate: play ? 'show' : 'hidden' } : { whileInView: 'show', viewport: { once: true, amount: 0.4 } })}
    >
      {lines.map((l, i) => (
        <Fragment key={i}>
          <span className={cn('block overflow-hidden pt-[0.22em] -mt-[0.22em] pb-[0.2em] -mb-[0.2em]', lineClassName)}>
            <motion.span className="block will-change-transform" variants={line} custom={i}>
              {l}
            </motion.span>
          </span>
          {/* Spazio tra le righe nel testo: Google e i lettori di schermo leggono «Bellezza, su misura» */}
          {i < lines.length - 1 && ' '}
        </Fragment>
      ))}
    </motion.span>
  )
}

/* Cornice che si apre dall'alto verso il basso, come una tenda. */
export function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <motion.div
        className={className}
        variants={{
          hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.4, ease: CURTAIN } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
