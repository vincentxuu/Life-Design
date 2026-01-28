'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { GoalCard } from '@/components/onboarding';
import { ChevronLeft } from 'lucide-react';

interface Goal {
  id: 'careerChange' | 'graduation' | 'midlife' | 'growth';
  icon: string;
}

const goals: Goal[] = [
  { id: 'careerChange', icon: '💼' },
  { id: 'graduation', icon: '🎓' },
  { id: 'midlife', icon: '🔄' },
  { id: 'growth', icon: '🌱' },
];

export default function OnboardingStep2() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('onboarding');
  const tCommon = useTranslations('common');

  const [selectedGoal, setSelectedGoal] = React.useState<string | null>(null);

  const handleBack = () => {
    router.push(`/${locale}/onboarding/step-1`);
  };

  const handleContinue = () => {
    if (selectedGoal) {
      router.push(`/${locale}/onboarding/step-3`);
    }
  };

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
          {t('step')} 2 {t('of')} 5
        </span>
      </div>

      {/* Question */}
      <div className="mb-8 text-center">
        <div className="mb-4 text-5xl">🎯</div>
        <h1 className="mb-2 text-2xl font-bold text-basic-600">
          {t('goalQuestion')}
        </h1>
        <p className="text-basic-400">選擇一個最符合你目前狀況的選項</p>
      </div>

      {/* Goal Grid */}
      <div className="mb-8 grid grid-cols-2 gap-4">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            id={goal.id}
            icon={goal.icon}
            title={t(`goals.${goal.id}`)}
            selected={selectedGoal === goal.id}
            onClick={() => setSelectedGoal(goal.id)}
          />
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!selectedGoal}
          className="min-w-[200px]"
        >
          {tCommon('continue')}
        </Button>
      </div>
    </div>
  );
}
