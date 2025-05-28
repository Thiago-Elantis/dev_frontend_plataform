export interface Agent {
  id: string;
  name: string;
  type: 'supplier' | 'contractor' | 'partner';
  contact: string;
  email: string;
  phone: string;
  totalContracts: number;
  totalValue: number;
  pendingPayments: number;
  documents: string[];
  lastPaymentDate?: string;
}

export interface Contract {
  id: string;
  agentId: string;
  description: string;
  totalValue: number;
  installments: number;
  paidInstallments: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'canceled';
  documents: string[];
}

export interface Payment {
  id: string;
  contractId: string;
  value: number;
  dueDate: string;
  paymentDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  installmentNumber: number;
}

export interface AgentFilterOption {
  value: string;
  label: string;
}