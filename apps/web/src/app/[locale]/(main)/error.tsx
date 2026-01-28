'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MainError({ error, reset }: ErrorProps) {
  const t = useTranslations('common');
  const router = useRouter();

  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Main section error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-6 pt-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold text-basic-black">{t('error')}</h2>
            <p className="text-sm text-basic-500">
              {error.message || 'Something went wrong while loading this page.'}
            </p>
            {error.digest && (
              <p className="text-xs text-basic-400">
                Error ID: {error.digest}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              leftIcon={<Home className="h-4 w-4" />}
            >
              {t('back')}
            </Button>
            <Button
              onClick={reset}
              leftIcon={<RefreshCw className="h-4 w-4" />}
            >
              {t('retry')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
