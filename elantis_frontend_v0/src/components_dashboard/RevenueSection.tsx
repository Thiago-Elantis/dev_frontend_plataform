import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { FiInfo, FiTrendingUp, FiDollarSign } from 'react-icons/fi';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function RevenueSection() {
  // Data for bar chart (Contact Method Revenue)
  const contactMethodData = {
    labels: ['Email', 'Telefone', 'WhatsApp', 'Presencial', 'Site'],
    datasets: [
      {
        label: 'Valor (R$)',
        data: [12500, 18700, 24300, 15600, 28900],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(244, 63, 94, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(244, 63, 94, 1)',
          'rgba(139, 92, 246, 1)'
        ],
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      }
    ]
  };

  // Data for pie chart (Product Revenue)
  const productRevenueData = {
    labels: ['Estandes', 'Patrocínios', 'Palestras', 'Ingressos', 'Brindes'],
    datasets: [
      {
        data: [45200, 38700, 12500, 28900, 8300],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(244, 63, 94, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ],
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 2,
        hoverOffset: 12
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
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        },
        padding: 12,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = Math.round((value / context.dataset.data.reduce((a: number, b: number) => a + b, 0)) * 100);
            return `${label}: R$ ${value.toLocaleString('pt-BR')} (${percentage}%)`;
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
          callback: function(value: any) {
            return `R$ ${value.toLocaleString('pt-BR')}`;
          },
          padding: 8
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          padding: 12
        }
      }
    }
  };

  const totalRevenue = productRevenueData.datasets[0].data.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-500">Faturamento Total</h4>
            <FiDollarSign className="text-gray-400" />
          </div>
          <div className="mt-2 flex items-end justify-between">
            <span className="text-2xl font-bold text-gray-800">
              R$ {totalRevenue.toLocaleString('pt-BR')}
            </span>
            <span className="flex items-center text-sm font-medium text-green-600">
              <FiTrendingUp className="mr-1" /> 12.5%
            </span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-500">Melhor Método</h4>
            <FiInfo className="text-gray-400" />
          </div>
          <div className="mt-2 flex items-end justify-between">
            <span className="text-2xl font-bold text-gray-800">Site</span>
            <span className="text-sm font-medium text-gray-500">
              R$ 28.900
            </span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-500">Produto Top</h4>
            <FiInfo className="text-gray-400" />
          </div>
          <div className="mt-2 flex items-end justify-between">
            <span className="text-2xl font-bold text-gray-800">Estandes</span>
            <span className="text-sm font-medium text-gray-500">
              R$ 45.200
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Method Revenue Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-semibold text-lg text-gray-800">Ganhos por Método de Contato</h4>
              <p className="text-sm text-gray-500">Distribuição de receita por canal</p>
            </div>
            <select className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>30 dias</option>
              <option>60 dias</option>
              <option>90 dias</option>
            </select>
          </div>
          <div className="h-64">
            <Bar data={contactMethodData} options={chartOptions} />
          </div>
          <div className="mt-4 flex justify-between items-center text-sm">
            <div className="text-gray-500">
              <span className="font-medium text-green-600 inline-flex items-center">
                <FiTrendingUp className="mr-1" /> 12%
              </span> vs mês anterior
            </div>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Ver detalhes →
            </button>
          </div>
        </div>

        {/* Product Revenue Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-semibold text-lg text-gray-800">Distribuição de Faturamento</h4>
              <p className="text-sm text-gray-500">Por categoria de produto</p>
            </div>
            <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">Evento atual</span>
          </div>
          <div className="h-64">
            <Pie data={productRevenueData} options={chartOptions} />
          </div>
          <div className="mt-4 flex justify-between items-center text-sm">
            <div className="text-gray-500">
              <span className="font-medium text-gray-700">Total:</span> R$ {totalRevenue.toLocaleString('pt-BR')}
            </div>
            <div className="text-green-600 font-medium inline-flex items-center">
              <FiTrendingUp className="mr-1" /> +24% vs último evento
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}