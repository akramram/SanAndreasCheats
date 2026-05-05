# San Andreas Cheats (PS2) — Gamepad & Keyboard Cheat Detector

A fully immersive, retro-styled React web app that lets you enter Grand Theft Auto: San Andreas (PS2) cheat codes via keyboard or gamepad. Features a living Los Santos nightscape, dynamic weather, a full GTA radio system, combo streaks, achievements, a cash economy with cosmetic shop, and a Cheat Codex discovery journal — all wrapped in a pixel-art CRT aesthetic.

**Live Demo:** https://akramram.github.io/SanAndreasCheats/

## Quick Start

- Requirements: Node.js 18+ and npm
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Open the local URL (e.g., http://localhost:5173) in a desktop browser
- Connect a controller (optional) — Chrome/Edge/Firefox supported

![Demo](./public/demo.gif)

## How It Works

### Core Input System
- **Keyboard:** Type cheat codes using mapped keys (see Controls below)
- **Gamepad:** The app watches controller buttons and stick edges via the Gamepad API
- Inputs are appended to a rolling buffer (max 14 by default)
- On every input, the app checks the tail of the buffer against all known cheat sequences from `src/assets/cheats_v2.json`
- If multiple cheats match, the longest sequence wins ("best match")
- After a match, the input buffer is cleared so you can immediately enter another code
- If there's no activity, the buffer auto-clears after 5 seconds

### Visual Feedback
- **Real-time match progress:** Characters turn green when they match a cheat prefix, red on a miss
- **Progress bar:** Thin gradient bar under the input shows how close you are to completing any cheat
- **Category scanner:** Octagonal radar at bottom-right shows which cheat category you're closest to matching

## Controls

### Keyboard Mapping
| PS2 Button | Keyboard Key |
|------------|-------------|
| ✕ (Cross) | Space |
| ◯ (Circle) | O |
| □ (Square) | P |
| △ (Triangle) | I |
| ↑ | W |
| ↓ | S |
| ← | A |
| → | D |
| L1 | Q |
| R1 | E |
| L2 | 1 |
| R2 | 3 |
| L3 | Z |
| R3 | C |
| Select | Tab |
| Start | Enter |

### Gamepad
- PlayStation-style symbols are read from `navigator.getGamepads()`
- Buttons are edge-detected to avoid repeats
- Analog sticks generate directional "edge" inputs when crossing thresholds (e.g., `LUp`, `LDown`, `LLeft`, `LRight`)

## Feature Overview

### CRT Boot Sequence
- Retro terminal boot screen on page load with green text, scanlines, and CRT flicker
- Staggered system messages ("LOADING CHEAT DATABASE", "GROVE STREET FAMILIES READY")
- Cinematic zoom-out transition to the main UI

### Living Los Santos Nightscape
- **Animated starfield** with twinkling stars
- **Parallax cityscape** — 2 scrolling silhouette layers at different speeds
- **Flickering neon signs** on buildings in 5 colors (pink, blue, green, amber, red)
- **Car headlight & taillight trails** at street level
- **Shooting stars** streaking across the sky
- **Police helicopter spotlights** sweeping across the scene
- **Airplanes** with authentic navigation lights (red port, green starboard, white strobe) and contrails
- **Ambient dust particles** floating through the atmosphere

### Dynamic Weather System
- 5-phase cycle (~85s total): Clear → Cloudy → Rain → Storm → Clearing
- **Rain:** 60-120 pixel-art raindrops, splash ripples, wet ground reflection
- **Storm:** Lightning bolts with SVG visuals, full-screen white flashes, thunder via Web Audio API
- **Wind gusts** during cloudy phases
- Weather indicator in top-left shows current phase

### Cheat Match Celebration
- "CHEAT ACTIVATED" banner slam animation
- 40-80 pixel-art square particles with size variety and spin
- 30 confetti pieces raining down
- Screen shake + amber flash overlay
- CJ avatar celebration bounce with speech bubble ("GROVE ST!", "HELL YEAH!")

### Combo & Streak System
- Combo counter with 5 intensity levels (green → blue → purple → red)
- HUD bar: total cheats, current streak, best streak, best time
- Fail feedback: red "MISSED" WASTED-style overlay + CJ disappointment animation
- Fireworks and confetti scale with combo level
- All stats persist in localStorage

### GTA Wanted Level Stars
- Iconic 5-star system tied to combo streak
- Star gain/loss animations with flash and pulse effects
- Color escalation: white → amber → red
- At 5 stars: pulsing red screen overlay, police siren via Web Audio API
- Wanted toast notifications with escalating messages

### Achievement System (15 Achievements)
- Categories: Speed, Streaks, Volume, Exploration
- Unlock toasts with retro "Achievement Unlocked" animation
- Trophy button with badge counter
- Full achievement gallery modal with progress bar
- Persistent via localStorage

### Cash Economy & Cosmetic Shop
- Earn GTA money for activating cheats ($100 base)
- Escalating payouts: speed bonus (<2s, <1s), combo multiplier (1.5x per level), rarity bonus (2x for long sequences)
- **BINCO SHOP** with 18 cosmetics across 4 categories:
  - Neon Colors (7) — change cheat match glow
  - Avatar Frames (4) — CJ border effects
  - Input Effects (3) — typing animations (trail, ghost, glitch)
  - Background Themes (3) — sunset, matrix, retrowave
- Cash register and coin pickup sound effects
- Persistent cash, owned items, and equipped items

### Cheat Codex — Spy Dossier Discovery Journal
- Full-screen dossier modal styled as classified C.R.A.S.H. files
- Undiscovered cheats show as "CLASSIFIED" with redacted black bars
- Discovered cheats are "DECLASSIFIED" with full info revealed
- 7 category tabs with per-category progress bars
- Search/filter within discovered entries
- "NEW DISCOVERY" toast on first-time finds
- Persistent via localStorage

### GTA SA Radio Station Tuner
- 11 authentic radio stations with real SoundCloud audio:
  - K-DST (101.1) — Classic Rock
  - Radio Los Santos (106.1) — West Coast Hip Hop
  - K-ROSE (97.6) — Country
  - K-JAH (103.7) — Reggae
  - Master Sounds (98.3) — Rare Groove
  - SF-UR (105.7) — House Music
  - Bounce FM (105.5) — Funk
  - Playback FM (105.1) — Old School Hip Hop
  - Radio X (104.1) — Alternative Rock
  - WCTR (95.6) — Talk Radio
  - CSR 103.9 (103.9) — Contemporary Soul
- Retro car radio panel with LCD display, scanlines, and VU meter
- Manual play/pause and prev/next controls
- Station transitions with static burst + tuning sound
- Each station has a looping virtual track duration
- Weather-reactive volume (storms = quieter)
- Combo-reactive panel glow

### Retro Sound Effects Engine
All sounds are procedurally synthesized via Web Audio API — no audio files needed (except the iconic `cheat_activated.mp3`):
- Pixel key clicks, gamepad press tones
- Cheat match fanfare (pitch scales with combo)
- Combo hit sweeps, fail buzzers
- Achievement unlock chime
- Boot sequence beeps and power-on thud
- Thunder rumble, rain ambient, wind gusts
- Police siren, wanted star tones
- Radio static, tuning sweep, genre-specific jingles
- Cash register, coin pickup, purchase sounds

## Data Format (cheats_v2.json)

Cheats are defined in `src/assets/cheats_v2.json`.

Top-level keys:
- `version`: data schema version
- `platform`: here it's `PS2`
- `title`: display title for the dataset
- `allowed_buttons`: the symbols recognized by the matcher
- `recommended_fields`: suggested fields per cheat
- `cheats`: array of cheat entries

Each cheat entry can include:
- `id`: unique identifier (kebab-case)
- `name`: display name
- `description`: short explanation
- `category`: e.g., `weapons`, `player-stats`, `vehicles`, `world`, `wanted-level`, `pedestrians`, `misc`
- `sequence`: array of button symbols, in order
- `pc_sequence`: optional PC keyboard sequence for display
- `notes`: provenance or verification notes

Example snippet:
```json
{
  "id": "infinite-ammo",
  "name": "Infinite Ammo + No Reload",
  "description": "Unlimited ammo without reloading",
  "category": "weapon",
  "sequence": ["L1", "R1", "□", "R1", "←", "R2", "R1", "←", "□", "↓", "L1", "L1"],
  "notes": "Verified from IGN"
}
```

### Adding or Editing Cheats
1. Open `src/assets/cheats_v2.json`
2. Add a new object to the `cheats` array with the fields above
3. Ensure every symbol appears in `allowed_buttons`; if not, add it there as well
4. Save — the dev server will hot-reload

## Scripts

Defined in `package.json`:
- `npm run dev` — start Vite dev server
- `npm run build` — build for production (outputs `dist/`)
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- ESLint 9
- React Router DOM 7
- Web Audio API (procedural sound synthesis)
- SoundCloud Widget API (radio audio)
- Gamepad API

## Project Structure

- `index.html` — Vite entry HTML
- `src/main.jsx` — React bootstrap
- `src/App.jsx` — App shell
- `src/pages/Home.jsx` — main UI, gamepad logic, and all feature systems
- `src/assets/cheats_v2.json` — primary cheats data source
- `src/assets/cheats_v1.json` — legacy cheats data
- `src/utils/sounds.js` — Web Audio API sound effects engine
- `src/App.css` — animations and custom styles
- `src/index.css` — Tailwind imports, global styles, scanline/starfield overlays
- `public/cj.svg` — CJ avatar
- `public/cheat_activated.mp3` — iconic cheat activated sound
- `ITERATION_LOG.md` — full visual iteration history

## Development Notes

- Matching strategy prefers the longest matching sequence when more than one cheat matches
- The buffer auto-clears after 5 seconds of inactivity
- All visual/gameplay state persists in localStorage (stats, achievements, codex, cash, cosmetics)
- Weather cycle runs independently of gameplay
- Radio auto-cycles only for stations without real SoundCloud audio
- SoundCloud embed requires external service availability; gracefully falls back to synthesized jingles

## Deployment

Any static host works. The project is deployed via GitHub Pages from the `main` branch.

To deploy manually:
1. Build: `npm run build`
2. Deploy the `dist/` folder to your static host

## Troubleshooting

- **No inputs detected:**
  - Ensure the browser supports the Gamepad API and your controller is paired/connected
  - Trigger an initial user gesture (click/keydown) — some browsers require it before reading gamepads
  - Try Chrome or Edge if your browser blocks gamepad access

- **Match seems wrong or missing:**
  - Confirm the sequence in `cheats_v2.json`
  - Remember that the app matches the tail of the buffer; extra prior inputs are ignored
  - Increase `MAX_INPUTS` in `Home.jsx` if you need longer codes

- **No sound:**
  - Web Audio API requires a user interaction first — click or press a key
  - Check if sound is muted via the speaker toggle button

- **Radio not playing:**
  - SoundCloud embeds may be blocked in some regions or by privacy extensions
  - The app will automatically fall back to synthesized jingles

## License

MIT
