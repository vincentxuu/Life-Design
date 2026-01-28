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
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export interface SidebarProps {
  locale: string;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export function Sidebar({ locale, isOpen = true, onClose, className }: SidebarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: `/${locale}/dashboard`,
      label: t('dashboard'),
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: `/${locale}/explore`,
      label: t('explore'),
      icon: <Compass className="h-5 w-5" />,
    },
    {
      href: `/${locale}/design`,
      label: t('design'),
      icon: <Target className="h-5 w-5" />,
    },
    {
      href: `/${locale}/habits`,
      label: t('habits'),
      icon: <CheckSquare className="h-5 w-5" />,
    },
    {
      href: `/${locale}/reflect`,
      label: t('reflect'),
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      href: `/${locale}/settings`,
      label: t('settings'),
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-60 border-r border-basic-200 bg-white transition-transform duration-300',
          'md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'bg-primary-pale text-primary-darker'
                  : 'text-basic-500 hover:bg-basic-100 hover:text-basic-600'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
