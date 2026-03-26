import { GUITAR_TUNING } from '../../music/noteMap';
import GuitarString from './GuitarString';

const FRET_MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
const DOUBLE_MARKERS = [12, 24];

export default function Guitar() {
  // Reverse so string 6 (low E) is at top
  const strings = [...GUITAR_TUNING].reverse();

  return (
    <div className="l-fretboard-container">
      <div className="guitar">
        <div className="guitar__fret-numbers">
          <div className="guitar__fret-numbers-spacer" />
          <div className="guitar__fret-numbers-row">
            {Array.from({ length: 25 }, (_, i) => (
              <div key={i} className="guitar__fret-number">
                {i === 0 ? '' : i}
              </div>
            ))}
          </div>
        </div>
        <div className="guitar__strings">
          {strings.map((openNote, i) => (
            <GuitarString
              key={openNote + i}
              openNote={openNote}
              stringIndex={GUITAR_TUNING.length - 1 - i}
            />
          ))}
        </div>
        <div className="guitar__markers">
          <div className="guitar__markers-spacer" />
          <div className="guitar__markers-row">
            {Array.from({ length: 25 }, (_, i) => (
              <div key={i} className="guitar__marker-cell">
                {FRET_MARKERS.includes(i) && (
                  <>
                    <span className="guitar__marker-dot" />
                    {DOUBLE_MARKERS.includes(i) && (
                      <span className="guitar__marker-dot" />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
