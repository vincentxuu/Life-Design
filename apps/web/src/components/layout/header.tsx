'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface HeaderProps {
  user?: {
    name: string;
    avatar?: string;
  };
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  className?: string;
}

export function Header({ user, onMenuToggle, isMenuOpen, className }: HeaderProps) {
  const t = useTranslations('nav');

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-16 items-center justify-between border-b border-basic-200 bg-white px-4 md:px-6',
        className
      )}
    >
      {/* Left section: Menu button (mobile) + Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuToggle}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-base text-white font-bold">
            LD
          </div>
          <span className="hidden font-semibold text-basic-600 sm:inline-block">
            LifeDesign
          </span>
        </Link>
      </div>

      {/* Right section: User menu */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-basic-600 md:inline-block">
              {user.name}
            </span>
            <Avatar size="sm">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Link href="/login" className={buttonVariants({ variant: 'primary', size: 'sm' })}>
            登入
          </Link>
        )}
      </div>
    </header>
  );
}
