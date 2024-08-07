'use client';
import React, { useEffect, useRef } from 'react';
import Chart from './DefaultChart';
import {
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  CategoryScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { tailwindTheme } from '@/app/lib/tailwind-theme';
import { formatValue } from '@/app/ui/BarCard';
import { enUS } from 'date-fns/locale';

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  CategoryScale,
);

const LineCard = ({
  labels,
  mainData,
  subData,
  width,
  height,
}: {
  labels: string[];
  mainData: number[];
  subData: number[];
  width: number;
  height: number;
}) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvas.current) return;
    const chart = new Chart(canvas.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data: mainData,
            borderWidth: 2,
            borderColor: tailwindTheme.colors.indigo[500],
            fill: true,
            backgroundColor: (context: any) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (chartArea) {
                const gradient = ctx.createLinearGradient(
                  0,
                  chartArea.bottom,
                  0,
                  chartArea.top,
                );
                console.log(chartArea);
                gradient.addColorStop(0, 'rgba(139, 92, 246, 0)');
                gradient.addColorStop(1, 'rgba(139, 92, 246, 0.2)');
                return gradient;
              }
              return 'transparent';
            },
          },
          {
            data: subData,
            borderWidth: 2,
            borderColor: 'rgba(107, 114, 128, 0.25)',
          },
        ],
      },
      options: {
        elements: {
          line: {
            tension: 0.2,
          },
          point: {
            radius: 0,
            hoverRadius: 3,
            borderWidth: 0,
            hoverBorderWidth: 0,
          },
        },
        // maintainAspectRatio: false,
        resizeDelay: 200,
        layout: {
          padding: 20,
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
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
            display: false,
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
      },
    });

    return () => chart.destroy();
  }, [canvas, mainData, subData, labels]);

  return <canvas ref={canvas} width={width} height={height}></canvas>;
};

export default LineCard;
