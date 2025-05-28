import { ReactNode } from 'react';

interface SummaryItem {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
}

interface AgentSummaryProps {
  data: SummaryItem[];
  formatCurrency?: (value: number) => string;
}

export default function AgentSummary({ data, formatCurrency }: AgentSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {data.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">{item.title}</h3>
            <div className={item.color}>
              {item.icon}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-gray-800">
              {typeof item.value === 'number' && formatCurrency 
                ? formatCurrency(item.value) 
                : item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}