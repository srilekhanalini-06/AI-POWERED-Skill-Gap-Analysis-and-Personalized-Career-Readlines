import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Target,
  Sparkles,
  BookOpen,
  Plus,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREER_REQUIREMENTS } from '../data/skillDictionary';
import { CAREER_ROADMAPS } from '../data/careerRoadmaps';

export const SkillGapView: React.FC = () => {
  const {
    targetCareer,
    confirmedSkills,
    quickVerifySkill,
    setActiveView,
    completedTopicIds,
  } = useApp();

  const roleReq = CAREER_REQUIREMENTS[targetCareer] || CAREER_REQUIREMENTS['Web Developer'];

  // Check matching confirmed skills
  const isSkillConfirmed = (skillName: string) => {
    return confirmedSkills.some((s) => s.name.toLowerCase() === skillName.toLowerCase());
  };

  const existingEssential = roleReq.essentialSkills.filter(isSkillConfirmed);
  const missingEssential = roleReq.essentialSkills.filter((s) => !isSkillConfirmed(s));

  const existingRecommended = roleReq.recommendedSkills.filter(isSkillConfirmed);
  const missingRecommended = roleReq.recommendedSkills.filter((s) => !isSkillConfirmed(s));

  const existingBonus = roleReq.bonusSkills.filter(isSkillConfirmed);
  const missingBonus = roleReq.bonusSkills.filter((s) => !isSkillConfirmed(s));

  const totalRequired = roleReq.essentialSkills.length;
  const totalMatched = existingEssential.length;
  const readinessPercent = Math.min(
    100,
    Math.round((totalMatched / (totalRequired || 1)) * 100)
  );

  // Topics addressing missing skills
  const missingSkillNames = [...missingEssential, ...missingRecommended];
  const bridgeTopics = CAREER_ROADMAPS.filter(
    (t) =>
      (t.careerRole === targetCareer || t.id.startsWith('universal')) &&
      !completedTopicIds.includes(t.id)
  ).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header & Readiness Gauge */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                Module 02
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">Benchmark vs Industry Standard</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              Skill Gap Analysis: {targetCareer}
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl">
              We benchmark your confirmed capabilities against core job prerequisites. Below, see confirmed strengths, unverified skills, and fast-track learning recommendations.
            </p>
          </div>

          {/* Readiness Score Card */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-50/60 border border-purple-100 shrink-0">
            <div className="w-14 h-14 rounded-full bg-white border-2 border-purple-600 flex items-center justify-center font-mono font-extrabold text-lg text-purple-700 shadow-2xs">
              {readinessPercent}%
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Career Readiness</p>
              <p className="text-[11px] text-slate-500 font-mono tabular-nums">
                {totalMatched} of {totalRequired} Essential Skills Confirmed
              </p>
              <div className="w-32 h-1.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${readinessPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crucial Fair Assessment Callout Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 text-xs text-purple-900 flex items-start gap-3 shadow-2xs">
        <HelpCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Student Fairness Principle: Absence is Not Incompetence</p>
          <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
            Never assume an absent resume skill means you do not know it. Resumes are frequently abbreviated or formatted differently. Use our <strong>Quick Verification</strong> checklist below to confirm any skills you possess with a single click.
          </p>
        </div>
      </div>

      {/* 2-Column Split: Existing vs Missing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Existing Confirmed Skills (Left) */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900">
                Existing Confirmed Skills ({existingEssential.length + existingRecommended.length + existingBonus.length})
              </h2>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Verified
            </span>
          </div>

          <div className="space-y-3">
            {/* Essential Matched */}
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Core Essential Skills ({existingEssential.length}/{roleReq.essentialSkills.length})
              </p>
              {existingEssential.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No essential skills confirmed yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {existingEssential.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended Matched */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Recommended Skills ({existingRecommended.length}/{roleReq.recommendedSkills.length})
              </p>
              {existingRecommended.length === 0 ? (
                <p className="text-xs text-slate-400 italic">None confirmed yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {existingRecommended.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-800 rounded-xl text-xs font-semibold"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bonus Matched */}
            {existingBonus.length > 0 && (
              <div className="pt-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Bonus / Cloud Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {existingBonus.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs"
                    >
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Missing / Unconfirmed Skills & Quick Verification (Right) */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900">
                Missing or Unconfirmed Skills ({missingEssential.length + missingRecommended.length})
              </h2>
            </div>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Needs Verification
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-500">
              Click <strong>"I know this"</strong> if you already possess the skill, or <strong>"Learn Topic"</strong> to add it to your roadmap.
            </p>

            {/* Missing Essential */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Priority 1: Core Role Requirements
              </p>
              {missingEssential.length === 0 ? (
                <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>All core essential skills verified for this role!</span>
                </div>
              ) : (
                missingEssential.map((skillName) => (
                  <div
                    key={skillName}
                    className="p-3 rounded-xl border border-amber-200 bg-amber-50/30 flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900">{skillName}</span>
                      <span className="block text-[10px] text-amber-700 font-medium">
                        Essential prerequisite
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => quickVerifySkill(skillName, true)}
                        className="px-2.5 py-1 text-xs font-semibold text-purple-700 bg-white border border-purple-200 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                        title="Confirm that you already know this skill"
                      >
                        <Plus className="w-3 h-3" />
                        <span>I know this</span>
                      </button>
                      <button
                        onClick={() => setActiveView('roadmap')}
                        className="px-2.5 py-1 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                      >
                        Learn
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Missing Recommended */}
            {missingRecommended.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Priority 2: Recommended Competencies
                </p>
                {missingRecommended.map((skillName) => (
                  <div
                    key={skillName}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900">{skillName}</span>
                      <span className="block text-[10px] text-slate-500">Industry recommended</span>
                    </div>

                    <button
                      onClick={() => quickVerifySkill(skillName, true)}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <Plus className="w-3 h-3" />
                      <span>I know this</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Roadmap Modules to Bridge the Gap */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Curriculum Topics to Bridge Your Skill Gaps
            </h2>
            <p className="text-xs text-slate-500">
              Directly targeted topics with interactive code snippets and quizzes
            </p>
          </div>
          <button
            onClick={() => setActiveView('roadmap')}
            className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Open Personalized Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bridgeTopics.map((topic) => (
            <div
              key={topic.id}
              className="p-4 rounded-xl border border-purple-100 hover:border-purple-300 transition-colors bg-purple-50/20 flex flex-col justify-between"
            >
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded">
                    {topic.category}
                  </span>
                  <span className="text-[11px] text-slate-400">·</span>
                  <span className="text-[11px] text-slate-500 font-mono">{topic.durationMinutes}m</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900">{topic.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{topic.summary}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-purple-100/60">
                <span className="text-[11px] font-medium text-slate-500">
                  {topic.quiz.length} Assessment Questions
                </span>
                <button
                  onClick={() => setActiveView('roadmap')}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-1"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Start Module</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
