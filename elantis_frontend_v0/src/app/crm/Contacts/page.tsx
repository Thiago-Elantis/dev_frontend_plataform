'use client';

import { useState } from 'react';
import { Plus, Users, Filter, Download } from 'lucide-react';
import { PageContainer, PageHeader, Card, Button, EmptyState } from '@/components/ui';
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
  {
    id: 2,
    name: 'João Santos',
    email: 'joao.santos@inovacorp.com',
    phone: '(11) 99876-5432',
    company: 'InovaCorp',
    status: 'lead',
    tags: ['evento2', 'palestrante'],
    lastContact: '2023-05-20',
    notes: 'Potencial palestrante para evento tech',
  },
  {
    id: 3,
    name: 'Ana Costa',
    email: 'ana.costa@eventplus.com',
    phone: '(11) 98765-1234',
    company: 'EventPlus',
    status: 'vip',
    tags: ['patrocinador', 'evento1'],
    lastContact: '2023-05-18',
    notes: 'Cliente VIP - patrocinador principal',
  },
];

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [clients, setClients] = useState<Client[]>(initialClients);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'CRM', href: '/crm' },
    { label: 'Contatos' }
  ];

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
        : [...prev, { ...updatedClient, id: Date.now() }]
    );
    setShowModal(false);
  };

  const handleExport = () => {
    // Implementar exportação
    console.log('Exportando contatos...');
  };

  const actions = (
    <>
      <Button
        variant="outline"
        icon={Download}
        onClick={handleExport}
      >
        Exportar
      </Button>
      <Button
        icon={Plus}
        onClick={() => {
          setSelectedClient(null);
          setShowModal(true);
        }}
      >
        Novo Contato
      </Button>
    </>
  );

  return (
    <PageContainer>
      <PageHeader
        title="Contatos"
        subtitle={`Gerencie seus ${clients.length} contatos e relacionamentos`}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />
      
      <div className="p-6 space-y-6">
        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{clients.length}</div>
              <div className="text-sm text-gray-600">Total de Contatos</div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {clients.filter(c => c.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Ativos</div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {clients.filter(c => c.status === 'lead').length}
              </div>
              <div className="text-sm text-gray-600">Leads</div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {clients.filter(c => c.status === 'vip').length}
              </div>
              <div className="text-sm text-gray-600">VIP</div>
            </div>
          </Card>
        </div>

        {/* Filtros e busca */}
        <Card>
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
        </Card>

        {/* Tabela de contatos */}
        <Card>
          {filteredClients.length > 0 ? (
            <ClientTable
              clients={filteredClients}
              handleEditClient={handleEditClient}
              handleDeleteClient={handleDeleteClient}
            />
          ) : (
            <EmptyState
              icon={Users}
              title="Nenhum contato encontrado"
              description="Não há contatos que correspondam aos filtros aplicados."
              action={{
                label: "Adicionar Contato",
                onClick: () => {
                  setSelectedClient(null);
                  setShowModal(true);
                },
                icon: Plus
              }}
            />
          )}
        </Card>

        <ClientModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedClient={selectedClient}
          tagOptions={tagOptions}
          handleSaveClient={handleSaveClient}
        />
      </div>
    </PageContainer>
  );
}
