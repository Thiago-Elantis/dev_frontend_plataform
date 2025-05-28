"use client";
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { FiTrendingUp, FiTarget, FiDollarSign, FiUsers, FiCalendar } from 'react-icons/fi';
import Sidebar from '@/components_dashboard/Sidebar';

// Registrar componentes do ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function SalesProgressPage() {
  // Dados para gráfico de progresso diário
  const dailyProgressData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Vendas Realizadas',
        data: [45, 72, 86, 93, 105, 120, 135],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Meta Diária',
        data: [60, 80, 80, 80, 80, 100, 100],
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0,
        pointRadius: 0
      }
    ]
  };

  // Dados para gráfico de barras (vendas por produto)
  const productSalesData = {
    labels: ['Ingresso VIP', 'Ingresso Padrão', 'Camisetas', 'Brindes', 'Estandes'],
    datasets: [
      {
        label: 'Vendas (unidades)',
        data: [320, 850, 210, 180, 45],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderRadius: 6,
        borderSkipped: false,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          padding: 8
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  };

  // Métricas principais
  const metrics = [
    {
      title: "Vendas Totais",
      value: "1.356",
      change: "+12.5%",
      isPositive: true,
      icon: <FiDollarSign className="text-blue-500" size={20} />
    },
    {
      title: "Meta do Mês",
      value: "72%",
      change: "+8%",
      isPositive: true,
      icon: <FiTarget className="text-green-500" size={20} />
    },
    {
      title: "Novos Clientes",
      value: "324",
      change: "+5.2%",
      isPositive: true,
      icon: <FiUsers className="text-purple-500" size={20} />
    },
    {
      title: "Dias Restantes",
      value: "12",
      change: null,
      icon: <FiCalendar className="text-yellow-500" size={20} />
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Conteúdo Principal */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Progresso de Vendas</h1>
            <div className="flex space-x-2">
              <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Este Mês</option>
                <option>Mês Passado</option>
                <option>Últimos 3 Meses</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Exportar
              </button>
            </div>
          </div>

          {/* Cards de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
                  {metric.icon}
                </div>
                <div className="mt-2 flex items-end justify-between">
                  <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                  {metric.change && (
                    <span className={`flex items-center text-sm font-medium ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      <FiTrendingUp className="mr-1" /> {metric.change}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Gráfico de Progresso */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-semibold text-lg text-gray-800">Progresso Diário de Vendas</h2>
                <p className="text-sm text-gray-500">Comparação entre vendas realizadas e meta diária</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg">Semanal</button>
                <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-lg">Mensal</button>
              </div>
            </div>
            <div className="h-80">
              <Line data={dailyProgressData} options={chartOptions} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vendas por Produto */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">Vendas por Produto</h2>
                  <p className="text-sm text-gray-500">Total de unidades vendidas por categoria</p>
                </div>
                <select className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Últimos 7 dias</option>
                  <option>Últimos 30 dias</option>
                  <option>Todos</option>
                </select>
              </div>
              <div className="h-64">
                <Bar data={productSalesData} options={chartOptions} />
              </div>
            </div>

            {/* Top Vendedores */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">Top Vendedores</h2>
                  <p className="text-sm text-gray-500">Melhores desempenhos do mês</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Ver todos →
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Ana Silva', sales: 245, target: 200 },
                  { name: 'Carlos Oliveira', sales: 198, target: 200 },
                  { name: 'Mariana Santos', sales: 187, target: 180 },
                  { name: 'Pedro Costa', sales: 156, target: 150 },
                  { name: 'Julia Pereira', sales: 132, target: 150 }
                ].map((seller, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-medium">
                        {seller.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-700">{seller.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">{seller.sales} vendas</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${seller.sales >= seller.target ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {Math.round((seller.sales / seller.target) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}