import { useAppStore } from '../../store/useAppStore';
import { playNote } from '../../audio/synth';
import { isBlackKey, getOctave } from '../../music/noteMap';

interface PianoKeyProps {
  note: string;
  isActive: boolean;
}

export default function PianoKey({ note, isActive }: PianoKeyProps) {
  const toggleNote = useAppStore((s) => s.toggleNote);
  const audioReady = useAppStore((s) => s.audioReady);
  const color = useAppStore((s) => s.octaveColors[getOctave(note)] ?? '#666');
  const black = isBlackKey(note);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNote(note);
    if (audioReady) playNote(note);
  };

  const className = [
    'piano-key',
    black ? 'piano-key--black' : 'piano-key--white',
    isActive ? 'piano-key--active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={className}
      style={{
        backgroundColor: isActive ? color : undefined,
        borderColor: isActive ? color : undefined,
      }}
      onClick={handleClick}
      title={note}
    >
      <span className="piano-key__label">{note}</span>
    </button>
  );
}
