'use client';
import MyDoughnutCard from '@/app/my-chart/MyDoughnutCard';
import React, { useState } from 'react';

export default function MyHome() {
  const [percentage, setPercentage] = useState(74);

  return (
    <div className="flex flex-col h-screen mx-auto w-full gap-5 items-center">
      <p>my chart home</p>
      <div className={'w-1/2 bg-blue-500 rounded-[12px] p-6'}>
        <MyDoughnutCard _percentage={percentage} radius={66} strokeWidth={32} />
      </div>
      <button onClick={() => setPercentage(percentage + 1)}>Increase</button>
    </div>
  );
}
