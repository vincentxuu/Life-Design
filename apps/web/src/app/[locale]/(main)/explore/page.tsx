'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Compass, Heart, Star } from 'lucide-react';
import { PageHeader } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const exploreItems = [
  {
    id: 'compass',
    icon: Compass,
    href: '/explore/compass',
    color: 'text-primary-base bg-primary-palest',
  },
  {
    id: 'values',
    icon: Heart,
    href: '/explore/values',
    color: 'text-pink-500 bg-pink-50',
  },
  {
    id: 'strengths',
    icon: Star,
    href: '/explore/strengths',
    color: 'text-amber-500 bg-amber-50',
  },
];

export default function ExplorePage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('nav');
  const tCompass = useTranslations('compass');
  const tValues = useTranslations('values');

  const items = [
    {
      id: 'compass',
      icon: Compass,
      href: `/${locale}/explore/compass`,
      title: tCompass('title'),
      description: '透過四個面向探索你的人生意義',
      color: 'text-primary-base bg-primary-palest',
    },
    {
      id: 'values',
      icon: Heart,
      href: `/${locale}/explore/values`,
      title: tValues('title'),
      description: '找出對你最重要的核心價值觀',
      color: 'text-pink-500 bg-pink-50',
    },
    {
      id: 'strengths',
      icon: Star,
      href: `/${locale}/explore/strengths`,
      title: '優勢探索',
      description: '發現你的天賦與優勢',
      color: 'text-amber-500 bg-amber-50',
    },
  ];

  return (
    <div>
      <PageHeader
        title={t('explore')}
        description="探索自我，發現你的熱情、價值觀和優勢"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
