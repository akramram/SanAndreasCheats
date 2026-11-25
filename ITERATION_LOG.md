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

---

## Iteration 14: GTA SA Radio Station Display & Tuner
**Date:** 2025-04-25
**Branch:** visual-iterations

### Planned Changes
- Add an authentic in-game-style car radio panel to the UI
- 8 iconic GTA San Andreas radio stations with genre-specific synthesized jingles
- LCD display with scanlines, VU meter with animated bars, station tuning controls
- Radio auto-cycles every ~25 seconds with static/tune transition effects
- Cheat matches trigger station changes (higher combos → more energetic stations)
- Weather affects radio volume (storms = quieter, clear = full)
- Combo streaks make radio panel glow (amber at 2+, red at 4+)

### Files Modified
- `src/utils/sounds.js` — Added radio sound system: `playRadioStatic()`, `playRadioTune()`, `startRadioJingle(genreId)` with 8 genre jingles, `stopRadioJingle()`, `setRadioVolume()`
- `src/App.css` — Added 300+ lines of radio CSS: panel, LCD display, scanlines, VU meter, station dots, tuning knobs, combo-reactive glow animations
- `src/pages/Home.jsx` — Added RADIO_STATIONS constant (8 stations), radio state variables, cycling useEffect, VU meter animation, `changeStationOnMatch()`, weather-reactive volume, radio panel JSX

### What Changed from Plan
- Everything implemented as planned — no scope changes

