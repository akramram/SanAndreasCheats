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

/** Wanted level star gain — ascending alert tone per star level */
export function playWantedStar(level) {
  if (_muted) return
  // Each star plays a higher-pitched alert tone, getting more urgent
  const baseFreqs = [440, 523, 622, 740, 880] // A4, C5, Eb5, F#5, A5
  const freq = baseFreqs[Math.min(level - 1, 4)]
  // Quick ascending double-beep per star
  playTone(freq, 0.08, 'square', 0.2)
  setTimeout(() => playTone(freq * 1.2, 0.12, 'square', 0.25), 60)
  // At 5 stars, add urgency — fast alternating tones
  if (level >= 5) {
    setTimeout(() => playTone(freq, 0.06, 'square', 0.2), 140)
    setTimeout(() => playTone(freq * 1.2, 0.06, 'square', 0.2), 180)
    setTimeout(() => playTone(freq, 0.06, 'square', 0.2), 220)
    setTimeout(() => playTone(freq * 1.2, 0.1, 'square', 0.25), 260)
  }
}

/** Wanted level lost — descending defeat tone */
export function playWantedLost() {
  if (_muted) return
  playTone(660, 0.1, 'square', 0.15)
  setTimeout(() => playTone(520, 0.1, 'square', 0.12), 80)
  setTimeout(() => playTone(390, 0.15, 'square', 0.1), 160)
  setTimeout(() => playTone(260, 0.25, 'square', 0.08), 250)
}

/** Police siren for max wanted level */
let sirenNode = null
let sirenGainNode = null

export function startSiren() {
  if (_muted || sirenNode) return
  const ctx = getCtx()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sawtooth'
  // Oscillate between two frequencies for siren wail
  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.type = 'sine'
  lfo.frequency.value = 2.5 // siren wail speed
  lfoGain.gain.value = 150
  lfo.connect(lfoGain)
  lfoGain.connect(osc.frequency)
  osc.frequency.value = 600
  gain.gain.value = 0.06
  osc.connect(gain)
  gain.connect(getMaster())
  osc.start()
  lfo.start()
  sirenNode = osc
  sirenGainNode = gain
}

export function stopSiren() {
  if (!sirenNode) return
  try {
    const ctx = getCtx()
    sirenGainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.15)
    setTimeout(() => {
      try {
        sirenNode.stop()
      } catch { /* already stopped */ }
      sirenNode = null
      sirenGainNode = null
    }, 500)
  } catch { /* cleanup */ }
}

// ── Radio Station System ──
let radioGainNode = null
let radioOscillators = []
let radioTimer = null

/** Play brief radio static burst — like tuning between stations */
export function playRadioStatic() {
  if (_muted) return
  const ctx = getCtx()
  const bufferSize = Math.floor(ctx.sampleRate * 0.3)
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2))
  }
  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 2000
  filter.Q.value = 0.8
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.12, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
  noise.connect(filter)
  filter.connect(gain)
  gain.connect(getMaster())
  noise.start(ctx.currentTime)
  noise.stop(ctx.currentTime + 0.35)
}

/** Play a short radio tuning sweep — frequency dial turning */
export function playRadioTune() {
  if (_muted) return
  const ctx = getCtx()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(300, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15)
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.25)
  gain.gain.setValueAtTime(0.06, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
  osc.connect(gain)
  gain.connect(getMaster())
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.35)
}

/**
 * Play a short looping ambient jingle for a radio station.
 * Each genre has a unique chord/melody pattern using oscillators.
 * Returns a cleanup function to stop the jingle.
 */
