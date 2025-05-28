'use client';

import { useState } from 'react';
import { FiDollarSign, FiCreditCard, FiPieChart } from 'react-icons/fi';
import { PageHeader } from '@/components_finance/components_transactions/PageHeader';
import { FinancialSummary } from '@/components_finance/components_transactions/FinancialSummary';
import { TransactionFilters } from '@/components_finance/components_transactions/TransactionFilters';
import { TransactionTable } from '@/components_finance/components_transactions/TransactionTable';
import { Transaction, FilterOption, FinancialSummaryCard } from '@/types/transactions';
import { formatCurrency, getStatusColor, getStatusLabel, getTypeLabel, getMethodLabel } from '@/utils/transaction';

const transactionTypes: FilterOption[] = [
  { value: 'income', label: 'Receita' },
  { value: 'expense', label: 'Despesa' },
];

const paymentMethods: FilterOption[] = [
  { value: 'credit_card', label: 'Cartão de Crédito' },
  { value: 'debit_card', label: 'Cartão de Débito' },
  { value: 'bank_transfer', label: 'Transferência Bancária' },
  { value: 'pix', label: 'PIX' },
  { value: 'cash', label: 'Dinheiro' },
];

const statusOptions: FilterOption[] = [
  { value: 'completed', label: 'Concluído' },
  { value: 'pending', label: 'Pendente' },
  { value: 'canceled', label: 'Cancelado' },
];

const initialTransactions: Transaction[] = [
  // ... your transaction data
];

const summaryCards: FinancialSummaryCard[] = [
  {
    title: 'Saldo Total',
    amount: 12500,
    icon: <FiDollarSign className="text-white" size={20} />,
    trend: 'up',
    percentage: 12.5,
    color: 'bg-blue-600',
  },
  {
    title: 'Receitas',
    amount: 18500,
    icon: <FiCreditCard className="text-white" size={20} />,
    trend: 'up',
    percentage: 8.2,
    color: 'bg-green-600',
  },
  {
    title: 'Despesas',
    amount: 6000,
    icon: <FiPieChart className="text-white" size={20} />,
    trend: 'down',
    percentage: 3.4,
    color: 'bg-red-600',
  },
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const handleExport = () => {
    console.log('Exportando dados...');
  };

  const handleAddTransaction = () => {
    console.log('Adicionando nova transação...');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      
      <div className="flex-1 overflow-auto p-6">
        <PageHeader 
          title="Transações Financeiras" 
          onExport={handleExport}
          onAddTransaction={handleAddTransaction}
        />

        <FinancialSummary 
          summaries={summaryCards} 
          formatCurrency={formatCurrency} 
        />

        <TransactionFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          methodFilter={methodFilter}
          setMethodFilter={setMethodFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          transactionTypes={transactionTypes}
          paymentMethods={paymentMethods}
          statusOptions={statusOptions}
        />

        <TransactionTable
          transactions={transactions}
          formatCurrency={formatCurrency}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
          getTypeLabel={getTypeLabel}
          getMethodLabel={getMethodLabel}
        />
      </div>
    </div>
  );
}