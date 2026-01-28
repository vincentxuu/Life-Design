'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Map, Target } from 'lucide-react';
import { PageHeader } from '@/components/layout';
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DesignPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('nav');
  const tBlueprint = useTranslations('blueprint');

  const items = [
    {
      id: 'blueprint',
      icon: Map,
      href: `/${locale}/design/blueprint`,
      title: tBlueprint('title'),
      description: '設計三種不同版本的人生藍圖',
      color: 'text-blue-500 bg-blue-50',
    },
    {
      id: 'goals',
      icon: Target,
      href: `/${locale}/design/goals`,
      title: 'OKR 目標設定',
      description: '設定並追蹤你的目標與關鍵結果',
      color: 'text-green-500 bg-green-50',
    },
  ];

  return (
    <div>
      <PageHeader
        title={t('design')}
        description="設計你的理想人生藍圖"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.id} href={item.href}>
              <Card variant="interactive" className="h-full">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="mb-2">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
