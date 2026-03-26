const OCTAVES = [
  { octave: 2, label: 'Oct 2', color: '#e67e22' },
  { octave: 3, label: 'Oct 3', color: '#3498db' },
  { octave: 4, label: 'Oct 4', color: '#2ecc71' },
  { octave: 5, label: 'Oct 5', color: '#e84393' },
  { octave: 6, label: 'Oct 6', color: '#f1c40f' },
];

export default function Legend() {
  return (
    <div className="legend">
      {OCTAVES.map(({ octave, label, color }) => (
        <div key={octave} className="legend__item">
          <span className="legend__swatch" style={{ background: color, boxShadow: `0 0 6px ${color}40` }} />
          <span className="legend__label">{label}</span>
        </div>
      ))}
    </div>
  );
}
