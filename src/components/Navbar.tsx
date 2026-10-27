import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Bell,
  Sparkles,
  LogOut,
  ChevronDown,
  Compass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CareerRole } from '../types';

interface NavbarProps {
  onOpenNotifications: () => void;
  onOpenVoiceSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications, onOpenVoiceSettings }) => {
  const {
    user,
    logout,
    activeView,
    setActiveView,
    targetCareer,
    setTargetCareer,
    voiceEnabled,
    toggleVoice,
    triggerVoiceEncouragement,
    unreadNotificationCount,
  } = useApp();

  const [careerDropdownOpen, setCareerDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const careers: CareerRole[] = [
    'Web Developer',
    'Java Developer',
    'Python Developer',
    'Data Analyst',
    'AI Engineer',
  ];

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-6 px-6 py-3.5 bg-white border-b border-purple-100 shadow-xs">
      {/* Zone 1: Single Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
            CareerReady <span className="text-purple-600 font-extrabold">AI</span>
          </span>
        </button>
      </div>

      {/* Zone 2: Navigation Breadcrumbs & Career Switcher */}
      <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-600">
        <div className="relative">
          <button
            onClick={() => setCareerDropdownOpen(!careerDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-purple-200 bg-purple-50/50 hover:bg-purple-50 text-purple-900 transition-colors whitespace-nowrap"
            title="Switch Target Career Track"
          >
            <span className="text-purple-600 font-semibold">Track:</span>
            <span className="font-bold text-slate-800">{targetCareer}</span>
            <ChevronDown className="w-3.5 h-3.5 text-purple-500" />
          </button>

          {careerDropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-purple-100 py-1.5 z-50">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Career Goal
              </div>
              {careers.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setTargetCareer(c);
                    setCareerDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                    c === targetCareer
                      ? 'bg-purple-50 text-purple-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{c}</span>
                  {c === targetCareer && <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <span className="text-slate-300">/</span>

        <span className="text-slate-500 capitalize">
          {activeView.replace('-', ' ')}
        </span>
      </div>

      {/* Zone 3: Voice Encouragement, Notifications & User Actions */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Voice Encouragement CTA */}
        <button
          onClick={() => triggerVoiceEncouragement()}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors whitespace-nowrap shadow-2xs"
          title="Play Voice Encouragement with Browser Speech"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Speak Motivation</span>
        </button>

        {/* Voice Audio Toggle */}
        <button
          onClick={toggleVoice}
          onContextMenu={(e) => {
            e.preventDefault();
            onOpenVoiceSettings();
          }}
          className={`p-2 rounded-lg transition-colors border ${
            voiceEnabled
              ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
              : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
          }`}
          title={voiceEnabled ? 'Voice Encouragement Enabled (Click to Mute, Right-click for Settings)' : 'Voice Encouragement Muted'}
          aria-label="Toggle voice"
        >
          {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
          title="Open Notifications"
          aria-label="Open notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white shadow-xs">
              {unreadNotificationCount}
            </span>
          )}
        </button>

        {/* User Profile Menu */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-purple-100 hover:border-purple-300 transition-colors"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-purple-200 bg-purple-100"
              />
              <span className="hidden lg:inline text-xs font-semibold text-slate-800 max-w-28 truncate">
                {user.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-purple-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  <p className="text-[10px] font-semibold text-purple-600 mt-1 uppercase tracking-wider">
                    {user.targetCareer}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveView('reports');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-purple-50 transition-colors"
                  >
                    View Progress Report
                  </button>
                  <button
                    onClick={() => {
                      onOpenVoiceSettings();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-purple-50 transition-colors"
                  >
                    Voice & Speech Settings
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setActiveView('login')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
