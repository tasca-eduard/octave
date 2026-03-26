import { useAppStore } from '../store/useAppStore';
import { initAudio } from '../audio/synth';

export default function StartAudioButton() {
  const audioReady = useAppStore((s) => s.audioReady);
  const setAudioReady = useAppStore((s) => s.setAudioReady);

  if (audioReady) {
    return <span className="audio-status audio-status--ready">Audio Ready</span>;
  }

  return (
    <button
      className="start-audio-btn"
      onClick={async () => {
        await initAudio();
        setAudioReady(true);
      }}
    >
      🔊 Start Audio
    </button>
  );
}
