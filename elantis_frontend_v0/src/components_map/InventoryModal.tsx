// components/InventoryModal.tsx
'use client';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

interface InventoryModalProps {
  inventory: InventoryItem[];
  selectedItems: InventoryItem[];
  onClose: () => void;
  onSelectItem: (item: InventoryItem) => void;
}

export default function InventoryModal({ 
  inventory, 
  selectedItems, 
  onClose, 
  onSelectItem 
}: InventoryModalProps) {
  const [quantity, setQuantity] = useState<{[key: string]: number}>({});

  useEffect(() => {
    // Inicializar quantidades
    const initialQuantities = selectedItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {} as {[key: string]: number});
    setQuantity(initialQuantities);
  }, [selectedItems]);

  const handleQuantityChange = (id: string, value: number) => {
    setQuantity(prev => ({
      ...prev,
      [id]: Math.max(0, value)
    }));
  };

  const isSelected = (id: string) => {
    return selectedItems.some(item => item.id === id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Vincular Itens do Inventário</h2>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {inventory.map(item => (
            <div key={item.id} className="flex items-center justify-between p-2 border-b">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">Disponível: {item.quantity}</div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max={item.quantity}
                  value={quantity[item.id] || 0}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                  className="w-20 border border-gray-300 rounded p-1 text-right"
                  disabled={!isSelected(item.id)}
                />
                <button
                  onClick={() => onSelectItem({
                    ...item,
                    quantity: quantity[item.id] || 1
                  })}
                  className={`px-3 py-1 rounded ${isSelected(item.id) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                >
                  {isSelected(item.id) ? 'Atualizar' : 'Vincular'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}