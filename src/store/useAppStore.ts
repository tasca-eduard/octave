import { create } from 'zustand';
import { Note } from 'tonal';

interface AppState {
  activeNotes: number[]; // MIDI numbers
  audioReady: boolean;
  toggleNote: (note: string) => void;
  clearNotes: () => void;
  setAudioReady: (ready: boolean) => void;
  isNoteActive: (note: string) => boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeNotes: [],
  audioReady: false,
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
}));
