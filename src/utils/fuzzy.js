// Vanilla fuzzy scorer — subsequence match with contiguity + word-boundary bonuses.
// ponytail: tuned for ~101 entries; swap for Fuse.js only if dataset grows past ~1k.
export function fuzzyScore(query, target) {
  const q = query.toLowerCase()
  const t = target.toLowerCase()
  if (!q) return 0.1 // empty query: show list, ranked alphabetically-ish by caller
  if (t === q) return 1
  if (t.startsWith(q)) return 0.95
  if (t.includes(q)) return 0.9

  // Subsequence walk with scoring
  let score = 0
  let ti = 0
  let prev = -2
  for (let qi = 0; qi < q.length; qi++) {
    const ch = q[qi]
    let found = -1
    // Prefer word-boundary positions at each step
    for (let k = ti; k < t.length; k++) {
      if (t[k] === ch) { found = k; break }
    }
    if (found === -1) return 0
    score += 1
    if (found === prev + 1) score += 1.5 // contiguity
    else if (found > 0 && /[\s\-_/]/.test(t[found - 1])) score += 1 // word boundary
    if (found === 0) score += 1
    prev = found
    ti = found + 1
  }
  return Math.min(score / (q.length * 3), 0.85)
}

export function fuzzyFilter(items, query, { keys, limit = 8, threshold = 0.1 } = {}) {
  const q = query.trim()
  if (!q) {
    return items
      .slice(0, limit)
      .map((item) => ({ item, score: 0.1, matches: [] }))
  }
  const results = []
  for (const item of items) {
    let best = 0
    let bestKey = ''
    for (const key of keys) {
      const value = String(item[key] ?? '')
      const s = fuzzyScore(q, value)
      if (s > best) { best = s; bestKey = key }
    }
    if (best >= threshold) results.push({ item, score: best, matches: [bestKey] })
  }
  results.sort((a, b) => b.score - a.score)
  return results.slice(0, limit)
}
