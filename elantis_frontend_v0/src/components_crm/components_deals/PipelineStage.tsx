import { Draggable, Droppable } from '@hello-pangea/dnd';
import { FiDollarSign, FiUser, FiCalendar, FiMoreVertical } from 'react-icons/fi';
import type { Deal, PipelineStageTP } from '@/types';

interface PipelineStageProps {
  stage: PipelineStageTP;
  deals: Deal[];
  formatCurrency: (value: number) => string;
}

export default function PipelineStage({ stage, deals, formatCurrency }: PipelineStageProps) {
  return (
    <Droppable droppableId={stage.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex-shrink-0 bg-gray-50 rounded-lg p-4"
        >
          <div className={`flex justify-between items-center mb-4 px-2 py-1 rounded-md ${stage.color}`}>
            <h3 className="font-medium">{stage.title}</h3>
            <span className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded-full">
              {deals.length}
            </span>
          </div>

          <div className="space-y-3">
            {deals.map((deal, index) => (
              <Draggable key={deal.id} draggableId={deal.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{deal.name}</h4>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FiMoreVertical size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <FiDollarSign className="mr-2" />
                      {formatCurrency(deal.amount)}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <FiUser className="mr-2" />
                      {deal.contact}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FiCalendar className="mr-2" />
                      {new Date(deal.expectedClose).toLocaleDateString('pt-BR')}
                    </div>
                    
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        {deal.probability}% de chance
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}