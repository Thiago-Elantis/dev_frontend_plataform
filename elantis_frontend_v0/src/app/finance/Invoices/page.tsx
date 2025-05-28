'use client';

import { useState } from 'react';
import {
  FiPlus,
  FiDownload,
  FiFileText,
  FiDollarSign,
  FiClock,
  FiCheck
} from 'react-icons/fi';
import Sidebar from '@/components_dashboard/Sidebar';
import InvoiceHeader from '@/components_finance/components_faturas/InvoiceHeader';
import InvoiceSummary from '@/components_finance/components_faturas/InvoiceSummary';
import InvoiceFilters from '@/components_finance/components_faturas/InvoiceFilters';
import InvoiceTable from '@/components_finance/components_faturas/InvoiceTable';
import InvoiceModal from '@/components_finance/components_faturas/InvoiceModal';
import DocumentViewer from '@/components_finance/components_faturas/DocumentViewer';
import { Invoice, InvoiceFilterOption, InvoiceSummaryTP } from '@/types/invoice';

const invoiceTypes: InvoiceFilterOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'NF', label: 'Nota Fiscal' },
  { value: 'Boleto', label: 'Boleto' },
  { value: 'Fatura', label: 'Fatura' }
];

const statusOptions: InvoiceFilterOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendente' },
  { value: 'partial', label: 'Parcial' },
  { value: 'paid', label: 'Pago' },
  { value: 'overdue', label: 'Vencido' },
  { value: 'canceled', label: 'Cancelado' }
];

const initialInvoices: Invoice[] = [
  {
    id: '1',
    client: 'Empresa A',
    clientId: 'cli-001',
    invoiceNumber: 'NF-2023-001',
    type: 'NF',
    issueDate: '2023-06-01',
    dueDate: '2023-07-01',
    amount: 12500.0,
    paidAmount: 12500.0,
    status: 'paid',
    paymentMethod: 'PIX',
    paymentDate: '2023-06-28',
    documents: ['nf-001.pdf', 'comprovante-pix-001.pdf']
  }
  // ... outras faturas
];

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('month');
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoices] = useState<Invoice[]>(initialInvoices);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || invoice.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesDate = dateFilter === 'all' || true; // lógica de data ainda a ser implementada

    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const totalPending = invoices
    .filter((i) => i.status === 'pending')
    .reduce((sum, i) => sum + (i.amount - (i.paidAmount || 0)), 0);

  const totalOverdue = invoices
    .filter((i) => i.status === 'overdue')
    .reduce((sum, i) => sum + (i.amount - (i.paidAmount || 0)), 0);

  const totalPaid = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const summaryData: InvoiceSummaryTP[] = [
    {
      title: 'Pendentes',
      value: totalPending,
      icon: <FiClock />,
      color: 'text-yellow-600'
    },
    {
      title: 'Vencidos',
      value: totalOverdue,
      icon: <FiClock />,
      color: 'text-red-600'
    },
    {
      title: 'Recebidos',
      value: totalPaid,
      change: '+8% em relação ao mês passado',
      icon: <FiCheck />,
      color: 'text-green-600'
    }
  ];

  const handleAddInvoice = () => {
    setSelectedInvoice(null);
    setShowModal(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const handleSaveInvoice = (invoiceData: Invoice) => {
    // Lógica para salvar a fatura
    console.log('Salvando fatura:', invoiceData);
    setShowModal(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(dateString));
};


  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-auto p-6">
        <InvoiceHeader
          title="Gestão de Faturas"
          onAddInvoice={handleAddInvoice}
          onExport={() => console.log('Exportar dados')}
        />

        <InvoiceSummary data={summaryData} formatCurrency={formatCurrency} />

        <InvoiceFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          invoiceTypes={invoiceTypes}
          statusOptions={statusOptions}
        />

        <InvoiceTable
          invoices={filteredInvoices}
          onEdit={handleEditInvoice}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />

        {showDocumentViewer && (
          <DocumentViewer
            documents={selectedDocuments}
            onClose={() => setShowDocumentViewer(false)}
          />
        )}

        {showModal && (
          <InvoiceModal
            invoice={selectedInvoice}
            onClose={() => setShowModal(false)}
            onSave={handleSaveInvoice}
            formatCurrency={formatCurrency}
          />
        )}
      </div>
    </div>
  );
}
