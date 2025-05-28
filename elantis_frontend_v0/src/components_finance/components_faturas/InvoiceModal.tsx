import { useState, useEffect } from 'react';
import { Invoice } from '@/types/invoice';

interface InvoiceModalProps {
  invoice: Invoice | null;
  onClose: () => void;
  onSave: (invoiceData: Invoice) => void;
  formatCurrency: (value: number) => string;
}

export default function InvoiceModal({ 
  invoice, 
  onClose, 
  onSave,
  formatCurrency
}: InvoiceModalProps) {
  const [formData, setFormData] = useState<Omit<Invoice, 'id'>>({
    client: '',
    clientId: '',
    invoiceNumber: '',
    type: 'NF',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 0,
    status: 'pending',
    documents: [],
  });

  useEffect(() => {
    if (invoice) {
      setFormData(invoice);
    } else {
      setFormData({
        client: '',
        clientId: '',
        invoiceNumber: '',
        type: 'NF',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        amount: 0,
        status: 'pending',
        documents: [],
      });
    }
  }, [invoice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    const invoiceData: Invoice = {
      ...formData,
      id: invoice?.id || Date.now().toString()
    };
    onSave(invoiceData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">
          {invoice ? 'Editar Fatura' : 'Nova Fatura'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
              <input
                type="text"
                name="client"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.client}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
              <input
                type="text"
                name="invoiceNumber"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.invoiceNumber}
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
                <option value="NF">Nota Fiscal</option>
                <option value="Boleto">Boleto</option>
                <option value="Fatura">Fatura</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pendente</option>
                <option value="partial">Parcial</option>
                <option value="paid">Pago</option>
                <option value="overdue">Vencido</option>
                <option value="canceled">Cancelado</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Emissão</label>
              <input
                type="date"
                name="issueDate"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.issueDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Vencimento</label>
              <input
                type="date"
                name="dueDate"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
              <input
                type="number"
                name="amount"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.amount}
                onChange={handleNumberChange}
                step="0.01"
                min="0"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor Pago</label>
              <input
                type="number"
                name="paidAmount"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.paidAmount || ''}
                onChange={handleNumberChange}
                step="0.01"
                min="0"
              />
            </div>
            
            <div className="md:col-span-2">
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
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.documents.map((doc, index) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {doc}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
              <textarea
                name="notes"
                className="w-full border border-gray-300 rounded-lg p-2"
                rows={3}
                value={formData.notes || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
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
    </div>
  );
}