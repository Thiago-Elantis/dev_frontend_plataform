// hooks/useTransactionFilters.ts
import { useState } from 'react';
import { Transaction } from '@/types';

export default function useTransactionFilters(initialTransactions: Transaction[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = initialTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.client.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesMethod = methodFilter === 'all' || transaction.paymentMethod === methodFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;

    return matchesSearch && matchesType && matchesMethod && matchesStatus;
  });

  return {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    methodFilter,
    setMethodFilter,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    showFilters,
    setShowFilters,
    filteredTransactions
  };
}