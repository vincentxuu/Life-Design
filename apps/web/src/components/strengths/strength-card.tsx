'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { StrengthItem, STRENGTH_CATEGORIES } from '@/types';
import { Check } from 'lucide-react';

interface StrengthCardProps {
  strength: StrengthItem;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  showDescription?: boolean;
}

export function StrengthCard({
  strength,
  selected = false,
  disabled = false,
  onClick,
  showDescription = false,
}: StrengthCardProps) {
  const category = STRENGTH_CATEGORIES[strength.category];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled && !selected}
      className={cn(
        'relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200',
        'hover:border-primary-base hover:shadow-md',
        'focus:outline-none focus:ring-2 focus:ring-primary-base focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-basic-200 disabled:hover:shadow-none',
        selected
          ? 'border-primary-base bg-primary-pale shadow-md'
          : 'border-basic-200 bg-white'
      )}
    >
      {/* Selected Check */}
      {selected && (
        <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-base text-white shadow-md">
          <Check className="h-4 w-4" />
        </div>
      )}

      {/* Icon */}
      <span className="text-3xl" role="img" aria-hidden="true">
        {strength.icon}
      </span>

      {/* Name */}
      <span
        className={cn(
          'font-semibold',
          selected ? 'text-primary-darker' : 'text-basic-600'
        )}
      >
        {strength.name}
      </span>

      {/* Category Badge */}
      <span
        className={cn(
          'rounded-full px-2 py-0.5 text-xs font-medium',
          category.bgColor,
          category.color
        )}
      >
        {category.name}
      </span>

      {/* Description (optional) */}
      {showDescription && (
        <p className="mt-1 text-xs text-basic-400 line-clamp-2">
          {strength.description}
        </p>
      )}
    </button>
  );
}
