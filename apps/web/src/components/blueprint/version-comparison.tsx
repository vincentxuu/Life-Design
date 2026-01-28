'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { RadarChart } from './radar-chart';
import { blueprintVersions, type BlueprintVersionId } from './blueprint-tabs';
import type { BlueprintVersion } from '@/types';

interface VersionComparisonProps {
  versions: Record<BlueprintVersionId, BlueprintVersion>;
}

export function VersionComparison({ versions }: VersionComparisonProps) {
  const versionColors: Record<BlueprintVersionId, string> = {
    a: '#3b82f6',
    b: '#10b981',
    c: '#8b5cf6',
  };

  return (
    <div className="space-y-6">
      {/* Comparison Table */}
      <div className="overflow-hidden rounded-xl border border-basic-200">
        <table className="w-full">
          <thead>
            <tr className="bg-basic-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-basic-500">
                指標
              </th>
              {blueprintVersions.map((v) => (
                <th
                  key={v.id}
                  className={cn('px-4 py-3 text-center text-sm font-medium', v.color)}
                >
                  {v.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-basic-100">
            {/* Title */}
            <tr>
              <td className="px-4 py-3 text-sm text-basic-500">標題</td>
              {blueprintVersions.map((v) => (
                <td key={v.id} className="px-4 py-3 text-center text-sm font-medium text-basic-600">
                  {versions[v.id].title || '-'}
                </td>
              ))}
            </tr>

            {/* Resources */}
            {[
              { key: 'money', icon: '💰', label: '金錢' },
              { key: 'time', icon: '⏰', label: '時間' },
              { key: 'skills', icon: '🛠', label: '技能' },
              { key: 'network', icon: '👥', label: '人脈' },
            ].map((resource) => (
              <tr key={resource.key}>
                <td className="px-4 py-3 text-sm text-basic-500">
                  {resource.icon} {resource.label}
                </td>
                {blueprintVersions.map((v) => {
                  const value = versions[v.id].resources[resource.key as keyof typeof versions.a.resources];
                  return (
                    <td key={v.id} className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-2 w-16 overflow-hidden rounded-full bg-basic-100">
                          <div
                            className={cn('h-full rounded-full', v.bgColor)}
                            style={{
                              width: `${value}%`,
                              backgroundColor: versionColors[v.id],
                            }}
                          />
                        </div>
                        <span className="text-sm text-basic-600">{value}%</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Confidence */}
            <tr className="bg-basic-50">
              <td className="px-4 py-3 text-sm font-medium text-basic-500">
                💪 信心指數
              </td>
              {blueprintVersions.map((v) => (
                <td key={v.id} className="px-4 py-3 text-center">
                  <span className={cn('text-lg font-bold', v.color)}>
                    {versions[v.id].confidence}/10
                  </span>
                </td>
              ))}
            </tr>

            {/* Milestones Count */}
            <tr>
              <td className="px-4 py-3 text-sm text-basic-500">📍 里程碑數</td>
              {blueprintVersions.map((v) => (
                <td key={v.id} className="px-4 py-3 text-center text-sm text-basic-600">
                  {versions[v.id].milestones.length} 個
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Radar Charts */}
      <div className="grid gap-4 md:grid-cols-3">
        {blueprintVersions.map((v) => {
          const version = versions[v.id];
          const radarData = [
            { label: '金錢', value: version.resources.money },
            { label: '時間', value: version.resources.time },
            { label: '技能', value: version.resources.skills },
            { label: '人脈', value: version.resources.network },
          ];

          return (
            <div key={v.id} className={cn('rounded-xl p-4 text-center', v.bgColor)}>
              <h3 className={cn('mb-2 font-semibold', v.color)}>{v.label}</h3>
              <p className="mb-4 text-sm text-basic-500">{version.title || '尚未設定'}</p>
              <div className="flex justify-center">
                <RadarChart data={radarData} size={180} color={versionColors[v.id]} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
