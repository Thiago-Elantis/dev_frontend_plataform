import { FiSearch, FiFilter } from 'react-icons/fi';
import { Option } from '@/types';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  industryFilter: string;
  setIndustryFilter: (filter: string) => void;
  statusOptions: Option[];
  industryOptions: Option[];
}

export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  statusFilter,
  setStatusFilter,
  industryFilter,
  setIndustryFilter,
  statusOptions,
  industryOptions
}: SearchAndFilterProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar empresas..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          <FiFilter className="mr-2" />
          Filtros
        </button>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              {industryOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}