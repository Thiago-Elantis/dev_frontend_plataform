'use client';

import { useState } from 'react';
import { FiPlus, FiMap, FiBox, FiMic, FiDollarSign, FiFilter, FiSearch } from 'react-icons/fi';
import Sidebar from '@/components_dashboard/Sidebar';
import InventoryHeader from '@/components_event/components_estoque/InventoryHeader';
import InventoryTable from '@/components_event/components_estoque/InventoryTable';
import InventoryModal from '@/components_event/components_estoque/InventoryModal';
import MapViewer from '@/components_event/components_estoque/MapViewer';
import { InventoryItem, InventoryFilterOption } from '@/types/inventory';

const itemTypes: InventoryFilterOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'Estande', label: 'Estande' },
  { value: 'Palestra', label: 'Palestra' },
  { value: 'Patrocinio', label: 'Patrocínio' },
  { value: 'Outro', label: 'Outro' },
];

const statusOptions: InventoryFilterOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'disponivel', label: 'Disponível' },
  { value: 'reservado', label: 'Reservado' },
  { value: 'ocupado', label: 'Ocupado' },
  { value: 'manutencao', label: 'Manutenção' },
];

// Itens padrão que devem aparecer obrigatoriamente
const defaultItems: InventoryItem[] = [
  {
    id: 'estande-1',
    name: 'Estande Principal',
    type: 'Estande',
    category: 'Premium',
    quantity: 1,
    status: 'disponivel',
    description: 'Estande central com 20m²'
  },
  {
    id: 'palestra-1',
    name: 'Palestra Inaugural',
    type: 'Palestra',
    category: 'Principal',
    quantity: 200, // Assentos
    status: 'disponivel',
    description: 'Auditório principal'
  }
];

const initialItems: InventoryItem[] = [
  ...defaultItems,
  {
    id: 'patrocinio-1',
    name: 'Patrocínio Ouro',
    type: 'Patrocinio',
    category: 'Ouro',
    quantity: 5,
    status: 'disponivel',
    sponsor: 'Tech Solutions'
  },
  // ... outros itens
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [items, setItems] = useState<InventoryItem[]>(initialItems);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddItem = () => {
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleSaveItem = (itemData: InventoryItem) => {
    if (itemData.id) {
      // Edição
      setItems(prev => prev.map(item => 
        item.id === itemData.id ? itemData : item
      ));
    } else {
      // Novo item
      setItems(prev => [...prev, {
        ...itemData,
        id: `item-${Date.now()}`
      }]);
    }
    setShowModal(false);
  };

  const handleDeleteItem = (id: string) => {
    // Não permite deletar itens padrão
    if (!defaultItems.some(item => item.id === id)) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleMapPositionSelect = (position: { x: number; y: number }) => {
    if (selectedItem) {
      setItems(prev => prev.map(item => 
        item.id === selectedItem.id ? { ...item, mapPosition: position } : item
      ));
    }
    setShowMap(false);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'disponivel': return 'bg-green-100 text-green-800';
      case 'reservado': return 'bg-yellow-100 text-yellow-800';
      case 'ocupado': return 'bg-red-100 text-red-800';
      case 'manutencao': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'disponivel': return 'Disponível';
      case 'reservado': return 'Reservado';
      case 'ocupado': return 'Ocupado';
      case 'manutencao': return 'Manutenção';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'Estande': return <FiBox className="mr-2" />;
      case 'Palestra': return <FiMic className="mr-2" />;
      case 'Patrocinio': return <FiDollarSign className="mr-2" />;
      default: return <FiBox className="mr-2" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto p-6">
        <InventoryHeader 
          title="Estoque do Evento"
          onAddItem={handleAddItem}
          onViewMap={() => setShowMap(true)}
        />

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar itens..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <FiFilter className="mr-2" />
              Filtros
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  {itemTypes.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <InventoryTable
          items={filteredItems}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
          getTypeIcon={getTypeIcon}
          defaultItems={defaultItems.map(item => item.id)}
        />

        {showModal && (
          <InventoryModal
            item={selectedItem}
            onClose={() => setShowModal(false)}
            onSave={handleSaveItem}
            onMapSelect={() => {
              setShowModal(false);
              setShowMap(true);
            }}
          />
        )}

        {showMap && (
          <MapViewer
            items={items.filter(item => item.mapPosition)}
            onClose={() => setShowMap(false)}
            onPositionSelect={handleMapPositionSelect}
            selectedItem={selectedItem}
          />
        )}
      </div>
    </div>
  );
}