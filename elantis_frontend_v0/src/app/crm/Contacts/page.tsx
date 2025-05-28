'use client';

import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import SearchAndFilter from '@/components_crm/components_companies/SearchAndFilter';
import ClientTable from '@/components_crm/components_contacts/ContactsTable';
import ClientModal from '@/components_crm/components_contacts/ContactsModal';
import { Client, Option } from '@/types';

const statusOptions: Option[] = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Ativos' },
  { value: 'inactive', label: 'Inativos' },
  { value: 'lead', label: 'Leads' },
  { value: 'vip', label: 'VIP' },
];

const tagOptions: Option[] = [
  { value: 'all', label: 'Todas' },
  { value: 'evento1', label: 'Evento 2023' },
  { value: 'evento2', label: 'Evento 2024' },
  { value: 'palestrante', label: 'Palestrante' },
  { value: 'expositor', label: 'Expositor' },
  { value: 'patrocinador', label: 'Patrocinador' },
];

const initialClients: Client[] = [
  {
    id: 1,
    name: 'Maria Silva',
    email: 'maria.silva@empresa.com',
    phone: '(11) 98765-4321',
    company: 'Tech Solutions',
    status: 'active',
    tags: ['evento1', 'expositor'],
    lastContact: '2023-05-15',
    notes: 'Interessada em stand premium',
  },
  // ... outros clientes
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [clients, setClients] = useState<Client[]>(initialClients);

  const filteredClients = clients.filter(client => {
    const matchesSearch =
      (client.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.phone || '').includes(searchTerm);


    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesTag = tagFilter === 'all' || client.tags.includes(tagFilter);

    return matchesSearch && matchesStatus && matchesTag;
  });

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter(client => client.id !== id));
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

 
  const handleSaveClient = (updatedClient: Client) => {
      setClients(prev =>
        prev.some(c => c.id === updatedClient.id)
          ? prev.map(c => (c.id === updatedClient.id ? updatedClient : c))
          : [...prev, { ...updatedClient, id: Date.now() }] // adiciona novo se não existir id
      );
      setShowModal(false);
    };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={() => {
              setSelectedClient(null);
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FiPlus className="mr-2" />
            Novo Cliente
          </button>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          industryFilter={tagFilter}
          setIndustryFilter={setTagFilter}
          statusOptions={statusOptions}
          industryOptions={tagOptions}
        />

        <ClientTable
          clients={filteredClients}
          handleEditClient={handleEditClient}
          handleDeleteClient={handleDeleteClient}
        />

        <ClientModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedClient={selectedClient}
          tagOptions={tagOptions}
          handleSaveClient={handleSaveClient}
        />
      </div>
    </div>
  );
}
