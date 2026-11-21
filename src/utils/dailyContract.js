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

/** Normalise whatever is in storage into { lastCompleted, streak, total, bestStreak }. */
export function parseContractState(raw) {
  try {
    const parsed = JSON.parse(raw || '{}')
    const lastCompleted = typeof parsed.lastCompleted === 'string' ? parsed.lastCompleted : null
    const streak = Number.isFinite(parsed.streak) && parsed.streak > 0 ? Math.floor(parsed.streak) : 0
    // `total` was added in iteration 21; older saves with a completion count as at least 1.
    const total = Number.isFinite(parsed.total) && parsed.total > 0
      ? Math.floor(parsed.total)
      : (lastCompleted ? Math.max(1, streak) : 0)
    const bestStreak = Number.isFinite(parsed.bestStreak) && parsed.bestStreak > streak
      ? Math.floor(parsed.bestStreak)
      : streak
    return { lastCompleted, streak, total, bestStreak }
  } catch {
    return { lastCompleted: null, streak: 0, total: 0, bestStreak: 0 }
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
  return {
    lastCompleted: dayKey,
    streak,
    total: (state.total || 0) + 1,
    bestStreak: Math.max(state.bestStreak || 0, streak),
  }
}

// ── Weekly Heist (iteration 22) ──
export const WEEKLY_HEIST_BONUS = 25000
export const WEEKLY_HEIST_STORAGE_KEY = 'gtaWeeklyHeist'
export const HEIST_MIN_SEQUENCE = 10

/** Local week key: YYYY-MM-DD of that week's Monday. */
export function localWeekKey(date = new Date()) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const offset = (d.getDay() + 6) % 7 // Mon=0 … Sun=6
  d.setDate(d.getDate() - offset)
  return localDayKey(d)
}

/** Rare = long PS sequence and typable on keyboard (has a PC code). */
export function isHeistEligible(cheat) {
  return (cheat?.psSequence?.length || 0) >= HEIST_MIN_SEQUENCE && Array.isArray(cheat?.pcSequence) && cheat.pcSequence.length > 0
}

/** Pick this week's heist cheat among rare cheats. Same week key → same cheat. */
export function pickWeeklyHeist(cheats, weekKey) {
  const pool = Array.isArray(cheats) ? cheats.filter(isHeistEligible) : []
  if (pool.length === 0) return null
  return pool[hashString(`sa-heist-${weekKey}`) % pool.length]
}

/** Normalise stored heist state into { lastCompletedWeek, total }. */
export function parseHeistState(raw) {
  try {
    const parsed = JSON.parse(raw || '{}')
    return {
      lastCompletedWeek: typeof parsed.lastCompletedWeek === 'string' ? parsed.lastCompletedWeek : null,
      total: Number.isFinite(parsed.total) && parsed.total > 0 ? Math.floor(parsed.total) : 0,
    }
  } catch {
    return { lastCompletedWeek: null, total: 0 }
  }
}

/** State after completing this week's heist. Idempotent within the same week. */
export function completeHeist(state, weekKey) {
  if (state.lastCompletedWeek === weekKey) return state
  return { lastCompletedWeek: weekKey, total: state.total + 1 }
}
