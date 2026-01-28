'use client';

import * as React from 'react';
import { ValueCard, type ValueItem } from './value-card';

interface ValuesGridProps {
  values: ValueItem[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  disabled?: boolean;
}

export function ValuesGrid({
  values,
  selectedIds,
  onSelect,
  disabled = false,
}: ValuesGridProps) {
  return (
    <div className="rounded-2xl border border-basic-200 bg-white p-4">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-basic-600">
        <span>📋</span>
        所有價值觀 (點擊選擇)
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {values.map((value) => {
          const isSelected = selectedIds.includes(value.id);

          return (
            <ValueCard
              key={value.id}
              value={value}
              selected={isSelected}
              onClick={() => !disabled && onSelect(value.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
