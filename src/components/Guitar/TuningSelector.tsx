import { ChevronDown, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { TUNING_PRESETS, DEFAULT_TUNING } from '../../music/noteMap';

export default function TuningSelector() {
  const tuning = useAppStore((s) => s.tuning);
  const setTuning = useAppStore((s) => s.setTuning);
  const [open, setOpen] = useState(false);

  const currentPreset = Object.entries(TUNING_PRESETS).find(
    ([, notes]) => notes.join(',') === tuning.join(',')
  );

  return (
    <div className="tuning-selector" onClick={(e) => e.stopPropagation()}>
      <button
        className="tuning-selector__toggle"
        onClick={() => setOpen(!open)}
      >
        <span className="tuning-selector__label">
          {currentPreset ? currentPreset[0] : 'Custom'}
        </span>
        <span className="tuning-selector__value">
          {tuning.join(' · ')}
        </span>
        <ChevronDown size={14} className={`tuning-selector__chevron ${open ? 'tuning-selector__chevron--open' : ''}`} />
      </button>

      {open && (
        <div className="tuning-selector__dropdown">
          {Object.entries(TUNING_PRESETS).map(([name, notes]) => {
            const isActive = notes.join(',') === tuning.join(',');
            return (
              <button
                key={name}
                className={`tuning-selector__option ${isActive ? 'tuning-selector__option--active' : ''}`}
                onClick={() => {
                  setTuning(notes);
                  setOpen(false);
                }}
              >
                <span className="tuning-selector__option-name">{name}</span>
                <span className="tuning-selector__option-notes">{notes.join(' · ')}</span>
              </button>
            );
          })}
        </div>
      )}

      {!currentPreset && (
        <button
          className="tuning-selector__reset"
          onClick={() => setTuning(DEFAULT_TUNING)}
          title="Reset to Standard"
        >
          <RotateCcw size={12} />
        </button>
      )}
    </div>
  );
}
