/*
  Orari, avviso e lavagna del sito, presi da site.ts (si aggiornano modificando quel file).
  Nessun collegamento esterno: il sito non scarica dati da Google né salva nulla nel browser.
*/
import { AVVISO, HOURS, LAVAGNA, type Slot, type VoceLavagna } from '../data/site'

export type LiveData = {
  hours: Record<number, Slot[]>
  notice: string
  lavagna: VoceLavagna[]
}

const data: LiveData = { hours: HOURS, notice: AVVISO, lavagna: LAVAGNA }

/** I dati del sito (stessa forma di quando arrivavano dal foglio Google, così i componenti non cambiano). */
export const useLiveData = () => data

/** Orari, per le funzioni che non sono componenti (stato aperto/chiuso, orari prenotabili). */
export const getHours = () => data.hours

/** Voci della lavagna (servono anche per bloccare ferie e chiusure nelle prenotazioni). */
export const getLavagna = () => data.lavagna
