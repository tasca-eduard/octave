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

/**
 * Given active MIDI notes and a tuning, find the most playable fingering:
 * one position per string, minimizing fret span.
 * Returns a Set of "stringIndex:fret" keys for the suggested positions.
 */
export function getSuggestedFingering(
  activeMidi: number[],
  tuning: string[]
): Set<string> {
  if (activeMidi.length === 0) return new Set();

  // For each active note, find all possible string:fret positions
  const positionsByNote: { stringIndex: number; fret: number }[][] = [];

  for (const midi of activeMidi) {
    const positions: { stringIndex: number; fret: number }[] = [];
    tuning.forEach((openNote, stringIndex) => {
      const openMidi = Note.midi(openNote)!;
      const fret = midi - openMidi;
      if (fret >= 0 && fret <= 24) {
        positions.push({ stringIndex, fret });
      }
    });
    if (positions.length > 0) {
      positionsByNote.push(positions);
    }
  }

  if (positionsByNote.length === 0) return new Set();

  // Find the combination that uses unique strings and has the smallest fret span
  let bestCombo: { stringIndex: number; fret: number }[] | null = null;
  let bestSpan = Infinity;

  function search(
    noteIdx: number,
    usedStrings: Set<number>,
    current: { stringIndex: number; fret: number }[]
  ) {
    if (noteIdx === positionsByNote.length) {
      const frets = current.filter((p) => p.fret > 0).map((p) => p.fret);
      const span = frets.length > 0 ? Math.max(...frets) - Math.min(...frets) : 0;
      if (span < bestSpan || (span === bestSpan && bestCombo === null)) {
        bestSpan = span;
        bestCombo = [...current];
      }
      return;
    }

    for (const pos of positionsByNote[noteIdx]) {
      if (usedStrings.has(pos.stringIndex)) continue;
      usedStrings.add(pos.stringIndex);
      current.push(pos);
      search(noteIdx + 1, usedStrings, current);
      current.pop();
      usedStrings.delete(pos.stringIndex);
    }

    // Also allow skipping this note (if it can't fit on an available string)
    search(noteIdx + 1, usedStrings, current);
  }

  search(0, new Set(), []);

  const result = new Set<string>();
  if (bestCombo) {
    for (const pos of bestCombo) {
      result.add(`${pos.stringIndex}:${pos.fret}`);
    }
  }
  return result;
}