### What Improved
- Added a deeply immersive GTA SA atmosphere element — the car radio — making the app feel more like the actual game
- 8 authentic stations: K-DST (Rock), Radio Los Santos (Hip Hop), K-Rose (Country), K-JAH (Reggae), Master Sounds (Jazz), SF-UR (House), Bounce FM (Funk), Playback FM (Old School)
- Each station has a unique Web Audio API synthesized jingle: rock uses sawtooth power chords, hip hop uses sine sub-bass + noise hi-hats, country uses triangle picking, reggae uses offbeat chords, jazz uses walking bass, house uses four-on-floor kick, funk uses slap bass, boomBap uses breakbeat pattern
- Retro car radio visual design with dark metallic panel, green LCD text (matching the game's aesthetic), and animated VU meter bars
- Station transitions include brief static burst + tuning sound for realism
- VU meter responds to player streak — higher streaks = more energetic meter movement
- Cheat matches dynamically switch to more energetic stations at higher combos
- Weather integration: storms lower radio volume to 30%, rain to 60%, clear at 100%
- Combo-reactive panel glow: amber at streak ≥ 2, pulsing red at streak ≥ 4
- Manual prev/next controls with station indicator dots

### Issues
- Build passes cleanly (322KB JS, 72KB CSS)
- Lint: 3 pre-existing warnings (no new warnings or errors introduced)
- All game logic (input handling, cheat matching, gamepad API) untouched
- Core cheat input mechanic fully preserved

### Next Iteration
- **Iteration 15:** Cheat Codex — spy dossier discovery journal with classified/declassified entries
- **Iteration 16:** Mini-map / GPS-style navigation display showing cheat categories

---

## Iteration 15 — Cheat Codex: Spy Dossier Discovery Journal
**Date:** 2026-04-26
**Branch:** visual-iterations
**GitHub Issue:** #16 — [🎨 Iteration 15: Cheat Codex — Spy Dossier Discovery Journal](https://github.com/akramram/SanAndreasCheats/issues/16)

### Planned
- Add a Cheat Codex button (book/dossier icon) to the top toolbar
- Create a full-screen modal styled as a GTA spy dossier/journal
- All cheats organized by 7 categories with pixel-art headers
- Undiscovered cheats show as CLASSIFIED with redacted black bars
- Discovered cheats are DECLASSIFIED with full info revealed
- Category progress bars (X/Y discovered) with color coding
- Overall discovery percentage with pixel progress bar
- NEW DISCOVERY flash animation when finding a cheat for the first time
- Search/filter functionality within the codex
- Persistent discovery state via localStorage (tied to existing uniqueCheatIds tracking)

### What Changed (Files Modified)
- **src/App.css** — Added 350+ lines of codex styling:
  - `.codex-btn` — toolbar button with hover scale + glow effect
  - `.codex-badge` — amber discovery count badge with pixel font
  - `.codex-modal` — full-screen backdrop with blur and fade-in animation
  - `.codex-panel` — dossier-styled panel with manila folder aesthetic (warm brown gradients, aged paper border)
  - `codex-panel-in` keyframe: dramatic scale+translate entrance with cubic-bezier overshoot
  - `.codex-panel-header` — dossier top section with decorative "CLASSIFIED" border stamp via ::before pseudo-element
  - `.codex-title`, `.codex-subtitle` — CODEX title with amber pixel font and "San Andreas Intelligence Dossier" subtitle
  - `.codex-progress-wrap`, `.codex-progress-bar`, `.codex-progress-fill` — overall discovery progress bar with amber gradient
  - `.codex-search` — retro-styled search input with pixel font and amber focus state
  - `.codex-tabs` — horizontal scrollable category tab bar
  - `.codex-tab`, `.codex-tab.active` — tab buttons with amber active state and category counts
  - `.codex-content` — scrollable content area with styled scrollbar
  - `.codex-category-section`, `.codex-category-header`, `.codex-category-bar`, `.codex-category-fill` — per-category progress sections
  - `.codex-entry.classified` — undiscovered entry with dimmed styling
  - `.codex-entry.declassified` — discovered entry with full styling
  - `.codex-classified-inner`, `.codex-classified-stamp` — CLASSIFIED stamp with red border, rotation
  - `.codex-redacted-bar` — repeating gradient black bars mimicking redacted text
  - `.codex-declassified-inner`, `.codex-declassified-stamp` — DECLASSIFIED stamp with green border
  - `.codex-entry-name`, `.codex-entry-desc`, `.codex-entry-code` — full cheat info display
  - `.codex-entry-category-tag` — color-coded category tag
  - `codex-new-discovery` keyframe — green glow pulse animation on new discovery
  - `codex-discovery-toast-in`, `codex-discovery-toast-out` keyframes — slide-in/slide-out toast animations
  - `.codex-discovery-toast` — toast notification for new discoveries
  - `.codex-empty` — empty state with lock icon
- **src/pages/Home.jsx** — Added:
  - New state: `showCodex`, `codexTab`, `codexSearch`, `codexDiscoveryToast`, `prevUniqueCountRef`
  - Codex discovery detection useEffect: watches `totalCheats` changes, compares unique cheat count to previous, shows discovery toast when a new cheat is found for the first time
  - Codex button JSX: 📕 book icon at top-right with amber discovery count badge
  - Codex discovery toast JSX: slides in from right with 📖 icon, "NEW DISCOVERY" label, and cheat name
  - Full codex modal JSX (inline IIFE for clean variable scoping):
    - Computes overall discovery stats (total, discovered, percentage)
    - Builds per-category discovery stats from CHEAT_CATEGORIES
    - Category tab bar with ALL + 7 category tabs showing X/Y counts
    - Search bar filtering decoded (discovered) entries only
    - Content grouped by category in defined order
    - Each category section: colored header, progress bar, list of entries
    - Discovered entries: full name, description, PC code (with dual-sequence support), category tag, "DECLASSIFIED" stamp
    - Undiscovered entries: "CLASSIFIED" stamp + redacted black bars
    - Empty state for filtered/no results

### What Improved
- Added a complete collection/discovery mechanic — players now have a reason to explore all cheat codes beyond achievements
- The Codex creates a spy dossier aesthetic that fits perfectly with the GTA SA theme — feels like CJ is reading classified C.R.A.S.H. files
- Undiscovered cheats show as "CLASSIFIED" with redacted black bars — creates intrigue and motivation to discover more
- Discovered cheats are "DECLASSIFIED" with full info revealed — satisfying reveal moment
- Category tabs allow filtering by Weapons, Vehicles, Player Stats, etc. with per-category progress bars
- Overall discovery percentage gives a clear "completionist" goal (e.g., "DECODED 47%" with progress bar)
- Search bar lets players quickly find specific discovered cheats
- "NEW DISCOVERY" toast notification slides in when a cheat is found for the first time — adds excitement to the discovery moment
- Discovery state is persistent via the existing `uniqueCheatIdsRef` + localStorage cheat history — survives page reloads
- The codex ties into the exploration achievement system — it provides the visual "codex" that the achievements track progress toward
- All styling uses the pixel font system and warm amber/brown palette consistent with the retro aesthetic

### Issues
- Build passes cleanly (328KB JS, 80KB CSS)
- Lint: 3 pre-existing warnings (no new warnings introduced)
- All game logic (input handling, cheat matching, gamepad API) untouched
- Core cheat input mechanic fully preserved

### Next Iteration
- **Iteration 16:** Mini-map / GPS-style navigation display showing cheat categories
- **Iteration 17:** Enhanced history modal with session stats dashboard and visual flair

---

## Iteration 16 — Cash Economy & Cosmetic Shop
**Date:** 2026-04-27
**Branch:** visual-iterations
**GitHub Issue:** #17 — [🎨 Iteration 16: Cash Economy and Cosmetic Shop](https://github.com/akramram/SanAndreasCheats/issues/17)

### Planned
- Add GTA-style cash economy — players earn $GTA money for activating cheats
- Escalating payouts based on speed, combo streak, and cheat rarity
- Persistent cash balance via localStorage
- Cash pickup animation (floating dollar bills on match)
- Cosmetic Shop modal with purchasable visual upgrades
- Cash register sound effect via Web Audio API

### What Changed (Files Modified)
- **src/utils/sounds.js** — Added 4 new sound effects:
  - `playCashRegister()` — two-tone ascending "cha-ching" (sine waves at 1200Hz + 1800Hz) for big payouts (≥$500)
  - `playCoinPickup()` — rapid ascending square wave arpeggio (880→1100→1320→1760Hz) for smaller payouts
  - `playPurchaseSound()` — satisfying "ker-chunk" triangle+sine transaction confirmation
  - `playCantAffordSound()` — low descending sawtooth buzz (150→100Hz) for insufficient funds
- **src/App.css** — Added ~480 lines of cash/shop styling:
  - `.cash-hud` — Fixed top-center GTA-style green money counter with pixel font and glow
  - `.cash-popup` — Floating "+$AMOUNT" text that floats upward and fades (1.4s animation)
  - `.cash-bill` — Pixel-art floating green money bill particles with rotation and drift
  - `cash-float-up` keyframe — scale+translate+fade for cash popup
  - `cash-bill-float` keyframe — 3-stage rotation+drift+fade for bill particles
  - `.shop-btn` — Toolbar shop button with hover scale+glow
  - `.shop-modal-backdrop` — Blur backdrop with fade-in
  - `.shop-panel` — Main shop container with amber border, bounce entrance animation
  - `shop-panel-in` keyframe — Scale+translate entrance with overshoot bounce
  - `.shop-header` — Title + balance display with gradient accent
  - `.shop-balance` — Green pixel-font cash display
  - `.shop-close-btn` — Pixel-bordered close button
  - `.shop-tabs` — Horizontal scrollable category tab bar
  - `.shop-tab`, `.shop-tab.active` — Tab buttons with amber active state
  - `.shop-content` — Scrollable content area with styled scrollbar
  - `.shop-items` — CSS grid layout for item cards
  - `.shop-item` — Individual item card with hover lift+glow effects
  - `.shop-item.owned`, `.shop-item.equipped`, `.shop-item.locked` — Item state variants
  - `.shop-item.equipped::after` — "EQUIPPED" badge overlay
  - `.shop-item-icon`, `.shop-item-name`, `.shop-item-desc`, `.shop-item-price` — Item content styles
  - `.shop-buy-btn` — Buy/EQUIP/EQUIPPED button variants with hover/active states
  - `shop-purchase-flash` keyframe — Green glow pulse on purchase
  - `.neon-swatch` — Color preview swatch for neon items
  - `.color-preview` — Text preview with active cosmetic effect
  - 7 `.glow-color-*` classes — Active neon glow effects (amber, red, green, blue, purple, cyan, pink, rainbow)
  - `rainbow-glow` keyframe — Cycling rainbow color animation
  - 4 `.cj-frame-*` classes — Avatar frame cosmetics (gold, neon, flame, diamond) with drop-shadow effects
  - `neon-frame-pulse` keyframe — Pulsing cyan-to-purple frame animation
  - 3 `.input-effect-*` classes — Custom input character animations (trail, ghost, glitch)
  - `input-trail-effect`, `input-ghost-effect`, `input-glitch-effect` keyframes — Unique per-char entrance animations
  - 3 `.bg-theme-*` classes — Background theme cosmetics (sunset, matrix, retrowave)
- **src/pages/Home.jsx** — Added:
  - `CASH_BASE`, `CASH_SPEED_BONUS`, `CASH_COMBO_MULT`, `CASH_RARE_MULT` — Cash calculation constants
  - `SHOP_CATEGORIES` — 5 shop category definitions (ALL, NEON, FRAMES, INPUT FX, BG THEMES)
  - `SHOP_ITEMS` — 18 cosmetic items across 4 categories:
    - Neon Colors (7): Crimson Glow, Matrix Green, Ocean Blue, Purple Haze, Cyber Cyan, Hot Pink, Prism Shift
    - Avatar Frames (4): Gold Frame, Neon Frame, Flame Aura, Diamond
    - Input Effects (3): Pop Trail, Ghost Type, Glitch Type
    - Background Themes (3): LS Sunset, Matrix Fall, Retrowave
  - Cash state: `cash` (localStorage-backed), `cashPopups`, `cashBills`, `showShop`, `shopTab`, `ownedItems`, `equippedItems`
  - `purchaseItem()` — Buy cosmetic, deduct cash, auto-equip, play purchase sound, persist to localStorage
  - `equipItem()` — Toggle equip/unequip per category, persist to localStorage
  - `activeGlowClass`, `activeFrameClass`, `activeEffectClass`, `activeThemeClass` — Computed cosmetic CSS classes
  - Cash earning in cheat match block: calculates payout based on base + speed bonus + combo multiplier + rarity multiplier
  - Cash popup and bill particle spawning on match
  - Cash sounds: coin pickup for small amounts, cash register for ≥$500
  - Cash HUD JSX: top-center green "$AMOUNT" display, visible after first cheat
  - Cash popup JSX: floating "+$AMOUNT" animation
  - Cash bill particles JSX: 6-16 floating green pixel bills
  - Shop button JSX: 🛒 icon at top toolbar
  - Full shop modal JSX: BINCO SHOP (GTA clothing store reference), category tabs, item grid with buy/equip/unequip buttons, balance display, color swatches, price display
  - Cosmetic class application: active neon glow on matched cheat name, active frame on CJ avatar, active effect on main container, active theme on main container

### What Improved
- Added a complete gameplay economy loop — players now earn GTA money for activating cheats
- Cash payouts escalate based on multiple factors: base $100, speed bonus (under 2s = +$50, under 1s = +$100), combo multiplier (1.5x per streak level), and rarity bonus (2x for cheats with 10+ character sequences)
- A 5x combo on a rare cheat completed in under 1 second can earn $3,375 — meaningful progression
- "BINCO SHOP" (GTA SA clothing store reference) lets players spend earned cash on cosmetic upgrades
- 18 purchasable cosmetics across 4 categories with real visual effects:
  - **Neon Colors** change the cheat name glow on match (7 options including cycling rainbow)
  - **Avatar Frames** change CJ's drop-shadow/glow effect (gold, neon pulse, flame, diamond)
  - **Input Effects** change how characters appear when typing (bouncy pop, ghost fade, digital glitch)
  - **Background Themes** change atmospheric elements (warm sunset horizon, green matrix stars, retrowave purple)
- Cash display is GTA-style green pixel font at top center — feels authentic
- Floating "+$AMOUNT" popup and green money bill particles add satisfying feedback on each earn
- Sound design: coin pickup arpeggio for small amounts, cash register "cha-ching" for big payouts, satisfying purchase "ker-chunk", error buzz for insufficient funds
- Shop has a polished UI: category tabs, item cards with hover effects, color swatches, equip/unequip toggle, persistent state
- All cosmetic effects apply in real-time — equip a neon color and immediately see it on the next cheat match
- Everything persists in localStorage — cash balance, owned items, and equipped items survive page reloads

### Issues
- Build passes cleanly (340KB JS, 90KB CSS)
- Lint: 3 pre-existing warnings (no new warnings introduced)
- All game logic (input handling, cheat matching, gamepad API) untouched
- Core cheat input mechanic fully preserved

### Next Iteration
- **Iteration 17:** Enhanced history modal with session stats dashboard and visual flair
- **Iteration 18:** Dynamic atmospheric effects — more variety in weather, ambient sounds

---

## Iteration 17 — Restore Original cheat_activated.mp3 as Primary Match Sound
**Date:** 2026-05-05
**Branch:** visual-iterations
**GitHub Issue:** #18 — [🔊 Use original cheat_activated.mp3 as the primary cheat match sound](https://github.com/akramram/SanAndreasCheats/issues/18)

### Planned
- Remove synthesized Web Audio API fanfare (`playMatchSound`) from cheat match handler
- Keep and emphasize the original `cheat_activated.mp3` sound effect
- Clean up unused `playMatchSound` import from Home.jsx
- Slightly increase MP3 volume for better prominence

### What Changed (Files Modified)
- **src/pages/Home.jsx**:
  - Removed `playMatchSound` from `../utils/sounds` import
  - Removed `playMatchSound(newStreak)` call in cheat match handler
  - Updated comment from "Play sound immediately and trigger fireworks" to "Play original cheat activated sound"
  - Increased `audioRef.current.volume` from `0.6` to `0.85`

### What Improved
- The iconic GTA San Andreas "Cheat Activated" sound effect is now the sole match sound
- No more layered synthesized arpeggio clashing with the authentic MP3
- Cleaner, more nostalgic audio feedback on every cheat activation
- Volume increase makes the sound more satisfying and audible

### Issues
- Build passes cleanly (340KB JS, 89KB CSS)
- Lint: 3 pre-existing warnings (0 new)
- All game logic untouched
- `playMatchSound` still exists in `sounds.js` for potential future use

### Next Iteration
- **Iteration 18:** Enhanced history modal with session stats dashboard and visual flair
- **Iteration 19:** Dynamic atmospheric effects — more variety in weather, ambient sounds


---

## Iteration 18 — Add GTA SA Radio Tracks from SoundCloud
**Date:** 2026-05-05
**Branch:** visual-iterations
**GitHub Issue:** #21 — [🎨 Visual Iteration 18: Add GTA SA Radio Tracks from SoundCloud](https://github.com/akramram/SanAndreasCheats/issues/21)

### Planned
- Integrate actual GTA SA radio station audio tracks from SoundCloud playlist: https://soundcloud.com/furtheram/sets/grand-theft-auto-san-andreas
- Map 10 SoundCloud tracks to radio stations
- Add SoundCloud Widget API integration for real audio playback
- Hide song names in UI — only show radio station name
- Use SoundCloud audio titles as internal reference
- Disable auto-cycling for stations with real audio
- Keep synthesized jingles as fallback for K-JAH and if SoundCloud fails

### What Changed (Files Modified)
- **src/pages/Home.jsx**:
  - Expanded `RADIO_STATIONS` from 8 to 11 stations:
    - Added 3 new stations with real SoundCloud audio: RADIO X (104.1), WCTR (95.6), CSR 103.9 (103.9)
    - Updated 7 existing stations with `scUrl` pointing to their matching SoundCloud tracks
    - Updated frequencies to match real GTA SA radio frequencies
    - Updated `song` fields to use actual SoundCloud track titles as reference
  - Added SoundCloud Widget API integration:
    - `scIframeRef`, `scWidgetRef`, `scReady` state
    - Dynamic script loading for `https://w.soundcloud.com/player/api.js`
    - Widget initialization with `SC.Widget(iframe)` and `READY` event binding
  - Added `playStationAudio(stationIdx)` helper:
    - If station has `scUrl` and widget is ready → `widget.load(scUrl, { auto_play: true, ... })`
    - Otherwise → fallback to synthesized `startRadioJingle(genreId)`
  - Modified radio cycling effect:
    - Auto-cycle timer only starts if current station has no real audio (K-JAH)
    - After cycling to a station with real audio, timer stops (no more auto-cycling)
    - Initial station audio uses `playStationAudio` instead of `startRadioJingle`
  - Updated `changeStationOnMatch` to include new energetic stations (Radio X at index 8)
  - Updated manual prev/next knob handlers to use `playStationAudio`
  - Added hidden `<iframe>` for SoundCloud widget (positioned off-screen)
  - **Removed `.radio-now-playing` from radio LCD UI** — song name is now hidden, only station name/freq/genre visible

- **src/utils/sounds.js**:
  - Added fallback genre mappings for new stations without dedicated jingles:
    - `alternative` → `rock`
    - `talk` → `jazz`
    - `soul` → `funk`

### What Improved
- Radio stations now play **actual GTA San Andreas radio audio** from the official SoundCloud collection — 10 full station tracks (~11.5 hours of content)
- Stations with real audio no longer auto-cycle every 25 seconds, letting users enjoy full radio broadcasts
- The radio tuner feels more authentic — switching stations changes the actual audio, not just a synthesized jingle
- Song names are hidden from the UI, keeping the focus on the radio station branding (name, frequency, genre)
- SoundCloud audio titles are preserved as internal reference data
- K-JAH still uses the synthesized reggae jingle as fallback since there's no matching SoundCloud track
- If SoundCloud fails to load, all stations gracefully fall back to their synthesized jingles
- 3 new stations expand the radio variety: RADIO X (Alternative Rock), WCTR (Talk Radio), CSR 103.9 (Contemporary Soul)

### Issues
- Build passes cleanly (343KB JS, 89KB CSS)
- Lint: 3 pre-existing warnings (0 new)
- All game logic untouched
- SoundCloud embed relies on external service availability and may be blocked in some regions (graceful fallback to jingles)

### Next Iteration
- **Iteration 19:** Enhanced history modal with session stats dashboard and visual flair
- **Iteration 20:** Dynamic atmospheric effects — more variety in weather, ambient sounds

---

## Iteration 19 — Interactive Radio with Manual Play/Pause & Station Controls
**Date:** 2026-05-05
**Branch:** visual-iterations
**GitHub Issue:** no-issue (token masked)

### Planned
- Add manual play/pause button to the radio panel so users can start/stop songs
- Ensure prev/next station buttons properly switch songs when radio is playing
- Add playing/paused status indicator in the LCD display
- VU meter animation should freeze when paused
- Keep radio panel at bottom-left of screen

### What Changed (Files Modified)
- **src/pages/Home.jsx**:
  - Added `radioPlaying` state and `radioPlayingRef` to track play/pause status
  - Added `toggleRadioPlay` callback:
    - Play → calls `playStationAudio(currentStation)` to resume current station
    - Pause → pauses SoundCloud widget, stops synthesized jingle via `stopRadioJingle()`
  - Added `changeStation(nextIdx)` helper:
    - Centralizes station change logic (static effect, tune sound, LCD update)
    - Only calls `playStationAudio` if `radioPlayingRef.current` is true
  - Replaced inline prev/next button handlers with `changeStation()` calls
  - Updated `changeStationOnMatch` to use `changeStation()` for consistency
  - Modified VU meter animation to freeze at minimal height when paused
  - Updated radio panel JSX:
    - Added `▶ PLAYING` / `❚❚ PAUSED` status text in LCD
    - Added play/pause button between prev and next knobs
    - Added `radio-paused` class to panel when paused
    - Added `radio-vu-paused` class to VU meter when paused

- **src/App.css**:
  - Added `.radio-panel.radio-paused` — dims panel and changes border color
  - Added `.radio-status`, `.radio-status-playing`, `.radio-status-paused` — LCD status text styling
  - Added `.radio-knob-play` — larger play/pause button with green accent
  - Added `.radio-knob-play.radio-knob-active` — active play state styling
  - Added `.radio-vu-paused .vu-bar` — greyed-out flat bars when paused

### What Improved
- Users can now manually pause and resume radio playback with a dedicated play/pause button
- Changing stations while playing automatically starts the new station's audio
- Changing stations while paused only updates the display without starting audio
- VU meter visually reflects the paused state (flat grey bars)
- LCD clearly shows ▶ PLAYING or ❚❚ PAUSED status
- Radio panel dims slightly when paused for immediate visual feedback
- All station switching logic is now centralized in `changeStation()` for cleaner code

### Issues
- Build passes cleanly (343KB JS, 90KB CSS)
- Lint: 3 pre-existing warnings (0 new)
- All game logic untouched
- No breaking changes to existing radio auto-play on boot

### Next Iteration
- **Iteration 20:** Enhanced history modal with session stats dashboard and visual flair
- **Iteration 21:** Dynamic atmospheric effects — more variety in weather, ambient sounds

---

## Bugfix — Radio Station Resumes from Shared Global Progress (#22)
**Date:** 2026-05-05
**Branch:** visual-iterations → main
**Commit:** fix(radio): resume stations from shared global progress instead of 0 (#22)

### Problem
- Every radio station restarted from duration 0 when played or changed
- SoundCloud tracks always began at the start of the track
- Synthesized jingles always started from pattern beat 0

### Solution
- Added `scPendingSeekRef` to queue a seek position before `widget.load()`
- SC Widget `READY` handler now checks pending seek, calls `seekTo()` then `play()`
- `playStationAudio()` sets `auto_play: false` on load and stores the station's current progress in `scPendingSeekRef`
- For synthesized stations, `startRadioJingle()` now accepts `offsetMs` and jumps into the loop at the correct phase
- All 11 stations continue advancing together via `stationProgressRef`; only the selected one outputs sound

### Files Modified
- `src/pages/Home.jsx` — pending seek ref, READY handler, `playStationAudio()` seek logic
- `src/utils/sounds.js` — `startRadioJingle(genreId, offsetMs = 0)` with phase-aware delays for all 8 jingle patterns

### What Improved
- Switching stations now feels like tuning a real radio — you pick up mid-song
- SoundCloud stations seek to the exact computed position within the virtual track
- Jingles start from the correct beat/chord in their loop
- No audio starts from 0 unexpectedly

### Issues
- Build passes cleanly
- Lint: 3 pre-existing warnings (0 new)
- All game logic untouched

## Iteration 20 — Daily Contract: Cheat-of-the-Day Mission (#26)
**Date:** 2026-11-22
**Branch:** feat/iter-20-daily-contract → PR → main

### Planned
- Date-seeded daily mission card with a one-time cash bonus and a day streak.

### Changed
- `src/utils/dailyContract.js` (new) — pure helpers: local day key, FNV-1a seeded `pickDailyCheat`, streak math (`completeContract`, `activeStreak`, `previousDayKey`), defensive storage parsing.
- `src/pages/Home.jsx` — contract state + payout effect that only *observes* `matchedCheat` (matching/input/gamepad logic untouched); pixel card under the WANTED panel; "CONTRACT COMPLETE" toast.
- `src/App.css` — `.contract-card` / `.contract-toast` (Press Start 2P, amber → green when done, steps() entrance, reduced-motion fallback, mobile hides description).

### Improved
- A reason to come back daily: same contract for everyone on a given local day, +$5,000 once per day, streak breaks if a day is skipped.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 3 pre-existing warnings (0 new)
- Helpers: deterministic per day, month/year rollover, idempotent completion, 57 unique contracts over 60 days.
- Headless Chromium on `vite preview`: typing today's PC code (UZUMYMW) → toast shown, cash 0 → 5200 (5000 bonus + 200 base), retyping does not pay twice; no horizontal overflow at 375px / 1280px.

### Next
- Show contract completion in the Codex / achievement gallery.

## Iteration 21 — Contract Achievements + Lifetime Contract Counter (#28)
**Date:** 2026-11-22
**Branch:** feat/iter-21-contract-achievements → PR → main

### Planned
- Achievements for the Daily Contract (from Iteration 20 "Next"), lifetime counter, typo fix.

### Changed
- `src/utils/dailyContract.js` — state now `{ lastCompleted, streak, total, bestStreak }`; legacy saves from iteration 20 migrate on read (completed save → total ≥ 1).
- `src/pages/Home.jsx` — new CONTRACTS achievement category: ON THE PAYROLL (1st), RELIABLE (3-day streak), FULL-TIME HUSTLER (7-day), MADE MAN (10 total). `checkAchievements` reads contract stats; gallery renders the 5th category. Contract card shows `#N` lifetime counter. Typo `CURIIOUS` → `CURIOUS` (id unchanged, saves intact).
- `src/App.css` — `.contract-meta` / `.contract-total`.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 3 pre-existing warnings
- Helpers: legacy migration, gap breaks streak but keeps bestStreak (seq 1,2,3,5 Nov → streak 1, best 3, total 4).
- Headless Chromium: seeded yesterday streak 2 → typed today's code → state streak 3/total 3, unlocked `contract-first` + `contract-streak-3`, card shows `3D STREAK #3`.

### Next
- Weekly "big score" contract (harder cheat, bigger payout).

## Iteration 22 — Weekly Heist: Rare-Cheat Weekly Contract (#30)
**Date:** 2026-11-22
**Branch:** feat/iter-22-weekly-heist → PR → main

### Planned
- Weekly "big score" from Iteration 21 "Next".

### Changed
- `src/utils/dailyContract.js` — `localWeekKey` (local Monday), `isHeistEligible` (PS sequence ≥ 10 and has a PC code: 58 of 101 cheats), `pickWeeklyHeist` (FNV-1a seeded per week), `parseHeistState` / `completeHeist` (idempotent per week).
- `src/pages/Home.jsx` — heist state + payout effect (observes `matchedCheat` only), WEEKLY HEIST section on the contract card, HEIST COMPLETE toast variant, achievement SCORE OF THE WEEK (Contracts category).
- `src/App.css` — dashed divider, red heist tag, green when scored.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 3 pre-existing warnings
- Helpers: Sunday 22 Nov and Monday 16 Nov share week key 2026-11-16; completion idempotent.
- Headless Chromium: this week's heist "Maximum sex appeal" (HELLOLADIES) → toast HEIST COMPLETE +$25,000, cash 0 → 25,400, `heist-first` unlocked; retyping pays base cash only (no second $25,000); card flips to "SCORED · NEW HEIST MONDAY".

### Next
- Contract history in the Codex (which days/weeks were completed).

## Iteration 23 — Phone Layout Pass: Compact Radio, Reachable Finder, Slim Contract Card (#32)
**Date:** 2026-11-22
**Branch:** feat/iter-23-compact-mobile-radio → PR → main

### Planned
- Stop the radio covering the cheat prompt on phones.

### Changed (`src/App.css` only, all inside `@media (max-width: 480px)`)
- **Compact radio:** station + frequency + prev/play/next only (genre, time, progress, scanlines, VU meter, dots hidden). Panel height 248 → 138px; at 375×740 its top moved 480 → 595px, so the input box and "ENTER CHEAT CODE" prompt are no longer covered (they were in the before-screenshot).
- **Finder button reachable (pre-existing bug):** the header buttons use `relative` + `right-14/44/72`; at 375px Finder sat at x = −111px (off-screen, untappable) and Codex was clipped at x = 1. Phone offsets now 64/0/−64px → Achievements 113–135, Codex 177–199, Finder 241–263. Desktop unchanged (573/453/341).
- **Slim contract card (regression from iterations 20/22):** card covered the Achievements button on phones; now two one-line targets with 📋 / 💰 prefixes (172px wide), tags/rewards/description hidden on phones only.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 3 pre-existing warnings
- Headless Chromium before/after at 375×740, 360×640, 1280×800: element rects measured (above), no horizontal overflow (scrollWidth = viewport), screenshots reviewed.

### Next
- Contract history in the Codex.

## Iteration 24 — 7-Day Contract History Strip (#34)
**Date:** 2026-11-22
**Branch:** feat/iter-24-contract-history → PR → main

### Planned
- Contract history (Iteration 22/23 "Next"), kept small: a 7-day strip on the contract card.

### Changed
- `src/utils/dailyContract.js` — daily state gains `history` (completed day keys, oldest first, deduped, capped at 30); older saves migrate from `lastCompleted`; junk entries dropped. `lastNDays(dayKey, n)` handles month/year rollover.
- `src/pages/Home.jsx` — 7 pixel squares under the reward line: green = completed, amber blinking (steps) = today still open, grey outline = missed; `role="img"` + aria-label "Contracts completed in the last 7 days: N of 7".
- `src/App.css` — strip styles, reduced-motion fallback, hidden on phones (card stays compact from iteration 23).

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 3 pre-existing warnings
- Helpers: `lastNDays('2026-03-02', 7)` → 24 Feb … 2 Mar; legacy save → history [lastCompleted]; 40 completions capped to 30.
- Headless Chromium: seeded history 18/20/21 Nov → strip `..X.XXT` (3 of 7); typed today's code → `..X.XXX` (4 of 7), RELIABLE toast fired.

### Next
- Sound cue for contract completion distinct from the normal match chime.

## Iteration 25 — Contract & Heist Completion Sound Cues (#36)
**Date:** 2026-11-22
**Branch:** feat/iter-25-contract-sounds → PR → main

### Planned
- Distinct audio reward for contracts (Iteration 24 "Next").

### Changed
- `src/utils/sounds.js` — `playContractComplete()` (original G-major → C-major square-wave stab + triangle bass) and `playHeistComplete()` (existing cash register, rising E-major arpeggio, E2 triangle thump + noise). Both respect mute.
- `src/pages/Home.jsx` — effect on `contractToast` plays the matching cue 600 ms after the match (so `cheat_activated.mp3` is not drowned out); timer cleared on unmount. Matching/input logic untouched.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 3 pre-existing warnings
- Headless Chromium with an `AudioParam.value` spy (frequencies actually scheduled ≥ 400 ms after the match): daily contract → all six chord tones (392/494/587, 523/659/784) present, no heist tones; weekly heist → full arpeggio (330…988) + 82 Hz thump; muted via the Mute button → none of the contract tones.

### Next
- Settings toggle for contract cards (hide for minimal UI).

## Iteration 26 — Escape Closes Every Modal + Dialog Semantics (#38)
**Date:** 2026-11-22
**Branch:** feat/iter-26-escape-modals → PR → main

### Found (headless audit)
- Shop, History, Achievements, Codex did **not** close on Escape; Finder only did while its input had focus. None of the five panels had `role="dialog"`.

### Changed (`src/pages/Home.jsx`)
- One effect, attached only while an overlay is open: Escape closes Shop / History / Achievements / Codex / Finder. The cheat buffer only reads A–Z, so cheat input (keyboard + gamepad) is untouched.
- `role="dialog"` + `aria-modal="true"` + `aria-label` on all five panels.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 3 pre-existing warnings
- Headless Chromium, per modal: open via its button → 1 visible `role=dialog` → Escape → 0 overlays (before: Shop/History/Achievements/Codex stayed open).
- After closing Achievements with Escape, typing HESOYAM still registers (CHEATS counter 1).

### Next
- Return focus to the opening button when a modal closes; trap Tab inside open dialogs.

## Iteration 27 — Dialog Focus Management (#40)
**Date:** 2026-11-22
**Branch:** feat/iter-27-dialog-focus → PR → main

### Planned
- Iteration 26 "Next": focus return + Tab trap.

### Changed (`src/pages/Home.jsx`)
- On open: focus moves to the first focusable element in the open `role="dialog"` (Codex/Finder inputs that autofocus keep focus).
- Tab / Shift+Tab cycle inside the dialog (never reach the page behind).
- On close (Escape, ✕, backdrop): focus returns to the opener. The opener is tracked with a `focusin` listener (last focused element outside any dialog) because Codex/Finder inputs autofocus during commit, before the effect runs — the first attempt using `document.activeElement` failed for those two.
- Same single effect as the Escape handler from iteration 26; cleanup cancels the rAF and listener.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 3 pre-existing warnings
- Headless Chromium, keyboard only (focus opener → Enter): all 5 dialogs → focus inside = true, 25 Tab/Shift+Tab presses → 0 escapes, Escape → focus back on the opener = true. Iteration 26 Escape audit still 5/5 closed. HESOYAM registers afterwards.

### Next
- Contract cards hide toggle in the shop/settings.

## Iteration 28 — Radio No Longer Re-renders the Whole Page (#42)
**Date:** 2026-11-22
**Branch:** perf/iter-28-radio-rerenders → PR → main

### Found (headless idle profile, 10 s)
- The VU meter called `setVuBarHeights` on **every animation frame** (≈60×/s, also while paused — a fresh array each frame), and the station clock called two setters every 100 ms. Each call re-rendered the entire ~3000-line `Home` component.

### Changed
- `src/components/RadioWidgets.jsx` (new, presentational): `RadioVuMeter` owns its bar state, animates at ~15 fps, and runs no loop at all while paused; `RadioClock` reads the shared `stationProgressRef` every 250 ms and skips no-op updates.
- `src/pages/Home.jsx`: VU state/rAF and clock state removed; the 100 ms interval still advances every station's virtual progress (ref only, no setState). Markup/classes unchanged. Cheat input untouched.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, **2** warnings (was 3: the radio effect's missing `currentStreak` dependency is gone with the VU code)
- Idle 10 s, before → after (two runs): script 401 → 117/125 ms, layout 77 → 41 ms, DOM mutations 8,746 → 2,166/2,136; style recalc ~unchanged (CSS animations dominate).
- Live: clock 00:00 → 00:02 and progress bar grows over 2 s, VU heights change; after Pause the VU is static at 2 px while the virtual clock keeps running (same as before).

### Next
- Profile style recalculation (ambient CSS animations) on low-end phones.

## Iteration 32 — WANTED Toast Cleared From the Contract Card (#50)
**Date:** 2026-11-25
**Branch:** fix/iter-32-wanted-toast-pos → PR → main

### Found (iteration 29 note)
- The transient WANTED toast (fixed `top:80px; left:12px`) sat exactly on the daily contract card (fixed `top:96px; left:12px`, z 150 vs 89) while shown.

### Changed (`src/App.css`)
- Toast moved to the top-right corner (`right:12px`), keyframes mirrored so it still slides in/out from its own edge. Combo counter sits at mid-height on the right — no conflict.
- Phones (≤480px): toast dropped to `top:92px; right:8px` beside the compact 172px card, shrunk (`max-width:164px`, smaller fonts) so it never crosses the card edge.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium, settled toast vs card rects after a HESOYAM-triggered toast: 375×740 (209..367 vs card ..184), 360×640 (194..352), 768×1024 (568..756), 1280×800 (1080..1268) — zero intersection at every width; first phone pass at 375 (before the phone compaction) showed a 9px overlap and was fixed.

### Next
- Free choice.

## Iteration 31 — Runtime perf-lite Mode for Weak Devices (#48)
**Date:** 2026-11-25
**Branch:** perf/iter-31-perf-lite → PR → main

### Planned
- Pending item from iterations 28/29: recalculate/disable ambient CSS animations at runtime on low-end phones, complementing the OS-level `prefers-reduced-motion` fallback.

### Changed
- `src/pages/Home.jsx` — one boot-gated effect: weak hardware hints (`hardwareConcurrency <= 2` or `deviceMemory <= 2`) add `perf-lite` on `<html>` instantly; otherwise a 2 s rAF FPS sample after boot adds it below 30 fps. No React state, no re-render of Home. rAF cancelled on unmount.
- `src/App.css` — `html.perf-lite` block mirroring the iteration 29 reduce block: all animations/transitions collapse to end state, drifting decorative layers (`.float-text`, `.ambient-dust`) hidden.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium (software raster, ~14 fps on this page — the exact target scenario): fps sample → `perf-lite` applied, float-text `display:none`, animation-duration `1e-05s`. Fast branch exercised end-to-end by mocking `performance.now` to 1/10 speed (sample collects ~20 s of frames as "2 s" ≈ 140 fps) → `perf-lite` NOT applied. Hint branch: `hardwareConcurrency` overridden to 2 → applied right after boot, no sample wait.
- Under `perf-lite`: HESOYAM registers (CHEATS 1), pop, contract card and CJ all visible. `prefers-reduced-motion: reduce` regression: no CSS animations running (only the VU meter's transient 0.01 ms height transitions, cost-free).
- Env caveat: this headless setup never reaches 30 fps even unthrottled (software rendering), so on-device the threshold only fires on genuinely struggling renderers; worst case is the already-shipped reduced-motion look.

### Next
- Move the transient WANTED toast — it overlaps the contract card while shown (iteration 29 finding).

## Iteration 30 — Contract Card Hide Toggle in Shop (#46)
**Date:** 2026-11-25
**Branch:** feat/iter-30-contract-hide-toggle → PR → main

### Planned
- Pending item from iterations 25/27: a settings/shop toggle to hide the contract cards, saved with the save.

### Changed
- `src/pages/Home.jsx` — `hideContracts` state persisted in localStorage (`hideContractCards`, `'1'/'0'`); `toggleHideContracts` writes through. The daily contract card (with the weekly heist section inside it) renders only when the toggle is off; the payout effect and `contractToast` are untouched, so contracts still pay out while hidden. New always-visible "⚙ OPTIONS" section at the bottom of the shop content: one `aria-pressed` button, CONTRACT CARDS — SHOWN/HIDDEN.
- `src/App.css` — `.shop-option-row` (+ `.off` state, hover, reduced-motion covered by the global block from iteration 29).

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium: card visible by default → shop toggle → HIDDEN + `aria-pressed=true` + `hideContractCards='1'` + card gone; reload → card still hidden (persisted); toggle back → SHOWN, card back, `'0'`. HESOYAM after all of it: CHEATS 1, pop shown — core input intact. Escape still closes the shop.

### Next
- Runtime perf-lite mode: disable ambient CSS animations on weak devices (complements `prefers-reduced-motion`).

## Iteration 29 — Global prefers-reduced-motion Fallback (#44)
**Date:** 2026-11-22
**Branch:** feat/iter-29-reduced-motion → PR → main

### Found
- ~100 `@keyframes` (strobe and lightning flashes, screen shake, ambient loops); with the OS asking for reduced motion, 90 animations were still running (headless `reducedMotion: 'reduce'`). Only two small reduce rules existed (from iterations 20/24).

### Changed (`src/App.css`)
- Global `@media (prefers-reduced-motion: reduce)` block at the end of the file: every animation/transition collapses to its end state (0.01 ms, one iteration, no delay); infinite loops therefore stop. Purely decorative drifting layers (`.float-text`, `.ambient-dust`) are hidden because they would otherwise freeze across the middle of the screen.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless: running animations 92 (default) vs **0** (reduce); HUD, contract card, radio, WANTED panel, header buttons and CJ all visible under reduce; HESOYAM still registers and its match panel shows; screenshot reviewed (first pass showed frozen ambient cheat names mid-screen → hidden).

### Next
- The transient WANTED toast overlaps the contract card (top-left) while it is shown — move the toast or the card.

## Iteration 33 — Gamepad Rumble Feedback on Match & Miss (#52)
**Date:** 2026-11-25
**Branch:** feat/iter-33-gamepad-rumble → PR → main

### Planned
- Resumed the round-1 WIP stash (39 lines in `Home.jsx`): dual-rumble haptics on match and miss.

### Changed (`src/pages/Home.jsx`)
- Rumble effect: on match a 90 ms victory thump (strong-biased), on miss a 220 ms shudder (weak-biased). Reads connected gamepads' `vibrationActuator` only — input handling untouched; silent no-op without a gamepad or the actuator API. Honors mute and the iteration 29/31 fallbacks: skipped under `prefers-reduced-motion: reduce` or `perf-lite`.
- Miss detection made reachable: `resetOnInactivity`'s fail branch was dead code — the 2 s input-clear timer always emptied the buffer before the 3.5 s inactivity timer ran, so `inputs.length > 0` never held. The miss branch (MISSED overlay, fail sound, streak break, CJ disappoint) now lives in the 2 s clear itself, gated by refs mirroring `hadInputSinceMatch`/`matchedCheat` (timers inside the mount effect would otherwise see stale state).

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium with a mocked gamepad `vibrationActuator`: HESOYAM → `dual-rumble` 90 ms/0.4/0.9 + CHEAT ACTIVATED; unmatched input (QWQ) idle 2 s → MISSED overlay + 220 ms/0.9/0.2 shudder; a second match rumbles again; clearing after a match never false-triggers the miss. Muted match → no rumble; `perf-lite` on `<html>` → no rumble (match UI unaffected); forced `prefers-reduced-motion` → no rumble. HESOYAM still registers in every scenario (core keyboard input intact).

### Next
- Free choice.

## Iteration 34 — 30-Second Cheat Sprint Mode (#54)
**Date:** 2026-11-25
**Branch:** feat/iter-34-sprint-mode → PR → main

### Planned
- New optional game mode: a 30 s time attack — enter as many correct cheats as possible; live countdown + score, result card, personal best persisted.

### Changed
- `src/components/SprintTimer.jsx` (new, presentational): self-owned 250 ms tick, `role="timer"`; the clock never re-renders the ~3000-line Home tree (iteration 28 lesson).
- `src/pages/Home.jsx` — `sprint`/`sprintResult`/`sprintBest` (localStorage `sprintBest`); `startSprint` schedules one timeout and reads the score through a ref (no stale closure); matches counted by a `matchedCheat` observer effect, so cheat input handling is untouched. Sprint bar lives top-left above the contract card: START 30s SPRINT (+ BEST n) → SPRINT clock + SCORE n → SPRINT OVER / NEW RECORD! card with RETRY and ✕ (best persists across reload).
- `src/App.css` — `.sprint-bar` pixel-panel styling (amber border, hard shadow), match-state and ✕ button styles, ≤480px compaction. No animations → nothing for reduced-motion/perf-lite to collapse.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium: idle bar (no clock, no BEST) → start → `0:29` ticking + SCORE 0 → HESOYAM + BAGUVIX inside the sprint → SCORE 2, CHEAT ACTIVATED; expiry → NEW RECORD!, "2 cheats · best 2", RETRY; ✕ → back to START with BEST 2; `localStorage.sprintBest = '2'`; reload → BEST 2 still shown. HESOYAM outside a sprint still matches (banner) and leaves the sprint bar idle — core input intact.

### Next
- Free choice.

## Iteration 35 — Closest-Cheat Hint on Miss (#56)
**Date:** 2026-11-25
**Branch:** fix/iter-35-miss-hint → PR → main

### Planned
- After a miss, show the closest real cheat by longest shared keyboard prefix ("CLOSEST: HESOYAM" under MISSED); no hint for garbage input; hint resets on the next keystroke.

### Changed
- `src/pages/Home.jsx` — `missSuggest` state; the iteration 33 miss branch now snapshots the typed letters (new `inputsRef` mirror, A–Z filtered) before clearing and scans `cheatsData.cheats` pcSequences for the longest shared prefix; `scheduleTimeoutMessage` clears the hint on every new input. Additive — input handling untouched.
- `src/App.css` — `.wasted-hint`: Press Start 2P amber line under the MISSED text (same 1.2s fade, z 155), scaled down on small screens via `clamp`.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium (puppeteer-core + chrome-headless-shell): HESOL → MISSED + "CLOSEST: HESOYAM"; QWQ → MISSED with no hint; HESOYAM after a miss → CHEAT ACTIVATED, overlay and hint gone; BAGUVIX completes normally afterwards. Algorithm cross-checked offline against the real `cheats_v2.json` (HESOL → prefix 4 → HESOYAM).
- Note: the first two E2E attempts showed a false negative — the browser daemon was wedged (Runtime.evaluate timeouts) and mis-delivered keys; the identical bundle hash of the clean build (index-BClFSNhw.js) plus a passing run on that exact build ruled out an app bug.

### Next
- Free choice.

## Iteration 36 — TOP CHEATS Frequency Strip in History (#58)
**Date:** 2026-11-25
**Branch:** feat/iter-36-top-cheats → PR → main

### Planned
- History modal: a "TOP CHEATS" strip above the entry list showing the 5 most-used cheats with counts, derived from the stored history — no new storage.

### Changed
- `src/pages/Home.jsx` — `topCheats` useMemo (counts by entry name, desc, top 5); rendered as chips inside the history dialog only when history is non-empty. Additive; list, dialog semantics and input handling untouched.
- `src/App.css` — `.top-cheats` flex-wrap strip (amber hairline separator), `.top-cheats-title` pixel label, `.top-cheat-chip` VT323 chips. No animations.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium (puppeteer-core): HESOYAM ×2 + BAGUVIX → history dialog shows "TOP CHEATS" with chips `Armor, health and $250,000 in money ×2` and `Unlimited health ×1` (names as stored by the history entries), sorted by count, 3 entries listed below; Escape still closes the dialog; HESOYAM still matches afterwards.

### Next
- Free choice.

## Iteration 37 — Sprint-End Rumble: Double Pulse on New Record (#60)
**Date:** 2026-11-25
**Branch:** feat/iter-37-sprint-rumble → PR → main

### Planned
- Extend the iteration 33 gamepad rumble to sprint end: soft thump on expiry, double pulse (staged second effect, 180 ms apart) when the sprint ends on a NEW RECORD. Same mute / reduced-motion / perf-lite gates.

### Changed
- `src/pages/Home.jsx` — rumble effect gains a `sprintResult` branch (moved next to the sprint state so `sprintResult` is in scope; a first cut placed before the declaration crashed the app with a TDZ ReferenceError, caught immediately by the E2E boot probe). End effects take priority over the (possibly stale) match state.

### Found (headless, during verification — filed as #61)
- Pre-existing on main: `matchedCheat` never auto-clears after a match — the input effect re-runs on `matchedCheat` change and its cleanup cancels the 2 s clear the match keystroke scheduled; banner + `.screen-flash` sampled every 500 ms for 14 s post-match never clear (reproduced on the iteration 36 bundle). Not fixed here (out of scope); the sprint-end rumble reads `sprintResult` first so it stays correct regardless.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium (puppeteer-core + mocked `vibrationActuator`): sprint with 1 match → NEW RECORD! + thumps `[90/0.4/0.9]` at match, then `[90/0.2/0.6, 180/0.2/0.9]` at expiry; second sprint with no matches → SPRINT OVER + only `[90/0.2/0.6]` (no record pulse); `perf-lite` re-added → HESOYAM matches (banner) with zero rumble calls (gate holds). Match/miss variants unchanged from iteration 33.

### Next
- Fix the stuck matchedCheat (#61); free choice otherwise.

## Iteration 38 — Bugfix: Matched Cheat Auto-Clears Again (#61)
**Date:** 2026-11-25
**Branch:** fix/iter-38-stuck-match → PR → main

### Found
- #61 (pre-existing, surfaced in iteration 37): after a match the input effect re-subscribed (its deps include `matchedCheat`) and the cleanup cancelled the 2s auto-clear the match keystroke had scheduled — CHEAT ACTIVATED banner, `.screen-flash` and the match panel lingered until the next keystroke.

### Changed (`src/pages/Home.jsx`)
- Timer teardown moved out of the re-run cleanup into a new unmount-only effect (`[]` deps): `clearTimerRef` and `timeoutMessageRef` are now cancelled only when Home unmounts, never on effect re-subscription. Miss-branch semantics unchanged (`matchedRef` guard keeps it silent after a real match); the inactivity timer still resets normally.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium regression probe: HESOYAM → banner + `.screen-flash` shown, cleared ≤2.5s with no MISSED overlay; QWQ → MISSED still fires after 2s; HESOYAM re-match works after the miss; streak HUD intact.

### Next
- Free choice.

## Iteration 39 — Screen-Reader Announcer for Match / Miss / Sprint (#64)
**Date:** 2026-11-25
**Branch:** feat/iter-39-sr-announcer → PR → main

### Planned
- All match/miss/sprint feedback was visual + audio (and rumble is muted/reduced-motion gated), leaving screen-reader users without any event feedback. Add a single global `aria-live="assertive"` region announcing those events.

### Changed
- `src/pages/Home.jsx` — `announce` state + `announceEvent()` helper (clears the text first so identical consecutive messages re-announce); the match-count observer announces "Cheat activated: <name>", the iteration 33 miss branch announces "Missed", and a new observer announces sprint results ("Sprint over — new record, N cheats"). Observer only — input handling untouched.
- `src/App.css` — `.sr-announcer`: visually hidden (same pattern as `.finder-sr-status`). No animations → nothing for reduced-motion/perf-lite.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium: region exists with `aria-live="assertive"`; HESOYAM → "Cheat activated: …"; QWQ → "Missed — cheat buffer cleared"; HESOYAM again re-announces (clear-then-set works).

### Next
- Free choice.

## Iteration 40 — Keyboard Heat Strip (#66)
**Date:** 2026-11-25
**Branch:** feat/iter-40-key-heat-strip → PR → main

### Planned
- A compact A–Z strip under the input display; tiles light up as keys are pressed in the current attempt, resetting on auto-clear — at-a-glance feedback for which letters are in the buffer.

### Changed
- `src/pages/Home.jsx` — `typedLetterSet` useMemo derived from `inputs` (no new state); 26 tiles rendered only while typing and unmatched, `aria-hidden="true"` (SR users are served by the iteration 39 announcer). Input handling untouched.
- `src/App.css` — `.key-heat` / `.key-heat-tile` (+ `.key-hit` amber glow, 120ms transitions, ≤640px compaction).

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium: strip hidden idle → typing HE lights exactly H+E (sorted set compare; DOM order is A–Z) → completing HESOYAM hides the strip behind the match panel → 2s auto-clear resets it (hidden) → BAGUVIX re-match works. First probe run had a false negative (browser daemon hiccup, same as iteration 35 note); clean re-run on the identical bundle: ALL PASS.

### Next
- Free choice.

## Iteration 41 — Save Export / Import (#68)
**Date:** 2026-11-25
**Branch:** feat/iter-41-save-io → PR → main

### Planned
- No way to back up or move progress (stats, cash, cosmetics, history, sprint best). Add EXPORT SAVE / IMPORT SAVE in the shop ⚙ OPTIONS section.

### Changed
- `src/pages/Home.jsx` — `saveIO`/`saveText`/`saveStatus` state; export dumps the whole localStorage as JSON into a copyable textarea (this app owns its storage — deliberate ceiling: per-key filtering can come later); import validates JSON (object, ≥1 string-valued key), writes back only string values, shows "SAVE RESTORED — RELOADING…" and reloads. Invalid input → "INVALID SAVE DATA". Textarea typing is ignored by the cheat handler (existing INPUT/TEXTAREA guard).
- `src/App.css` — `.save-io*` pixel-styled buttons, textarea, status line. No animations.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium: EXPORT produces valid JSON containing `gtaCash`/`cheatHistory`; APPLY with `not json{` → INVALID SAVE DATA; APPLY with crafted save (1 BAGUVIX history entry, cash 500) → reload → `gtaCash='500'`, history restored; HESOYAM still matches after import+reload. (First probe run false-failed: React's value tracker swallows programmatic textarea value sets — probe now uses the native value setter; app behavior for real typing/pasting is unaffected.)

### Next
- Free choice.

## Iteration 42 — Per-Cheat Best Time Stamps in the Codex (#70)
**Date:** 2026-11-25
**Branch:** feat/iter-42-codex-best-times → PR → main

### Planned
- The HUD tracks one global best time; there is no per-cheat record. Record a best time per cheat and stamp it on its codex dossier.

### Changed
- `src/pages/Home.jsx` — `cheatBestTimes` state (localStorage `cheatBestTimes`, id → ms); the match block records `min(prev, elapsed)` per cheat next to the global best-time update. Declassified codex entries render a green `BEST X.XXs` stamp when a record exists; classified entries stay untouched.
- `src/App.css` — `.codex-best-time` pixel stamp. No animations.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium: HESOYAM ×2 → `cheatBestTimes` has one id with 0 < ms < 5000; codex shows `BEST 0.68s` on the declassified entry; stamp count ≤ declassified count (classified entries unstamped); Escape closes codex, BAGUVIX re-match intact.

### Next
- Free choice.

## Iteration 43 — Konami Code Easter Egg (#72)
**Date:** 2026-11-25
**Branch:** feat/iter-43-konami-egg → PR → main

### Planned
- ↑ ↑ ↓ ↓ ← → ← → B A triggers a ROCKET celebration overlay, SR announcement, achievement sound and a one-time +$100 cash bonus (persisted `konamiUnlocked`).

### Changed
- `src/pages/Home.jsx` — own keydown listener with a sliding 10-key buffer (arrows/B/A only — keys the A–Z cheat matcher ignores, so cheat input is untouched); `konamiFlash`/`konamiBonus` state; +100 cash written through to `gtaCash` on first unlock (state alone wasn't persisted); `announceEvent` for SR; auto-hide after 2.6 s; re-entry celebrates without paying.
- `src/App.css` — `.konami-overlay` / `-text` / `-sub` (+ pop keyframe, covered by the iteration 29 reduced-motion collapse).

### Found (during verification)
- First cut called the effect-local `playNotif()` → lint `no-undef` error; switched to the imported `playAchievementSound()`. Also caught that `setCash` alone doesn't persist (other paths write `gtaCash` directly) — probe verified `localStorage.gtaCash` after reload.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium: overlay + "+$100" + `gtaCash` 50→150 + flag persisted; overlay auto-hides; repeat entry celebrates with no bonus and no cash change; HESOYAM still matches.

### Next
- Free choice.

## Iteration 44 — Streak Fire: HUD Streak Burns at 5+ (#74)
**Date:** 2026-11-25
**Branch:** feat/iter-44-streak-fire → PR → main

### Planned
- The HUD streak stat only had a flat red tint from streak 3 (`streak-hot`); momentum deserved an escalation.

### Changed
- `src/pages/Home.jsx` — streak ≥ 5 adds `streak-fire` class and a 🔥 mark before the number. Derived from `currentStreak` — no logic changes.
- `src/App.css` — `.streak-fire`: layered orange/red/amber text-shadow glow with a 700 ms pulse (`streak-fire-pulse`; collapsed to end state by the iteration 29 reduced-motion block).

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium, 5-match ladder (HESOYAM/BAGUVIX/AEZAKMI×): HUD progression `1, 2` plain → `3, 4` streak-hot → `🔥5` streak-fire+flame, exactly as designed; streak survives per-match auto-clears.

### Next
- Free choice.

## Iteration 45 — Random Target Roulette (#76)
**Date:** 2026-11-25
**Branch:** feat/iter-45-target-roulette → PR → main

### Planned
- 🎲 RANDOM TARGET picks a cheat to type; hitting it pays +$50, announces, increments HITS and rolls a new target. SKIP rolls without paying; ✕ closes.

### Changed
- `src/pages/Home.jsx` — `roulette` state + `rouletteRef` mirror; `pickRoulette` (re-picks away from the current id); a `matchedCheat` observer pays the bonus (cash written through to `gtaCash`, same as the iteration 43 lesson), plays `playCoinPickup`, announces, and rolls the next target. Bar sits under the sprint bar; green pixel panel. Cheat input untouched.
- `src/App.css` — `.roulette-bar` / `-label` / `-name` / `-hits` / `-btn`. No animations.

### Verification
- `npm run build` ✓ · `npm run lint` 0 errors, 2 pre-existing warnings
- Headless Chromium: idle bar → 🎲 → TARGET shown (HITS 0) → typing the target's real pcSequence from `cheats_v2.json` → HITS 1, cash increased, new target ≠ previous → SKIP rolls a fresh target without paying → ✕ closes → HESOYAM still matches. (A first-run cash equality assertion was loosened: daily-contract bonuses legitimately pay alongside the roulette bonus.)

### Next
- Free choice.
