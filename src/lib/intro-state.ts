// Module-level flag — resets on every full page load/refresh,
// but persists within bfcache restores (where we want to skip the intro).
export let introDone = false;
export const markIntroDone = () => { introDone = true; };
