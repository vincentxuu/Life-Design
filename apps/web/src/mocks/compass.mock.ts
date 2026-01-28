// mocks/compass.mock.ts
import type { CompassData, CompassQuestionConfig } from '@/types';

export const mockCompassData: CompassData = {
  id: 'compass-001',
  userId: 'user-001',
  createdAt: '2026-01-15T00:00:00.000Z',
  updatedAt: '2026-01-20T00:00:00.000Z',
  passion: {
    questions: [
      {
        id: 'passion-1',
        question: '如果不用擔心收入，你想花時間做什麼？',
        answer: '我想花時間創作內容、分享知識，幫助他人學習新技能。',
        hint: '想想小時候喜歡做的事',
      },
      {
        id: 'passion-2',
        question: '什麼活動能讓你完全忘記時間？',
        answer: '閱讀、寫作、與朋友深度對話，以及學習新事物。',
      },
      {
        id: 'passion-3',
        question: '哪些話題你可以聊一整天？',
        answer: '個人成長、科技趨勢、心理學、創業故事。',
      },
    ],
    keywords: ['創作', '分享知識', '學習', '閱讀', '寫作'],
    score: 85,
  },
  mission: {
    questions: [
      {
        id: 'mission-1',
        question: '你希望為世界解決什麼問題？',
        answer: '幫助人們找到自己的方向，減少迷茫和焦慮。',
      },
      {
        id: 'mission-2',
        question: '你想為誰服務？',
        answer: '正在轉職或尋找人生方向的年輕人。',
      },
    ],
    keywords: ['幫助他人', '指引方向', '減少焦慮', '年輕人'],
    score: 75,
  },
  profession: {
    questions: [
      {
        id: 'profession-1',
        question: '別人經常請你幫忙什麼？',
        answer: '分析問題、提供建議、教導技術知識。',
      },
      {
        id: 'profession-2',
        question: '你有哪些技能是經過專業訓練的？',
        answer: '軟體開發、數據分析、專案管理。',
      },
    ],
    keywords: ['分析', '教導', '軟體開發', '專案管理'],
    score: 80,
  },
  vocation: {
    questions: [
      {
        id: 'vocation-1',
        question: '你目前的工作是什麼？滿意嗎？',
        answer: '軟體工程師，工作穩定但缺乏成就感。',
      },
      {
        id: 'vocation-2',
        question: '你願意為什麼樣的工作付出更多？',
        answer: '能夠直接看到幫助他人的成果，有意義的工作。',
      },
    ],
    keywords: ['軟體工程師', '有意義', '幫助他人'],
    score: 65,
  },
  analysis: {
    coreIntersection: ['創意教育', '內容創作', '技術教學'],
    suggestions: [
      '考慮結合技術背景，創建教育類內容',
      '可以嘗試開設線上課程或技術部落格',
      '尋找能夠幫助他人成長的角色或專案',
    ],
    ikigaiScore: 76,
    dimensionScores: {
      passion: 85,
      mission: 75,
      profession: 80,
      vocation: 65,
    },
  },
};

// 羅盤問題配置
export const compassQuestions: CompassQuestionConfig[] = [
  // 熱愛
  {
    id: 'passion-1',
    dimension: 'passion',
    question: '如果不用擔心收入，你想花時間做什麼？',
    hint: '想想小時候喜歡做的事',
    order: 1,
  },
  {
    id: 'passion-2',
    dimension: 'passion',
    question: '什麼活動能讓你完全忘記時間？',
    hint: '回想讓你全神貫注的時刻',
    order: 2,
  },
  {
    id: 'passion-3',
    dimension: 'passion',
    question: '哪些話題你可以聊一整天？',
    hint: '想想與朋友聊天最熱衷的主題',
    order: 3,
  },
  {
    id: 'passion-4',
    dimension: 'passion',
    question: '你閒暇時最喜歡學習什麼？',
    hint: '可以是任何形式的學習',
    order: 4,
  },
  {
    id: 'passion-5',
    dimension: 'passion',
    question: '什麼事情讓你感到最有活力？',
    hint: '想想做完後會感到精力充沛的活動',
    order: 5,
  },
  // 使命
  {
    id: 'mission-1',
    dimension: 'mission',
    question: '你希望為世界解決什麼問題？',
    hint: '想想你看到的社會問題',
    order: 1,
  },
  {
    id: 'mission-2',
    dimension: 'mission',
    question: '你想為誰服務？',
    hint: '具體描述你想幫助的對象',
    order: 2,
  },
  {
    id: 'mission-3',
    dimension: 'mission',
    question: '你希望如何被人記住？',
    hint: '想想你想留下的影響',
    order: 3,
  },
  {
    id: 'mission-4',
    dimension: 'mission',
    question: '什麼社會議題讓你最關心？',
    hint: '教育、環保、健康、平等...',
    order: 4,
  },
  {
    id: 'mission-5',
    dimension: 'mission',
    question: '你認為什麼是最有意義的貢獻？',
    hint: '不限於金錢，可以是時間或技能',
    order: 5,
  },
  // 專業
  {
    id: 'profession-1',
    dimension: 'profession',
    question: '別人經常請你幫忙什麼？',
    hint: '想想朋友或同事常找你的原因',
    order: 1,
  },
  {
    id: 'profession-2',
    dimension: 'profession',
    question: '你有哪些技能是經過專業訓練的？',
    hint: '學校、工作或自學獲得的技能',
    order: 2,
  },
  {
    id: 'profession-3',
    dimension: 'profession',
    question: '你在工作中最擅長什麼？',
    hint: '想想你的工作強項',
    order: 3,
  },
  {
    id: 'profession-4',
    dimension: 'profession',
    question: '有哪些技能你學得比別人快？',
    hint: '天賦技能往往學得更快',
    order: 4,
  },
  {
    id: 'profession-5',
    dimension: 'profession',
    question: '你能教別人什麼？',
    hint: '可以教的代表你已經掌握',
    order: 5,
  },
  // 職業
  {
    id: 'vocation-1',
    dimension: 'vocation',
    question: '你目前的工作是什麼？滿意嗎？',
    hint: '誠實面對現狀',
    order: 1,
  },
  {
    id: 'vocation-2',
    dimension: 'vocation',
    question: '你願意為什麼樣的工作付出更多？',
    hint: '想想理想的工作條件',
    order: 2,
  },
  {
    id: 'vocation-3',
    dimension: 'vocation',
    question: '市場上有哪些工作需要你的技能？',
    hint: '觀察求職市場',
    order: 3,
  },
  {
    id: 'vocation-4',
    dimension: 'vocation',
    question: '你理想的收入來源是什麼？',
    hint: '薪資、自由業、被動收入...',
    order: 4,
  },
  {
    id: 'vocation-5',
    dimension: 'vocation',
    question: '你願意為了什麼而工作？',
    hint: '除了金錢以外的動力',
    order: 5,
  },
];

// 空白羅盤資料（用於新用戶）
export const emptyCompassData: Omit<CompassData, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
  passion: { questions: [], keywords: [], score: 0 },
  mission: { questions: [], keywords: [], score: 0 },
  profession: { questions: [], keywords: [], score: 0 },
  vocation: { questions: [], keywords: [], score: 0 },
};
