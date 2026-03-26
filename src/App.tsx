import { Analytics } from '@vercel/analytics/react';
import { Piano as PianoIcon, Guitar as GuitarIcon } from 'lucide-react';
import { useAppStore } from './store/useAppStore';
import Header from './components/Header';
import StartAudioButton from './components/StartAudioButton';
import Legend from './components/Legend';
import ActiveNotes from './components/ActiveNotes';
import Piano from './components/Piano/Piano';
import Guitar from './components/Guitar/Guitar';
import TuningSelector from './components/Guitar/TuningSelector';

export default function App() {
  const clearNotes = useAppStore((s) => s.clearNotes);

  return (
    <div className="l-app" onClick={() => clearNotes()}>
      <Analytics />
      <Header />
      <div className="l-controls">
        <StartAudioButton />
        <Legend />
      </div>
      <ActiveNotes />
      <div className="l-instruments">
        <div className="l-section">
          <div className="l-section-header">
            <PianoIcon size={14} />
            <span>Piano — C2 to B6</span>
          </div>
          <Piano />
        </div>
        <div className="l-section">
          <div className="l-section-header">
            <GuitarIcon size={14} />
            <span>Guitar Fretboard</span>
          </div>
          <TuningSelector />
          <Guitar />
        </div>
      </div>
    </div>
  );
}
