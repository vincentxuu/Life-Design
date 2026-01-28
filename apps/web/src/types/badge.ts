// types/badge.ts

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  requirement: BadgeRequirement;
  rarity: BadgeRarity;
}

export type BadgeCategory = 'explore' | 'habit' | 'reflect' | 'design' | 'milestone';
export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface BadgeRequirement {
  type: string;
  value: number;
}

export interface UserBadge {
  badgeId: string;
  unlockedAt?: string; // Optional: undefined when badge is in progress
  progress: number;    // 0-100, 100 means unlocked
}

// 預設徽章清單
export const BADGES: Badge[] = [
  {
    id: 'explorer',
    name: '探索者',
    description: '完成意義羅盤',
    icon: '🧭',
    category: 'explore',
    requirement: { type: 'compass_complete', value: 1 },
    rarity: 'common',
  },
  {
    id: 'reflector',
    name: '反思者',
    description: '完成首次每日反思',
    icon: '📝',
    category: 'reflect',
    requirement: { type: 'reflection_count', value: 1 },
    rarity: 'common',
  },
  {
    id: 'habit_starter',
    name: '習慣養成者',
    description: '連續打卡 21 天',
    icon: '🌱',
    category: 'habit',
    requirement: { type: 'streak', value: 21 },
    rarity: 'rare',
  },
  {
    id: 'designer',
    name: '設計師',
    description: '完成三軌人生藍圖',
    icon: '🎨',
    category: 'design',
    requirement: { type: 'blueprint_complete', value: 1 },
    rarity: 'common',
  },
  {
    id: 'life_designer',
    name: '人生設計師',
    description: '完成 7 天 Onboarding',
    icon: '🏆',
    category: 'milestone',
    requirement: { type: 'onboarding_complete', value: 1 },
    rarity: 'rare',
  },
  {
    id: 'habit_master',
    name: '習慣大師',
    description: '連續打卡 66 天',
    icon: '🔥',
    category: 'habit',
    requirement: { type: 'streak', value: 66 },
    rarity: 'epic',
  },
  {
    id: 'centurion',
    name: '百日達人',
    description: '連續打卡 100 天',
    icon: '💎',
    category: 'habit',
    requirement: { type: 'streak', value: 100 },
    rarity: 'legendary',
  },
  {
    id: 'value_seeker',
    name: '價值探尋者',
    description: '完成價值觀排序',
    icon: '💫',
    category: 'explore',
    requirement: { type: 'values_complete', value: 1 },
    rarity: 'common',
  },
  {
    id: 'week_warrior',
    name: '週間勇士',
    description: '連續打卡 7 天',
    icon: '⚡',
    category: 'habit',
    requirement: { type: 'streak', value: 7 },
    rarity: 'common',
  },
  {
    id: 'reflection_master',
    name: '反思大師',
    description: '完成 30 天反思',
    icon: '🌙',
    category: 'reflect',
    requirement: { type: 'reflection_count', value: 30 },
    rarity: 'rare',
  },
];

// 稀有度對應顏色
export const RARITY_COLORS: Record<BadgeRarity, string> = {
  common: '#9ca3af',
  rare: '#3b82f6',
  epic: '#a855f7',
  legendary: '#f59e0b',
};
