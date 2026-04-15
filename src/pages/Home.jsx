import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import cheatsData from '../assets/cheats_v2.json'

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
  const timeoutMessageRef = useRef(null)

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
    setInputs([])
    setMatchedCheat(null)
    setElapsedTime(null)
    setStartTime(null)
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

    const triggerFireworks = () => {
      const colors = ['#f59e0b', '#fbbf24', '#fde68a', '#f87171', '#60a5fa', '#34d399', '#a78bfa', '#fb923c']
      const sizes = ['particle-sm', 'particle-md', 'particle-md', 'particle-lg']
      const COUNT = 40
      const parts = Array.from({ length: COUNT }, (_, i) => {
        const angle = (Math.PI * 2 * i) / COUNT + (Math.random() - 0.5) * 0.3
        const dist = 80 + Math.random() * 80
        const tx = Math.cos(angle) * dist
        const ty = Math.sin(angle) * dist
        const color = colors[i % colors.length]
        const sizeClass = sizes[i % sizes.length]
        return { id: `${Date.now()}-${i}`, tx, ty, color, sizeClass }
      })
      setParticles(parts)
      setTimeout(() => setParticles([]), 1200)

      // Spawn pixel confetti
      const confettiColors = ['#f59e0b', '#fbbf24', '#34d399', '#60a5fa', '#f87171', '#a78bfa', '#fb923c', '#e879f9']
      const confetti = Array.from({ length: 30 }, (_, i) => ({
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
          setTimeout(triggerFireworks, 300)
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
    <main className="h-screen flex flex-col items-center justify-center gap-3 bg-[#080808] text-amber-200 px-4 relative scanlines">
      {/* Background layers */}
      <div className="pixel-stars" />
      <div className="vignette" />

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

      {/* CJ Avatar with idle bobbing */}
      <div className="text-2xl font-semibold tracking-tight text-center relative z-10">
        <img src={`${base}cj.svg`} alt="CJ" className="w-20 h-20 object-contain cj-bob drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]" />
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
        <div className={`pixel-border px-6 py-3 min-w-[200px] min-h-[52px] text-center ${inputs.length > 0 ? 'input-glow' : ''}`}>
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
        <div className="text-center font-pixel text-[10px] font-medium text-amber-300/70 animate-pulse mt-4 relative z-10 tracking-wide">
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

