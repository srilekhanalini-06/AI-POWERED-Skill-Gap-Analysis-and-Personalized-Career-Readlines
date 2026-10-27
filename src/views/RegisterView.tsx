import React, { useState } from 'react';
import { Compass, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CareerRole } from '../types';

interface RegisterViewProps {
  onSwitchToLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onSwitchToLogin }) => {
  const { register, setActiveView } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetCareer, setTargetCareer] = useState<CareerRole>('Web Developer');
  const [error, setError] = useState('');

  const careers: CareerRole[] = [
    'Web Developer',
    'Java Developer',
    'Python Developer',
    'Data Analyst',
    'AI Engineer',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    register(name, email, password, targetCareer);
    setActiveView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50/40 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Hero / Brand Column */}
        <div className="lg:col-span-5 bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">CareerReady AI</span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight mb-3 leading-snug">
              Begin your personalized career roadmap.
            </h1>
            <p className="text-purple-200 text-xs leading-relaxed mb-6">
              Create your account, select your aspirational tech track, and let our intelligent engine guide your study milestones.
            </p>

            <div className="space-y-3 text-xs text-purple-100">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Targeted tracks: Java, Python, Web, Data, AI</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero backend server dependencies</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant voice coaching & interactive quizzes</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-purple-600/50 flex items-center gap-2 text-[11px] text-purple-200">
            <ShieldCheck className="w-4 h-4 text-purple-300 shrink-0" />
            <span>Encrypted local storage · Free forever for students</span>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Create your student profile
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tell us your target career to tailor your curriculum
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                  placeholder="e.g. Srilekha"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                  placeholder="srilekhanalini@gmail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Create Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                  placeholder="At least 6 characters"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Career Role
                </label>
                <select
                  value={targetCareer}
                  onChange={(e) => setTargetCareer(e.target.value as CareerRole)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                >
                  {careers.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors mt-2"
              >
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-bold text-purple-600 hover:text-purple-800 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
