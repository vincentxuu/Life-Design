'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function OnboardingStep1() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('onboarding');

  const handleStart = () => {
    router.push(`/${locale}/onboarding/step-2`);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {/* Logo Animation */}
      <div className="mb-8 animate-float">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-base to-primary-darker shadow-xl">
          <span className="text-5xl">🌟</span>
        </div>
      </div>

      {/* Welcome Text */}
      <h1 className="mb-4 text-4xl font-bold text-basic-600">
        {t('welcome')}
      </h1>
      <p className="mb-2 text-xl text-primary-base font-semibold">
        {t('subtitle')}
      </p>
      <p className="mb-12 max-w-md text-basic-400">
        透過探索、設計、行動、反思四個步驟，
        <br />
        幫助你找到人生的方向與意義
      </p>

      {/* Features */}
      <div className="mb-12 grid max-w-lg gap-4 text-left">
        {[
          { icon: '🧭', text: '探索你的熱情與使命' },
          { icon: '🎯', text: '設計三軌人生藍圖' },
          { icon: '🌱', text: '建立可持續的微習慣' },
          { icon: '📝', text: '每日反思持續成長' },
        ].map((feature) => (
          <div
            key={feature.text}
            className="flex items-center gap-4 rounded-xl bg-basic-50 p-4"
          >
            <span className="text-2xl">{feature.icon}</span>
            <span className="text-basic-500">{feature.text}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Button size="lg" onClick={handleStart} className="min-w-[200px]">
        {t('letsStart')}
      </Button>
    </div>
  );
}
