'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { Reflection } from '@/types';
import { getMoodInfo } from './mood-selector';

interface ReflectionCalendarProps {
  reflections: Reflection[];
  year?: number;
  month?: number;
  onDateClick?: (date: string) => void;
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export function ReflectionCalendar({
  reflections,
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  onDateClick,
}: ReflectionCalendarProps) {
  // Create a map of reflections by date
  const reflectionMap = new Map(
    reflections.map((r) => [r.date, r])
  );

  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Generate calendar grid
  const calendarDays: (number | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

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
            return <div key={`empty-${index}`} className="h-10 w-full" />;
          }

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const reflection = reflectionMap.get(dateStr);
          const moodInfo = reflection ? getMoodInfo(reflection.mood) : null;
          const isToday = isCurrentMonth && day === today.getDate();
          const isFuture = new Date(year, month, day) > today;

          return (
            <button
              key={day}
              onClick={() => !isFuture && onDateClick?.(dateStr)}
              disabled={isFuture}
              className={cn(
                'flex h-10 w-full flex-col items-center justify-center rounded-lg text-sm transition-all',
                reflection && 'cursor-pointer hover:opacity-80',
                !reflection && !isFuture && 'bg-basic-50 hover:bg-basic-100',
                isFuture && 'text-basic-300 cursor-not-allowed',
                isToday && !reflection && 'ring-2 ring-primary-base ring-offset-1'
              )}
              style={
                reflection
                  ? {
                      backgroundColor: moodInfo?.color.includes('emerald')
                        ? '#d1fae5'
                        : moodInfo?.color.includes('blue')
                          ? '#dbeafe'
                          : moodInfo?.color.includes('amber')
                            ? '#fef3c7'
                            : moodInfo?.color.includes('orange')
                              ? '#ffedd5'
                              : '#fce7f3',
                    }
                  : undefined
              }
            >
              <span className={cn('text-xs', reflection ? 'font-medium' : 'text-basic-500')}>
                {day}
              </span>
              {reflection && <span className="text-sm">{moodInfo?.emoji}</span>}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-basic-400">
        <span>心情記錄：</span>
        <div className="flex items-center gap-1">
          <span>😊</span>
          <span>很棒</span>
        </div>
        <div className="flex items-center gap-1">
          <span>🙂</span>
          <span>不錯</span>
        </div>
        <div className="flex items-center gap-1">
          <span>😐</span>
          <span>普通</span>
        </div>
        <div className="flex items-center gap-1">
          <span>😟</span>
          <span>低落</span>
        </div>
        <div className="flex items-center gap-1">
          <span>😢</span>
          <span>難過</span>
        </div>
      </div>
    </div>
  );
}
