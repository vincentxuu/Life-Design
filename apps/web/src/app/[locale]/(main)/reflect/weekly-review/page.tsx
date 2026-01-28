'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft, Check, Plus, Trash2 } from 'lucide-react';

type Step = 'review' | 'learnings' | 'plan' | 'result';

interface WeeklyReviewData {
  wins: string[];
  challenges: string[];
  gratitude: string[];
  learnings: string;
  improvements: string;
  nextWeekGoals: string[];
  focus: string;
}

const INITIAL_DATA: WeeklyReviewData = {
  wins: [''],
  challenges: [''],
  gratitude: ['', '', ''],
  learnings: '',
  improvements: '',
  nextWeekGoals: ['', '', ''],
  focus: '',
};

export default function WeeklyReviewPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('weeklyReview');

  const [step, setStep] = React.useState<Step>('review');
  const [data, setData] = React.useState<WeeklyReviewData>(INITIAL_DATA);

  const updateList = (
    field: 'wins' | 'challenges' | 'gratitude' | 'nextWeekGoals',
    index: number,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addListItem = (
    field: 'wins' | 'challenges' | 'gratitude' | 'nextWeekGoals'
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeListItem = (
    field: 'wins' | 'challenges' | 'gratitude' | 'nextWeekGoals',
    index: number
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const steps: { id: Step; label: string }[] = [
    { id: 'review', label: t('stepReview') },
    { id: 'learnings', label: t('stepLearnings') },
    { id: 'plan', label: t('stepPlan') },
    { id: 'result', label: t('stepResult') },
  ];

  const currentIndex = steps.findIndex((s) => s.id === step);

  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1].id);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1].id);
    }
  };

  // --- Step: Review ---
  if (step === 'review') {
    return (
      <div>
        <PageHeader title={t('title')} description={t('description')} />

        {/* Progress */}
        <div className="mx-auto mb-6 max-w-2xl">
          <div className="flex justify-between">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  'flex-1 text-center text-sm',
                  i <= currentIndex ? 'text-primary-base' : 'text-basic-300'
                )}
              >
                <div
                  className={cn(
                    'mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full',
                    i < currentIndex
                      ? 'bg-primary-base text-white'
                      : i === currentIndex
                        ? 'border-2 border-primary-base text-primary-base'
                        : 'border-2 border-basic-200 text-basic-300'
                  )}
                >
                  {i < currentIndex ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-2xl space-y-6">
          {/* Wins */}
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-700">
                <span>🏆</span> {t('wins')}
              </h3>
              <div className="space-y-2">
                {data.wins.map((win, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={win}
                      onChange={(e) => updateList('wins', i, e.target.value)}
                      placeholder={t('winsPlaceholder')}
                      className="flex-1"
                    />
                    {data.wins.length > 1 && (
                      <button
                        onClick={() => removeListItem('wins', i)}
                        className="text-basic-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addListItem('wins')}
                  className="flex items-center gap-1 text-sm text-primary-base hover:underline"
                >
                  <Plus className="h-4 w-4" /> {t('addMore')}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Challenges */}
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-amber-700">
                <span>💪</span> {t('challenges')}
              </h3>
              <div className="space-y-2">
                {data.challenges.map((challenge, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={challenge}
                      onChange={(e) =>
                        updateList('challenges', i, e.target.value)
                      }
                      placeholder={t('challengesPlaceholder')}
                      className="flex-1"
                    />
                    {data.challenges.length > 1 && (
                      <button
                        onClick={() => removeListItem('challenges', i)}
                        className="text-basic-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addListItem('challenges')}
                  className="flex items-center gap-1 text-sm text-primary-base hover:underline"
                >
                  <Plus className="h-4 w-4" /> {t('addMore')}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Gratitude */}
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-pink-700">
                <span>🙏</span> {t('gratitude')}
              </h3>
              <div className="space-y-2">
                {data.gratitude.map((item, i) => (
                  <Input
                    key={i}
                    value={item}
                    onChange={(e) => updateList('gratitude', i, e.target.value)}
                    placeholder={`${t('gratitudePlaceholder')} ${i + 1}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-end">
            <Button onClick={goNext}>
              {t('next')} <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- Step: Learnings ---
  if (step === 'learnings') {
    return (
      <div>
        <PageHeader title={t('learningsTitle')} description={t('learningsDesc')} />

        <div className="mx-auto max-w-2xl space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-blue-700">
                <span>💡</span> {t('learnings')}
              </h3>
              <Textarea
                value={data.learnings}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, learnings: e.target.value }))
                }
                placeholder={t('learningsPlaceholder')}
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-purple-700">
                <span>🔄</span> {t('improvements')}
              </h3>
              <Textarea
                value={data.improvements}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, improvements: e.target.value }))
                }
                placeholder={t('improvementsPlaceholder')}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={goBack}>
              <ChevronLeft className="mr-1 h-4 w-4" /> {t('back')}
            </Button>
            <Button onClick={goNext}>
              {t('next')} <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- Step: Plan ---
  if (step === 'plan') {
    return (
      <div>
        <PageHeader title={t('planTitle')} description={t('planDesc')} />

        <div className="mx-auto max-w-2xl space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-700">
                <span>🎯</span> {t('nextWeekGoals')}
              </h3>
              <div className="space-y-2">
                {data.nextWeekGoals.map((goal, i) => (
                  <Input
                    key={i}
                    value={goal}
                    onChange={(e) =>
                      updateList('nextWeekGoals', i, e.target.value)
                    }
                    placeholder={`${t('goalPlaceholder')} ${i + 1}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-amber-700">
                <span>🔥</span> {t('mainFocus')}
              </h3>
              <Input
                value={data.focus}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, focus: e.target.value }))
                }
                placeholder={t('focusPlaceholder')}
                className="text-lg"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={goBack}>
              <ChevronLeft className="mr-1 h-4 w-4" /> {t('back')}
            </Button>
            <Button onClick={goNext}>
              {t('complete')} <Check className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- Step: Result ---
  return (
    <div>
      <PageHeader title={t('summaryTitle')} description={t('summaryDesc')} />

      <div className="mx-auto max-w-2xl space-y-6">
        {/* Summary */}
        <Card className="bg-gradient-to-br from-primary-palest to-white">
          <CardContent className="space-y-6 p-6">
            {/* Wins */}
            {data.wins.filter(Boolean).length > 0 && (
              <div>
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-green-700">
                  <span>🏆</span> {t('wins')}
                </h4>
                <ul className="space-y-1">
                  {data.wins.filter(Boolean).map((win, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-basic-500">
                      <Check className="h-4 w-4 text-green-500" />
                      {win}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Learning */}
            {data.learnings && (
              <div>
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-700">
                  <span>💡</span> {t('learnings')}
                </h4>
                <p className="text-sm text-basic-500">{data.learnings}</p>
              </div>
            )}

            {/* Next Week Focus */}
            {data.focus && (
              <div className="rounded-xl bg-amber-50 p-4 text-center">
                <span className="text-sm text-amber-600">{t('nextWeekFocus')}</span>
                <p className="mt-1 text-xl font-bold text-amber-700">
                  {data.focus}
                </p>
              </div>
            )}

            {/* Next Week Goals */}
            {data.nextWeekGoals.filter(Boolean).length > 0 && (
              <div>
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-green-700">
                  <span>🎯</span> {t('nextWeekGoals')}
                </h4>
                <ul className="space-y-1">
                  {data.nextWeekGoals.filter(Boolean).map((goal, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-basic-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-base" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => setStep('review')}>
            {t('edit')}
          </Button>
          <Button onClick={() => router.push(`/${locale}/reflect`)}>
            {t('done')}
          </Button>
        </div>
      </div>
    </div>
  );
}
