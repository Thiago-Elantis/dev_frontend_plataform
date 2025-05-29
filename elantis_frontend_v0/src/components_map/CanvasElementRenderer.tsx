import { CanvasElement } from '@/types/map-event';
import { memo } from 'react';

interface CanvasElementRendererProps {
  element: CanvasElement;
  isSelected: boolean;
}

function BaseElementContainer({
  children,
  element,
  isSelected,
}: {
  children: React.ReactNode;
  element: CanvasElement;
  isSelected: boolean;
}) {
  const styles: React.CSSProperties = {
    left: `${element.x}px`,
    top: `${element.y}px`,
    width: element.width ? `${element.width}px` : 'auto',
    height: element.height ? `${element.height}px` : 'auto',
    backgroundColor: element.type !== 'line' ? element.color : 'transparent',
    opacity: 0.8,
  };

  return (
    <div
      role="button"
      aria-selected={isSelected}
      className={`absolute ${
        element.type !== 'line' ? 'cursor-pointer' : ''
      } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={styles}
    >
      {children}
    </div>
  );
}

const BoothContent = ({ element }: { element: CanvasElement }) => (
  <div className="flex flex-col items-center justify-center h-full p-1">
    <div className="text-white font-medium">{element.boothNumber}</div>
    {element.company && (
      <div className="text-white text-xs mt-1 truncate max-w-full text-center">
        {element.company}
      </div>
    )}
  </div>
);

const LectureContent = ({ element }: { element: CanvasElement }) => (
  <div className="p-2 h-full flex flex-col justify-center">
    <h3 className="text-white font-medium text-sm truncate">{element.title}</h3>
    <div className="text-white text-xs mt-1">
      Capacidade: {element.capacity}
    </div>
  </div>
);

const TextContent = ({ element }: { element: CanvasElement }) => (
  <div className="text-sm whitespace-pre-wrap" style={{ color: element.color }}>
    {element.text}
  </div>
);

function CanvasElementRendererComponent({
  element,
  isSelected,
}: CanvasElementRendererProps) {
  const renderContent = () => {
    switch (element.type) {
      case 'booth':
        return <BoothContent element={element} />;
      case 'lecture':
        return <LectureContent element={element} />;
      case 'text':
        return <TextContent element={element} />;
      default:
        return null;
    }
  };

  return (
    <BaseElementContainer element={element} isSelected={isSelected}>
      {renderContent()}
    </BaseElementContainer>
  );
}

// Memoizar para evitar re-renderizações desnecessárias
export const CanvasElementRenderer = memo(CanvasElementRendererComponent);
