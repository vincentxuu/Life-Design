'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { MoodTrend } from '@/types';

interface MoodTrendChartProps {
  data: MoodTrend[];
  height?: number;
}

const moodColors: Record<number, string> = {
  5: '#10b981', // emerald
  4: '#3b82f6', // blue
  3: '#f59e0b', // amber
  2: '#f97316', // orange
  1: '#f43f5e', // rose
};

const moodEmojis: Record<number, string> = {
  5: '😊',
  4: '🙂',
  3: '😐',
  2: '😟',
  1: '😢',
};

export function MoodTrendChart({ data, height = 200 }: MoodTrendChartProps) {
  if (data.length === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-xl bg-basic-50 text-basic-400"
        style={{ height }}
      >
        尚無心情記錄
      </div>
    );
  }

  const chartWidth = 100;
  const chartHeight = 100;
  const padding = { top: 10, right: 10, bottom: 30, left: 10 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Calculate points
  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1 || 1)) * innerWidth,
    y: padding.top + innerHeight - ((d.mood - 1) / 4) * innerHeight,
    mood: d.mood,
    date: d.date,
  }));

  // Create path
  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  // Create area path
  const areaD = `${pathD} L ${points[points.length - 1]?.x || 0} ${chartHeight - padding.bottom} L ${padding.left} ${chartHeight - padding.bottom} Z`;

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 font-semibold text-basic-600">
        <span>📊</span>
        心情趨勢 (近 {data.length} 天)
      </h3>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full"
        style={{ height }}
        preserveAspectRatio="none"
      >
        {/* Grid Lines */}
        {[1, 2, 3, 4, 5].map((level) => {
          const y = padding.top + innerHeight - ((level - 1) / 4) * innerHeight;
          return (
            <g key={level}>
              <line
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth={0.5}
              />
              <text
                x={2}
                y={y}
                fontSize={3}
                fill="#9ca3af"
                dominantBaseline="middle"
              >
                {moodEmojis[level]}
              </text>
            </g>
          );
        })}

        {/* Area */}
        <path d={areaD} fill="url(#moodGradient)" opacity={0.3} />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="moodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Line */}
        <path d={pathD} fill="none" stroke="#10b981" strokeWidth={1} />

        {/* Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={2}
            fill={moodColors[p.mood]}
            stroke="white"
            strokeWidth={0.5}
          />
        ))}
      </svg>

      {/* Legend */}
      <div className="mt-2 flex justify-center gap-3 text-xs text-basic-400">
        {[5, 4, 3, 2, 1].map((mood) => (
          <div key={mood} className="flex items-center gap-1">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: moodColors[mood] }}
            />
            <span>{moodEmojis[mood]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
