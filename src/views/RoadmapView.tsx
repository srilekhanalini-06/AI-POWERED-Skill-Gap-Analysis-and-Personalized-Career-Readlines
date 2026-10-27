import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Code2,
  HelpCircle,
  FolderGit2,
  ExternalLink,
  X,
  Sparkles,
  ArrowRight,
  Play,
  RotateCcw,
  Check,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREER_ROADMAPS } from '../data/careerRoadmaps';
import { LearningTopic, QuizQuestion } from '../types';

export const RoadmapView: React.FC = () => {
  const {
    targetCareer,
    completedTopicIds,
    toggleTopicCompletion,
    quizScores,
    recordQuizScore,
  } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeTopicModal, setActiveTopicModal] = useState<LearningTopic | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'concepts' | 'code' | 'quiz' | 'project' | 'resources'>('concepts');

  // Quiz state inside modal
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Filter topics
  const topics = CAREER_ROADMAPS.filter((t) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'role') return t.careerRole === targetCareer;
    if (selectedFilter === 'web') return t.category.includes('Web') || t.title.includes('HTML') || t.title.includes('CSS') || t.title.includes('React');
    if (selectedFilter === 'python') return t.title.includes('Python') || t.title.includes('FastAPI') || t.title.includes('Pandas');
    if (selectedFilter === 'java') return t.title.includes('Java') || t.title.includes('Spring');
    if (selectedFilter === 'sql') return t.title.includes('SQL') || t.category.includes('Databases');
    if (selectedFilter === 'git') return t.title.includes('Git') || t.category.includes('Tools');
    return true;
  });

  const handleOpenTopic = (topic: LearningTopic, initialTab: 'concepts' | 'code' | 'quiz' | 'project' | 'resources' = 'concepts') => {
    setActiveTopicModal(topic);
    setActiveModalTab(initialTab);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmitQuiz = (topic: LearningTopic) => {
    let correctCount = 0;
    topic.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });
    setQuizSubmitted(true);
    recordQuizScore(topic.id, correctCount, topic.quiz.length);
    if (correctCount === topic.quiz.length && !completedTopicIds.includes(topic.id)) {
      toggleTopicCompletion(topic.id, topic.title);
    }
  };

  const completedCount = CAREER_ROADMAPS.filter((t) => completedTopicIds.includes(t.id)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                Module 03
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">Interactive Career Syllabus</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              Personalized Learning Roadmap
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Engineered curriculum for {targetCareer} covering core languages, frameworks, SQL databases, Git workflows, interactive quizzes, and hands-on projects.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-semibold px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-800 rounded-xl">
              {completedCount} of {CAREER_ROADMAPS.length} Topics Mastered
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-6 pt-4 border-t border-slate-100">
          {[
            { id: 'all', label: 'All Curriculum' },
            { id: 'role', label: `Target: ${targetCareer}` },
            { id: 'web', label: 'HTML, CSS & React' },
            { id: 'java', label: 'Java & Spring' },
            { id: 'python', label: 'Python & FastAPI' },
            { id: 'sql', label: 'SQL & Databases' },
            { id: 'git', label: 'Git & Version Control' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedFilter === f.id
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {topics.map((topic) => {
          const isCompleted = completedTopicIds.includes(topic.id);
          const score = quizScores[topic.id];

          return (
            <div
              key={topic.id}
              className={`bg-white rounded-2xl border p-5 shadow-2xs flex flex-col justify-between transition-all hover:shadow-md ${
                isCompleted ? 'border-purple-200 bg-purple-50/10' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md">
                    {topic.category}
                  </span>
                  <button
                    onClick={() => toggleTopicCompletion(topic.id, topic.title)}
                    className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border transition-colors ${
                      isCompleted
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {topic.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                  <span className="font-mono tabular-nums">{topic.durationMinutes} mins</span>
                  <span>·</span>
                  <span>{topic.level}</span>
                  {score && (
                    <>
                      <span>·</span>
                      <span className="text-purple-700 font-bold">
                        Quiz: {score.score}/{score.totalQuestions}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenTopic(topic, 'concepts')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>Study Guide</span>
                </button>

                <button
                  onClick={() => handleOpenTopic(topic, 'quiz')}
                  className="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Quiz ({topic.quiz.length}Q)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Topic Detail Modal with Tabs */}
      {activeTopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-purple-100 bg-purple-50/50 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-white border border-purple-200 px-2 py-0.5 rounded">
                    {activeTopicModal.category}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500 font-mono">
                    {activeTopicModal.durationMinutes} min read
                  </span>
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  {activeTopicModal.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveTopicModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 py-2.5 border-b border-slate-100 bg-white overflow-x-auto">
              <button
                onClick={() => setActiveModalTab('concepts')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  activeModalTab === 'concepts'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-600 hover:bg-purple-50'
                }`}
              >
                Key Concepts
              </button>
              {activeTopicModal.codeSnippet && (
                <button
                  onClick={() => setActiveModalTab('code')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                    activeModalTab === 'code'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-600 hover:bg-purple-50'
                  }`}
                >
                  Code Example
                </button>
              )}
              <button
                onClick={() => setActiveModalTab('quiz')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  activeModalTab === 'quiz'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-600 hover:bg-purple-50'
                }`}
              >
                Knowledge Quiz ({activeTopicModal.quiz.length}Q)
              </button>
              <button
                onClick={() => setActiveModalTab('project')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  activeModalTab === 'project'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-600 hover:bg-purple-50'
                }`}
              >
                Hands-on Project
              </button>
              <button
                onClick={() => setActiveModalTab('resources')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  activeModalTab === 'resources'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-600 hover:bg-purple-50'
                }`}
              >
                Curated Resources
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Tab 1: Concepts */}
              {activeModalTab === 'concepts' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-slate-700 leading-relaxed">
                    <p className="font-bold text-purple-900 mb-1">Topic Summary</p>
                    <p>{activeTopicModal.summary}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Core Principles to Master
                    </h3>
                    <div className="space-y-2">
                      {activeTopicModal.keyConcepts.map((concept, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl border border-slate-200 bg-white flex items-start gap-3"
                        >
                          <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs text-slate-700 font-medium leading-relaxed">
                            {concept}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Code Snippet */}
              {activeModalTab === 'code' && activeTopicModal.codeSnippet && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">
                      {activeTopicModal.codeSnippet.caption}
                    </span>
                    <span className="font-mono text-purple-600 uppercase text-[10px] font-bold">
                      {activeTopicModal.codeSnippet.language}
                    </span>
                  </div>
                  <pre className="p-4 bg-slate-950 text-slate-100 rounded-2xl overflow-x-auto text-xs font-mono leading-relaxed border border-slate-800">
                    <code>{activeTopicModal.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Tab 3: Interactive Quiz */}
              {activeModalTab === 'quiz' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-3.5 bg-purple-50/60 rounded-xl border border-purple-100">
                    <span className="text-xs font-semibold text-purple-900">
                      Answer the questions below to test your mastery.
                    </span>
                    {quizSubmitted && (
                      <span className="text-xs font-bold text-purple-700 bg-white px-2.5 py-1 rounded-lg border border-purple-200">
                        Score:{' '}
                        {
                          activeTopicModal.quiz.filter(
                            (q, i) => selectedAnswers[i] === q.correctAnswerIndex
                          ).length
                        }{' '}
                        / {activeTopicModal.quiz.length}
                      </span>
                    )}
                  </div>

                  <div className="space-y-6">
                    {activeTopicModal.quiz.map((q, qIndex) => {
                      const isCorrect = selectedAnswers[qIndex] === q.correctAnswerIndex;
                      return (
                        <div
                          key={q.id}
                          className="p-4 rounded-xl border border-slate-200 bg-white space-y-3"
                        >
                          <p className="text-xs font-bold text-slate-900">
                            {qIndex + 1}. {q.question}
                          </p>

                          <div className="space-y-2">
                            {q.options.map((opt, optIndex) => {
                              const isSelected = selectedAnswers[qIndex] === optIndex;
                              let btnClass = 'border-slate-200 hover:border-purple-300 text-slate-700';

                              if (quizSubmitted) {
                                if (optIndex === q.correctAnswerIndex) {
                                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                                } else if (isSelected && !isCorrect) {
                                  btnClass = 'border-rose-400 bg-rose-50 text-rose-800';
                                } else {
                                  btnClass = 'border-slate-200 opacity-50';
                                }
                              } else if (isSelected) {
                                btnClass = 'border-purple-600 bg-purple-50 text-purple-900 font-semibold ring-1 ring-purple-600';
                              }

                              return (
                                <button
                                  key={optIndex}
                                  onClick={() => handleAnswerSelect(qIndex, optIndex)}
                                  disabled={quizSubmitted}
                                  className={`w-full text-left p-3 rounded-xl border text-xs transition-colors ${btnClass}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && (
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                              <span className="font-bold text-slate-800">Explanation: </span>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    {quizSubmitted ? (
                      <button
                        onClick={() => {
                          setSelectedAnswers({});
                          setQuizSubmitted(false);
                        }}
                        className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake Assessment</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSubmitQuiz(activeTopicModal)}
                        disabled={
                          Object.keys(selectedAnswers).length < activeTopicModal.quiz.length
                        }
                        className="px-5 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl shadow-sm transition-colors"
                      >
                        Submit Answers
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 4: Practical Project */}
              {activeModalTab === 'project' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <FolderGit2 className="w-4 h-4 text-purple-700" />
                      <h3 className="text-xs font-bold text-purple-900">
                        {activeTopicModal.projectBrief.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeTopicModal.projectBrief.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Required Project Deliverables
                    </h4>
                    <div className="space-y-2">
                      {activeTopicModal.projectBrief.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl border border-slate-200 bg-white flex items-center gap-3 text-xs text-slate-700"
                        >
                          <Check className="w-4 h-4 text-purple-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Curated Resources */}
              {activeModalTab === 'resources' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 mb-2">
                    Official documentation and verified learning references
                  </p>
                  {activeTopicModal.resources.map((res, idx) => (
                    <a
                      key={idx}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 flex items-center justify-between text-xs transition-colors group"
                    >
                      <div>
                        <span className="font-bold text-slate-900 group-hover:text-purple-700">
                          {res.title}
                        </span>
                        <span className="block text-[11px] text-slate-400 mt-0.5">
                          {res.type}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-600 shrink-0" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() =>
                  toggleTopicCompletion(activeTopicModal.id, activeTopicModal.title)
                }
                className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors ${
                  completedTopicIds.includes(activeTopicModal.id)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {completedTopicIds.includes(activeTopicModal.id)
                    ? 'Topic Completed'
                    : 'Mark as Completed'}
                </span>
              </button>

              <button
                onClick={() => setActiveTopicModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
