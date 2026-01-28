'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadarChart, ScoreSlider } from '@/components/life-score';
import { LIFE_DIMENSIONS } from '@/types';
import { RotateCcw } from 'lucide-react';

export default function LifeScorePage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('lifeScore');

  const [scores, setScores] = React.useState<Record<string, number>>(
    Object.fromEntries(LIFE_DIMENSIONS.map((d) => [d.id, 5]))
  );
  const [showResult, setShowResult] = React.useState(false);

  const handleScoreChange = (id: string, value: number) => {
    setScores((prev) => ({ ...prev, [id]: value }));
  };

  const avgScore =
    Math.round(
      (Object.values(scores).reduce((a, b) => a + b, 0) /
        LIFE_DIMENSIONS.length) *
        10
    ) / 10;

  const highAreas = LIFE_DIMENSIONS.filter((d) => scores[d.id] >= 8);
  const lowAreas = LIFE_DIMENSIONS.filter((d) => scores[d.id] <= 4);

  if (showResult) {
    return (
      <div>
        <PageHeader
          title={t('resultTitle')}
          description={t('resultDescription')}
        />

        <div className="mx-auto max-w-2xl space-y-6">
          {/* Radar Chart */}
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <RadarChart
                labels={LIFE_DIMENSIONS.map((d) => `${d.icon} ${d.name}`)}
                values={LIFE_DIMENSIONS.map((d) => scores[d.id])}
              />
              <div className="mt-4 text-center">
                <span className="text-4xl font-bold text-primary-base">
                  {avgScore}
                </span>
                <span className="text-lg text-basic-400"> / 10</span>
                <p className="mt-1 text-sm text-basic-400">{t('avgScore')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-semibold text-basic-600">
                {t('breakdown')}
              </h3>
              <div className="space-y-3">
                {LIFE_DIMENSIONS.map((dim) => (
                  <div key={dim.id} className="flex items-center gap-3">
                    <span className="text-xl">{dim.icon}</span>
                    <span className="w-16 text-sm font-medium text-basic-600">
                      {dim.name}
                    </span>
                    <div className="flex-1">
                      <div className="h-3 overflow-hidden rounded-full bg-basic-100">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            scores[dim.id] >= 8
                              ? 'bg-green-500'
                              : scores[dim.id] >= 5
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                          }`}
                          style={{ width: `${scores[dim.id] * 10}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-8 text-right font-bold text-basic-600">
                      {scores[dim.id]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <div className="grid gap-4 md:grid-cols-2">
            {highAreas.length > 0 && (
              <Card className="bg-green-50">
                <CardContent className="p-4">
                  <h4 className="mb-2 font-semibold text-green-700">
                    {t('strengths')}
                  </h4>
                  <ul className="space-y-1">
                    {highAreas.map((d) => (
                      <li key={d.id} className="flex items-center gap-2 text-sm text-basic-500">
                        <span>{d.icon}</span>
                        {d.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            {lowAreas.length > 0 && (
              <Card className="bg-amber-50">
                <CardContent className="p-4">
                  <h4 className="mb-2 font-semibold text-amber-700">
                    {t('improvements')}
                  </h4>
                  <ul className="space-y-1">
                    {lowAreas.map((d) => (
                      <li key={d.id} className="flex items-center gap-2 text-sm text-basic-500">
                        <span>{d.icon}</span>
                        {d.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Tip */}
          <Card className="bg-primary-pale">
            <CardContent className="p-4">
              <p className="text-sm text-basic-500">
                <span className="mr-1 font-semibold text-primary-darker">💡 {t('tipTitle')}:</span>
                {t('tipContent')}
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setShowResult(false)}>
              <RotateCcw className="mr-2 h-4 w-4" />
              {t('retake')}
            </Button>
            <Button onClick={() => router.push(`/${locale}/explore`)}>
              {t('done')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={t('title')} description={t('description')} />

      <div className="mx-auto max-w-2xl space-y-6">
        <p className="text-center text-basic-500">
          {t('instruction')}
        </p>

        {/* Sliders */}
        <div className="space-y-4">
          {LIFE_DIMENSIONS.map((dim) => (
            <ScoreSlider
              key={dim.id}
              label={dim.name}
              icon={dim.icon}
              description={dim.description}
              value={scores[dim.id]}
              onChange={(v) => handleScoreChange(dim.id, v)}
            />
          ))}
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <Button size="lg" onClick={() => setShowResult(true)} className="min-w-[200px]">
            {t('viewResult')}
          </Button>
        </div>
      </div>
    </div>
  );
}
