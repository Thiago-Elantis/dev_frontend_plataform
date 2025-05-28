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
  drawingLine: {points: {x: number, y: number}[]} | null;
  setDrawingLine: (line: {points: {x: number, y: number}[]} | null) => void;
  setShowLectureModal: (show: boolean) => void;
}

export default function EventCanvas({
  canvasRef,
  elements,
  setElements,
  selectedElement,
  setSelectedElement,
  mode,
  drawingLine,
  setDrawingLine,
  setShowLectureModal
}: EventCanvasProps) {
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedElement = findClickedElement(x, y, elements);
    if (clickedElement) {
      handleElementClick(clickedElement);
      return;
    }

    createNewElement(x, y, mode);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current || !drawingLine) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDrawingLine({
      points: [...drawingLine.points.slice(0, -1), { x, y }]
    });
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
      createBooth(x, y);
    } else if (mode === 'lecture') {
      createLecture(x, y);
    } else if (mode === 'text') {
      createText(x, y);
    } else if (mode === 'line') {
      handleLineDrawing(x, y);
    } else if (mode === 'shape') {
      createShape(x, y);
    }
  };

  const createBooth = (x: number, y: number) => {
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
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  const createLecture = (x: number, y: number) => {
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
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
    setShowLectureModal(true);
  };

  const createText = (x: number, y: number) => {
    const newElement: CanvasElement = {
      id: Date.now().toString(),
      type: 'text',
      x,
      y,
      color: '#000000',
      text: 'Texto editável',
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
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
      setElements([...elements, newElement]);
      setSelectedElement(newElement);
      setDrawingLine(null);
    }
  };

  const createShape = (x: number, y: number) => {
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
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  return (
    <div 
      ref={canvasRef}
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-[calc(100vh-180px)] relative"
      onClick={handleCanvasClick}
      onMouseMove={handleCanvasMouseMove}
    >
      {elements.map(element => (
        <CanvasElementRenderer 
          key={element.id} 
          element={element} 
          isSelected={selectedElement?.id === element.id}
        />
      ))}

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
  );
}