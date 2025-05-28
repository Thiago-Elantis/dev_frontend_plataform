import { InvoiceSummaryTP } from '@/types/invoice';

interface InvoiceSummaryProps {
  data: InvoiceSummaryTP[];
  formatCurrency: (value: number) => string;
}

export default function InvoiceSummary({ data, formatCurrency }: InvoiceSummaryProps) {
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
              {formatCurrency(item.value)}
            </p>
            {item.change && (
              <p className={`text-sm ${item.color}`}>{item.change}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}