import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CareerRole } from '../types';

interface LoginViewProps {
  onSwitchToRegister: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onSwitchToRegister }) => {
  const { login, demoLogin, setActiveView } = useApp();
  const [email, setEmail] = useState('srilekhanalini@gmail.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and password');
      return;
    }
    login(email, password);
    setActiveView('dashboard');
  };

  const handleDemo = (role: CareerRole) => {
    demoLogin(role);
    setActiveView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50/40 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Hero / Brand Column (Purple) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">CareerReady AI</span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight mb-3 leading-snug">
              Elevate your tech career with precision learning.
            </h1>
            <p className="text-purple-200 text-xs leading-relaxed mb-6">
              Extract verified skills from your resume, detect career gaps, and follow a personalized roadmap designed for real-world job readiness.
            </p>

            <div className="space-y-3 text-xs text-purple-100">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Resume skill parsing (PDF, DOCX, text)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Role-specific skill gap benchmarks</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Voice-assisted Pomodoro focus sprints</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Client-side privacy & persistence</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-purple-600/50 flex items-center gap-2 text-[11px] text-purple-200">
            <ShieldCheck className="w-4 h-4 text-purple-300 shrink-0" />
            <span>Secure local storage · No credit card required</span>
          </div>
        </div>

        {/* Right Form Column (White) */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Sign in to your account
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your credentials or test with one-click demo profiles
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {error}
              </div>
            )}

            {/* Quick Demo Login Cards */}
            <div className="mb-6">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Instant Demo Profiles (1-Click Login)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemo('Web Developer')}
                  className="p-2.5 text-left border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors group"
                >
                  <p className="text-xs font-bold text-purple-900 group-hover:text-purple-700">
                    Srilekha
                  </p>
                  <p className="text-[10px] text-slate-500">Web Developer</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemo('Java Developer')}
                  className="p-2.5 text-left border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors group"
                >
                  <p className="text-xs font-bold text-purple-900 group-hover:text-purple-700">
                    Jordan Chen
                  </p>
                  <p className="text-[10px] text-slate-500">Java Developer</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemo('Data Analyst')}
                  className="p-2.5 text-left border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors group"
                >
                  <p className="text-xs font-bold text-purple-900 group-hover:text-purple-700">
                    Sarah Patel
                  </p>
                  <p className="text-[10px] text-slate-500">Data Analyst</p>
                </button>
              </div>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[11px] text-slate-400 bg-white px-2">
                Or sign in with email
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                  placeholder="student@example.com"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <span className="text-[11px] text-purple-600 font-medium">Demo: password123</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Register Link */}
            <p className="mt-6 text-center text-xs text-slate-500">
              New to the platform?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-bold text-purple-600 hover:text-purple-800 transition-colors"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
