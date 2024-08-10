import React, { useEffect, useMemo } from 'react';

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

  /**
   * first animation: 0 -> percentage
   */
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

  useEffect(() => {
    console.log(percentage, strokeDashoffset);
  }, [percentage, strokeDashoffset]);

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
    </svg>
  );
};

export default DonutChart;
