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
