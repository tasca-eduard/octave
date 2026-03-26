import { useAppStore } from './store/useAppStore';
import Header from './components/Header';
import StartAudioButton from './components/StartAudioButton';
import Legend from './components/Legend';
import Piano from './components/Piano/Piano';
import Guitar from './components/Guitar/Guitar';

export default function App() {
  const clearNotes = useAppStore((s) => s.clearNotes);

  return (
    <div className="l-app" onClick={() => clearNotes()}>
      <Header />
      <div className="l-controls">
        <StartAudioButton />
        <Legend />
      </div>
      <div className="l-instruments">
        <Piano />
        <Guitar />
      </div>
    </div>
  );
}
