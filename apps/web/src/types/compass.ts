// types/compass.ts

export interface CompassData {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  passion: CompassQuestionSet;   // 熱愛
  mission: CompassQuestionSet;   // 使命
  profession: CompassQuestionSet; // 專業
  vocation: CompassQuestionSet;   // 職業
  analysis?: CompassAnalysis;
}

export type CompassDimension = 'passion' | 'mission' | 'profession' | 'vocation';

export interface CompassQuestionSet {
  questions: CompassQuestion[];
  keywords: string[];
  score: number; // 0-100
}

export interface CompassQuestion {
  id: string;
  question: string;
  answer: string;
  hint?: string;
}

export interface CompassAnalysis {
  coreIntersection: string[];
  suggestions: string[];
  ikigaiScore: number;
  dimensionScores: {
    passion: number;
    mission: number;
    profession: number;
    vocation: number;
  };
}

// 羅盤問題配置
export interface CompassQuestionConfig {
  id: string;
  dimension: CompassDimension;
  question: string;
  hint: string;
  order: number;
}
