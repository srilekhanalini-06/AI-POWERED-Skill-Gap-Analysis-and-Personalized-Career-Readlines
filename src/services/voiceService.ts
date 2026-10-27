/**
 * Web Speech Synthesis service providing personalized voice encouragement,
 * study session countdown alerts, and celebratory messages.
 */

class VoiceService {
  private enabled: boolean = true;
  private rate: number = 1.0;
  private pitch: number = 1.0;
  private selectedVoiceName: string = '';

  constructor() {
    // Load persisted voice settings if available
    try {
      const stored = localStorage.getItem('voice_settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.enabled = parsed.enabled ?? true;
        this.rate = parsed.rate ?? 1.0;
        this.pitch = parsed.pitch ?? 1.0;
        this.selectedVoiceName = parsed.voiceName ?? '';
      }
    } catch {
      // Ignore localStorage read errors
    }
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    this.persist();
    if (!val && this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  public setRate(rate: number) {
    this.rate = Math.min(Math.max(rate, 0.75), 1.5);
    this.persist();
  }

  public getRate(): number {
    return this.rate;
  }

  public setPitch(pitch: number) {
    this.pitch = Math.min(Math.max(pitch, 0.75), 1.5);
    this.persist();
  }

  public getPitch(): number {
    return this.pitch;
  }

  public setVoiceName(name: string) {
    this.selectedVoiceName = name;
    this.persist();
  }

  public getVoiceName(): string {
    return this.selectedVoiceName;
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.isSupported()) return [];
    return window.speechSynthesis.getVoices();
  }

  public speak(text: string, force: boolean = false): void {
    if (!this.isSupported()) return;
    if (!this.enabled && !force) return;

    try {
      window.speechSynthesis.cancel(); // Cancel ongoing speech to avoid queue pileup

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = this.rate;
      utterance.pitch = this.pitch;

      const voices = this.getVoices();
      if (voices.length > 0) {
        let chosen = voices.find((v) => v.name === this.selectedVoiceName);
        if (!chosen) {
          // Prefer natural English voices if available
          chosen =
            voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google'))) ||
            voices.find((v) => v.lang.startsWith('en')) ||
            voices[0];
        }
        if (chosen) utterance.voice = chosen;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  }

  public stop(): void {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  private persist() {
    try {
      localStorage.setItem(
        'voice_settings',
        JSON.stringify({
          enabled: this.enabled,
          rate: this.rate,
          pitch: this.pitch,
          voiceName: this.selectedVoiceName,
        })
      );
    } catch {
      // Storage full or unavailable
    }
  }
}

export const voiceService = new VoiceService();
