'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { HabitSetup } from '@/components/onboarding';
import { ChevronLeft } from 'lucide-react';

export default function OnboardingStep4() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('onboarding');

  const [selectedHabit, setSelectedHabit] = React.useState<string | null>(null);
  const [customHabit, setCustomHabit] = React.useState('');

  const handleBack = () => {
    router.push(`/${locale}/onboarding/step-3`);
  };

  const handleContinue = () => {
    router.push(`/${locale}/onboarding/step-5`);
  };

  const canContinue = selectedHabit || customHabit.trim().length > 0;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-basic-400 hover:text-basic-600"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>返回</span>
        </button>
        <span className="text-sm text-basic-400">
          {t('step')} 4 {t('of')} 5
        </span>
      </div>

      {/* Title */}
      <div className="mb-8 text-center">
        <div className="mb-4 text-5xl">🌱</div>
        <h1 className="mb-2 text-2xl font-bold text-basic-600">
          設定你的第一個習慣
        </h1>
        <p className="text-basic-400">
          從一個小習慣開始，累積改變的動力
        </p>
      </div>

      {/* Habit Setup */}
      <div className="mb-8">
        <HabitSetup
          selectedHabit={selectedHabit}
          customHabit={customHabit}
          onSelectHabit={setSelectedHabit}
          onCustomHabitChange={setCustomHabit}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={handleContinue}>
          稍後設定
        </Button>
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!canContinue}
          className="min-w-[150px]"
        >
          繼續
        </Button>
      </div>
    </div>
  );
}
