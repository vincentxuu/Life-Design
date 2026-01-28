// mocks/reflection.mock.ts
import type { Reflection, MoodTrend, ReflectionHistory } from '@/types';

export const mockReflections: Reflection[] = [
  {
    id: 'reflection-001',
    userId: 'user-001',
    date: '2026-01-28',
    mood: 4,
    questions: {
      meaningful: '今天在會議上成功提出了新想法，得到主管的認可。',
      learned: '學到了如何更有效地表達自己的觀點，用數據來支持論點。',
      improve: '明天想要更專注於深度工作，減少被瑣事打斷的時間。',
    },
    gratitude: ['今天的陽光很溫暖', '同事幫我解決了難題', '午餐很美味'],
    createdAt: '2026-01-28T21:30:00.000Z',
    updatedAt: '2026-01-28T21:30:00.000Z',
  },
  {
    id: 'reflection-002',
    userId: 'user-001',
    date: '2026-01-27',
    mood: 5,
    questions: {
      meaningful: '完成了一個重要的專案里程碑，團隊一起慶祝。',
      learned: '團隊合作的力量比個人努力更強大。',
      improve: '要記得定期與團隊成員溝通進度。',
    },
    gratitude: ['專案順利完成', '團隊的支持', '家人的鼓勵'],
    createdAt: '2026-01-27T22:00:00.000Z',
    updatedAt: '2026-01-27T22:00:00.000Z',
  },
  {
    id: 'reflection-003',
    userId: 'user-001',
    date: '2026-01-26',
    mood: 3,
    questions: {
      meaningful: '花時間陪伴家人，一起吃了頓晚餐。',
      learned: '工作再忙也要記得平衡生活。',
      improve: '要更好地管理工作時間，避免加班。',
    },
    gratitude: ['家人的陪伴', '美味的晚餐', '週末的休息時光'],
    createdAt: '2026-01-26T21:15:00.000Z',
    updatedAt: '2026-01-26T21:15:00.000Z',
  },
  {
    id: 'reflection-004',
    userId: 'user-001',
    date: '2026-01-25',
    mood: 2,
    questions: {
      meaningful: '雖然今天壓力很大，但還是堅持完成了任務。',
      learned: '在壓力下也能保持冷靜是很重要的技能。',
      improve: '需要學習更好的壓力管理方法。',
    },
    gratitude: ['堅持完成任務', '有咖啡提神', '晚上的運動幫助放鬆'],
    createdAt: '2026-01-25T22:30:00.000Z',
    updatedAt: '2026-01-25T22:30:00.000Z',
  },
  {
    id: 'reflection-005',
    userId: 'user-001',
    date: '2026-01-24',
    mood: 4,
    questions: {
      meaningful: '參加了一個很有收穫的線上研討會。',
      learned: '了解了最新的行業趨勢和技術發展。',
      improve: '要把學到的知識實際應用到工作中。',
    },
    gratitude: ['學習新知識的機會', '分享者的熱情', '記錄了很多筆記'],
    createdAt: '2026-01-24T21:00:00.000Z',
    updatedAt: '2026-01-24T21:00:00.000Z',
  },
];

// 心情趨勢數據（用於圖表）
export const mockMoodTrend: MoodTrend[] = [
  { date: '2026-01-22', mood: 4 },
  { date: '2026-01-23', mood: 3 },
  { date: '2026-01-24', mood: 4 },
  { date: '2026-01-25', mood: 2 },
  { date: '2026-01-26', mood: 3 },
  { date: '2026-01-27', mood: 5 },
  { date: '2026-01-28', mood: 4 },
];

// 今日反思（空白）
export const emptyTodayReflection: Omit<Reflection, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
  date: new Date().toISOString().split('T')[0],
  mood: 3,
  questions: {
    meaningful: '',
    learned: '',
    improve: '',
  },
  gratitude: [],
};

// 反思歷史（按月份）
export const mockReflectionHistory: ReflectionHistory = {
  month: '2026-01',
  reflections: mockReflections,
  averageMood: 3.6,
  totalDays: 28,
};
