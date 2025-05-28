'use client';

import { useState } from 'react';
import { FiPlus, FiUpload, FiDollarSign, FiFileText, FiClock } from 'react-icons/fi';
import AgentHeader from '@/components_event/components_agents/AgentHeader';
import AgentSummary from '@/components_event/components_agents/AgentSummary';
import AgentFilters from '@/components_event/components_agents/AgentFilters';
import AgentTable from '@/components_event/components_agents/AgentTable';
import AgentModal from '@/components_event/components_agents/AgentModal';
import { Agent, Contract, Payment } from '@/types/agent';

const agentTypes = [
  { value: 'all', label: 'Todos' },
  { value: 'supplier', label: 'Fornecedor' },
  { value: 'contractor', label: 'Contratado' },
  { value: 'partner', label: 'Parceiro' },
];

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Ativo' },
  { value: 'overdue', label: 'Com pendências' },
  { value: 'inactive', label: 'Inativo' },
];

const initialAgents: Agent[] = [
  {
    id: '1',
    name: 'Alimentos SA',
    type: 'supplier',
    contact: 'João Silva',
    email: 'joao@alimentossa.com',
    phone: '(11) 98765-4321',
    totalContracts: 3,
    totalValue: 45000,
    pendingPayments: 12000,
    documents: ['contrato.pdf', 'proposta.docx'],
    lastPaymentDate: '2023-06-15'
  },
  // ... outros agentes
];

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agents] = useState<Agent[]>(initialAgents);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.contact.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || agent.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'overdue' ? agent.pendingPayments > 0 : true);

    return matchesSearch && matchesType && matchesStatus;
  });

  const summaryData = [
    {
      title: 'Fornecedores Ativos',
      value: agents.filter(a => a.type === 'supplier').length,
      icon: <FiDollarSign />,
      color: 'text-blue-500'
    },
    {
      title: 'Contratos Ativos',
      value: agents.reduce((sum, a) => sum + a.totalContracts, 0),
      icon: <FiFileText />,
      color: 'text-green-500'
    },
    {
      title: 'Pagamentos Pendentes',
      value: agents.reduce((sum, a) => sum + a.pendingPayments, 0),
      icon: <FiClock />,
      color: 'text-yellow-500'
    }
  ];

  const handleAddAgent = () => {
    setSelectedAgent(null);
    setShowModal(true);
  };

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  const handleSaveAgent = (agentData: Agent) => {
    // Lógica para salvar o agente
    console.log('Salvando agente:', agentData);
    setShowModal(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="flex h-screen bg-gray-50">
W      
      <div className="flex-1 overflow-auto p-6">
        <AgentHeader 
          title="Gestão de Fornecedores"
          onAddAgent={handleAddAgent}
          onUploadDocuments={() => console.log('Upload documentos')}
        />

        <AgentSummary 
          data={summaryData}
          formatCurrency={formatCurrency}
        />

        <AgentFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          agentTypes={agentTypes}
          statusOptions={statusOptions}
        />

        <AgentTable
          agents={filteredAgents}
          onEdit={handleEditAgent}
          formatCurrency={formatCurrency}
        />

        {showModal && (
          <AgentModal
            agent={selectedAgent}
            onClose={() => setShowModal(false)}
            onSave={handleSaveAgent}
          />
        )}
      </div>
    </div>
  );
}