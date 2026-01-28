'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { compassDimensions } from './compass-tabs';

interface CompassAnalysisProps {
  scores: {
    passion: number;
    mission: number;
    profession: number;
    vocation: number;
  };
  keywords: {
    passion: string[];
    mission: string[];
    profession: string[];
    vocation: string[];
  };
  coreIntersection: string[];
  suggestions: string[];
}

export function CompassAnalysis({
  scores,
  keywords,
  coreIntersection,
  suggestions,
}: CompassAnalysisProps) {
  return (
    <div className="space-y-6">
      {/* Core Intersection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            你的核心交集領域
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {coreIntersection.map((item) => (
              <span
                key={item}
                className="rounded-full bg-primary-pale px-4 py-2 font-medium text-primary-darker"
              >
                {item}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dimension Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            四面向分析
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {compassDimensions.map((dim) => {
            const score = scores[dim.id];
            const dimKeywords = keywords[dim.id];

            return (
              <div key={dim.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{dim.icon}</span>
                    <span className="font-medium text-basic-600">{dim.title}</span>
                  </div>
                  <span className={cn('font-bold', dim.color)}>{score}%</span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 overflow-hidden rounded-full bg-basic-100">
                  <div
                    className={cn('h-full transition-all duration-500', dim.bgColor)}
                    style={{
                      width: `${score}%`,
                      backgroundColor:
                        dim.id === 'passion'
                          ? '#f43f5e'
                          : dim.id === 'mission'
                            ? '#10b981'
                            : dim.id === 'profession'
                              ? '#f59e0b'
                              : '#3b82f6',
                    }}
                  />
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1">
                  {dimKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className={cn('rounded-full px-2 py-0.5 text-xs', dim.bgColor, dim.color)}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            行動建議
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-base text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-basic-500">{suggestion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
