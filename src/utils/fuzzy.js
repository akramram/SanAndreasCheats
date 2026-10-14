// Vanilla fuzzy scorer — subsequence match with contiguity + word-boundary bonuses.
// Consensus (KUR-280/282): vanilla justified — 0.05ms/query @101 entries, typo-tolerant
// subsequence beats bounded Levenshtein; Fuse.js (8.6KB gzip) not warranted at this scale.
// ponytail: swap for Fuse.js only if dataset grows past ~1k entries.

function matchIndices(q, t) {
  // Subsequence walk; returns matched target indices or null.
  const indices = []
  let ti = 0
  for (let qi = 0; qi < q.length; qi++) {
    let found = -1
    for (let k = ti; k < t.length; k++) {
      if (t[k] === q[qi]) { found = k; break }
    }
    if (found === -1) return null
    indices.push(found)
    ti = found + 1
  }
  return indices
}

export function fuzzyScore(query, target) {
  const q = query.toLowerCase()
  const t = target.toLowerCase()
  if (!q) return { score: 0, indices: null }
  if (t === q) return { score: 1, indices: matchIndices(q, t) }
  if (t.startsWith(q)) return { score: 0.95, indices: matchIndices(q, t) }
  if (t.includes(q)) return { score: 0.9, indices: matchIndices(q, t) }

  const indices = matchIndices(q, t)
  if (!indices) return { score: 0, indices: null }
  let score = 0
  let prev = -2
  for (let i = 0; i < indices.length; i++) {
    const found = indices[i]
    score += 1
    if (found === prev + 1) score += 1.5 // contiguity
    else if (found > 0 && /[\s\-_/]/.test(t[found - 1])) score += 1 // word boundary
    if (found === 0) score += 1
    prev = found
  }
  return { score: Math.min(score / (q.length * 3), 0.85), indices }
}

// Returns [{ item, score, indices }], best first. Empty query → [] (dropdown hidden per design spec).
export function fuzzyFilter(items, query, { keys, limit = 8, threshold = 0.1 } = {}) {
  const q = query.trim()
  if (!q) return []
  const results = []
  for (const item of items) {
    let best = null
    for (const key of keys) {
      const value = String(item[key] ?? '')
      const m = fuzzyScore(q, value)
      if (!best || m.score > best.score) best = { ...m, key }
    }
    if (best && best.score >= threshold) {
      results.push({ item, score: best.score, indices: best.indices, matchedKey: best.key })
    }
  }
  results.sort((a, b) => b.score - a.score)
  return results.slice(0, limit)
}
