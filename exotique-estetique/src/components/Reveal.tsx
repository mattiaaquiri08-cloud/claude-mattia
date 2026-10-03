import { motion } from 'motion/react'
import type { ReactNode } from 'react'
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
  delay = 0,
  animateOnMount = false,
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
  animateOnMount?: boolean
}) {
  const line = {
    hidden: { y: '110%' },
    show: (i: number) => ({ y: '0%', transition: { duration: 1.1, delay: delay + i * 0.09, ease: EASE } }),
  }
  return (
    <motion.span
      className={cn('block', className)}
      initial="hidden"
      {...(animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.4 } })}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <motion.span className="block will-change-transform" variants={line} custom={i}>
            {l}
          </motion.span>
        </span>
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
