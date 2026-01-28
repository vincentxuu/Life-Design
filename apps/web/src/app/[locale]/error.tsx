'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('common');

  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-basic-black">{t('error')}</h2>
          <p className="max-w-md text-sm text-basic-500">
            {error.message || 'Something went wrong. Please try again.'}
          </p>
        </div>
        <Button
          onClick={reset}
          leftIcon={<RefreshCw className="h-4 w-4" />}
          className="mt-4"
        >
          {t('retry')}
        </Button>
      </div>
    </div>
  );
}
