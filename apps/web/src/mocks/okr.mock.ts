// mocks/okr.mock.ts

import { Objective, OKRData } from '@/types';

export const mockObjectives: Objective[] = [
  {
    id: '1',
    title: '提升專業技能',
    description: '持續學習和成長，成為領域專家',
    icon: '📚',
    status: 'active',
    period: 'quarterly',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    keyResults: [
      {
        id: '1-1',
        title: '完成線上課程',
        targetValue: 3,
        currentValue: 2,
        unit: '門',
        status: 'in_progress',
      },
      {
        id: '1-2',
        title: '閱讀專業書籍',
        targetValue: 5,
        currentValue: 3,
        unit: '本',
        status: 'in_progress',
      },
      {
        id: '1-3',
        title: '參加技術分享會',
        targetValue: 4,
        currentValue: 4,
        unit: '次',
        status: 'completed',
      },
    ],
  },
  {
    id: '2',
    title: '建立健康生活習慣',
    description: '透過規律運動和健康飲食提升身體素質',
    icon: '💪',
    status: 'active',
    period: 'quarterly',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    keyResults: [
      {
        id: '2-1',
        title: '每週運動',
        targetValue: 36,
        currentValue: 28,
        unit: '次',
        status: 'in_progress',
      },
      {
        id: '2-2',
        title: '減重',
        targetValue: 5,
        currentValue: 2,
        unit: '公斤',
        status: 'at_risk',
      },
      {
        id: '2-3',
        title: '早睡（11點前）',
        targetValue: 60,
        currentValue: 45,
        unit: '天',
        status: 'in_progress',
      },
    ],
  },
  {
    id: '3',
    title: '拓展人際網絡',
    description: '認識更多志同道合的朋友',
    icon: '🤝',
    status: 'active',
    period: 'quarterly',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    keyResults: [
      {
        id: '3-1',
        title: '參加社群活動',
        targetValue: 6,
        currentValue: 4,
        unit: '次',
        status: 'in_progress',
      },
      {
        id: '3-2',
        title: '一對一咖啡會談',
        targetValue: 8,
        currentValue: 5,
        unit: '次',
        status: 'in_progress',
      },
    ],
  },
];

export const mockOKRData: OKRData = {
  id: '1',
  userId: '1',
  objectives: mockObjectives,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-02-15T00:00:00Z',
};
