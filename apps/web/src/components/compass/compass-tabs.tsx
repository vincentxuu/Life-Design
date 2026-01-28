'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CompassDimension {
  id: 'passion' | 'mission' | 'profession' | 'vocation';
  icon: string;
  title: string;
  titleEn: string;
  color: string;
  bgColor: string;
}

export const compassDimensions: CompassDimension[] = [
  {
    id: 'passion',
    icon: '💖',
    title: '熱愛',
    titleEn: 'Passion',
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
  },
  {
    id: 'mission',
    icon: '🌍',
    title: '使命',
    titleEn: 'Mission',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 'profession',
    icon: '⭐',
    title: '專業',
    titleEn: 'Profession',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  {
    id: 'vocation',
    icon: '💰',
    title: '職業',
    titleEn: 'Vocation',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
];

interface CompassTabsProps {
  activeTab: CompassDimension['id'];
  onTabChange: (tab: CompassDimension['id']) => void;
  progress: Record<CompassDimension['id'], number>; // 0-100
}

export function CompassTabs({ activeTab, onTabChange, progress }: CompassTabsProps) {
  return (
    <div className="rounded-xl bg-white p-2 shadow-sm">
      <div className="flex gap-1">
        {compassDimensions.map((dim) => {
          const isActive = activeTab === dim.id;
          const progressValue = progress[dim.id] || 0;

          return (
            <button
              key={dim.id}
              onClick={() => onTabChange(dim.id)}
              className={cn(
                'relative flex flex-1 flex-col items-center gap-1 rounded-lg px-3 py-3 transition-all',
                isActive ? `${dim.bgColor} ${dim.color}` : 'text-basic-400 hover:bg-basic-50'
              )}
            >
              <span className="text-xl">{dim.icon}</span>
              <span className={cn('text-sm font-medium', isActive && 'font-bold')}>
                {dim.title}
              </span>

              {/* Progress Indicator */}
              <div className="absolute bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 overflow-hidden rounded-full bg-basic-100">
                <div
                  className={cn('h-full transition-all duration-300', isActive ? 'bg-current' : 'bg-basic-300')}
                  style={{ width: `${progressValue}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
