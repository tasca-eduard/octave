import { useAppStore } from '../../store/useAppStore';
import { ALL_PIANO_NOTES, isBlackKey } from '../../music/noteMap';
import PianoKey from './PianoKey';
import { Note } from 'tonal';

export default function Piano() {
  const activeNotes = useAppStore((s) => s.activeNotes);

  const whiteNotes = ALL_PIANO_NOTES.filter((n) => !isBlackKey(n));
  const blackNotes = ALL_PIANO_NOTES.filter((n) => isBlackKey(n));

  const getBlackKeyOffset = (blackNote: string): number => {
    const allIdx = ALL_PIANO_NOTES.indexOf(blackNote);
    const prevWhite = ALL_PIANO_NOTES[allIdx - 1];
    const whiteIdx = whiteNotes.indexOf(prevWhite);
    return whiteIdx * 36 + 24;
  };

  const isActive = (note: string) => {
    const midi = Note.midi(note);
    return midi !== null && activeNotes.includes(midi);
  };

  return (
    <div className="l-piano-container">
      <div className="piano" style={{ width: whiteNotes.length * 36 }}>
        <div className="piano__whites">
          {whiteNotes.map((note) => (
            <PianoKey key={note} note={note} isActive={isActive(note)} />
          ))}
        </div>
        <div className="piano__blacks">
          {blackNotes.map((note) => (
            <div
              key={note}
              className="piano__black-wrapper"
              style={{ left: getBlackKeyOffset(note) }}
            >
              <PianoKey note={note} isActive={isActive(note)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
