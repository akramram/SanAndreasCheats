/**
 * Retro Sound Effects Engine — Web Audio API Synthesized Sounds
 * All sounds are generated procedurally, no audio files needed.
 * Inspired by 8-bit/16-bit era sound chips (NES, Game Boy).
 */

let audioCtx = null
let masterGain = null
let _muted = false

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    masterGain = audioCtx.createGain()
    masterGain.gain.value = 0.3
    masterGain.connect(audioCtx.destination)
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function getMaster() {
  getCtx()
  return masterGain
}

// ── Volume Control ──
export function setMuted(muted) {
  _muted = muted
  if (masterGain) {
    masterGain.gain.setTargetAtTime(muted ? 0 : 0.3, audioCtx.currentTime, 0.05)
  }
}

export function isMuted() {
  return _muted
}

export function toggleMute() {
  setMuted(!_muted)
  return !_muted
}

// ── Basic Waveform Helpers ──
function playTone(freq, duration, type = 'square', volume = 0.3, detune = 0) {
  if (_muted) return
  const ctx = getCtx()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  osc.detune.value = detune
  gain.gain.value = volume
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.connect(gain)
  gain.connect(getMaster())
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + duration + 0.01)
}

function playNoise(duration, volume = 0.1) {
  if (_muted) return
  const ctx = getCtx()
  const bufferSize = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }
  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  const gain = ctx.createGain()
  gain.gain.value = volume
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  // Bandpass for retro feel
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 3000
  filter.Q.value = 0.5
  noise.connect(filter)
  filter.connect(gain)
  gain.connect(getMaster())
  noise.start(ctx.currentTime)
  noise.stop(ctx.currentTime + duration + 0.01)
}

// ── Sound Effects ──

/** Short pixel key click — different pitches for variety */
export function playKeyClick() {
  if (_muted) return
  const baseFreqs = [800, 1000, 1200, 900, 1100]
  const freq = baseFreqs[Math.floor(Math.random() * baseFreqs.length)]
  playTone(freq, 0.06, 'square', 0.15)
}

/** Gamepad button press — slightly deeper tone */
export function playGamepadPress() {
  if (_muted) return
  playTone(600, 0.08, 'square', 0.15)
  playTone(900, 0.04, 'square', 0.08)
}

/** Cheat match success — ascending arpeggio fanfare */
export function playMatchSound(comboLevel = 1) {
  if (_muted) return
  getCtx()
  const baseNote = 440 + (comboLevel - 1) * 80 // Higher pitch at higher combos
  const notes = [baseNote, baseNote * 1.25, baseNote * 1.5, baseNote * 2]
  notes.forEach((freq, i) => {
    setTimeout(() => {
      playTone(freq, 0.15, 'square', 0.25)
      // Add a subtle overtone
      playTone(freq * 2, 0.1, 'square', 0.06)
    }, i * 60)
  })
}

/** Big combo hit — dramatic ascending sweep */
export function playComboHit(comboLevel) {
  if (_muted) return
  getCtx()
  // Sweep from low to high
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(200, audioCtx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(200 + comboLevel * 200, audioCtx.currentTime + 0.2)
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3)
  osc.connect(gain)
  gain.connect(getMaster())
  osc.start(audioCtx.currentTime)
  osc.stop(audioCtx.currentTime + 0.35)
  // Impact noise
  playNoise(0.08, 0.12)
}

/** Fail/miss buzzer — descending dissonant tone */
export function playFailSound() {
  if (_muted) return
  playTone(300, 0.2, 'square', 0.2)
  setTimeout(() => playTone(200, 0.3, 'square', 0.15), 120)
  playNoise(0.15, 0.08)
}

/** Achievement unlock — triumphant chime sequence */
export function playAchievementSound() {
  if (_muted) return
  // Triumphant 4-note fanfare
  const notes = [523, 659, 784, 1047] // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    setTimeout(() => {
      playTone(freq, 0.25, 'square', 0.2)
      playTone(freq * 0.5, 0.3, 'triangle', 0.1) // Bass octave
    }, i * 120)
  })
  // Sparkle noise at the end
  setTimeout(() => playNoise(0.2, 0.06), notes.length * 120 + 50)
}

