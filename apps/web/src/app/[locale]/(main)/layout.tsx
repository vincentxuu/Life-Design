'use client';

import { AppShell } from '@/components/layout';
import { mockUser } from '@/mocks';
import { useParams } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = params.locale as string;

  // 使用 Mock 用戶資料
  const user = {
    name: mockUser.name,
    avatar: mockUser.avatar,
  };

  return (
    <AppShell locale={locale} user={user}>
      {children}
    </AppShell>
  );
}
