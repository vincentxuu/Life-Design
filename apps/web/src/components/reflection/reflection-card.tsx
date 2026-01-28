'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import type { Reflection } from '@/types';
import { getMoodInfo } from './mood-selector';

interface ReflectionCardProps {
  reflection: Reflection;
  onClick?: () => void;
  compact?: boolean;
}

export function ReflectionCard({
  reflection,
  onClick,
  compact = false,
}: ReflectionCardProps) {
  const t = useTranslations('reflection');
  const moodInfo = getMoodInfo(reflection.mood);
  const moodLabel = t(`mood.${moodInfo.labelKey}`);
  const date = new Date(reflection.date);
  const formattedDate = date.toLocaleDateString('zh-TW', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });

  if (compact) {
    return (
      <button
        onClick={onClick}
        className="flex w-full items-center gap-3 rounded-xl bg-white p-3 text-left shadow-sm transition-all hover:shadow-md"
      >
        <span className="text-2xl">{moodInfo.emoji}</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-basic-600">{formattedDate}</p>
          <p className="line-clamp-1 text-xs text-basic-400">
            {reflection.questions.meaningful || t('notFilled')}
          </p>
        </div>
      </button>
    );
  }

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-lg',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{moodInfo.emoji}</span>
            <div>
              <p className="font-semibold text-basic-600">{formattedDate}</p>
              <p className={cn('text-sm', moodInfo.color.split(' ')[2])}>
                {moodLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Meaningful */}
        {reflection.questions.meaningful && (
          <div className="mb-3">
            <p className="text-xs font-medium text-basic-400">{t('meaningfulThing')}</p>
            <p className="text-sm text-basic-600">{reflection.questions.meaningful}</p>
          </div>
        )}

        {/* Gratitude */}
        {reflection.gratitude.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-basic-400">{t('gratitudeLabel')}：</span>
            {reflection.gratitude.map((item, index) => (
              <span
                key={index}
                className="rounded-full bg-primary-pale px-2 py-0.5 text-xs text-primary-darker"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
