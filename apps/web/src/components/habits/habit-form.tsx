'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lightbulb } from 'lucide-react';

const TRIGGERS = [
  { id: 'morning', label: '起床後', icon: '🌅' },
  { id: 'afternoon', label: '午餐後', icon: '☀️' },
  { id: 'evening', label: '下班後', icon: '🌆' },
  { id: 'night', label: '睡前', icon: '🌙' },
];

const FREQUENCIES = [
  { id: 'daily', label: '每天' },
  { id: 'weekly', label: '每週特定日' },
  { id: 'custom', label: '自訂' },
];

const WEEKDAYS = [
  { id: 0, label: '日' },
  { id: 1, label: '一' },
  { id: 2, label: '二' },
  { id: 3, label: '三' },
  { id: 4, label: '四' },
  { id: 5, label: '五' },
  { id: 6, label: '六' },
];

interface HabitFormData {
  name: string;
  trigger: string;
  frequencyType: 'daily' | 'weekly' | 'custom';
  daysOfWeek: number[];
  reminderTime: string;
}

interface HabitFormProps {
  initialData?: Partial<HabitFormData>;
  onSubmit: (data: HabitFormData) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export function HabitForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = '建立習慣',
}: HabitFormProps) {
  const [formData, setFormData] = React.useState<HabitFormData>({
    name: initialData?.name || '',
    trigger: initialData?.trigger || TRIGGERS[0].label,
    frequencyType: initialData?.frequencyType || 'daily',
    daysOfWeek: initialData?.daysOfWeek || [0, 1, 2, 3, 4, 5, 6],
    reminderTime: initialData?.reminderTime || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleDayOfWeek = (dayId: number) => {
    setFormData((prev) => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(dayId)
        ? prev.daysOfWeek.filter((d) => d !== dayId)
        : [...prev.daysOfWeek, dayId].sort((a, b) => a - b),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Habit Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-basic-600">習慣名稱</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="例如：閱讀 20 分鐘"
          required
        />
        <div className="flex items-start gap-2 rounded-lg bg-tips/10 p-3">
          <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-tips" />
          <p className="text-sm text-basic-500">
            微習慣提示：從小目標開始更容易堅持。
            試著用「動詞 + 時間/數量」的方式描述。
          </p>
        </div>
      </div>

      {/* Trigger */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-basic-600">觸發時機</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TRIGGERS.map((trigger) => (
            <button
              key={trigger.id}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, trigger: trigger.label }))}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all',
                formData.trigger === trigger.label
                  ? 'border-primary-base bg-primary-pale'
                  : 'border-basic-200 hover:border-primary-base/50'
              )}
            >
              <span className="text-xl">{trigger.icon}</span>
              <span className="text-sm font-medium">{trigger.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Frequency */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-basic-600">頻率</label>
        <div className="flex gap-2">
          {FREQUENCIES.map((freq) => (
            <button
              key={freq.id}
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  frequencyType: freq.id as HabitFormData['frequencyType'],
                  daysOfWeek:
                    freq.id === 'daily' ? [0, 1, 2, 3, 4, 5, 6] : prev.daysOfWeek,
                }))
              }
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                formData.frequencyType === freq.id
                  ? 'bg-primary-base text-white'
                  : 'bg-basic-100 text-basic-500 hover:bg-basic-200'
              )}
            >
              {freq.label}
            </button>
          ))}
        </div>

        {/* Days of Week Selector */}
        {formData.frequencyType === 'weekly' && (
          <div className="flex justify-center gap-2">
            {WEEKDAYS.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => toggleDayOfWeek(day.id)}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all',
                  formData.daysOfWeek.includes(day.id)
                    ? 'bg-primary-base text-white'
                    : 'bg-basic-100 text-basic-500 hover:bg-basic-200'
                )}
              >
                {day.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reminder Time */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-basic-600">提醒時間 (選填)</label>
        <Input
          type="time"
          value={formData.reminderTime}
          onChange={(e) => setFormData((prev) => ({ ...prev, reminderTime: e.target.value }))}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            取消
          </Button>
        )}
        <Button type="submit" className="flex-1" disabled={!formData.name.trim()}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
