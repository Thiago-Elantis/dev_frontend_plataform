export interface Invoice {
  id: string;
  client: string;
  clientId: string;
  invoiceNumber: string;
  type: 'NF' | 'Boleto' | 'Fatura';
  issueDate: string;
  dueDate: string;
  amount: number;
  paidAmount?: number;
  status: 'pending' | 'partial' | 'paid' | 'overdue' | 'canceled';
  paymentMethod?: string;
  paymentDate?: string;
  documents: string[];
  notes?: string;
}

export interface InvoiceFilterOption {
  value: string;
  label: string;
}

export interface InvoiceSummaryTP {
  title: string;
  value: number;
  change?: string;
  icon: React.ReactNode;
  color: string;
}