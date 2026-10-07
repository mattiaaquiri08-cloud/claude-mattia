import type { ComponentProps, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { handleAnchorClick } from '../lib/smooth-scroll'
import { EASE, cn } from '../lib/utils'


/** La foto del salone in AVIF/WebP con le dimensioni giuste per ogni schermo. */
export function SalonPicture({
  className,
  sizes = '100vw',
  priority = false,
  alt = 'Interno di Claudia Fulli Salon: poltrone gialle e nere, postazioni in pietra chiara, specchi e pavimento nero lucido.',
  style,
}: {
  className?: string
  sizes?: string
  priority?: boolean
  alt?: string
  style?: React.CSSProperties
}) {
  const set = (ext: string) =>
    [768, 1280, 1672].map((w) => `images/salone-${w}.${ext} ${w}w`).join(', ')
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src="images/salone-1280.webp"
        width={1672}
        height={941}
        alt={alt}
        className={className}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
      />
    </picture>
  )
}

type ButtonTone = 'sun' | 'ink' | 'ghost' | 'ghost-night'

const tones: Record<ButtonTone, string> = {
  sun: 'bg-sun text-ink hover:bg-sun-deep',
  ink: 'bg-ink text-paper hover:bg-ink/85',
  ghost: 'text-ink ring-1 ring-inset ring-ink/25 hover:ring-ink',
  'ghost-night': 'text-paper ring-1 ring-inset ring-paper/30 hover:ring-paper',
}

/** Bottone-link a pillola con micro-spinta al click e icona che scorre in hover. */
export function ButtonLink({
  tone = 'sun',
  icon,
  children,
  className,
  size = 'md',
  ...props
}: ComponentProps<'a'> & { tone?: ButtonTone; icon?: ReactNode; size?: 'md' | 'lg' }) {
  const external = props.href?.startsWith('http')
  return (
    <a
      {...props}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      onClick={(event) => {
        props.onClick?.(event)
        if (props.href?.startsWith('#')) handleAnchorClick(event)
      }}
      className={cn(
        'group/btn relative inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium whitespace-nowrap',
        'transition-[background-color,box-shadow,color,transform] duration-300 ease-out-expo active:scale-[0.97]',
        size === 'lg' ? 'h-14 px-8 text-base' : 'h-12 px-6 text-[0.9375rem]',
        tones[tone],
        className,
      )}
    >
      <span>{children}</span>
      {icon && (
        <span
          aria-hidden
          className="relative -mr-1 inline-flex size-5 items-center justify-center overflow-hidden"
        >
          <span className="transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-[140%]">
            {icon}
          </span>
          <span className="absolute -translate-x-[140%] transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0">
            {icon}
          </span>
        </span>
      )}
      {external && <span className="sr-only"> (si apre in una nuova scheda)</span>}
    </a>
  )
}

/** Comparsa morbida quando l'elemento entra nello schermo. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'p' | 'h2'
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/** Titolo che sale riga per riga da una maschera. */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as = 'h2',
  id,
}: {
  id?: string
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  as?: 'h2' | 'h3' | 'p'
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  // L'osservatore sta sul titolo intero: le righe nascoste dalla maschera non risultano mai "visibili".
  return (
    <Tag
      id={id}
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={cn('block', lineClassName)}
            variants={{
              hidden: { y: '110%' },
              shown: { y: '0%', transition: { duration: 1.1, delay: delay + i * 0.09, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
