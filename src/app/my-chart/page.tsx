'use client';
import React from 'react';
import MyLineCard from '@/app/my-chart/MyLineCard';
import MyDoughnutCard from '@/app/my-chart/MyDoughnutCard';

export default function MyHome() {
  return (
    <div className="flex flex-col h-screen mx-auto w-full gap-5 items-center">
      <p>my chart home</p>
      <MyLineCard />
      <MyDoughnutCard />
    </div>
  );
}
