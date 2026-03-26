# Octave Mapper

An interactive web application that visualizes the relationship between piano octaves and a 24-fret guitar fretboard. Build chords by clicking notes on either instrument, see them mapped across both with automatic chord detection and audio playback.

**Live:** [octave.devedco.com](https://octave.devedco.com/)

## Features

- **Interactive Piano** — C2 to B6, color-coded by octave
- **Interactive Fretboard** — 6 strings, 24 frets with note names and octave numbers
- **Chord Building** — click multiple notes to build chords; click again to remove a note
- **Chord Detection** — automatically identifies chord names (powered by tonal.js)
- **Bidirectional Sync** — click a piano key to highlight matching guitar frets, or vice versa
- **Custom Tunings** — 10 presets (Standard, Drop D, Drop C, Open G/D/E/A, DADGAD, and more) plus per-string semitone adjustment
- **Audio Playback** — hear notes via Tone.js synthesizer
- **Customizable Colors** — click any octave label to change its color via color picker
- **Octave Color Coding** — consistent colors across both instruments:
  - Octave 2: Orange
  - Octave 3: Blue
  - Octave 4: Green
  - Octave 5: Pink
  - Octave 6: Yellow

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

1. Click **Start Audio** to enable sound (required by browser autoplay policies).
2. Click any piano key or guitar fret to:
   - Hear the note
   - See matching notes highlighted on both instruments
   - Build chords by clicking multiple notes
3. See the detected chord name displayed above the instruments.
4. Change guitar tuning via the preset dropdown or per-string up/down buttons.
5. Customize octave colors by clicking the colored legend pills.
6. Click empty space to clear all active notes.

## Tech Stack

| Layer            | Technology          |
|------------------|---------------------|
| Framework        | React 19 + Vite     |
| Language         | TypeScript          |
| State Management | Zustand             |
| Audio Engine     | Tone.js (PolySynth) |
| Music Theory     | tonal.js            |
| Icons            | Lucide React        |
| Fonts            | Inter, JetBrains Mono |
| Styling          | SASS (SMACSS)       |
| Deployment       | Vercel              |

## Project Structure

```
src/
  components/
    Piano/            # Piano keyboard (Piano.tsx, PianoKey.tsx)
    Guitar/           # Fretboard (Guitar.tsx, GuitarString.tsx, GuitarFret.tsx, TuningSelector.tsx)
    Header.tsx        # App title
    Legend.tsx         # Octave color legend with color pickers
    ActiveNotes.tsx   # Active note chips + chord name detection
    StartAudioButton.tsx
  store/
    useAppStore.ts    # Zustand store (activeNotes, tuning, octaveColors, audioReady)
  audio/
    synth.ts          # Tone.js PolySynth setup and playNote()
  music/
    noteMap.ts        # Note calculations, tuning presets, helpers
  utils/
    octaveColor.ts    # Default octave color constants
  styles/
    _variables.scss   # Colors, dimensions, CSS custom properties, fonts
    _base.scss        # CSS reset and typography
    _layout.scss      # SMACSS layout modules
    _components.scss  # Component styles
    main.scss         # Master import
public/
  favicon.svg         # SVG piano keys icon
  robots.txt
  sitemap.xml
```

## Development

### Architecture

- **Zustand store** holds `activeNotes` (array of MIDI numbers), `tuning`, `octaveColors`, and `audioReady`.
- **Note matching** uses MIDI number comparison (via tonal.js) to handle enharmonic equivalents correctly.
- **Chord detection** uses `Chord.detect()` from tonal.js on the active pitch classes.
- **Tone.js PolySynth** is a module-scoped singleton in `synth.ts`, kept outside React's render cycle.
- **SASS** follows SMACSS architecture: variables, base, layout, components.

### Performance

- Tone.js and tonal.js are code-split into separate chunks for faster initial load.
- Fonts loaded with preload + media swap to avoid render blocking.
- CSS containment on piano and guitar containers for paint isolation.
- Static assets cached with immutable headers via Vercel.

### Security

Security headers configured in `vercel.json`:
- CSP, HSTS, X-Frame-Options (DENY), X-Content-Type-Options, Referrer-Policy, Permissions-Policy.

### SEO

- Open Graph + Twitter Card meta tags
- JSON-LD structured data (WebApplication schema)
- `<noscript>` fallback with semantic content
- robots.txt + sitemap.xml
