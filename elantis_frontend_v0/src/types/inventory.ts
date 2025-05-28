export interface InventoryItem {
  id: string;
  name: string;
  type: 'Estande' | 'Palestra' | 'Patrocinio' | 'Outro';
  category: string;
  quantity: number;
  location?: string; // Coordenadas ou referência no mapa
  mapPosition?: { x: number; y: number };
  sponsor?: string;
  status: 'disponivel' | 'reservado' | 'ocupado' | 'manutencao';
  description?: string;
  image?: string;
}

export interface InventoryFilterOption {
  value: string;
  label: string;
}