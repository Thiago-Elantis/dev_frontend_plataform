'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { FiInfo, FiTrendingUp, FiClock, FiDollarSign, FiUser } from 'react-icons/fi';
import { useState, ChangeEvent, JSX } from 'react';
import type { ChartOptions, Tick, TooltipItem } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function RevenueSection() {
  const [selectedRange, setSelectedRange] = useState('30');

  const handleRangeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRange(e.target.value);
    // Atualização de dados baseada no filtro
  };

  const funnelData = {
    labels: ['Leads', 'Qualificados', 'Propostas', 'Negociação', 'Fechados'],
    datasets: [
      {
        label: 'Quantidade',
        data: [1200, 850, 520, 320, 180],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Valor (R$)',
        data: [null, null, 1250000, 850000, 680000],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
        type: 'bar' as const,
      }
    ]
  };

  const timelineData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Tempo Médio (dias)',
        data: [45, 42, 40, 38, 37, 35, 34, 33, 32, 31, 30, 29],
        borderColor: 'rgba(139, 92, 246, 1)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.3,
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'Valor Fechado (R$)',
        data: [120000, 145000, 165000, 142000, 178000, 195000, 210000, 225000, 240000, 265000, 290000, 320000],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'transparent',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        yAxisID: 'y1',
      }
    ]
  };

  const funnelOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: { family: 'Inter, sans-serif' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            const label = context.dataset.label || '';
            const value = context.raw as number || 0;
            return label === 'Quantidade'
              ? `${label}: ${value.toLocaleString('pt-BR')}`
              : `${label}: R$ ${value.toLocaleString('pt-BR')}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { 
          color: 'rgba(0,0,0,0.05)',
        },
        // Correção: border no nível superior
        border: {
          display: false
        },
        ticks: { padding: 8 }
      },
      x: {
        grid: { display: false },
        // Correção: border no nível superior
        border: {
          display: false
        },
        ticks: { padding: 12 }
      }
    }
  };

  const timelineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: { family: 'Inter, sans-serif' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            const label = context.dataset.label || '';
            const value = context.raw as number || 0;
            return label === 'Tempo Médio (dias)'
              ? `${label}: ${value} dias`
              : `${label}: R$ ${value.toLocaleString('pt-BR')}`;
          }
        }
      }
    },
    scales: {
      y: {
        position: 'left',
        display: true,
        title: { 
          display: true, 
          text: 'Dias no Funil' 
        },
        grid: { 
          color: 'rgba(0,0,0,0.05)',
        },
        // Correção: border no nível superior
        border: {
          display: false
        }
      },
      y1: {
        position: 'right',
        display: true,
        title: { 
          display: true, 
          text: 'Valor (R$)' 
        },
        grid: { 
          drawOnChartArea: false 
        },
        // Correção: border no nível superior
        border: {
          display: false
        },
        ticks: {
          callback: function(this, value: string | number, index: number, ticks: Tick[]) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            return `R$ ${(numericValue / 1000).toFixed(0)}K`;
          }
        }
      },
      x: {
        grid: { display: false },
        // Correção: border no nível superior
        border: {
          display: false
        }
      }
    }
  };

  const totalLeads = funnelData.datasets[0].data[0] as number;
  const closedDeals = funnelData.datasets[0].data[4] as number;
  const conversionRate = ((closedDeals / totalLeads) * 100).toFixed(1);
  const totalValue = funnelData.datasets[1].data[4] as number;
  const avgDealSize = totalValue / closedDeals;
  const avgFunnelTime = (timelineData.datasets[0].data as number[]).reduce((a, b) => a + b, 0) / 12;

  return (
    <div className="space-y-6">
      {/* Métricas Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Leads no Funil" value={totalLeads.toLocaleString('pt-BR')} icon={<FiUser className="text-blue-500" />} trend="+15.2%" />
        <MetricCard label="Taxa de Conversão" value={`${conversionRate}%`} icon={<FiTrendingUp className="text-green-500" />} trend="+3.5%" />
        <MetricCard label="Tempo Médio" value={`${avgFunnelTime.toFixed(0)} dias`} icon={<FiClock className="text-purple-500" />} trend="-18%" />
        <MetricCard label="Valor Fechado" value={`R$ ${(totalValue / 1000).toFixed(0)}K`} icon={<FiDollarSign className="text-amber-500" />} trend="+24.7%" />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Funil de Vendas"
          subtitle="Conversão por etapa do processo"
          footerContent={
            <div className="text-sm text-gray-500">
              <span className="font-medium text-green-600 inline-flex items-center">
                <FiTrendingUp className="mr-1" /> Conversão total: {conversionRate}%
              </span>
            </div>
          }
          rightControl={
            <select
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500"
              value={selectedRange}
              onChange={handleRangeChange}
            >
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 90 dias</option>
              <option value="365">Último ano</option>
            </select>
          }
        >
          <div role="figure" aria-label="Gráfico de Funil de Vendas" className="relative min-h-[18rem]">
            <Bar data={funnelData} options={funnelOptions} />
          </div>
        </ChartCard>

        <ChartCard
          title="Desempenho Temporal"
          subtitle="Tempo no funil vs valor fechado"
          rightControl={
            <span className="text-sm bg-purple-50 text-purple-600 px-3 py-1 rounded-full">2023</span>
          }
          footerContent={
            <div className="flex justify-between text-sm">
              <div className="text-gray-700 font-medium">Ticket médio: R$ {avgDealSize.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</div>
              <div className="text-green-600 inline-flex items-center font-medium">
                <FiTrendingUp className="mr-1" /> +16% vs ano anterior
              </div>
            </div>
          }
        >
          <div role="figure" aria-label="Gráfico de Desempenho Temporal" className="relative min-h-[18rem]">
            <Line data={timelineData} options={timelineOptions} />
          </div>
        </ChartCard>
      </div>

      {/* Conversões por Etapa */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="font-semibold text-lg text-gray-800 mb-4">Taxas de Conversão por Etapa</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {funnelData.labels.map((label, index) => {
            if (index === funnelData.labels.length - 1) return null;
            const current = funnelData.datasets[0].data[index] as number;
            const next = funnelData.datasets[0].data[index + 1] as number;
            const rate = ((next / current) * 100).toFixed(1);

            return (
              <div key={index} className="text-center p-4 border border-gray-100 rounded-lg bg-white">
                <div className="text-sm text-gray-500 mb-1">{label} → {funnelData.labels[index + 1]}</div>
                <div className="text-2xl font-bold text-gray-800">{rate}%</div>
                <div className="text-xs mt-1 text-green-600">+{Math.abs(65 - parseInt(rate))}% vs meta</div>
              </div>
            );
          })}
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow">
            <div className="text-sm mb-1">Conversão Total</div>
            <div className="text-3xl font-semibold">{conversionRate}%</div>
            <div className="text-xs mt-1">+{Math.abs(15 - parseFloat(conversionRate)).toFixed(1)}% vs meta</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares

interface MetricCardProps {
  label: string;
  value: string;
  icon: JSX.Element;
  trend: string;
}

function MetricCard({ label, value, icon, trend }: MetricCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-600">{label}</h4>
        {icon}
      </div>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        <span className="text-sm font-medium text-green-600">{trend}</span>
      </div>
    </div>
  );
}

interface ChartCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  rightControl?: React.ReactNode;
  footerContent?: React.ReactNode;
}

function ChartCard({ title, subtitle, children, rightControl, footerContent }: ChartCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="font-semibold text-lg text-gray-800">{title}</h4>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        {rightControl}
      </div>
      {children}
      {footerContent && <div className="mt-4">{footerContent}</div>}
    </div>
  );
}