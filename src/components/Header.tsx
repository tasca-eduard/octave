import { Music } from 'lucide-react';

export default function Header() {
  return (
    <header className="l-header">
      <h1>
        <Music size={28} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8, opacity: 0.6 }} />
        Octave Mapper
      </h1>
      <p>Click notes to build chords — see them mapped across both instruments</p>
    </header>
  );
}
