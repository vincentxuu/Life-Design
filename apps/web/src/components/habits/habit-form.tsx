'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lightbulb } from 'lucide-react';

// Trigger IDs that map to i18n keys
const TRIGGER_IDS = ['morning', 'lunch', 'evening', 'night'] as const;
const TRIGGER_ICONS: Record<string, string> = {
  morning: '🌅',
  lunch: '☀️',
  evening: '🌆',
  night: '🌙',
};

// Frequency IDs
const FREQUENCY_IDS = ['daily', 'weekly', 'custom'] as const;

// Weekday IDs
const WEEKDAY_IDS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

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
  submitLabel,
}: HabitFormProps) {
  const t = useTranslations('habits');
  const tCommon = useTranslations('common');

  const [formData, setFormData] = React.useState<HabitFormData>({
    name: initialData?.name || '',
    trigger: initialData?.trigger || 'morning',
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
        <label className="text-sm font-medium text-basic-600">{t('habitName')}</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          placeholder={t('habitNamePlaceholder')}
          required
        />
        <div className="flex items-start gap-2 rounded-lg bg-tips/10 p-3">
          <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-tips" />
          <p className="text-sm text-basic-500">{t('microHabitTip')}</p>
        </div>
      </div>

      {/* Trigger */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-basic-600">{t('trigger')}</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TRIGGER_IDS.map((triggerId) => (
            <button
              key={triggerId}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, trigger: triggerId }))}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all',
                formData.trigger === triggerId
                  ? 'border-primary-base bg-primary-pale'
                  : 'border-basic-200 hover:border-primary-base/50'
              )}
            >
              <span className="text-xl">{TRIGGER_ICONS[triggerId]}</span>
              <span className="text-sm font-medium">{t(`triggers.${triggerId}`)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Frequency */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-basic-600">{t('frequency')}</label>
        <div className="flex gap-2">
          {FREQUENCY_IDS.map((freqId) => (
            <button
              key={freqId}
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  frequencyType: freqId as HabitFormData['frequencyType'],
                  daysOfWeek:
                    freqId === 'daily' ? [0, 1, 2, 3, 4, 5, 6] : prev.daysOfWeek,
                }))
              }
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                formData.frequencyType === freqId
                  ? 'bg-primary-base text-white'
                  : 'bg-basic-100 text-basic-500 hover:bg-basic-200'
              )}
            >
              {t(freqId)}
            </button>
          ))}
        </div>

        {/* Days of Week Selector */}
        {formData.frequencyType === 'weekly' && (
          <div className="flex justify-center gap-2">
            {WEEKDAY_IDS.map((dayId, index) => (
              <button
                key={dayId}
                type="button"
                onClick={() => toggleDayOfWeek(index)}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all',
                  formData.daysOfWeek.includes(index)
                    ? 'bg-primary-base text-white'
                    : 'bg-basic-100 text-basic-500 hover:bg-basic-200'
                )}
              >
                {t(`weekdays.${dayId}`)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reminder Time */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-basic-600">{t('reminderTimeOptional')}</label>
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
            {tCommon('cancel')}
          </Button>
        )}
        <Button type="submit" className="flex-1" disabled={!formData.name.trim()}>
          {submitLabel || t('createHabit')}
        </Button>
      </div>
    </form>
  );
}
