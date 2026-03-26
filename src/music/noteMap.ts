import { Note, Range } from 'tonal';

export const GUITAR_TUNING = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];

export const ALL_PIANO_NOTES = Range.chromatic(['C2', 'B6'], { sharps: true });

export function getNoteForFret(openNote: string, fret: number): string {
  const midi = Note.midi(openNote);
  if (midi === null) return '';
  const note = Note.fromMidiSharps(midi + fret);
  return note;
}

export function getFretsForNote(targetNote: string): { stringIndex: number; fret: number }[] {
  const targetMidi = Note.midi(targetNote);
  if (targetMidi === null) return [];

  const results: { stringIndex: number; fret: number }[] = [];

  GUITAR_TUNING.forEach((openNote, stringIndex) => {
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
