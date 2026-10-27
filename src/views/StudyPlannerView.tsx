import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Sliders,
  Sparkles,
  Save,
  Check,
  Plus,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DaySchedule } from '../types';

export const StudyPlannerView: React.FC = () => {
  const {
    dailyGoalMinutes,
    setDailyGoalMinutes,
    weeklySchedule,
    updateDaySchedule,
    todayStudiedMinutes,
    triggerVoiceEncouragement,
  } = useApp();

  const [customMinutes, setCustomMinutes] = useState<string>(
    [30, 60, 120].includes(dailyGoalMinutes) ? '45' : dailyGoalMinutes.toString()
  );
  const [isCustomSelected, setIsCustomSelected] = useState<boolean>(
    ![30, 60, 120].includes(dailyGoalMinutes)
  );
  const [saveToast, setSaveToast] = useState<boolean>(false);
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [newTopicInput, setNewTopicInput] = useState<string>('');

  const durationOptions = [
    { label: '30 Minutes', minutes: 30, description: 'Micro-learning sprint for busy weekdays' },
    { label: '1 Hour', minutes: 60, description: 'Balanced pace (1 theory block + 1 coding quiz)' },
    { label: '2 Hours', minutes: 120, description: 'Deep career transition immersion' },
  ];

  const handleSelectDuration = (minutes: number) => {
    setIsCustomSelected(false);
    setDailyGoalMinutes(minutes);
    showSavedNotification();
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customMinutes, 10);
    if (!isNaN(val) && val > 0 && val <= 720) {
      setIsCustomSelected(true);
      setDailyGoalMinutes(val);
      showSavedNotification();
    }
  };

  const showSavedNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleAddTopicToDay = (day: string) => {
    if (!newTopicInput.trim()) return;
    const current = weeklySchedule.find((s) => s.day === day);
    if (current) {
      updateDaySchedule(day, current.targetMinutes, [...current.plannedTopics, newTopicInput.trim()]);
      setNewTopicInput('');
    }
  };

  const handleRemoveTopicFromDay = (day: string, topicIdx: number) => {
    const current = weeklySchedule.find((s) => s.day === day);
    if (current) {
      const updated = current.plannedTopics.filter((_, i) => i !== topicIdx);
      updateDaySchedule(day, current.targetMinutes, updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                Module 04
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">Cadence & Habit Engine</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              Personalized Study Planner
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Configure your daily study commitment and schedule structured weekly learning sprints to maintain consistent momentum.
            </p>
          </div>

          {saveToast && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold animate-fade-in shadow-2xs">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Goal Saved to Local Storage!</span>
            </div>
          )}
        </div>
      </div>

      {/* Daily Duration Selector */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
        <div>
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
            Choose Daily Study Duration
          </h2>
          <p className="text-xs text-slate-500">
            Select standard presets or specify custom daily study minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {durationOptions.map((opt) => {
            const isSelected = !isCustomSelected && dailyGoalMinutes === opt.minutes;
            return (
              <button
                key={opt.minutes}
                onClick={() => handleSelectDuration(opt.minutes)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-purple-50 border-purple-600 ring-2 ring-purple-600/20 text-purple-900 shadow-2xs'
                    : 'bg-white border-slate-200 hover:border-purple-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold">{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-purple-600 stroke-[3]" />}
                </div>
                <p className="text-[11px] text-slate-500">{opt.description}</p>
                <div className="mt-2 text-xs font-mono font-semibold text-purple-700">
                  {opt.minutes} minutes / day
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Duration Selector */}
        <div className="pt-2">
          <form
            onSubmit={handleApplyCustom}
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isCustomSelected
                ? 'bg-purple-50/50 border-purple-600 ring-2 ring-purple-600/20'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <p className="text-xs font-bold text-slate-900">Custom Daily Duration</p>
              <p className="text-[11px] text-slate-500">Specify any study target between 15 and 720 minutes</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="15"
                max="720"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold text-slate-800 bg-white focus:outline-none focus:border-purple-600"
              />
              <span className="text-xs text-slate-500">mins</span>
              <button
                type="submit"
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
              >
                Apply Custom
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Weekly Schedule Timetable */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Weekly Study Timetable (Monday – Sunday)
            </h2>
            <p className="text-xs text-slate-500">
              Map out target minutes and key topics for each day of the week
            </p>
          </div>
          <button
            onClick={() => triggerVoiceEncouragement('Stick to your study schedule! Consistent small steps lead to giant career leaps.')}
            className="text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Encouragement Coach</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {weeklySchedule.map((schedule) => {
            const isToday =
              new Date().toLocaleDateString('en-US', { weekday: 'long' }) === schedule.day;
            const isEditing = editingDay === schedule.day;

            return (
              <div
                key={schedule.day}
                className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                  isToday
                    ? 'border-purple-600 bg-purple-50/40 ring-1 ring-purple-600/30'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{schedule.day}</span>
                    {isToday && (
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                        Today
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] font-mono text-purple-700 font-semibold">
                    {schedule.targetMinutes} mins target
                  </div>

                  <div className="space-y-1 pt-1">
                    {schedule.plannedTopics.map((topic, idx) => (
                      <div
                        key={idx}
                        className="p-1.5 rounded bg-slate-50 border border-slate-100 text-[10px] text-slate-700 flex items-center justify-between group"
                      >
                        <span className="truncate">{topic}</span>
                        <button
                          onClick={() => handleRemoveTopicFromDay(schedule.day, idx)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity ml-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100">
                  {isEditing ? (
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        value={newTopicInput}
                        onChange={(e) => setNewTopicInput(e.target.value)}
                        placeholder="Add topic..."
                        className="w-full px-2 py-1 text-[11px] border border-purple-300 rounded bg-white focus:outline-none"
                      />
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleAddTopicToDay(schedule.day)}
                          className="flex-1 py-1 bg-purple-600 text-white rounded text-[10px] font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingDay(null)}
                          className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingDay(schedule.day);
                        setNewTopicInput('');
                      }}
                      className="w-full py-1 text-[10px] font-semibold text-purple-600 hover:bg-purple-50 rounded transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Topic</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
