import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Check,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CareerRole } from '../types';
import { extractTextFromFile } from '../services/resumeParser';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { CAREER_REQUIREMENTS } from '../data/skillDictionary';

export const ResumeAnalysisView: React.FC = () => {
  const {
    targetCareer,
    setTargetCareer,
    extractedSkills,
    toggleSkillConfirmation,
    addCustomSkill,
    removeSkill,
    processResumeText,
    setActiveView,
  } = useApp();

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customSkillName, setCustomSkillName] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const careers: CareerRole[] = [
    'Web Developer',
    'Java Developer',
    'Python Developer',
    'Data Analyst',
    'AI Engineer',
  ];

  const handleFile = async (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);
    try {
      const text = await extractTextFromFile(file);
      processResumeText(text);
    } catch (err) {
      console.error('File parsing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleLoadSample = (sampleId: string) => {
    const sample = SAMPLE_RESUMES.find((s) => s.id === sampleId);
    if (sample) {
      setFileName(`${sample.name}.pdf`);
      setIsProcessing(true);
      setTimeout(() => {
        processResumeText(sample.content);
        if (sample.roleTarget) {
          setTargetCareer(sample.roleTarget as CareerRole);
        }
        setIsProcessing(false);
      }, 300);
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillName.trim()) return;
    addCustomSkill(customSkillName.trim());
    setCustomSkillName('');
  };

  const confirmedCount = extractedSkills.filter((s) => s.confirmed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                Module 01
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">Heuristic Skill Engine</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              Resume Skill Extraction & Target Role Calibration
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Upload your PDF, DOCX, or text resume. Our system extracts technology keywords against an industry dictionary and lets you confirm your true capabilities.
            </p>
          </div>

          <button
            onClick={() => setActiveView('gap-analysis')}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm shrink-0"
          >
            <span>Proceed to Skill Gap Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Target Career Selector Card */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs">
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
            Step 1: Choose Your Target Career Specialization
          </label>
          <p className="text-xs text-slate-500">
            We will calibrate skill gap evaluations and personalized learning modules to this target.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {careers.map((career) => {
            const isSelected = targetCareer === career;
            return (
              <button
                key={career}
                onClick={() => setTargetCareer(career)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-purple-50 border-purple-600 ring-2 ring-purple-600/20 text-purple-900 shadow-2xs'
                    : 'bg-white border-slate-200 hover:border-purple-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold">{career}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-purple-700 stroke-[3]" />}
                </div>
                <p className="text-[10px] text-slate-500 line-clamp-2">
                  {CAREER_REQUIREMENTS[career]?.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resume Upload & Sample Loaders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Upload Dropzone (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-5">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Step 2: Upload Resume (PDF, DOCX, or TXT)
            </h2>
            <p className="text-xs text-slate-500">
              Files are processed in your browser sandbox. No resume data ever leaves your device.
            </p>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-purple-600 bg-purple-50/60'
                : 'border-purple-200 hover:border-purple-400 bg-purple-50/20 hover:bg-purple-50/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              {isProcessing ? (
                <RefreshCw className="w-6 h-6 animate-spin" />
              ) : (
                <UploadCloud className="w-6 h-6" />
              )}
            </div>

            <p className="text-xs font-bold text-slate-900">
              {isProcessing
                ? 'Extracting text and identifying skill matches...'
                : fileName
                ? `Uploaded: ${fileName}`
                : 'Drop your resume here, or browse files'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Supports .pdf, .docx, and .txt files up to 25MB
            </p>
          </div>

          {/* 1-Click Sample Resumes */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Or Test With Sample Resumes (1-Click Evaluation)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SAMPLE_RESUMES.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleLoadSample(sample.id)}
                  className="p-3 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 text-left transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900">{sample.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">
                    {sample.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Add Custom Skill Manually (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Manual Skill Addition
            </h2>
            <p className="text-xs text-slate-500">
              Resume missing something you know? Add any skill manually below.
            </p>
          </div>

          <form onSubmit={handleAddCustom} className="space-y-3">
            <input
              type="text"
              value={customSkillName}
              onChange={(e) => setCustomSkillName(e.target.value)}
              placeholder="e.g. Docker, TypeScript, SQL..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-purple-600"
            />
            <button
              type="submit"
              className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Confirmed Skills</span>
            </button>
          </form>

          <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-900 leading-relaxed">
            <p className="font-bold flex items-center gap-1.5 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-purple-700" />
              <span>Fair Assessment Policy</span>
            </p>
            <p className="text-[11px] text-slate-600">
              Our platform never assumes that an absent resume skill means you don't know it. You can freely toggle confirmation status anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Extracted Skills Confirmation Table */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Step 3: Confirm Detected Skills ({confirmedCount} / {extractedSkills.length} Confirmed)
            </h2>
            <p className="text-xs text-slate-500">
              Click the checkmark to toggle whether you are ready to be tested on this skill.
            </p>
          </div>

          <span className="text-xs text-purple-700 font-semibold bg-purple-50 px-3 py-1 rounded-lg self-start sm:self-auto">
            {confirmedCount} Skills Verified
          </span>
        </div>

        {extractedSkills.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300 stroke-1" />
            <p>No skills extracted yet. Upload a resume or click a sample resume above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {extractedSkills.map((skill) => (
              <div
                key={skill.name}
                className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  skill.confirmed
                    ? 'bg-purple-50/40 border-purple-200'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono tabular-nums font-semibold text-purple-700 bg-white border border-purple-200 px-1.5 py-0.5 rounded">
                      {skill.confidence}% match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{skill.category}</p>
                  {skill.sourceContext && (
                    <p className="text-[10px] text-slate-400 italic truncate max-w-xs">
                      "{skill.sourceContext}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleSkillConfirmation(skill.name)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      skill.confirmed
                        ? 'bg-purple-600 border-purple-600 text-white'
                        : 'bg-white border-slate-300 text-slate-400 hover:text-slate-600'
                    }`}
                    title={skill.confirmed ? 'Confirmed skill (Click to unconfirm)' : 'Unconfirmed (Click to confirm)'}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeSkill(skill.name)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-white transition-colors"
                    title="Remove skill"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
