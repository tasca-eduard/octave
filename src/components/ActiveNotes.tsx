import { useAppStore } from '../store/useAppStore';
import { getOctaveColor } from '../utils/octaveColor';
import { Note } from 'tonal';
import { X } from 'lucide-react';

export default function ActiveNotes() {
  const activeNotes = useAppStore((s) => s.activeNotes);
  const clearNotes = useAppStore((s) => s.clearNotes);

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
              style={{ background: getOctaveColor(oct) }}
            >
              {name}
            </span>
          );
        })}
      </div>
      <button className="clear-btn" onClick={(e) => { e.stopPropagation(); clearNotes(); }}>
        <X size={12} />
        Clear
      </button>
    </div>
  );
}
