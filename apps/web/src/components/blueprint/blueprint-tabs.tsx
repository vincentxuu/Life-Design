'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type BlueprintVersionId = 'a' | 'b' | 'c';

interface BlueprintVersion {
  id: BlueprintVersionId;
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

export const blueprintVersions: BlueprintVersion[] = [
  {
    id: 'a',
    label: '版本 A',
    description: '現況延伸',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'b',
    label: '版本 B',
    description: '替代方案',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 'c',
    label: '版本 C',
    description: '理想生活',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

interface BlueprintTabsProps {
  activeTab: BlueprintVersionId;
  onTabChange: (tab: BlueprintVersionId) => void;
}

export function BlueprintTabs({ activeTab, onTabChange }: BlueprintTabsProps) {
  return (
    <div className="flex rounded-xl bg-white p-1 shadow-sm">
      {blueprintVersions.map((version) => {
        const isActive = activeTab === version.id;

        return (
          <button
            key={version.id}
            onClick={() => onTabChange(version.id)}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 rounded-lg px-4 py-3 transition-all',
              isActive ? `${version.bgColor} ${version.color}` : 'text-basic-400 hover:bg-basic-50'
            )}
          >
            <span className={cn('font-semibold', isActive && 'font-bold')}>
              {version.label}
            </span>
            <span className="text-xs opacity-80">{version.description}</span>
          </button>
        );
      })}
    </div>
  );
}
