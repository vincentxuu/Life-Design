'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout';
import { Button } from '@/components/ui/button';
import {
  CompassTabs,
  CompassQuestionCard,
  compassDimensions,
  type CompassQuestion,
} from '@/components/compass';
import { mockCompassQuestions } from '@/mocks';
import { Save } from 'lucide-react';

type DimensionId = 'passion' | 'mission' | 'profession' | 'vocation';

export default function CompassPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations('compass');

  // State
  const [activeTab, setActiveTab] = React.useState<DimensionId>('passion');
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  // Get questions for active dimension
  const dimensionQuestions = mockCompassQuestions.filter(
    (q) => q.dimensionId === activeTab
  );
  const currentQuestion = dimensionQuestions[currentQuestionIndex];

  // Calculate progress
  const progress = compassDimensions.reduce(
    (acc, dim) => {
      const dimQuestions = mockCompassQuestions.filter((q) => q.dimensionId === dim.id);
      const answeredCount = dimQuestions.filter((q) => answers[q.id]?.trim()).length;
      acc[dim.id] = (answeredCount / dimQuestions.length) * 100;
      return acc;
    },
    {} as Record<DimensionId, number>
  );

  const handleTabChange = (tab: DimensionId) => {
    setActiveTab(tab);
    setCurrentQuestionIndex(0);
  };

  const handleAnswerChange = (value: string) => {
    if (currentQuestion) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      // Go to previous dimension
      const currentDimIndex = compassDimensions.findIndex((d) => d.id === activeTab);
      if (currentDimIndex > 0) {
        const prevDim = compassDimensions[currentDimIndex - 1];
        setActiveTab(prevDim.id);
        const prevDimQuestions = mockCompassQuestions.filter(
          (q) => q.dimensionId === prevDim.id
        );
        setCurrentQuestionIndex(prevDimQuestions.length - 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < dimensionQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Go to next dimension or results
      const currentDimIndex = compassDimensions.findIndex((d) => d.id === activeTab);
      if (currentDimIndex < compassDimensions.length - 1) {
        const nextDim = compassDimensions[currentDimIndex + 1];
        setActiveTab(nextDim.id);
        setCurrentQuestionIndex(0);
      } else {
        // All done, go to results
        router.push(`/${locale}/explore/compass/result`);
      }
    }
  };

  const handleSaveProgress = () => {
    // Mock save - would save to API/localStorage
    console.log('Saving progress:', answers);
  };

  // Check navigation possibility
  const currentDimIndex = compassDimensions.findIndex((d) => d.id === activeTab);
  const canGoPrevious = currentQuestionIndex > 0 || currentDimIndex > 0;
  const canGoNext = !!answers[currentQuestion?.id]?.trim();

  return (
    <div>
      <PageHeader
        title={t('title')}
        description="探索你的熱愛、使命、專業與職業"
        action={
          <Button variant="outline" size="sm" onClick={handleSaveProgress}>
            <Save className="mr-2 h-4 w-4" />
            {t('saveProgress')}
          </Button>
        }
      />

      <div className="mx-auto max-w-2xl space-y-6">
        {/* Tabs */}
        <CompassTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          progress={progress}
        />

        {/* Question Card */}
        {currentQuestion && (
          <CompassQuestionCard
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={dimensionQuestions.length}
            answer={answers[currentQuestion.id] || ''}
            onAnswerChange={handleAnswerChange}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
          />
        )}

        {/* Overall Progress */}
        <div className="text-center text-sm text-basic-400">
          總進度：
          {Object.values(answers).filter(Boolean).length} /{' '}
          {mockCompassQuestions.length} 題
        </div>
      </div>
    </div>
  );
}
