import { FiPlus, FiDownload } from 'react-icons/fi';

interface InvoiceHeaderProps {
  title: string;
  onAddInvoice: () => void;
  onExport: () => void;
}

export default function InvoiceHeader({ title, onAddInvoice, onExport }: InvoiceHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="flex space-x-2">
        <button
          onClick={onExport}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-50"
        >
          <FiDownload className="mr-2" />
          Exportar
        </button>
        <button
          onClick={onAddInvoice}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FiPlus className="mr-2" />
          Nova Fatura
        </button>
      </div>
    </div>
  );
}