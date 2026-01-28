'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ObjectiveCard, OKRForm, OKRSummary } from '@/components/okr';
import { mockObjectives } from '@/mocks';
import { Objective, OKRPeriod } from '@/types';
import { Plus, Target } from 'lucide-react';

export default function GoalsPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('okr');

  const [objectives, setObjectives] = React.useState<Objective[]>(mockObjectives);
  const [showForm, setShowForm] = React.useState(false);
  const [filter, setFilter] = React.useState<'all' | 'active' | 'completed'>('active');

  const filteredObjectives = objectives.filter((o) => {
    if (filter === 'all') return true;
    if (filter === 'active') return o.status === 'active';
    if (filter === 'completed') return o.status === 'completed';
    return true;
  });

  const handleCreateObjective = (data: {
    title: string;
    description: string;
    icon: string;
    period: OKRPeriod;
    keyResults: { title: string; targetValue: string; unit: string }[];
  }) => {
    const now = new Date();
    const endDate = new Date();
    if (data.period === 'quarterly') {
      endDate.setMonth(endDate.getMonth() + 3);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const newObjective: Objective = {
      id: String(Date.now()),
      title: data.title,
      description: data.description,
      icon: data.icon,
      status: 'active',
      period: data.period,
      startDate: now.toISOString(),
      endDate: endDate.toISOString(),
      keyResults: data.keyResults.map((kr, index) => ({
        id: `${Date.now()}-${index}`,
        title: kr.title,
        targetValue: parseInt(kr.targetValue) || 0,
        currentValue: 0,
        unit: kr.unit,
        status: 'not_started' as const,
      })),
    };

    setObjectives([newObjective, ...objectives]);
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div>
        <PageHeader
          title={t('newObjective')}
          description={t('newObjectiveDescription')}
        />
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="p-6">
              <OKRForm
                onSubmit={handleCreateObjective}
                onCancel={() => setShowForm(false)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={t('title')}
        description={t('description')}
        actions={
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('addObjective')}
          </Button>
        }
      />

      <div className="space-y-6">
        {/* Summary */}
        <OKRSummary objectives={objectives} />

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(['active', 'completed', 'all'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-primary-base text-white'
                  : 'bg-basic-100 text-basic-500 hover:bg-basic-200'
              }`}
            >
              {f === 'active' && t('filterActive')}
              {f === 'completed' && t('filterCompleted')}
              {f === 'all' && t('filterAll')}
            </button>
          ))}
        </div>

        {/* Objectives List */}
        {filteredObjectives.length > 0 ? (
          <div className="space-y-4">
            {filteredObjectives.map((objective) => (
              <ObjectiveCard key={objective.id} objective={objective} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Target className="mb-4 h-16 w-16 text-basic-300" />
              <h3 className="mb-2 text-lg font-semibold text-basic-500">
                {t('noObjectives')}
              </h3>
              <p className="mb-4 text-basic-400">{t('noObjectivesHint')}</p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                {t('addFirstObjective')}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card className="bg-amber-50">
          <CardContent className="p-4">
            <h4 className="mb-2 flex items-center gap-2 font-semibold text-amber-700">
              <span>💡</span>
              {t('tipsTitle')}
            </h4>
            <ul className="space-y-1 text-sm text-basic-500">
              <li>• {t('tip1')}</li>
              <li>• {t('tip2')}</li>
              <li>• {t('tip3')}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