export function startRadioJingle(genreId) {
  stopRadioJingle()
  if (_muted) return

  const ctx = getCtx()
  radioGainNode = ctx.createGain()
  radioGainNode.gain.value = 0.04
  radioGainNode.connect(getMaster())
  radioOscillators = []

  const jingles = {
    // K-DST: Classic Rock — power chord drone E-B
    rock: () => {
      const chords = [
        { notes: [164.81, 246.94], duration: 2 }, // E3, B3
        { notes: [196.00, 293.66], duration: 2 }, // G3, D4
      ]
      let chordIndex = 0
      const playChord = () => {
        for (const freq of chords[chordIndex].notes) {
          const osc = ctx.createOscillator()
          const g = ctx.createGain()
          osc.type = 'sawtooth'
          osc.frequency.value = freq
          g.gain.setValueAtTime(0.06, ctx.currentTime)
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8)
          osc.connect(g)
          g.connect(radioGainNode)
          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + 2)
          radioOscillators.push(osc)
        }
        chordIndex = (chordIndex + 1) % chords.length
        radioTimer = setTimeout(playChord, 2000)
      }
      playChord()
    },
    // Radio Los Santos: West Coast Hip Hop — 808-style sub bass + hi-hat rhythm
    hiphop: () => {
      const bassNotes = [55, 55, 65.41, 55, 73.42, 65.41, 55, 55] // A1, C2, D2
      let noteIndex = 0
      const playBeat = () => {
        // Sub bass
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = bassNotes[noteIndex]
        g.gain.setValueAtTime(0.12, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
        osc.connect(g)
        g.connect(radioGainNode)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.4)
        radioOscillators.push(osc)
        // Hi-hat click
        const hatBuffer = Math.floor(ctx.sampleRate * 0.05)
        const hatBuf = ctx.createBuffer(1, hatBuffer, ctx.sampleRate)
        const hatData = hatBuf.getChannelData(0)
        for (let i = 0; i < hatBuffer; i++) hatData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (hatBuffer * 0.1))
        const hat = ctx.createBufferSource()
        hat.buffer = hatBuf
        const hatFilter = ctx.createBiquadFilter()
        hatFilter.type = 'highpass'
        hatFilter.frequency.value = 8000
        const hatGain = ctx.createGain()
        hatGain.gain.value = 0.03
        hat.connect(hatFilter)
        hatFilter.connect(hatGain)
        hatGain.connect(radioGainNode)
        hat.start(ctx.currentTime)
        noteIndex = (noteIndex + 1) % bassNotes.length
        radioTimer = setTimeout(playBeat, 500)
      }
      playBeat()
    },
    // K-Rose: Country — twangy major chord arpeggios
    country: () => {
      const chords = [
        [261.63, 329.63, 392.00], // C major
        [293.66, 369.99, 440.00], // D major
      ]
      let chordIndex = 0
      const playArp = () => {
        const chord = chords[chordIndex]
        chord.forEach((freq, i) => {
          const osc = ctx.createOscillator()
          const g = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.value = freq
          const t = ctx.currentTime + i * 0.12
          g.gain.setValueAtTime(0, t)
          g.gain.linearRampToValueAtTime(0.07, t + 0.02)
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.6)
          osc.connect(g)
          g.connect(radioGainNode)
          osc.start(t)
          osc.stop(t + 0.65)
          radioOscillators.push(osc)
        })
        chordIndex = (chordIndex + 1) % chords.length
        radioTimer = setTimeout(playArp, 2500)
      }
      playArp()
    },
    // K-JAH: Reggae — offbeat skank rhythm with major chords
    reggae: () => {
      const chords = [
        [261.63, 329.63], // C
        [220.00, 277.18], // Am
        [293.66, 369.99], // D
        [261.63, 329.63], // C
      ]
      let chordIndex = 0
      const playSkank = () => {
        const chord = chords[chordIndex]
        for (const freq of chord) {
          const osc = ctx.createOscillator()
          const g = ctx.createGain()
          osc.type = 'square'
          osc.frequency.value = freq
          // Short staccato hit
          g.gain.setValueAtTime(0.04, ctx.currentTime)
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
          osc.connect(g)
          g.connect(radioGainNode)
          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + 0.1)
          radioOscillators.push(osc)
        }
        chordIndex = (chordIndex + 1) % chords.length
        radioTimer = setTimeout(playSkank, 400)
      }
      playSkank()
    },
    // Master Sounds: Rare Groove — smooth jazz chord pad
    jazz: () => {
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [293.66, 369.99, 440.00, 554.37], // Dm7
      ]
      let chordIndex = 0
      const playPad = () => {
        const chord = chords[chordIndex]
        for (const freq of chord) {
          const osc = ctx.createOscillator()
          const g = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.value = freq
          g.gain.setValueAtTime(0, ctx.currentTime)
          g.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.3)
          g.gain.setValueAtTime(0.03, ctx.currentTime + 1.5)
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5)
          osc.connect(g)
          g.connect(radioGainNode)
          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + 2.6)
          radioOscillators.push(osc)
        }
        chordIndex = (chordIndex + 1) % chords.length
        radioTimer = setTimeout(playPad, 3000)
      }
      playPad()
    },
    // SF-UR: House Music — four-on-the-floor kick + synth stab
    house: () => {
      const stabNotes = [523.25, 659.25, 783.99, 659.25] // C5, E5, G5, E5
      let beatIndex = 0
      const playBeat = () => {
        // Kick drum (every beat)
        const kick = ctx.createOscillator()
        const kickGain = ctx.createGain()
        kick.type = 'sine'
        kick.frequency.setValueAtTime(150, ctx.currentTime)
        kick.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1)
        kickGain.gain.setValueAtTime(0.15, ctx.currentTime)
        kickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
        kick.connect(kickGain)
        kickGain.connect(radioGainNode)
        kick.start(ctx.currentTime)
        kick.stop(ctx.currentTime + 0.2)
        radioOscillators.push(kick)

        // Synth stab (every 2nd beat)
        if (beatIndex % 2 === 0) {
          const stab = ctx.createOscillator()
          const stabGain = ctx.createGain()
          stab.type = 'sawtooth'
          stab.frequency.value = stabNotes[(beatIndex / 2) % stabNotes.length]
          stabGain.gain.setValueAtTime(0.05, ctx.currentTime)
          stabGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
          const stabFilter = ctx.createBiquadFilter()
          stabFilter.type = 'lowpass'
          stabFilter.frequency.value = 2000
          stab.connect(stabFilter)
          stabFilter.connect(stabGain)
          stabGain.connect(radioGainNode)
          stab.start(ctx.currentTime)
          stab.stop(ctx.currentTime + 0.25)
          radioOscillators.push(stab)
        }

        beatIndex = (beatIndex + 1) % 4
        radioTimer = setTimeout(playBeat, 350)
      }
      playBeat()
    },
    // Bounce FM: Funk — slap bass line
    funk: () => {
      const bassLine = [82.41, 98.00, 110.00, 98.00, 82.41, 73.42, 82.41, 110.00] // E2, G2, A2
      let noteIdx = 0
      const playBass = () => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'sawtooth'
        osc.frequency.value = bassLine[noteIdx]
        // Slap envelope: sharp attack, quick decay
        g.gain.setValueAtTime(0.1, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(3000, ctx.currentTime)
        filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15)
        osc.connect(filter)
        filter.connect(g)
        g.connect(radioGainNode)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.2)
        radioOscillators.push(osc)
        noteIdx = (noteIdx + 1) % bassLine.length
        radioTimer = setTimeout(playBass, 300)
      }
      playBass()
    },
    // Playback FM: Old School Hip Hop — boom-bap drum pattern
    boomBap: () => {
      const kickPattern = [1, 0, 0, 1, 0, 0, 1, 0] // 8-step pattern
      const snarePattern = [0, 0, 1, 0, 0, 0, 1, 0]
      let step = 0
      const playStep = () => {
        // Kick
        if (kickPattern[step]) {
          const kick = ctx.createOscillator()
          const kg = ctx.createGain()
          kick.type = 'sine'
          kick.frequency.setValueAtTime(160, ctx.currentTime)
          kick.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08)
          kg.gain.setValueAtTime(0.12, ctx.currentTime)
          kg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
          kick.connect(kg)
          kg.connect(radioGainNode)
          kick.start(ctx.currentTime)
          kick.stop(ctx.currentTime + 0.15)
          radioOscillators.push(kick)
        }
        // Snare
        if (snarePattern[step]) {
          const snBufSize = Math.floor(ctx.sampleRate * 0.1)
          const snBuf = ctx.createBuffer(1, snBufSize, ctx.sampleRate)
          const snData = snBuf.getChannelData(0)
          for (let i = 0; i < snBufSize; i++) snData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (snBufSize * 0.15))
          const sn = ctx.createBufferSource()
          sn.buffer = snBuf
          const snGain = ctx.createGain()
          snGain.gain.value = 0.06
          sn.connect(snGain)
          snGain.connect(radioGainNode)
          sn.start(ctx.currentTime)
        }
        step = (step + 1) % 8
        radioTimer = setTimeout(playStep, 250)
      }
      playStep()
    },
  }

  const jingleFn = jingles[genreId]
  if (jingleFn) jingleFn()
}

/** Stop the current radio jingle and clean up */
export function stopRadioJingle() {
  if (radioTimer) {
    clearTimeout(radioTimer)
    radioTimer = null
  }
  for (const osc of radioOscillators) {
    try { osc.stop() } catch { /* already stopped */ }
  }
  radioOscillators = []
  if (radioGainNode) {
    try {
      const ctx = getCtx()
      radioGainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.05)
    } catch { /* cleanup */ }
    setTimeout(() => {
      radioGainNode = null
    }, 200)
  }
}

/** Set radio jingle volume (0-1) */
export function setRadioVolume(vol) {
  if (radioGainNode) {
    const ctx = getCtx()
    radioGainNode.gain.setTargetAtTime(vol * 0.04, ctx.currentTime, 0.1)
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
