'use client';

import { useState, useEffect } from 'react';
import { Agent } from '@/types/agent';
import { FiX } from 'react-icons/fi';

interface AgentModalProps {
  agent: Agent | null;
  onClose: () => void;
  onSave: (agentData: Agent) => void;
}

export default function AgentModal({ agent, onClose, onSave }: AgentModalProps) {
  const [formData, setFormData] = useState<Omit<Agent, 'id'>>({
    name: '',
    type: 'supplier',
    contact: '',
    email: '',
    phone: '',
    totalContracts: 0,
    totalValue: 0,
    pendingPayments: 0,
    documents: [],
  });

  useEffect(() => {
    if (agent) {
      setFormData(agent);
    } else {
      setFormData({
        name: '',
        type: 'supplier',
        contact: '',
        email: '',
        phone: '',
        totalContracts: 0,
        totalValue: 0,
        pendingPayments: 0,
        documents: [],
      });
    }
  }, [agent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const agentData: Agent = {
      ...formData,
      id: agent?.id || Date.now().toString()
    };
    onSave(agentData);
    onClose();
  };

  return (
    <div className="fixed top-16 right-0 h-full w-96 bg-white shadow-xl z-20 transform transition-transform duration-300 ">
      <div className="flex justify-between items-center p-4 border-b ">
        <h2 className="text-lg font-bold">
          {agent ? 'Editar Fornecedor' : 'Novo Fornecedor'}
        </h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 overflow-auto h-[calc(100%-64px)] space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
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
              <option value="supplier">Fornecedor</option>
              <option value="contractor">Contratado</option>
              <option value="partner">Parceiro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contato</label>
            <input
              type="text"
              name="contact"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.email}
              onChange={handleChange}
              required
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
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Documentos</label>
            <input
              type="file"
              multiple
              className="w-full border border-gray-300 rounded-lg p-2"
              onChange={(e) => {
                if (e.target.files) {
                  const files = Array.from(e.target.files).map(file => file.name);
                  setFormData(prev => ({
                    ...prev,
                    documents: [...prev.documents, ...files]
                  }));
                }
              }}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
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
      </form>
    </div>
  );
}
