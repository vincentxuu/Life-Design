'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Objective, calculateObjectiveProgress } from '@/types';

interface OKRSummaryProps {
  objectives: Objective[];
}

export function OKRSummary({ objectives }: OKRSummaryProps) {
  const activeObjectives = objectives.filter((o) => o.status === 'active');
  const totalKRs = activeObjectives.reduce(
    (sum, o) => sum + o.keyResults.length,
    0
  );
  const completedKRs = activeObjectives.reduce(
    (sum, o) =>
      sum + o.keyResults.filter((kr) => kr.status === 'completed').length,
    0
  );
  const avgProgress =
    activeObjectives.length > 0
      ? Math.round(
          activeObjectives.reduce(
            (sum, o) => sum + calculateObjectiveProgress(o),
            0
          ) / activeObjectives.length
        )
      : 0;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-xl bg-primary-pale p-4 text-center">
        <div className="text-3xl font-bold text-primary-darker">
          {activeObjectives.length}
        </div>
        <div className="text-sm text-primary-base">進行中目標</div>
      </div>
      <div className="rounded-xl bg-green-100 p-4 text-center">
        <div className="text-3xl font-bold text-green-700">
          {completedKRs}/{totalKRs}
        </div>
        <div className="text-sm text-green-600">完成 KRs</div>
      </div>
      <div className="rounded-xl bg-amber-100 p-4 text-center">
        <div className="text-3xl font-bold text-amber-700">{avgProgress}%</div>
        <div className="text-sm text-amber-600">平均進度</div>
      </div>
    </div>
  );
}
