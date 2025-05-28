import { FiCheck, FiX } from 'react-icons/fi';
import { NewDealForm, PipelineStageTP } from '@/types';

interface AddDealModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: NewDealForm;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  pipelineStages: PipelineStageTP[];
}

export default function AddDealModal({
  show,
  onClose,
  onSubmit,
  formData,
  onFormChange,
  pipelineStages
}: AddDealModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Adicionar Novo Deal</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Deal</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.name}
              onChange={onFormChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
            <input
              type="number"
              name="amount"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.amount}
              onChange={onFormChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contato</label>
            <input
              type="text"
              name="contact"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.contact}
              onChange={onFormChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Previsão de Fechamento</label>
            <input
              type="date"
              name="expectedClose"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.expectedClose}
              onChange={onFormChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estágio</label>
            <select
              name="stage"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.stage}
              onChange={onFormChange}
            >
              {pipelineStages.map(stage => (
                <option key={stage.id} value={stage.id}>{stage.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            <FiX className="mr-2" />
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiCheck className="mr-2" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}