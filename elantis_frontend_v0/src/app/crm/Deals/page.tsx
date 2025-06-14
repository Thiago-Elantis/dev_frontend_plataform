'use client';

import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Plus, TrendingUp, DollarSign, Target, Users, Filter, Download, BarChart3 } from 'lucide-react';
import { PageContainer, PageHeader, Card, Button, MetricCard } from '@/components/ui';
import PipelineStage from '@/components_crm/components_deals/PipelineStage';
import AddDealModal from '@/components_crm/components_deals/AddDealModal';
import type { Deal, DealsByStage, NewDealForm, PipelineStageTP } from '@/types';

const pipelineStages: PipelineStageTP[] = [
  { id: 'stage-1', title: 'Contato Inicial', color: 'bg-blue-100 text-blue-800' },
  { id: 'stage-2', title: 'Qualificação', color: 'bg-purple-100 text-purple-800' },
  { id: 'stage-3', title: 'Proposta Enviada', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'stage-4', title: 'Negociação', color: 'bg-orange-100 text-orange-800' },
  { id: 'stage-5', title: 'Fechado - Ganho', color: 'bg-green-100 text-green-800' },
  { id: 'stage-6', title: 'Fechado - Perdido', color: 'bg-red-100 text-red-800' },
];

const initialDeals: DealsByStage = {
  'stage-1': [
    {
      id: 'deal-1',
      name: 'Contrato com Tech Solutions',
      amount: 25000,
      contact: 'Maria Silva',
      expectedClose: '2024-07-15',
      probability: 20,
    },
    {
      id: 'deal-2',
      name: 'Evento Corporativo - InovaCorp',
      amount: 15000,
      contact: 'João Santos',
      expectedClose: '2024-07-20',
      probability: 25,
    },
  ],
  'stage-2': [
    {
      id: 'deal-3',
      name: 'Festival de Música - EventPlus',
      amount: 50000,
      contact: 'Ana Costa',
      expectedClose: '2024-08-01',
      probability: 40,
    },
  ],
  'stage-3': [
    {
      id: 'deal-4',
      name: 'Conferência Tech 2024',
      amount: 35000,
      contact: 'Carlos Lima',
      expectedClose: '2024-07-25',
      probability: 60,
    },
  ],
  'stage-4': [
    {
      id: 'deal-5',
      name: 'Workshop de Inovação',
      amount: 12000,
      contact: 'Fernanda Oliveira',
      expectedClose: '2024-07-18',
      probability: 80,
    },
  ],
  'stage-5': [
    {
      id: 'deal-6',
      name: 'Seminário Empresarial',
      amount: 18000,
      contact: 'Roberto Silva',
      expectedClose: '2024-06-30',
      probability: 100,
    },
  ],
  'stage-6': [
    {
      id: 'deal-7',
      name: 'Evento de Lançamento',
      amount: 8000,
      contact: 'Lucia Mendes',
      expectedClose: '2024-06-15',
      probability: 0,
    },
  ],
};

