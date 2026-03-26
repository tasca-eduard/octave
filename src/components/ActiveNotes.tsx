import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Note, Chord } from 'tonal';
import { X } from 'lucide-react';

export default function ActiveNotes() {
  const activeNotes = useAppStore((s) => s.activeNotes);
  const clearNotes = useAppStore((s) => s.clearNotes);
  const octaveColors = useAppStore((s) => s.octaveColors);

  const chordNames = useMemo(() => {
    if (activeNotes.length < 2) return [];
    const pitchClasses = activeNotes.map((midi) => Note.get(Note.fromMidiSharps(midi)).pc);
    const unique = [...new Set(pitchClasses)];
    return Chord.detect(unique);
  }, [activeNotes]);

  if (activeNotes.length === 0) {
    return (
      <div className="active-notes">
        <span className="active-notes__empty">Click a key or fret to begin</span>
      </div>
    );
  }

  const sorted = [...activeNotes].sort((a, b) => a - b);

  return (
    <div className="active-notes">
      <span className="active-notes__label">Active:</span>
      <div className="active-notes__chips">
        {sorted.map((midi) => {
          const name = Note.fromMidiSharps(midi);
          const oct = Note.get(name).oct ?? 0;
          return (
            <span
              key={midi}
              className="active-notes__chip"
              style={{ background: octaveColors[oct] ?? '#666' }}
            >
              {name}
            </span>
          );
        })}
      </div>
      {chordNames.length > 0 && (
        <div className="active-notes__chord">
          {chordNames.slice(0, 3).join(' · ')}
        </div>
      )}
      <button className="clear-btn" onClick={(e) => { e.stopPropagation(); clearNotes(); }}>
        <X size={12} />
        Clear
      </button>
    </div>
  );
}
