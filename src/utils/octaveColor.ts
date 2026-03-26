const OCTAVE_COLORS: Record<number, string> = {
  2: '#e67e22',
  3: '#3498db',
  4: '#2ecc71',
  5: '#e84393',
  6: '#f1c40f',
};

export function getOctaveColor(octave: number): string {
  return OCTAVE_COLORS[octave] ?? '#666';
}

export function getOctaveClass(octave: number): string {
  return `octave-${octave}`;
}
