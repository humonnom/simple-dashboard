'use client';
import React, { useState } from 'react';
import { tailwindTheme } from '@/app/lib/tailwind-theme';

interface Circle {
  id: number;
  cx: number;
  cy: number;
  r: number;
  fill: string;
}

const SVGEditor: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);

  const addCircle = () => {
    const newCircle: Circle = {
      id: Date.now(),
      cx: Math.random() * 400,
      cy: Math.random() * 400,
      r: 20,
      fill: tailwindTheme.colors.amber[500],
    };
    setCircles([...circles, newCircle]);
  };

  const handleCircleClick = (circle: Circle) => {
    setSelectedCircle(circle);
  };

  const changeColor = (color: string) => {
    if (selectedCircle) {
      const updatedCircles = circles.map((circle) =>
        circle.id === selectedCircle.id ? { ...circle, fill: color } : circle,
      );
      setCircles(updatedCircles);
      setSelectedCircle({ ...selectedCircle, fill: color });
    }
  };

  const changeSize = (size: number) => {
    if (selectedCircle) {
      const updatedCircles = circles.map((circle) =>
        circle.id === selectedCircle.id ? { ...circle, r: size } : circle,
      );
      setCircles(updatedCircles);
      setSelectedCircle({ ...selectedCircle, r: size });
    }
  };

  const deleteCircle = () => {
    if (selectedCircle) {
      const updatedCircles = circles.filter(
        (circle) => circle.id !== selectedCircle.id,
      );
      setCircles(updatedCircles);
      setSelectedCircle(null);
    }
  };

  return (
    <div className="p-4">
      <svg width="400" height="400" className="border border-gray-300">
        {circles.map((circle) => (
          <g key={circle.id}>
            <circle
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              fill={circle.fill}
              onClick={() => handleCircleClick(circle)}
              className="cursor-pointer"
            />
            {selectedCircle && selectedCircle.id === circle.id && (
              <circle
                cx={circle.cx}
                cy={circle.cy}
                r={circle.r + 2}
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )}
          </g>
        ))}
      </svg>
      <div className="mt-4 space-x-2">
        <button
          onClick={addCircle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          원 추가
        </button>
        <button
          onClick={deleteCircle}
          disabled={!selectedCircle}
          className={`font-bold py-2 px-4 rounded ${
            selectedCircle
              ? 'bg-red-500 hover:bg-red-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          삭제
        </button>
      </div>
      <div className="mt-4 space-x-2">
        <input
          type="color"
          onChange={(e) => changeColor(e.target.value)}
          disabled={!selectedCircle}
          className={`h-10 w-10 ${!selectedCircle && 'opacity-50 cursor-not-allowed'}`}
        />
        <input
          type="range"
          min="1"
          max="100"
          onChange={(e) => changeSize(Number(e.target.value))}
          disabled={!selectedCircle}
          className={`w-40 ${!selectedCircle && 'opacity-50 cursor-not-allowed'}`}
        />
      </div>
    </div>
  );
};

export default SVGEditor;
