/**
 * Short sound effects for the student's actions, synthesised with Web Audio:
 * no audio files, works offline, and follows the volume control.
 */
import { getVolume } from "./audio";

let ctx: AudioContext | null = null;

type Note = { f: number; at: number; dur: number; type?: OscillatorType; gain?: number; slideTo?: number };

function playNotes(notes: Note[]) {
  const volume = getVolume();
  if (volume === 0) return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const now = ctx.currentTime;
    for (const n of notes) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = n.type ?? "sine";
      osc.frequency.setValueAtTime(n.f, now + n.at);
      if (n.slideTo) osc.frequency.exponentialRampToValueAtTime(n.slideTo, now + n.at + n.dur);
      const peak = (n.gain ?? 0.18) * volume;
      g.gain.setValueAtTime(0, now + n.at);
      g.gain.linearRampToValueAtTime(peak, now + n.at + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, now + n.at + n.dur);
      osc.connect(g).connect(ctx.destination);
      osc.start(now + n.at);
      osc.stop(now + n.at + n.dur + 0.02);
    }
  } catch {
    // Sound is a nicety; never let it break the lesson.
  }
}

// Note frequencies (Hz).
const C5 = 523.25, E5 = 659.25, G5 = 783.99, C6 = 1046.5, A4 = 440, F4 = 349.23, D4 = 293.66;

export const sfx = {
  /** Right answer: bright two-note ding. */
  correct: () => playNotes([{ f: E5, at: 0, dur: 0.14 }, { f: C6, at: 0.09, dur: 0.22 }]),
  /** Wrong answer: retro 8-bit "game over" (like the offline dino game) — short blip, then a dropping tone. */
  wrong: () =>
    playNotes([
      { f: 466, at: 0, dur: 0.07, type: "square", gain: 0.32 },
      { f: 466, at: 0.09, dur: 0.07, type: "square", gain: 0.32 },
      { f: 233, at: 0.18, dur: 0.32, type: "square", gain: 0.34, slideTo: 110 },
    ]),
  /** Quiz or drill passed: rising chime. */
  passed: () => playNotes([C5, E5, G5, C6].map((f, i) => ({ f, at: i * 0.09, dur: 0.3, type: "triangle" as const, gain: 0.16 }))),
  /** Quiz or drill not passed yet: gentle falling tone. */
  tryAgain: () => playNotes([{ f: A4, at: 0, dur: 0.22, type: "triangle" }, { f: F4, at: 0.16, dur: 0.32, type: "triangle" }]),
  /** Lesson finished or test passed: short fanfare. */
  celebrate: () =>
    playNotes([
      { f: C5, at: 0, dur: 0.14, type: "triangle" },
      { f: E5, at: 0.12, dur: 0.14, type: "triangle" },
      { f: G5, at: 0.24, dur: 0.14, type: "triangle" },
      { f: C6, at: 0.36, dur: 0.5, type: "triangle", gain: 0.2 },
      { f: G5, at: 0.36, dur: 0.5, type: "sine", gain: 0.1 },
    ]),
  /** Weekly test not passed: calm low tone, not alarming. */
  notPassed: () => playNotes([{ f: F4, at: 0, dur: 0.3, type: "triangle" }, { f: D4, at: 0.25, dur: 0.5, type: "triangle" }]),
  /** Picking an answer in the test (no right/wrong hint). */
  tap: () => playNotes([{ f: 880, at: 0, dur: 0.05, gain: 0.08 }]),
  /** Ticking a checkbox. */
  pop: () => playNotes([{ f: 600, at: 0, dur: 0.08, gain: 0.12, slideTo: 1000 }]),
  /** Opening a lesson. */
  open: () => playNotes([{ f: 700, at: 0, dur: 0.06, gain: 0.08 }, { f: 1050, at: 0.05, dur: 0.08, gain: 0.08 }]),
};
