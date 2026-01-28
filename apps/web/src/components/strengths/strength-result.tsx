'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  StrengthItem,
  StrengthCategory,
  STRENGTH_CATEGORIES,
} from '@/types';

interface StrengthResultProps {
  selectedStrengths: StrengthItem[];
}

export function StrengthResult({ selectedStrengths }: StrengthResultProps) {
  // Calculate category distribution
  const categoryCount = selectedStrengths.reduce(
    (acc, strength) => {
      acc[strength.category] = (acc[strength.category] || 0) + 1;
      return acc;
    },
    {} as Record<StrengthCategory, number>
  );

  // Find dominant category
  const dominantCategory = Object.entries(categoryCount).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] as StrengthCategory | undefined;

  return (
    <div className="space-y-6">
      {/* Top 5 Strengths */}
      <div className="space-y-4">
        {selectedStrengths.map((strength, index) => {
          const category = STRENGTH_CATEGORIES[strength.category];
          return (
            <div
              key={strength.id}
              className="flex items-start gap-4 rounded-xl bg-gradient-to-r from-primary-palest to-transparent p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-base text-lg font-bold text-white">
                {index + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{strength.icon}</span>
                  <span className="text-xl font-semibold text-basic-600">
                    {strength.name}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-medium',
                      category.bgColor,
                      category.color
                    )}
                  >
                    {category.name}
                  </span>
                </div>
                <p className="mt-1 text-sm text-basic-400">
                  {strength.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Distribution */}
      <div className="rounded-xl bg-basic-100 p-4">
        <h4 className="mb-3 font-semibold text-basic-600">優勢分佈</h4>
        <div className="grid grid-cols-2 gap-2">
          {(Object.entries(STRENGTH_CATEGORIES) as [StrengthCategory, typeof STRENGTH_CATEGORIES[StrengthCategory]][]).map(
            ([key, config]) => (
              <div
                key={key}
                className={cn(
                  'flex items-center justify-between rounded-lg p-2',
                  config.bgColor
                )}
              >
                <span className={cn('text-sm font-medium', config.color)}>
                  {config.name}
                </span>
                <span
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold',
                    categoryCount[key]
                      ? 'bg-white ' + config.color
                      : 'bg-basic-200 text-basic-400'
                  )}
                >
                  {categoryCount[key] || 0}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Insight */}
      {dominantCategory && (
        <div className="rounded-xl bg-amber-50 p-4">
          <h4 className="mb-2 flex items-center gap-2 font-semibold text-amber-700">
            <span>💡</span>
            洞察
          </h4>
          <p className="text-sm text-basic-500">
            你的優勢主要集中在
            <strong className="text-amber-700">
              {STRENGTH_CATEGORIES[dominantCategory].name}
            </strong>
            領域。這意味著你
            {dominantCategory === 'executing' &&
              '擅長將想法落實為行動，是可靠的執行者。'}
            {dominantCategory === 'influencing' &&
              '善於影響和說服他人，天生具有領導潛質。'}
            {dominantCategory === 'relationship' &&
              '擅長建立和維護人際關係，是團隊的凝聚力來源。'}
            {dominantCategory === 'strategic' &&
              '善於思考和分析，能看到他人看不到的可能性。'}
          </p>
          <p className="mt-2 text-sm text-basic-400">
            建議：發揮你的優勢，在工作和生活中尋找能運用這些天賦的機會。
          </p>
        </div>
      )}
    </div>
  );
}
