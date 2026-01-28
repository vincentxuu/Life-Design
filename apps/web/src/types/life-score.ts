// types/life-score.ts

export interface LifeDimension {
  id: string;
  name: string;
  icon: string;
  score: number; // 1-10
  description: string;
}

export interface LifeScoreData {
  id: string;
  userId: string;
  dimensions: LifeDimension[];
  createdAt: string;
  updatedAt: string;
}

export const LIFE_DIMENSIONS: Omit<LifeDimension, 'score'>[] = [
  { id: 'career', name: '事業', icon: '💼', description: '工作成就與職涯發展' },
  { id: 'health', name: '健康', icon: '💪', description: '身體健康與體能狀態' },
  { id: 'finance', name: '財務', icon: '💰', description: '經濟狀況與財務安全' },
  { id: 'relationships', name: '關係', icon: '❤️', description: '家庭、友誼與社交' },
  { id: 'learning', name: '學習', icon: '📚', description: '知識成長與技能提升' },
  { id: 'fun', name: '娛樂', icon: '🎮', description: '休閒活動與興趣愛好' },
  { id: 'environment', name: '環境', icon: '🏠', description: '居住環境與生活品質' },
  { id: 'spirituality', name: '心靈', icon: '🧘', description: '內在平靜與意義感' },
];
