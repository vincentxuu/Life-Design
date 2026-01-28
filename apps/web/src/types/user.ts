// types/user.ts

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  onboardingCompleted: boolean;
  goal: UserGoal;
  preferences: UserPreferences;
}

export type UserGoal = 'career_change' | 'graduation' | 'midlife' | 'growth';

export interface UserPreferences {
  language: 'zh-TW' | 'zh-CN' | 'en';
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  habitReminder: boolean;
  reflectionReminder: boolean;
  weeklyReview: boolean;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  joinedAt: string;
  stats: UserStats;
}

export interface UserStats {
  totalHabits: number;
  totalReflections: number;
  longestStreak: number;
  currentStreak: number;
  badgesEarned: number;
}
