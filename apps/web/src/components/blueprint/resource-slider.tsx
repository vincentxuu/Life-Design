'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ResourceSliderProps {
  label: string;
  icon: string;
  value: number;
  onChange: (value: number) => void;
  color?: string;
}

export function ResourceSlider({
  label,
  icon,
  value,
  onChange,
  color = 'bg-primary-base',
}: ResourceSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="font-medium text-basic-600">{label}</span>
        </div>
        <span className="text-sm font-bold text-basic-500">{value}%</span>
      </div>

      <div className="relative">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-basic-100 [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-base [&::-webkit-slider-thumb]:shadow-md"
        />
        <div
          className={cn('absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full', color)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
