'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ValuesDropZone, ValuesGrid, type ValueItem } from '@/components/values';
import { DEFAULT_VALUES } from '@/mocks';
import { Check } from 'lucide-react';

const MAX_SELECTIONS = 5;

export default function ValuesPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('values');

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [showResult, setShowResult] = React.useState(false);

  // Get selected values in order
  const selectedValues: ValueItem[] = selectedIds.map((id) =>
    DEFAULT_VALUES.find((v) => v.id === id)!
  );

  // Get remaining values (not selected)
  const remainingValues: ValueItem[] = DEFAULT_VALUES.filter(
    (v) => !selectedIds.includes(v.id)
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

  const handleRemove = (id: string) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
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
          title="你的核心價值觀"
          description="這些是對你最重要的五項價值觀"
        />

        <div className="mx-auto max-w-2xl space-y-6">
          {/* Result Display */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {selectedValues.map((value, index) => (
                  <div
                    key={value.id}
                    className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-primary-palest to-transparent p-4"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-base text-lg font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-3xl">{value.icon}</span>
                    <span className="text-xl font-semibold text-basic-600">
                      {value.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insight Card */}
          <Card className="bg-primary-pale">
            <CardContent className="p-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-primary-darker">
                <span>💡</span>
                洞察
              </h3>
              <p className="text-basic-500">
                你最重視的價值觀是
                <strong className="text-primary-darker">
                  {selectedValues[0]?.name}
                </strong>
                與
                <strong className="text-primary-darker">
                  {selectedValues[1]?.name}
                </strong>
                。這些價值觀可以幫助你在做重要決定時保持一致性。
                當面臨選擇時，問問自己：「這個選擇是否符合我的核心價值觀？」
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={handleReset}>
              重新選擇
            </Button>
            <Button onClick={() => router.push(`/${locale}/explore`)}>
              完成
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={t('title')}
        description={t('selectTop5')}
      />

      <div className="mx-auto max-w-3xl space-y-6">
        {/* Instructions */}
        <p className="text-center text-basic-500">
          {t('instruction')}
        </p>

        {/* Drop Zone */}
        <ValuesDropZone
          title={t('topFive')}
          values={selectedValues}
          maxItems={MAX_SELECTIONS}
          onRemove={handleRemove}
          emptyMessage={t('dragHere')}
        />

        {/* Values Grid */}
        <ValuesGrid
          values={remainingValues}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          disabled={selectedIds.length >= MAX_SELECTIONS}
        />

        {/* Confirm Button */}
        <div className="flex flex-col items-center gap-2">
          <Button
            size="lg"
            onClick={handleConfirm}
            disabled={selectedIds.length < MAX_SELECTIONS}
            className="min-w-[200px]"
          >
            <Check className="mr-2 h-4 w-4" />
            {t('confirmValues')}
          </Button>
          {selectedIds.length < MAX_SELECTIONS && (
            <p className="text-sm text-basic-400">
              還需選擇 {MAX_SELECTIONS - selectedIds.length} 項
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
