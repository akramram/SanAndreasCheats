// Iteration 51 — live countdown to next Monday 00:00 local for the weekly heist.
// Presentational + self-ticking: the 60 s interval re-renders only this component,
// never Home (perf guidance from the daily-innovation guide).
import { useEffect, useState } from 'react'

function nextMondayMidnight(now = new Date()) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const since = (d.getDay() + 6) % 7 // days since Monday
  d.setDate(d.getDate() + (since === 0 && d.getTime() === now.getTime() ? 0 : 7 - since))
  return d // Monday 00:00 local
}

function formatLeft(ms) {
  const mins = Math.max(0, Math.floor(ms / 60000))
  const days = Math.floor(mins / 1440)
  const hours = Math.floor((mins % 1440) / 60)
  if (days > 0) return `${days}D ${hours}H LEFT`
  if (hours > 0) return `${hours}H ${mins % 60}M LEFT`
  return `${mins}M LEFT`
}

export default function HeistCountdown() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(t)
  }, [])
  return <span className="heist-countdown">· {formatLeft(nextMondayMidnight(now) - now)}</span>
}
