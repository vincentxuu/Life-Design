'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { HabitForm } from '@/components/habits';

export default function NewHabitPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('habits');

  const handleSubmit = (data: {
    name: string;
    trigger: string;
    frequencyType: 'daily' | 'weekly' | 'custom';
    daysOfWeek: number[];
    reminderTime: string;
  }) => {
    console.log('Creating habit:', data);
    // Would call API to create habit
    router.push(`/${locale}/habits`);
  };

  const handleCancel = () => {
    router.push(`/${locale}/habits`);
  };

  return (
    <div>
      <PageHeader
        title={t('addHabit')}
        description="從一個小習慣開始，累積改變的動力"
      />

      <div className="mx-auto max-w-lg">
        <Card>
          <CardContent className="p-6">
            <HabitForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitLabel={t('createHabit')}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
