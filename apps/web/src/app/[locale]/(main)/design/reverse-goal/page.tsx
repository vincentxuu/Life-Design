'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TIMESPAN_OPTIONS, ReverseGoalMilestone } from '@/types';
import { cn } from '@/lib/utils';
import { Plus, Trash2, ArrowDown, Flag, Target } from 'lucide-react';

type Step = 'vision' | 'milestones' | 'result';

export default function ReverseGoalPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('reverseGoal');

  const [step, setStep] = React.useState<Step>('vision');
  const [idealEnd, setIdealEnd] = React.useState('');
  const [timespan, setTimespan] = React.useState<string>('5year');
  const [milestones, setMilestones] = React.useState<ReverseGoalMilestone[]>([]);

  const selectedTimespan = TIMESPAN_OPTIONS.find((o) => o.id === timespan);

  const generateMilestoneLabels = () => {
    const years = selectedTimespan?.years || 5;
    const labels: string[] = [];
    if (years >= 10) {
      labels.push('10 年後', '5 年後', '3 年後', '1 年後', '6 個月後', '本月');
    } else if (years >= 5) {
      labels.push('5 年後', '3 年後', '1 年後', '6 個月後', '本月');
    } else if (years >= 3) {
      labels.push('3 年後', '1 年後', '6 個月後', '3 個月後', '本月');
    } else {
      labels.push('1 年後', '6 個月後', '3 個月後', '1 個月後', '本週');
    }
    return labels;
  };

  const handleStartMilestones = () => {
    const labels = generateMilestoneLabels();
    setMilestones(
      labels.map((label, i) => ({
        id: String(i),
        title: '',
        timeframe: label,
        actions: [''],
      }))
    );
    setStep('milestones');
  };

  const handleMilestoneChange = (index: number, title: string) => {
    const updated = [...milestones];
    updated[index].title = title;
    setMilestones(updated);
  };

  const handleActionChange = (
    milestoneIndex: number,
    actionIndex: number,
    value: string
  ) => {
    const updated = [...milestones];
    updated[milestoneIndex].actions[actionIndex] = value;
    setMilestones(updated);
  };

  const handleAddAction = (milestoneIndex: number) => {
    const updated = [...milestones];
    updated[milestoneIndex].actions.push('');
    setMilestones(updated);
  };

  const handleRemoveAction = (milestoneIndex: number, actionIndex: number) => {
    const updated = [...milestones];
    updated[milestoneIndex].actions = updated[milestoneIndex].actions.filter(
      (_, i) => i !== actionIndex
    );
    setMilestones(updated);
  };

  // --- Step: Vision ---
  if (step === 'vision') {
    return (
      <div>
        <PageHeader title={t('title')} description={t('description')} />

        <div className="mx-auto max-w-2xl space-y-6">
          {/* Introduction */}
          <Card className="bg-primary-pale">
            <CardContent className="p-4">
              <p className="text-sm text-basic-500">
                <span className="font-semibold text-primary-darker">💡 {t('howItWorks')}:</span>{' '}
                {t('howItWorksDesc')}
              </p>
            </CardContent>
          </Card>

          {/* Timespan */}
          <div>
            <label className="mb-2 block text-sm font-medium text-basic-600">
              {t('timespanLabel')}
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TIMESPAN_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setTimespan(option.id)}
                  className={cn(
                    'rounded-xl border-2 py-3 text-center font-medium transition-all',
                    timespan === option.id
                      ? 'border-primary-base bg-primary-pale text-primary-darker'
                      : 'border-basic-200 text-basic-500 hover:border-primary-base'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ideal End */}
          <div>
            <label className="mb-2 block text-sm font-medium text-basic-600">
              {t('visionLabel', { timespan: selectedTimespan?.label || '' })}
            </label>
            <Textarea
              value={idealEnd}
              onChange={(e) => setIdealEnd(e.target.value)}
              placeholder={t('visionPlaceholder')}
              rows={5}
              className="text-lg"
            />
          </div>

          {/* Start */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleStartMilestones}
              disabled={!idealEnd.trim()}
              className="min-w-[200px]"
            >
              {t('startReverse')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- Step: Milestones ---
  if (step === 'milestones') {
    return (
      <div>
        <PageHeader
          title={t('milestonesTitle')}
          description={t('milestonesDescription')}
        />

        <div className="mx-auto max-w-2xl space-y-4">
          {/* Vision Summary */}
          <Card className="bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Flag className="mt-0.5 h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-amber-700">
                    {t('yourVision', { timespan: selectedTimespan?.label || '' })}
                  </p>
                  <p className="mt-1 text-sm text-basic-500">{idealEnd}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones Timeline */}
          <div className="space-y-2">
            {milestones.map((milestone, index) => (
              <React.Fragment key={milestone.id}>
                {index > 0 && (
                  <div className="flex justify-center">
                    <ArrowDown className="h-5 w-5 text-basic-300" />
                  </div>
                )}
                <Card>
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white',
                          index === 0
                            ? 'bg-primary-base'
                            : index === milestones.length - 1
                              ? 'bg-green-500'
                              : 'bg-basic-400'
                        )}
                      >
                        {index === 0 ? (
                          <Flag className="h-4 w-4" />
                        ) : index === milestones.length - 1 ? (
                          <Target className="h-4 w-4" />
                        ) : (
                          milestones.length - index
                        )}
                      </span>
                      <span className="font-semibold text-basic-600">
                        {milestone.timeframe}
                      </span>
                    </div>

                    {/* Milestone Goal */}
                    <Input
                      value={milestone.title}
                      onChange={(e) =>
                        handleMilestoneChange(index, e.target.value)
                      }
                      placeholder={t('milestonePlaceholder')}
                      className="mb-3"
                    />

                    {/* Actions */}
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-basic-400">
                        {t('actions')}
                      </span>
                      {milestone.actions.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex gap-2">
                          <Input
                            value={action}
                            onChange={(e) =>
                              handleActionChange(
                                index,
                                actionIndex,
                                e.target.value
                              )
                            }
                            placeholder={t('actionPlaceholder')}
                            className="flex-1"
                          />
                          {milestone.actions.length > 1 && (
                            <button
                              onClick={() =>
                                handleRemoveAction(index, actionIndex)
                              }
                              className="text-basic-400 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddAction(index)}
                        className="flex items-center gap-1 text-xs text-primary-base hover:underline"
                      >
                        <Plus className="h-3 w-3" />
                        {t('addAction')}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </React.Fragment>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 pt-4">
            <Button variant="outline" onClick={() => setStep('vision')}>
              {t('back')}
            </Button>
            <Button size="lg" onClick={() => setStep('result')}>
              {t('viewPlan')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- Step: Result ---
  return (
    <div>
      <PageHeader
        title={t('planTitle')}
        description={t('planDescription')}
      />

      <div className="mx-auto max-w-2xl space-y-6">
        {/* Final Vision */}
        <Card className="border-primary-base bg-gradient-to-br from-primary-palest to-white">
          <CardContent className="p-6 text-center">
            <Flag className="mx-auto mb-3 h-8 w-8 text-primary-base" />
            <h3 className="text-lg font-bold text-primary-darker">
              {t('yourVision', { timespan: selectedTimespan?.label || '' })}
            </h3>
            <p className="mt-2 text-basic-500">{idealEnd}</p>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="relative space-y-6 pl-8">
          <div className="absolute bottom-0 left-3 top-0 w-0.5 bg-primary-base" />

          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative">
              <div
                className={cn(
                  'absolute -left-5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white',
                  index === 0
                    ? 'bg-primary-base'
                    : index === milestones.length - 1
                      ? 'bg-green-500'
                      : 'bg-basic-400'
                )}
              >
                {milestones.length - index}
              </div>
              <Card>
                <CardContent className="p-4">
                  <span className="text-xs font-medium text-primary-base">
                    {milestone.timeframe}
                  </span>
                  <h4 className="mt-1 font-semibold text-basic-600">
                    {milestone.title || t('noTitle')}
                  </h4>
                  {milestone.actions.filter(Boolean).length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {milestone.actions
                        .filter(Boolean)
                        .map((action, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-basic-500"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-primary-base" />
                            {action}
                          </li>
                        ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => setStep('milestones')}>
            {t('editPlan')}
          </Button>
          <Button onClick={() => router.push(`/${locale}/design`)}>
            {t('done')}
          </Button>
        </div>
      </div>
    </div>
  );
}
