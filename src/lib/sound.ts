/**
 * Paper sounds, synthesized with Web Audio so there are no files to load.
 * Everything is shaped noise: paper is mostly noise, and a resonant filter gives right and wrong
 * a hint of pitch (rising for right, falling for wrong) without turning them into beeps.
 * Browser only; every call is a no-op on the server, when muted, or without Web Audio.
 */

export const SOUND_STORAGE_KEY = "ztarz-sound";

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;

export function soundOn(): boolean {
  try {
    return localStorage.getItem(SOUND_STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setSoundOn(on: boolean) {
  try {
    localStorage.setItem(SOUND_STORAGE_KEY, on ? "on" : "off");
  } catch {
    // Blocked storage: the choice lasts for this visit only.
  }
  window.dispatchEvent(new Event("ztarz-sound"));
}

function audio(): AudioContext | null {
  if (typeof window === "undefined" || !soundOn()) return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    // Half a second of white noise, reused by every sound.
    noise = ctx.createBuffer(1, ctx.sampleRate / 2, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

type Burst = {
  at?: number; // seconds from now
  type: BiquadFilterType;
  freq: number;
  freqTo?: number; // sweep the filter over the burst
  q?: number;
  gain: number;
  attack?: number;
  decay: number;
};

/** One shaped noise burst: filter, then a fast attack and an exponential decay. */
function burst(ac: AudioContext, b: Burst) {
  const t = ac.currentTime + (b.at ?? 0);
  const src = ac.createBufferSource();
  src.buffer = noise;
  src.playbackRate.value = 0.9 + Math.random() * 0.2; // no two flips quite alike

  const filter = ac.createBiquadFilter();
  filter.type = b.type;
  filter.Q.value = b.q ?? 1;
  filter.frequency.setValueAtTime(b.freq, t);
  if (b.freqTo) filter.frequency.exponentialRampToValueAtTime(b.freqTo, t + b.decay);

  const env = ac.createGain();
  const attack = b.attack ?? 0.004;
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(b.gain, t + attack);
  env.gain.exponentialRampToValueAtTime(0.0001, t + attack + b.decay);

  src.connect(filter).connect(env).connect(ac.destination);
  src.start(t, Math.random() * 0.3);
  src.stop(t + attack + b.decay + 0.05);
}

/** Turning a pass over: a swish as it lifts, a soft tap as it lands. */
export function playFlip() {
  const ac = audio();
  if (!ac) return;
  burst(ac, { type: "bandpass", freq: 1400, freqTo: 4200, q: 0.7, gain: 0.09, attack: 0.02, decay: 0.12 });
  burst(ac, { at: 0.17, type: "lowpass", freq: 1800, q: 0.5, gain: 0.06, decay: 0.05 });
}

/** Moving on to the next pass: a short, quiet slide. */
export function playDeal() {
  const ac = audio();
  if (!ac) return;
  burst(ac, { type: "bandpass", freq: 900, freqTo: 2600, q: 0.6, gain: 0.05, attack: 0.03, decay: 0.16 });
}

/** Right: two crisp taps, the second a little higher. */
export function playRight() {
  const ac = audio();
  if (!ac) return;
  burst(ac, { type: "bandpass", freq: 2200, q: 9, gain: 0.22, decay: 0.07 });
  burst(ac, { at: 0.075, type: "bandpass", freq: 3300, q: 9, gain: 0.2, decay: 0.11 });
}

/** Wrong: one dull, papery thud that sinks. */
export function playWrong() {
  const ac = audio();
  if (!ac) return;
  burst(ac, { type: "lowpass", freq: 700, q: 1.2, gain: 0.25, decay: 0.09 });
  burst(ac, { at: 0.05, type: "bandpass", freq: 520, freqTo: 330, q: 6, gain: 0.16, decay: 0.16 });
}
