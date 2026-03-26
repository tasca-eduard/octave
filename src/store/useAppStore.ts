import { create } from 'zustand';
import { Note } from 'tonal';
import { DEFAULT_TUNING, TUNING_PRESETS } from '../music/noteMap';

interface AppState {
  activeNotes: number[];
  audioReady: boolean;
  tuning: string[];
  toggleNote: (note: string) => void;
  clearNotes: () => void;
  setAudioReady: (ready: boolean) => void;
  isNoteActive: (note: string) => boolean;
  setTuning: (tuning: string[]) => void;
  tuneString: (stringIndex: number, semitones: number) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeNotes: [],
  audioReady: false,
  tuning: [...DEFAULT_TUNING],
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
}));
