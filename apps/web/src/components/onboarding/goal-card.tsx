'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface GoalCardProps {
  id: string;
  icon: string;
  title: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
}

export function GoalCard({
  icon,
  title,
  description,
  selected = false,
  onClick,
}: GoalCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 transition-all duration-200',
        'hover:border-primary-base hover:bg-primary-palest',
        'focus:outline-none focus:ring-2 focus:ring-primary-base focus:ring-offset-2',
        selected
          ? 'border-primary-base bg-primary-pale shadow-md'
          : 'border-basic-200 bg-white'
      )}
    >
      <span className="text-4xl" role="img" aria-hidden="true">
        {icon}
      </span>
      <span
        className={cn(
          'text-lg font-semibold',
          selected ? 'text-primary-darker' : 'text-basic-600'
        )}
      >
        {title}
      </span>
      {description && (
        <span className="text-sm text-basic-400">{description}</span>
      )}
    </button>
  );
}
