import { FiType, FiTrash2 } from 'react-icons/fi';
import { CanvasElement } from '@/types/map-event';

interface ElementContextMenuProps {
  element: CanvasElement;
  onUpdate: (updated: CanvasElement) => void;
  onDelete: () => void;
  onConvertToLecture?: () => void;
}

export const ElementContextMenu = ({
  element,
  onUpdate,
  onDelete,
  onConvertToLecture,
}: ElementContextMenuProps) => {
  const renderInputs = () => {
    switch (element.type) {
      case 'booth':
        return (
          <>
            <input
              type="text"
              value={element.boothNumber || ''}
              onChange={(e) =>
                onUpdate({ ...element, boothNumber: e.target.value })
              }
              className="input-base w-24"
              placeholder="Número"
              aria-label="Número do estande"
              title="Número do estande"
            />
            <input
              type="text"
              value={element.company || ''}
              onChange={(e) =>
                onUpdate({ ...element, company: e.target.value })
              }
              className="input-base flex-1"
              placeholder="Empresa"
              aria-label="Empresa"
              title="Empresa"
            />
            {onConvertToLecture && (
              <button
                onClick={onConvertToLecture}
                className="btn-icon bg-purple-600 hover:bg-purple-700"
                title="Converter para Palestra"
                aria-label="Converter para palestra"
              >
                <FiType />
              </button>
            )}
          </>
        );

      case 'text':
        return (
          <input
            type="text"
            value={element.text || ''}
            onChange={(e) =>
              onUpdate({ ...element, text: e.target.value })
            }
            className="input-base flex-1"
            placeholder="Texto"
            aria-label="Texto livre"
            title="Texto livre"
          />
        );

      case 'shape':
        return (
          <select
            value={element.shape || 'rectangle'}
            onChange={(e) =>
              onUpdate({ ...element, shape: e.target.value as 'rectangle' | 'circle' })
            }
            className="input-base"
            aria-label="Forma"
            title="Forma"
          >
            <option value="rectangle">Retângulo</option>
            <option value="circle">Círculo</option>
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-40 w-full max-w-3xl">
      <div className="flex gap-2 items-center">
        {renderInputs()}

        <button
          onClick={onDelete}
          className="btn-icon bg-red-600 hover:bg-red-700"
          title="Remover elemento"
          aria-label="Remover elemento"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};
