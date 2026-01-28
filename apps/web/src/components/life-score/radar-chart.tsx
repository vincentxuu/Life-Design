'use client';

import * as React from 'react';

interface RadarChartProps {
  labels: string[];
  values: number[];
  maxValue?: number;
  size?: number;
}

export function RadarChart({
  labels,
  values,
  maxValue = 10,
  size = 300,
}: RadarChartProps) {
  const center = size / 2;
  const radius = size * 0.38;
  const levels = 5;
  const angleSlice = (2 * Math.PI) / labels.length;

  // Generate polygon points for a given set of values
  const getPolygonPoints = (vals: number[]) =>
    vals
      .map((v, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const r = (v / maxValue) * radius;
        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
      })
      .join(' ');

  // Generate point coordinates
  const getPoint = (value: number, index: number) => {
    const angle = angleSlice * index - Math.PI / 2;
    const r = (value / maxValue) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background grid levels */}
      {Array.from({ length: levels }, (_, i) => {
        const levelRadius = (radius * (i + 1)) / levels;
        const points = labels
          .map((_, j) => {
            const angle = angleSlice * j - Math.PI / 2;
            return `${center + levelRadius * Math.cos(angle)},${center + levelRadius * Math.sin(angle)}`;
          })
          .join(' ');
        return (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {labels.map((_, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angle)}
            y2={center + radius * Math.sin(angle)}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={getPolygonPoints(values)}
        fill="rgba(0, 179, 179, 0.2)"
        stroke="#00b3b3"
        strokeWidth="2"
      />

      {/* Data points */}
      {values.map((v, i) => {
        const point = getPoint(v, i);
        return (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#00b3b3"
            stroke="white"
            strokeWidth="2"
          />
        );
      })}

      {/* Labels */}
      {labels.map((label, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const labelRadius = radius + 28;
        const x = center + labelRadius * Math.cos(angle);
        const y = center + labelRadius * Math.sin(angle);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-basic-600 text-sm font-medium"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
