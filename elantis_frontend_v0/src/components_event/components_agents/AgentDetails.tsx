import { Agent } from '@/types/agent';

interface AgentDetailsProps {
  agent: Agent;
  formatCurrency: (value: number) => string;
  formatDate: (dateString: string) => string;
}

export default function AgentDetails({ agent, formatCurrency, formatDate }: AgentDetailsProps) {
  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'supplier': return 'Fornecedor';
      case 'contractor': return 'Contratado';
      case 'partner': return 'Parceiro';
      default: return type;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{agent.name}</h2>
          <p className="text-sm text-gray-500">{getTypeLabel(agent.type)}</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Editar
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Novo Contrato
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Contato</h3>
          <p className="mt-1 text-gray-900">{agent.contact}</p>
          <p className="text-sm text-gray-500">{agent.email}</p>
          <p className="text-sm text-gray-500">{agent.phone}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Valores</h3>
          <p className="mt-1 text-gray-900">
            Total Contratos: {formatCurrency(agent.totalValue)}
          </p>
          <p className="text-sm text-gray-500">
            Pendente: {formatCurrency(agent.pendingPayments)}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Documentos</h3>
          <div className="mt-1 space-y-1">
            {agent.documents.map((doc, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-blue-600 hover:underline text-sm block"
              >
                {doc}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}