export default function DealsPipelinePage() {
  const [deals, setDeals] = useState<DealsByStage>(initialDeals);
  const [showAddDealModal, setShowAddDealModal] = useState(false);
  const [newDeal, setNewDeal] = useState<NewDealForm>({
    name: '',
    amount: '',
    contact: '',
    expectedClose: '',
    stage: 'stage-1',
  });

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const sourceStage = source.droppableId;
    const destStage = destination.droppableId;
    const movedDeal = deals[sourceStage][source.index];

    const newDeals = { ...deals };
    newDeals[sourceStage] = newDeals[sourceStage].filter((_, idx) => idx !== source.index);

    // Garante que o destino existe como array
    if (!Array.isArray(newDeals[destStage])) {
      newDeals[destStage] = [];
    }

    newDeals[destStage] = [...newDeals[destStage]];
    newDeals[destStage].splice(destination.index, 0, movedDeal);


    setDeals(newDeals);
  };

  const handleAddDeal = () => {
    const dealToAdd: Deal = {
      id: `deal-${Date.now()}`,
      name: newDeal.name,
      amount: parseFloat(newDeal.amount),
      contact: newDeal.contact,
      expectedClose: newDeal.expectedClose,
      probability: pipelineStages.findIndex(stage => stage.id === newDeal.stage) * 20,
    };

    setDeals(prev => ({
  ...prev,
  [newDeal.stage]: [...(prev[newDeal.stage] || []), dealToAdd],
    }));


    setNewDeal({
      name: '',
      amount: '',
      contact: '',
      expectedClose: '',
      stage: 'stage-1',
    });
    setShowAddDealModal(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDeal(prev => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  // Calcular métricas
  const allDeals = Object.values(deals).flat();
  const totalValue = allDeals.reduce((sum, deal) => sum + deal.amount, 0);
  const wonDeals = deals['stage-5'] || [];
  const lostDeals = deals['stage-6'] || [];
  const activeDeals = allDeals.filter(deal => !['stage-5', 'stage-6'].includes(
    Object.keys(deals).find(key => deals[key].includes(deal)) || ''
  ));
  
  const winRate = allDeals.length > 0 ? (wonDeals.length / allDeals.length) * 100 : 0;
  const avgDealValue = allDeals.length > 0 ? totalValue / allDeals.length : 0;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'CRM', href: '/crm' },
    { label: 'Negócios' }
  ];

  const handleExport = () => {
    console.log('Exportando pipeline...');
  };

  const actions = (
    <>
      <Button
        variant="outline"
        icon={Filter}
        onClick={() => {/* Implementar filtros */}}
      >
        Filtros
      </Button>
      <Button
        variant="outline"
        icon={Download}
        onClick={handleExport}
      >
        Exportar
      </Button>
      <Button
        icon={Plus}
        onClick={() => setShowAddDealModal(true)}
      >
        Novo Negócio
      </Button>
    </>
  );

  return (
    <PageContainer>
      <PageHeader
        title="Pipeline de Negócios"
        subtitle="Gerencie e acompanhe todos os seus negócios em andamento"
        breadcrumbs={breadcrumbs}
        actions={actions}
      />
      
      <div className="p-6 space-y-6">
        {/* Métricas do Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Valor Total do Pipeline"
            value={formatCurrency(totalValue)}
            change={{ value: "15.3%", type: "increase" }}
            icon={DollarSign}
            iconColor="text-green-600"
            subtitle="último mês"
          />
          <MetricCard
            title="Negócios Ativos"
            value={activeDeals.length.toString()}
            change={{ value: "8", type: "increase" }}
            icon={Target}
            iconColor="text-blue-600"
            subtitle="último mês"
          />
          <MetricCard
            title="Taxa de Conversão"
            value={`${winRate.toFixed(1)}%`}
            change={{ value: "2.1%", type: "increase" }}
            icon={TrendingUp}
            iconColor="text-purple-600"
            subtitle="último mês"
          />
          <MetricCard
            title="Ticket Médio"
            value={formatCurrency(avgDealValue)}
            change={{ value: "5.8%", type: "increase" }}
            icon={BarChart3}
            iconColor="text-orange-600"
            subtitle="último mês"
          />
        </div>

        {/* Resumo por Estágio */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo por Estágio</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {pipelineStages.map(stage => {
                const stageDeals = deals[stage.id] || [];
                const stageValue = stageDeals.reduce((sum, deal) => sum + deal.amount, 0);
                return (
                  <div key={stage.id} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mb-2 ${stage.color}`}>
                      {stage.title}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stageDeals.length}</div>
                    <div className="text-sm text-gray-600">{formatCurrency(stageValue)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Pipeline Kanban */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline de Vendas</h3>
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="flex overflow-x-auto pb-4 gap-4 min-h-[600px]">
                {pipelineStages.map(stage => (
                  <PipelineStage
                    key={stage.id}
                    stage={stage}
                    deals={deals[stage.id] || []}
                    formatCurrency={formatCurrency}
                  />
                ))}
              </div>
            </DragDropContext>
          </div>
        </Card>

        <AddDealModal
          show={showAddDealModal}
          onClose={() => setShowAddDealModal(false)}
          onSubmit={handleAddDeal}
          formData={newDeal}
          onFormChange={handleFormChange}
          pipelineStages={pipelineStages}
        />
      </div>
    </PageContainer>
  );
}