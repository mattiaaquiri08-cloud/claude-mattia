// La splash si vede solo alla prima apertura della sessione: chi entra dopo
// non aspetta. Calcolato una volta, così l'hero sa quanto ritardare la sua comparsa.
export const SPLASH = (() => {
  try {
    return !sessionStorage.getItem("100c-splash");
  } catch {
    return true;
  }
})();

// secondi dopo cui la pagina è scoperta (fine della serranda)
export const RITARDO_INGRESSO = SPLASH ? 2.75 : 0;
