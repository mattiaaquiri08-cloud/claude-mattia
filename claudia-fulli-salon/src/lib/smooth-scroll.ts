import Lenis from 'lenis'

let lenis: Lenis | null = null

/** Avvia lo scroll morbido, salvo quando l'utente preferisce ridurre il movimento. */
export function startSmoothScroll() {
  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) })
  let frame = 0
  const raf = (time: number) => {
    lenis?.raf(time)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

/** Scorre fino a un'ancora (#id) tenendo conto della barra di navigazione. */
export function scrollToHash(hash: string) {
  const target = hash === '#top' ? 0 : document.querySelector<HTMLElement>(hash)
  if (target === null) return
  const offset = -72
  if (lenis) {
    lenis.scrollTo(target === 0 ? 0 : target, { offset: target === 0 ? 0 : offset })
  } else if (target === 0) {
    window.scrollTo({ top: 0 })
  } else {
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset })
  }
  if (target !== 0) {
    // Porta anche il focus della tastiera sulla sezione raggiunta.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
    history.replaceState(null, '', hash)
  }
}

/** Scorre a una posizione assoluta della pagina. */
export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y)
  else window.scrollTo({ top: y, behavior: 'smooth' })
}

/** Gestore per i link interni: usa lo scroll morbido invece del salto. */
export function handleAnchorClick(event: React.MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute('href')
  if (!href?.startsWith('#')) return
  event.preventDefault()
  scrollToHash(href)
}
