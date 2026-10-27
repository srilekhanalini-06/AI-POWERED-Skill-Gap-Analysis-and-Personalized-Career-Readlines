import React from 'react';
import {
  LayoutDashboard,
  FileText,
  GitCompare,
  Map,
  Calendar,
  Timer,
  BarChart3,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const {
    activeView,
    setActiveView,
    user,
    dailyGoalMinutes,
    todayStudiedMinutes,
    completedTopicIds,
  } = useApp();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'resume',
      label: 'Resume Analysis',
      icon: FileText,
      badge: 'Extract',
    },
    {
      id: 'gap-analysis',
      label: 'Skill Gap Analysis',
      icon: GitCompare,
      badge: 'Compare',
    },
    {
      id: 'roadmap',
      label: 'Personalized Roadmap',
      icon: Map,
      badge: `${completedTopicIds.length} done`,
    },
    {
      id: 'planner',
      label: 'Study Planner',
      icon: Calendar,
      badge: null,
    },
    {
      id: 'focus',
      label: 'Focus Mode',
      icon: Timer,
      badge: 'Timer',
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      badge: null,
    },
  ];

  const dailyProgressPercent = Math.min(
    100,
    Math.round((todayStudiedMinutes / (dailyGoalMinutes || 60)) * 100)
  );

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-purple-100 flex flex-col z-40 transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:h-[calc(100vh-57px)]`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-purple-100 lg:hidden">
          <span className="text-sm font-bold text-slate-800">Navigation Menu</span>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Platform Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-200'
                    : 'text-slate-600 hover:bg-purple-50/70 hover:text-purple-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-purple-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-purple-500/40 text-purple-100'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Daily Study Streak & Goal Summary Card */}
        <div className="p-4 border-t border-purple-100 bg-purple-50/30">
          <div className="p-3.5 bg-white rounded-xl border border-purple-100 shadow-2xs space-y-3">
            {/* Streak Counter */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Daily Streak</span>
              <div className="flex items-center gap-1 font-bold text-amber-600">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{user?.streakDays || 1} Days Active</span>
              </div>
            </div>

            {/* Daily Goal Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium text-slate-600">
                <span>Daily Goal</span>
                <span className="font-mono tabular-nums text-purple-700 font-semibold">
                  {todayStudiedMinutes} / {dailyGoalMinutes}m
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${dailyProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Micro status text */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="truncate">
                {dailyProgressPercent >= 100
                  ? 'Goal Achieved Today!'
                  : `${Math.max(0, dailyGoalMinutes - todayStudiedMinutes)}m remaining today`}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
