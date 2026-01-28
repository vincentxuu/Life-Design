'use client';

import * as React from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface RadarChartProps {
  data: DataPoint[];
  size?: number;
  color?: string;
  fillOpacity?: number;
}

export function RadarChart({
  data,
  size = 200,
  color = '#6366f1',
  fillOpacity = 0.3,
}: RadarChartProps) {
  const center = size / 2;
  const radius = size * 0.4;
  const angleStep = (2 * Math.PI) / data.length;

  // Generate points for the data polygon
  const dataPoints = data.map((point, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (point.value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  // Generate grid lines
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const axisPoints = data.map((_, index) => {
    const angle = angleStep * index - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid */}
      {gridLevels.map((level) => {
        const gridPoints = data.map((_, index) => {
          const angle = angleStep * index - Math.PI / 2;
          const r = level * radius;
          return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
        });

        return (
          <polygon
            key={level}
            points={gridPoints.join(' ')}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        );
      })}

      {/* Axes */}
      {axisPoints.map((point, index) => (
        <line
          key={index}
          x1={center}
          y1={center}
          x2={point.x}
          y2={point.y}
          stroke="#e5e7eb"
          strokeWidth={1}
        />
      ))}

      {/* Data Polygon */}
      <polygon
        points={dataPoints.map((p) => `${p.x},${p.y}`).join(' ')}
        fill={color}
        fillOpacity={fillOpacity}
        stroke={color}
        strokeWidth={2}
      />

      {/* Data Points */}
      {dataPoints.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={4}
          fill={color}
        />
      ))}

      {/* Labels */}
      {data.map((point, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const labelRadius = radius + 25;
        const x = center + labelRadius * Math.cos(angle);
        const y = center + labelRadius * Math.sin(angle);

        return (
          <text
            key={index}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs fill-basic-500"
          >
            {point.label}
          </text>
        );
      })}
    </svg>
  );
}
