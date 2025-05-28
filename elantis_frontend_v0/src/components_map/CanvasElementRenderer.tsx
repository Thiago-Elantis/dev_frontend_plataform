import { CanvasElement } from '@/types/map-event';

interface CanvasElementRendererProps {
  element: CanvasElement;
  isSelected: boolean;
}

export function CanvasElementRenderer({ element, isSelected }: CanvasElementRendererProps) {
  const renderElement = () => {
    switch (element.type) {
      case 'booth':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-white font-medium">{element.boothNumber}</div>
            {element.company && (
              <div className="text-white text-xs mt-1">{element.company}</div>
            )}
          </div>
        );
      case 'lecture':
        return (
          <div className="p-2 h-full">
            <h3 className="text-white font-medium text-sm">{element.title}</h3>
            <div className="text-white text-xs mt-1">
              Capacidade: {element.capacity}
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="text-sm" style={{ color: element.color }}>
            {element.text}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`absolute ${element.type !== 'line' ? 'cursor-pointer' : ''} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        left: `${element.x}px`,
        top: `${element.y}px`,
        width: element.width ? `${element.width}px` : 'auto',
        height: element.height ? `${element.height}px` : 'auto',
        backgroundColor: element.type !== 'line' ? element.color : 'transparent',
        opacity: 0.8,
      }}
    >
      {renderElement()}
    </div>
  );
}