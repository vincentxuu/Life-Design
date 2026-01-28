'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ValueCard, type ValueItem } from './value-card';

interface ValuesDropZoneProps {
  title: string;
  values: ValueItem[];
  maxItems?: number;
  onRemove?: (id: string) => void;
  emptyMessage?: string;
  showRanks?: boolean;
}

export function ValuesDropZone({
  title,
  values,
  maxItems = 5,
  onRemove,
  emptyMessage = '點擊下方卡片加入',
  showRanks = true,
}: ValuesDropZoneProps) {
  const emptySlots = Math.max(0, maxItems - values.length);

  return (
    <div className="rounded-2xl border-2 border-dashed border-primary-base/30 bg-primary-palest p-4">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary-darker">
        <span>🏆</span>
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {/* Selected Values */}
        {values.map((value, index) => (
          <ValueCard
            key={value.id}
            value={value}
            selected
            rank={showRanks ? index + 1 : undefined}
            onClick={() => onRemove?.(value.id)}
            compact
          />
        ))}

        {/* Empty Slots */}
        {Array.from({ length: emptySlots }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className={cn(
              'flex h-10 w-20 items-center justify-center rounded-xl border-2 border-dashed border-basic-300 bg-white/50',
              'text-sm text-basic-400'
            )}
          >
            {values.length === 0 && index === 0 ? emptyMessage : `${values.length + index + 1}`}
          </div>
        ))}
      </div>

      {values.length > 0 && (
        <p className="mt-3 text-center text-xs text-basic-400">
          點擊卡片可移除
        </p>
      )}
    </div>
  );
}
