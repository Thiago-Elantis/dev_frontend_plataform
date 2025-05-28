// utils/format.ts
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const getStatusColor = (status: string) => {
  switch(status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'canceled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusLabel = (status: string) => {
  switch(status) {
    case 'completed': return 'Concluído';
    case 'pending': return 'Pendente';
    case 'canceled': return 'Cancelado';
    default: return status;
  }
};