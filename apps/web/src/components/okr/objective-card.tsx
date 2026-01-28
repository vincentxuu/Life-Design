'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Objective,
  calculateObjectiveProgress,
  calculateKRProgress,
  KR_STATUS_CONFIG,
} from '@/types';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';

interface ObjectiveCardProps {
  objective: Objective;
  onAddKeyResult?: () => void;
  onUpdateProgress?: (krId: string, value: number) => void;
}

export function ObjectiveCard({
  objective,
  onAddKeyResult,
  onUpdateProgress,
}: ObjectiveCardProps) {
  const [expanded, setExpanded] = React.useState(true);
  const progress = calculateObjectiveProgress(objective);

  return (
    <div className="rounded-2xl border border-basic-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div
        className="flex cursor-pointer items-center gap-4 p-4"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-4xl" role="img" aria-hidden="true">
          {objective.icon}
        </span>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-basic-600">
            {objective.title}
          </h3>
          {objective.description && (
            <p className="text-sm text-basic-400">{objective.description}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* Progress Circle */}
          <div className="relative flex h-12 w-12 items-center justify-center">
            <svg className="h-12 w-12 -rotate-90 transform">
              <circle
                cx="24"
                cy="24"
                r="20"
                className="fill-none stroke-basic-200"
                strokeWidth="4"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                className={cn(
                  'fill-none transition-all duration-500',
                  progress >= 100
                    ? 'stroke-green-500'
                    : progress >= 70
                      ? 'stroke-primary-base'
                      : progress >= 30
                        ? 'stroke-amber-500'
                        : 'stroke-red-500'
                )}
                strokeWidth="4"
                strokeDasharray={`${(progress / 100) * 125.6} 125.6`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-sm font-bold text-basic-600">
              {progress}%
            </span>
          </div>
          {/* Expand Toggle */}
          <button className="rounded-lg p-2 hover:bg-basic-100">
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-basic-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-basic-400" />
            )}
          </button>
        </div>
      </div>

      {/* Key Results */}
      {expanded && (
        <div className="border-t border-basic-100 p-4">
          <div className="space-y-4">
            {objective.keyResults.map((kr) => {
              const krProgress = calculateKRProgress(kr);
              const statusConfig = KR_STATUS_CONFIG[kr.status];

              return (
                <div key={kr.id} className="rounded-xl bg-basic-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-basic-600">
                      {kr.title}
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-medium',
                        statusConfig.bgColor,
                        statusConfig.color
                      )}
                    >
                      {statusConfig.label}
                    </span>
                  </div>
                  <div className="mb-2">
                    <Progress value={krProgress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-basic-400">
                      {kr.currentValue} / {kr.targetValue} {kr.unit}
                    </span>
                    <span
                      className={cn(
                        'font-semibold',
                        krProgress >= 100
                          ? 'text-green-600'
                          : krProgress >= 70
                            ? 'text-primary-base'
                            : 'text-basic-500'
                      )}
                    >
                      {krProgress}%
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Add Key Result Button */}
            {onAddKeyResult && (
              <button
                onClick={onAddKeyResult}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-basic-300 p-4 text-basic-400 transition-colors hover:border-primary-base hover:text-primary-base"
              >
                <Plus className="h-5 w-5" />
                <span>新增關鍵結果</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
