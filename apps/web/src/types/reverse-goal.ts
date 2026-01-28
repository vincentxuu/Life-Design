// types/reverse-goal.ts

export interface ReverseGoalMilestone {
  id: string;
  title: string;
  timeframe: string;
  actions: string[];
}

export interface ReverseGoal {
  id: string;
  userId: string;
  idealEnd: string;
  timespan: '1year' | '3year' | '5year' | '10year';
  milestones: ReverseGoalMilestone[];
  createdAt: string;
  updatedAt: string;
}

export const TIMESPAN_OPTIONS = [
  { id: '1year' as const, label: '1 年後', years: 1 },
  { id: '3year' as const, label: '3 年後', years: 3 },
  { id: '5year' as const, label: '5 年後', years: 5 },
  { id: '10year' as const, label: '10 年後', years: 10 },
];
