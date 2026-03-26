import { create } from 'zustand';
import { Note } from 'tonal';
import { DEFAULT_TUNING } from '../music/noteMap';
import { DEFAULT_OCTAVE_COLORS } from '../utils/octaveColor';

interface AppState {
  activeNotes: number[];
  audioReady: boolean;
  tuning: string[];
  octaveColors: Record<number, string>;
  toggleNote: (note: string) => void;
  clearNotes: () => void;
  setAudioReady: (ready: boolean) => void;
  isNoteActive: (note: string) => boolean;
  setTuning: (tuning: string[]) => void;
  tuneString: (stringIndex: number, semitones: number) => void;
  setOctaveColor: (octave: number, color: string) => void;
  getOctaveColor: (octave: number) => string;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeNotes: [],
  audioReady: false,
  tuning: [...DEFAULT_TUNING],
  octaveColors: { ...DEFAULT_OCTAVE_COLORS },
  toggleNote: (note) => {
    const midi = Note.midi(note);
    if (midi === null) return;
    const current = get().activeNotes;
    if (current.includes(midi)) {
      set({ activeNotes: current.filter((m) => m !== midi) });
    } else {
      set({ activeNotes: [...current, midi] });
    }
  },
  clearNotes: () => set({ activeNotes: [] }),
  setAudioReady: (ready) => set({ audioReady: ready }),
  isNoteActive: (note) => {
    const midi = Note.midi(note);
    if (midi === null) return false;
    return get().activeNotes.includes(midi);
  },
  setTuning: (tuning) => set({ tuning: [...tuning] }),
  tuneString: (stringIndex, semitones) => {
    const tuning = [...get().tuning];
    const midi = Note.midi(tuning[stringIndex]);
    if (midi === null) return;
    const newNote = Note.fromMidiSharps(midi + semitones);
    tuning[stringIndex] = newNote;
    set({ tuning });
  },
  setOctaveColor: (octave, color) => {
    set({ octaveColors: { ...get().octaveColors, [octave]: color } });
  },
  getOctaveColor: (octave) => {
    return get().octaveColors[octave] ?? '#666';
  },
}));
