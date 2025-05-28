import { 
  FiSquare, 
  FiType, 
  FiEdit2, 
  FiMinus, 
  FiImage, 
  FiEdit 
} from 'react-icons/fi';
import { CanvasElement, ModeType } from '@/types/map-event';

interface EventMapToolbarProps {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  selectedElement: CanvasElement | null;
  elements: CanvasElement[];
  setElements: (elements: CanvasElement[]) => void;
  setSelectedElement: (element: CanvasElement | null) => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#000000'];

export default function EventMapToolbar({
  mode,
  setMode,
  selectedElement,
  elements,
  setElements,
  setSelectedElement
}: EventMapToolbarProps) {
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-4 flex items-center space-x-2 select-none">
      <ToolbarButton 
        active={mode === 'select'} 
        onClick={() => setMode('select')} 
        title="Selecionar"
        icon={<FiEdit2 />}
      />
      <ToolbarButton 
        active={mode === 'booth'} 
        onClick={() => setMode('booth')} 
        title="Adicionar Estande"
        icon={<FiSquare />}
      />
      <ToolbarButton 
        active={mode === 'lecture'} 
        onClick={() => setMode('lecture')} 
        title="Adicionar Área de Palestra"
        icon={<FiType />}
      />
      <ToolbarButton 
        active={mode === 'line'} 
        onClick={() => setMode('line')} 
        title="Desenhar Linha"
        icon={<FiMinus />}
      />
      <ToolbarButton 
        active={mode === 'text'} 
        onClick={() => setMode('text')} 
        title="Adicionar Texto"
        icon={<FiEdit />}
      />
      <ToolbarButton 
        active={mode === 'shape'} 
        onClick={() => setMode('shape')} 
        title="Adicionar Forma"
        icon={<FiImage />}
      />

      <ColorPicker 
        selectedElement={selectedElement}
        elements={elements}
        setElements={setElements}
        setSelectedElement={setSelectedElement}
      />
    </div>
  );
}

interface ToolbarButtonProps {
  active: boolean;
  onClick: () => void;
  title: string;
  icon: React.ReactNode;
}

function ToolbarButton({ active, onClick, title, icon }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={active}
      className={`
        p-2 rounded-lg 
        transition-colors duration-200 
        focus:outline-none focus:ring-2 focus:ring-blue-400
        ${active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200'}
      `}
    >
      {icon}
    </button>
  );
}

interface ColorPickerProps {
  selectedElement: CanvasElement | null;
  elements: CanvasElement[];
  setElements: (elements: CanvasElement[]) => void;
  setSelectedElement: (element: CanvasElement | null) => void;
}

function ColorPicker({ selectedElement, elements, setElements, setSelectedElement }: ColorPickerProps) {
  const updateColor = (color: string) => {
    if (!selectedElement || selectedElement.color === color) return;

    const updated = { ...selectedElement, color };
    setSelectedElement(updated);
    setElements(elements.map(el => (el.id === selectedElement.id ? updated : el)));
  };

  return (
    <div className="flex items-center ml-4">
      {colors.map(color => (
        <button
          key={color}
          type="button"
          aria-label={`Selecionar cor ${color}`}
          onClick={() => updateColor(color)}
          className={`
            w-6 h-6 rounded-full mx-1 
            transition-shadow duration-200
            ${selectedElement?.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : 'hover:ring-1 hover:ring-gray-300'}
          `}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
