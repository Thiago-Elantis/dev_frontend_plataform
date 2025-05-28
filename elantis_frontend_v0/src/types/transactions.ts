export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  paymentMethod: string;
  status: 'completed' | 'pending' | 'canceled';
  category: string;
};

export type FilterOption = {
  value: string;
  label: string;
};

export type FinancialSummaryCard = {
  title: string;
  amount: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  percentage: number;
  color: string;
};

