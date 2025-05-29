import { useState, useRef } from 'react';
import { CanvasElement } from '@/types/map-event';
import { distanceToLine } from '@/utils/map';
import { CanvasElementRenderer } from '@/components_map/CanvasElementRenderer';

interface EventCanvasProps {
  canvasRef: React.RefObject<HTMLDivElement | null>;
  elements: CanvasElement[];
  setElements: (elements: CanvasElement[]) => void;
  selectedElement: CanvasElement | null;
  setSelectedElement: (element: CanvasElement | null) => void;
  mode: string;
  drawingLine: { points: { x: number; y: number }[] } | null;
  setDrawingLine: (line: { points: { x: number; y: number }[] } | null) => void;
  setShowLectureModal: (show: boolean) => void;
}


const GRID_SIZE = 50;
const CANVAS_WIDTH = 5000;
const CANVAS_HEIGHT = 5000;
export default function EventCanvas({
  canvasRef,
  elements,
  setElements,
  selectedElement,
  setSelectedElement,
  mode,
  drawingLine,
  setDrawingLine,
  setShowLectureModal,
}: EventCanvasProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [history, setHistory] = useState<CanvasElement[][]>([]);
  const [redoStack, setRedoStack] = useState<CanvasElement[][]>([]);

  const snapToGrid = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE;

  const pushToHistory = (newElements: CanvasElement[]) => {
    setHistory(prev => [...prev, elements]);
    setRedoStack([]);
    setElements(newElements);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setRedoStack(prev => [elements, ...prev]);
    setHistory(prev => prev.slice(0, -1));
    setElements(previous);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setRedoStack(prev => prev.slice(1));
    setHistory(prev => [...prev, elements]);
    setElements(next);
  };

  const getEventCoords = (e: React.MouseEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left - offset.x) / scale,
      y: (e.clientY - rect.top - offset.y) / scale,
    };
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (isPanning) return;
    const { x, y } = getEventCoords(e);
    const clickedElement = findClickedElement(x, y, elements);
    if (clickedElement) {
      handleElementClick(clickedElement);
    } else {
      createNewElement(snapToGrid(x), snapToGrid(y), mode);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    if (isPanning) {
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      panStart.current = { x: e.clientX, y: e.clientY };
    } else if (drawingLine) {
      const { x, y } = getEventCoords(e);
      setDrawingLine({
        points: [...drawingLine.points.slice(0, -1), { x, y }],
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1) {
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => setIsPanning(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setScale(prev => Math.max(0.2, Math.min(prev + delta, 3)));
  };

  const findClickedElement = (x: number, y: number, elements: CanvasElement[]) => {
    return elements.find(el => {
      if (el.type === 'line' && el.points) {
        const [p1, p2] = el.points;
        const distance = distanceToLine(x, y, p1.x, p1.y, p2.x, p2.y);
        return distance < 10;
      }
      return x >= el.x && x <= (el.x + (el.width || 0)) &&
             y >= el.y && y <= (el.y + (el.height || 0));
    });
  };

  const handleElementClick = (element: CanvasElement) => {
    setSelectedElement(element);
    if (element.type === 'lecture') {
      setShowLectureModal(true);
    }
  };

  const createNewElement = (x: number, y: number, mode: string) => {
    if (mode === 'booth') {
      const newElement: CanvasElement = {
        id: Date.now().toString(),
        type: 'booth',
        x,
        y,
        width: 120,
        height: 80,
        color: '#3B82F6',
        boothNumber: `E${elements.filter(e => e.type === 'booth').length + 1}`,
      };
      pushToHistory([...elements, newElement]);
      setSelectedElement(newElement);
    } else if (mode === 'lecture') {
      const newElement: CanvasElement = {
        id: Date.now().toString(),
        type: 'lecture',
        x,
        y,
        width: 150,
        height: 100,
        color: '#10B981',
        title: 'Nova Palestra',
        capacity: 50,
        schedule: [],
      };
      pushToHistory([...elements, newElement]);
      setSelectedElement(newElement);
      setShowLectureModal(true);
    } else if (mode === 'text') {
      const newElement: CanvasElement = {
        id: Date.now().toString(),
        type: 'text',
        x,
        y,
        color: '#000000',
        text: 'Texto editável',
      };
      pushToHistory([...elements, newElement]);
      setSelectedElement(newElement);
    } else if (mode === 'line') {
      handleLineDrawing(x, y);
    } else if (mode === 'shape') {
      const newElement: CanvasElement = {
        id: Date.now().toString(),
        type: 'shape',
        x,
        y,
        width: 100,
        height: 100,
        color: '#F59E0B',
        shape: 'rectangle',
      };
      pushToHistory([...elements, newElement]);
      setSelectedElement(newElement);
    }
  };

  const handleLineDrawing = (x: number, y: number) => {
    if (!drawingLine) {
      setDrawingLine({ points: [{ x, y }] });
    } else {
      const newPoints = [...drawingLine.points, { x, y }];
      const newElement: CanvasElement = {
        id: Date.now().toString(),
        type: 'line',
        x: newPoints[0].x,
        y: newPoints[0].y,
        color: '#000000',
        points: newPoints,
      };
      pushToHistory([...elements, newElement]);
      setSelectedElement(newElement);
      setDrawingLine(null);
    }
  };

  return (
    <div
      ref={canvasRef}
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-[calc(100vh-180px)] relative overflow-hidden"
      onClick={handleCanvasClick}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleCanvasMouseMove}
    >
      {/* Grid */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: 'top left' }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 left-0 w-px h-full bg-gray-700"
            style={{ left: `${i * GRID_SIZE}px`, opacity: 0.3 }}
          />
        ))}
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute top-0 left-0 h-px w-full bg-gray-700"
            style={{ top: `${i * GRID_SIZE}px`, opacity: 0.3 }}
          />
        ))}

        {/* Render elements */}
        {elements.map(element => (
          <CanvasElementRenderer
            key={element.id}
            element={element}
            isSelected={selectedElement?.id === element.id}
          />
        ))}

        {/* Linha temporária ao desenhar */}
        {drawingLine && drawingLine.points.length > 1 && (
          <svg className="absolute w-full h-full pointer-events-none" style={{ top: 0, left: 0 }}>
            <path
              d={`M ${drawingLine.points[0].x} ${drawingLine.points[0].y} L ${drawingLine.points[1].x} ${drawingLine.points[1].y}`}
              stroke="#000000"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
