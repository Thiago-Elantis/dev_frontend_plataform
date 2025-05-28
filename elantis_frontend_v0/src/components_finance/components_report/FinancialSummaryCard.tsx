import { FinancialSummary } from '@/types/index';

interface FinancialSummaryCardProps {
  data: FinancialSummary;
  formatCurrency: (value: number) => string;
}

export default function FinancialSummaryCard({ data, formatCurrency }: FinancialSummaryCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{data.label}</h3>
      <p className={`text-2xl font-bold ${data.color}`}>{formatCurrency(data.value)}</p>
      <p className="text-sm text-gray-500 mt-1">{data.change}</p>
    </div>
  );
}