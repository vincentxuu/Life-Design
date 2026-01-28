// mocks/habits.mock.ts
import type { Habit, HabitLog, HabitStats } from '@/types';

export const mockHabits: Habit[] = [
  {
    id: 'habit-001',
    userId: 'user-001',
    name: '冥想 5 分鐘',
    description: '每天早上起床後進行簡短的冥想練習',
    trigger: '早上起床後',
    frequency: { type: 'daily' },
    reminderTime: '07:00',
    streak: 15,
    longestStreak: 21,
    createdAt: '2026-01-01T00:00:00.000Z',
    archived: false,
  },
  {
    id: 'habit-002',
    userId: 'user-001',
    name: '閱讀 20 分鐘',
    description: '每天睡前閱讀至少 20 分鐘的書籍',
    trigger: '睡前',
    frequency: { type: 'daily' },
    reminderTime: '22:00',
    streak: 8,
    longestStreak: 14,
    createdAt: '2026-01-05T00:00:00.000Z',
    archived: false,
  },
  {
    id: 'habit-003',
    userId: 'user-001',
    name: '運動 30 分鐘',
    description: '每週一三五進行 30 分鐘的運動',
    trigger: '工作結束後',
    frequency: { type: 'weekly', daysOfWeek: [1, 3, 5] },
    reminderTime: '18:30',
    streak: 3,
    longestStreak: 8,
    createdAt: '2026-01-10T00:00:00.000Z',
    archived: false,
  },
  {
    id: 'habit-004',
    userId: 'user-001',
    name: '寫日記',
    description: '每天記錄當天的想法和感受',
    trigger: '睡前',
    frequency: { type: 'daily' },
    reminderTime: '21:30',
    streak: 12,
    longestStreak: 12,
    createdAt: '2026-01-16T00:00:00.000Z',
    archived: false,
  },
  {
    id: 'habit-005',
    userId: 'user-001',
    name: '學習新技術',
    description: '每週花時間學習新的技術知識',
    trigger: '週末早上',
    frequency: { type: 'weekly', daysOfWeek: [6, 0] },
    reminderTime: '10:00',
    streak: 4,
    longestStreak: 6,
    createdAt: '2026-01-08T00:00:00.000Z',
    archived: false,
  },
];

// 今日習慣日誌
export const mockTodayHabitLogs: HabitLog[] = [
  {
    id: 'log-001',
    habitId: 'habit-001',
    date: '2026-01-28',
    completed: true,
    completedAt: '2026-01-28T07:15:00.000Z',
  },
  {
    id: 'log-002',
    habitId: 'habit-002',
    date: '2026-01-28',
    completed: false,
  },
  {
    id: 'log-003',
    habitId: 'habit-004',
    date: '2026-01-28',
    completed: true,
    completedAt: '2026-01-28T21:45:00.000Z',
  },
];

// 習慣統計數據
export const mockHabitStats: HabitStats[] = [
  {
    habitId: 'habit-001',
    totalDays: 28,
    completedDays: 23,
    completionRate: 82,
    currentStreak: 15,
    longestStreak: 21,
    weeklyData: [
      { date: '2026-01-22', completed: true },
      { date: '2026-01-23', completed: true },
      { date: '2026-01-24', completed: true },
      { date: '2026-01-25', completed: true },
      { date: '2026-01-26', completed: true },
      { date: '2026-01-27', completed: true },
      { date: '2026-01-28', completed: true },
    ],
  },
  {
    habitId: 'habit-002',
    totalDays: 23,
    completedDays: 18,
    completionRate: 78,
    currentStreak: 8,
    longestStreak: 14,
    weeklyData: [
      { date: '2026-01-22', completed: true },
      { date: '2026-01-23', completed: true },
      { date: '2026-01-24', completed: false },
      { date: '2026-01-25', completed: true },
      { date: '2026-01-26', completed: true },
      { date: '2026-01-27', completed: true },
      { date: '2026-01-28', completed: false },
    ],
  },
];

// 週完成率資料（用於圖表）
export const mockWeeklyCompletionData = [
  { day: '週一', rate: 100 },
  { day: '週二', rate: 75 },
  { day: '週三', rate: 100 },
  { day: '週四', rate: 50 },
  { day: '週五', rate: 75 },
  { day: '週六', rate: 100 },
  { day: '週日', rate: 75 },
];
