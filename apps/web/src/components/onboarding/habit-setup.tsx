'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface HabitTemplate {
  id: string;
  icon: string;
  name: string;
  trigger: string;
  duration: string;
}

const habitTemplates: HabitTemplate[] = [
  {
    id: 'meditation',
    icon: '🧘',
    name: '冥想',
    trigger: '起床後',
    duration: '5 分鐘',
  },
  {
    id: 'reading',
    icon: '📚',
    name: '閱讀',
    trigger: '睡前',
    duration: '20 分鐘',
  },
  {
    id: 'exercise',
    icon: '🏃',
    name: '運動',
    trigger: '下班後',
    duration: '30 分鐘',
  },
  {
    id: 'journal',
    icon: '📝',
    name: '寫日記',
    trigger: '睡前',
    duration: '10 分鐘',
  },
  {
    id: 'water',
    icon: '💧',
    name: '喝水',
    trigger: '每小時',
    duration: '1 杯',
  },
  {
    id: 'gratitude',
    icon: '🙏',
    name: '感恩練習',
    trigger: '早上',
    duration: '3 件事',
  },
];

interface HabitSetupProps {
  selectedHabit: string | null;
  customHabit: string;
  onSelectHabit: (id: string) => void;
  onCustomHabitChange: (value: string) => void;
}

export function HabitSetup({
  selectedHabit,
  customHabit,
  onSelectHabit,
  onCustomHabitChange,
}: HabitSetupProps) {
  const [isCustom, setIsCustom] = React.useState(false);

  return (
    <div className="space-y-6">
      <p className="text-center text-basic-500">
        選擇一個微習慣開始，從小目標開始更容易堅持
      </p>

      {/* Habit Templates Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {habitTemplates.map((habit) => (
          <button
            key={habit.id}
            type="button"
            onClick={() => {
              onSelectHabit(habit.id);
              setIsCustom(false);
            }}
            className={cn(
              'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
              'hover:border-primary-base hover:bg-primary-palest',
              selectedHabit === habit.id && !isCustom
                ? 'border-primary-base bg-primary-pale'
                : 'border-basic-200 bg-white'
            )}
          >
            <span className="text-3xl">{habit.icon}</span>
            <span className="font-semibold text-basic-600">{habit.name}</span>
            <span className="text-xs text-basic-400">
              {habit.trigger} · {habit.duration}
            </span>
          </button>
        ))}
      </div>

      {/* Custom Habit */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setIsCustom(true)}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed p-4 transition-all',
            'hover:border-primary-base hover:bg-primary-palest',
            isCustom
              ? 'border-primary-base bg-primary-pale'
              : 'border-basic-300 bg-basic-50'
          )}
        >
          <span className="text-2xl">✨</span>
          <span className="font-medium text-basic-500">自訂習慣</span>
        </button>

        {isCustom && (
          <div className="animate-fade-in space-y-3 rounded-xl bg-white p-4 shadow-md">
            <Input
              value={customHabit}
              onChange={(e) => onCustomHabitChange(e.target.value)}
              placeholder="輸入你想養成的習慣..."
              className="text-center"
            />
            <p className="text-center text-xs text-basic-400">
              💡 提示：用「動詞 + 時間/數量」的方式描述，例如「閱讀 10 分鐘」
            </p>
          </div>
        )}
      </div>

      {/* Selected Habit Preview */}
      {(selectedHabit || (isCustom && customHabit)) && (
        <div className="animate-fade-in rounded-xl bg-success/10 p-4 text-center">
          <p className="text-sm text-success">
            ✓ 太棒了！你選擇了：
            <span className="font-bold">
              {isCustom
                ? customHabit
                : habitTemplates.find((h) => h.id === selectedHabit)?.name}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
