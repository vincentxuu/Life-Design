'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WeekSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  completedDates?: string[];
}

export function WeekSelector({
  selectedDate,
  onDateChange,
  completedDates = [],
}: WeekSelectorProps) {
  // Get the start of the week (Sunday)
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    return d;
  };

  const weekStart = getWeekStart(selectedDate);

  // Generate days of the week
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + index);
    return date;
  });

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(weekStart);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    onDateChange(newDate);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm">
      {/* Previous Week */}
      <button
        onClick={() => navigateWeek('prev')}
        className="rounded-lg p-2 text-basic-400 hover:bg-basic-100 hover:text-basic-600"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Week Days */}
      <div className="flex flex-1 justify-between gap-1">
        {weekDays.map((date, index) => {
          const dateStr = formatDate(date);
          const isSelected = formatDate(selectedDate) === dateStr;
          const isToday = formatDate(today) === dateStr;
          const isCompleted = completedDates.includes(dateStr);
          const isFuture = date > today;

          return (
            <button
              key={dateStr}
              onClick={() => !isFuture && onDateChange(date)}
              disabled={isFuture}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl px-2 py-2 transition-all',
                isSelected && 'bg-primary-base text-white',
                !isSelected && !isFuture && 'hover:bg-basic-50',
                isFuture && 'opacity-50 cursor-not-allowed'
              )}
            >
              <span className="text-xs font-medium">{weekdays[index]}</span>
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
                  isSelected && 'bg-white/20',
                  isToday && !isSelected && 'ring-2 ring-primary-base'
                )}
              >
                {date.getDate()}
              </span>
              {isCompleted && (
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    isSelected ? 'bg-white' : 'bg-success'
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Next Week */}
      <button
        onClick={() => navigateWeek('next')}
        className="rounded-lg p-2 text-basic-400 hover:bg-basic-100 hover:text-basic-600"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
