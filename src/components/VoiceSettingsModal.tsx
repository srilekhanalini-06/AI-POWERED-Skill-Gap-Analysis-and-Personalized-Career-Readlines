import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, X, Play, Sliders } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { voiceService } from '../services/voiceService';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { voiceEnabled, toggleVoice, triggerVoiceEncouragement } = useApp();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>(voiceService.getVoiceName());
  const [rate, setRate] = useState<number>(voiceService.getRate());
  const [pitch, setPitch] = useState<number>(voiceService.getPitch());

  useEffect(() => {
    if (!voiceService.isSupported()) return;

    const loadVoices = () => {
      const available = voiceService.getVoices();
      setVoices(available);
      if (!selectedVoice && available.length > 0) {
        const defaultVoice =
          available.find((v) => v.lang.startsWith('en') && v.name.includes('Natural')) ||
          available.find((v) => v.lang.startsWith('en')) ||
          available[0];
        if (defaultVoice) {
          setSelectedVoice(defaultVoice.name);
          voiceService.setVoiceName(defaultVoice.name);
        }
      }
    };

    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [selectedVoice]);

  if (!isOpen) return null;

  const handleVoiceChange = (name: string) => {
    setSelectedVoice(name);
    voiceService.setVoiceName(name);
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    voiceService.setRate(newRate);
  };

  const handlePitchChange = (newPitch: number) => {
    setPitch(newPitch);
    voiceService.setPitch(newPitch);
  };

  const handleTestSpeech = () => {
    voiceService.speak(
      "Hello! I am your AI career readiness voice coach. Let's make today productive and achieve your career goals!",
      true
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-purple-100 bg-purple-50/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Voice Encouragement Settings</h3>
              <p className="text-xs text-slate-500">Browser SpeechSynthesis configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Main Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-purple-50/50 rounded-xl border border-purple-100">
            <div className="flex items-center gap-3">
              {voiceEnabled ? (
                <Volume2 className="w-5 h-5 text-purple-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <p className="font-bold text-slate-800">Voice Encouragement</p>
                <p className="text-slate-500 text-[11px]">
                  Speak welcome messages and focus milestones
                </p>
              </div>
            </div>
            <button
              onClick={toggleVoice}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                voiceEnabled
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {voiceEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Voice Selector */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Select Synthesizer Voice
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => handleVoiceChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-purple-500"
            >
              {voices.length === 0 ? (
                <option value="">Default System Voice</option>
              ) : (
                voices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Speech Rate Slider */}
          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Speech Rate</span>
              <span className="font-mono text-purple-600 tabular-nums">{rate.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.4"
              step="0.05"
              value={rate}
              onChange={(e) => handleRateChange(parseFloat(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>Slower (0.75x)</span>
              <span>Normal (1.0x)</span>
              <span>Faster (1.4x)</span>
            </div>
          </div>

          {/* Speech Pitch Slider */}
          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Voice Pitch</span>
              <span className="font-mono text-purple-600 tabular-nums">{pitch.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.3"
              step="0.05"
              value={pitch}
              onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Test Buttons */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={handleTestSpeech}
              className="flex-1 py-2 px-3 bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Test Audio Sample</span>
            </button>
            <button
              onClick={() => triggerVoiceEncouragement()}
              className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
            >
              Speak Motivation
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-2xs"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
