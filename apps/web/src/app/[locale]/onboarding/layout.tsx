'use client';

import { OnboardingLayout } from '@/components/layout';
import { useParams } from 'next/navigation';

export default function OnboardingRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <OnboardingLayout locale={locale}>
      {children}
    </OnboardingLayout>
  );
}
