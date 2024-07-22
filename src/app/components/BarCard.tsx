'use client';
import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

function BarCard() {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvas.current) return;
    const chart = new Chart(canvas.current, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => chart.destroy();
  }, [canvas]);

  return <canvas ref={canvas} width={400} height={400}></canvas>;
}

export default BarCard;
