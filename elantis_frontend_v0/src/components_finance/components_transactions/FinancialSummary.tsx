import { FiDollarSign, FiCreditCard, FiPieChart } from 'react-icons/fi';
import { FinancialSummaryCard } from '@/types/transactions';
import { formatCurrency } from '@/utils/transaction';

export const FinancialSummary = ({
  summaries,
  formatCurrency,
}: {
  summaries: FinancialSummaryCard[];
  formatCurrency: (value: number) => string;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {summaries.map((summary, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">{summary.title}</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(summary.amount)}</p>
              <p className={`text-sm mt-1 ${summary.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {summary.trend === 'up' ? '↑' : '↓'} {summary.percentage}%
              </p>
            </div>
            <div className={`p-3 rounded-lg ${summary.color}`}>
              {summary.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};