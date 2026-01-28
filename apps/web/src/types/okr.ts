// types/okr.ts

export type OKRPeriod = 'quarterly' | 'yearly';
export type OKRStatus = 'active' | 'completed' | 'archived';
export type KeyResultStatus = 'not_started' | 'in_progress' | 'completed' | 'at_risk';

export interface KeyResult {
  id: string;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  status: KeyResultStatus;
}

export interface Objective {
  id: string;
  title: string;
  description?: string;
  icon: string;
  keyResults: KeyResult[];
  status: OKRStatus;
  startDate: string;
  endDate: string;
  period: OKRPeriod;
}

export interface OKRData {
  id: string;
  userId: string;
  objectives: Objective[];
  createdAt: string;
  updatedAt: string;
}

// 計算 Key Result 進度百分比
export function calculateKRProgress(kr: KeyResult): number {
  if (kr.targetValue === 0) return 0;
  return Math.min(Math.round((kr.currentValue / kr.targetValue) * 100), 100);
}

// 計算 Objective 整體進度
export function calculateObjectiveProgress(objective: Objective): number {
  if (objective.keyResults.length === 0) return 0;
  const total = objective.keyResults.reduce(
    (sum, kr) => sum + calculateKRProgress(kr),
    0
  );
  return Math.round(total / objective.keyResults.length);
}

// Key Result 狀態配置
export const KR_STATUS_CONFIG: Record<
  KeyResultStatus,
  { label: string; color: string; bgColor: string }
> = {
  not_started: {
    label: '未開始',
    color: 'text-basic-400',
    bgColor: 'bg-basic-100',
  },
  in_progress: {
    label: '進行中',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  completed: {
    label: '已完成',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  at_risk: {
    label: '有風險',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
};

// 預設目標圖標
export const OBJECTIVE_ICONS = [
  { id: 'career', icon: '💼', label: '事業' },
  { id: 'health', icon: '💪', label: '健康' },
  { id: 'learning', icon: '📚', label: '學習' },
  { id: 'relationships', icon: '❤️', label: '關係' },
  { id: 'finance', icon: '💰', label: '財務' },
  { id: 'creativity', icon: '🎨', label: '創意' },
  { id: 'travel', icon: '✈️', label: '旅行' },
  { id: 'mindfulness', icon: '🧘', label: '心靈' },
];
