'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  backHref?: string;
  showProgress?: boolean;
  className?: string;
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  onBack,
  backHref,
  showProgress = true,
  className,
}: OnboardingLayoutProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn('flex min-h-screen flex-col bg-white', className)}>
      {/* Header */}
      <header className="flex items-center justify-between border-b border-basic-200 px-4 py-3">
        {/* Back button */}
        {(onBack || backHref) && (
          backHref ? (
            <Link
              href={backHref}
              className="flex items-center gap-1 text-sm text-basic-500 hover:text-basic-600"
            >
              <ArrowLeft className="h-4 w-4" />
              返回
            </Link>
          ) : (
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-sm text-basic-500 hover:text-basic-600"
            >
              <ArrowLeft className="h-4 w-4" />
              返回
            </button>
          )
        )}

        {/* Step indicator */}
        <div className="text-sm text-basic-500">
          步驟 {currentStep} / {totalSteps}
        </div>
      </header>

      {/* Progress bar */}
      {showProgress && (
        <div className="px-4 py-3">
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Content */}
      <main className="flex flex-1 flex-col p-4">
        {children}
      </main>
    </div>
  );
}

// 步驟內容容器
export interface StepContentProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StepContent({
  children,
  title,
  description,
  icon,
  className,
}: StepContentProps) {
  return (
    <div className={cn('flex flex-1 flex-col', className)}>
      {/* Title section */}
      {(title || description || icon) && (
        <div className="mb-8 text-center">
          {icon && <div className="mb-4 text-5xl">{icon}</div>}
          {title && <h2 className="heading-lg text-basic-black">{title}</h2>}
          {description && (
            <p className="mt-2 body-md text-basic-500">{description}</p>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}

// 步驟按鈕區
export interface StepActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function StepActions({ children, className }: StepActionsProps) {
  return (
    <div className={cn('mt-auto pt-6', className)}>
      {children}
    </div>
  );
}
