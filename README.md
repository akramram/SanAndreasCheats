# San Andreas Cheats (PS2) — Gamepad Cheat Detector

A small React + Vite web app that lets you enter Grand Theft Auto: San Andreas (PS2) cheat codes with a gamepad and see instant matches. It listens to the browser Gamepad API, buffers recent inputs, and highlights the best matching cheat as you type. Includes a fireworks celebration when a cheat is detected.

## Demo / Quick start

- Requirements: Node.js 18+ and npm
- Install dependencies:
  - `npm install`
- Start the dev server:
  - `npm run dev`
- Open the printed local URL (e.g. http://localhost:5173) in a desktop browser that supports the Gamepad API (Chrome/Edge/Firefox). Connect a controller before or after loading the page.

![Demo](./public/demo.gif)

## How it works

- The app watches controller buttons and stick edges via the Gamepad API.
- Inputs are appended to a rolling buffer (max 14 by default).
- On every input, the app checks the tail of the buffer against all known cheat sequences from `src/assets/cheats.json`.
- If multiple cheats match, the longest sequence wins ("best match").
- After a match, the input buffer is cleared so you can immediately enter another code. If there’s no activity, the buffer auto‑clears after 5 seconds.

## Data format (cheats.json)

Cheats are defined in `src/assets/cheats.json`.

Top-level keys:
- `version`: data schema version
- `platform`: here it’s `PS2`
- `title`: display title for the dataset
- `allowed_buttons`: the symbols recognized by the matcher (e.g., ✕, ◯, □, △, L1, R1, etc.)
- `recommended_fields`: suggested fields per cheat
- `cheats`: array of cheat entries

Each cheat entry can include:
- `id`: unique identifier (kebab-case recommended)
- `name`: display name
- `description`: short explanation
- `category`: e.g., `player`, `weapon`, `vehicle`, `spawn`, `wanted-level`
- `sequence`: array of button symbols, in order
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

### Adding or editing cheats
1. Open `src/assets/cheats.json`.
2. Add a new object to the `cheats` array with the fields above.
3. Ensure every symbol appears in `allowed_buttons`; if not, add it there as well.
4. Save — the dev server will hot-reload.

## Controls mapping

- The app uses PlayStation-style symbols: ✕, ◯, □, △, D‑pad arrows (↑ ↓ ← →), shoulders (L1/R1/L2/R2), sticks (L3/R3), and Start/Select (▸/▭), plus PS.
- On standard-mapped controllers, these are read from `navigator.getGamepads()`; buttons are edge-detected to avoid repeats.
- Analog sticks generate directional “edge” inputs when crossing thresholds (e.g., `LUp`, `LDown`, `LLeft`, `LRight`). These can be part of sequences if present in your data.

## Scripts

Defined in `package.json`:
- `npm run dev` — start Vite dev server
- `npm run build` — build for production (outputs `dist/`)
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Tech stack

- React 19
- Vite 7
- Tailwind CSS 4
- ESLint 9
- React Router DOM 7 (available; routing not required for core usage)

## Project structure

- `index.html` — Vite entry HTML
- `src/main.jsx` — React bootstrap
- `src/App.jsx` — App shell
- `src/pages/Home.jsx` — main UI and gamepad logic
- `src/assets/cheats.json` — cheats data source
- `public/` — static assets (e.g., `cj.svg`)
- `tailwind.config.js`, `postcss.config.js` — styling configuration

## Development notes

- Matching strategy prefers the longest matching sequence when more than one cheat matches the current buffer.
- The buffer auto-clears after 5 seconds of inactivity to avoid accidental carryover.
- When a cheat is matched, a short particle/fireworks animation plays.

## Deployment

Any static host works. Typical options:
- Vercel/Netlify: connect repo, set build command `npm run build` and output directory `dist`.
- GitHub Pages: build locally and push `dist` to a `gh-pages` branch or use an action.

## Troubleshooting

- No inputs detected:
  - Ensure the browser supports the Gamepad API and your controller is paired/connected.
  - Trigger an initial user gesture (click/keydown) — some browsers require it before reading gamepads.
  - Try Chrome or Edge if your browser blocks gamepad access.
- Match seems wrong or missing:
  - Confirm the sequence in `cheats.json`.
  - Remember that the app matches the tail of the buffer; extra prior inputs are ignored.
  - Increase `MAX_INPUTS` in `Home.jsx` if you need longer codes.

## Roadmap / Ideas

- Fill in TBD sequences (e.g., Fast Run, Infinite Sprint) with verified inputs.
- Add filtering/search UI for cheats.
- Multi-platform datasets (Xbox/PC) with runtime platform switch.
- Visual on-screen gamepad with live button feedback.

## License

Specify your license here (e.g., MIT). If you’d like, I can add an MIT License file.
