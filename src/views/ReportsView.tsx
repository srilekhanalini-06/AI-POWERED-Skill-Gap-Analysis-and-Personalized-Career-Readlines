import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  HelpCircle,
  Download,
  Printer,
  Sparkles,
  Trophy,
  Target,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREER_ROADMAPS } from '../data/careerRoadmaps';

export const ReportsView: React.FC = () => {
  const {
    user,
    targetCareer,
    completedTopicIds,
    completedFocusSessions,
    quizScores,
    weeklySchedule,
    triggerVoiceEncouragement,
  } = useApp();

  const roleTopics = CAREER_ROADMAPS.filter(
    (t) => t.careerRole === targetCareer || t.id.startsWith('universal')
  );

  const completedCount = roleTopics.filter((t) =>
    completedTopicIds.includes(t.id)
  ).length;

  const remainingCount = Math.max(0, roleTopics.length - completedCount);

  const totalFocusMinutes = completedFocusSessions.reduce(
    (acc, curr) => acc + curr.durationMinutes,
    0
  );
  const totalHours = Math.floor(totalFocusMinutes / 60);
  const remainingMins = totalFocusMinutes % 60;

  // Compute average quiz accuracy
  const scoreEntries = Object.values(quizScores);
  const totalQuestionsAnswered = scoreEntries.reduce((a, c) => a + c.totalQuestions, 0);
  const totalCorrectAnswered = scoreEntries.reduce((a, c) => a + c.score, 0);
  const avgQuizAccuracy =
    totalQuestionsAnswered > 0
      ? Math.round((totalCorrectAnswered / totalQuestionsAnswered) * 100)
      : 100;

  // Mock weekly logged study distribution for visual SVG bar chart
  const weeklyActuals: Record<string, number> = {
    Monday: 45,
    Tuesday: 60,
    Wednesday: 35,
    Thursday: 50,
    Friday: 25,
    Saturday: 75,
    Sunday: 30,
  };

  const maxChartMinutes = 120;

  const handleExportJSON = () => {
    const reportData = {
      studentName: user?.name || 'Srilekha',
      email: user?.email || 'srilekhanalini@gmail.com',
      targetCareer,
      exportDate: new Date().toISOString(),
      metrics: {
        completedTopics: completedCount,
        totalTopics: roleTopics.length,
        remainingTopics: remainingCount,
        totalStudyMinutesLogged: totalFocusMinutes,
        averageQuizAccuracyPercent: avgQuizAccuracy,
      },
      completedTopicIds,
      quizScores,
      focusSessions: completedFocusSessions,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `career_readiness_report_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                Module 06
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">Student Analytics & Milestone Logs</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              Comprehensive Career Readiness Report
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Detailed tracking of completed modules, logged focus minutes, assessment accuracy, and remaining milestone tasks for {targetCareer}.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report (JSON)</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Completed Topics</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {completedCount} <span className="text-xs text-slate-400 font-normal">/ {roleTopics.length}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            {Math.round((completedCount / (roleTopics.length || 1)) * 100)}% Syllabus Finished
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Total Study Time</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {totalHours}h {remainingMins}m
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            {completedFocusSessions.length} sessions logged
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Quiz Accuracy</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {avgQuizAccuracy}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            {totalCorrectAnswered} of {totalQuestionsAnswered || 0} questions correct
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Remaining Tasks</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {remainingCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            Estimated ~{remainingCount * 50} mins to completion
          </p>
        </div>
      </div>

      {/* Weekly Progress Visual Chart (SVG Clean Bar Graph) */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Weekly Study Minutes: Target vs. Actual
            </h2>
            <p className="text-xs text-slate-500">
              Visual comparison of planned schedule vs completed focus sessions
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded bg-purple-600 inline-block" />
              <span>Actual Studied</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded bg-purple-200 inline-block" />
              <span>Planned Target</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-3 pt-4 items-end h-56">
          {weeklySchedule.map((day) => {
            const actual = weeklyActuals[day.day] || 30;
            const target = day.targetMinutes;

            const actualHeight = Math.min(100, Math.round((actual / maxChartMinutes) * 100));
            const targetHeight = Math.min(100, Math.round((target / maxChartMinutes) * 100));

            return (
              <div key={day.day} className="flex flex-col items-center justify-end h-full gap-2">
                <div className="flex items-end justify-center gap-1.5 w-full h-40">
                  {/* Actual Bar */}
                  <div
                    className="w-4 bg-purple-600 rounded-t-md transition-all duration-500 group relative cursor-pointer"
                    style={{ height: `${actualHeight}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded whitespace-nowrap transition-opacity font-mono">
                      {actual}m done
                    </span>
                  </div>

                  {/* Planned Target Bar */}
                  <div
                    className="w-4 bg-purple-200 rounded-t-md transition-all duration-500 group relative cursor-pointer"
                    style={{ height: `${targetHeight}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded whitespace-nowrap transition-opacity font-mono">
                      {target}m target
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-slate-700 truncate">
                  {day.day.substring(0, 3)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topics Completion Ledger Table */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Curriculum Status Ledger ({roleTopics.length} Topics Total)
          </h2>
          <p className="text-xs text-slate-500">
            Individual status, assessment score, and duration per module
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase font-semibold text-[10px]">
                <th className="pb-3 font-semibold">Topic Title</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold text-right">Est. Minutes</th>
                <th className="pb-3 font-semibold text-center">Quiz Score</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roleTopics.map((topic) => {
                const isCompleted = completedTopicIds.includes(topic.id);
                const score = quizScores[topic.id];

                return (
                  <tr key={topic.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 font-bold text-slate-900">{topic.title}</td>
                    <td className="py-3 text-slate-600">{topic.category}</td>
                    <td className="py-3 text-right font-mono tabular-nums text-slate-600">
                      {topic.durationMinutes}m
                    </td>
                    <td className="py-3 text-center">
                      {score ? (
                        <span className="font-mono font-bold text-purple-700">
                          {score.score} / {score.totalQuestions}
                        </span>
                      ) : (
                        <span className="text-slate-400">Not taken</span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {isCompleted ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
