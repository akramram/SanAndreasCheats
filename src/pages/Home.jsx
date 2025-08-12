import { useEffect, useMemo, useRef, useState } from 'react'
import cheatsData from '../assets/cheats.json'

export default function Home() {
  const [inputs, setInputs] = useState([])
  const [matchedCheat, setMatchedCheat] = useState(null)
  const [particles, setParticles] = useState([])
  const MAX_INPUTS = 14
  const prevStateRef = useRef(new Map())
  const clearTimerRef = useRef(null)

  const buttonSymbols = useMemo(
    () => [
      '✕', // 0 Cross
      '◯', // 1 Circle
      '□', // 2 Square
      '△', // 3 Triangle
      'L1', // 4
      'R1', // 5
      'L2', // 6
      'R2', // 7
      '▭', // 8 (aka Select/Back)
      '▸', // 9 (aka Start)
      'L3', // 10
      'R3', // 11
      '↑', // 12 DPad Up
      '↓', // 13 DPad Down
      '←', // 14 DPad Left
      '→', // 15 DPad Right
      'PS', // 16 Home
    ],
    []
  )

  useEffect(() => {
    if (matchedCheat) {
      setInputs([])
    }
  }, [matchedCheat])

  useEffect(() => {
    let raf = 0

    const findMatch = (arr) => {
      if (!cheatsData || !Array.isArray(cheatsData.cheats)) return null
      let best = null
      for (const cheat of cheatsData.cheats) {
        const seq = cheat.sequence || []
        const n = seq.length
        if (n === 0 || n > arr.length) continue
        let ok = true
        for (let i = 0; i < n; i++) {
          if (arr[arr.length - n + i] !== seq[i]) { ok = false; break }
        }
        if (ok) {
          if (!best || (seq.length > (best.sequence?.length || 0))) best = cheat
        }
      }
      return best
    }

    const scheduleClear = () => {
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
      clearTimerRef.current = setTimeout(() => {
        setInputs([])
        setMatchedCheat(null)
        clearTimerRef.current = null
      }, 5000)
    }

    const triggerFireworks = () => {
      const colors = ['#f59e0b', '#fbbf24', '#fde68a', '#f87171', '#60a5fa', '#34d399']
      const COUNT = 28
      const parts = Array.from({ length: COUNT }, (_, i) => {
        const angle = (Math.PI * 2 * i) / COUNT
        const dist = 80 + Math.random() * 60
        const tx = Math.cos(angle) * dist
        const ty = Math.sin(angle) * dist
        const color = colors[i % colors.length]
        return { id: `${Date.now()}-${i}`, tx, ty, color }
      })
      setParticles(parts)
      // auto clear after animation ends
      setTimeout(() => setParticles([]), 1000)
    }

    const clampAndSet = (nextItem) => {
      setInputs((prev) => {
        // If a cheat was already matched, reset buffer so user can try a new one immediately
        const base = matchedCheat ? [] : prev
        const next = [...base, nextItem]
        while (next.length > MAX_INPUTS) next.shift()
        const found = findMatch(next)
        const wasDifferent = (!matchedCheat || matchedCheat.id !== found?.id) && !!found
        setMatchedCheat(found)
        if (wasDifferent) {
          setTimeout(triggerFireworks, 300)
        }
        return next
      })
      scheduleClear()
    }

    const labelAxis = (dir, stick) => `${stick}${dir}`

    function processGamepad(gp) {
      if (!gp) return
      const prevState = prevStateRef.current
      const prev = prevState.get(gp.index) || { buttons: [], axes: [] }

      // Buttons: edge-press detection
      gp.buttons.forEach((b, i) => {
        const was = !!prev.buttons[i]
        const now = b.pressed || b.value > 0.5
        if (!was && now) {
          const symbol = gp.mapping === 'standard' && buttonSymbols[i] ? buttonSymbols[i] : `B${i}`
          clampAndSet(symbol)
        }
        prev.buttons[i] = now
      })

      // Axes: detect directional edges per stick
      const t = 0.5
      const axes = gp.axes.slice()
      function axisEdge(pairStartIndex, stickLabel) {
        const x = axes[pairStartIndex] ?? 0
        const y = axes[pairStartIndex + 1] ?? 0
        const prevX = prev.axes[pairStartIndex] ?? 0
        const prevY = prev.axes[pairStartIndex + 1] ?? 0

        if (prevX <= t && x > t) clampAndSet(labelAxis('Right', stickLabel))
        else if (prevX >= -t && x < -t) clampAndSet(labelAxis('Left', stickLabel))

        if (prevY >= -t && y < -t) clampAndSet(labelAxis('Up', stickLabel))
        else if (prevY <= t && y > t) clampAndSet(labelAxis('Down', stickLabel))

        prev.axes[pairStartIndex] = x
        prev.axes[pairStartIndex + 1] = y
      }
      axisEdge(0, 'L')
      axisEdge(2, 'R')

      prevState.set(gp.index, prev)
    }

    const loop = () => {
      const pads = navigator.getGamepads ? navigator.getGamepads() : []
      for (let i = 0; i < pads.length; i++) processGamepad(pads[i])
      raf = requestAnimationFrame(loop)
    }

    // Autostart and also after user gesture for browsers that require it
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop)
      window.removeEventListener('click', start)
      window.removeEventListener('keydown', start)
    }
    window.addEventListener('click', start)
    window.addEventListener('keydown', start)
    raf = requestAnimationFrame(loop)

    // Keep UI in sync on connect/disconnect without adding status text
    const onConnect = () => setInputs((x) => x.slice())
    const onDisconnect = () => setInputs((x) => x.slice())
    window.addEventListener('gamepadconnected', onConnect)
    window.addEventListener('gamepaddisconnected', onDisconnect)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('click', start)
      window.removeEventListener('keydown', start)
      window.removeEventListener('gamepadconnected', onConnect)
      window.removeEventListener('gamepaddisconnected', onDisconnect)
      // clear pending auto-clear timer
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
    }
  }, [buttonSymbols, matchedCheat])

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-3 bg-black text-amber-200 px-4">
      <div className="text-2xl font-semibold tracking-tight text-center">
        <img src={'cj.svg'} alt="Sup mf" className="w-16 h-16 object-contain" />
      </div>
      {matchedCheat && (
        <div key={matchedCheat.id} className="text-center cheat-pop fireworks">
          <div className="text-lg font-medium">{matchedCheat.name}</div>
          {matchedCheat.description && (
            <div className="text-sm opacity-90">{matchedCheat.description}</div>
          )}
          <div className="particles">
            {particles.map(p => (
              <span
                key={p.id}
                className="particle"
                style={{
                  color: p.color,
                  backgroundColor: p.color,
                  '--tx': `${p.tx}px`,
                  '--ty': `${p.ty}px`,
                }}
              />
            ))}
          </div>
        </div>
      )}
      <div className="text-center text-base leading-6 max-w-3xl break-words">
        {inputs.join(', ')}

        {matchedCheat?.sequence?.join(' ')}
      </div>
    </main>
  )
}

