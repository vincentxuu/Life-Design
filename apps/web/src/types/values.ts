// types/values.ts

export interface ValuesData {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  topFive: string[];
  allValues: ValueItem[];
}

export interface ValueItem {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
  rank?: number;
}

// 預設價值觀清單
export const DEFAULT_VALUES: Omit<ValueItem, 'selected' | 'rank'>[] = [
  { id: '1', name: '家庭', icon: '👨‍👩‍👧‍👦' },
  { id: '2', name: '自由', icon: '🦅' },
  { id: '3', name: '成長', icon: '🌱' },
  { id: '4', name: '健康', icon: '💪' },
  { id: '5', name: '創意', icon: '🎨' },
  { id: '6', name: '財富', icon: '💰' },
  { id: '7', name: '冒險', icon: '🏔' },
  { id: '8', name: '安全', icon: '🛡' },
  { id: '9', name: '愛情', icon: '❤️' },
  { id: '10', name: '智慧', icon: '📚' },
  { id: '11', name: '影響', icon: '🌟' },
  { id: '12', name: '平靜', icon: '🧘' },
  { id: '13', name: '成就', icon: '🏆' },
  { id: '14', name: '友誼', icon: '🤝' },
  { id: '15', name: '正義', icon: '⚖️' },
  { id: '16', name: '美感', icon: '✨' },
];
