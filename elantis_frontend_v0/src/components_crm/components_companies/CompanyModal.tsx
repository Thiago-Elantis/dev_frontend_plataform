import { useEffect, useState } from 'react';
import { Company, Option } from '@/types';

interface CompanyModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedCompany: Company | null;
  industryOptions: Option[];
  statusOptions: Option[];
  handleSaveCompany: (company: Company) => void;
}

export default function CompanyModal({
  showModal,
  setShowModal,
  selectedCompany,
  industryOptions,
  statusOptions,
  handleSaveCompany,
}: CompanyModalProps) {
  const [company, setCompany] = useState<Company>({
    id: 0,
    name: '',
    status: 'active',
  });

  useEffect(() => {
    if (selectedCompany) {
      setCompany(selectedCompany);
    } else {
      setCompany({
        id: 0,
        name: '',
        status: 'active',
      });
    }
  }, [selectedCompany]);

  if (!showModal) return null;

  const handleChange = (field: keyof Company, value: string) => {
    setCompany(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSave = () => {
    // Validação mínima
    if (!company.name.trim()) {
      alert('O nome da empresa é obrigatório.');
      return;
    }
    handleSaveCompany(company);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {company.id === 0 ? 'Nova Empresa' : 'Editar Empresa'}
        </h2>

        <label className="block mb-2">
          Nome*
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            value={company.name}
            onChange={e => handleChange('name', e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Status*
          <select
            className="w-full border rounded px-2 py-1"
            value={company.status}
            onChange={e => handleChange('status', e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-2">
          Indústria
          <select
            className="w-full border rounded px-2 py-1"
            value={company.industry || ''}
            onChange={e => handleChange('industry', e.target.value)}
          >
            <option value="">Selecione</option>
            {industryOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-2">
          Email
          <input
            type="email"
            className="w-full border rounded px-2 py-1"
            value={company.email || ''}
            onChange={e => handleChange('email', e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Telefone
          <input
            type="tel"
            className="w-full border rounded px-2 py-1"
            value={company.phone || ''}
            onChange={e => handleChange('phone', e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Endereços
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            value={company.address || ''}
            onChange={e => handleChange('address', e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Website
          <input
            type="url"
            className="w-full border rounded px-2 py-1"
            value={company.website || ''}
            onChange={e => handleChange('website', e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Contatos
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            value={company.contacts ?? ''}
            onChange={e => handleChange('contacts', e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Notas
          <textarea
            className="w-full border rounded px-2 py-1"
            value={company.notes || ''}
            onChange={e => handleChange('notes', e.target.value)}
          />
        </label>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
