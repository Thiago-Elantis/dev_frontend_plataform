import { InventoryItem } from '@/types/inventory';

interface MapViewerProps {
  items: InventoryItem[];
  onClose: () => void;
  onPositionSelect: (position: { x: number; y: number }) => void;
  selectedItem?: InventoryItem | null;
}

export default function MapViewer({ 
  items, 
  onClose, 
  onPositionSelect,
  selectedItem
}: MapViewerProps) {
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onPositionSelect({ x, y });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {selectedItem ? `Posicionar ${selectedItem.name}` : 'Mapa do Evento'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Fechar
          </button>
        </div>
        
        <div 
          className="relative w-full h-96 bg-gray-100 rounded-lg border-2 border-gray-300"
          onClick={selectedItem ? handleMapClick : undefined}
          style={{ cursor: selectedItem ? 'crosshair' : 'default' }}
        >
          {/* Mapa base (pode ser substituído por uma imagem real) */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            {selectedItem ? (
              <p>Clique no mapa para posicionar {selectedItem.name}</p>
            ) : (
              <p>Mapa do Evento</p>
            )}
          </div>
          
          {/* Itens posicionados no mapa */}
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs"
              style={{
                left: `${item.mapPosition?.x}%`,
                top: `${item.mapPosition?.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              title={item.name}
            />
          ))}
        </div>
        
        {selectedItem && (
          <div className="mt-4 text-sm text-gray-600">
            Clique no mapa para definir a posição de {selectedItem.name}
          </div>
        )}
      </div>
    </div>
  );
}