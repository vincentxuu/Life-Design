'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { HabitStats } from '@/types';

interface HabitStatsCardProps {
  stats: HabitStats;
}

export function HabitStatsCard({ stats }: HabitStatsCardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Days */}
      <Card>
        <CardContent className="flex flex-col items-center p-6">
          <span className="text-3xl">📅</span>
          <span className="mt-2 text-3xl font-bold text-basic-600">
            {stats.totalDays}
          </span>
          <span className="text-sm text-basic-400">總追蹤天數</span>
        </CardContent>
      </Card>

      {/* Completed Days */}
      <Card>
        <CardContent className="flex flex-col items-center p-6">
          <span className="text-3xl">✅</span>
          <span className="mt-2 text-3xl font-bold text-success">
            {stats.completedDays}
          </span>
          <span className="text-sm text-basic-400">完成天數</span>
        </CardContent>
      </Card>

      {/* Completion Rate */}
      <Card>
        <CardContent className="flex flex-col items-center p-6">
          <span className="text-3xl">📊</span>
          <span className="mt-2 text-3xl font-bold text-primary-base">
            {stats.completionRate}%
          </span>
          <span className="text-sm text-basic-400">完成率</span>
        </CardContent>
      </Card>

      {/* Longest Streak */}
      <Card>
        <CardContent className="flex flex-col items-center p-6">
          <span className="text-3xl">🔥</span>
          <span className="mt-2 text-3xl font-bold text-amber-500">
            {stats.longestStreak}
          </span>
          <span className="text-sm text-basic-400">最長連續天數</span>
        </CardContent>
      </Card>
    </div>
  );
}

interface WeeklyTrendProps {
  data: { date: string; completed: boolean }[];
}

export function WeeklyTrend({ data }: WeeklyTrendProps) {
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <span>📈</span>
          本週趨勢
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {data.slice(-7).map((day, index) => {
            const date = new Date(day.date);
            const weekday = weekdays[date.getDay()];

            return (
              <div key={day.date} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    'h-16 w-8 rounded-lg',
                    day.completed ? 'bg-success' : 'bg-basic-100'
                  )}
                  style={{
                    height: day.completed ? '64px' : '16px',
                    transition: 'height 0.3s ease',
                  }}
                />
                <span className="text-xs text-basic-400">{weekday}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
