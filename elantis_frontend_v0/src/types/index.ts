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
  address?: string;   // <--- Torne opcional
  website?: string;   // <--- Torne opcional
  contacts?: number;  // <--- Torne opcional
  notes?: string;
}

export interface FinancialSummary {
  label: string;
  value: number;
  change: string;
  color: string;
}



// Adicione ao arquivo existente
export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'lead' | 'vip';
  tags: string[];
  lastContact: string;
  notes?: string;
}

// Adicione ao arquivo existente
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


// Adicione ao arquivo existente
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


// Adicione ao arquivo existente
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