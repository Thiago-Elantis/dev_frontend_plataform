import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CanvasElement, ModeType } from '@/types/map-event';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 1200;
const GRID_SIZE = 20;
const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const ZOOM_SENSITIVITY = 500; // Higher = less sensitive

interface EventMapCanvasProps {
  mode: ModeType;
  elements: CanvasElement[];
  setElements: (els: CanvasElement[]) => void;
  selectedElement: CanvasElement | null;
  setSelectedElement: (el: CanvasElement | null) => void;
}

export default function EventMapCanvas({
  mode,
  elements,
  setElements,
  selectedElement,
  setSelectedElement,
}: EventMapCanvasProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState<{ x: number; y: number } | null>(null);
  const [drawingLine, setDrawingLine] = useState<CanvasElement | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Memoized snapToGrid function
  const snapToGrid = useCallback((pos: { x: number; y: number }) => {
    return {
      x: Math.round(pos.x / GRID_SIZE) * GRID_SIZE,
      y: Math.round(pos.y / GRID_SIZE) * GRID_SIZE,
    };
  }, []);

  // Memoized coordinate conversion
  const getCanvasCoordinates = useCallback((event: React.MouseEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - offset.x) / scale;
    const y = (event.clientY - rect.top - offset.y) / scale;
    return snapToGrid({ x, y });
  }, [offset, scale, snapToGrid]);

  // Smooth zoom with mouse wheel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const delta = -e.deltaY / ZOOM_SENSITIVITY;
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));
    
    // Only update if scale actually changed
    if (newScale === scale) return;

    // Zoom relative to mouse position
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate new offset to zoom at mouse position
    const dx = (mouseX - offset.x) / scale;
    const dy = (mouseY - offset.y) / scale;

    setScale(newScale);
    setOffset({
      x: mouseX - dx * newScale,
      y: mouseY - dy * newScale,
    });
  }, [scale, offset]);

  // Panning handlers
  const startPanning = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
      e.preventDefault();
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handlePanning = useCallback((e: React.MouseEvent) => {
    if (isPanning && lastPanPoint) {
      const dx = e.clientX - lastPanPoint.x;
      const dy = e.clientY - lastPanPoint.y;
      setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, [isPanning, lastPanPoint]);

  const stopPanning = useCallback(() => {
    setIsPanning(false);
    setLastPanPoint(null);
  }, []);

  // Line drawing handler
  const handleLineDrawing = useCallback((e: React.MouseEvent) => {
    if (mode === 'line' && drawingLine) {
      const coords = getCanvasCoordinates(e);
      const newPoints = [...drawingLine.points];
      newPoints[newPoints.length - 1] = coords;
      setDrawingLine({ ...drawingLine, points: newPoints });
    }
  }, [mode, drawingLine, getCanvasCoordinates]);

  // Combined mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handlePanning(e);
    handleLineDrawing(e);
  }, [handlePanning, handleLineDrawing]);

  // Element selection logic
  const selectElement = useCallback((coords: { x: number; y: number }) => {
    // Check elements in reverse order (top-most first)
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      
      if (el.type === 'booth' || el.type === 'lecture' || el.type === 'shape') {
        if (
          coords.x >= el.x &&
          coords.x <= el.x + (el.width || 0) &&
          coords.y >= el.y &&
          coords.y <= el.y + (el.height || 0)
        ) {
          return el;
        }
      }
      
      if (el.type === 'text') {
        // Approximate text bounding box
        if (coords.x >= el.x && coords.x <= el.x + 100 && coords.y >= el.y && coords.y <= el.y + 30) {
          return el;
        }
      }
      
      if (el.type === 'line') {
        // Simple line hit detection - check if near any segment
        for (let j = 0; j < el.points.length - 1; j++) {
          const p1 = el.points[j];
          const p2 = el.points[j + 1];
          if (isPointNearLine(coords, p1, p2)) {
            return el;
          }
        }
      }
    }
    return null;
  }, [elements]);

  // Helper for line hit detection
  const isPointNearLine = (point: {x: number, y: number}, lineStart: {x: number, y: number}, lineEnd: {x: number, y: number}) => {
    const buffer = 5; // pixels
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    // If line is just a point
    if (length === 0) return false;
    
    // Calculate projection of point onto line
    const t = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / (length * length);
    
    // Find nearest point on line segment
    let nearestX, nearestY;
    if (t < 0) {
      nearestX = lineStart.x;
      nearestY = lineStart.y;
    } else if (t > 1) {
      nearestX = lineEnd.x;
      nearestY = lineEnd.y;
    } else {
      nearestX = lineStart.x + t * dx;
      nearestY = lineStart.y + t * dy;
    }
    
    // Calculate distance from point to line
    const dist = Math.sqrt((point.x - nearestX) ** 2 + (point.y - nearestY) ** 2);
    return dist <= buffer;
  };

  // Element creation
  const createElement = useCallback((coords: {x: number, y: number}) => {
    const newElement = (() => {
      switch (mode) {
        case 'booth':
          return {
            id: Date.now().toString(),
            type: 'booth',
            x: coords.x,
            y: coords.y,
            width: 100,
            height: 80,
            color: '#10B981',
            title: 'Novo Estande',
            capacity: 0,
          };
        case 'lecture':
          return {
            id: Date.now().toString(),
            type: 'lecture',
            x: coords.x,
            y: coords.y,
            width: 180,
            height: 100,
            color: '#3B82F6',
            title: 'Nova Palestra',
            capacity: 0,
          };
        case 'text':
          return {
            id: Date.now().toString(),
            type: 'text',
            x: coords.x,
            y: coords.y,
            text: 'Novo Texto',
            color: '#000000',
          };
        case 'shape':
          return {
            id: Date.now().toString(),
            type: 'shape',
            x: coords.x,
            y: coords.y,
            width: 60,
            height: 60,
            color: '#F59E0B',
          };
        case 'line':
          if (!drawingLine) {
            // Start drawing line
            return null;
          } else {
            // Finish drawing line
            const line = { ...drawingLine, id: Date.now().toString() };
            setDrawingLine(null);
            return line;
          }
        default:
          return null;
      }
    })();

    if (newElement) {
      setElements([...elements, newElement]);
    } else if (mode === 'line' && !drawingLine) {
      setDrawingLine({ id: 'drawing', type: 'line', points: [coords, coords], color: '#000000' });
    }
  }, [mode, elements, drawingLine, setElements]);

  // Click handler
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (isPanning) return;
    
    const coords = getCanvasCoordinates(e);

    if (mode === 'select') {
      const clickedElement = selectElement(coords);
      setSelectedElement(clickedElement);
      return;
    }

    createElement(coords);
  }, [isPanning, mode, getCanvasCoordinates, selectElement, createElement, setSelectedElement]);

  // Render elements with memoization
  const renderElement = useCallback((el: CanvasElement) => {
    const isSelected = el.id === selectedElement?.id;
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: el.x,
      top: el.y,
      borderRadius: 6,
      userSelect: 'none',
      cursor: mode === 'select' ? 'pointer' : 'default',
      boxShadow: isSelected ? '0 0 0 3px #2563EB' : 'none',
      transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
    };

    switch (el.type) {
      case 'booth':
        return (
          <div
            key={el.id}
            style={{
              ...baseStyle,
              width: el.width,
              height: el.height,
              backgroundColor: el.color,
              padding: 8,
              color: '#fff',
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setSelectedElement(el)}
          >
            {el.title}
          </div>
        );
      case 'lecture':
        return (
          <div
            key={el.id}
            style={{
              ...baseStyle,
              width: el.width,
              height: el.height,
              backgroundColor: el.color,
              padding: 8,
              color: '#fff',
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
            onClick={() => setSelectedElement(el)}
          >
            <div>{el.title}</div>
            <small>Capacidade: {el.capacity}</small>
          </div>
        );
      case 'text':
        return (
          <div
            key={el.id}
            style={{
              ...baseStyle,
              color: el.color,
              padding: 4,
              backgroundColor: 'transparent',
              whiteSpace: 'nowrap',
              fontSize: 14,
            }}
            onClick={() => setSelectedElement(el)}
          >
            {el.text}
          </div>
        );
      case 'shape':
        return (
          <div
            key={el.id}
            style={{
              ...baseStyle,
              width: el.width,
              height: el.height,
              backgroundColor: el.color,
            }}
            onClick={() => setSelectedElement(el)}
          />
        );
      case 'line':
        return (
          <svg
            key={el.id}
            style={{ 
              position: 'absolute', 
              left: 0, 
              top: 0, 
              pointerEvents: isSelected ? 'none' : 'none',
              overflow: 'visible',
            }}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
          >
            <polyline
              points={el.points.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke={el.color}
              strokeWidth={isSelected ? 3 : 2}
              strokeLinecap="round"
            />
          </svg>
        );
      default:
        return null;
    }
  }, [mode, selectedElement, setSelectedElement]);

  // Render grid with memoization
  const renderGrid = useCallback(() => {
    const horizontalLines = Math.ceil(CANVAS_HEIGHT / GRID_SIZE);
    const verticalLines = Math.ceil(CANVAS_WIDTH / GRID_SIZE);
    
    return (
      <svg
        className="absolute top-0 left-0"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: verticalLines }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * GRID_SIZE}
            y1={0}
            x2={i * GRID_SIZE}
            y2={CANVAS_HEIGHT}
            stroke="#eee"
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: horizontalLines }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * GRID_SIZE}
            x2={CANVAS_WIDTH}
            y2={i * GRID_SIZE}
            stroke="#eee"
            strokeWidth={1}
          />
        ))}
      </svg>
    );
  }, [offset, scale]);

  return (
    <div
      ref={canvasRef}
      className="relative bg-white border border-gray-300"
      style={{
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        overflow: 'hidden',
        cursor: isPanning ? 'grabbing' : mode === 'line' ? 'crosshair' : 'default',
        userSelect: 'none',
      }}
      onClick={handleCanvasClick}
      onMouseDown={startPanning}
      onMouseMove={handleMouseMove}
      onMouseUp={stopPanning}
      onMouseLeave={stopPanning}
      onWheel={handleWheel}
    >
      {renderGrid()}

      {/* Elements container */}
      <div
        style={{
          position: 'absolute',
          top: offset.y,
          left: offset.x,
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: isPanning ? 'none' : 'auto',
        }}
      >
        {elements.map(renderElement)}

        {/* Drawing line preview */}
        {drawingLine && (
          <svg
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
          >
            <polyline
              points={drawingLine.points.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke={drawingLine.color}
              strokeWidth={2}
              strokeDasharray="5 5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
}