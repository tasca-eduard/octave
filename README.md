# Octave Mapper

An interactive web application that visualizes the relationship between piano octaves and a 24-fret guitar fretboard. Select notes on either instrument to see matching notes highlighted on both, with audio playback.

## Features

- **Interactive Piano** — C2 to B6, color-coded by octave
- **Interactive Fretboard** — 6 strings, 24 frets, standard tuning (E2, A2, D3, G3, B3, E4)
- **Bidirectional Sync** — click a piano key to highlight matching guitar frets, or click a fret to highlight the piano key
- **Audio Playback** — hear the note you click via Tone.js synthesizer
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
   - See all matching notes highlighted on both instruments
3. Click empty space to clear the selection.

## Tech Stack

| Layer            | Technology       |
|------------------|------------------|
| Framework        | React 19 + Vite  |
| Language         | TypeScript       |
| State Management | Zustand          |
| Audio Engine     | Tone.js          |
| Music Theory     | tonal.js         |
| Styling          | SASS (SMACSS)    |

## Project Structure

```
src/
  components/
    Piano/          # Piano keyboard (Piano.tsx, PianoKey.tsx)
    Guitar/         # Guitar fretboard (Guitar.tsx, GuitarString.tsx, GuitarFret.tsx)
    Header.tsx      # App title
    Legend.tsx       # Octave color legend
    StartAudioButton.tsx
  store/
    useAppStore.ts  # Zustand store (activeNote, audioReady)
  audio/
    synth.ts        # Tone.js PolySynth setup and playNote()
  music/
    noteMap.ts      # Note calculations using tonal.js
  utils/
    octaveColor.ts  # Octave-to-color mapping
  styles/
    _variables.scss # Octave colors, dimensions, CSS custom properties
    _base.scss      # CSS reset and typography
    _layout.scss    # SMACSS layout modules
    _components.scss# Component styles
    main.scss       # Master import
```

## Development

### Architecture

- **Zustand store** holds `activeNote` (e.g. `"C#4"`) and `audioReady` — both instruments read and write to this single source of truth.
- **Note matching** uses MIDI number comparison (via tonal.js) to handle enharmonic equivalents correctly.
- **Tone.js PolySynth** is a module-scoped singleton in `synth.ts`, kept outside React's render cycle.
- **SASS** follows SMACSS architecture: variables, base, layout, components.

### Key Design Decisions

- Notes are compared by MIDI number, not string, to avoid enharmonic bugs (`C#` vs `Db`).
- Guitar fret colors match piano octave colors for the specific pitch at that fret position.
- The fretboard renders strings top-to-bottom as string 6 (low E) to string 1 (high E).
