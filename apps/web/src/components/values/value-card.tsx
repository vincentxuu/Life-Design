'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ValueItem {
  id: string;
  name: string;
  icon: string;
}

interface ValueCardProps {
  value: ValueItem;
  selected?: boolean;
  rank?: number;
  onClick?: () => void;
  dragging?: boolean;
  compact?: boolean;
}

export function ValueCard({
  value,
  selected = false,
  rank,
  onClick,
  dragging = false,
  compact = false,
}: ValueCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-2 rounded-xl border-2 transition-all duration-200',
        compact ? 'px-3 py-2' : 'px-4 py-3',
        'hover:border-primary-base hover:shadow-md',
        'focus:outline-none focus:ring-2 focus:ring-primary-base focus:ring-offset-2',
        selected
          ? 'border-primary-base bg-primary-pale shadow-md'
          : 'border-basic-200 bg-white',
        dragging && 'scale-105 shadow-xl opacity-90'
      )}
    >
      {/* Rank Badge */}
      {rank !== undefined && (
        <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-base text-xs font-bold text-white shadow">
          {rank}
        </span>
      )}

      <span className={cn('text-2xl', compact && 'text-xl')}>{value.icon}</span>
      <span
        className={cn(
          'font-medium',
          compact ? 'text-sm' : 'text-base',
          selected ? 'text-primary-darker' : 'text-basic-600'
        )}
      >
        {value.name}
      </span>
    </button>
  );
}
