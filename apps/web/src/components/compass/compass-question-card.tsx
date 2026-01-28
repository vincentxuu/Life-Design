'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { compassDimensions, type CompassDimension } from './compass-tabs';

export interface CompassQuestion {
  id: string;
  dimensionId: CompassDimension['id'];
  question: string;
  hint: string;
  placeholder: string;
}

interface CompassQuestionCardProps {
  question: CompassQuestion;
  currentIndex: number;
  totalQuestions: number;
  answer: string;
  onAnswerChange: (value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function CompassQuestionCard({
  question,
  currentIndex,
  totalQuestions,
  answer,
  onAnswerChange,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: CompassQuestionCardProps) {
  const dimension = compassDimensions.find((d) => d.id === question.dimensionId);

  if (!dimension) return null;

  return (
    <div className={cn('rounded-2xl p-6 shadow-lg', dimension.bgColor)}>
      {/* Dimension Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-4xl">{dimension.icon}</span>
        <div>
          <h2 className={cn('text-2xl font-bold', dimension.color)}>
            {dimension.title}
          </h2>
          <p className="text-sm text-basic-400">{dimension.titleEn}</p>
        </div>
      </div>

      {/* Question Progress */}
      <div className="mb-4 flex items-center gap-2">
        <span className={cn('text-sm font-medium', dimension.color)}>
          問題 {currentIndex + 1} / {totalQuestions}
        </span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/50">
          <div
            className={cn('h-full transition-all duration-300', 'bg-current', dimension.color)}
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-4">
        <p className="text-lg font-medium text-basic-600">{question.question}</p>
      </div>

      {/* Answer Input */}
      <div className="mb-4">
        <Textarea
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder={question.placeholder}
          rows={5}
          className="resize-none border-white/50 bg-white/80 focus:border-white focus:bg-white"
        />
      </div>

      {/* Hint */}
      <div className="mb-6 flex items-start gap-2 rounded-lg bg-white/60 p-3">
        <Lightbulb className={cn('mt-0.5 h-4 w-4 flex-shrink-0', dimension.color)} />
        <p className="text-sm text-basic-500">{question.hint}</p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          上一題
        </Button>
        <Button onClick={onNext} disabled={!canGoNext} className="gap-1">
          {currentIndex === totalQuestions - 1 ? '完成' : '下一題'}
          {currentIndex < totalQuestions - 1 && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
