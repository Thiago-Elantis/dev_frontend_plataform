import { Contract } from '@/types/agent';

interface ContractsListProps {
  contracts: Contract[];
  formatCurrency: (value: number) => string;
  formatDate: (dateString: string) => string;
}

export default function ContractsList({ contracts, formatCurrency, formatDate }: ContractsListProps) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Contratos</h3>
      
      <div className="space-y-4">
        {contracts.map(contract => (
          <div key={contract.id} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="flex justify-between">
              <h4 className="font-medium">{contract.description}</h4>
              <span className={`px-2 text-xs leading-5 font-semibold rounded-full ${getStatusColor(contract.status)}`}>
                {contract.status === 'active' ? 'Ativo' : 
                 contract.status === 'completed' ? 'Concluído' : 'Cancelado'}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
              <div>
                <p className="text-gray-500">Valor</p>
                <p>{formatCurrency(contract.totalValue)}</p>
              </div>
              <div>
                <p className="text-gray-500">Parcelas</p>
                <p>{contract.paidInstallments}/{contract.installments}</p>
              </div>
              <div>
                <p className="text-gray-500">Período</p>
                <p>{formatDate(contract.startDate)} - {formatDate(contract.endDate)}</p>
              </div>
            </div>
            
            <div className="mt-2">
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}