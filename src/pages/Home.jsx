import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import cheatsData from '../assets/cheats_v2.json'

/* ── CRT Boot Screen Component ── */
const BOOT_LINES = [
  { prefix: '>', text: 'SAN_ANDREAS_CHEATS v2.0' },
  { prefix: '>', text: 'LOADING CHEAT DATABASE', value: 'OK', ok: true },
  { prefix: '>', text: 'INITIALIZING GAMEPAD API', value: 'OK', ok: true },
  { prefix: '>', text: 'CHECKING KEYBOARD INPUT', value: 'OK', ok: true },
  { prefix: '>', text: 'LOADING CJ_AVATAR.SVG', value: 'OK', ok: true },
  { prefix: '>', text: 'RENDERING PIXEL_CITYSCAPE', value: 'OK', ok: true },
  { prefix: '>', text: 'ENABLING CRT_SCANLINES', value: 'OK', ok: true },
  { prefix: '>', text: 'GROVE STREET FAMILIES READY', warn: true },
]

function BootScreen({ onBooted }) {
  const [phase, setPhase] = useState('power-on') // power-on → logo → lines → ready → out
  const [bootOut, setBootOut] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)

  const stableOnBooted = useCallback(onBooted, [onBooted])

  useEffect(() => {
    // Power-on line: 0ms
    // Logo reveal: 400ms
    const t1 = setTimeout(() => setPhase('logo'), 400)
    // Subtitle: 900ms
    const t2 = setTimeout(() => setPhase('subtitle'), 900)
    // Start showing lines: 1400ms, each line 150ms apart
    const lineTimers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), 1400 + i * 150)
    )
    // Ready prompt: 1400 + bootLines.length * 150 + 300
    const readyTime = 1400 + BOOT_LINES.length * 150 + 300
    const t3 = setTimeout(() => setPhase('ready'), readyTime)
    // Boot out (zoom to reveal main UI): readyTime + 800
    const t4 = setTimeout(() => setBootOut(true), readyTime + 800)
    // Signal booted: readyTime + 1600
    const t5 = setTimeout(() => stableOnBooted(), readyTime + 1600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
      lineTimers.forEach(clearTimeout)
    }
  }, [stableOnBooted])

  return (
    <div className={`boot-screen ${bootOut ? 'booting-out' : ''}`}>
      <div className="boot-noise" />
      {phase === 'power-on' && <div className="boot-power-line" />}
      <div className={`boot-logo ${phase !== 'power-on' ? 'visible' : ''}`}>
        SA CHEATS
      </div>
      <div className={`boot-subtitle ${phase === 'subtitle' || phase === 'lines' || phase === 'ready' ? 'visible' : ''}`}>
        GRAND THEFT AUTO: SAN ANDREAS
      </div>
      <div className="boot-lines">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="boot-line" style={{ animationDelay: `${i * 0.05}s` }}>
            <span className="boot-prefix">{line.prefix}</span>
            <span>{line.text}</span>
            {line.value && <span className={line.ok ? 'boot-ok' : ''}> {line.value}</span>}
          </div>
        ))}
      </div>
      <div className={`boot-ready ${phase === 'ready' && !bootOut ? 'visible' : ''}`}>
        PRESS ANY KEY TO START<span className="boot-cursor-bar" />
      </div>
    </div>
  )
}

