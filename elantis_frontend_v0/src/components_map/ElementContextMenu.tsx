import { FiType, FiTrash2, FiX } from 'react-icons/fi';
import { CanvasElement } from '@/types/map-event';

export const ElementContextMenu = ({
  element,
  onUpdate,
  onDelete,
  onConvertToLecture,
}: {
  element: CanvasElement;
  onUpdate: (updated: CanvasElement) => void;
  onDelete: () => void;
  onConvertToLecture?: () => void;
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg border border-gray-200 p-3 z-40">
      <div className="flex space-x-2">
        {element.type === 'booth' && (
          <>
            <input
              type="text"
              placeholder="Número"
              value={element.boothNumber || ''}
              onChange={(e) => {
                onUpdate({...element, boothNumber: e.target.value});
              }}
              className="border border-gray-300 rounded-lg p-2 w-20"
            />
            <input
              type="text"
              placeholder="Empresa"
              value={element.company || ''}
              onChange={(e) => {
                onUpdate({...element, company: e.target.value});
              }}
              className="border border-gray-300 rounded-lg p-2 flex-1"
            />
            {onConvertToLecture && (
              <button
                onClick={onConvertToLecture}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                title="Converter para Palestra"
              >
                <FiType />
              </button>
            )}
          </>
        )}

        {element.type === 'text' && (
          <input
            type="text"
            value={element.text || ''}
            onChange={(e) => {
              onUpdate({...element, text: e.target.value});
            }}
            className="border border-gray-300 rounded-lg p-2 flex-1"
          />
        )}

        {element.type === 'shape' && (
          <select
            value={element.shape || 'rectangle'}
            onChange={(e) => {
              onUpdate({...element, shape: e.target.value as 'rectangle' | 'circle'});
            }}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="rectangle">Retângulo</option>
            <option value="circle">Círculo</option>
          </select>
        )}

        <button
          onClick={onDelete}
          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
          title="Remover"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};