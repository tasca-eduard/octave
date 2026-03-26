import * as Tone from 'tone';

let synth: Tone.PolySynth | null = null;

export async function initAudio(): Promise<void> {
  await Tone.start();
  if (!synth) {
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle8' },
      envelope: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.2,
        release: 0.8,
      },
    }).toDestination();
    synth.maxPolyphony = 6;
    synth.volume.value = -8;
  }
}

export function playNote(note: string): void {
  if (!synth) return;
  synth.triggerAttackRelease(note, 0.25);
}
