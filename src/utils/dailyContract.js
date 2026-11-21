// Daily Contract — deterministic cheat-of-the-day mission.
// Pure helpers only; persistence lives in Home.jsx.

export const DAILY_CONTRACT_BONUS = 5000
export const DAILY_CONTRACT_STORAGE_KEY = 'gtaDailyContract'

/** Local calendar day as YYYY-MM-DD (not UTC, so the contract flips at local midnight). */
export function localDayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** FNV-1a 32-bit hash: stable across browsers, good spread for short strings. */
function hashString(str) {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/** Pick today's contract cheat. Same day key → same cheat for every visitor. */
export function pickDailyCheat(cheats, dayKey) {
  if (!Array.isArray(cheats) || cheats.length === 0) return null
  return cheats[hashString(`sa-contract-${dayKey}`) % cheats.length]
}

/** Day key for the day before `dayKey` (YYYY-MM-DD). */
export function previousDayKey(dayKey) {
  const [y, m, d] = dayKey.split('-').map(Number)
  return localDayKey(new Date(y, m - 1, d - 1))
}

/** Normalise whatever is in storage into { lastCompleted, streak }. */
export function parseContractState(raw) {
  try {
    const parsed = JSON.parse(raw || '{}')
    return {
      lastCompleted: typeof parsed.lastCompleted === 'string' ? parsed.lastCompleted : null,
      streak: Number.isFinite(parsed.streak) && parsed.streak > 0 ? Math.floor(parsed.streak) : 0,
    }
  } catch {
    return { lastCompleted: null, streak: 0 }
  }
}

/** Streak to display today: broken if neither today nor yesterday was completed. */
export function activeStreak(state, dayKey) {
  if (state.lastCompleted === dayKey || state.lastCompleted === previousDayKey(dayKey)) return state.streak
  return 0
}

/** State after completing today's contract. Idempotent within the same day. */
export function completeContract(state, dayKey) {
  if (state.lastCompleted === dayKey) return state
  const streak = state.lastCompleted === previousDayKey(dayKey) ? state.streak + 1 : 1
  return { lastCompleted: dayKey, streak }
}
