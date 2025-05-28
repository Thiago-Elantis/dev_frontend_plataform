'use client';

import { useState } from 'react';
import { FiDownload, FiPieChart, FiBarChart2, FiTrendingUp, FiFilter } from 'react-icons/fi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from '@/components_dashboard/Sidebar';
import FinancialSummaryCard from '@/components_finance/components_report/FinancialSummaryCard';
import ReportFilters from '@/components_finance/components_report/ReportFilters';
import FinancialChart from '@/components_finance/components_report/FinancialChart';
import GrowthList from '@/components_finance/components_report/GrowthList';
import { ReportType, PeriodOption, ChartData, FinancialSummary, GrowthItem } from '@/types';

// Registrar componentes do ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const reportTypes: ReportType[] = [
  { value: 'financial', label: 'Financeiro', icon: <FiPieChart /> },
  { value: 'comparative', label: 'Comparativo', icon: <FiBarChart2 /> },
  { value: 'trends', label: 'Tendências', icon: <FiTrendingUp /> },
];

const periodOptions: PeriodOption[] = [
  { value: 'month', label: 'Mensal' },
  { value: 'quarter', label: 'Trimestral' },
  { value: 'year', label: 'Anual' },
];

const financialSummaries: FinancialSummary[] = [
  { label: 'Receita Total', value: 1250000, change: '+15% em relação ao ano anterior', color: 'text-green-600' },
  { label: 'Despesas Totais', value: 850000, change: '+8% em relação ao ano anterior', color: 'text-red-600' },
  { label: 'Lucro Líquido', value: 400000, change: 'Margem de 32%', color: 'text-blue-600' },
];

const growthData: GrowthItem[] = [
  { year: '2020-2021', value: '+26.2%' },
  { year: '2021-2022', value: '+15.9%' },
  { year: '2022-2023', value: '+26.3%' },
];

const marginData: GrowthItem[] = [
  { year: '2020', value: '27.7%' },
  { year: '2021', value: '30.5%' },
  { year: '2022', value: '33.7%' },
  { year: '2023', value: '37.5%' },
];

const financialData: ChartData = {
  labels: ['Ingressos', 'Patrocínios', 'Estandes', 'Vendas', 'Outros'],
  datasets: [{
    label: 'Receitas',
    data: [125000, 85000, 45000, 32000, 15000],
    backgroundColor: [
      'rgba(54, 162, 235, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(255, 159, 64, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(201, 203, 207, 0.6)'
    ],
    borderColor: [
      'rgba(54, 162, 235, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(201, 203, 207, 1)'
    ],
    borderWidth: 1
  }]
};

const comparativeData: ChartData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  datasets: [
    {
      label: 'Receitas',
      data: [85000, 92000, 78000, 88000, 115000, 125000, 95000, 105000, 110000, 120000, 135000, 150000],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    },
    {
      label: 'Despesas',
      data: [65000, 72000, 68000, 75000, 85000, 78000, 82000, 88000, 75000, 92000, 85000, 95000],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2
    }
  ]
};

const trendsData: ChartData = {
  labels: ['2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'Receita Total',
      data: [650000, 820000, 950000, 1200000],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.3,
      fill: true
    },
    {
      label: 'Lucro Líquido',
      data: [180000, 250000, 320000, 450000],
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      tension: 0.3,
      fill: true
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          let label = context.dataset.label || '';
          if (label) label += ': ';
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
          }
          return label;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value: any) {
          return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
        }
      }
    }
  }
};

export default function FinanceReportsPage() {
  const [reportType, setReportType] = useState('financial');
  const [period, setPeriod] = useState('month');
  const [year, setYear] = useState(new Date().getFullYear());
  const [showFilters, setShowFilters] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Relatórios Financeiros</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <FiFilter className="mr-2" />
              Filtros
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <FiDownload className="mr-2" />
              Exportar
            </button>
          </div>
        </div>

        <ReportFilters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          reportType={reportType}
          setReportType={setReportType}
          period={period}
          setPeriod={setPeriod}
          year={year}
          setYear={setYear}
          reportTypes={reportTypes}
          periodOptions={periodOptions}
        />

        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {financialSummaries.map((summary, index) => (
            <FinancialSummaryCard 
              key={index} 
              data={summary} 
              formatCurrency={formatCurrency} 
            />
          ))}
        </div>

        {/* Gráficos */}
        <div className="space-y-6">
          {reportType === 'financial' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Distribuição de Receitas</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FinancialChart type="pie" data={financialData} options={chartOptions} height="h-80" />
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {financialData.labels.map((label, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{label}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(financialData.datasets[0].data[index])}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {((financialData.datasets[0].data[index] / financialData.datasets[0].data.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {reportType === 'comparative' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Comparativo Mensal</h2>
              <FinancialChart type="bar" data={comparativeData} options={chartOptions} />
            </div>
          )}

          {reportType === 'trends' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Tendências Anuais</h2>
              <FinancialChart type="line" data={trendsData} options={chartOptions} />
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <GrowthList title="Crescimento Anual" items={growthData} color="text-green-600" />
                <GrowthList title="Margem de Lucro" items={marginData} color="text-blue-600" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}