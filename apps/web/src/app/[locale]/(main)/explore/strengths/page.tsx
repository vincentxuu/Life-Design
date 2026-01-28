'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StrengthsGrid, StrengthResult } from '@/components/strengths';
import { DEFAULT_STRENGTHS, StrengthItem } from '@/types';
import { Check, RotateCcw } from 'lucide-react';

const MAX_SELECTIONS = 5;

export default function StrengthsPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('strengths');
  const tCommon = useTranslations('common');

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [showResult, setShowResult] = React.useState(false);

  // Get selected strengths in order
  const selectedStrengths: StrengthItem[] = selectedIds.map((id) =>
    DEFAULT_STRENGTHS.find((s) => s.id === id)!
  );

  const handleSelect = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        // Remove
        return prev.filter((x) => x !== id);
      } else if (prev.length < MAX_SELECTIONS) {
        // Add
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleConfirm = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedIds([]);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div>
        <PageHeader
          title={t('resultTitle')}
          description={t('resultDescription')}
        />

        <div className="mx-auto max-w-2xl space-y-6">
          <Card>
            <CardContent className="p-6">
              <StrengthResult selectedStrengths={selectedStrengths} />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              {t('retry')}
            </Button>
            <Button onClick={() => router.push(`/${locale}/explore`)}>
              {tCommon('done')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={t('title')} description={t('description')} />

      <div className="space-y-6">
        {/* Instructions */}
        <div className="rounded-xl bg-amber-50 p-4">
          <p className="text-center text-basic-500">
            <span className="mr-2 text-xl">💡</span>
            {t('instruction')}
          </p>
        </div>

        {/* Selection Progress */}
        <div className="sticky top-0 z-10 rounded-xl bg-white/90 p-4 shadow-md backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-basic-400">{t('selected')}</span>
              <div className="flex gap-2">
                {[...Array(MAX_SELECTIONS)].map((_, index) => (
                  <div
                    key={index}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg transition-all ${
                      selectedStrengths[index]
                        ? 'border-primary-base bg-primary-pale'
                        : 'border-dashed border-basic-300 bg-basic-50'
                    }`}
                  >
                    {selectedStrengths[index]?.icon || index + 1}
                  </div>
                ))}
              </div>
            </div>
            <Button
              size="lg"
              onClick={handleConfirm}
              disabled={selectedIds.length < MAX_SELECTIONS}
            >
              <Check className="mr-2 h-4 w-4" />
              {t('confirm')}
            </Button>
          </div>
          {selectedIds.length < MAX_SELECTIONS && (
            <p className="mt-2 text-center text-sm text-basic-400">
              {t('remaining', { count: MAX_SELECTIONS - selectedIds.length })}
            </p>
          )}
        </div>

        {/* Strengths Grid */}
        <StrengthsGrid
          strengths={DEFAULT_STRENGTHS}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          disabled={selectedIds.length >= MAX_SELECTIONS}
          groupByCategory={true}
        />
      </div>
    </div>
  );
}
