// Feature flags: the project's only flag mechanism (named in CLAUDE.md).
// A flag is off unless its Vite env var is exactly "true", e.g. set
// VITE_FLAG_NEW_GAME=true for the Preview environment in Vercel.
// Add flags here; never add another flag mechanism.
export function isOn(value: string | undefined): boolean {
  return value === 'true'
}

export const flags = {
  // newGame: isOn(import.meta.env.VITE_FLAG_NEW_GAME),
} as const
