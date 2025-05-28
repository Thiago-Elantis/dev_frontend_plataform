export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'canceled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'completed': return 'Concluído';
    case 'pending': return 'Pendente';
    case 'canceled': return 'Cancelado';
    default: return status;
  }
};

export const getTypeLabel = (type: string): string => {
  switch (type) {
    case 'income': return 'Receita';
    case 'expense': return 'Despesa';
    default: return type;
  }
};

export const getMethodLabel = (method: string): string => {
  switch (method) {
    case 'credit_card': return 'Cartão de Crédito';
    case 'debit_card': return 'Cartão de Débito';
    case 'bank_transfer': return 'Transferência Bancária';
    case 'pix': return 'PIX';
    case 'cash': return 'Dinheiro';
    default: return method;
  }
};