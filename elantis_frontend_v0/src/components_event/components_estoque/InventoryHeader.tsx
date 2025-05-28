import { FiPlus, FiMap } from 'react-icons/fi';

interface InventoryHeaderProps {
  title: string;
  onAddItem: () => void;
  onViewMap: () => void;
}

export default function InventoryHeader({ title, onAddItem, onViewMap }: InventoryHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="flex space-x-2">
        <button
          onClick={onViewMap}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-50"
        >
          <FiMap className="mr-2" />
          Ver Mapa
        </button>
        <button
          onClick={onAddItem}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FiPlus className="mr-2" />
          Novo Item
        </button>
      </div>
    </div>
  );
}