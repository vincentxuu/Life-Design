'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Flame, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { Card, StatCard, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { getGreeting } from '@/lib/utils';
import { mockUser, mockHabits, mockTodayHabitLogs, mockUserBadges, getRecentBadges } from '@/mocks';

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const greeting = getGreeting();

  // 計算今日習慣完成數
  const todayCompletedHabits = mockTodayHabitLogs.filter((log) => log.completed).length;
  const totalTodayHabits = mockHabits.filter((h) => !h.archived).length;

  // 獲取最近徽章
  const recentBadges = getRecentBadges(mockUserBadges, 3);

  // 週進度（模擬）
  const weeklyProgress = 75;
  const goalsCompleted = 3;
  const totalGoals = 4;

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="animate-fade-in">
        <h1 className="heading-lg text-basic-black">
          {t(`greeting.${greeting}`)}，{mockUser.name}！
        </h1>
        <p className="mt-1 body-md text-basic-500">{t('encouragement')}</p>
      </div>

      {/* Daily Overview Cards */}
      <section>
        <h2 className="heading-sm mb-4 text-basic-600">{t('dailyOverview')}</h2>
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            icon={<Flame className="text-orange-500" />}
            label={t('streak')}
            value={15}
          />
          <StatCard
            icon="✅"
            label={t('todayHabits')}
            value={`${todayCompletedHabits}/${totalTodayHabits}`}
          />
          <StatCard
            icon={<FileText className="text-primary-base" />}
            label={t('todayReflection')}
            value={t('pending')}
          />
        </div>
      </section>

      {/* Two column layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Habits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t('quickHabitCheck')}</span>
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                {tCommon('viewAll')}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockHabits.slice(0, 4).map((habit) => {
                const log = mockTodayHabitLogs.find((l) => l.habitId === habit.id);
                const isCompleted = log?.completed || false;

                return (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between rounded-lg border border-basic-200 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox checked={isCompleted} />
                      <div>
                        <p className="text-sm font-medium text-basic-600">
                          {habit.name}
                        </p>
                        <p className="text-xs text-basic-400">{habit.trigger}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-orange-500">
                      <Flame className="h-4 w-4" />
                      <span>{habit.streak}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Compass Preview */}
        <Card>
          <CardHeader>
            <CardTitle>{t('compassPreview')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-4">
              {/* Simple compass visualization placeholder */}
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full border-4 border-primary-lighter" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-primary-pale" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
              <Button variant="link" className="mt-4">
                {t('viewFullCompass')} →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t('recentBadges')}</span>
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                {tCommon('viewAll')}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {recentBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-palest text-2xl">
                    {badge.icon}
                  </div>
                  <span className="text-xs text-basic-500">{badge.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>{t('weeklyProgress')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={weeklyProgress} showLabel className="mb-4" />
            <p className="text-sm text-basic-500">
              {t('goalsCompleted')} {goalsCompleted}/{totalGoals}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
