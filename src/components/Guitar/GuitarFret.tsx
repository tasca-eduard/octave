import { useAppStore } from '../../store/useAppStore';
import { playNote } from '../../audio/synth';
import { getOctave } from '../../music/noteMap';
import { Note } from 'tonal';

interface GuitarFretProps {
  note: string;
  fret: number;
  isActive: boolean;
}

export default function GuitarFret({ note, fret, isActive }: GuitarFretProps) {
  const toggleNote = useAppStore((s) => s.toggleNote);
  const audioReady = useAppStore((s) => s.audioReady);
  const octave = getOctave(note);
  const color = useAppStore((s) => s.octaveColors[octave] ?? '#666');
  const pc = Note.get(note).pc;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNote(note);
    if (audioReady) playNote(note);
  };

  const className = [
    'guitar-fret',
    fret === 0 ? 'guitar-fret--open' : '',
    isActive ? 'guitar-fret--active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={className}
      style={{ backgroundColor: color }}
      onClick={handleClick}
      title={note}
    >
      <span className="guitar-fret__note">{pc}<span className="guitar-fret__oct">{octave}</span></span>
    </button>
  );
}
