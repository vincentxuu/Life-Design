'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface StreakBadgeProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StreakBadge({ streak, size = 'md' }: StreakBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm gap-1',
    md: 'px-3 py-1.5 text-base gap-1.5',
    lg: 'px-4 py-2 text-lg gap-2',
  };

  const iconSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  // Determine badge color based on streak length
  const getBadgeStyle = () => {
    if (streak >= 100) {
      return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
    } else if (streak >= 66) {
      return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
    } else if (streak >= 21) {
      return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white';
    } else if (streak >= 7) {
      return 'bg-amber-100 text-amber-700';
    } else {
      return 'bg-basic-100 text-basic-600';
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full font-bold',
        sizeClasses[size],
        getBadgeStyle()
      )}
    >
      <span className={iconSizes[size]}>🔥</span>
      <span>{streak}</span>
      <span className="font-normal opacity-80">天</span>
    </div>
  );
}
