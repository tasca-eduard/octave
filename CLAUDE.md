# Octave Mapper - Development Guide

## Quick Reference

```bash
npm run dev      # Start dev server (port 5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## Architecture

- **React 19 + Vite + TypeScript** — strict mode enabled
- **Zustand** for state (`src/store/useAppStore.ts`) — minimal store: `activeNote` and `audioReady`
- **Tone.js** for audio (`src/audio/synth.ts`) — PolySynth singleton, not in React state
- **tonal.js** for music theory (`src/music/noteMap.ts`) — note/MIDI/frequency calculations
- **SASS with SMACSS** — partials in `src/styles/`, each partial uses `@use 'variables' as *`

## Conventions

- Notes use Scientific Pitch Notation (e.g. `C#4`, `A2`)
- Note comparison MUST use MIDI numbers (`Note.midi()`), never string comparison
- Guitar tuning: E2, A2, D3, G3, B3, E4 (standard)
- Piano range: C2 to B6
- Octave colors: 2=Orange, 3=Blue, 4=Green, 5=Pink, 6=Yellow
- SASS partials must `@use 'variables' as *` at top to access shared variables
- CSS custom properties (defined in `_variables.scss :root`) used for runtime theming

## File Layout

```
src/
  components/Piano/   # Piano.tsx, PianoKey.tsx
  components/Guitar/  # Guitar.tsx, GuitarString.tsx, GuitarFret.tsx
  store/              # Zustand store
  audio/              # Tone.js synth
  music/              # tonal.js helpers
  utils/              # octaveColor mapping
  styles/             # SCSS partials (SMACSS)
```

## Common Tasks

- **Add a new octave color**: Update `$octave-colors` map and `:root` vars in `_variables.scss`, and `OCTAVE_COLORS` in `octaveColor.ts`
- **Change tuning**: Modify `GUITAR_TUNING` array in `noteMap.ts`
- **Change piano range**: Modify `ALL_PIANO_NOTES` in `noteMap.ts`
- **Add new instrument**: Create component folder, read `activeNote` from store, call `setActiveNote` + `playNote` on click