export default function Home() {
  const [inputs, setInputs] = useState([])
  const [matchedCheat, setMatchedCheat] = useState(null)
  const [particles, setParticles] = useState([])
  const [confettiPieces, setConfettiPieces] = useState([])
  const [bannerKey, setBannerKey] = useState(0)
  const [isKeyboardInput, setIsKeyboardInput] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(null)
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const [cheatHistory, setCheatHistory] = useState([])
  const MAX_INPUTS = 40
  const prevStateRef = useRef(new Map())
  const clearTimerRef = useRef(null)
  const audioRef = useRef(null)
  const inactivityTimeoutRef = useRef(null)
  const base = new URL(document.baseURI).pathname
  const [showLongDescription, setShowLongDescription] = useState(true)
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(true)
  const [shakeActive, setShakeActive] = useState(false)
  const [cjMood, setCjMood] = useState('idle') // idle | typing | celebrating
  const [cjSpeech, setCjSpeech] = useState(null)
  const [speechFading, setSpeechFading] = useState(false)
  const [showFail, setShowFail] = useState(false)
  const timeoutMessageRef = useRef(null)
  // Combo/streak system
  const [currentStreak, setCurrentStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(() => {
    return parseInt(localStorage.getItem('bestStreak') || '0', 10)
  })
  const [bestTime, setBestTime] = useState(() => {
    const saved = localStorage.getItem('bestTime')
    return saved ? parseFloat(saved) : null
  })
  const [totalCheats, setTotalCheats] = useState(0)
  const [comboAnim, setComboAnim] = useState(null) // null | 'enter' | 'bump'
  const [hadInputSinceMatch, setHadInputSinceMatch] = useState(false)
  const [booted, setBooted] = useState(false)

  // Function to save cheat to history
  const saveCheatToHistory = useCallback((cheat, timestamp, elapsedMs, inputDevice) => {
    const newEntry = {
      id: `${cheat.id}-${timestamp}`,
      name: cheat.name,
      timestamp: timestamp,
      date: new Date(timestamp).toLocaleString(),
      elapsedTime: elapsedMs,
      inputDevice: inputDevice
    }
    
    const updatedHistory = [newEntry, ...cheatHistory].slice(0, 50) // Keep only last 50 entries
    setCheatHistory(updatedHistory)
    localStorage.setItem('cheatHistory', JSON.stringify(updatedHistory))
  }, [cheatHistory])

  // Modal management functions
  const openHistoryModal = () => setIsHistoryModalOpen(true)
  const closeHistoryModal = () => setIsHistoryModalOpen(false)

  // Function to reset input and counter on inactivity
  const resetOnInactivity = () => {
    // If there was input but no match — that's a fail
    if (inputs.length > 0 && !matchedCheat && hadInputSinceMatch) {
      setShowFail(true)
      setCjMood('disappoint')
      setCurrentStreak(0)
      setComboAnim(null)
      setTimeout(() => setShowFail(false), 1200)
      setTimeout(() => setCjMood('idle'), 800)
    }
    setInputs([])
    setMatchedCheat(null)
    setElapsedTime(null)
    setStartTime(null)
    setCjSpeech(null)
    setSpeechFading(false)
    setHadInputSinceMatch(false)
    prevStateRef.current = new Map()
    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current)
      clearTimerRef.current = null
    }
  }

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

  // Load cheat history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('cheatHistory')
    if (savedHistory) {
      try {
        setCheatHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Failed to parse cheat history:', e)
      }
    }
  }, [])

  useEffect(() => {
    if (matchedCheat) {
      setInputs([])
      // Reset timer when cheat is matched and inputs are cleared
      setStartTime(null)
    }
  }, [matchedCheat])

  useEffect(() => {
    let raf = 0

    const findMatch = (arr) => {
      if (!cheatsData || !Array.isArray(cheatsData.cheats)) return null
      let best = null
      for (const cheat of cheatsData.cheats) {
        // Check gamepad sequence
        const seq = cheat.psSequence || []
        const n = seq.length
        if (n > 0 && n <= arr.length) {
          let ok = true
          for (let i = 0; i < n; i++) {
            if (arr[arr.length - n + i] !== seq[i]) { ok = false; break }
          }
          if (ok) {
            if (!best || (seq.length > (best.psSequence?.length || 0))) best = cheat
          }
        }
        
        // Check PC keyboard sequence(s)
        const pcSeqs = cheat.pcSequence || []
        // Handle both single array and array of arrays
        const sequences = Array.isArray(pcSeqs[0]) ? pcSeqs : [pcSeqs]
        
        for (const pcSeq of sequences) {
          const pcN = pcSeq.length
          if (pcN > 0 && pcN <= arr.length) {
            let ok = true
            for (let i = 0; i < pcN; i++) {
              if (arr[arr.length - pcN + i] !== pcSeq[i]) { ok = false; break }
            }
            if (ok) {
              const currentBestLength = best?.pcSequence ? 
                (Array.isArray(best.pcSequence[0]) ? Math.max(...best.pcSequence.map(seq => seq.length)) : best.pcSequence.length) :
                (best?.psSequence?.length || 0)
              if (!best || (pcSeq.length > currentBestLength)) {
                best = cheat
                break // Found a match, no need to check other sequences for this cheat
              }
            }
          }
        }
      }
      return best
    }

    const scheduleClear = () => {
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
      clearTimerRef.current = setTimeout(() => {
        setInputs([])
        setMatchedCheat(null)
        setStartTime(null)
        setElapsedTime(null)
        clearTimerRef.current = null
      }, 2000)
    }

    const scheduleTimeoutMessage = () => {
      // Clear existing timeout message timer
      if (timeoutMessageRef.current) clearTimeout(timeoutMessageRef.current)
      // Hide message immediately when there's input
      setShowTimeoutMessage(false)
      // Show timeout message after 5 seconds of no input
      timeoutMessageRef.current = setTimeout(() => {
        setShowTimeoutMessage(true)
        timeoutMessageRef.current = null
      }, 3500)
    }

    const triggerFireworks = (comboMultiplier = 1) => {
      const colors = ['#f59e0b', '#fbbf24', '#fde68a', '#f87171', '#60a5fa', '#34d399', '#a78bfa', '#fb923c']
      const sizes = ['particle-sm', 'particle-md', 'particle-md', 'particle-lg']
      const COUNT = 40 + (comboMultiplier - 1) * 10 // 40-80 particles based on combo
      const parts = Array.from({ length: COUNT }, (_, i) => {
        const angle = (Math.PI * 2 * i) / COUNT + (Math.random() - 0.5) * 0.3
        const dist = (80 + Math.random() * 80) * (1 + comboMultiplier * 0.15) // further spread at higher combos
        const tx = Math.cos(angle) * dist
        const ty = Math.sin(angle) * dist
        const color = colors[i % colors.length]
        const sizeClass = sizes[i % sizes.length]
        return { id: `${Date.now()}-${i}`, tx, ty, color, sizeClass }
      })
      setParticles(parts)
      setTimeout(() => setParticles([]), 1200)

      // Spawn pixel confetti — more at higher combos
      const confettiColors = ['#f59e0b', '#fbbf24', '#34d399', '#60a5fa', '#f87171', '#a78bfa', '#fb923c', '#e879f9']
      const confettiCount = 30 + (comboMultiplier - 1) * 10
      const confetti = Array.from({ length: confettiCount }, (_, i) => ({
        id: `conf-${Date.now()}-${i}`,
        color: confettiColors[i % confettiColors.length],
        left: `${5 + Math.random() * 90}%`,
        delay: `${Math.random() * 0.4}s`,
        fallDuration: `${1.5 + Math.random() * 1.5}s`,
        rot: `${360 + Math.random() * 720}deg`,
        w: `${4 + Math.random() * 6}px`,
        h: `${4 + Math.random() * 6}px`,
      }))
      setConfettiPieces(confetti)
      setTimeout(() => setConfettiPieces([]), 3500)

      // Show banner
      setBannerKey(k => k + 1)
    }

    const playNotif = () => {
      const a = audioRef.current
      if (!a) return
      try {
        a.currentTime = 0
        a.play().catch(() => {})
      } catch (e) {
        console.error(e)
       }
    }

    const clampAndSet = (nextItem, fromKeyboard = false) => {
      setIsKeyboardInput(fromKeyboard)
      // Set CJ to attention mode when typing
      setCjMood('typing')
      setHadInputSinceMatch(true)
      setInputs((prev) => {
        // If a cheat was already matched, reset buffer so user can try a new one immediately
        const base = matchedCheat ? [] : prev
        const next = [...base, nextItem]
        
        // Timer logic: start timer on first input or reset if starting fresh
        let currentStartTime = startTime
        if (base.length === 0) {
          currentStartTime = Date.now()
          setStartTime(currentStartTime)
          setElapsedTime(null)
        }
        
        while (next.length > MAX_INPUTS) next.shift()
        const found = findMatch(next)
        const wasDifferent = (!matchedCheat || matchedCheat.id !== found?.id) && !!found
        setMatchedCheat(found)
        
        // Calculate elapsed time when cheat is found
        if (wasDifferent && currentStartTime) {
          const elapsed = Date.now() - currentStartTime
          setElapsedTime(elapsed)
          // Save cheat to history
          saveCheatToHistory(found, Date.now(), elapsed, isKeyboardInput ? 'keyboard' : 'gamepad')
        }
        
        if (wasDifferent) {
          // Play sound immediately and trigger fireworks shortly after
          playNotif()
          // Trigger screen shake
          setShakeActive(true)
          setTimeout(() => setShakeActive(false), 400)

          // Update streak & combo
          const newStreak = currentStreak + 1
          setCurrentStreak(newStreak)
          setTotalCheats(t => t + 1)
          setHadInputSinceMatch(false)
          if (newStreak > bestStreak) {
            const newBest = newStreak
            setBestStreak(newBest)
            localStorage.setItem('bestStreak', String(newBest))
          }
          // Update best time
          if (currentStartTime) {
            const elapsed = Date.now() - currentStartTime
            if (bestTime === null || elapsed < bestTime) {
              setBestTime(elapsed)
              localStorage.setItem('bestTime', String(elapsed))
            }
          }

          // Combo animation
          if (newStreak === 1) {
            setComboAnim('enter')
            setTimeout(() => setComboAnim(null), 400)
          } else {
            setComboAnim('bump')
            setTimeout(() => setComboAnim(null), 250)
          }

          // Escalate fireworks based on combo
          const comboMultiplier = Math.min(newStreak, 5)
          setTimeout(() => triggerFireworks(comboMultiplier), 300)

          // CJ celebration!
          setCjMood('celebrating')
          // Show speech bubble — different phrases based on combo level
          let phrases
          if (newStreak >= 5) {
            phrases = ['UNSTOPPABLE!', 'ON FIRE!', 'GODLIKE!', 'LEGENDARY!']
          } else if (newStreak >= 3) {
            phrases = ['HOT STREAK!', 'TRIPLE!', 'COMBO x' + newStreak + '!', 'INSANE!']
          } else if (newStreak >= 2) {
            phrases = ['DOUBLE!', 'NICE ONE!', 'AWW YEAH!', 'KEEP GOING!']
          } else {
            phrases = ['YEAH!', 'AWW YEAH!', 'GROVE ST!', 'NICE ONE!', 'HELL YEAH!', 'SWEET!', 'OOH YEAH!']
          }
          setCjSpeech(phrases[Math.floor(Math.random() * phrases.length)])
          setSpeechFading(false)
          // Fade speech bubble after 1.5s
          setTimeout(() => setSpeechFading(true), 1500)
          // Clear speech after fade
          setTimeout(() => setCjSpeech(null), 2000)
          // Return CJ to typing mode after celebration
          setTimeout(() => setCjMood('typing'), 1200)
        }
        return next
      })
      scheduleClear()
      scheduleTimeoutMessage()
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

    // Keyboard input handling for PC cheat codes
    const handleKeyDown = (event) => {
      // Only capture letter keys A-Z
      if (event.key.length === 1 && /[A-Za-z]/.test(event.key)) {
        const letter = event.key.toUpperCase()
        clampAndSet(letter, true)
        event.preventDefault()
      }
    }

    // Autostart and also after user gesture for browsers that require it
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop)
      // Prepare audio on first user gesture for autoplay policies
      if (!audioRef.current) {
        audioRef.current = new Audio('cheat_activated.mp3')
        audioRef.current.volume = 0.6
        // Try to unlock audio; ignore failures
        audioRef.current.play().then(() => {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }).catch(() => {})
      }
      window.removeEventListener('click', start)
      window.removeEventListener('keydown', start)
    }
    window.addEventListener('click', start)
    window.addEventListener('keydown', start)
    window.addEventListener('keydown', handleKeyDown)
    raf = requestAnimationFrame(loop)
    // Start the timeout message timer
    scheduleTimeoutMessage()

    // Keep UI in sync on connect/disconnect without adding status text
    const onConnect = () => setInputs((x) => x.slice())
    const onDisconnect = () => setInputs((x) => x.slice())
    window.addEventListener('gamepadconnected', onConnect)
    window.addEventListener('gamepaddisconnected', onDisconnect)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('click', start)
      window.removeEventListener('keydown', start)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('gamepadconnected', onConnect)
      window.removeEventListener('gamepaddisconnected', onDisconnect)
      // clear pending auto-clear timer
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
      // clear pending timeout message timer
      if (timeoutMessageRef.current) clearTimeout(timeoutMessageRef.current)
    }
  }, [buttonSymbols, isKeyboardInput, matchedCheat, saveCheatToHistory, startTime])

  // Inactivity timeout - reset after 3.5 seconds of no input
  useEffect(() => {
    // Clear existing timeout
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current)
    }
    
    // Only set timeout if there are inputs
    if (inputs.length > 0) {
      inactivityTimeoutRef.current = setTimeout(() => {
        resetOnInactivity()
      }, 3500)
    }
    
    // Cleanup function
    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current)
        inactivityTimeoutRef.current = null
      }
    }
  }, [inputs])

  return (
    <main className={`h-screen flex flex-col items-center justify-center gap-3 bg-[#080808] text-amber-200 px-4 relative scanlines ${booted ? 'main-ui-booted' : ''}`} style={{ opacity: booted ? undefined : 0 }}>
      {/* CRT Boot Screen */}
      {!booted && <BootScreen onBooted={() => setBooted(true)} />}
      {/* Background layers */}
      <div className="pixel-stars" />

      {/* Shooting stars */}
      <div className="shooting-star" style={{ '--shoot-left': '15%', '--shoot-top': '12%', '--shoot-duration': '6s', '--shoot-delay': '0s' }} />
      <div className="shooting-star" style={{ '--shoot-left': '60%', '--shoot-top': '8%', '--shoot-duration': '8s', '--shoot-delay': '3s' }} />
      <div className="shooting-star" style={{ '--shoot-left': '80%', '--shoot-top': '20%', '--shoot-duration': '7s', '--shoot-delay': '7s' }} />

      {/* Scrolling pixel cityscape */}
      <div className="pixel-cityscape" />
      <div className="pixel-cityscape-lights" />

      {/* Horizon glow & fog */}
      <div className="horizon-glow" />
      <div className="cityscape-fog" />

      {/* Ambient dust particles */}
      <div className="ambient-dust" style={{ left: '10%', bottom: '30%', '--dust-duration': '14s', '--dust-delay': '0s', '--dust-drift-x': '30px', '--dust-drift-y': '-50px', '--dust-end-x': '60px', '--dust-end-y': '-100px', '--dust-opacity': '0.12' }} />
      <div className="ambient-dust" style={{ left: '25%', bottom: '40%', '--dust-duration': '11s', '--dust-delay': '2s', '--dust-drift-x': '-20px', '--dust-drift-y': '-35px', '--dust-end-x': '-40px', '--dust-end-y': '-70px', '--dust-opacity': '0.1' }} />
      <div className="ambient-dust" style={{ left: '45%', bottom: '35%', '--dust-duration': '16s', '--dust-delay': '4s', '--dust-drift-x': '25px', '--dust-drift-y': '-45px', '--dust-end-x': '50px', '--dust-end-y': '-90px', '--dust-opacity': '0.08' }} />
      <div className="ambient-dust" style={{ left: '65%', bottom: '45%', '--dust-duration': '13s', '--dust-delay': '1s', '--dust-drift-x': '-15px', '--dust-drift-y': '-55px', '--dust-end-x': '-30px', '--dust-end-y': '-110px', '--dust-opacity': '0.14' }} />
      <div className="ambient-dust" style={{ left: '80%', bottom: '38%', '--dust-duration': '15s', '--dust-delay': '5s', '--dust-drift-x': '20px', '--dust-drift-y': '-40px', '--dust-end-x': '45px', '--dust-end-y': '-80px', '--dust-opacity': '0.1' }} />
      <div className="ambient-dust" style={{ left: '92%', bottom: '42%', '--dust-duration': '12s', '--dust-delay': '3s', '--dust-drift-x': '-25px', '--dust-drift-y': '-30px', '--dust-end-x': '-50px', '--dust-end-y': '-60px', '--dust-opacity': '0.12' }} />
      <div className="ambient-dust" style={{ left: '5%', bottom: '50%', '--dust-duration': '18s', '--dust-delay': '6s', '--dust-drift-x': '35px', '--dust-drift-y': '-60px', '--dust-end-x': '70px', '--dust-end-y': '-120px', '--dust-opacity': '0.06' }} />
      <div className="ambient-dust" style={{ left: '55%', bottom: '55%', '--dust-duration': '10s', '--dust-delay': '8s', '--dust-drift-x': '-10px', '--dust-drift-y': '-25px', '--dust-end-x': '-20px', '--dust-end-y': '-50px', '--dust-opacity': '0.15' }} />

      <div className="vignette" />

      {/* Retro HUD Bar */}
      <div className={`hud-bar ${booted ? 'hud-enter' : ''}`}>
        <div className="hud-stat">
          <span className="hud-label">CHEATS</span>
          <span className="hud-value">{totalCheats}</span>
        </div>
        <div className="hud-stat">
          <span className="hud-label">STREAK</span>
          <span className={`hud-value ${currentStreak >= 3 ? 'streak-hot' : ''}`}>{currentStreak}</span>
        </div>
        <div className="hud-stat">
          <span className="hud-label">BEST</span>
          <span className="hud-value">{bestStreak}</span>
        </div>
        {bestTime !== null && (
          <div className="hud-stat">
            <span className="hud-label">BEST TIME</span>
            <span className="hud-value">{(bestTime / 1000).toFixed(2)}s</span>
          </div>
        )}
      </div>

      {/* Combo Counter (right side) */}
      {currentStreak > 0 && (
        <div className={`combo-counter ${comboAnim || ''} combo-${Math.min(currentStreak, 5)}`}>
          <div className="combo-number">x{currentStreak}</div>
          <div className="combo-label">COMBO</div>
        </div>
      )}

      {/* Fail overlay (WASTED style) */}
      {showFail && (
        <>
          <div className="fail-overlay" />
          <div className="wasted-text">MISSED</div>
        </>
      )}

      {/* Floating ambient cheat text */}
      <span className="float-text" style={{ '--left': '5%', '--delay': '0s', '--duration': '22s' }}>ASPIRINE</span>
      <span className="float-text" style={{ '--left': '20%', '--delay': '4s', '--duration': '25s' }}>HESOYAM</span>
      <span className="float-text" style={{ '--left': '40%', '--delay': '8s', '--duration': '20s' }}>BAGUVIX</span>
      <span className="float-text" style={{ '--left': '60%', '--delay': '2s', '--duration': '23s' }}>AEZAKMI</span>
      <span className="float-text" style={{ '--left': '80%', '--delay': '6s', '--duration': '26s' }}>KANGAROO</span>
      <span className="float-text" style={{ '--left': '92%', '--delay': '12s', '--duration': '21s' }}>ROCKETMAN</span>

      {/* Screen flash on cheat match */}
      {matchedCheat && (
        <div className="fixed inset-0 bg-amber-400 screen-flash pointer-events-none z-50" />
      )}

      {/* "CHEAT ACTIVATED" banner */}
      {matchedCheat && (
        <div key={`banner-${bannerKey}`} className="cheat-banner">
          ★ CHEAT ACTIVATED ★
        </div>
      )}

      {/* Pixel confetti rain */}
      {confettiPieces.map(c => (
        <div
          key={c.id}
          className="confetti-piece"
          style={{
            '--color': c.color,
            '--confetti-left': c.left,
            '--confetti-delay': c.delay,
            '--fall-duration': c.fallDuration,
            '--rot': c.rot,
            '--w': c.w,
            '--h': c.h,
          }}
        />
      ))}

      {/* History Button */}
      <button
        onClick={openHistoryModal}
        className="absolute top-4 right-4 text-amber-200 hover:text-amber-400 transition-colors duration-200 cursor-pointer z-10"
        aria-label="View History"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* CJ Avatar with reactive animations */}
      <div className="text-2xl font-semibold tracking-tight text-center relative z-10">
        {cjSpeech && (
          <div className={`cj-speech-bubble ${speechFading ? 'fade-out' : ''}`}>
            {cjSpeech}
          </div>
        )}
        <img
          src={`${base}cj.svg`}
          alt="CJ"
          className={`w-20 h-20 object-contain drop-shadow-[0_0_12px_rgba(245,158,11,0.4)] ${
            cjMood === 'celebrating' ? 'cj-celebrate' :
            cjMood === 'disappoint' ? 'cj-disappoint' :
            cjMood === 'typing' ? 'cj-attention' :
            'cj-bob'
          }`}
        />
      </div>

      {/* Cheat match display */}
      {matchedCheat && (
        <div key={matchedCheat.id} className={`text-center cheat-pop fireworks max-w-2xl mx-auto flex flex-col gap-3 relative z-10 px-6 py-4 pixel-border ${shakeActive ? 'screen-shake' : ''}`}>
          {elapsedTime !== null && (
            <div className="font-pixel text-sm font-bold text-green-400 mb-2 time-flash">
              TIME: {(elapsedTime / 1000).toFixed(2)}s
            </div>
          )}
          <div className="font-pixel text-base font-medium text-amber-200 match-glow">{matchedCheat.name}</div>
          {matchedCheat.description && (
            <div className="font-vt text-xl opacity-90">{matchedCheat.description}</div>
          )}
          {showLongDescription && matchedCheat.longDescription && (
            <div className="font-vt text-lg opacity-80 italic text-amber-300">{matchedCheat.longDescription}</div>
          )}
          <div className="particles">
            {particles.map(p => (
              <span
                key={p.id}
                className={`particle ${p.sizeClass || 'particle-md'}`}
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

      {/* Input display with pixel border and glow */}
      <div className="relative z-10">
        <div className={`pixel-border px-6 py-3 min-w-[200px] min-h-[52px] text-center ${inputs.length > 0 ? 'input-glow input-glow-active' : ''}`}>
          <div className="font-vt text-2xl leading-7 max-w-3xl break-words tracking-wider">
            {inputs.length > 0 ? (
              inputs.map((inp, i) => (
                <span key={i} className="char-appear" style={{ animationDelay: `${i * 30}ms` }}>
                  {inp}
                </span>
              ))
            ) : (
              <span className="opacity-30 font-vt text-2xl">_</span>
            )}
            {inputs.length > 0 && <span className="pixel-cursor" />}
          </div>
          {matchedCheat && (
            <div className="font-pixel text-[9px] text-amber-400/60 mt-2 tracking-widest">
              {isKeyboardInput && matchedCheat?.pcSequence ?
                (() => {
                  const pcSeqs = matchedCheat.pcSequence
                  if (Array.isArray(pcSeqs[0])) {
                    return pcSeqs.map(seq => seq.join('')).join(' / ')
                  } else {
                    return pcSeqs.join('')
                  }
                })() :
                matchedCheat?.psSequence?.join(' ')
              }
            </div>
          )}
        </div>
      </div>

      {/* Prompt text */}
      {showTimeoutMessage && !matchedCheat && (
        <div className={`text-center font-pixel text-[10px] font-medium text-amber-300/70 animate-pulse mt-4 relative z-10 tracking-wide ${booted ? 'prompt-enter' : ''}`}>
          ENTER CHEAT CODE
          <br />
          <span className="font-vt text-base text-amber-400/50">keyboard or gamepad</span>
        </div>
      )}

      {/* Settings toggle */}
      <div
        className='uppercase text-sm font-extralight w-xs flex justify-between items-center absolute bottom-1 left-3 cursor-pointer group hover:ml-13 z-10'
        onClick={() => setShowLongDescription(!showLongDescription)}
      >
        <span className="block group-hover:hidden text-amber-500"> ⚙ </span>
        <span className="hidden group-hover:block bank-gothic text-amber-400">Show Long Description</span>
        <span className="hidden group-hover:block bank-gothic text-amber-400">
          {showLongDescription ? 'ON' : 'OFF'}
        </span>
      </div>

      {/* History Modal — pixel styled */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 pixel-modal-backdrop flex items-center justify-center z-[200] p-4">
          <div className="pixel-modal max-w-2xl w-full max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="pixel-modal-header flex justify-between items-center p-5">
              <h2 className="font-pixel text-sm text-amber-200 tracking-wider">CHEAT HISTORY</h2>
              <button
                onClick={closeHistoryModal}
                className="font-pixel text-sm text-amber-400 hover:text-amber-200 cursor-pointer"
              >
                [X]
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-2">
              {cheatHistory.length === 0 ? (
                <p className="font-vt text-xl text-amber-400/50 text-center py-8">No cheats activated yet.</p>
              ) : (
                cheatHistory.map((entry) => (
                  <div key={entry.id} className="pixel-history-item p-3">
                    <div className="flex items-center gap-3">
                      <span className="font-vt text-xl">
                        {entry.inputDevice === 'keyboard' ? '⌨️' : '🎮'}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-pixel text-[10px] text-amber-200">{entry.name}</h3>
                        <p className="font-vt text-base text-amber-400/50 mt-1">{entry.date}</p>
                        {entry.elapsedTime && (
                          <p className="font-pixel text-[9px] text-green-400 mt-1">
                            TIME: {(entry.elapsedTime / 1000).toFixed(2)}s
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

