/**
 * Web Audio API synthesizer for clean notification chimes and session completion tones.
 * Zero external audio files required.
 */
class AudioService {
  private audioCtx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Pleasant ascending chord when starting focus session or completing a milestone.
   */
  public playStartChime(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.4);
    });
  }

  /**
   * Harmonious chime for completing a focus session or 100% quiz score.
   */
  public playCompletionChime(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + i * 0.1 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.1 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + i * 0.1 + 0.65);
    });
  }
}

export const audioService = new AudioService();