/** Boot screen beep */
export function playBootBeep(index = 0) {
  if (_muted) return
  const freq = 440 + index * 40
  playTone(freq, 0.05, 'square', 0.1)
}

/** Boot ready chime */
export function playBootReady() {
  if (_muted) return
  playTone(523, 0.1, 'square', 0.15)
  setTimeout(() => playTone(659, 0.1, 'square', 0.15), 100)
  setTimeout(() => playTone(784, 0.15, 'square', 0.2), 200)
}

/** Reset/clear sound — soft descending blip */
export function playResetSound() {
  if (_muted) return
  playTone(600, 0.05, 'square', 0.08)
  setTimeout(() => playTone(400, 0.08, 'square', 0.05), 40)
}

/** Power-on thud for boot sequence */
export function playPowerOn() {
  if (_muted) return
  const ctx = getCtx()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(60, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.4)
  gain.gain.setValueAtTime(0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
  osc.connect(gain)
  gain.connect(getMaster())
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.45)
}

/** Thunder rumble — deep bass rumble with noise burst */
export function playThunder(distance = 0.5) {
  if (_muted) return
  const ctx = getCtx()
  // Low rumble
  const osc = ctx.createOscillator()
  const oscGain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(40 + Math.random() * 20, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 2 * distance)
  const vol = 0.25 * (1 - distance * 0.6)
  oscGain.gain.setValueAtTime(vol, ctx.currentTime)
  oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2 * distance)
  osc.connect(oscGain)
  oscGain.connect(getMaster())
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 2 * distance + 0.1)
  // Noise crack component
  const bufferSize = Math.floor(ctx.sampleRate * 1.5 * distance)
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15))
  }
  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  const noiseGain = ctx.createGain()
  noiseGain.gain.value = vol * 0.6
  noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5 * distance)
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 200
  noise.connect(filter)
  filter.connect(noiseGain)
  noiseGain.connect(getMaster())
  noise.start(ctx.currentTime)
  noise.stop(ctx.currentTime + 1.5 * distance + 0.1)
}

/** Rain ambient — continuous soft noise for rain atmosphere */
let rainNode = null
let rainGainNode = null
let rainFilterNode = null

export function startRainAmbient(intensity = 0.3) {
  if (_muted || rainNode) return
  const ctx = getCtx()
  const bufferSize = ctx.sampleRate * 4
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }
  rainNode = ctx.createBufferSource()
  rainNode.buffer = buffer
  rainNode.loop = true
  rainFilterNode = ctx.createBiquadFilter()
  rainFilterNode.type = 'bandpass'
  rainFilterNode.frequency.value = 6000 + intensity * 4000
  rainFilterNode.Q.value = 0.3
  rainGainNode = ctx.createGain()
  rainGainNode.gain.value = 0.04 + intensity * 0.06
  rainNode.connect(rainFilterNode)
  rainFilterNode.connect(rainGainNode)
  rainGainNode.connect(getMaster())
  rainNode.start()
}

export function stopRainAmbient() {
  if (!rainNode) return
  try {
    const ctx = getCtx()
    rainGainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.3)
    setTimeout(() => {
      try {
        rainNode.stop()
      } catch { /* already stopped */ }
      rainNode = null
      rainGainNode = null
      rainFilterNode = null
    }, 1500)
  } catch { /* cleanup */ }
}

export function updateRainIntensity(intensity) {
  if (rainGainNode && rainFilterNode) {
    const ctx = getCtx()
    rainGainNode.gain.setTargetAtTime(0.04 + intensity * 0.06, ctx.currentTime, 0.2)
    rainFilterNode.frequency.setTargetAtTime(6000 + intensity * 4000, ctx.currentTime, 0.2)
  }
}

/** Wind gust — brief whooshing sound */
export function playWindGust() {
  if (_muted) return
  const ctx = getCtx()
  const bufferSize = ctx.sampleRate * 1.5
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI)
  }
  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(200, ctx.currentTime)
  filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3)
  filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 1.2)
  filter.Q.value = 1
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.15)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.3)
  noise.connect(filter)
  filter.connect(gain)
  gain.connect(getMaster())
  noise.start(ctx.currentTime)
  noise.stop(ctx.currentTime + 1.5)
}
