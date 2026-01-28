'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Compass,
  Home,
  Target,
  CheckSquare,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MobileTabBarProps {
  locale: string;
  className?: string;
}

export function MobileTabBar({ locale, className }: MobileTabBarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const tabs = [
    {
      href: `/${locale}/dashboard`,
      label: t('dashboard'),
      icon: Home,
    },
    {
      href: `/${locale}/explore`,
      label: t('explore'),
      icon: Compass,
    },
    {
      href: `/${locale}/design`,
      label: t('design'),
      icon: Target,
    },
    {
      href: `/${locale}/habits`,
      label: t('habits'),
      icon: CheckSquare,
    },
    {
      href: `/${locale}/reflect`,
      label: t('reflect'),
      icon: BookOpen,
    },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-basic-200 bg-white md:hidden',
        className
      )}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = isActive(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors',
              active ? 'text-primary-base' : 'text-basic-400'
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
