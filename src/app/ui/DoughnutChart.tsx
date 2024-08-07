'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from '@/app/ui/DefaultChart';
import {
  DoughnutController,
  ArcElement,
  Tooltip,
  LegendItem as DefaultLegendItem,
} from 'chart.js';
import { tailwindTheme } from '@/app/lib/tailwind-theme';

Chart.register(DoughnutController, ArcElement, Tooltip);

interface LegendItem extends DefaultLegendItem {
  index: number;
  fillStyle: string;
}

function LegendButton({
  item,
  onClick,
}: {
  item: LegendItem;
  onClick: (index: number) => void;
}) {
  return (
    <button
      className="btn-xs bg-white text-gray-500 shadow-sm shadow-black/[0.08] rounded-full flex items-center px-2 py-1"
      style={{ opacity: item.hidden ? '.3' : '' }}
      onClick={() => onClick(item.index)}
    >
      <span
        style={{
          display: 'block',
          width: tailwindTheme.width[2],
          height: tailwindTheme.height[2],
          backgroundColor: item.fillStyle,
          borderRadius: tailwindTheme.borderRadius.sm,
          marginRight: tailwindTheme.margin[1],
          pointerEvents: 'none',
        }}
      />
      <span className={'text-sm'}>{item.text}</span>
    </button>
  );
}

// Legend 컴포넌트
function Legend({
  items,
  toggleVisibility,
}: {
  items: LegendItem[];
  toggleVisibility: (index: number) => void;
}) {
  return (
    <div className="px-5 pt-2 pb-6">
      <ul className="flex flex-wrap justify-center -m-1">
        {items.map((item, index) => (
          <li key={index} style={{ margin: tailwindTheme.margin[1] }}>
            <LegendButton item={item} onClick={toggleVisibility} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function DoughnutChart({
  data,
  labels,
  width,
  height,
}: {
  labels: string[];
  data: number[];
  width: number;
  height: number;
}) {
  const [chartInstance, setChartInstance] = useState<Chart<'doughnut'> | null>(
    null,
  );
  const [legendItems, setLegendItems] = useState<LegendItem[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    if (!ctx) return;
    const newChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              tailwindTheme.colors.violet[500],
              tailwindTheme.colors.sky[500],
              tailwindTheme.colors.violet[800],
            ],
            hoverBackgroundColor: [
              tailwindTheme.colors.violet[600],
              tailwindTheme.colors.sky[600],
              tailwindTheme.colors.violet[900],
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: '80%',
        layout: {
          padding: 24,
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });

    setChartInstance(newChart);
    return () => newChart.destroy();
  }, [data, labels, width, height]);

  const generateLegendItem = useCallback(() => {
    const generator =
      chartInstance?.options?.plugins?.legend?.labels?.generateLabels;
    return (generator ? generator(chartInstance as Chart) : []) as LegendItem[];
  }, [chartInstance]);

  useEffect(() => {
    const items = generateLegendItem();
    setLegendItems(items);
  }, [chartInstance, generateLegendItem]);

  const toggleVisibility = (index: number) => {
    if (chartInstance) {
      chartInstance.toggleDataVisibility(index);
      chartInstance.update();
      const items = generateLegendItem();
      setLegendItems(items);
    }
  };

  return (
    <div className="grow flex flex-col justify-center">
      <div>
        <canvas ref={canvasRef} width={width} height={height}></canvas>
      </div>
      <Legend items={legendItems} toggleVisibility={toggleVisibility} />
    </div>
  );
}

export default DoughnutChart;
