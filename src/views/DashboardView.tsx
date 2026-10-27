import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Timer,
  FileText,
  GitCompare,
  TrendingUp,
  Target,
  Flame,
  Clock,
  Play,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREER_REQUIREMENTS } from '../data/skillDictionary';
import { CAREER_ROADMAPS } from '../data/careerRoadmaps';

export const DashboardView: React.FC = () => {
  const {
    user,
    targetCareer,
    dailyGoalMinutes,
    todayStudiedMinutes,
    completedFocusSessions,
    confirmedSkills,
    completedTopicIds,
    toggleTopicCompletion,
    setActiveView,
    triggerVoiceEncouragement,
    quizScores,
  } = useApp();

  const roleReqs = CAREER_REQUIREMENTS[targetCareer] || CAREER_REQUIREMENTS['Web Developer'];
  const essentialCount = roleReqs.essentialSkills.length;
  const confirmedEssential = roleReqs.essentialSkills.filter((req) =>
    confirmedSkills.some((s) => s.name.toLowerCase() === req.toLowerCase())
  ).length;

  const readinessPercent = Math.min(
    100,
    Math.round((confirmedEssential / (essentialCount || 1)) * 100)
  );

  // Relevant roadmap topics for current career
  const roleTopics = CAREER_ROADMAPS.filter(
    (t) => t.careerRole === targetCareer || t.id.startsWith('universal')
  );

  const completedRoleTopicsCount = roleTopics.filter((t) =>
    completedTopicIds.includes(t.id)
  ).length;

  const roadmapProgressPercent = Math.min(
    100,
    Math.round((completedRoleTopicsCount / (roleTopics.length || 1)) * 100)
  );

  // Recommended next tasks
  const recommendedTopics = roleTopics.filter((t) => !completedTopicIds.includes(t.id)).slice(0, 3);

  const dailyProgressPercent = Math.min(
    100,
    Math.round((todayStudiedMinutes / (dailyGoalMinutes || 60)) * 100)
  );

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 rounded-2xl text-white shadow-sm relative overflow-hidden">
        {/* Subtle decorative geometric overlay */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-white/15 backdrop-blur-xs rounded-md text-purple-200">
                Aspirational Track: {targetCareer}
              </span>
              <span className="text-xs text-purple-300 font-medium flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {user?.streakDays || 1}-day active streak
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Srilekha'}!
            </h1>
            <p className="text-xs md:text-sm text-purple-200 max-w-xl leading-relaxed">
              You are {readinessPercent}% career-ready for your target role as a {targetCareer}. Complete today's focus sprint and master key topics to bridge your remaining skill gaps.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => triggerVoiceEncouragement()}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-xs border border-white/20 flex items-center gap-2 transition-all shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>Voice Encouragement</span>
            </button>
            <button
              onClick={() => setActiveView('focus')}
              className="px-4 py-2.5 bg-white text-purple-900 hover:bg-purple-50 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-purple-900" />
              <span>Start Focus Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Career Readiness Score */}
        <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-2xs hover:border-purple-200 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Career Readiness</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {readinessPercent}%
            </span>
            <span className="text-xs text-slate-500 font-medium">
              ({confirmedEssential}/{essentialCount} core skills)
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Daily Study Goal */}
        <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-2xs hover:border-purple-200 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Today's Study Goal</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {todayStudiedMinutes}m
            </span>
            <span className="text-xs text-slate-500 font-medium">
              / {dailyGoalMinutes}m target
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${dailyProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Focus Sessions */}
        <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-2xs hover:border-purple-200 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Focus Sprints</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Timer className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {completedFocusSessions.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">sessions logged</span>
          </div>
          <p className="text-[11px] text-slate-500">
            {completedFocusSessions.reduce((a, c) => a + c.durationMinutes, 0)} total focus mins recorded
          </p>
        </div>

        {/* Metric 4: Curriculum Mastery */}
        <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-2xs hover:border-purple-200 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Roadmap Progress</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {roadmapProgressPercent}%
            </span>
            <span className="text-xs text-slate-500 font-medium">
              ({completedRoleTopicsCount}/{roleTopics.length} topics)
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${roadmapProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Recommended Tasks & Quick Career Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recommended Learning Tasks (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Recommended Learning Tasks for {targetCareer}
              </h2>
              <p className="text-xs text-slate-500">
                Curated curriculum topics tailored to your detected skill gaps
              </p>
            </div>
            <button
              onClick={() => setActiveView('roadmap')}
              className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors"
            >
              <span>Full Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {recommendedTopics.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-purple-50/50 border border-purple-100">
                <Award className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                <p className="text-xs font-bold text-slate-800">
                  Congratulations! All standard topics in this track completed.
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Try another career track or take comprehensive quizzes to hone your knowledge.
                </p>
              </div>
            ) : (
              recommendedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-purple-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                        {topic.category}
                      </span>
                      <span className="text-[11px] text-slate-400">·</span>
                      <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                        {topic.durationMinutes} mins
                      </span>
                      <span className="text-[11px] text-slate-400">·</span>
                      <span className="text-[11px] text-slate-500">{topic.level}</span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900">{topic.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{topic.summary}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActiveView('roadmap')}
                      className="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                      Study Topic
                    </button>
                    <button
                      onClick={() => toggleTopicCompletion(topic.id, topic.title)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                      title="Mark as completed"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Fast Action Hub & Confirmed Skills (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Hub Card */}
          <div className="bg-white rounded-2xl border border-purple-100 p-5 shadow-2xs space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Quick Career Actions
            </h2>
            <div className="space-y-2">
              <button
                onClick={() => setActiveView('resume')}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 text-left transition-all flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Upload or Analyze Resume</p>
                  <p className="text-[11px] text-slate-500">Scan PDF/DOCX for skills</p>
                </div>
              </button>

              <button
                onClick={() => setActiveView('gap-analysis')}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 text-left transition-all flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <GitCompare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Review Skill Gaps</p>
                  <p className="text-[11px] text-slate-500">Benchmark vs role criteria</p>
                </div>
              </button>

              <button
                onClick={() => setActiveView('planner')}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 text-left transition-all flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Adjust Study Planner</p>
                  <p className="text-[11px] text-slate-500">Set daily 30m / 1h / 2h</p>
                </div>
              </button>
            </div>
          </div>

          {/* Confirmed Skills Snapshot */}
          <div className="bg-white rounded-2xl border border-purple-100 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Confirmed Skills ({confirmedSkills.length})
              </h2>
              <button
                onClick={() => setActiveView('resume')}
                className="text-[11px] text-purple-600 hover:underline font-semibold"
              >
                Manage
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {confirmedSkills.slice(0, 8).map((s) => (
                <span
                  key={s.name}
                  className="px-2.5 py-1 bg-purple-50 border border-purple-200 rounded-lg text-xs font-semibold text-purple-800"
                >
                  {s.name}
                </span>
              ))}
              {confirmedSkills.length > 8 && (
                <span className="px-2 py-1 text-xs text-slate-400">
                  +{confirmedSkills.length - 8} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
