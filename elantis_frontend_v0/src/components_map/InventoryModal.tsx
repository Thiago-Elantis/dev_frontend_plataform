'use client';

import React, { useState, useEffect } from 'react';

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
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Inicializa quantidades baseadas nos itens selecionados
    const initialQuantities = selectedItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {} as { [key: string]: number });
    setQuantity(initialQuantities);
  }, [selectedItems]);

  const handleQuantityChange = (id: string, value: number) => {
    if (value < 0) value = 0;
    const max = inventory.find(item => item.id === id)?.quantity ?? 0;
    if (value > max) value = max;

    setQuantity(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const isSelected = (id: string) => selectedItems.some(item => item.id === id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inventory-modal-title"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 id="inventory-modal-title" className="text-xl font-bold mb-4">
          Vincular Itens do Inventário
        </h2>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {inventory.map(item => {
            const currentQty = quantity[item.id] ?? 0;
            const selected = isSelected(item.id);
            const maxQty = item.quantity;
            const isValidQuantity = currentQty > 0 && currentQty <= maxQty;

            return (
              <div key={item.id} className="flex items-center justify-between p-2 border-b">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">Disponível: {item.quantity}</div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min={0}
                    max={maxQty}
                    value={currentQty}
                    onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                    className="w-20 border border-gray-300 rounded p-1 text-right"
                    disabled={!selected}
                    aria-label={`Quantidade para ${item.name}`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onSelectItem({
                        ...item,
                        quantity: currentQty || 1,
                      })
                    }
                    disabled={!isValidQuantity}
                    className={`px-3 py-1 rounded transition-colors duration-200
                      ${selected && isValidQuantity
                        ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                        : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      }`}
                    aria-pressed={selected}
                    aria-label={selected ? `Atualizar ${item.name}` : `Vincular ${item.name}`}
                  >
                    {selected ? 'Atualizar' : 'Vincular'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
