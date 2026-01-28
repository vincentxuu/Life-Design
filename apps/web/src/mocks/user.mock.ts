// mocks/user.mock.ts
import type { User, UserProfile, UserStats } from '@/types';

export const mockUser: User = {
  id: 'user-001',
  email: 'xiaoming@email.com',
  name: '小明',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoming',
  createdAt: '2026-01-01T00:00:00.000Z',
  onboardingCompleted: true,
  goal: 'career_change',
  preferences: {
    language: 'zh-TW',
    theme: 'system',
    notifications: {
      habitReminder: true,
      reflectionReminder: true,
      weeklyReview: true,
    },
  },
};

export const mockUserStats: UserStats = {
  totalHabits: 5,
  totalReflections: 28,
  longestStreak: 21,
  currentStreak: 15,
  badgesEarned: 4,
};

export const mockUserProfile: UserProfile = {
  userId: 'user-001',
  displayName: '小明',
  bio: '正在探索人生的更多可能性',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoming',
  joinedAt: '2026-01-01T00:00:00.000Z',
  stats: mockUserStats,
};

// 新用戶（未完成 onboarding）
export const mockNewUser: User = {
  id: 'user-002',
  email: 'newuser@email.com',
  name: '新用戶',
  createdAt: '2026-01-28T00:00:00.000Z',
  onboardingCompleted: false,
  goal: 'growth',
  preferences: {
    language: 'zh-TW',
    theme: 'system',
    notifications: {
      habitReminder: true,
      reflectionReminder: true,
      weeklyReview: false,
    },
  },
};
