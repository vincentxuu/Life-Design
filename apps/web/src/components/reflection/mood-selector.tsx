'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface MoodOption {
  value: 1 | 2 | 3 | 4 | 5;
  emoji: string;
  label: string;
  color: string;
}

const moodOptions: MoodOption[] = [
  { value: 5, emoji: '😊', label: '很棒', color: 'bg-emerald-100 border-emerald-400 text-emerald-600' },
  { value: 4, emoji: '🙂', label: '不錯', color: 'bg-blue-100 border-blue-400 text-blue-600' },
  { value: 3, emoji: '😐', label: '普通', color: 'bg-amber-100 border-amber-400 text-amber-600' },
  { value: 2, emoji: '😟', label: '低落', color: 'bg-orange-100 border-orange-400 text-orange-600' },
  { value: 1, emoji: '😢', label: '難過', color: 'bg-rose-100 border-rose-400 text-rose-600' },
];

interface MoodSelectorProps {
  value?: 1 | 2 | 3 | 4 | 5;
  onChange: (value: 1 | 2 | 3 | 4 | 5) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function MoodSelector({ value, onChange, size = 'md' }: MoodSelectorProps) {
  const sizeClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const buttonSizes = {
    sm: 'p-2 text-2xl',
    md: 'p-3 text-3xl',
    lg: 'p-4 text-4xl',
  };

  return (
    <div className={cn('flex justify-center', sizeClasses[size])}>
      {moodOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            'flex flex-col items-center rounded-xl border-2 transition-all duration-200',
            buttonSizes[size],
            'hover:scale-110',
            value === option.value
              ? `${option.color} border-2 shadow-md`
              : 'border-basic-200 bg-white hover:border-basic-300'
          )}
        >
          <span>{option.emoji}</span>
          <span
            className={cn(
              'mt-1 text-xs font-medium',
              value === option.value ? '' : 'text-basic-400'
            )}
          >
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// Helper to get mood info
export function getMoodInfo(mood: number) {
  return moodOptions.find((m) => m.value === mood) || moodOptions[2];
}
