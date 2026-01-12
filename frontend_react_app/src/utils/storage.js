/**
 * Small localStorage wrapper with basic error handling.
 */

const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

// PUBLIC_INTERFACE
export function loadJson(key, fallbackValue) {
  /** Load JSON value from localStorage by key; return fallbackValue on failure. */
  if (!isBrowser) return fallbackValue;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallbackValue;
    return JSON.parse(raw);
  } catch (_err) {
    return fallbackValue;
  }
}

// PUBLIC_INTERFACE
export function saveJson(key, value) {
  /** Save JSON value to localStorage by key; returns {ok, error}. */
  if (!isBrowser) return { ok: false, error: "localStorage is not available in this environment." };

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return { ok: true, error: null };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to save to localStorage." };
  }
}
