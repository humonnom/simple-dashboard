'use client';
import React, { useState } from 'react';

interface MyLineChartProps {
  data: number[];
  width: number;
  height: number;
}

const MyLineChart: React.FC<MyLineChartProps> = ({ data, width, height }) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // 데이터 정규화 함수
  const normalizeData = (data: number[]): number[] => {
    const max = Math.max(...data);
    return data.map((value) => (value / max) * height);
  };

  const normalizedData = normalizeData(data);

  // SVG 경로 생성
  const pathD = normalizedData.reduce((acc, point, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - point;
    return `${acc} ${index === 0 ? 'M' : 'L'} ${x},${y}`;
  }, '');

  return (
    <svg width={width} height={height} overflow={'visible'}>
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="blue" />
          <stop offset="100%" stopColor="red" />
        </linearGradient>
      </defs>
      <path d={pathD} fill="none" stroke="url(#lineGradient)" strokeWidth="2" />
      {normalizedData.map((point, index) => (
        <circle
          key={index}
          cx={(index / (data.length - 1)) * width}
          cy={height - point}
          r="4"
          fill="#8470FF"
          onMouseEnter={() => setHoveredPoint(index)}
          onMouseLeave={() => setHoveredPoint(null)}
        />
      ))}
      {hoveredPoint !== null && (
        <text
          x={(hoveredPoint / (data.length - 1)) * width}
          y={height - normalizedData[hoveredPoint] - 10}
          textAnchor="middle"
        >
          {data[hoveredPoint]}
        </text>
      )}
    </svg>
  );
};

const MyLineCard: React.FC = () => {
  const data: number[] = [
    732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192, 154,
    273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
  ];

  return <MyLineChart data={data} width={389} height={128} />;
};

export default MyLineCard;
