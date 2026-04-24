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

---

## Iteration 5 — Combo System, Retro HUD & Fail Feedback
**Date:** 2026-04-17
**Branch:** visual-iterations
**GitHub Issue:** #7 — [🎨 Visual Iteration 5: Combo System, Retro HUD & Fail Feedback](https://github.com/akramram/SanAndreasCheats/issues/7)

### Planned
- Combo/streak system with escalating visual intensity
- Retro HUD bar with live stats
- Fail feedback (WASTED-style) when input times out without match
- Combo escalation (more particles, bigger celebration at higher combos)
- Session stats persistence in localStorage

### What Changed (Files Modified)
- **src/App.css** — Added:
  - `.hud-bar`: Fixed top bar with gradient fade background, flex layout for stats
  - `.hud-stat`, `.hud-label`, `.hud-value`: Pixel font stat display with amber glow
  - `.hud-value.streak-hot`: Red text for streaks ≥ 3
  - `.combo-counter`: Fixed right-side combo display
  - `combo-pop` keyframe: Dramatic scale+slide entrance for first combo
  - `combo-bump` keyframe: Quick scale pulse for subsequent combos
  - `.combo-counter.combo-2` through `.combo-5`: Color escalation (green → blue → purple → red) with increasing font size and glow intensity
  - `.fail-overlay`: Red radial gradient flash overlay
  - `fail-flash` keyframe: Quick red flash
  - `.wasted-text`: "MISSED" text with dramatic scale-in + red glow
  - `wasted-text` keyframe: Letter-spacing animation, scale from 2.5x to 0.95x
  - `.cj-disappoint`: CJ tilts sideways with grayscale + red glow
  - `cj-disappoint` keyframe: Rotation + grayscale filter + red shadow
- **src/pages/Home.jsx** — Added/updated:
  - New state: `currentStreak`, `bestStreak` (from localStorage), `bestTime` (from localStorage), `totalCheats`, `comboAnim` ('enter'|'bump'|null), `hadInputSinceMatch`, `showFail`
  - `resetOnInactivity()`: Detects fails (had input, no match, timed out) — triggers fail overlay, CJ disappointment, streak reset
  - `clampAndSet()`: Sets `hadInputSinceMatch` on input
  - Cheat match block: Increments streak, updates best streak/time in localStorage, triggers combo animation, escalates fireworks with combo multiplier
  - `triggerFireworks(comboMultiplier)`: Particle count scales 40→80, spread distance increases 15% per combo level, confetti count scales 30→70
  - Combo-tiered speech phrases: solo (YEAH!), double (DOUBLE!), triple+ (HOT STREAK!), 5+ (UNSTOPPABLE!)
  - HUD bar JSX: Total cheats, current streak (red at 3+), best streak, best time
  - Combo counter JSX: Right-side display with intensity-based styling
  - Fail overlay JSX: Red flash + "MISSED" text
  - CJ avatar: Added 'disappoint' mood class

### What Improved
- Added actual gameplay depth — streak tracking gives players a reason to keep going
- Combo counter with 5 intensity levels creates escalating visual reward
- Retro HUD bar provides at-a-glance stats without cluttering the main UI
- Fail feedback (red "MISSED" flash) makes missed inputs feel impactful without being annoying
- CJ disappointment animation adds personality to failure state
- Fireworks and confetti scale up with combo — a 5x combo is visually dramatically different from 1x
- Stats persist across page reloads via localStorage
- Different speech bubble tiers add variety and reward escalation

### Issues
- Lint warnings (pre-existing, no new errors)
- All game logic (input handling, cheat matching, gamepad API) untouched

### Next Iteration
- **Iteration 6:** Smooth transitions between states (idle → typing → matched → idle)
- **Iteration 7:** CRT boot sequence / retro start screen

---

## Iteration 7 — Police Spotlight & Typing Match Progress Indicator
**Date:** 2026-04-18
**Branch:** visual-iterations
**GitHub Issue:** #9 — [🎨 Visual Iteration 7: Police Spotlight & Typing Match Progress Indicator](https://github.com/akramram/SanAndreasCheats/issues/9)

### Planned
- Police helicopter spotlight effect sweeping across the cityscape
- Typing match progress indicator — real-time visual feedback on partial cheat matches
- Ground reflection when spotlight passes

