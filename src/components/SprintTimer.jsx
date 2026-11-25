import { useEffect, useState } from 'react'

// Sprint mode countdown (iteration 34). Presentational and self-contained: owns its
// 250 ms tick so the whole Home tree never re-renders on the clock (iteration 28
// lesson). 30 s sprint shows 0:SS until the last minute.
export default function SprintTimer({ endsAt }) {
  const [left, setLeft] = useState(() => Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)))
  useEffect(() => {
    const id = setInterval(() => {
      setLeft(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)))
    }, 250)
    return () => clearInterval(id)
  }, [endsAt])
  const mm = Math.floor(left / 60)
  const ss = String(left % 60).padStart(2, '0')
  return (
    <span className="sprint-clock" role="timer" aria-label={`Sprint time left: ${left} seconds`}>
      {mm}:{ss}
    </span>
  )
}
