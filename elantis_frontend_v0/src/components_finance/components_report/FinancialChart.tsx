'use client';

import { Bar, Pie, Line } from 'react-chartjs-2';
import { ChartData } from '@/types';
import { Chart as ChartJS, registerables } from 'chart.js';

// Register all ChartJS components
ChartJS.register(...registerables);

interface FinancialChartProps {
  type: 'bar' | 'pie' | 'line';
  data: ChartData;
  options: any;
  height?: string;
}

export default function FinancialChart({ type, data, options, height = 'h-96' }: FinancialChartProps) {
  const ChartComponent = {
    bar: Bar,
    pie: Pie,
    line: Line
  }[type];

  return (
    <div className={height}>
      <ChartComponent data={data} options={options} />
    </div>
  );
}