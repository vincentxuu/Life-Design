'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface CompassVisualizationProps {
  scores: {
    passion: number;
    mission: number;
    profession: number;
    vocation: number;
  };
  size?: number;
  showLabels?: boolean;
  animated?: boolean;
}

export function CompassVisualization({
  scores,
  size = 300,
  showLabels = true,
  animated = true,
}: CompassVisualizationProps) {
  const center = size / 2;
  const radius = size * 0.35;
  const circleRadius = size * 0.25;

  // 四個圓的位置
  const circles = [
    {
      id: 'passion',
      label: '熱愛',
      icon: '💖',
      color: 'rgba(244, 63, 94, 0.3)',
      strokeColor: 'rgb(244, 63, 94)',
      cx: center,
      cy: center - radius * 0.6,
    },
    {
      id: 'mission',
      label: '使命',
      icon: '🌍',
      color: 'rgba(16, 185, 129, 0.3)',
      strokeColor: 'rgb(16, 185, 129)',
      cx: center + radius * 0.6,
      cy: center,
    },
    {
      id: 'profession',
      label: '專業',
      icon: '⭐',
      color: 'rgba(245, 158, 11, 0.3)',
      strokeColor: 'rgb(245, 158, 11)',
      cx: center,
      cy: center + radius * 0.6,
    },
    {
      id: 'vocation',
      label: '職業',
      icon: '💰',
      color: 'rgba(59, 130, 246, 0.3)',
      strokeColor: 'rgb(59, 130, 246)',
      cx: center - radius * 0.6,
      cy: center,
    },
  ];

  // 計算 Ikigai 分數（四個圓的交集強度）
  const ikigaiScore = Math.min(
    scores.passion,
    scores.mission,
    scores.profession,
    scores.vocation
  );

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Circles */}
        {circles.map((circle, index) => {
          const score = scores[circle.id as keyof typeof scores];
          const scaledRadius = circleRadius * (0.7 + (score / 100) * 0.3);

          return (
            <g key={circle.id}>
              <circle
                cx={circle.cx}
                cy={circle.cy}
                r={scaledRadius}
                fill={circle.color}
                stroke={circle.strokeColor}
                strokeWidth={2}
                className={cn(
                  animated && 'transition-all duration-700 ease-out',
                  animated && 'animate-fade-in'
                )}
                style={animated ? { animationDelay: `${index * 150}ms` } : undefined}
              />

              {/* Label */}
              {showLabels && (
                <text
                  x={circle.cx}
                  y={
                    circle.cy +
                    (circle.id === 'passion'
                      ? -scaledRadius - 20
                      : circle.id === 'profession'
                        ? scaledRadius + 25
                        : 0)
                  }
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-medium fill-basic-500"
                  dx={
                    circle.id === 'mission'
                      ? scaledRadius + 30
                      : circle.id === 'vocation'
                        ? -scaledRadius - 30
                        : 0
                  }
                >
                  {circle.icon} {circle.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Center Star (Ikigai) */}
        <g className={cn(animated && 'animate-stamp')} style={{ animationDelay: '600ms' }}>
          <circle
            cx={center}
            cy={center}
            r={20 + ikigaiScore * 0.15}
            fill="rgba(99, 102, 241, 0.2)"
            stroke="rgb(99, 102, 241)"
            strokeWidth={2}
          />
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-2xl"
          >
            ★
          </text>
        </g>
      </svg>

      {/* Ikigai Score Badge */}
      <div
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center',
          animated && 'animate-fade-in'
        )}
        style={{ animationDelay: '800ms', marginTop: size * 0.15 }}
      >
        <div className="rounded-full bg-white px-4 py-2 shadow-lg">
          <span className="text-sm text-basic-400">Ikigai 指數</span>
          <div className="text-2xl font-bold text-primary-base">{ikigaiScore}%</div>
        </div>
      </div>
    </div>
  );
}
