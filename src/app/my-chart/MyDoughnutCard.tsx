import React, { useEffect, useMemo, useState } from 'react';

const DonutChart = ({
  _percentage,
  radius,
  strokeWidth,
}: {
  _percentage: number;
  radius: number;
  strokeWidth: number;
}) => {
  const [percentage, setPercentage] = React.useState(0);
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentage(_percentage);
    }, 500);

    return () => clearTimeout(timer);
  }, [_percentage]);

  const { defaultProps, containerSize } = useMemo(() => {
    const size = radius * 2;
    const center = size / 2;
    const containerSize = size + strokeWidth;

    const defaultProps = {
      cx: center + strokeWidth / 2,
      cy: center + strokeWidth / 2,
      r: radius,
      strokeWidth,
      fill: 'transparent',
      strokeDasharray: circumference,
    };
    return { defaultProps, containerSize };
  }, [radius, strokeWidth, circumference]);

  const strokeDashoffset = useMemo(
    () => circumference - (percentage / 100) * circumference,
    [percentage, circumference],
  );

  return (
    <svg
      width={containerSize}
      height={containerSize}
      viewBox={`0 0 ${containerSize} ${containerSize}`}
    >
      <circle {...defaultProps} stroke={'#F8FAFC'} strokeDashoffset={0} />
      <circle
        {...defaultProps}
        stroke={'#0F172A'}
        className="transition-all ease-out duration-1000"
        style={{ strokeDashoffset }}
      />
      <text>
        <tspan x="50%" y="50%" textAnchor="middle" dy="0.3em" fill={'white'}>
          {percentage}%
        </tspan>
      </text>
    </svg>
  );
};

const MyDoughnutCard = () => {
  const [percentage, setPercentage] = useState(74);

  const handleClick = () => {
    if (percentage + 10 >= 100) {
      setPercentage(100);
    } else if (percentage < 100) {
      setPercentage(percentage + 10);
    }
  };

  return (
    <>
      <div
        className={
          'flex items-center justify-center bg-blue-500 rounded-[12px] p-6'
        }
      >
        <DonutChart _percentage={percentage} radius={66} strokeWidth={32} />
      </div>
      <button
        className={
          'px-3 py-1 bg-blue-500 rounded shadow text-white hover:bg-blue-600 transition duration-300 ease-in-out \n' +
          'active:bg-blue-700 active:shadow-inner active:transform active:translate-y-1.5 \n' +
          'disabled:bg-gray-400 disabled:cursor-not-allowed'
        }
        onClick={handleClick}
        disabled={percentage === 100}
      >
        Increase
      </button>
    </>
  );
};

export default MyDoughnutCard;
