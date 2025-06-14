'use client';

import { useState } from 'react';
import { DollarSign, CreditCard, PieChart, Plus, Download, Filter } from 'lucide-react';
import { PageContainer, PageHeader, Card, Button, MetricCard } from '@/components/ui';
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
  {
    id: 1,
    date: '2024-06-14',
    description: 'Pagamento de inscrição - Festival de Verão',
    type: 'income',
    amount: 2500,
    method: 'pix',
    status: 'completed',
    category: 'Inscrições'
  },
  {
    id: 2,
    date: '2024-06-13',
    description: 'Aluguel de equipamentos de som',
    type: 'expense',
    amount: 1200,
    method: 'bank_transfer',
    status: 'completed',
    category: 'Equipamentos'
  },
  {
    id: 3,
    date: '2024-06-12',
    description: 'Patrocínio - Tech Solutions',
    type: 'income',
    amount: 5000,
    method: 'bank_transfer',
    status: 'pending',
    category: 'Patrocínios'
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

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Financeiro', href: '/finance' },
    { label: 'Transações' }
  ];

  const handleExport = () => {
    console.log('Exportando dados...');
  };

  const handleAddTransaction = () => {
    console.log('Adicionando nova transação...');
  };

  const actions = (
    <>
      <Button
        variant="outline"
        icon={Download}
        onClick={handleExport}
      >
        Exportar
      </Button>
      <Button
        icon={Plus}
        onClick={handleAddTransaction}
      >
        Nova Transação
      </Button>
    </>
  );

  // Calcular métricas
  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpense;

  return (
    <PageContainer>
      <PageHeader
        title="Transações Financeiras"
        subtitle="Gerencie todas as transações financeiras dos seus eventos"
        breadcrumbs={breadcrumbs}
        actions={actions}
      />
      
      <div className="p-6 space-y-6">
        {/* Métricas financeiras */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Saldo Total"
            value={formatCurrency(balance)}
            change={{ value: "12.5%", type: "increase" }}
            icon={DollarSign}
            iconColor="text-blue-600"
            subtitle="último mês"
          />
          <MetricCard
            title="Receitas"
            value={formatCurrency(totalIncome)}
            change={{ value: "8.2%", type: "increase" }}
            icon={CreditCard}
            iconColor="text-green-600"
            subtitle="último mês"
          />
          <MetricCard
            title="Despesas"
            value={formatCurrency(totalExpense)}
            change={{ value: "3.4%", type: "decrease" }}
            icon={PieChart}
            iconColor="text-red-600"
            subtitle="último mês"
          />
        </div>

        {/* Filtros */}
        <Card>
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
        </Card>

        {/* Tabela de transações */}
        <Card>
          <TransactionTable
            transactions={transactions}
            formatCurrency={formatCurrency}
            getStatusColor={getStatusColor}
            getStatusLabel={getStatusLabel}
            getTypeLabel={getTypeLabel}
            getMethodLabel={getMethodLabel}
          />
        </Card>
      </div>
    </PageContainer>
  );
}