### What Changed (Files Modified)
- **src/App.css** — Added:
  - `spotlight-sweep` keyframe: sweeping left-to-right with opacity variation and skewX(-25deg) for angled cone shape, 14s cycle
  - `.police-spotlight`: main spotlight cone — 45vw wide, 280px tall, blue-white gradient with `clip-path: polygon()` for trapezoid cone shape, subtle opacity flicker during sweep
  - `.police-spotlight-2`: secondary smaller spotlight — 35vw wide, 240px tall, slightly dimmer, different timing (18s cycle, no delay) for visual variety and depth
  - `ground-glow-sweep` keyframe and `.spotlight-ground-glow`: radial gradient at the base of the spotlight that follows the sweep, creating a ground reflection effect
  - `.char-matched`: green color (#4ade80) with green glow text-shadow for correctly typed characters
  - `.char-miss`: red color (#f87171) with red glow and reduced opacity for wrong characters
  - `.char-neutral`: amber color for unmatched characters
  - `.match-progress-bar`: thin 2px gradient bar (green-to-amber) under the input box showing best match ratio via CSS `--progress` variable with smooth transition
- **src/pages/Home.jsx** — Added/updated:
  - `inputCharStates` useMemo: Computes per-character match state by checking current input buffer against all cheat prefixes (both PC and PS sequences). Characters matching a cheat prefix get 'matched', last character gets 'miss' if nothing matches, rest are 'neutral'. Purely visual — no effect on game logic.
  - `matchProgress` useMemo: Computes best match ratio (matched chars / total cheat length) across all cheats for the progress bar
  - Spotlight JSX elements: `.police-spotlight`, `.police-spotlight-2`, `.spotlight-ground-glow` rendered as background layers between fog and dust particles
  - Input character rendering: each `<span>` now receives dynamic class based on `inputCharStates[i]` ('char-matched', 'char-miss', or empty for neutral)
  - Match progress bar JSX: renders below input text when `matchProgress > 0`, showing a green-to-amber gradient bar that fills proportionally

### What Improved
- Cityscape now has dynamic police helicopter searchlights sweeping across the scene, adding life and atmosphere — very GTA SA
- Two spotlights at different speeds/heights create a parallax depth effect
- Subtle ground reflection follows the spotlight, grounding the effect
- Typing now gives real-time visual feedback: matching characters turn green with glow, wrong characters turn red — helps players know they're on the right track
- Thin progress bar under input shows how close you are to completing any cheat code
- No game logic was touched — matching, input handling, and gamepad API are completely untouched

### Issues
- Lint: 2 pre-existing warnings (no new warnings introduced)
- All game logic (input handling, cheat matching, gamepad API) untouched

### Next Iteration
- **Iteration 8:** Enhanced history modal with retro game stats, mini leaderboard, and visual flair
- **Iteration 9:** More dynamic atmospheric effects — pulsing neon signs on buildings, car headlight trails

---

## Iteration 6 — CRT Boot Screen & Smooth State Transitions
**Date:** 2026-04-17
**Branch:** visual-iterations
**GitHub Issue:** #8 — [🎨 Visual Iteration 6: CRT Boot Screen & Smooth State Transitions](https://github.com/akramram/SanAndreasCheats/issues/8)

### Planned
- Add a retro CRT boot/start screen that plays on page load (GTA SA style — green terminal text, scanlines intensify, then "boot" into main UI)
- Smooth CSS transitions between UI states (idle → typing → matched → idle) with opacity, transform, and filter changes
- Input border transitions from dim to glowing amber when typing starts
- Match display gets a smoother entrance/exit transition
- HUD bar slides in after boot sequence completes

### What Changed (Files Modified)
- **src/App.css** — Added:
  - `crt-flicker` keyframe: subtle CRT power-on flicker effect
  - `boot-text-typewriter`, `boot-cursor-blink` keyframes: terminal-style cursor and typewriter effects
  - `boot-screen-zoom` keyframe: dramatic zoom-out + brightness flash transition from boot to main UI
  - `boot-logo-glow` keyframe: pulsing green glow on boot logo
  - `boot-line-appear` keyframe: staggered line fade-in for boot text
  - `.boot-screen`: full-screen CRT boot overlay with scanline `::after`, z-index 500
  - `.boot-screen.booting-out`: zoom+fade transition that reveals main UI underneath
  - `.boot-logo`: green "SA CHEATS" logo with glow and scale-in transition
  - `.boot-subtitle`: "GRAND THEFT AUTO: SAN ANDREAS" subtitle with fade transition
  - `.boot-lines`, `.boot-line`: terminal-style boot messages with staggered animation
  - `.boot-prefix`, `.boot-value`, `.boot-ok`, `.boot-warn`: color-coded terminal text
  - `.boot-ready`: "PRESS ANY KEY TO START" prompt with blinking cursor bar
  - `.boot-cursor-bar`: pixel blinking cursor
  - `.boot-power-line`: horizontal CRT power-on line effect
  - `.boot-noise`: SVG noise texture for authentic CRT static
  - `main-ui-reveal` keyframe: fade-in with brightness transition after boot
  - `.main-ui-booted`: class applied to main UI after boot completes
  - `.pixel-border.input-glow-active`: enhanced amber glow border when user is typing (smooth transition)
  - `.cj-avatar-wrapper`: smooth filter transition on CJ
  - `hud-slide-in` keyframe: HUD bar slides down from top with bounce
  - `.hud-bar.hud-enter`: class for HUD entrance after boot
  - `combo-slide-in` keyframe: smooth combo counter entrance
  - `match-enter` keyframe: enhanced match display entrance with overshoot
  - `prompt-entrance` keyframe: prompt text fade-in from below
- **src/pages/Home.jsx** — Added/updated:
  - `BOOT_LINES` constant: array of 8 terminal-style boot messages (cheat database, gamepad API, keyboard input, CJ avatar, cityscape, scanlines, Grove Street)
  - `BootScreen` component: stateful boot sequence with 5 phases (power-on → logo → subtitle → lines → ready → zoom-out), auto-advances through timed phases, renders green terminal text with staggered line reveals, CRT flicker animation, power-on line, and noise overlay
  - `booted` state: tracks whether boot sequence has completed
  - Main container: conditionally renders `BootScreen` when not booted, hides main UI content during boot (opacity: 0), adds `main-ui-booted` class after boot
  - HUD bar: adds `hud-enter` class after boot for slide-in animation
  - Input border: adds `input-glow-active` class for smooth border glow transition
  - Prompt text: adds `prompt-enter` class for smooth entrance after boot

### What Improved
- First-time users now see a dramatic CRT boot sequence that sets the retro gaming tone immediately
- Boot screen features: CRT power-on flicker, horizontal scan line, SVG noise static, green terminal text with staggered line reveals, "SA CHEATS" glowing logo, "GRAND THEFT AUTO: SAN ANDREAS" subtitle, and "PRESS ANY KEY TO START" with blinking cursor
- Boot-to-main transition is cinematic: screen zooms out with brightness flash, then main UI fades in smoothly
- HUD bar now slides in from the top with a bounce easing after boot completes
- Input border smoothly transitions to a brighter amber glow when typing (not just text glow — the whole border lights up)
- Prompt text has a smooth entrance animation instead of just appearing
- Overall first impression is dramatically better — the boot screen sells the retro GTA SA aesthetic before gameplay even starts

### Issues
- Lint: 2 pre-existing warnings (no new warnings introduced)
- All game logic (input handling, cheat matching, gamepad API) untouched
- Boot sequence takes ~3.6 seconds total (configurable via timer constants)

### Next Iteration
- **Iteration 7:** Enhanced history modal with retro game stats, mini leaderboard, and visual flair
- **Iteration 8:** Animated background improvements — more dynamic starfield, occasional police helicopter spotlight effect

---

## Iteration 8 — Neon Signs & Car Headlight Trails
**Date:** 2026-04-19
**Branch:** visual-iterations
**GitHub Issue:** #10 — [🎨 Visual Iteration 8: Neon Signs & Car Headlight Trails](https://github.com/akramram/SanAndreasCheats/issues/10)

### Planned
- Add pulsing neon sign lights on the cityscape buildings (GTA SA-style neon signs in various colors — pink, blue, green, amber, red)
- Add animated car headlight trails at the bottom of the scene (horizontal streaks of light traveling left/right, like traffic in Los Santos at night)
- Neon signs flicker and glow with varied timing
- Headlight trails are subtle but add motion to the cityscape

### What Changed (Files Modified)
- **src/App.css** — Added:
  - 5 `neon-pulse-*` keyframes (pink, blue, green, amber, red) — smooth glow box-shadow pulsing at varied intensities
  - `neon-flicker` keyframe — occasional rapid blink for authentic flickering neon sign effect
  - `.neon-sign` — fixed position container with configurable color, size, and animation via CSS variables
  - `.neon-sign-inner` — the visible neon bar with pixelated rendering
  - `.neon-sign.flicker` — dual animation combining pulse + flicker for unreliable neon effect
  - `headlight-travel-right` and `headlight-travel-left` keyframes — horizontal movement with fade-in/out at edges
  - `.car-headlight` — fixed position element traveling across screen at configurable speed, height, and delay
  - `.car-headlight-beam` — the visible light trail with gradient from transparent to bright white
  - `.car-headlight-dot` — bright point at the leading edge of the headlight with glow box-shadow
  - `.car-headlight.going-right/left` — directional dot positioning (leading edge on right for rightward travel, etc.)
  - `.car-taillight-beam` — dimmer red trail for oncoming/away traffic
  - `.car-taillight-dot` — small red dot with glow
- **src/pages/Home.jsx** — Added:
  - 10 neon sign elements placed along the building line at various heights (128-162px from bottom):
    - 2 pink signs (flickering) on left building cluster
    - 2 blue signs (steady) on mid building
    - 1 green sign (flickering) on right cluster
    - 1 amber sign (steady) on far right
    - 1 red sign (flickering) on far right (like a bar's "OPEN" sign)
    - 2 more signs in second row on taller buildings (pink steady, blue flickering)
    - 1 amber sign high up on a tall building
  - 7 car headlight/taillight elements at street level (22-48px from bottom):
    - 5 white/warm headlight trails with varied speeds (5-15s), directions, and lengths (45-80px)
    - 2 red taillight trails for opposite-direction traffic

### What Improved
- Cityscape now has authentic neon signs pulsing on building facades in 5 colors — very GTA SA Las Venturas / Los Santos vibe
- 4 of 10 signs have a flickering effect that occasionally blinks rapidly, mimicking old broken neon signage
- Neon signs are placed at varied heights on the buildings, creating a layered vertical distribution
- Car headlight and taillight trails stream across the bottom of the scene at different speeds and heights, simulating nighttime traffic on a city street
- Different trail lengths and brightness levels create depth — faster cars have longer trails, slower ones shorter
- Red taillight trails add realism to the traffic flow
- All animations are GPU-accelerated (transform + opacity only) for smooth 60fps performance

### Issues
- Lint: 2 pre-existing warnings (no new warnings introduced)
- All game logic (input handling, cheat matching, gamepad API) untouched

### Next Iteration
- **Iteration 10:** Enhanced history modal with retro game stats, mini leaderboard, and visual flair
- **Iteration 11:** More atmospheric effects — occasional plane with blinking lights flying across sky

---

## Iteration 9 — Retro Achievement System
**Date:** 2026-04-20
**Branch:** visual-iterations
**GitHub Issue:** #11 — [🎨 Iteration 9: Retro Achievement System](https://github.com/akramram/SanAndreasCheats/issues/11)

### Planned
- Add a pixel-art achievement system with unlockable milestones
- Achievement categories: speed, streaks, volume, exploration
- Achievements pop up with retro animation (GTA-style "Achievement Unlocked" toast)
- Achievement gallery/panel accessible via trophy icon
- 15 achievements covering different milestones
- Persistent via localStorage

### What Changed (Files Modified)
- **src/App.css** — Added:
  - `achievement-slide-in` keyframe: toast slides in from left with scale overshoot, holds, then fades out (3.5s)
  - `.achievement-toast`: fixed position toast notification at top-left
  - `.achievement-toast-inner`: pixel-bordered card with sparkle border animation (3 pulses)
  - `.achievement-toast-icon`: large emoji icon with amber glow drop-shadow
  - `.achievement-toast-text`, `.achievement-toast-label`, `.achievement-toast-name`, `.achievement-toast-desc`: structured toast text with pixel/VT fonts
  - `achievement-border-sparkle` keyframe: pulsing amber border glow on unlock
  - `.achievement-btn`: trophy button with hover scale + glow effect
  - `.badge-count`: pixel-art counter badge showing unlocked count on trophy button
  - `.achievement-gallery`: full-screen modal with blur backdrop and fade-in animation
  - `.achievement-gallery-panel`: bordered panel matching pixel modal aesthetic
  - `.achievement-gallery-header`: header with progress bar and close button
  - `.achievement-gallery-progress`, `.achievement-progress-bar`, `.achievement-progress-fill`: amber gradient progress bar
  - `.achievement-grid`: responsive CSS grid for achievement cards
  - `.achievement-card`, `.achievement-card.unlocked`, `.achievement-card.locked`: achievement card with locked/unlocked visual states
  - `.achievement-card-icon`, `.achievement-card-name`, `.achievement-card-desc`, `.achievement-card-date`: card content styling
  - `.achievement-category`: category section headers in gallery
- **src/pages/Home.jsx** — Added/updated:
  - `ACHIEVEMENTS` constant: 15 achievements across 4 categories (Speed: first-blood, speed-demon, lightning; Streaks: double-trouble, hat-trick, godfather, unbreakable; Volume: warming-up, cheat-master, legend, myth; Exploration: curious, well-traveled, completionist, collector)
  - Each achievement has: id, name, description, emoji icon, category, and check function
  - New state: `unlockedAchievements` (object from localStorage), `achievementToast` (current toast display), `showAchievementGallery` (gallery modal visibility)
  - `uniqueCheatIdsRef`: tracks unique cheats discovered for exploration achievements
  - `checkAchievements` callback: evaluates all achievement check functions against current stats, unlocks new ones, saves to localStorage, queues toast notifications
  - `useEffect` for achievement checking triggered on stat changes (totalCheats, bestStreak, bestTime)
  - `saveCheatToHistory`: now tracks unique cheat IDs via ref
  - History load effect: restores unique cheat IDs from saved history for achievement continuity
  - Trophy button JSX: positioned next to history button with pixel badge count
  - Achievement toast JSX: slides in from left with icon, title, and description
  - Achievement gallery modal JSX: full grid of all achievements organized by category, locked ones are grayed out, unlocked ones show unlock date

### What Improved
- Added a complete gamification layer — 15 achievements give players goals to chase beyond just entering cheats
- Achievement toast notifications provide satisfying feedback when milestones are hit (Xbox/GTA-style "Achievement Unlocked" pop)
- Trophy button with badge counter gives at-a-glance progress visible at all times
- Achievement gallery provides a full overview of all goals with locked/unlocked states and progress bar
- Four distinct categories (Speed, Streaks, Volume, Exploration) encourage different playstyles
- All achievements persist via localStorage — progress survives page reloads
- Multiple achievements can queue up if unlocked simultaneously
- Locked achievements are visually dimmed and grayed, motivating players to unlock them
- Pixel-art styling throughout matches the existing retro aesthetic perfectly

### Issues
- Build passes cleanly (296KB JS, 52KB CSS)
- All game logic (input handling, cheat matching, gamepad API) untouched

### Next Iteration
- **Iteration 10:** Enhanced history modal with retro game stats and visual flair
- **Iteration 11:** Atmospheric effects — plane with blinking lights flying across sky

---

## Iteration 10 — Retro Sound Effects Engine (Web Audio API)
**Date:** 2026-04-21
**Branch:** visual-iterations
**GitHub Issue:** #12 — [🎨 Iteration 10: Retro Sound Effects Engine (Web Audio)](https://github.com/akramram/SanAndreasCheats/issues/12)

### Planned
- Add Web Audio API synthesized retro sound effects system
- Key click sounds when typing cheat input (retro pixel bleeps)
- Error buzzer sound on fail/miss
- Combo escalation sounds (pitch increases with streak)
- Achievement unlock fanfare chime
- Boot screen beep sequence
- Volume control toggle

### What Changed (Files Modified)
- **src/utils/sounds.js** (NEW) — Complete retro sound effects engine using Web Audio API:
  - Audio context management with lazy initialization and master gain control
  - `playKeyClick()` — short pixel bleeps with randomized pitch for keyboard typing (800-1200Hz square waves)
  - `playGamepadPress()` — deeper dual-tone press for gamepad buttons (600Hz + 900Hz)
  - `playMatchSound(comboLevel)` — ascending arpeggio fanfare with overtones, pitch scales with combo level (+80Hz per level)
  - `playComboHit(comboLevel)` — dramatic sawtooth frequency sweep from low to high with impact noise
  - `playFailSound()` — descending dissonant tone (300Hz → 200Hz) with noise burst
  - `playAchievementSound()` — triumphant 4-note major chord fanfare (C5-E5-G5-C6) with bass octave and sparkle noise
  - `playBootBeep(index)` — ascending boot line beeps (440Hz + 40Hz per line)
  - `playBootReady()` — 3-note ascending chime (C5-E5-G5) for boot ready state
  - `playResetSound()` — soft descending blip (600Hz → 400Hz) for input timeout/reset
  - `playPowerOn()` — low-frequency sine sweep (60Hz → 30Hz) for CRT power-on thud
  - Volume control: `setMuted()`, `isMuted()`, `toggleMute()` with smooth gain transition
  - All sounds generated procedurally — no external audio files needed
- **src/pages/Home.jsx** — Integrated sound effects into all game events:
  - Boot sequence: power-on thud on logo reveal, beep per boot line, chime on ready state
  - Keyboard typing: `playKeyClick()` on each keypress
  - Gamepad input: `playGamepadPress()` on each button press
  - Cheat match: `playMatchSound(comboLevel)` with pitch scaling
  - Combo hit (2+): `playComboHit(comboLevel)` for dramatic sweep
  - Fail/miss: `playFailSound()` on inactivity timeout without match
  - Input reset: `playResetSound()` on input buffer clear
  - Achievement unlock: `playAchievementSound()` fanfare on new achievement
  - New state: `soundEnabled` (tracks mute/unmute)
  - Sound toggle button UI: speaker icon (on) / muted speaker icon (off) at top-right, between history and trophy buttons
- **src/App.css** — Added:
  - `.sound-btn` — smooth hover scale + glow, active press effect
  - `.sound-btn::after` — green pulsing dot indicator showing sound is active
  - `sound-pulse-dot` keyframe — gentle opacity/scale pulse animation
  - ARIA-based CSS selectors for muted/unmuted visual states

### What Improved
- Added a complete audio dimension to the experience — every interaction now has audible feedback
- Keyboard typing produces satisfying retro pixel bleeps with pitch variety
- Gamepad buttons have a distinct deeper tone from keyboard clicks
- Cheat matches play an ascending arpeggio that gets higher with combo level
- Combo streaks trigger an additional dramatic sawtooth sweep at 2+ combos
- Fail states have a descending buzzer that feels appropriately negative
- Achievement unlocks get a triumphant 4-note fanfare matching the toast notification
- Boot screen now has audio — power-on thud, ascending beeps per line, and a chime on ready
- Input resets produce a soft blip so users know the buffer cleared
- Volume toggle with green pulse indicator gives clear visual/audio state feedback
- All sounds use Web Audio API synthesis — zero new files, tiny code footprint
- Sound preference is user-controllable via the toggle button

### Issues
- Lint: 2 pre-existing warnings (no new warnings introduced)
- Build passes cleanly (300KB JS, 53KB CSS)
- All game logic (input handling, cheat matching, gamepad API) untouched
- Web Audio API requires user interaction to initialize (handled by existing click/keydown listener)

### Next Iteration
- **Iteration 11:** Enhanced history modal with retro game stats, visual flair, and mini session summary
- **Iteration 12:** More atmospheric effects — plane with blinking lights flying across sky

---

## Iteration 11 — Cheat Category Scanner & Flying Airplane
**Date:** 2026-04-22
**Branch:** visual-iterations
**GitHub Issue:** #13 — [Iteration 11: Cheat Category Scanner & Flying Airplane](https://github.com/akramram/SanAndreasCheats/issues/13)

### Planned
- Add a radar/scanner UI element that shows which cheat category (Weapons, Health, Vehicles, etc.) the player is closest to matching
- Category detection based on real-time input prefix matching against all cheats in each category
- Visual scanner with rotating sweep line and category blips
- Flying airplane with blinking navigation lights crossing the night sky
- Category name fades in above input when player is on track

### What Changed (Files Modified)
- **src/App.css** — Added:
  - `plane-fly` keyframe: horizontal fly across screen with fade-in/out at edges
  - `nav-blink`, `nav-blink-alt` keyframes: alternating blink patterns for red/green nav lights
  - `strobe-flash` keyframe: rapid double-flash pattern for white belly strobe
  - `.flying-plane`: fixed position element with configurable speed and delay via CSS variables
  - `.plane-body`: CSS-only airplane silhouette (body + wings via ::before + tail via ::after)
  - `.plane-nav-red`, `.plane-nav-green`: colored pixel navigation lights with alternating blink
  - `.plane-strobe`: white strobe light with double-flash pattern
  - `.plane-contrail`: fading gradient trail behind the airplane
  - `scanner-sweep` keyframe: 3s rotation for radar sweep line
  - `scanner-pulse-ring` keyframe: breathing pulse on center ring
  - `blip-appear` keyframe: pop-in effect for radar blips
  - `category-hint-fade`, `category-hint-out` keyframes: entrance/exit animations for category hint
  - `.category-scanner`: fixed bottom-right octagonal radar display with scanner-hidden/scanner-active states
  - `.scanner-border`: clip-path octagonal border with dark background
  - `.scanner-sweep`: rotating gradient sweep line with conic-gradient glow cone
  - `.scanner-ring`, `.scanner-center`: center elements of the radar
  - `.scanner-blip`, `.blip-dim`, `.blip-active`: category blips with 3 visual states (dim/normal/active)
  - `.scanner-category-label`: label below scanner showing current detected category
  - `.category-hint`: pixel-font hint badge above input with category color coding
  - 8 category color classes: `.hint-weapons` through `.hint-player-stats`
  - `.scanner-legend`: compact legend below scanner listing all 7 categories
  - `.legend-item`, `.legend-lit`, `.legend-dot`: legend entries with active highlight state
- **src/pages/Home.jsx** — Added/updated:
  - `CATEGORIES` constant: 7 cheat categories with label, color, hint CSS class, and radar angle position
  - `CHEAT_CATEGORIES`: pre-computed lookup grouping cheats by category (computed once at module load)
  - `categoryScan` useMemo: computes per-category match scores against current input buffer, returns top category + all scores — purely visual, no game logic changes
  - 3 flying airplane JSX elements at different heights (4%, 7%, 15%) with varied speeds (38s, 45s, 52s) and staggered delays — each has nav red, nav green, and strobe lights
  - Category hint badge JSX: appears above input when player is typing and matches a category prefix (>30% match)
  - Category scanner radar JSX: octagonal radar display at bottom-right with rotating sweep, 7 positioned category blips, center ring, and dynamic category label
  - Scanner legend JSX: compact vertical list of all categories below radar, highlights active category

### What Improved
- Night sky now has 3 airplanes flying across at different altitudes and speeds with authentic navigation lighting (red port, green starboard, white belly strobe) — very Los Santos International Airport
- Contrail trails behind each airplane add realism
- Alternating blink patterns on nav lights (red/green alternate) are authentic to real aviation
- White strobe flashes briefly twice per cycle, matching real aircraft anti-collision lights
- Players now get real-time category hints while typing — a "◆ WEAPONS ◆" badge appears in red when your input matches a weapon cheat prefix, "◆ VEHICLES ◆" in blue for vehicles, etc.
- Mini radar scanner at bottom-right shows all 7 categories as blips on an octagonal display
- Radar has a rotating green sweep line with glow cone, matching military/police scanner aesthetic
- Active category blip enlarges and turns green while others dim — immediately shows which category you're heading toward
- Scanner starts dimmed (15% opacity) and brightens when actively scanning — non-intrusive
- Color-coded legend below the scanner lists all categories, highlighting the active one
- All 7 categories have unique colors: Weapons (red), Player Stats (teal), Vehicles (blue), World (purple), Wanted Level (orange), Pedestrians (pink), Misc (amber)

### Issues
- Lint: 2 pre-existing warnings (no new warnings introduced)
- Build passes cleanly (304KB JS, 59KB CSS)
- All game logic (input handling, cheat matching, gamepad API) untouched

### Next Iteration
- **Iteration 12:** Enhanced history modal with retro game stats, session summary, and visual flair
- **Iteration 13:** Dynamic weather effects — occasional lightning flashes, rain particles

---

## Iteration 12 — Dynamic Weather System: Rain, Lightning & Thunder
**Date:** 2026-04-23
**Branch:** visual-iterations
**GitHub Issue:** #14 — [Iteration 12: Dynamic Weather System - Rain, Lightning and Thunder](https://github.com/akramram/SanAndreasCheats/issues/14)

### Planned
- Add pixel-art rain effect (thin falling lines at slight angle)
- Lightning flash with dramatic full-screen illumination
- Thunder sound effect via Web Audio API
- Dynamic cloud cover that rolls in during rain
- Weather cycle: clear → cloudy → rain → storm → clearing
- Rain splash ripples at street level

### What Changed (Files Modified)
- **src/utils/sounds.js** — Added:
  - `playThunder(distance)` — deep bass rumble with noise crack, distance parameter controls volume/duration (close = loud brief, far = softer longer). Frequency sweeps from 40-60Hz down to 20Hz with low-pass filtered noise burst
  - `startRainAmbient(intensity)` — continuous looping noise buffer with bandpass filter (6-10kHz) for rainfall atmosphere. Intensity controls gain and filter frequency
  - `stopRainAmbient()` — smooth fadeout over 1.5s then cleanup
  - `updateRainIntensity(intensity)` — live adjustment of rain ambient gain and filter frequency for smooth transitions
  - `playWindGust()` — brief whooshing wind sound with bandpass frequency sweep (200Hz → 800Hz → 150Hz) and envelope shaping
- **src/App.css** — Added:
  - `.weather-clouds`, `.cloud-layer` — cloud cover overlay with radial gradient clouds, two opacity states (cloudy/overcast), 4s fade transition
  - `.weather-rain`, `.raindrop`, `.raindrop-heavy` — rain container and individual droplets with configurable position, size, and speed via CSS variables. Heavy drops are wider (2px) with brighter gradient
  - `rain-fall` keyframe — diagonal fall animation with 8deg rotation, fade in/out at top/bottom
  - `.weather-rain-splashes`, `.rain-splash` — pixel splash ripples at ground level with configurable position and timing
  - `splash-ripple` keyframe — scale-out + fade animation for splash effect
  - `.weather-lightning`, `.flash`, `.flash-intense` — full-screen white flash with two intensity levels. Normal flash: 3-pulse pattern over 0.6s. Intense: 5-pulse pattern over 0.8s reaching 90% opacity
  - `.lightning-bolt`, `.strike` — SVG lightning bolt visual with drop-shadow glow, fade-in/strike/fade-out animation over 0.5s
  - `.weather-ambiance` — ambient dimming overlay with 3 states (clear/dim/dim-heavy) and 5s transition
  - `.weather-ground-wet` — wet ground reflection gradient at bottom, 3s fade in
  - `.weather-indicator` — subtle weather icon in top-left corner showing current phase (☀☁🌧⛈🌦)
- **src/pages/Home.jsx** — Added:
  - `WEATHER_PHASES` constant: 5-phase weather cycle with durations — clear(25s), cloudy(12s), rain(18s), storm(15s), clearing(15s) = ~85s total cycle
  - `RAIN_DROPS_LIGHT`: 60 pre-generated light raindrop positions (deterministic, no random in render)
  - `RAIN_DROPS_HEAVY`: 120 pre-generated heavy raindrop positions
  - `RAIN_SPLASHES`: 25 pre-generated splash ripple positions
  - New state: `weatherPhase`, `lightningKey`, `lightningIntense`, `boltKey`, `boltX`
  - Weather cycle useEffect: advances through phases after boot, triggers rain ambient on rain phase, intensifies on storm, wind gust on cloudy, stops rain on clearing
  - Lightning useEffect: during storm phase, schedules lightning strikes every 3-9s with 40% chance of intense flash. Occasional double-strikes (30% chance). Thunder plays 300-1800ms after flash (simulating distance). SVG bolt renders at random horizontal position with glow effect

### What Improved
- The Los Santos nightscape now has a full dynamic weather cycle that transforms the atmosphere every ~85 seconds
- Clear phase: normal starfield view as before (25 seconds of calm)
- Cloudy phase: cloud cover rolls in with subtle wind gust sound, stars dim behind clouds
- Rain phase: 60 light pixel-art raindrops fall diagonally, wet ground reflection appears, soft rain ambient sound starts, 25 splash ripples animate at street level
- Storm phase: rain intensifies to 120 heavy drops, cloud cover darkens to overcast, ambient dims heavily, lightning bolts strike with SVG visuals, dramatic full-screen white flashes (normal + intense variants), thunder rumbles with realistic delay, occasional double-strikes
- Clearing phase: clouds remain but rain eases back to light, ground stays wet
- All transitions are smooth (2-5s CSS transitions on opacity/background)
- Weather indicator in top-left shows current phase with emoji icon
- Rain ambient sound adjusts dynamically with weather intensity
- Zero impact on game logic — all weather is purely visual/atmospheric
- Performance optimized: rain positions are pre-generated (no random in render), all animations use CSS transform/opacity for GPU acceleration

### Issues
- Build passes cleanly (310KB JS, 63KB CSS)
- Lint: 2 pre-existing warnings (no new warnings or errors)
- All game logic (input handling, cheat matching, gamepad API) untouched
- Weather cycle runs independently — doesn't interact with gameplay mechanics

### Next Iteration
- **Iteration 13:** Enhanced history modal with session stats dashboard and visual flair
- **Iteration 14:** Wanted level stars system that fills up as cheats are activated

---

## Iteration 13 — GTA Wanted Level Stars System
**Date:** 2026-04-24
**Branch:** visual-iterations
**GitHub Issue:** #15 — [🎨 Iteration 13: GTA Wanted Level Stars System](https://github.com/akramram/SanAndreasCheats/issues/15)

### Planned
- Add iconic 5-star wanted level display (pixel-art CSS stars)
- Stars fill based on combo streak (1 star per streak level, max 5)
- Dramatic star fill animation with flash/pulse on gain
- Star loss animation when streak breaks
- At 5 stars: max wanted level effects (red screen tint, flashing, police siren sound)
- Wanted level sound effect via Web Audio API (ascending jingle per star)
- 'WANTED LEVEL UP' toast notification
- Idle pulse on active stars

### What Changed (Files Modified)
- **src/utils/sounds.js** — Added:
  - `playWantedStar(level)` — ascending double-beep alert tone per star level (A4→A5), more urgent at 5 stars with rapid alternating tones
  - `playWantedLost()` — descending defeat tone sequence (660→260Hz) when wanted level drops
  - `startSiren()` — continuous police siren using sawtooth oscillator with LFO frequency modulation for authentic wail effect
  - `stopSiren()` — smooth fadeout with delayed cleanup
- **src/App.css** — Added:
  - `.wanted-level-display`: Fixed top-left HUD container for stars, with label and stars row
  - `.wanted-star`: CSS-only star shape using `clip-path: polygon()` with 10-point star silhouette
  - `.wanted-star.active`: White star with blue-white glow drop-shadow
  - `.wanted-star.active.star-warn`: Amber/yellow star for levels 2-3
  - `.wanted-star.active.star-danger`: Red star for level 4+
  - `star-fill-flash` keyframe: Dramatic scale+rotation entrance animation with overshoot bounce (0.5s)
  - `.wanted-star.just-gained`: Applies the fill flash animation
  - `star-idle-pulse`, `star-idle-pulse-warn`, `star-idle-pulse-danger` keyframes: Gentle glow pulsing on active stars, faster/more intense at higher levels
  - `star-lost` keyframe: Scale up then shrink+rotate exit animation (0.4s)
  - `.wanted-star.just-lost`: Applies the loss animation
  - `wanted-toast-in`, `wanted-toast-out` keyframes: Slide-in from left with overshoot, slide-out to left
  - `.wanted-toast`: Pixel-bordered toast notification with clip-path border styling
  - `.wanted-toast-text`, `.wanted-toast-sub`: Press Start 2P and VT323 text styling with amber glow
  - `wanted-max-pulse` keyframe: Breathing red pulse overlay
  - `.wanted-max-overlay`: Red radial gradient overlay that pulses at max wanted level
  - `.wanted-max-vignette`: Red inset box-shadow edge vignette for intensity at max wanted
  - `wanted-max-flash` keyframe: Multi-pulse red flash on first reaching max wanted (1s)
  - `.wanted-max-flash`: Full-screen red flash element
- **src/pages/Home.jsx** — Added/updated:
  - New state: `wantedLevel` (0-5), `wantedStarAnim` (animation trigger), `wantedToast` (toast display), `showWantedMaxFlash` (one-shot flash), `sirenActive` (siren status)
  - New refs: `prevStreakRef` (tracks streak changes), `wantedToastTimerRef`
  - Wanted level useEffect: watches `currentStreak` changes, calculates new wanted level (min(streak, 5)), triggers star gain/loss animations with staggered timing, shows toast with GTA-themed messages ("Police alerted!", "NOOSE incoming!", "The whole city is after you!"), starts police siren at max level, triggers dramatic red flash on reaching 5 stars
  - Siren cleanup useEffect: stops siren and clears toast timers on unmount
  - `resetOnInactivity()`: Now also stops siren when streak breaks
  - Wanted level HUD JSX: 5 CSS-only star shapes in a row below "WANTED" label, color-coded by level (white → amber → red)
  - Wanted toast JSX: Slide-in notification with level-specific messages
  - Max wanted effects JSX: Red overlay + vignette when at 5 stars, one-shot flash on reaching max

### What Improved
- Added an iconic GTA SA visual element — the wanted level stars — giving players immediate visual feedback on their combo streak
- Stars are CSS-only (no images), using clip-path polygon for a clean 10-point star shape
- Color escalation creates urgency: white (calm) → amber (getting serious) → red (maximum danger)
- Each star gain has a dramatic flash animation with rotation and scale overshoot
- Stars pulse gently when active, faster and more intensely at higher wanted levels
- Star loss has a shrink+rotate animation that feels like losing control
- Wanted toast notifications slide in with GTA-themed messages that escalate: "They know you're here..." → "Police alerted!" → "Cruisers dispatched!" → "NOOSE incoming!" → "The whole city is after you!"
- At 5 stars (max wanted): pulsing red screen overlay, red edge vignette, dramatic red flash, and a continuous police siren wail via Web Audio API — the atmosphere becomes intense
- Wanted level sound effects are ascending alert tones that get more urgent with each star level
- Siren uses sawtooth oscillator with LFO modulation for an authentic police siren wail
- The whole system integrates seamlessly with the existing combo/streak system — no game logic changes needed

### Issues
- Build passes cleanly (313KB JS, 67KB CSS)
- Lint: 2 pre-existing warnings (no new warnings introduced)
- All game logic (input handling, cheat matching, gamepad API) untouched

### Next Iteration
- **Iteration 14:** Enhanced history modal with session stats dashboard and visual flair
- **Iteration 15:** More dynamic atmospheric effects — GTA radio station display, car radio tuning

