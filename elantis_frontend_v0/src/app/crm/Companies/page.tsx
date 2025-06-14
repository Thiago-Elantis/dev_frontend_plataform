'use client';

import { useState, useMemo, useCallback } from 'react';
import { Plus, Building2, TrendingUp, Users, Download, Filter } from 'lucide-react';
import { PageContainer, PageHeader, Card, Button, MetricCard, EmptyState } from '@/components/ui';

import SearchAndFilter from '@/components_crm/components_companies/SearchAndFilter';
import CompanyTable from '@/components_crm/components_companies/CompanyTable';
import CompanyModal from '@/components_crm/components_companies/CompanyModal';
import ConfirmationModal from '@/components_crm/components_companies/ConfirmationModal';

import type { Company, Option, SortDirection, SortBy } from '@/types';

const statusOptions: Option[] = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
  { value: 'pending', label: 'Pendente' },
];
const industryOptions: Option[] = [
  { value: 'all', label: 'Todas as Indústrias' },
  { value: 'tech', label: 'Tecnologia' },
  { value: 'finance', label: 'Finanças' },
  { value: 'health', label: 'Saúde' },
  { value: 'education', label: 'Educação' },
  { value: 'retail', label: 'Varejo' },
  { value: 'manufacturing', label: 'Indústria' },
];
const initialCompanies: Company[] = [
  {
    id: 1,
    name: 'Tech Solutions Ltda',
    email: 'contato@techsolutions.com',
    phone: '(11) 98765-4321',
    industry: 'tech',
    status: 'active',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    website: 'www.techsolutions.com',
    employees: 150,
    revenue: 5000000,
    notes: 'Cliente premium com potencial para grandes eventos'
  },
  {
    id: 2,
    name: 'InovaCorp',
    email: 'eventos@inovacorp.com',
    phone: '(11) 99876-5432',
    industry: 'finance',
    status: 'active',
    address: 'Rua Augusta, 500 - São Paulo, SP',
    website: 'www.inovacorp.com',
    employees: 80,
    revenue: 3000000,
    notes: 'Interessados em eventos corporativos trimestrais'
  },
  {
    id: 3,
    name: 'EventPlus',
    email: 'comercial@eventplus.com',
    phone: '(11) 98765-1234',
    industry: 'retail',
    status: 'pending',
    address: 'Shopping Center Norte - São Paulo, SP',
    website: 'www.eventplus.com',
    employees: 200,
    revenue: 8000000,
    notes: 'Aguardando aprovação de orçamento para festival'
  },
  {
    id: 4,
    name: 'HealthCare Solutions',
    email: 'marketing@healthcare.com',
    phone: '(11) 97654-3210',
    industry: 'health',
    status: 'inactive',
    address: 'Av. Faria Lima, 2000 - São Paulo, SP',
    website: 'www.healthcare.com',
    employees: 300,
    revenue: 12000000,
    notes: 'Pausaram eventos devido à reestruturação'
  }
];

const getIndustryLabel = (value: string | null | undefined): string => {
  if (!value) return 'Não informado';
  return industryOptions.find(opt => opt.value === value)?.label || value;
};

const filterCompanies = (
  companies: Company[],
  searchTerm: string,
  statusFilter: string,
  industryFilter: string
) => {
  const lowerSearch = searchTerm.toLowerCase();

  return companies.filter(company => {
    const matchesSearch =
      company.name.toLowerCase().includes(lowerSearch) ||
      (company.email?.toLowerCase().includes(lowerSearch) ?? false) ||
      (company.phone?.includes(searchTerm) ?? false);

    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;

    return matchesSearch && matchesStatus && matchesIndustry;
  });
};

