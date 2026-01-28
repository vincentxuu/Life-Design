'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResourceSlider } from './resource-slider';
import { MilestoneTimeline } from './milestone-timeline';
import type { BlueprintVersion, Milestone } from '@/types';

interface BlueprintFormProps {
  version: BlueprintVersion;
  onChange: (version: BlueprintVersion) => void;
}

export function BlueprintForm({ version, onChange }: BlueprintFormProps) {
  const handleFieldChange = <K extends keyof BlueprintVersion>(
    field: K,
    value: BlueprintVersion[K]
  ) => {
    onChange({ ...version, [field]: value });
  };

  const handleResourceChange = (
    resource: keyof BlueprintVersion['resources'],
    value: number
  ) => {
    onChange({
      ...version,
      resources: { ...version.resources, [resource]: value },
    });
  };

  return (
    <div className="space-y-6 rounded-2xl bg-white p-6 shadow-lg">
      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-basic-600">標題</label>
        <Input
          value={version.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          placeholder="例如：成為資深軟體工程師"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-basic-600">描述</label>
        <Textarea
          value={version.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          placeholder="描述這個版本的人生藍圖..."
          rows={4}
        />
      </div>

      {/* Resources */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-semibold text-basic-600">
          <span>📊</span>
          資源需求評估
        </h3>

        <ResourceSlider
          label="金錢"
          icon="💰"
          value={version.resources.money}
          onChange={(v) => handleResourceChange('money', v)}
          color="bg-amber-500"
        />

        <ResourceSlider
          label="時間"
          icon="⏰"
          value={version.resources.time}
          onChange={(v) => handleResourceChange('time', v)}
          color="bg-blue-500"
        />

        <ResourceSlider
          label="技能"
          icon="🛠"
          value={version.resources.skills}
          onChange={(v) => handleResourceChange('skills', v)}
          color="bg-emerald-500"
        />

        <ResourceSlider
          label="人脈"
          icon="👥"
          value={version.resources.network}
          onChange={(v) => handleResourceChange('network', v)}
          color="bg-purple-500"
        />
      </div>

      {/* Confidence */}
      <div className="space-y-2">
        <h3 className="flex items-center justify-between font-semibold text-basic-600">
          <div className="flex items-center gap-2">
            <span>💪</span>
            信心指數
          </div>
          <span className="text-2xl font-bold text-primary-base">
            {version.confidence}/10
          </span>
        </h3>

        <div className="flex gap-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleFieldChange('confidence', index + 1)}
              className={`h-3 flex-1 rounded-full transition-all ${
                index < version.confidence
                  ? 'bg-primary-base'
                  : 'bg-basic-200 hover:bg-basic-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Milestones */}
      <MilestoneTimeline
        milestones={version.milestones}
        onChange={(milestones) => handleFieldChange('milestones', milestones)}
      />
    </div>
  );
}
