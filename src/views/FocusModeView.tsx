import React, { useState } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  Sparkles,
  Ban,
  Copy,
  Check,
  AlertTriangle,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ALL_DISTRACTING_APPS } from '../data/distractingApps';

export const FocusModeView: React.FC = () => {
  const {
    focusTimeLeft,
    isFocusRunning,
    focusSessionDuration,
    startFocusTimer,
    pauseFocusTimer,
    resetFocusTimer,
    completedFocusSessions,
    selectedDistractingApps,
    isAllAppsBlocked,
    toggleDistractingApp,
    blockAllDistractingApps,
    unblockAllDistractingApps,
    todayStudiedMinutes,
    triggerVoiceEncouragement,
  } = useApp();

  const [copiedRules, setCopiedRules] = useState(false);
  const [simulatedBlockApp, setSimulatedBlockApp] = useState<string | null>(null);

  const minutes = Math.floor(focusTimeLeft / 60);
  const seconds = focusTimeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPercent = Math.max(
    0,
    Math.min(
      100,
      Math.round(((focusSessionDuration - focusTimeLeft) / (focusSessionDuration || 1)) * 100)
    )
  );

  const presets = [
    { label: '25m Pomodoro', duration: 25 * 60 },
    { label: '50m Deep Sprint', duration: 50 * 60 },
    { label: '15m Quick Review', duration: 15 * 60 },
  ];

  const handleCopyHostRules = () => {
    const rules = selectedDistractingApps
      .map((appName) => {
        const item = ALL_DISTRACTING_APPS.find((a) => a.name === appName);
        return item ? `127.0.0.1 ${item.domain}\n127.0.0.1 www.${item.domain}` : '';
      })
      .filter(Boolean)
      .join('\n');

    navigator.clipboard.writeText(rules);
    setCopiedRules(true);
    setTimeout(() => setCopiedRules(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                Module 05
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">Deep Work & Distraction Shield</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              Focus Mode & Distraction Blocker
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Eliminate digital interruptions, commit to uninterrupted study intervals, and enforce a strict focus shield across all distracting apps and websites.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
                isAllAppsBlocked
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-purple-50 border-purple-200 text-purple-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {selectedDistractingApps.length} of {ALL_DISTRACTING_APPS.length} Apps Blocked
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Mandatory Technical Disclaimer on Android App Blocking */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 shadow-2xs flex items-start gap-3.5">
        <Smartphone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <p className="font-bold flex items-center gap-2">
            <span>Notice Regarding Mobile & Android App Blocking</span>
            <span className="text-[10px] font-semibold bg-amber-200/60 px-2 py-0.5 rounded text-amber-800">
              Browser Sandbox Security
            </span>
          </p>
          <p className="text-slate-700 leading-relaxed text-[11px]">
            A web application runs securely inside your web browser’s restricted sandbox. Due to operating system security boundaries, a web app <strong>cannot reliably access, intercept, or forcefully kill external native Android or iOS applications</strong>.
          </p>
          <p className="text-slate-600 leading-relaxed text-[11px] pt-1 border-t border-amber-200/50">
            <strong>Recommended Workflow:</strong> Use our <strong>"Block All Distracting Apps"</strong> pledge below to set your intention, and pair it with Android’s native <em>Digital Wellbeing &gt; Focus Mode</em> or system tools like <em>AppBlock</em> for OS-level app freezing.
          </p>
        </div>
      </div>

      {/* Interception Simulation Alert Modal */}
      {simulatedBlockApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-rose-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-rose-600 font-bold text-sm">
                <Ban className="w-5 h-5 text-rose-600" />
                <span>Distraction Intercepted!</span>
              </div>
              <button
                onClick={() => setSimulatedBlockApp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-900 space-y-2">
              <p className="font-bold">
                Access to {simulatedBlockApp} is strictly blocked during your active focus sprint.
              </p>
              <p className="text-[11px] text-slate-600">
                You committed to uninterrupted career preparation. Complete your {Math.ceil(focusTimeLeft / 60)}-minute sprint before checking entertainment feeds!
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSimulatedBlockApp(null)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                Return to Focus Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Timer on Left, Distraction List on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Timer Column (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-purple-100 p-8 shadow-2xs flex flex-col items-center justify-center space-y-6">
          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {presets.map((preset) => {
              const isSelected = focusSessionDuration === preset.duration;
              return (
                <button
                  key={preset.duration}
                  onClick={() => resetFocusTimer(preset.duration)}
                  disabled={isFocusRunning}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Big Circular Clock Display */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* SVG Progress Ring */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="110"
                className="stroke-slate-100"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="128"
                cy="128"
                r="110"
                className="stroke-purple-600 transition-all duration-300"
                strokeWidth="12"
                strokeDasharray="691.15"
                strokeDashoffset={691.15 - (691.15 * progressPercent) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums">
                {formattedTime}
              </span>
              <span className="text-xs font-semibold text-purple-700 mt-1 uppercase tracking-wider">
                {isFocusRunning ? 'Session in Progress' : 'Ready to Focus'}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 font-mono">
                {progressPercent}% Elapsed
              </span>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-3">
            {isFocusRunning ? (
              <button
                onClick={pauseFocusTimer}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
              >
                <Pause className="w-4 h-4" />
                <span>Pause Sprint</span>
              </button>
            ) : (
              <button
                onClick={startFocusTimer}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Sprint</span>
              </button>
            )}

            <button
              onClick={() => resetFocusTimer()}
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() =>
                triggerVoiceEncouragement('Stay committed to your deep study session. High focus creates high mastery.')
              }
              className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl transition-colors"
              title="Voice Motivation"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Distraction Blocker Pledge (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Distracting Apps Blocker Shield
              </h2>
              <p className="text-xs text-slate-500">
                Block distractions across social media, feeds, and streaming
              </p>
            </div>
            <ShieldCheck className="w-5 h-5 text-purple-600" />
          </div>

          {/* One-Click Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={blockAllDistractingApps}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                isAllAppsBlocked
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAllAppsBlocked ? 'All Blocked (Active)' : 'Block All Apps'}</span>
            </button>

            <button
              type="button"
              onClick={unblockAllDistractingApps}
              className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Reset / Unblock
            </button>
          </div>

          {/* Copyable Hosts / Domain Rules Helper */}
          <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 flex items-center justify-between text-xs">
            <span className="text-[11px] text-purple-900 font-medium">
              Block via OS Hosts / AdBlock
            </span>
            <button
              onClick={handleCopyHostRules}
              className="px-2.5 py-1 text-[11px] font-semibold text-purple-700 bg-white border border-purple-200 hover:bg-purple-100/60 rounded-lg flex items-center gap-1 transition-colors"
            >
              {copiedRules ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedRules ? 'Copied!' : 'Copy Rules'}</span>
            </button>
          </div>

          {/* List of Apps */}
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {ALL_DISTRACTING_APPS.map((app) => {
              const isPledged = selectedDistractingApps.includes(app.name);
              return (
                <div
                  key={app.name}
                  onClick={() => toggleDistractingApp(app.name)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isPledged
                      ? 'bg-purple-50/50 border-purple-300'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      {app.iconLetter}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">{app.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{app.domain}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isPledged && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSimulatedBlockApp(app.name);
                        }}
                        className="px-1.5 py-0.5 text-[9px] text-purple-600 hover:underline"
                        title="Test block interception"
                      >
                        Simulate
                      </button>
                    )}
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        isPledged
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isPledged ? 'Blocked' : 'Allowed'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completed Sessions History */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Completed Focus Sessions History ({completedFocusSessions.length})
            </h2>
            <p className="text-xs text-slate-500">
              All logged deep work sessions stored locally with timestamps
            </p>
          </div>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg">
            {completedFocusSessions.reduce((a, c) => a + c.durationMinutes, 0)} Total Mins
          </span>
        </div>

        {completedFocusSessions.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            <Timer className="w-8 h-8 mx-auto mb-2 text-slate-300 stroke-1" />
            <p>No focus sessions recorded yet. Start your first sprint above!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {completedFocusSessions.map((session) => (
              <div
                key={session.id}
                className="py-3 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">
                      {session.topicTitle || 'Focused Study Sprint'}
                    </span>
                    <span className="block text-[11px] text-slate-400">
                      {new Date(session.timestamp).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>
                </div>

                <div className="font-mono text-purple-700 font-bold tabular-nums">
                  +{session.durationMinutes} minutes
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
