import { useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

const OCTAVES = [2, 3, 4, 5, 6];

export default function Legend() {
  const octaveColors = useAppStore((s) => s.octaveColors);
  const setOctaveColor = useAppStore((s) => s.setOctaveColor);

  return (
    <div className="legend">
      {OCTAVES.map((octave) => {
        const color = octaveColors[octave];
        return (
          <LegendItem
            key={octave}
            octave={octave}
            color={color}
            onChange={(c) => setOctaveColor(octave, c)}
          />
        );
      })}
    </div>
  );
}

function LegendItem({
  octave,
  color,
  onChange,
}: {
  octave: number;
  color: string;
  onChange: (color: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <button
      className="legend__item"
      onClick={(e) => {
        e.stopPropagation();
        inputRef.current?.click();
      }}
    >
      <span
        className="legend__swatch"
        style={{ background: color, boxShadow: `0 0 6px ${color}40` }}
      />
      <span className="legend__label">Oct {octave}</span>
      <input
        ref={inputRef}
        type="color"
        className="legend__color-input"
        value={color}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onChange(e.target.value)}
      />
    </button>
  );
}
