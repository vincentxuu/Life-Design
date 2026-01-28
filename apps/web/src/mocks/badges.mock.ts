// mocks/badges.mock.ts
import type { UserBadge } from '@/types';
import { BADGES } from '@/types';

// 用戶已獲得/進行中的徽章
export const mockUserBadges: UserBadge[] = [
  {
    badgeId: 'explorer',
    unlockedAt: '2026-01-20T00:00:00.000Z',
    progress: 100,
  },
  {
    badgeId: 'reflector',
    unlockedAt: '2026-01-16T00:00:00.000Z',
    progress: 100,
  },
  {
    badgeId: 'week_warrior',
    unlockedAt: '2026-01-08T00:00:00.000Z',
    progress: 100,
  },
  {
    badgeId: 'value_seeker',
    unlockedAt: '2026-01-12T00:00:00.000Z',
    progress: 100,
  },
  {
    badgeId: 'habit_starter',
    progress: 71, // 15/21 天
  },
  {
    badgeId: 'designer',
    progress: 60, // 藍圖進行中
  },
  {
    badgeId: 'reflection_master',
    progress: 17, // 5/30 天
  },
  {
    badgeId: 'habit_master',
    progress: 23, // 15/66 天
  },
];

// 獲取徽章詳情（結合徽章定義和用戶進度）
export const getUserBadgeDetails = (userBadges: UserBadge[]) => {
  return BADGES.map((badge) => {
    const userBadge = userBadges.find((ub) => ub.badgeId === badge.id);
    return {
      ...badge,
      progress: userBadge?.progress ?? 0,
      unlockedAt: userBadge?.unlockedAt,
      isUnlocked: (userBadge?.progress ?? 0) >= 100,
    };
  });
};

// 最近獲得的徽章
export const getRecentBadges = (userBadges: UserBadge[], limit = 3) => {
  return userBadges
    .filter((ub) => ub.unlockedAt)
    .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
    .slice(0, limit)
    .map((ub) => ({
      ...BADGES.find((b) => b.id === ub.badgeId)!,
      unlockedAt: ub.unlockedAt,
    }));
};

// 進行中的徽章
export const getInProgressBadges = (userBadges: UserBadge[], limit = 3) => {
  return userBadges
    .filter((ub) => !ub.unlockedAt && ub.progress > 0)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, limit)
    .map((ub) => ({
      ...BADGES.find((b) => b.id === ub.badgeId)!,
      progress: ub.progress,
    }));
};
