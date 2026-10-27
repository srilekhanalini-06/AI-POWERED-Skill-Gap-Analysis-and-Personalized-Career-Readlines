export type CareerRole =
  | 'Java Developer'
  | 'Python Developer'
  | 'Web Developer'
  | 'Data Analyst'
  | 'AI Engineer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  targetCareer: CareerRole;
  avatarUrl: string;
  joinedDate: string;
  dailyGoalMinutes: number; // e.g., 60, 120
  streakDays: number;
}

export type SkillCategory =
  | 'Programming Languages'
  | 'Frameworks & Libraries'
  | 'Databases & Storage'
  | 'Developer Tools & Cloud'
  | 'Core Concepts & Methods';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  aliases: string[];
  description: string;
}

export interface ExtractedSkill {
  name: string;
  category: SkillCategory;
  confirmed: boolean;
  confidence: number; // 0-100%
  extractedFromResume: boolean;
  sourceContext?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface LearningTopic {
  id: string;
  title: string;
  category: string;
  careerRole: CareerRole;
  durationMinutes: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  keyConcepts: string[];
  codeSnippet?: {
    language: string;
    code: string;
    caption: string;
  };
  resources: {
    title: string;
    url: string;
    type: 'Documentation' | 'Tutorial' | 'Interactive Practice' | 'Video';
  }[];
  projectBrief: {
    title: string;
    description: string;
    deliverables: string[];
  };
  quiz: QuizQuestion[];
}

export interface FocusSession {
  id: string;
  timestamp: string;
  durationMinutes: number;
  completed: boolean;
  topicTitle?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'achievement' | 'reminder' | 'encouragement' | 'milestone';
}

export interface DaySchedule {
  day: string; // 'Monday', 'Tuesday', etc.
  targetMinutes: number;
  plannedTopics: string[];
}

export interface QuizScoreRecord {
  topicId: string;
  score: number;
  totalQuestions: number;
  date: string;
}
