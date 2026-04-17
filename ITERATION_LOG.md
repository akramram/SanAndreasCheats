# Visual Iteration Log

This document tracks all visual iterations made to the San Andreas Cheats project.

---

## Baseline (Pre-Iteration)
**Date:** 2026-04-15
**Branch:** main

### Current State
- Basic amber text on black background
- Simple cheat-pop animation (scale + opacity + shadow)
- Particle fireworks on match (28 particles, 6 colors)
- Pulsing "Enter cheat code" prompt
- Minimal styling on history modal
- CJ SVG avatar displayed statically
- Tailwind CSS 4 for layout, custom CSS for animations

### Known Issues
- No pixel-art fonts loaded
- Background is flat black
- Input display is plain text with spaces
- History modal uses default gray styling (doesn't match GTA theme)
- No screen shake or dramatic effects on cheat match
- No idle animations

---

## Iteration 1 — Pixel Fonts, Glowing Text, Scanline Overlay, Animated Background
**Date:** 2026-04-15
**Branch:** visual-iterations
**Commit:** feat(visual): iteration 1 - pixel fonts, glowing text, scanline overlay, animated background

### Planned
- Add pixel fonts (Press Start 2P, VT323) via Google Fonts
- Apply pixel fonts to cheat display, input buffer, and headings
- Add animated pixel-art background (starfield with twinkling)
- Add text-shadow glow effects on input text
- Add scanline CRT overlay effect

### What Changed (Files Modified)
- **index.html** — Added Google Fonts preconnect and stylesheet links for "Press Start 2P" and "VT323"
- **src/index.css** — Added `.font-pixel` and `.font-vt` utility classes, `.scanlines` CRT overlay with animated shifting scanlines, `.pixel-stars` animated starfield background with twinkling effect
- **src/App.css** — Added 12 new animation/style classes:
  - `screen-shake` — screen shake on cheat match (400ms)
  - `screen-flash` — amber flash overlay on cheat match
  - `cj-bob` — idle bobbing animation for CJ avatar
  - `pixel-border` — retro pixel-art border with inset/outset glow
  - `input-glow` — pulsing amber glow on input text
  - `pixel-cursor` — blinking pixel cursor after input
  - `match-glow` — green glow pulse on matched cheat name
  - `char-appear` — per-character fade-in animation for input
  - `float-text` — ambient floating cheat code names in background
  - `time-flash` — green terminal flash for timer display
  - `pixel-modal-*` — full pixel-art styled history modal (backdrop, container, header, items)
  - `vignette` — dark vignette overlay for atmospheric depth
- **src/pages/Home.jsx** — Applied all new visual classes to UI elements:
  - Main container: `scanlines` overlay
  - Background layers: `pixel-stars`, `vignette`, floating cheat text
  - Match display: `pixel-border`, `match-glow`, `screen-shake`, `screen-flash`, `time-flash`
  - Input display: `input-glow`, `pixel-cursor`, `char-appear` per character
  - CJ avatar: `cj-bob` idle animation
  - Prompt: pixel font styling
  - History modal: fully restyled with `pixel-modal-*` classes

### What Improved
- Background transformed from flat black to atmospheric starfield with twinkling
- Input text now glows and pulses while typing
- Each character appears with a subtle animation
- Cheat matches trigger screen shake + amber flash + enhanced glow
- CJ avatar now bobs gently (idle animation)
- Scanline overlay adds retro CRT feel
- Vignette adds cinematic depth
- Floating cheat codes drift through background for ambiance
- History modal fully themed with pixel-art borders and styling
- Timer display has green terminal flash effect

### Issues
- None. Build and lint pass cleanly.
- All existing game logic (input handling, cheat matching, gamepad API) untouched.

### Next Iteration
- **Iteration 2:** Enhanced cheat match celebration — bigger particle effects, pixel-art explosion bursts, more dramatic screen shake, possible pixel-art confetti
- **Iteration 3:** CJ avatar reactions (react to correct/wrong input, celebration pose on match)
- **Iteration 4:** Loading/start screen with retro GTA SA aesthetic

---

## Iteration 2 — Enhanced Cheat Match Celebration
**Date:** 2026-04-15
**Branch:** visual-iterations
**GitHub Issue:** #4 — [🎨 Visual Iteration 2: Enhanced Cheat Match Celebration](https://github.com/akramram/SanAndreasCheats/issues/4)

### Planned
- Change particles from round circles to pixel-art squares with varying sizes
- Add a "CHEAT ACTIVATED" retro banner that slams in on match
- Add pixel confetti rain effect
- More dramatic screen shake with increased intensity
- Increase particle count from 28 to 40 with more colors

### What Changed (Files Modified)
- **src/App.css** — Updated and added:
  - Enhanced `screen-shake` animation: increased displacement (up to ±6px), added 13 keyframe steps, extended to 500ms for more impactful rumble
  - Replaced `.particle` styles: removed `border-radius: 9999px` (was circles), added `border-radius: 0` for pixel squares, added `image-rendering: pixelated`, added CSS custom properties `--size` and `--duration`, particles now rotate 45deg during burst
  - New size classes: `.particle-sm` (5px, 700ms), `.particle-md` (8px, 900ms), `.particle-lg` (12px, 1100ms) for varied particle sizes
  - New `banner-slam` keyframe animation: dramatic scale+translate entrance with overshoot bounce, green glow text-shadow, 1.4s duration with cubic-bezier easing
  - New `.cheat-banner` class: fixed position, Press Start 2P font, green color (#4ade80), responsive sizing with clamp(), z-index 150
  - New `confetti-fall` keyframe: fall from top with rotation
  - New `.confetti-piece` class: pixelated square confetti with configurable size, position, color, rotation, and fall speed via CSS variables
- **src/pages/Home.jsx** — Updated and added:
  - New state: `confettiPieces` (array of confetti data), `bannerKey` (to re-trigger banner animation)
  - Enhanced `triggerFireworks()`: 40 particles (up from 28), 8 colors (added purple and orange), randomized angle offsets for organic spread, increased travel distance, particle size variety cycling through sm/md/lg, spawns 30 pixel confetti pieces with random positions/sizes/colors/speeds, triggers banner re-render via key increment
  - Particle rendering now applies `sizeClass` for varied sizes
  - New "CHEAT ACTIVATED" banner element with ★ decorations, keyed on `bannerKey` for re-triggering
  - New confetti rain rendering with 30 pieces using CSS variable-driven styling

### What Improved
- Particles transformed from uniform circles to pixel-art squares with 3 size variants (small/medium/large)
- Particle explosion now has 40 particles (up from 28) with randomized angles for a more organic burst
- 8 colors instead of 6 — added purple (#a78bfa) and orange (#fb923c) for more visual variety
- Particles now rotate 45deg as they fly out, adding a spinning pixel-chunk feel
- "CHEAT ACTIVATED" banner dramatically slams in from above with bounce/overshoot easing, green glow, then floats up and fades — adds a satisfying visual punctuation to each match
- 30 pixel confetti pieces rain down from the top of the screen in 8 colors with varied sizes, speeds, and rotation
- Screen shake is more intense (±6px displacement vs ±4px) with more keyframe steps for a chunkier retro feel
- Overall celebration sequence: screen flash → shake → banner slam → particle burst → confetti rain

### Issues
- None. Build and lint pass cleanly.
- All existing game logic (input handling, cheat matching, gamepad API) untouched.

### Next Iteration
- **Iteration 3:** CJ avatar reactions — reactive animations to correct/wrong input, celebration pose on match, subtle state-driven animations

---

## Iteration 3 — Scrolling Cityscape & Ambient Atmosphere
**Date:** 2026-04-16
**Branch:** visual-iterations

### Planned
- Scrolling pixel-art cityscape silhouette (parallax, 2 layers)
- Shooting stars in the night sky
- Ambient floating dust/pollen particles
- Atmospheric fog layer
- Amber horizon glow

### What Changed (Files Modified)
- **src/index.css** — Added:
  - `.pixel-cityscape` with `::before` (back layer, darker, 60s scroll) and `::after` (front layer, lighter, 40s scroll) using SVG mask for building silhouettes
  - `.pixel-cityscape-lights` — tiny amber window lights on buildings with flicker animation
  - `cityscape-scroll-back` and `cityscape-scroll-front` keyframes for parallax scrolling
  - `lights-flicker` keyframe for window light variation
  - `.cityscape-fog` — gradient fog layer at the base of buildings
  - `.horizon-glow` — subtle amber radial glow at the horizon line
- **src/App.css** — Added:
  - `dust-float` keyframe and `.ambient-dust` class — floating pixel dust with configurable drift, opacity, and duration via CSS variables
  - `shooting-star` keyframe and `.shooting-star` class — diagonal streak with configurable position, duration, and delay
- **src/pages/Home.jsx** — Added:
  - 3 shooting star elements with varied positions and timings
  - Cityscape container and cityscape-lights overlay
  - Horizon glow and cityscape fog layers
  - 8 ambient dust particles with varied parameters

### What Improved
- Background transformed from simple starfield to a rich Los Santos-inspired nightscape
- Parallax cityscape with 2 depth layers scrolling at different speeds creates depth
- Tiny window lights on buildings flicker realistically
- Shooting stars streak across the sky periodically
- Floating dust particles add atmospheric warmth
- Fog and horizon glow ground the scene and create cinematic depth

### Issues
- None. Build and lint pass cleanly.
- All existing game logic (input handling, cheat matching, gamepad API) untouched.

### Next Iteration
- **Iteration 4:** CJ avatar reactions — reactive animations to typing, celebration pose on match, speech bubble

---

## Iteration 4 — CJ Avatar Reactions & Speech Bubble
**Date:** 2026-04-17
**Branch:** visual-iterations
**GitHub Issue:** #6 — [🎨 Visual Iteration 4: CJ Avatar Reactions](https://github.com/akramram/SanAndreasCheats/issues/6)

### Planned
- CJ reacts to user typing (subtle lean/attention animation)
- CJ celebration pose on cheat match (jump, glow, scale up)
- CJ idle state returns smoothly after match fades
- Speech bubble appears near CJ on match

### What Changed (Files Modified)
- **src/App.css** — Added:
  - `cj-attention` keyframe: subtle rocking motion with slight rotation and scale (0.6s loop) when user is typing
  - `.cj-attention` class: applies the attention animation with enhanced amber glow
  - `cj-celebrate` keyframe: multi-bounce jump (1.2s) with scale pulses and green glow transition — bounces up to 30px, scales to 1.2x, shifts glow from amber to green
  - `.cj-celebrate` class: one-shot celebration animation
  - `speech-pop` keyframe: bubble pops in from below with overshoot bounce
  - `speech-fade` keyframe: bubble fades upward and shrinks
  - `.cj-speech-bubble`: pixel-art styled speech bubble with Press Start 2P font, amber border, dark background, triangular pointer (CSS triangles via ::before and ::after)
  - `.cj-speech-bubble.fade-out`: triggers the fade animation
- **src/pages/Home.jsx** — Added/updated:
  - New state: `cjMood` ('idle' | 'typing' | 'celebrating'), `cjSpeech` (string or null), `speechFading` (boolean)
  - `clampAndSet()`: sets `cjMood` to 'typing' on any input
  - Cheat match block: sets `cjMood` to 'celebrating', picks random phrase from ['YEAH!', 'AWW YEAH!', 'GROVE ST!', 'NICE ONE!', 'HELL YEAH!', 'SWEET!', 'OOH YEAH!'], triggers speech bubble fade at 1.5s, clears at 2s, returns CJ to 'typing' at 1.2s
  - `resetOnInactivity()`: resets `cjMood` to 'idle', clears speech state
  - CJ avatar JSX: dynamic class switching between `cj-bob` (idle), `cj-attention` (typing), `cj-celebrate` (matched)
  - Speech bubble element: renders above CJ when `cjSpeech` is set, with `fade-out` class for exit

### What Improved
- CJ now has 3 reactive states: idle bobbing → attentive rocking when typing → celebration bounce on cheat match
- Speech bubble with GTA-themed phrases ("GROVE ST!", "HELL YEAH!") pops in on match
- Green glow on CJ during celebration matches the cheat match color scheme
- Smooth state transitions: idle → typing (immediate), celebrating → typing (after 1.2s), typing → idle (on inactivity reset)
- Speech bubble has pixel-art styling with pointed triangle, matching the overall aesthetic

### Issues
- None. Build and lint pass cleanly.
- All existing game logic (input handling, cheat matching, gamepad API) untouched.

### Next Iteration
- **Iteration 5:** Retro-styled HUD elements — streak counter, total score display with pixel font
- **Iteration 6:** Transitions between states (start → play → result)
