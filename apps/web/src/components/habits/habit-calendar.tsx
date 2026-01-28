'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { HabitLog } from '@/types';

interface HabitCalendarProps {
  logs: HabitLog[];
  year?: number;
  month?: number;
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export function HabitCalendar({
  logs,
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
}: HabitCalendarProps) {
  // Create a map of completed dates
  const completedDates = new Set(
    logs.filter((log) => log.completed).map((log) => log.date)
  );

  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Generate calendar grid
  const calendarDays: (number | null)[] = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      {/* Month Header */}
      <h3 className="mb-4 text-center font-semibold text-basic-600">
        {year}年 {month + 1}月
      </h3>

      {/* Weekday Headers */}
      <div className="mb-2 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-xs font-medium text-basic-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-8 w-8" />;
          }

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isCompleted = completedDates.has(dateStr);
          const isToday = isCurrentMonth && day === today.getDate();
          const isFuture = new Date(year, month, day) > today;

          return (
            <div
              key={day}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all',
                isCompleted && 'bg-success text-white font-medium',
                !isCompleted && !isFuture && 'bg-basic-100 text-basic-400',
                isFuture && 'text-basic-300',
                isToday && !isCompleted && 'ring-2 ring-primary-base ring-offset-2'
              )}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-4 text-xs text-basic-400">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-success" />
          <span>完成</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-basic-100" />
          <span>未完成</span>
        </div>
      </div>
    </div>
  );
}
