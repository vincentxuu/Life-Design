'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface MoodOption {
  value: 1 | 2 | 3 | 4 | 5;
  emoji: string;
  labelKey: string;
  color: string;
}

const moodOptions: MoodOption[] = [
  { value: 5, emoji: '😊', labelKey: 'great', color: 'bg-emerald-100 border-emerald-400 text-emerald-600' },
  { value: 4, emoji: '🙂', labelKey: 'good', color: 'bg-blue-100 border-blue-400 text-blue-600' },
  { value: 3, emoji: '😐', labelKey: 'okay', color: 'bg-amber-100 border-amber-400 text-amber-600' },
  { value: 2, emoji: '😟', labelKey: 'bad', color: 'bg-orange-100 border-orange-400 text-orange-600' },
  { value: 1, emoji: '😢', labelKey: 'terrible', color: 'bg-rose-100 border-rose-400 text-rose-600' },
];

interface MoodSelectorProps {
  value?: 1 | 2 | 3 | 4 | 5;
  onChange: (value: 1 | 2 | 3 | 4 | 5) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function MoodSelector({ value, onChange, size = 'md' }: MoodSelectorProps) {
  const t = useTranslations('reflection');

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
    <div
      className={cn('flex justify-center', sizeClasses[size])}
      role="radiogroup"
      aria-label={t('howWasToday')}
    >
      {moodOptions.map((option) => {
        const label = t(`mood.${option.labelKey}`);
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={t('selectMood', { mood: label })}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex flex-col items-center rounded-xl border-2 transition-all duration-200',
              buttonSizes[size],
              'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-base focus:ring-offset-2',
              isSelected
                ? `${option.color} border-2 shadow-md`
                : 'border-basic-200 bg-white hover:border-basic-300'
            )}
          >
            <span aria-hidden="true">{option.emoji}</span>
            <span
              className={cn(
                'mt-1 text-xs font-medium',
                isSelected ? '' : 'text-basic-400'
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// Helper to get mood info (returns labelKey instead of label for i18n)
export function getMoodInfo(mood: number) {
  const option = moodOptions.find((m) => m.value === mood) || moodOptions[2];
  return {
    ...option,
    // labelKey can be used with t(`mood.${labelKey}`) for translation
  };
}
