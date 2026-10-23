// La splash si vede solo alla prima apertura della sessione: chi cambia pagina o ricarica
// non aspetta. Calcolato una volta, così l'hero sa quanto ritardare la sua comparsa.
export const SPLASH = (() => {
  try {
    return !sessionStorage.getItem("picciolo-splash");
  } catch {
    return true;
  }
})();

// secondi dopo cui la pagina è scoperta (fine dell'uscita della splash)
export const RITARDO_INGRESSO = SPLASH ? 2.1 : 0;
