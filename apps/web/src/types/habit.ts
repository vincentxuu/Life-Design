// types/habit.ts

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  trigger: string; // 觸發時機
  frequency: HabitFrequency;
  reminderTime?: string; // HH:mm
  streak: number;
  longestStreak: number;
  createdAt: string;
  archived: boolean;
}

export interface HabitFrequency {
  type: 'daily' | 'weekly' | 'custom';
  daysOfWeek?: number[]; // 0-6, for 'weekly' type
  customConfig?: CustomFrequencyConfig;
}

export interface CustomFrequencyConfig {
  unit: 'day' | 'week' | 'month';
  interval?: number;  // e.g., every 3 days
  datesOfMonth?: number[]; // e.g., [1, 15] for 1st and 15th
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  completedAt?: string;
  note?: string;
}

export interface HabitStats {
  habitId: string;
  totalDays: number;
  completedDays: number;
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
  weeklyData: WeeklyHabitData[];
}

export interface WeeklyHabitData {
  date: string;
  completed: boolean;
}

// 習慣觸發時機選項
export const HABIT_TRIGGERS = [
  '早上起床後',
  '早餐後',
  '午餐後',
  '晚餐後',
  '睡前',
  '工作開始前',
  '工作結束後',
  '運動前',
  '運動後',
  '自訂',
] as const;

export type HabitTrigger = (typeof HABIT_TRIGGERS)[number];
