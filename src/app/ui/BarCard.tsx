'use client';
import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';
import { tailwindTheme } from '@/app/lib/tailwind-theme';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

export const formatValue = (value: number): string =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);

interface LegendItemProps {
  color: string;
  label: string;
  value: number;
  isHidden: boolean;
  onClick: () => void;
}

function LegendItem({
  color,
  label,
  value,
  isHidden,
  onClick,
}: LegendItemProps) {
  return (
    <li>
      <button
        className={`inline-flex items-center ${isHidden ? 'opacity-30' : ''}`}
        onClick={onClick}
      >
        <span
          className="block w-3 h-3 rounded-full mr-2 border-[3px]"
          style={{ borderColor: color }}
        />
        <span className="flex items-center">
          <span className="text-3xl font-bold text-gray-800 mr-2">
            {formatValue(value)}
          </span>
          <span className="text-sm text-gray-500">{label}</span>
        </span>
      </button>
    </li>
  );
}

interface BarCardProps {
  labels: string[];
  mainData: number[];
  subData: number[];
  width: number;
  height: number;
}

interface LegendItemData {
  label: string;
  color: string;
  value: number;
  isHidden: boolean;
  index: number;
}

function BarCard({ labels, mainData, subData, width, height }: BarCardProps) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [legendItems, setLegendItems] = useState<LegendItemData[]>([]);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  useEffect(() => {
    if (!canvas.current) return;

    const chartConfig: ChartConfiguration<'bar', number[], string> = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Direct',
            data: mainData,
            backgroundColor: tailwindTheme.colors.sky[500],
            hoverBackgroundColor: tailwindTheme.colors.sky[600],
            barPercentage: 0.7,
            categoryPercentage: 0.7,
            borderRadius: 4,
          },
          {
            label: 'Indirect',
            data: subData,
            backgroundColor: tailwindTheme.colors.violet[500],
            hoverBackgroundColor: tailwindTheme.colors.violet[600],
            barPercentage: 0.7,
            categoryPercentage: 0.7,
            borderRadius: 4,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            top: 12,
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        scales: {
          y: {
            border: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 5,
              callback: (value) => formatValue(value as number),
              color: tailwindTheme.colors.gray[500],
            },
            grid: {
              display: false,
            },
          },
          x: {
            type: 'time',
            adapters: {
              date: {
                locale: enUS,
              },
            },
            time: {
              parser: 'MM-dd-yyyy',
              unit: 'month',
              displayFormats: {
                month: 'MMM yy',
              },
            },
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              color: tailwindTheme.colors.gray[500],
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => '',
              label: (context) => formatValue(context.parsed.y),
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: true,
        resizeDelay: 200,
      },
    };

    const chart = new Chart(canvas.current, chartConfig);
    setChartInstance(chart);
    updateLegendItems(chart);

    return () => chart.destroy();
  }, [canvas, labels, mainData, subData]);

  const updateLegendItems = (chart: Chart) => {
    const items: LegendItemData[] = chart.data.datasets.map(
      (dataset, index) => ({
        label: dataset.label || '',
        color: dataset.backgroundColor as string,
        value: (dataset.data as number[]).reduce((a, b) => a + b, 0),
        isHidden: !chart.isDatasetVisible(index),
        index,
      }),
    );
    setLegendItems(items);
  };

  const handleLegendClick = (index: number) => {
    if (chartInstance) {
      chartInstance.setDatasetVisibility(
        index,
        !chartInstance.isDatasetVisible(index),
      );
      chartInstance.update();
      updateLegendItems(chartInstance);
    }
  };

  return (
    <>
      <div className="px-5 py-3">
        <ul className="flex flex-wrap gap-x-4">
          {legendItems.map((item, index) => (
            <LegendItem
              key={index}
              color={item.color}
              label={item.label}
              value={item.value}
              isHidden={item.isHidden}
              onClick={() => handleLegendClick(item.index)}
            />
          ))}
        </ul>
      </div>
      <canvas ref={canvas} width={width} height={height}></canvas>
    </>
  );
}

export default BarCard;
