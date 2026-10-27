import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  CareerRole,
  UserProfile,
  ExtractedSkill,
  FocusSession,
  NotificationItem,
  DaySchedule,
  QuizScoreRecord,
} from '../types';
import { CAREER_REQUIREMENTS, SKILL_DICTIONARY } from '../data/skillDictionary';
import { ALL_DISTRACTING_APPS } from '../data/distractingApps';
import { analyzeResumeSkills } from '../services/resumeParser';
import { voiceService } from '../services/voiceService';
import { audioService } from '../services/audioService';

interface AppContextType {
  // Auth
  user: UserProfile | null;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, pass: string, career: CareerRole) => boolean;
  demoLogin: (role?: CareerRole) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;

  // Navigation
  activeView: string;
  setActiveView: (view: string) => void;

  // Career & Skills
  targetCareer: CareerRole;
  setTargetCareer: (career: CareerRole) => void;
  extractedSkills: ExtractedSkill[];
  confirmedSkills: ExtractedSkill[];
  toggleSkillConfirmation: (name: string) => void;
  addCustomSkill: (name: string, category?: string) => void;
  removeSkill: (name: string) => void;
  processResumeText: (text: string) => void;
  quickVerifySkill: (skillName: string, known: boolean) => void;

  // Learning Roadmap
  completedTopicIds: string[];
  toggleTopicCompletion: (topicId: string, topicTitle?: string) => void;
  quizScores: Record<string, QuizScoreRecord>;
  recordQuizScore: (topicId: string, score: number, total: number) => void;

  // Study Planner
  dailyGoalMinutes: number;
  setDailyGoalMinutes: (mins: number) => void;
  weeklySchedule: DaySchedule[];
  updateDaySchedule: (day: string, targetMinutes: number, plannedTopics: string[]) => void;

  // Focus Mode
  focusTimeLeft: number;
  isFocusRunning: boolean;
  focusSessionDuration: number;
  completedFocusSessions: FocusSession[];
  selectedDistractingApps: string[];
  isAllAppsBlocked: boolean;
  startFocusTimer: () => void;
  pauseFocusTimer: () => void;
  resetFocusTimer: (newDurationSec?: number) => void;
  toggleDistractingApp: (app: string) => void;
  blockAllDistractingApps: () => void;
  unblockAllDistractingApps: () => void;
  todayStudiedMinutes: number;

  // Voice Encouragement
  voiceEnabled: boolean;
  toggleVoice: () => void;
  triggerVoiceEncouragement: (customText?: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_SCHEDULE: DaySchedule[] = [
  { day: 'Monday', targetMinutes: 60, plannedTopics: ['HTML5 Semantic Structure & Accessibility', 'Modern JavaScript (ES6+)'] },
  { day: 'Tuesday', targetMinutes: 60, plannedTopics: ['CSS3 Layouts, Flexbox, Grid & Modern Styling'] },
  { day: 'Wednesday', targetMinutes: 60, plannedTopics: ['React 19 Architecture, Hooks & Component State'] },
  { day: 'Thursday', targetMinutes: 90, plannedTopics: ['Interactive Mini-Quiz Review', 'Git Version Control'] },
  { day: 'Friday', targetMinutes: 60, plannedTopics: ['Practical Project Implementation'] },
  { day: 'Saturday', targetMinutes: 120, plannedTopics: ['Deep Work Project Sprint'] },
  { day: 'Sunday', targetMinutes: 30, plannedTopics: ['Weekly Skill Gap & Progress Review'] },
];

const INITIAL_SKILLS: ExtractedSkill[] = [
  { name: 'JavaScript', category: 'Programming Languages', confirmed: true, confidence: 96, extractedFromResume: true, sourceContext: 'Developed interactive frontends in modern JavaScript ES6+' },
  { name: 'HTML5', category: 'Programming Languages', confirmed: true, confidence: 98, extractedFromResume: true, sourceContext: 'Semantic HTML markup and web forms' },
  { name: 'CSS3', category: 'Programming Languages', confirmed: true, confidence: 92, extractedFromResume: true, sourceContext: 'Responsive styling using Flexbox and Grid' },
  { name: 'React', category: 'Frameworks & Libraries', confirmed: true, confidence: 90, extractedFromResume: true, sourceContext: 'Single-page applications using functional components' },
  { name: 'Git', category: 'Developer Tools & Cloud', confirmed: true, confidence: 88, extractedFromResume: true, sourceContext: 'Version control and branch management on GitHub' },
  { name: 'RESTful APIs', category: 'Core Concepts & Methods', confirmed: true, confidence: 85, extractedFromResume: true, sourceContext: 'Integration with third-party backend endpoints' },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial User
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('career_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name === 'Alex Rivera') {
          parsed.name = 'Srilekha';
          parsed.email = 'srilekhanalini@gmail.com';
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    // Default demo user for instant smooth experience
    return {
      id: 'usr_demo_101',
      name: 'Srilekha',
      email: 'srilekhanalini@gmail.com',
      targetCareer: 'Web Developer',
      avatarUrl: '/src/assets/images/student_avatar_1793108204484.jpg',
      joinedDate: 'October 2026',
      dailyGoalMinutes: 60,
      streakDays: 4,
    };
  });

  const [activeView, setActiveView] = useState<string>('dashboard');
  const [targetCareer, setTargetCareerState] = useState<CareerRole>(() => user?.targetCareer || 'Web Developer');

  // Skills
  const [extractedSkills, setExtractedSkills] = useState<ExtractedSkill[]>(() => {
    try {
      const stored = localStorage.getItem('career_skills');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_SKILLS;
  });

  // Completed Topics
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('career_completed_topics');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return ['web-html-foundations'];
  });

  // Quiz Scores
  const [quizScores, setQuizScores] = useState<Record<string, QuizScoreRecord>>(() => {
    try {
      const stored = localStorage.getItem('career_quiz_scores');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return {
      'web-html-foundations': { topicId: 'web-html-foundations', score: 3, totalQuestions: 3, date: 'Yesterday' },
    };
  });

  // Planner
  const [dailyGoalMinutes, setDailyGoalMinutesState] = useState<number>(() => user?.dailyGoalMinutes || 60);
  const [weeklySchedule, setWeeklySchedule] = useState<DaySchedule[]>(() => {
    try {
      const stored = localStorage.getItem('career_weekly_schedule');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return DEFAULT_SCHEDULE;
  });

  // Focus Timer
  const [focusSessionDuration, setFocusSessionDuration] = useState<number>(25 * 60);
  const [focusTimeLeft, setFocusTimeLeft] = useState<number>(25 * 60);
  const [isFocusRunning, setIsFocusRunning] = useState<boolean>(false);
  const [completedFocusSessions, setCompletedFocusSessions] = useState<FocusSession[]>(() => {
    try {
      const stored = localStorage.getItem('career_focus_sessions');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      { id: 'f-1', timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), durationMinutes: 25, completed: true, topicTitle: 'Modern JavaScript ES6+' },
      { id: 'f-2', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), durationMinutes: 25, completed: true, topicTitle: 'React Hooks & State' },
    ];
  });

  const [selectedDistractingApps, setSelectedDistractingApps] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('career_blocked_apps');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    // Block all distracting apps by default
    return ALL_DISTRACTING_APPS.map((a) => a.name);
  });

  // Voice
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => voiceService.isEnabled());

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const stored = localStorage.getItem('career_notifications');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      {
        id: 'n-1',
        title: 'Welcome to your Learning Path',
        message: 'Your Web Developer roadmap is initialized. 1 topic completed, 5 to go!',
        timestamp: '10 mins ago',
        read: false,
        type: 'achievement',
      },
      {
        id: 'n-2',
        title: 'Daily Streak Alert',
        message: '4-day study streak active! Finish a 25-minute focus session to hit 5 days.',
        timestamp: '2 hours ago',
        read: false,
        type: 'reminder',
      },
    ];
  });

  // Sync state to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('career_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('career_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('career_skills', JSON.stringify(extractedSkills));
  }, [extractedSkills]);

  useEffect(() => {
    localStorage.setItem('career_completed_topics', JSON.stringify(completedTopicIds));
  }, [completedTopicIds]);

  useEffect(() => {
    localStorage.setItem('career_quiz_scores', JSON.stringify(quizScores));
  }, [quizScores]);

  useEffect(() => {
    localStorage.setItem('career_weekly_schedule', JSON.stringify(weeklySchedule));
  }, [weeklySchedule]);

  useEffect(() => {
    localStorage.setItem('career_focus_sessions', JSON.stringify(completedFocusSessions));
  }, [completedFocusSessions]);

  useEffect(() => {
    localStorage.setItem('career_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('career_blocked_apps', JSON.stringify(selectedDistractingApps));
  }, [selectedDistractingApps]);

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isFocusRunning && focusTimeLeft > 0) {
      interval = setInterval(() => {
        setFocusTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isFocusRunning && focusTimeLeft === 0) {
      // Timer finished!
      setIsFocusRunning(false);
      audioService.playCompletionChime();
      const sessionMins = Math.round(focusSessionDuration / 60);

      const newSession: FocusSession = {
        id: `sess_${Date.now()}`,
        timestamp: new Date().toISOString(),
        durationMinutes: sessionMins,
        completed: true,
        topicTitle: 'Focused Study Sprint',
      };

      setCompletedFocusSessions((prev) => [newSession, ...prev]);

      addNotification({
        title: 'Focus Sprint Completed!',
        message: `Outstanding focus! You logged ${sessionMins} uninterrupted study minutes.`,
        type: 'achievement',
      });

      if (voiceEnabled) {
        voiceService.speak(
          `Excellent job, ${user?.name || 'student'}! You completed your ${sessionMins}-minute focus session without distractions.`
        );
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFocusRunning, focusTimeLeft, focusSessionDuration, voiceEnabled, user]);

  // Helpers
  const addNotification = useCallback((item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newItem: NotificationItem = {
      ...item,
      id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newItem, ...prev]);
  }, []);

  const setTargetCareer = useCallback((role: CareerRole) => {
    setTargetCareerState(role);
    setUser((prev) => (prev ? { ...prev, targetCareer: role } : null));
    addNotification({
      title: 'Target Career Updated',
      message: `Your learning goals and skill gap benchmarks are now calibrated for ${role}.`,
      type: 'milestone',
    });
  }, [addNotification]);

  const setDailyGoalMinutes = useCallback((mins: number) => {
    setDailyGoalMinutesState(mins);
    setUser((prev) => (prev ? { ...prev, dailyGoalMinutes: mins } : null));
  }, []);

  const login = useCallback((email: string, _pass: string): boolean => {
    const defaultUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Student Scholar',
      email,
      targetCareer: targetCareer || 'Web Developer',
      avatarUrl: '/src/assets/images/student_avatar_1793108204484.jpg',
      joinedDate: 'October 2026',
      dailyGoalMinutes: 60,
      streakDays: 3,
    };
    setUser(defaultUser);
    voiceService.speak(`Welcome back, ${defaultUser.name}! Let's build your career readiness today.`);
    return true;
  }, [targetCareer]);

  const register = useCallback((name: string, email: string, _pass: string, career: CareerRole): boolean => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name.trim() || 'New Scholar',
      email,
      targetCareer: career,
      avatarUrl: '/src/assets/images/student_avatar_1793108204484.jpg',
      joinedDate: 'Today',
      dailyGoalMinutes: 60,
      streakDays: 1,
    };
    setUser(newUser);
    setTargetCareerState(career);
    voiceService.speak(`Welcome to your personalized learning platform, ${newUser.name}. Your journey to becoming a ${career} starts now!`);
    return true;
  }, []);

  const demoLogin = useCallback((role: CareerRole = 'Web Developer') => {
    const demoUser: UserProfile = {
      id: 'usr_demo_101',
      name: 'Srilekha',
      email: 'srilekhanalini@gmail.com',
      targetCareer: role,
      avatarUrl: '/src/assets/images/student_avatar_1793108204484.jpg',
      joinedDate: 'October 2026',
      dailyGoalMinutes: 60,
      streakDays: 4,
    };
    setUser(demoUser);
    setTargetCareerState(role);
    voiceService.speak(`Welcome back, Srilekha! Today's goal is 60 minutes towards your ${role} path.`);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setActiveView('login');
  }, []);

  const updateUser = useCallback((updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  // Skill Operations
  const confirmedSkills = useMemo(() => {
    return extractedSkills.filter((s) => s.confirmed);
  }, [extractedSkills]);

  const toggleSkillConfirmation = useCallback((name: string) => {
    setExtractedSkills((prev) =>
      prev.map((s) => (s.name.toLowerCase() === name.toLowerCase() ? { ...s, confirmed: !s.confirmed } : s))
    );
  }, []);

  const addCustomSkill = useCallback((name: string, category?: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setExtractedSkills((prev) => {
      const exists = prev.some((s) => s.name.toLowerCase() === trimmed.toLowerCase());
      if (exists) {
        return prev.map((s) => (s.name.toLowerCase() === trimmed.toLowerCase() ? { ...s, confirmed: true } : s));
      }
      const matchedDict = SKILL_DICTIONARY.find((d) => d.name.toLowerCase() === trimmed.toLowerCase());
      return [
        ...prev,
        {
          name: matchedDict ? matchedDict.name : trimmed,
          category: (matchedDict?.category || category || 'Programming Languages') as ExtractedSkill['category'],
          confirmed: true,
          confidence: 100,
          extractedFromResume: false,
          sourceContext: 'Self-confirmed by student',
        },
      ];
    });
  }, []);

  const removeSkill = useCallback((name: string) => {
    setExtractedSkills((prev) => prev.filter((s) => s.name.toLowerCase() !== name.toLowerCase()));
  }, []);

  const processResumeText = useCallback((text: string) => {
    const detected = analyzeResumeSkills(text);
    if (detected.length > 0) {
      setExtractedSkills((prev) => {
        // Merge without duplicating
        const merged = [...prev];
        for (const item of detected) {
          const index = merged.findIndex((m) => m.name.toLowerCase() === item.name.toLowerCase());
          if (index >= 0) {
            merged[index] = { ...merged[index], ...item, confirmed: true };
          } else {
            merged.push(item);
          }
        }
        return merged;
      });

      addNotification({
        title: 'Resume Analyzed Successfully',
        message: `Detected ${detected.length} technical skills matching industry standards. Review and confirm them now.`,
        type: 'achievement',
      });

      if (voiceEnabled) {
        voiceService.speak(`Resume analyzed! We identified ${detected.length} technical skills in your document.`);
      }
    }
  }, [addNotification, voiceEnabled]);

  // "Never assume an absent resume skill means the student does not know it"
  const quickVerifySkill = useCallback((skillName: string, known: boolean) => {
    if (known) {
      addCustomSkill(skillName);
    } else {
      setExtractedSkills((prev) =>
        prev.map((s) => (s.name.toLowerCase() === skillName.toLowerCase() ? { ...s, confirmed: false } : s))
      );
    }
  }, [addCustomSkill]);

  // Roadmap & Quizzes
  const toggleTopicCompletion = useCallback(
    (topicId: string, topicTitle?: string) => {
      setCompletedTopicIds((prev) => {
        const isCompleted = prev.includes(topicId);
        if (isCompleted) {
          return prev.filter((id) => id !== topicId);
        } else {
          audioService.playStartChime();
          addNotification({
            title: 'Learning Milestone Reached',
            message: `Topic completed: "${topicTitle || topicId}". Great progress!`,
            type: 'milestone',
          });
          if (voiceEnabled) {
            voiceService.speak(`Great job completing ${topicTitle || 'this topic'}! Keep building your momentum.`);
          }
          return [...prev, topicId];
        }
      });
    },
    [addNotification, voiceEnabled]
  );

  const recordQuizScore = useCallback((topicId: string, score: number, total: number) => {
    setQuizScores((prev) => ({
      ...prev,
      [topicId]: {
        topicId,
        score,
        totalQuestions: total,
        date: 'Today',
      },
    }));
    audioService.playCompletionChime();
    if (voiceEnabled) {
      if (score === total) {
        voiceService.speak(`Flawless score! ${score} out of ${total} on the knowledge assessment.`);
      } else {
        voiceService.speak(`Assessment recorded: you scored ${score} out of ${total}.`);
      }
    }
  }, [voiceEnabled]);

  // Study Planner
  const updateDaySchedule = useCallback((day: string, targetMinutes: number, plannedTopics: string[]) => {
    setWeeklySchedule((prev) =>
      prev.map((d) => (d.day === day ? { ...d, targetMinutes, plannedTopics } : d))
    );
  }, []);

  // Focus Timer controls
  const startFocusTimer = useCallback(() => {
    setIsFocusRunning(true);
    audioService.playStartChime();
    if (voiceEnabled) {
      voiceService.speak('Focus mode activated. Avoid distractions and immerse in deep learning.');
    }
  }, [voiceEnabled]);

  const pauseFocusTimer = useCallback(() => {
    setIsFocusRunning(false);
  }, []);

  const resetFocusTimer = useCallback((newDurationSec?: number) => {
    setIsFocusRunning(false);
    const duration = newDurationSec || focusSessionDuration;
    setFocusSessionDuration(duration);
    setFocusTimeLeft(duration);
  }, [focusSessionDuration]);

  const toggleDistractingApp = useCallback((app: string) => {
    setSelectedDistractingApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  }, []);

  const blockAllDistractingApps = useCallback(() => {
    const allNames = ALL_DISTRACTING_APPS.map((a) => a.name);
    setSelectedDistractingApps(allNames);
    audioService.playStartChime();
    addNotification({
      title: 'Strict Distraction Blocker Engaged',
      message: `All ${allNames.length} distracting apps and websites have been added to your focus blocklist. Zero interruptions pledge active!`,
      type: 'achievement',
    });
    if (voiceEnabled) {
      voiceService.speak('Strict focus mode engaged. All distracting applications are now blocked.');
    }
  }, [addNotification, voiceEnabled]);

  const unblockAllDistractingApps = useCallback(() => {
    setSelectedDistractingApps([]);
    addNotification({
      title: 'Distraction Blocklist Reset',
      message: 'All apps unblocked. You can customize which apps to block individually in Focus Mode.',
      type: 'reminder',
    });
  }, [addNotification]);

  const isAllAppsBlocked = useMemo(() => {
    return (
      ALL_DISTRACTING_APPS.length > 0 &&
      ALL_DISTRACTING_APPS.every((a) => selectedDistractingApps.includes(a.name))
    );
  }, [selectedDistractingApps]);

  // Calculate today's studied minutes
  const todayStudiedMinutes = useMemo(() => {
    const today = new Date().toDateString();
    return completedFocusSessions
      .filter((s) => new Date(s.timestamp).toDateString() === today)
      .reduce((acc, curr) => acc + curr.durationMinutes, 0);
  }, [completedFocusSessions]);

  // Voice toggle & trigger
  const toggleVoice = useCallback(() => {
    const nextVal = !voiceEnabled;
    setVoiceEnabled(nextVal);
    voiceService.setEnabled(nextVal);
  }, [voiceEnabled]);

  const triggerVoiceEncouragement = useCallback((customText?: string) => {
    const defaultEncouragements = [
      `Keep going, ${user?.name || 'Srilekha'}! Every focused study block bridges the gap to your dream role as a ${targetCareer}.`,
      `Consistency beats intensity. You have logged ${todayStudiedMinutes} minutes today towards your ${dailyGoalMinutes}-minute target.`,
      `Remember, master developers are just beginners who never quit. Take pride in every concept you master!`,
    ];
    const phrase = customText || defaultEncouragements[Math.floor(Math.random() * defaultEncouragements.length)];
    voiceService.speak(phrase, true);
  }, [user, targetCareer, todayStudiedMinutes, dailyGoalMinutes]);

  // Notifications
  const unreadNotificationCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        register,
        demoLogin,
        logout,
        updateUser,
        activeView,
        setActiveView,
        targetCareer,
        setTargetCareer,
        extractedSkills,
        confirmedSkills,
        toggleSkillConfirmation,
        addCustomSkill,
        removeSkill,
        processResumeText,
        quickVerifySkill,
        completedTopicIds,
        toggleTopicCompletion,
        quizScores,
        recordQuizScore,
        dailyGoalMinutes,
        setDailyGoalMinutes,
        weeklySchedule,
        updateDaySchedule,
        focusTimeLeft,
        isFocusRunning,
        focusSessionDuration,
        completedFocusSessions,
        selectedDistractingApps,
        isAllAppsBlocked,
        startFocusTimer,
        pauseFocusTimer,
        resetFocusTimer,
        toggleDistractingApp,
        blockAllDistractingApps,
        unblockAllDistractingApps,
        todayStudiedMinutes,
        voiceEnabled,
        toggleVoice,
        triggerVoiceEncouragement,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