const sortCompanies = (
  companies: Company[],
  sortBy: SortBy<Company>,
  sortDirection: SortDirection
) => {
  return [...companies].sort((a, b) => {
    let aVal = a[sortBy.key];
    let bVal = b[sortBy.key];

    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();

    if (aVal === undefined) return 1;
    if (bVal === undefined) return -1;

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
};

const PAGE_SIZE = 10;

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  const [currentPage, setCurrentPage] = useState(1);

  // Ordenação — agora com tipo correto
  const [sortBy, setSortBy] = useState<SortBy<Company>>({ key: 'name', direction: 'asc' });
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Modal de confirmação para deletar
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const filteredCompanies = useMemo(() => {
    const filtered = filterCompanies(companies, searchTerm, statusFilter, industryFilter);
    const sorted = sortCompanies(filtered, sortBy, sortBy.direction);
    return sorted;
  }, [companies, searchTerm, statusFilter, industryFilter, sortBy]);

  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredCompanies.slice(start, start + PAGE_SIZE);
  }, [filteredCompanies, currentPage]);

  const totalPages = Math.ceil(filteredCompanies.length / PAGE_SIZE);

  const handleDeleteCompany = useCallback(() => {
    if (companyToDelete) {
      setCompanies(prev => prev.filter(c => c.id !== companyToDelete.id));
      setShowConfirmDelete(false);
      setCompanyToDelete(null);
    }
  }, [companyToDelete]);

  const handleRequestDelete = useCallback((company: Company) => {
    setCompanyToDelete(company);
    setShowConfirmDelete(true);
  }, []);

  const handleEditCompany = useCallback((company: Company) => {
    setSelectedCompany(company);
    setShowModal(true);
  }, []);

  const handleSaveCompany = useCallback((updatedCompany: Company) => {
    setCompanies(prev =>
      prev.some(c => c.id === updatedCompany.id)
        ? prev.map(c => (c.id === updatedCompany.id ? updatedCompany : c))
        : [...prev, { ...updatedCompany, id: Date.now() }]
    );
    setShowModal(false);
  }, []);

  const handleNewCompany = useCallback(() => {
    setSelectedCompany(null);
    setShowModal(true);
  }, []);

  const handleSortChange = useCallback(
    (columnKey: keyof Company) => {
      if (sortBy.key === columnKey) {
        // inverte direção
        setSortBy(prev => ({
          key: prev.key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        }));
      } else {
        setSortBy({ key: columnKey, direction: 'asc' });
      }
    },
    [sortBy]
  );

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'CRM', href: '/crm' },
    { label: 'Empresas' }
  ];

  const handleExport = () => {
    console.log('Exportando empresas...');
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
        onClick={handleNewCompany}
      >
        Nova Empresa
      </Button>
    </>
  );

  // Calcular métricas
  const totalRevenue = companies.reduce((sum, company) => sum + (company.revenue || 0), 0);
  const totalEmployees = companies.reduce((sum, company) => sum + (company.employees || 0), 0);
  const activeCompanies = companies.filter(c => c.status === 'active').length;
  const avgRevenue = companies.length > 0 ? totalRevenue / companies.length : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Empresas"
        subtitle={`Gerencie suas ${companies.length} empresas parceiras e clientes`}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />
      
      <div className="p-6 space-y-6">
        {/* Métricas das Empresas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total de Empresas"
            value={companies.length.toString()}
            change={{ value: "12", type: "increase" }}
            icon={Building2}
            iconColor="text-blue-600"
            subtitle="último mês"
          />
          <MetricCard
            title="Empresas Ativas"
            value={activeCompanies.toString()}
            change={{ value: "8.5%", type: "increase" }}
            icon={TrendingUp}
            iconColor="text-green-600"
            subtitle="último mês"
          />
          <MetricCard
            title="Receita Total"
            value={formatCurrency(totalRevenue)}
            change={{ value: "15.2%", type: "increase" }}
            icon={Users}
            iconColor="text-purple-600"
            subtitle="último mês"
          />
          <MetricCard
            title="Receita Média"
            value={formatCurrency(avgRevenue)}
            change={{ value: "3.1%", type: "increase" }}
            icon={TrendingUp}
            iconColor="text-orange-600"
            subtitle="último mês"
          />
        </div>

        {/* Distribuição por Setor */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição por Setor</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {industryOptions.filter(opt => opt.value !== 'all').map(industry => {
                const count = companies.filter(c => c.industry === industry.value).length;
                const percentage = companies.length > 0 ? (count / companies.length) * 100 : 0;
                return (
                  <div key={industry.value} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                    <div className="text-sm text-gray-600">{industry.label}</div>
                    <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Filtros e busca */}
        <Card>
          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            industryFilter={industryFilter}
            setIndustryFilter={setIndustryFilter}
            statusOptions={statusOptions}
            industryOptions={industryOptions}
          />
        </Card>

        {/* Tabela de empresas */}
        <Card>
          {paginatedCompanies.length > 0 ? (
            <>
              <CompanyTable
                companies={paginatedCompanies}
                getIndustryLabel={getIndustryLabel}
                handleEditCompany={handleEditCompany}
                handleRequestDelete={handleRequestDelete}
                sortBy={sortBy.key}
                sortDirection={sortBy.direction}
                onSortChange={handleSortChange}
              />

              {totalPages > 1 && (
                <div className="p-6 border-t border-gray-200">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    >
                      Anterior
                    </Button>
                    <span className="px-4 py-2 text-sm text-gray-600 flex items-center">
                      Página {currentPage} de {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    >
                      Próximo
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon={Building2}
              title="Nenhuma empresa encontrada"
              description="Não há empresas que correspondam aos filtros aplicados."
              action={{
                label: "Adicionar Empresa",
                onClick: handleNewCompany,
                icon: Plus
              }}
            />
          )}
        </Card>

        <CompanyModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedCompany={selectedCompany}
          industryOptions={industryOptions}
          statusOptions={statusOptions}
          handleSaveCompany={handleSaveCompany}
        />

        {companyToDelete && (
          <ConfirmationModal
            title="Confirmar exclusão"
            message={`Tem certeza que deseja deletar a empresa "${companyToDelete.name}"? Essa ação não pode ser desfeita.`}
            isOpen={showConfirmDelete}
            onCancel={() => setShowConfirmDelete(false)}
            onConfirm={handleDeleteCompany}
          />
        )}
      </div>
    </PageContainer>
  );
}
