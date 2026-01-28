'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Flame } from 'lucide-react';
import { PageHeader } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent, StatCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { mockHabits, mockTodayHabitLogs, mockWeeklyCompletionData } from '@/mocks';

export default function HabitsPage() {
  const t = useTranslations('habits');
  const [habits, setHabits] = React.useState(mockHabits);
  const [todayLogs, setTodayLogs] = React.useState(mockTodayHabitLogs);

  const toggleHabit = (habitId: string) => {
    setTodayLogs((prev) =>
      prev.map((log) =>
        log.habitId === habitId ? { ...log, completed: !log.completed } : log
      )
    );
  };

  // 計算統計
  const totalCompletedToday = todayLogs.filter((log) => log.completed).length;
  const totalHabitsToday = habits.filter((h) => !h.archived).length;
  const weeklyRate = Math.round(
    (mockWeeklyCompletionData.reduce((acc, day) => acc + day.rate, 0) /
      mockWeeklyCompletionData.length)
  );
  const longestStreak = Math.max(...habits.map((h) => h.longestStreak));

  return (
    <div>
      <PageHeader
        title={t('title')}
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />}>
            {t('addHabit')}
          </Button>
        }
      />

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          icon={<Flame className="text-orange-500" />}
          label="最長連續"
          value={longestStreak}
          suffix={` ${t('streak')}`}
        />
        <StatCard
          icon="✅"
          label={t('todayHabits')}
          value={`${totalCompletedToday}/${totalHabitsToday}`}
        />
        <StatCard
          icon="📊"
          label={t('weeklyRate')}
          value={`${weeklyRate}%`}
        />
        <StatCard
          icon="🎯"
          label="總習慣數"
          value={habits.length}
        />
      </div>

      {/* Today's Habits */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t('todayHabits')} ({habits.filter((h) => !h.archived).length} 項)</span>
            <Button variant="ghost" size="sm">
              {t('completeAll')} ☐
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {habits.filter((h) => !h.archived).map((habit) => {
              const log = todayLogs.find((l) => l.habitId === habit.id);
              const isCompleted = log?.completed || false;

              return (
                <div
                  key={habit.id}
                  className={`flex items-center justify-between rounded-xl border p-4 transition-colors ${
                    isCompleted
                      ? 'border-primary-lighter bg-primary-palest'
                      : 'border-basic-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={isCompleted}
                      onCheckedChange={() => toggleHabit(habit.id)}
                      className="h-6 w-6"
                    />
                    <div>
                      <p
                        className={`font-medium ${
                          isCompleted ? 'text-basic-400 line-through' : 'text-basic-600'
                        }`}
                      >
                        {habit.name}
                      </p>
                      <p className="text-sm text-basic-400">{habit.trigger}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-600">
                    <Flame className="h-4 w-4" />
                    <span>{habit.streak} {t('streak')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trend */}
      <Card>
        <CardHeader>
          <CardTitle>{t('completionTrend')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-end justify-between gap-2">
            {mockWeeklyCompletionData.map((day, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t bg-primary-base transition-all"
                  style={{ height: `${day.rate}%` }}
                />
                <span className="text-xs text-basic-400">{day.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
