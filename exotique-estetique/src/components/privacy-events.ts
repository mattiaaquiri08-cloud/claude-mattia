/* Apertura dell'informativa privacy da qualsiasi punto del sito (link «Privacy e cookie»). */
const EVENT = 'privacy:open'

export function openPrivacy() {
  if (window.location.hash !== '#privacy') history.pushState(null, '', '#privacy')
  window.dispatchEvent(new Event(EVENT))
}

export function onPrivacyOpen(fn: () => void) {
  window.addEventListener(EVENT, fn)
  return () => window.removeEventListener(EVENT, fn)
}
