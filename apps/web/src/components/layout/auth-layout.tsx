'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary-palest to-white p-4',
        className
      )}
    >
      {/* Logo */}
      <Link href="/" className="mb-8 flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-base text-white text-2xl font-bold shadow-lg">
          LD
        </div>
        <h1 className="mt-4 text-2xl font-bold text-basic-600">LifeDesign</h1>
        <p className="text-basic-500">人生設計助手</p>
      </Link>

      {/* Content */}
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-basic-400">
        <p>&copy; 2026 LifeDesign. All rights reserved.</p>
      </footer>
    </div>
  );
}
