'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';

interface GratitudeInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  maxItems?: number;
}

export function GratitudeInput({
  values,
  onChange,
  maxItems = 3,
}: GratitudeInputProps) {
  // Ensure we always have the correct number of slots
  const slots = Array.from({ length: maxItems }).map((_, i) => values[i] || '');

  const handleChange = (index: number, value: string) => {
    const newValues = [...slots];
    newValues[index] = value;
    // Filter out empty strings when saving
    onChange(newValues.filter(Boolean));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">🙏</span>
        <span className="font-semibold text-basic-600">感恩日記</span>
        <span className="text-sm text-basic-400">(選填)</span>
      </div>

      <p className="text-sm text-basic-400">
        每天寫下三件讓你感恩的事，可以提升幸福感
      </p>

      <div className="space-y-2">
        {slots.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-pale text-xs font-bold text-primary-base">
              {index + 1}
            </span>
            <Input
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`今天感恩的第 ${index + 1} 件事...`}
              className="flex-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
