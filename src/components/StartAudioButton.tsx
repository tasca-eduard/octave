import { Volume2, CheckCircle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { initAudio } from '../audio/synth';

export default function StartAudioButton() {
  const audioReady = useAppStore((s) => s.audioReady);
  const setAudioReady = useAppStore((s) => s.setAudioReady);

  if (audioReady) {
    return (
      <span className="audio-status audio-status--ready">
        <CheckCircle size={14} />
        Audio Ready
      </span>
    );
  }

  return (
    <button
      className="start-audio-btn"
      onClick={async () => {
        await initAudio();
        setAudioReady(true);
      }}
    >
      <Volume2 size={16} />
      Start Audio
    </button>
  );
}
