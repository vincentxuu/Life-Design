// mocks/values.mock.ts
import type { ValuesData, ValueItem } from '@/types';
import { DEFAULT_VALUES } from '@/types';

// 初始化所有價值觀（未選擇狀態）
export const initializeValues = (): ValueItem[] => {
  return DEFAULT_VALUES.map((value) => ({
    ...value,
    selected: false,
    rank: undefined,
  }));
};

// Mock 用戶已完成的價值觀排序
export const mockValuesData: ValuesData = {
  id: 'values-001',
  userId: 'user-001',
  createdAt: '2026-01-12T00:00:00.000Z',
  updatedAt: '2026-01-12T00:00:00.000Z',
  topFive: ['3', '1', '2', '4', '10'], // 成長, 家庭, 自由, 健康, 智慧
  allValues: [
    { id: '1', name: '家庭', icon: '👨‍👩‍👧‍👦', selected: true, rank: 2 },
    { id: '2', name: '自由', icon: '🦅', selected: true, rank: 3 },
    { id: '3', name: '成長', icon: '🌱', selected: true, rank: 1 },
    { id: '4', name: '健康', icon: '💪', selected: true, rank: 4 },
    { id: '5', name: '創意', icon: '🎨', selected: false },
    { id: '6', name: '財富', icon: '💰', selected: false },
    { id: '7', name: '冒險', icon: '🏔', selected: false },
    { id: '8', name: '安全', icon: '🛡', selected: false },
    { id: '9', name: '愛情', icon: '❤️', selected: false },
    { id: '10', name: '智慧', icon: '📚', selected: true, rank: 5 },
    { id: '11', name: '影響', icon: '🌟', selected: false },
    { id: '12', name: '平靜', icon: '🧘', selected: false },
    { id: '13', name: '成就', icon: '🏆', selected: false },
    { id: '14', name: '友誼', icon: '🤝', selected: false },
    { id: '15', name: '正義', icon: '⚖️', selected: false },
    { id: '16', name: '美感', icon: '✨', selected: false },
  ],
};

// 空白價值觀資料（新用戶）
export const emptyValuesData: Omit<ValuesData, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
  topFive: [],
  allValues: initializeValues(),
};
