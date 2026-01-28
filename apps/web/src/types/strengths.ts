// types/strengths.ts

export type StrengthCategory =
  | 'executing'
  | 'influencing'
  | 'relationship'
  | 'strategic';

export interface StrengthItem {
  id: string;
  name: string;
  icon: string;
  category: StrengthCategory;
  description: string;
}

export interface StrengthsData {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  topFive: string[];
}

// 優勢類別配置
export const STRENGTH_CATEGORIES: Record<
  StrengthCategory,
  { name: string; color: string; bgColor: string }
> = {
  executing: {
    name: '執行力',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  influencing: {
    name: '影響力',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  relationship: {
    name: '關係建立',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  strategic: {
    name: '策略思維',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
};

// 34 項優勢（基於蓋洛普優勢理論簡化版）
export const DEFAULT_STRENGTHS: StrengthItem[] = [
  // 執行力 (Executing)
  {
    id: 'achiever',
    name: '成就',
    icon: '🏅',
    category: 'executing',
    description: '有強烈的成就動力，每天結束時需要有具體成果',
  },
  {
    id: 'focus',
    name: '專注',
    icon: '🎯',
    category: 'executing',
    description: '能設定目標並堅持不懈地朝目標前進',
  },
  {
    id: 'discipline',
    name: '紀律',
    icon: '📋',
    category: 'executing',
    description: '喜歡結構化和秩序，善於建立例行程序',
  },
  {
    id: 'responsibility',
    name: '責任',
    icon: '🤝',
    category: 'executing',
    description: '對承諾的事情有強烈的責任感',
  },
  {
    id: 'deliberative',
    name: '審慎',
    icon: '🔍',
    category: 'executing',
    description: '做決定前會仔細考慮各種風險',
  },
  {
    id: 'consistency',
    name: '公正',
    icon: '⚖️',
    category: 'executing',
    description: '重視公平對待每個人',
  },
  {
    id: 'arranger',
    name: '統籌',
    icon: '🧩',
    category: 'executing',
    description: '善於組織和協調複雜的事務',
  },
  {
    id: 'restorative',
    name: '排難',
    icon: '🔧',
    category: 'executing',
    description: '擅長找出問題並解決它們',
  },

  // 影響力 (Influencing)
  {
    id: 'communication',
    name: '溝通',
    icon: '💬',
    category: 'influencing',
    description: '善於用語言表達想法，讓他人理解',
  },
  {
    id: 'competition',
    name: '競爭',
    icon: '🏆',
    category: 'influencing',
    description: '喜歡比較和競爭，追求第一',
  },
  {
    id: 'command',
    name: '統御',
    icon: '👑',
    category: 'influencing',
    description: '自然而然地承擔領導角色',
  },
  {
    id: 'activator',
    name: '行動',
    icon: '🚀',
    category: 'influencing',
    description: '渴望將想法付諸行動',
  },
  {
    id: 'maximizer',
    name: '完美',
    icon: '💎',
    category: 'influencing',
    description: '追求卓越，把好的變成最好的',
  },
  {
    id: 'significance',
    name: '追求',
    icon: '⭐',
    category: 'influencing',
    description: '渴望被認可，做有意義的事',
  },
  {
    id: 'selfassurance',
    name: '自信',
    icon: '💪',
    category: 'influencing',
    description: '對自己的能力和判斷有信心',
  },
  {
    id: 'woo',
    name: '取悅',
    icon: '🌟',
    category: 'influencing',
    description: '喜歡認識新朋友，贏得他人好感',
  },

  // 關係建立 (Relationship Building)
  {
    id: 'empathy',
    name: '體諒',
    icon: '💖',
    category: 'relationship',
    description: '能感受他人的情緒和想法',
  },
  {
    id: 'harmony',
    name: '和諧',
    icon: '🕊️',
    category: 'relationship',
    description: '尋求共識，避免衝突',
  },
  {
    id: 'includer',
    name: '包容',
    icon: '🤗',
    category: 'relationship',
    description: '接納每個人，讓大家都有歸屬感',
  },
  {
    id: 'individualization',
    name: '個別',
    icon: '🔬',
    category: 'relationship',
    description: '關注每個人的獨特性',
  },
  {
    id: 'developer',
    name: '伯樂',
    icon: '🌱',
    category: 'relationship',
    description: '喜歡幫助他人成長和發展',
  },
  {
    id: 'connectedness',
    name: '關聯',
    icon: '🔗',
    category: 'relationship',
    description: '相信萬物相連，一切都有意義',
  },
  {
    id: 'positivity',
    name: '積極',
    icon: '☀️',
    category: 'relationship',
    description: '熱情樂觀，能感染他人',
  },
  {
    id: 'relator',
    name: '交往',
    icon: '❤️',
    category: 'relationship',
    description: '珍視深厚的友誼關係',
  },
  {
    id: 'adaptability',
    name: '適應',
    icon: '🌊',
    category: 'relationship',
    description: '能隨機應變，活在當下',
  },

  // 策略思維 (Strategic Thinking)
  {
    id: 'analytical',
    name: '分析',
    icon: '📊',
    category: 'strategic',
    description: '尋求數據和證據來支持觀點',
  },
  {
    id: 'context',
    name: '回顧',
    icon: '📜',
    category: 'strategic',
    description: '透過了解過去來理解現在',
  },
  {
    id: 'futuristic',
    name: '前瞻',
    icon: '🔮',
    category: 'strategic',
    description: '對未來充滿想像和期待',
  },
  {
    id: 'ideation',
    name: '理念',
    icon: '💡',
    category: 'strategic',
    description: '喜歡想出新點子和概念',
  },
  {
    id: 'input',
    name: '蒐集',
    icon: '📚',
    category: 'strategic',
    description: '喜歡收集各種資訊和知識',
  },
  {
    id: 'intellection',
    name: '思維',
    icon: '🧠',
    category: 'strategic',
    description: '喜歡獨處思考，進行深度反思',
  },
  {
    id: 'learner',
    name: '學習',
    icon: '📖',
    category: 'strategic',
    description: '熱愛學習新事物的過程',
  },
  {
    id: 'strategic',
    name: '戰略',
    icon: '♟️',
    category: 'strategic',
    description: '能看到多種可能性並選擇最佳路徑',
  },
];
