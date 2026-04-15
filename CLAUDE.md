# San Andreas Cheats — Visual Iteration Guide

## Project Overview
A React + Vite web app where users input GTA San Andreas cheat codes via keyboard or gamepad. The goal is to make it visually engaging with pixel-art aesthetics, animations, and moving parts — while keeping it fully functional.

## Tech Stack
- React 19, Vite 7, Tailwind CSS 4
- Single page app (Home.jsx is the main component)
- Deployed via GitHub Pages

## Visual Iteration Rules

### Art Direction
- **Pixel-art based aesthetic** — think retro GTA SA, 8-bit/16-bit vibes
- Use pixel fonts (e.g., Press Start 2P, VT323, or similar Google Fonts)
- Colors: amber/gold (#f59e0b, #fbbf24), dark backgrounds (#0a0a0a, #111), green accents (#34d399), red (#f87171)
- Keep the GTA San Andreas mood — gritty, urban, retro gaming

### What to Iterate On (in order of priority)
1. **Text/input display** — make the input buffer visually exciting (typing effect, character-by-character reveal, glowing text, pixel borders)
2. **Cheat match celebration** — enhance the cheat-pop animation (screen flash, bigger particles, pixel-art explosions, screen shake)
3. **Background atmosphere** — add subtle animated pixel-art elements (scrolling cityscape, stars, floating cheat text in background)
4. **CJ avatar** — add idle animation or reactions (bobbing, reaction to correct/wrong input)
5. **History modal** — style it with pixel-art borders, retro UI elements
6. **HUD elements** — add a retro-gaming HUD feel (stats, streak counter, timer display with pixel font)
7. **Transitions** — smooth transitions between states (idle → typing → matched)
8. **Loading/start screen** — add a cool retro start screen

### What NOT to Change
- **Do NOT modify the game logic** (input handling, cheat matching, gamepad API code)
- **Do NOT modify the data files** (cheats_v2.json)
- **Do NOT change the routing structure**
- **Do NOT break existing functionality** — all current features must keep working
- **Do NOT add new npm dependencies** without documenting why

### CSS Approach
- Use Tailwind CSS classes primarily
- Complex animations go in App.css with @keyframes
- Keep everything in existing files (Home.jsx, App.css, index.css)
- New component files are OK if they're purely visual/presentational

### Performance
- Animations must be smooth (60fps target)
- Use `will-change`, `transform`, `opacity` for animations (GPU-accelerated)
- No heavy JS-based animations — prefer CSS animations/transitions
- Keep bundle size small

## Iteration Workflow

### Before Starting Each Iteration
1. Read the latest ITERATION_LOG.md to understand what was done previously
2. Review the current state of Home.jsx, App.css, index.css
3. Pick ONE or TWO visual improvements to focus on (don't try to do everything at once)
4. Plan the changes before coding

### After Completing Each Iteration
1. Run `npm run build` to verify no errors
2. Run `npm run lint` to check for linting issues
3. Update ITERATION_LOG.md with:
   - Iteration number and date
   - What was planned
   - What was actually changed (files modified)
   - What was improved
   - What's still broken or needs fixing
   - What's planned for next iteration
4. Commit with message like: `feat(visual): iteration N - [brief description]`
5. Push to the `visual-iterations` branch

## Current Visual State
- Basic amber text on black background
- Simple cheat-pop animation (scale + opacity + shadow)
- Particle fireworks on match (28 particles, 6 colors)
- Pulsing "Enter cheat code" prompt
- Minimal styling on history modal

## Key Files
- `src/pages/Home.jsx` — main UI component (DO NOT change game logic)
- `src/App.css` — animations and custom styles
- `src/index.css` — Tailwind imports, global styles
- `src/App.jsx` — app shell (don't change)
- `src/main.jsx` — React bootstrap (don't change)
- `public/cj.svg` — CJ avatar
- `public/cheat_activated.mp3` — sound effect
