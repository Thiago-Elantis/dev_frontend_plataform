import { FiDollarSign, FiPlus } from 'react-icons/fi';

export const PageHeader = ({
  title,
  onExport,
  onAddTransaction,
}: {
  title: string;
  onExport: () => void;
  onAddTransaction: () => void;
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="flex space-x-2">
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          <FiDollarSign className="mr-2" />
          Exportar
        </button>
        <button
          onClick={onAddTransaction}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiPlus className="mr-2" />
          Nova Transação
        </button>
      </div>
    </div>
  );
};