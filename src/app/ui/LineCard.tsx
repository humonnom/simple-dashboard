'use client';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { tailwindTheme } from '@/app/lib/tailwind-theme';

const data = {
  labels: [
    '12-01-2022',
    '01-01-2023',
    '02-01-2023',
    '03-01-2023',
    '04-01-2023',
    '05-01-2023',
    '06-01-2023',
    '07-01-2023',
    '08-01-2023',
    '09-01-2023',
    '10-01-2023',
    '11-01-2023',
    '12-01-2023',
    '01-01-2024',
    '02-01-2024',
    '03-01-2024',
    '04-01-2024',
    '05-01-2024',
    '06-01-2024',
    '07-01-2024',
    '08-01-2024',
    '09-01-2024',
    '10-01-2024',
    '11-01-2024',
    '12-01-2024',
    '01-01-2025',
  ],
  indigoLine: [
    732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192, 154,
    273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
  ],
  grayLine: [
    532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234, 234, 314,
    314, 314, 388, 314, 202, 202, 202, 202, 314, 720, 642,
  ],
};

const LineCard = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvas.current) return;
    const chart = new Chart(canvas.current, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: '$',
            data: data.indigoLine,
            borderWidth: 2,
            borderColor: tailwindTheme.colors.indigo[500],
            fill: true,
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (chartArea) {
                const gradient = ctx.createLinearGradient(
                  0,
                  chartArea.bottom,
                  0,
                  chartArea.top,
                );
                gradient.addColorStop(0, 'rgba(139, 92, 246, 0)');
                gradient.addColorStop(1, 'rgba(139, 92, 246, 0.2)');
                return gradient;
              }
              return 'transparent';
            },
          },
          {
            label: '$',
            data: data.grayLine,
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
            pointStyle: false,
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
            // type: 'time',
            // adapters: {
            //   date: {
            //     // locale: 'enUS',
            //   }
            // },
            // time: {
            //   parser: 'dd/MM/yyyy',
            //   unit: 'month'
            // },
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            // bodyColor: tailwindTheme.colors.gray[500],
            backgroundColor: tailwindTheme.colors.gray[700],
            // borderColor: tailwindTheme.colors.gray[600],
          },
        },
      },
    });

    return () => chart.destroy();
  }, [canvas]);
  return <canvas ref={canvas} width={389} height={128}></canvas>;
};

export default LineCard;
