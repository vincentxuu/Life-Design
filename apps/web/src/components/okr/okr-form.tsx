'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { OBJECTIVE_ICONS, OKRPeriod } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

interface KeyResultInput {
  title: string;
  targetValue: string;
  unit: string;
}

interface OKRFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    icon: string;
    period: OKRPeriod;
    keyResults: KeyResultInput[];
  }) => void;
  onCancel: () => void;
}

export function OKRForm({ onSubmit, onCancel }: OKRFormProps) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedIcon, setSelectedIcon] = React.useState(OBJECTIVE_ICONS[0].icon);
  const [period, setPeriod] = React.useState<OKRPeriod>('quarterly');
  const [keyResults, setKeyResults] = React.useState<KeyResultInput[]>([
    { title: '', targetValue: '', unit: '' },
  ]);

  const handleAddKeyResult = () => {
    setKeyResults([...keyResults, { title: '', targetValue: '', unit: '' }]);
  };

  const handleRemoveKeyResult = (index: number) => {
    setKeyResults(keyResults.filter((_, i) => i !== index));
  };

  const handleKeyResultChange = (
    index: number,
    field: keyof KeyResultInput,
    value: string
  ) => {
    const updated = [...keyResults];
    updated[index][field] = value;
    setKeyResults(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      icon: selectedIcon,
      period,
      keyResults: keyResults.filter((kr) => kr.title.trim()),
    });
  };

  const isValid =
    title.trim() &&
    keyResults.some((kr) => kr.title.trim() && kr.targetValue);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Icon Selection */}
      <div>
        <label className="mb-2 block text-sm font-medium text-basic-600">
          選擇圖標
        </label>
        <div className="flex flex-wrap gap-2">
          {OBJECTIVE_ICONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedIcon(item.icon)}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-xl border-2 text-2xl transition-all',
                selectedIcon === item.icon
                  ? 'border-primary-base bg-primary-pale'
                  : 'border-basic-200 hover:border-primary-base'
              )}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Objective Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-basic-600">
          目標 (Objective)
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例如：提升專業技能"
          className="text-lg"
        />
        <p className="mt-1 text-xs text-basic-400">
          目標應該是具有啟發性的方向性描述
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-basic-600">
          描述 (選填)
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="為什麼這個目標對你很重要？"
          rows={2}
        />
      </div>

      {/* Period */}
      <div>
        <label className="mb-2 block text-sm font-medium text-basic-600">
          週期
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPeriod('quarterly')}
            className={cn(
              'flex-1 rounded-xl border-2 py-3 font-medium transition-all',
              period === 'quarterly'
                ? 'border-primary-base bg-primary-pale text-primary-darker'
                : 'border-basic-200 text-basic-500 hover:border-primary-base'
            )}
          >
            季度目標
          </button>
          <button
            type="button"
            onClick={() => setPeriod('yearly')}
            className={cn(
              'flex-1 rounded-xl border-2 py-3 font-medium transition-all',
              period === 'yearly'
                ? 'border-primary-base bg-primary-pale text-primary-darker'
                : 'border-basic-200 text-basic-500 hover:border-primary-base'
            )}
          >
            年度目標
          </button>
        </div>
      </div>

      {/* Key Results */}
      <div>
        <label className="mb-2 block text-sm font-medium text-basic-600">
          關鍵結果 (Key Results)
        </label>
        <p className="mb-3 text-xs text-basic-400">
          關鍵結果應該是可量化、可驗證的具體成果
        </p>

        <div className="space-y-3">
          {keyResults.map((kr, index) => (
            <div
              key={index}
              className="rounded-xl border border-basic-200 bg-basic-50 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-basic-500">
                  KR {index + 1}
                </span>
                {keyResults.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyResult(index)}
                    className="text-basic-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Input
                value={kr.title}
                onChange={(e) =>
                  handleKeyResultChange(index, 'title', e.target.value)
                }
                placeholder="例如：完成 3 門線上課程"
                className="mb-2"
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={kr.targetValue}
                  onChange={(e) =>
                    handleKeyResultChange(index, 'targetValue', e.target.value)
                  }
                  placeholder="目標數值"
                  className="w-1/2"
                />
                <Input
                  value={kr.unit}
                  onChange={(e) =>
                    handleKeyResultChange(index, 'unit', e.target.value)
                  }
                  placeholder="單位（門、本、次...）"
                  className="w-1/2"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddKeyResult}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-basic-300 p-3 text-basic-400 transition-colors hover:border-primary-base hover:text-primary-base"
          >
            <Plus className="h-4 w-4" />
            <span>新增關鍵結果</span>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          取消
        </Button>
        <Button type="submit" disabled={!isValid} className="flex-1">
          建立目標
        </Button>
      </div>
    </form>
  );
}
