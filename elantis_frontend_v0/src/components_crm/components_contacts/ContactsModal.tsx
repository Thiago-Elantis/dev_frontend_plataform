import { Client, Option } from '@/types';

interface ClientModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedClient: Client | null;
  tagOptions: Option[];
  handleSaveClient: () => void;
}

export default function ClientModal({
  showModal,
  setShowModal,
  selectedClient,
  tagOptions,
  handleSaveClient
}: ClientModalProps) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">
          {selectedClient ? 'Editar Cliente' : 'Novo Cliente'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              defaultValue={selectedClient?.name || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              defaultValue={selectedClient?.email || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-lg p-2"
              defaultValue={selectedClient?.phone || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              defaultValue={selectedClient?.company || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              defaultValue={selectedClient?.status || 'lead'}
            >
              <option value="lead">Lead</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="vip">VIP</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.filter(t => t.value !== 'all').map(tag => (
                <label key={tag.value} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    defaultChecked={selectedClient?.tags?.includes(tag.value) || false}
                  />
                  <span className="ml-2 text-sm text-gray-700">{tag.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2"
              rows={3}
              defaultValue={selectedClient?.notes || ''}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowModal(false)}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveClient}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}