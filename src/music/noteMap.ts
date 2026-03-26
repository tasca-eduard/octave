import { Note, Range } from 'tonal';

export const DEFAULT_TUNING = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];

export const TUNING_PRESETS: Record<string, string[]> = {
  'Standard':      ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  'Drop D':        ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  'Drop C':        ['C2', 'G2', 'C3', 'F3', 'A3', 'D4'],
  'Open G':        ['D2', 'G2', 'D3', 'G3', 'B3', 'D4'],
  'Open D':        ['D2', 'A2', 'D3', 'F#3', 'A3', 'D4'],
  'Open E':        ['E2', 'B2', 'E3', 'G#3', 'B3', 'E4'],
  'Open A':        ['E2', 'A2', 'E3', 'A3', 'C#4', 'E4'],
  'DADGAD':        ['D2', 'A2', 'D3', 'G3', 'A3', 'D4'],
  'Half Step Down': ['D#2', 'G#2', 'C#3', 'F#3', 'A#3', 'D#4'],
  'Full Step Down': ['D2', 'G2', 'C3', 'F3', 'A3', 'D4'],
};

export const ALL_PIANO_NOTES = Range.chromatic(['C2', 'B6'], { sharps: true });

export function getNoteForFret(openNote: string, fret: number): string {
  const midi = Note.midi(openNote);
  if (midi === null) return '';
  const note = Note.fromMidiSharps(midi + fret);
  return note;
}

export function getFretsForNote(targetNote: string, tuning: string[]): { stringIndex: number; fret: number }[] {
  const targetMidi = Note.midi(targetNote);
  if (targetMidi === null) return [];

  const results: { stringIndex: number; fret: number }[] = [];

  tuning.forEach((openNote, stringIndex) => {
    const openMidi = Note.midi(openNote)!;
    for (let fret = 0; fret <= 24; fret++) {
      if (openMidi + fret === targetMidi) {
        results.push({ stringIndex, fret });
      }
    }
  });

  return results;
}

export function isBlackKey(note: string): boolean {
  const pc = Note.get(note).pc;
  return pc.includes('#') || pc.includes('b');
}

export function getOctave(note: string): number {
  return Note.get(note).oct ?? 0;
}

export function notesMatch(a: string, b: string): boolean {
  return Note.midi(a) === Note.midi(b);
}
