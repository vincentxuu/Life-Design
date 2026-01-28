// types/blueprint.ts

export interface Blueprint {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  versions: {
    a: BlueprintVersion; // 現況延伸
    b: BlueprintVersion; // 替代方案
    c: BlueprintVersion; // 理想生活
  };
}

export type BlueprintVersionKey = 'a' | 'b' | 'c';

export interface BlueprintVersion {
  title: string;
  description: string;
  resources: ResourceAssessment;
  confidence: number; // 1-10
  milestones: Milestone[];
}

export interface ResourceAssessment {
  money: number;    // 0-100
  time: number;     // 0-100
  skills: number;   // 0-100
  network: number;  // 0-100
}

export interface Milestone {
  id: string;
  title: string;
  deadline: MilestoneDeadline;
  completed: boolean;
  notes?: string;
}

export interface MilestoneDeadline {
  type: 'absolute' | 'relative';
  date?: string;        // ISO 8601 format (YYYY-MM-DD) for 'absolute'
  value?: number;       // e.g., 6 for 'relative'
  unit?: 'month' | 'year'; // e.g., 'month' -> 6 months from now
}

// 資源類型
export type ResourceType = keyof ResourceAssessment;

// 藍圖比較數據
export interface BlueprintComparison {
  versionA: BlueprintVersion;
  versionB: BlueprintVersion;
  versionC: BlueprintVersion;
}
