import { ChevronUp, ChevronDown } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { getNoteForFret } from '../../music/noteMap';
import GuitarFret from './GuitarFret';
import { Note } from 'tonal';

interface GuitarStringProps {
  openNote: string;
  stringIndex: number;
}

export default function GuitarString({ openNote, stringIndex }: GuitarStringProps) {
  const activeNotes = useAppStore((s) => s.activeNotes);
  const tuneString = useAppStore((s) => s.tuneString);

  const frets = Array.from({ length: 25 }, (_, fret) => {
    const note = getNoteForFret(openNote, fret);
    return { note, fret };
  });

  return (
    <div className="guitar-string">
      <div className="guitar-string__label-group">
        <button
          className="guitar-string__tune-btn"
          onClick={(e) => { e.stopPropagation(); tuneString(stringIndex, 1); }}
          title="Tune up"
        >
          <ChevronUp size={10} />
        </button>
        <span className="guitar-string__label">{openNote}</span>
        <button
          className="guitar-string__tune-btn"
          onClick={(e) => { e.stopPropagation(); tuneString(stringIndex, -1); }}
          title="Tune down"
        >
          <ChevronDown size={10} />
        </button>
      </div>
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
