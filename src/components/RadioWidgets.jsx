import { useEffect, useState } from 'react'

// Presentational radio widgets (iteration 28). They own their animation state so
// ticking the VU meter / clock re-renders only themselves, not the whole Home page.

const VU_BARS = 12
const VU_FRAME_MS = 66 // ~15fps is plenty for a pixel-art meter
const PAUSED_BARS = Array(VU_BARS).fill(2)

/** Randomised VU bar heights; static while paused (no animation loop at all). */
export function RadioVuMeter({ playing, streak }) {
  const [heights, setHeights] = useState(() => Array(VU_BARS).fill(3))

  useEffect(() => {
    if (!playing) return
    const baseHeight = streak >= 3 ? 8 : streak >= 1 ? 6 : 4
    const maxDeviation = streak >= 3 ? 8 : 5
    let raf = 0
    let last = 0
    const tick = (now) => {
      if (now - last >= VU_FRAME_MS) {
        last = now
        setHeights(Array.from({ length: VU_BARS }, (_, i) => {
          const center = baseHeight + Math.sin(Date.now() / 200 + i * 0.8) * 3
          return Math.max(2, Math.min(18, center + Math.random() * maxDeviation))
        }))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, streak])

  const bars = playing ? heights : PAUSED_BARS
  return (
    <div className={`radio-vu-meter ${playing ? '' : 'radio-vu-paused'}`}>
      {bars.map((h, i) => (
        <div
          key={i}
          className={`vu-bar ${h >= 14 ? 'vu-red' : h >= 9 ? 'vu-yellow' : 'vu-green'}`}
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  )
}

const CLOCK_TICK_MS = 250

function readClock(progressRef, station, durations) {
  const progress = progressRef.current?.[station] ?? 0
  const duration = durations[station] || 1
  const seconds = Math.floor(progress / 1000)
  const time = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
  return { time, pct: progress / duration }
}

/** mm:ss + progress bar for the current station, read from the shared progress ref. */
export function RadioClock({ progressRef, station, durations }) {
  const [clock, setClock] = useState(() => readClock(progressRef, station, durations))

  useEffect(() => {
    const update = () => setClock((prev) => {
      const next = readClock(progressRef, station, durations)
      return next.time === prev.time && Math.abs(next.pct - prev.pct) < 0.001 ? prev : next
    })
    update()
    const id = setInterval(update, CLOCK_TICK_MS)
    return () => clearInterval(id)
  }, [progressRef, station, durations])

  return (
    <>
      <div className="radio-time">{clock.time}</div>
      <div className="radio-track-progress">
        <div className="radio-track-progress-bar" style={{ width: `${clock.pct * 100}%` }} />
      </div>
    </>
  )
}
