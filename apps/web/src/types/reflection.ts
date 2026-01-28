// types/reflection.ts

export interface Reflection {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  mood: MoodLevel;
  questions: ReflectionQuestions;
  gratitude: string[]; // 感恩清單 (最多3項)
  createdAt: string;
  updatedAt: string;
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5; // 1=very bad, 5=very good

export interface ReflectionQuestions {
  meaningful: string;  // 最有意義的事
  learned: string;     // 今天學到什麼
  improve: string;     // 想要改進什麼
}

export interface MoodTrend {
  date: string;
  mood: number;
}

// 心情對應的 emoji 和標籤
export const MOOD_CONFIG: Record<MoodLevel, { emoji: string; label: string }> = {
  5: { emoji: '😊', label: '很棒' },
  4: { emoji: '🙂', label: '不錯' },
  3: { emoji: '😐', label: '普通' },
  2: { emoji: '😟', label: '低落' },
  1: { emoji: '😢', label: '難過' },
};

// 反思歷史視圖
export interface ReflectionHistory {
  month: string; // YYYY-MM
  reflections: Reflection[];
  averageMood: number;
  totalDays: number;
}
