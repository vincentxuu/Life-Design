'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { StrengthItem, StrengthCategory, STRENGTH_CATEGORIES } from '@/types';
import { StrengthCard } from './strength-card';

interface StrengthsGridProps {
  strengths: StrengthItem[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  disabled?: boolean;
  groupByCategory?: boolean;
}

export function StrengthsGrid({
  strengths,
  selectedIds,
  onSelect,
  disabled = false,
  groupByCategory = true,
}: StrengthsGridProps) {
  if (groupByCategory) {
    const categories = Object.keys(STRENGTH_CATEGORIES) as StrengthCategory[];

    return (
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryStrengths = strengths.filter(
            (s) => s.category === category
          );
          if (categoryStrengths.length === 0) return null;

          const config = STRENGTH_CATEGORIES[category];

          return (
            <div key={category}>
              <h3
                className={cn(
                  'mb-3 flex items-center gap-2 text-lg font-semibold',
                  config.color
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg',
                    config.bgColor
                  )}
                >
                  {category === 'executing' && '🎯'}
                  {category === 'influencing' && '📣'}
                  {category === 'relationship' && '💝'}
                  {category === 'strategic' && '🧠'}
                </span>
                {config.name}
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {categoryStrengths.map((strength) => (
                  <StrengthCard
                    key={strength.id}
                    strength={strength}
                    selected={selectedIds.includes(strength.id)}
                    disabled={disabled}
                    onClick={() => onSelect(strength.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {strengths.map((strength) => (
        <StrengthCard
          key={strength.id}
          strength={strength}
          selected={selectedIds.includes(strength.id)}
          disabled={disabled}
          onClick={() => onSelect(strength.id)}
        />
      ))}
    </div>
  );
}
