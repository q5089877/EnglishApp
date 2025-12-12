
import { getSettings } from './storage';

export class SoundService {
  private static ctx: AudioContext | null = null;

  private static getContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContext();
    }
    return this.ctx;
  }

  private static playTone(freq: number, type: OscillatorType, duration: number, rampTo?: number) {
    // Check settings before playing
    if (!getSettings().soundEffects) return;

    try {
      const ctx = this.getContext();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      if (rampTo) {
        osc.frequency.exponentialRampToValueAtTime(rampTo, ctx.currentTime + duration);
      }

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error("Audio playback failed", e);
    }
  }

  public static playCorrect() {
    // High pitch "Ding"
    this.playTone(880, 'sine', 0.5, 1760); 
  }

  public static playError() {
    // Low pitch "Buzz"
    this.playTone(150, 'sawtooth', 0.3, 100);
  }
}
