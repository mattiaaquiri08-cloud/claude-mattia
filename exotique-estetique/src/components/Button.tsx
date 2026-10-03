import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '../lib'

type Variant = 'lacca' | 'ink' | 'ghost-light' | 'ghost'

const base =
  'group relative inline-flex h-12 shrink-0 items-center justify-center gap-3 overflow-hidden whitespace-nowrap px-6 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-[transform,color,background-color,border-color] duration-500 ease-out-expo active:scale-[0.98] select-none'

const variants: Record<Variant, string> = {
  lacca: 'bg-lacca text-lacca-ink',
  ink: 'bg-ink text-paper',
  'ghost-light':
    'border border-white/55 text-white backdrop-blur-[2px] bg-black/10 hover:border-white',
  ghost: 'border border-ink/35 text-ink hover:border-ink',
}

/* Riempimento che sale dal basso al passaggio del mouse */
const fills: Record<Variant, string> = {
  lacca: 'bg-ink',
  ink: 'bg-lacca',
  'ghost-light': 'bg-white',
  ghost: 'bg-ink',
}
const hoverText: Record<Variant, string> = {
  lacca: 'group-hover:text-paper',
  ink: 'group-hover:text-lacca-ink',
  'ghost-light': 'group-hover:text-[#151414]',
  ghost: 'group-hover:text-paper',
}

function Inner({ variant, children }: { variant: Variant; children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0',
          fills[variant],
        )}
      />
      <span className={cn('relative flex items-center gap-3 transition-colors duration-500', hoverText[variant])}>
        {children}
      </span>
    </>
  )
}

type ButtonProps = ComponentPropsWithoutRef<'button'> & { variant?: Variant }
export function Button({ variant = 'lacca', className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], className)} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  )
}

type LinkProps = ComponentPropsWithoutRef<'a'> & { variant?: Variant }
export function ButtonLink({ variant = 'lacca', className, children, ...rest }: LinkProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </a>
  )
}
