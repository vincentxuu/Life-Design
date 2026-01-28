'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  backHref,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      {/* Back button */}
      {backHref && (
        <Link
          href={backHref}
          className="mb-4 inline-flex items-center gap-1 text-sm text-basic-500 hover:text-basic-600"
        >
          <ArrowLeft className="h-4 w-4" />
          返回
        </Link>
      )}

      {/* Header content */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="heading-lg text-basic-black">{title}</h1>
          {description && (
            <p className="mt-1 body-md text-basic-500">{description}</p>
          )}
        </div>

        {/* Actions */}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
