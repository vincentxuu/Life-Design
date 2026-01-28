'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CompletionCelebration } from '@/components/onboarding';
import { mockUser } from '@/mocks';

export default function OnboardingStep5() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const handleGoToDashboard = () => {
    router.push(`/${locale}/dashboard`);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Step Indicator */}
      <div className="mb-8 text-center">
        <span className="rounded-full bg-success/20 px-4 py-1 text-sm font-medium text-success">
          ✓ 完成
        </span>
      </div>

      {/* Celebration Content */}
      <CompletionCelebration userName={mockUser.name} />

      {/* CTA Button */}
      <div className="mt-8 flex justify-center">
        <Button
          size="lg"
          onClick={handleGoToDashboard}
          className="min-w-[250px]"
        >
          開始我的人生設計之旅 →
        </Button>
      </div>
    </div>
  );
}
