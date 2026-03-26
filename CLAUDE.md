# Octave Mapper - Development Guide

Production URL: https://octave.devedco.com/
Deployed on Vercel.

## Quick Reference

```bash
npm run dev      # Start dev server (port 5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## Architecture

- **React 19 + Vite + TypeScript** — strict mode enabled
- **Zustand** for state (`src/store/useAppStore.ts`) — `activeNotes` (MIDI array), `tuning`, `octaveColors`, `audioReady`
- **Tone.js** for audio (`src/audio/synth.ts`) — PolySynth singleton, module-scoped, not in React state
- **tonal.js** for music theory (`src/music/noteMap.ts`) — note/MIDI calculations, chord detection (`Chord.detect`)
- **Lucide React** for icons — never use emoji for UI icons
- **SASS with SMACSS** — partials in `src/styles/`, each partial uses `@use 'variables' as *`
- **Google Fonts** — Inter (UI) + JetBrains Mono (note labels, fret numbers)

## Conventions

- Notes use Scientific Pitch Notation (e.g. `C#4`, `A2`)
- Note comparison MUST use MIDI numbers (`Note.midi()`), never string comparison — avoids enharmonic bugs
- Active notes are stored as MIDI numbers in an array (supports chords, not just single notes)
- Clicking a note toggles it on/off (chord building). Clicking empty space clears all
- Guitar tuning is dynamic — stored in Zustand, changeable via presets or per-string buttons
- Octave colors are user-customizable — stored in Zustand, editable via color picker in Legend
- Default octave colors: 2=Orange, 3=Blue, 4=Green, 5=Pink, 6=Yellow
- Piano range: C2 to B6
- SASS partials must `@use 'variables' as *` at top to access shared variables
- CSS custom properties (defined in `_variables.scss :root`) used for theming
- Guitar frets show note name + octave number as subscript (e.g. `C4`)
- Active frets/keys get a white border (`2px solid rgba(255,255,255,0.7)`) — keep it simple, no dimming/pulsing

## File Layout

```
src/
  components/
    Piano/              # Piano.tsx, PianoKey.tsx
    Guitar/             # Guitar.tsx, GuitarString.tsx, GuitarFret.tsx, TuningSelector.tsx
    Header.tsx          # App title with Music icon
    Legend.tsx           # Octave color legend — clickable color pickers
    ActiveNotes.tsx     # Shows active note chips + chord name detection
    StartAudioButton.tsx
  store/
    useAppStore.ts      # Zustand store (activeNotes, tuning, octaveColors, audioReady)
  audio/
    synth.ts            # Tone.js PolySynth — initAudio(), playNote()
  music/
    noteMap.ts          # tonal.js helpers — getNoteForFret, tuning presets, note utils
  utils/
    octaveColor.ts      # DEFAULT_OCTAVE_COLORS constant
  styles/
    _variables.scss     # Octave colors, dimensions, CSS custom properties, font stacks
    _base.scss          # CSS reset, typography
    _layout.scss        # SMACSS layout modules (l-app, l-instruments, l-section, etc.)
    _components.scss    # Component styles (piano, guitar, legend, tuning-selector, etc.)
    main.scss           # Master import
public/
  favicon.svg           # Hand-written SVG piano keys icon
  robots.txt
  sitemap.xml
```

## SEO

- Full meta tags (primary, Open Graph, Twitter Card) in `index.html`
- JSON-LD structured data (`WebApplication` schema)
- `<noscript>` fallback with semantic content for crawlers
- `robots.txt` and `sitemap.xml` in `public/`
- Canonical URL: https://octave.devedco.com/

## Security Headers (vercel.json)

- X-Frame-Options: DENY (no iframe embedding)
- Content-Security-Policy with whitelisted sources (self + Google Fonts)
- HSTS with preload
- Referrer-Policy, Permissions-Policy, X-Content-Type-Options
- When updating CSP: remember `'unsafe-inline'` is needed for both script-src (inline onload handler for font swap) and style-src

## Performance / Core Web Vitals

- Fonts loaded with preload + media swap trick (non-render-blocking)
- Inline critical CSS in `<head>` to prevent FOUC
- Vite chunk splitting: tone.js (~234KB) and tonal.js (~25KB) are separate chunks
- `contain: layout style` on `.piano` and `.guitar` for paint isolation
- Static assets cached with `immutable, max-age=1yr` via vercel.json
- Build target: es2020 (no unnecessary polyfills)
- CSS minified with LightningCSS

## Common Tasks

- **Add a tuning preset**: Add entry to `TUNING_PRESETS` in `noteMap.ts`
- **Change piano range**: Modify `ALL_PIANO_NOTES` in `noteMap.ts`
- **Add new instrument**: Create component folder, read `activeNotes` from store, call `toggleNote` + `playNote` on click
- **Modify octave colors default**: Update `DEFAULT_OCTAVE_COLORS` in `octaveColor.ts` and `$octave-colors` + `:root` in `_variables.scss`

## User Preferences

- Keep the UI clean and simple — avoid over-engineering visual effects (no dimming, pulsing, etc.)
- White border on active notes is sufficient for highlighting
- The user plays guitar — the fretboard should be practical and glanceable
- Font sizes for note labels should be readable (currently `$font-size-xs: 0.75rem`)
