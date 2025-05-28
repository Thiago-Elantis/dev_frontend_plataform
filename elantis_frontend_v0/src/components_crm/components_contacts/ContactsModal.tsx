import { useState, useEffect } from 'react';
import { Client, Option } from '@/types';

interface ClientModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedClient: Client | null;
  tagOptions: Option[];
  handleSaveClient: (updatedClient: Client) => void;
}

export default function ClientModal({
  showModal,
  setShowModal,
  selectedClient,
  tagOptions,
  handleSaveClient,
}: ClientModalProps) {
  // Estado do formulário
  const [formData, setFormData] = useState<Client>({
    id: selectedClient?.id || 0,
    name: selectedClient?.name || '',
    email: selectedClient?.email || '',
    phone: selectedClient?.phone || '',
    company: selectedClient?.company || '',
    status: selectedClient?.status || 'lead',
    tags: selectedClient?.tags || [],
    lastContact: selectedClient?.lastContact || '',
    notes: selectedClient?.notes || '',
  });

  // Sincroniza formData quando selectedClient mudar (abrir modal)
  useEffect(() => {
    if (selectedClient) {
      setFormData(selectedClient);
    } else {
      setFormData({
        id: 0,
        name: '',
        email: '',
        phone: '',
        company: '',
        status: 'lead',
        tags: [],
        lastContact: '',
        notes: '',
      });
    }
  }, [selectedClient]);

  // Atualiza formData conforme inputs mudam
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value, type } = e.target;

  if (type === 'checkbox' && name === 'tags') {
    // type guard para garantir que e.target é HTMLInputElement (tem checked)
    const target = e.target as HTMLInputElement;
    const checked = target.checked;
    const tag = value;

    setFormData((prev) => {
      if (checked) {
        // adiciona tag
        return { ...prev, tags: [...prev.tags, tag] };
      } else {
        // remove tag
        return { ...prev, tags: prev.tags.filter((t) => t !== tag) };
      }
    });
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  // Ao clicar em salvar, chama a função handleSaveClient
  const onSave = () => {
    handleSaveClient(formData);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">{selectedClient ? 'Editar Cliente' : 'Novo Cliente'}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              name="phone"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
            <input
              type="text"
              name="company"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.status}
              onChange={handleChange}
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
              {tagOptions
                .filter((t) => t.value !== 'all')
                .map((tag) => (
                  <label key={tag.value} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="tags"
                      value={tag.value}
                      checked={formData.tags.includes(tag.value)}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">{tag.label}</span>
                  </label>
                ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
            <textarea
              name="notes"
              className="w-full border border-gray-300 rounded-lg p-2"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
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
            onClick={onSave}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
