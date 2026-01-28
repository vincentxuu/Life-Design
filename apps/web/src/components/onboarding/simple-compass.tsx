'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface CompassDimension {
  id: string;
  icon: string;
  title: string;
  question: string;
  placeholder: string;
}

const dimensions: CompassDimension[] = [
  {
    id: 'passion',
    icon: '💖',
    title: '熱愛',
    question: '什麼事情讓你感到興奮，即使沒有報酬也願意做？',
    placeholder: '例如：創作、教學、探索新事物...',
  },
  {
    id: 'mission',
    icon: '🌍',
    title: '使命',
    question: '你希望為這個世界帶來什麼改變？',
    placeholder: '例如：幫助他人成長、改善環境...',
  },
  {
    id: 'profession',
    icon: '⭐',
    title: '專業',
    question: '你擅長什麼？別人常請你幫忙的事是？',
    placeholder: '例如：解決問題、溝通協調、設計...',
  },
  {
    id: 'vocation',
    icon: '💰',
    title: '職業',
    question: '什麼技能或服務可以為你帶來收入？',
    placeholder: '例如：程式開發、顧問服務、銷售...',
  },
];

interface SimpleCompassProps {
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  activeDimension?: string;
  onDimensionChange?: (id: string) => void;
}

export function SimpleCompass({
  values,
  onChange,
  activeDimension,
  onDimensionChange,
}: SimpleCompassProps) {
  const [activeId, setActiveId] = React.useState(
    activeDimension || dimensions[0].id
  );

  const activeDim = dimensions.find((d) => d.id === activeId) || dimensions[0];

  const handleDimensionClick = (id: string) => {
    setActiveId(id);
    onDimensionChange?.(id);
  };

  return (
    <div className="space-y-6">
      {/* Dimension Tabs */}
      <div className="flex justify-center gap-2">
        {dimensions.map((dim) => (
          <button
            key={dim.id}
            type="button"
            onClick={() => handleDimensionClick(dim.id)}
            className={cn(
              'flex flex-col items-center gap-1 rounded-xl px-4 py-3 transition-all',
              activeId === dim.id
                ? 'bg-primary-base text-white shadow-md'
                : 'bg-basic-100 text-basic-500 hover:bg-basic-200'
            )}
          >
            <span className="text-2xl">{dim.icon}</span>
            <span className="text-xs font-medium">{dim.title}</span>
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">{activeDim.icon}</span>
          <h3 className="text-xl font-bold text-basic-600">{activeDim.title}</h3>
        </div>

        <p className="mb-4 text-lg text-basic-500">{activeDim.question}</p>

        <Textarea
          value={values[activeDim.id] || ''}
          onChange={(e) => onChange(activeDim.id, e.target.value)}
          placeholder={activeDim.placeholder}
          rows={4}
          className="resize-none"
        />

        {/* Progress Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {dimensions.map((dim) => (
            <div
              key={dim.id}
              className={cn(
                'h-2 w-2 rounded-full transition-all',
                values[dim.id]
                  ? 'bg-success'
                  : dim.id === activeId
                    ? 'bg-primary-base'
                    : 'bg-basic-200'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
