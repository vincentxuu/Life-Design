'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { SimpleCompass } from '@/components/onboarding';
import { ChevronLeft } from 'lucide-react';

export default function OnboardingStep3() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('onboarding');

  const [compassValues, setCompassValues] = React.useState<Record<string, string>>({});

  const handleBack = () => {
    router.push(`/${locale}/onboarding/step-2`);
  };

  const handleContinue = () => {
    router.push(`/${locale}/onboarding/step-4`);
  };

  const handleCompassChange = (id: string, value: string) => {
    setCompassValues((prev) => ({ ...prev, [id]: value }));
  };

  const filledCount = Object.values(compassValues).filter(Boolean).length;
  const canContinue = filledCount >= 1; // 至少填寫一項

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
          {t('step')} 3 {t('of')} 5
        </span>
      </div>

      {/* Title */}
      <div className="mb-8 text-center">
        <div className="mb-4 text-5xl">🧭</div>
        <h1 className="mb-2 text-2xl font-bold text-basic-600">
          簡易意義羅盤
        </h1>
        <p className="text-basic-400">
          快速探索你的熱愛、使命、專業與職業
          <br />
          <span className="text-sm">(你可以之後再完成更詳細的問答)</span>
        </p>
      </div>

      {/* Simple Compass */}
      <div className="mb-8">
        <SimpleCompass
          values={compassValues}
          onChange={handleCompassChange}
        />
      </div>

      {/* Progress Indicator */}
      <div className="mb-6 text-center text-sm text-basic-400">
        已填寫 {filledCount} / 4 項
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={handleContinue}>
          稍後再說
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
