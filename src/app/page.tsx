import LineCard from '@/app/ui/LineCard';
import BarCard from '@/app/ui/BarCard';
import DoughnutChart from '@/app/ui/DoughnutChart';

export default function Home() {
  const LineChartData = {
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
    mainData: [
      732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192, 154,
      273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
    ],
    subData: [
      532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234, 234, 314,
      314, 314, 388, 314, 202, 202, 202, 202, 314, 720, 642,
    ],
  };

  const barChartData = {
    labels: [
      '12-01-2022',
      '01-01-2023',
      '02-01-2023',
      '03-01-2023',
      '04-01-2023',
      '05-01-2023',
    ],
    mainData: [800, 1600, 900, 1300, 1950, 1700],
    subData: [4900, 2600, 5350, 4800, 5200, 4800],
  };

  return (
    <div className="flex h-screen mx-auto w-full ">
      <div>
        <LineCard {...LineChartData} width={389} height={128} />
        <BarCard {...barChartData} width={389} height={128} />
        <DoughnutChart
          labels={['United States', 'Italy', 'Other']}
          data={[35, 30, 35]}
          width={389}
          height={260}
        />
      </div>
    </div>
  );
}
