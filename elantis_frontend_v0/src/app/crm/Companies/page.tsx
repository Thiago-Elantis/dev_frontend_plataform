'use client';

import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import SearchAndFilter from '@/components_crm/components_companies/SearchAndFilter';
import CompanyTable from '@/components_crm/components_companies/CompanyTable';
import CompanyModal from '@/components_crm/components_companies/CompanyModal';
import { Company, Option } from '@/types';

const statusOptions: Option[] = [
  { value: 'all', label: 'Todas' },
  { value: 'active', label: 'Ativas' },
  { value: 'inactive', label: 'Inativas' },
  { value: 'partner', label: 'Parceiras' },
  { value: 'sponsor', label: 'Patrocinadoras' },
];

const industryOptions: Option[] = [
  { value: 'all', label: 'Todos' },
  { value: 'technology', label: 'Tecnologia' },
  { value: 'finance', label: 'Finanças' },
  { value: 'health', label: 'Saúde' },
  { value: 'education', label: 'Educação' },
  { value: 'retail', label: 'Varejo' },
  { value: 'manufacturing', label: 'Manufatura' },
  { value: 'other', label: 'Outros' },
];

const initialCompanies: Company[] = [
  {
    id: 1,
    name: 'Tech Solutions',
    email: 'contato@techsolutions.com',
    phone: '(11) 9876-5432',
    industry: 'technology',
    status: 'active',
    address: 'Av. Paulista, 1000 - São Paulo/SP',
    website: 'https://techsolutions.com',
    contacts: 5,
    notes: 'Interessada em patrocínio nível prata',
  },
  // ... outros dados de exemplo
];

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (company.phone?.includes(searchTerm) ?? false);

    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;

    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const handleDeleteCompany = (id: number) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleSaveCompany = (updatedCompany: Company) => {
    setCompanies(prev =>
      prev.some(c => c.id === updatedCompany.id)
        ? prev.map(c => (c.id === updatedCompany.id ? updatedCompany : c))
        : [...prev, { ...updatedCompany, id: Date.now() }] // adiciona novo se não existir id
    );
    setShowModal(false);
  };

  const getIndustryLabel = (value: string | null | undefined): string => {
  if (!value) return 'Não informado';
    return industryOptions.find(opt => opt.value === value)?.label || value;
  };

  return (
    <div className="flex h-screen bg-gray-50">

      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={() => {
              setSelectedCompany(null);
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
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
          companies={filteredCompanies}
          getIndustryLabel={getIndustryLabel}
          handleEditCompany={handleEditCompany}
          handleDeleteCompany={handleDeleteCompany}
        />

        <CompanyModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedCompany={selectedCompany}
          industryOptions={industryOptions}
          statusOptions={statusOptions}
          handleSaveCompany={handleSaveCompany} // <-- Note o parâmetro aqui!
        />
      </div>
    </div>
  );
}
