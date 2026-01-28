'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ScoreSliderProps {
  label: string;
  icon: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}

export function ScoreSlider({
  label,
  icon,
  description,
  value,
  onChange,
}: ScoreSliderProps) {
  return (
    <div className="rounded-xl border border-basic-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <span className="font-semibold text-basic-600">{label}</span>
            <p className="text-xs text-basic-400">{description}</p>
          </div>
        </div>
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold',
            value >= 8
              ? 'bg-green-100 text-green-700'
              : value >= 5
                ? 'bg-amber-100 text-amber-700'
                : 'bg-red-100 text-red-700'
          )}
        >
          {value}
        </span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full cursor-pointer accent-primary-base"
      />
      <div className="mt-1 flex justify-between text-xs text-basic-400">
        <span>不滿意</span>
        <span>非常滿意</span>
      </div>
    </div>
  );
}
