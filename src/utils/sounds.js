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
