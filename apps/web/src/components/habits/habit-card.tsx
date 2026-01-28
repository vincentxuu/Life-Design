'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import type { Habit, HabitLog } from '@/types';

interface HabitCardProps {
  habit: Habit;
  todayLog?: HabitLog;
  onToggle?: (completed: boolean) => void;
  onClick?: () => void;
}

export function HabitCard({
  habit,
  todayLog,
  onToggle,
  onClick,
}: HabitCardProps) {
  const isCompleted = todayLog?.completed ?? false;

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-xl border-2 p-4 transition-all',
        isCompleted
          ? 'border-success/30 bg-success/5'
          : 'border-basic-200 bg-white hover:border-primary-base/30'
      )}
    >
      {/* Checkbox */}
      <Checkbox
        checked={isCompleted}
        onCheckedChange={(checked) => onToggle?.(checked === true)}
        className={cn(
          'h-6 w-6 rounded-full',
          isCompleted && 'border-success bg-success'
        )}
      />

      {/* Content */}
      <button
        type="button"
        onClick={onClick}
        className="flex flex-1 items-center justify-between text-left"
      >
        <div>
          <h3
            className={cn(
              'font-semibold',
              isCompleted ? 'text-success line-through' : 'text-basic-600'
            )}
          >
            {habit.name}
          </h3>
          <p className="text-sm text-basic-400">{habit.trigger}</p>
        </div>

        {/* Streak Badge */}
        {habit.streak > 0 && (
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1">
            <span className="text-lg">🔥</span>
            <span className="font-bold text-amber-600">{habit.streak}</span>
            <span className="text-xs text-amber-500">天</span>
          </div>
        )}
      </button>
    </div>
  );
}
