'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProductEarningsChart() {
  const products = ['Estande', 'Palestra', 'Patrocínio', 'Área Vip', 'Workshop'];
  const sales = [320, 850, 210, 180, 45];

  const wons = sales.map((qtd, i) => qtd);

  const data = {
    labels: products,
    datasets: [
      {
        label: 'Ganhos',
        data: wons,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        hoverBackgroundColor: 'rgba(5, 150, 105, 0.9)',
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 36,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          padding: 16,
          color: '#4B5563', // text-gray-600
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw.toLocaleString('pt-BR')}`,
        },
        backgroundColor: '#10B981',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: string | number) {
            const num = typeof value === 'number' ? value : parseFloat(value);
            return `${num.toLocaleString('pt-BR')}`;
          },
          color: '#6B7280', // text-gray-500
          font: { size: 12 },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.04)',
        },
      },
      x: {
        ticks: {
          color: '#6B7280',
          font: { size: 12 },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <div className="mb-4">
        <h2 className="font-semibold text-xl text-gray-800">Ganhos por Produto</h2>
        <p className="text-sm text-gray-500">Quantidade total de vendas</p>
      </div>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
