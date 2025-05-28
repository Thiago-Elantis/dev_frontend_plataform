import { useState } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { FilterOption } from '@/types';

export const TransactionFilters = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  typeFilter,
  setTypeFilter,
  methodFilter,
  setMethodFilter,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  transactionTypes,
  paymentMethods,
  statusOptions,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  typeFilter: string;
  setTypeFilter: (filter: string) => void;
  methodFilter: string;
  setMethodFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  dateFilter: string;
  setDateFilter: (filter: string) => void;
  transactionTypes: FilterOption[];
  paymentMethods: FilterOption[];
  statusOptions: FilterOption[];
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar transações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <FiFilter className="mr-2" />
          Filtros
        </button>
      </div>

      {showFilters && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Todos</option>
              {transactionTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Método</label>
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Todos</option>
              {paymentMethods.map((method) => (
                <option key={method.value} value={method.value}>{method.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Todos</option>
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="all">Todos</option>
              <option value="today">Hoje</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mês</option>
              <option value="year">Este ano</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};