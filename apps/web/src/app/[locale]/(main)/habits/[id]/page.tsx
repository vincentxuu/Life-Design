'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  HabitCalendar,
  HabitStatsCard,
  WeeklyTrend,
  StreakBadge,
} from '@/components/habits';
import { mockHabits, mockTodayHabitLogs, mockHabitStats } from '@/mocks';
import { ChevronLeft, Edit, Trash2 } from 'lucide-react';

export default function HabitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const habitId = params.id as string;

  // Find the habit
  const habit = mockHabits.find((h) => h.id === habitId);
  const logs = mockTodayHabitLogs.filter((log) => log.habitId === habitId);
  const stats = mockHabitStats.find((s) => s.habitId === habitId);

  if (!habit) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-basic-500">找不到習慣</p>
        <Button
          variant="outline"
          onClick={() => router.push(`/${locale}/habits`)}
          className="mt-4"
        >
          返回習慣列表
        </Button>
      </div>
    );
  }

  const handleBack = () => {
    router.push(`/${locale}/habits`);
  };

  const handleEdit = () => {
    // Navigate to edit page (using new page with prefilled data)
    router.push(`/${locale}/habits/new?edit=${habitId}`);
  };

  const handleDelete = () => {
    // Would show confirmation dialog
    if (confirm('確定要刪除這個習慣嗎？')) {
      console.log('Deleting habit:', habitId);
      router.push(`/${locale}/habits`);
    }
  };

  return (
    <div>
      <PageHeader
        title={habit.name}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              返回
            </Button>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="mr-1 h-4 w-4" />
              編輯
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="mr-1 h-4 w-4" />
              刪除
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* Streak Banner */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-basic-500">目前連續</p>
              <div className="mt-1">
                <StreakBadge streak={habit.streak} size="lg" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-basic-500">最長記錄</p>
              <p className="text-2xl font-bold text-amber-600">
                {habit.longestStreak} 天
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Habit Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📋</span>
              習慣詳情
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-basic-400">觸發時機</span>
              <span className="font-medium text-basic-600">{habit.trigger}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-basic-400">頻率</span>
              <span className="font-medium text-basic-600">
                {habit.frequency.type === 'daily' ? '每天' : '每週特定日'}
              </span>
            </div>
            {habit.reminderTime && (
              <div className="flex justify-between">
                <span className="text-basic-400">提醒時間</span>
                <span className="font-medium text-basic-600">{habit.reminderTime}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-basic-400">開始日期</span>
              <span className="font-medium text-basic-600">
                {new Date(habit.createdAt).toLocaleDateString('zh-TW')}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        {stats && <HabitStatsCard stats={stats} />}

        {/* Weekly Trend */}
        {stats && <WeeklyTrend data={stats.weeklyData} />}

        {/* Calendar */}
        <HabitCalendar logs={logs} />
      </div>
    </div>
  );
}
