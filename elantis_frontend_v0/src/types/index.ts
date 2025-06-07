export interface Option {
  value: string;
  label: string;
}

export interface Company {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  industry?: string;
  status: string;
  address?: string;   // opcional
  website?: string;   // opcional
  contacts?: number;  // opcional
  notes?: string;
}

export interface FinancialSummary {
  label: string;
  value: number;
  change: string;
  color: string;
}

// Adicionado
export interface Client {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: 'active' | 'inactive' | 'lead' | 'vip';
  tags: string[];
  lastContact: string;
  notes?: string;
}

// Adicionado
export type PipelineStageTP = {
  id: string;
  title: string;
  color: string;
};

export interface Deal {
  id: string;
  name: string;
  amount: number;
  contact: string;
  expectedClose: string;
  probability: number;
}

export interface DealsByStage {
  [stageId: string]: Deal[];
}

export interface NewDealForm {
  name: string;
  amount: string;
  contact: string;
  expectedClose: string;
  stage: string;
}

// Adicionado
export interface ReportType {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface PeriodOption {
  value: string;
  label: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    tension?: number;
    fill?: boolean;
  }[];
}

export interface GrowthItem {
  year: string;
  value: string;
}

// Adicionado
export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'canceled';
  date: string;
  client: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FinancialSummaryCard {
  title: string;
  value: number;
  change: string;
  icon: React.ReactNode;
  color: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortBy<T> {
  key: keyof T;
  direction: SortDirection;
}
