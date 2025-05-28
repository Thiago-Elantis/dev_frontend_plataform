import { FiFilter } from 'react-icons/fi';
import { ReportType, PeriodOption } from '@/types';

interface ReportFiltersProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  reportType: string;
  setReportType: (type: string) => void;
  period: string;
  setPeriod: (period: string) => void;
  year: number;
  setYear: (year: number) => void;
  reportTypes: ReportType[];
  periodOptions: PeriodOption[];
}

export default function ReportFilters({
  showFilters,
  setShowFilters,
  reportType,
  setReportType,
  period,
  setPeriod,
  year,
  setYear,
  reportTypes,
  periodOptions
}: ReportFiltersProps) {
  if (!showFilters) return null;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Relatório</label>
        <div className="flex space-x-2">
          {reportTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setReportType(type.value)}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg border ${
                reportType === type.value 
                  ? 'border-blue-500 bg-blue-50 text-blue-600' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          {periodOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
        >
          {[2023, 2022, 2021, 2020].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
