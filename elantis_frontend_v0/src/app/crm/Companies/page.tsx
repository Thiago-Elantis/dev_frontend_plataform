'use client';

import { useState, useMemo, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';

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
const initialCompanies: Company[] = [ /* ... */ ];

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

  return (
    <div className="flex h-screen bg-gray-50 ">
      <div className="flex-1 overflow-auto p-6">
        <div className=" flex items-center mb-6 justify-end">
          <button
            onClick={handleNewCompany}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            aria-label="Adicionar nova empresa"
          >
            <FiPlus className="mr-2" />
            Nova Empresa
          </button>
          
        </div>

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
          <div className="mt-4 flex justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-3 py-1 rounded border bg-gray-200">
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        )}

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
    </div>
  );
}
