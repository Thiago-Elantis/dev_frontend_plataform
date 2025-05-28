'use client';

import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { FiPlus } from 'react-icons/fi';
import Sidebar from '@/components_dashboard/Sidebar';
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
      expectedClose: '2023-07-15',
      probability: 20,
    },
    // ... outros deals
  ],
  // ... outros estágios
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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Pipeline de Deals</h1>
          <button
            onClick={() => setShowAddDealModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FiPlus className="mr-2" />
            Novo Deal
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex overflow-x-auto pb-4 gap-4">
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

        <AddDealModal
          show={showAddDealModal}
          onClose={() => setShowAddDealModal(false)}
          onSubmit={handleAddDeal}
          formData={newDeal}
          onFormChange={handleFormChange}
          pipelineStages={pipelineStages}
        />
      </div>
    </div>
  );
}