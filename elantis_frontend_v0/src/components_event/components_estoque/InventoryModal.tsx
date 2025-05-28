import { useState, useEffect } from 'react';
import { InventoryItem } from '@/types/inventory';
import { FiBox, FiMic, FiDollarSign, FiMap } from 'react-icons/fi';

interface InventoryModalProps {
  item: InventoryItem | null;
  onClose: () => void;
  onSave: (itemData: InventoryItem) => void;
  onMapSelect: () => void;
}

export default function InventoryModal({ 
  item, 
  onClose, 
  onSave,
  onMapSelect
}: InventoryModalProps) {
  const [formData, setFormData] = useState<Omit<InventoryItem, 'id'>>({
    name: '',
    type: 'Estande',
    category: '',
    quantity: 1,
    status: 'disponivel',
    description: ''
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        name: '',
        type: 'Estande',
        category: '',
        quantity: 1,
        status: 'disponivel',
        description: ''
      });
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemData: InventoryItem = {
      ...formData,
      id: item?.id || Date.now().toString()
    };
    onSave(itemData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">
          {item ? 'Editar Item' : 'Novo Item'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select
                name="type"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Estande">Estande</option>
                <option value="Palestra">Palestra</option>
                <option value="Patrocinio">Patrocínio</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <input
                type="text"
                name="category"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
              <input
                type="number"
                name="quantity"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.quantity}
                onChange={handleNumberChange}
                min="1"
                required
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
                <option value="disponivel">Disponível</option>
                <option value="reservado">Reservado</option>
                <option value="ocupado">Ocupado</option>
                <option value="manutencao">Manutenção</option>
              </select>
            </div>
            
            {formData.type === 'Patrocinio' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patrocinador</label>
                <input
                  type="text"
                  name="sponsor"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={formData.sponsor || ''}
                  onChange={handleChange}
                />
              </div>
            )}
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                name="description"
                className="w-full border border-gray-300 rounded-lg p-2"
                rows={3}
                value={formData.description || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-lg p-2"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setFormData(prev => ({
                        ...prev,
                        image: event.target?.result as string
                      }));
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onMapSelect}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <FiMap className="mr-2" />
              Vincular ao Mapa
            </button>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}