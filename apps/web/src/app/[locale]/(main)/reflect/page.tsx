'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { MOOD_CONFIG, type MoodLevel } from '@/types';
import { mockReflections, emptyTodayReflection } from '@/mocks';

export default function ReflectPage() {
  const t = useTranslations('reflection');
  const tQuestions = useTranslations('reflection.questions');

  const [mood, setMood] = React.useState<MoodLevel>(3);
  const [meaningful, setMeaningful] = React.useState('');
  const [learned, setLearned] = React.useState('');
  const [improve, setImprove] = React.useState('');
  const [gratitude, setGratitude] = React.useState<string[]>(['', '', '']);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleGratitudeChange = (index: number, value: string) => {
    setGratitude((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    // 顯示成功訊息
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });

  return (
    <div>
      <PageHeader
        title={t('title')}
        description={formattedDate}
      />

      <div className="space-y-6">
        {/* Mood Selector */}
        <Card>
          <CardContent className="py-6">
            <p className="mb-4 text-center font-medium text-basic-600">
              {t('howWasToday')}
            </p>
            <div className="flex justify-center gap-4">
              {([5, 4, 3, 2, 1] as MoodLevel[]).map((level) => {
                const { emoji, label } = MOOD_CONFIG[level];
                const isSelected = mood === level;

                return (
                  <button
                    key={level}
                    onClick={() => setMood(level)}
                    className={cn(
                      'flex flex-col items-center gap-1 rounded-lg p-3 transition-all',
                      isSelected
                        ? 'bg-primary-pale scale-110'
                        : 'hover:bg-basic-100'
                    )}
                  >
                    <span className="text-3xl">{emoji}</span>
                    <span
                      className={cn(
                        'text-xs',
                        isSelected ? 'text-primary-darker font-medium' : 'text-basic-400'
                      )}
                    >
                      {t(`mood.${['terrible', 'bad', 'okay', 'good', 'great'][level - 1]}`)}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Reflection Questions */}
        <Card>
          <CardHeader>
            <CardTitle>📝 {t('title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              label={tQuestions('meaningful')}
              placeholder="今天發生了什麼有意義的事..."
              value={meaningful}
              onChange={(e) => setMeaningful(e.target.value)}
              className="min-h-[100px]"
            />
            <Textarea
              label={tQuestions('learned')}
              placeholder="今天學到了..."
              value={learned}
              onChange={(e) => setLearned(e.target.value)}
              className="min-h-[100px]"
            />
            <Textarea
              label={tQuestions('improve')}
              placeholder="明天我想要..."
              value={improve}
              onChange={(e) => setImprove(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        {/* Gratitude */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🙏 {t('gratitude')}
              <span className="text-sm font-normal text-basic-400">
                ({t('gratitudeOptional')})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {gratitude.map((item, index) => (
              <Input
                key={index}
                placeholder={`${index + 1}. 今天感謝的事...`}
                value={item}
                onChange={(e) => handleGratitudeChange(index, e.target.value)}
              />
            ))}
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button
          className="w-full"
          size="lg"
          onClick={handleSave}
          isLoading={isSaving}
        >
          {t('saveReflection')}
        </Button>
      </div>
    </div>
  );
}
