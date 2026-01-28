'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, Check } from 'lucide-react';
import type { Milestone } from '@/types';

interface MilestoneTimelineProps {
  milestones: Milestone[];
  onChange: (milestones: Milestone[]) => void;
  editable?: boolean;
}

const timeOptions = [
  { value: 6, unit: 'month' as const, label: '6個月' },
  { value: 1, unit: 'year' as const, label: '1年' },
  { value: 2, unit: 'year' as const, label: '2年' },
  { value: 3, unit: 'year' as const, label: '3年' },
  { value: 5, unit: 'year' as const, label: '5年' },
];

export function MilestoneTimeline({
  milestones,
  onChange,
  editable = true,
}: MilestoneTimelineProps) {
  const [newTitle, setNewTitle] = React.useState('');
  const [newDeadline, setNewDeadline] = React.useState(timeOptions[0]);

  const handleAddMilestone = () => {
    if (!newTitle.trim()) return;

    const newMilestone: Milestone = {
      id: `milestone-${Date.now()}`,
      title: newTitle.trim(),
      deadline: {
        type: 'relative',
        value: newDeadline.value,
        unit: newDeadline.unit,
      },
      completed: false,
    };

    onChange([...milestones, newMilestone]);
    setNewTitle('');
  };

  const handleRemoveMilestone = (id: string) => {
    onChange(milestones.filter((m) => m.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    onChange(
      milestones.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      )
    );
  };

  // Sort milestones by deadline
  const sortedMilestones = [...milestones].sort((a, b) => {
    const aValue = a.deadline.value ?? 0;
    const bValue = b.deadline.value ?? 0;
    const aMonths = a.deadline.unit === 'year' ? aValue * 12 : aValue;
    const bMonths = b.deadline.unit === 'year' ? bValue * 12 : bValue;
    return aMonths - bMonths;
  });

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 font-semibold text-basic-600">
        <span>📍</span>
        里程碑時間軸
      </h3>

      {/* Timeline */}
      <div className="relative ml-4 border-l-2 border-basic-200 pl-6">
        {sortedMilestones.map((milestone, index) => {
          const deadlineLabel =
            milestone.deadline.unit === 'year'
              ? `${milestone.deadline.value ?? 0}年`
              : `${milestone.deadline.value ?? 0}個月`;

          return (
            <div
              key={milestone.id}
              className={cn(
                'relative mb-6 last:mb-0',
                milestone.completed && 'opacity-60'
              )}
            >
              {/* Timeline Dot */}
              <div
                className={cn(
                  'absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full border-2',
                  milestone.completed
                    ? 'border-success bg-success'
                    : 'border-primary-base bg-white'
                )}
              >
                {milestone.completed && <Check className="h-2 w-2 text-white" />}
              </div>

              {/* Content */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-medium text-primary-base">
                    {deadlineLabel}
                  </span>
                  <p
                    className={cn(
                      'font-medium text-basic-600',
                      milestone.completed && 'line-through'
                    )}
                  >
                    {milestone.title}
                  </p>
                </div>

                {editable && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleToggleComplete(milestone.id)}
                      className="rounded p-1 text-basic-400 hover:bg-basic-100 hover:text-success"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveMilestone(milestone.id)}
                      className="rounded p-1 text-basic-400 hover:bg-basic-100 hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Add New */}
        {editable && (
          <div className="relative">
            <div className="absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-dashed border-basic-300 bg-white">
              <Plus className="h-2 w-2 text-basic-400" />
            </div>

            <div className="space-y-2 rounded-lg bg-basic-50 p-3">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="新增里程碑..."
                className="text-sm"
              />
              <div className="flex gap-2">
                <select
                  value={`${newDeadline.value}-${newDeadline.unit}`}
                  onChange={(e) => {
                    const [value, unit] = e.target.value.split('-');
                    setNewDeadline({
                      value: Number(value),
                      unit: unit as 'month' | 'year',
                      label: timeOptions.find(
                        (t) => t.value === Number(value) && t.unit === unit
                      )?.label || '',
                    });
                  }}
                  className="flex-1 rounded-md border border-basic-200 px-2 py-1 text-sm"
                >
                  {timeOptions.map((opt) => (
                    <option key={`${opt.value}-${opt.unit}`} value={`${opt.value}-${opt.unit}`}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <Button size="sm" onClick={handleAddMilestone} disabled={!newTitle.trim()}>
                  新增
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
