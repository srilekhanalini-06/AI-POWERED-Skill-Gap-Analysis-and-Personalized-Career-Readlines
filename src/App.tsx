import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { NotificationsModal } from './components/NotificationsModal';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { DashboardView } from './views/DashboardView';
import { ResumeAnalysisView } from './views/ResumeAnalysisView';
import { SkillGapView } from './views/SkillGapView';
import { RoadmapView } from './views/RoadmapView';
import { StudyPlannerView } from './views/StudyPlannerView';
import { FocusModeView } from './views/FocusModeView';
import { ReportsView } from './views/ReportsView';
import { Menu } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, activeView } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [voiceSettingsOpen, setVoiceSettingsOpen] = useState(false);

  // If user is not logged in, render authentication screens
  if (!user) {
    if (authMode === 'register') {
      return <RegisterView onSwitchToLogin={() => setAuthMode('login')} />;
    }
    return <LoginView onSwitchToRegister={() => setAuthMode('register')} />;
  }

  // Render appropriate authenticated view
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'resume':
        return <ResumeAnalysisView />;
      case 'gap-analysis':
        return <SkillGapView />;
      case 'roadmap':
        return <RoadmapView />;
      case 'planner':
        return <StudyPlannerView />;
      case 'focus':
        return <FocusModeView />;
      case 'reports':
        return <ReportsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenVoiceSettings={() => setVoiceSettingsOpen(true)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Responsive Sidebar */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Mobile Hamburger Trigger */}
            <div className="flex items-center justify-between pb-3 lg:hidden border-b border-purple-100">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-2xs"
              >
                <Menu className="w-4 h-4 text-purple-600" />
                <span>Open Navigation</span>
              </button>
              <span className="text-xs font-semibold text-purple-700 capitalize">
                {activeView.replace('-', ' ')}
              </span>
            </div>

            {/* Dynamic View Component */}
            {renderView()}
          </div>
        </main>
      </div>

      {/* Modals & Overlays */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <VoiceSettingsModal
        isOpen={voiceSettingsOpen}
        onClose={() => setVoiceSettingsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
