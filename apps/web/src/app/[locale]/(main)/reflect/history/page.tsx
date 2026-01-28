'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout';
import { Button } from '@/components/ui/button';
import {
  ReflectionCalendar,
  ReflectionCard,
  MoodTrendChart,
} from '@/components/reflection';
import { mockReflections, mockMoodTrends } from '@/mocks';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReflectionHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('reflection');

  const [currentDate, setCurrentDate] = React.useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Filter reflections for current month
  const monthReflections = mockReflections.filter((r) => {
    const rDate = new Date(r.date);
    return rDate.getFullYear() === year && rDate.getMonth() === month;
  });

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    if (next <= new Date()) {
      setCurrentDate(next);
    }
  };

  const handleDateClick = (date: string) => {
    // Navigate to that day's reflection or create new
    router.push(`/${locale}/reflect?date=${date}`);
  };

  const handleBack = () => {
    router.push(`/${locale}/reflect`);
  };

  const canGoNext = new Date(year, month + 1, 1) <= new Date();

  return (
    <div>
      <PageHeader
        title={t('history')}
        description="查看過去的反思記錄與心情變化"
        action={
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            返回今日
          </Button>
        }
      />

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Mood Trend Chart */}
        <MoodTrendChart data={mockMoodTrends} height={200} />

        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            上個月
          </Button>
          <span className="font-semibold text-basic-600">
            {year}年 {month + 1}月
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextMonth}
            disabled={!canGoNext}
          >
            下個月
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Calendar */}
        <ReflectionCalendar
          reflections={mockReflections}
          year={year}
          month={month}
          onDateClick={handleDateClick}
        />

        {/* Month Reflections List */}
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 font-semibold text-basic-600">
            <span>📝</span>
            本月反思記錄 ({monthReflections.length} 篇)
          </h3>

          {monthReflections.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {monthReflections
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((reflection) => (
                  <ReflectionCard
                    key={reflection.id}
                    reflection={reflection}
                    onClick={() => handleDateClick(reflection.date)}
                  />
                ))}
            </div>
          ) : (
            <div className="rounded-xl bg-basic-50 p-8 text-center">
              <p className="text-basic-400">這個月還沒有反思記錄</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.push(`/${locale}/reflect`)}
              >
                開始今日反思
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
