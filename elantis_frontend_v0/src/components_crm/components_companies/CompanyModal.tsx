'use client';

import { useEffect, useState } from 'react';
import { Company, Option } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

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

  const handleChange = (field: keyof Company, value: string) => {
    setCompany(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSave = () => {
    if (!company.name.trim()) {
      alert('O nome da empresa é obrigatório.');
      return;
    }
    handleSaveCompany(company);
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          key="company-modal"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed top-16 right-0 h-full w-96 bg-white shadow-xl z-30"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold">
              {company.id === 0 ? 'Nova Empresa' : 'Editar Empresa'}
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="p-4 overflow-auto h-[calc(100%-64px)] space-y-4">
            <Input label="Nome*" value={company.name} onChange={val => handleChange('name', val)} />
            <Select
              label="Status*"
              value={company.status}
              onChange={val => handleChange('status', val)}
              options={statusOptions}
            />
            <Select
              label="Indústria"
              value={company.industry || ''}
              onChange={val => handleChange('industry', val)}
              options={[{ label: 'Selecione', value: '' }, ...industryOptions]}
            />
            <Input label="Email" type="email" value={company.email || ''} onChange={val => handleChange('email', val)} />
            <Input label="Telefone" type="tel" value={company.phone || ''} onChange={val => handleChange('phone', val)} />
            <Input label="Endereço" value={company.address || ''} onChange={val => handleChange('address', val)} />
            <Input label="Website" type="url" value={company.website || ''} onChange={val => handleChange('website', val)} />
            <Input label="Contatos" type="number" value={company.contacts ?? ''} onChange={val => handleChange('contacts', val)} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2"
                value={company.notes || ''}
                onChange={e => handleChange('notes', e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={onSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
