// mocks/blueprint.mock.ts
import type { Blueprint, BlueprintVersion } from '@/types';

export const mockBlueprint: Blueprint = {
  id: 'blueprint-001',
  userId: 'user-001',
  createdAt: '2026-01-10T00:00:00.000Z',
  updatedAt: '2026-01-25T00:00:00.000Z',
  versions: {
    a: {
      title: '成為資深軟體工程師',
      description: '持續在科技業深耕，累積技術深度，在現有公司或大型科技公司晉升為技術主管或架構師。',
      resources: {
        money: 80,
        time: 60,
        skills: 50,
        network: 30,
      },
      confidence: 8,
      milestones: [
        {
          id: 'a-1',
          title: '取得 AWS 專業認證',
          deadline: { type: 'relative', value: 6, unit: 'month' },
          completed: false,
        },
        {
          id: 'a-2',
          title: '主導一個大型專案',
          deadline: { type: 'relative', value: 1, unit: 'year' },
          completed: false,
        },
        {
          id: 'a-3',
          title: '晉升為 Tech Lead',
          deadline: { type: 'relative', value: 2, unit: 'year' },
          completed: false,
        },
        {
          id: 'a-4',
          title: '建立技術團隊',
          deadline: { type: 'relative', value: 3, unit: 'year' },
          completed: false,
        },
        {
          id: 'a-5',
          title: '成為技術架構師',
          deadline: { type: 'relative', value: 5, unit: 'year' },
          completed: false,
        },
      ],
    },
    b: {
      title: '創業 - 教育科技新創',
      description: '結合技術背景與教育熱忱，創建一個幫助人們學習技術技能的平台。',
      resources: {
        money: 90,
        time: 95,
        skills: 70,
        network: 80,
      },
      confidence: 5,
      milestones: [
        {
          id: 'b-1',
          title: '完成商業計畫書',
          deadline: { type: 'relative', value: 3, unit: 'month' },
          completed: false,
        },
        {
          id: 'b-2',
          title: '建立 MVP 產品',
          deadline: { type: 'relative', value: 6, unit: 'month' },
          completed: false,
        },
        {
          id: 'b-3',
          title: '獲得第一批用戶',
          deadline: { type: 'relative', value: 1, unit: 'year' },
          completed: false,
        },
        {
          id: 'b-4',
          title: '種子輪募資',
          deadline: { type: 'relative', value: 2, unit: 'year' },
          completed: false,
        },
        {
          id: 'b-5',
          title: '達成損益平衡',
          deadline: { type: 'relative', value: 3, unit: 'year' },
          completed: false,
        },
      ],
    },
    c: {
      title: '數位遊牧 - 自由內容創作者',
      description: '成為獨立內容創作者，透過部落格、YouTube 和線上課程分享知識，邊旅行邊工作。',
      resources: {
        money: 40,
        time: 50,
        skills: 60,
        network: 70,
      },
      confidence: 6,
      milestones: [
        {
          id: 'c-1',
          title: '建立個人品牌網站',
          deadline: { type: 'relative', value: 2, unit: 'month' },
          completed: true,
        },
        {
          id: 'c-2',
          title: 'YouTube 達到 1000 訂閱',
          deadline: { type: 'relative', value: 6, unit: 'month' },
          completed: false,
        },
        {
          id: 'c-3',
          title: '發布第一門線上課程',
          deadline: { type: 'relative', value: 1, unit: 'year' },
          completed: false,
        },
        {
          id: 'c-4',
          title: '被動收入達到生活費 50%',
          deadline: { type: 'relative', value: 2, unit: 'year' },
          completed: false,
        },
        {
          id: 'c-5',
          title: '全職自由工作者',
          deadline: { type: 'relative', value: 3, unit: 'year' },
          completed: false,
        },
      ],
    },
  },
};

// 空白藍圖版本
export const emptyBlueprintVersion: BlueprintVersion = {
  title: '',
  description: '',
  resources: {
    money: 50,
    time: 50,
    skills: 50,
    network: 50,
  },
  confidence: 5,
  milestones: [],
};

// 空白藍圖
export const emptyBlueprint: Omit<Blueprint, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
  versions: {
    a: { ...emptyBlueprintVersion },
    b: { ...emptyBlueprintVersion },
    c: { ...emptyBlueprintVersion },
  },
};
