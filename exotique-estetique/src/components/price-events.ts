export const PRICE_EVENT = 'listino:categoria'

/* Permette ad altre sezioni di aprire il listino su una categoria. */
export function showInPriceList(id: string) {
  window.dispatchEvent(new CustomEvent(PRICE_EVENT, { detail: id }))
}
