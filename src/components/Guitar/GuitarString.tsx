import { useAppStore } from '../../store/useAppStore';
import { getNoteForFret } from '../../music/noteMap';
import GuitarFret from './GuitarFret';
import { Note } from 'tonal';

interface GuitarStringProps {
  openNote: string;
  stringIndex: number;
}

export default function GuitarString({ openNote }: GuitarStringProps) {
  const activeNotes = useAppStore((s) => s.activeNotes);

  const frets = Array.from({ length: 25 }, (_, fret) => {
    const note = getNoteForFret(openNote, fret);
    return { note, fret };
  });

  return (
    <div className="guitar-string">
      <div className="guitar-string__label">{openNote}</div>
      <div className="guitar-string__frets">
        {frets.map(({ note, fret }) => {
          const midi = Note.midi(note);
          const isActive = midi !== null && activeNotes.includes(midi);
          return (
            <GuitarFret key={fret} note={note} fret={fret} isActive={isActive} />
          );
        })}
      </div>
    </div>
  );
}
