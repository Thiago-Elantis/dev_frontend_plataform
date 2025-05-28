'use client';

import { useState, useRef } from 'react';
import Sidebar from '@/components_dashboard/Sidebar';
import { CanvasElement } from '@/types/map-event';
import EventMapToolbar from '@/components_map/EventMapToolbar';
import EventCalendar from '@/components_map/EventCalendar';
import EventCanvas from '@/components_map/EventCanvas';
import { LectureModal } from '@/components_map/LectureModal';
import { ElementContextMenu } from '@/components_map/ElementContextMenu';

export default function EventMapPage() {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(null);
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mode, setMode] = useState<'select' | 'booth' | 'lecture' | 'line' | 'text' | 'shape'>('select');
  const [drawingLine, setDrawingLine] = useState<{points: {x: number, y: number}[]} | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const convertToLecture = () => {
    if (!selectedElement) return;
    
    const updatedElement: CanvasElement = {
      ...selectedElement,
      type: 'lecture',
      title: 'Nova Palestra',
      capacity: 50,
      schedule: [],
      boothNumber: undefined,
      company: undefined,
    };

    setSelectedElement(updatedElement);
    setElements(elements.map(el => el.id === selectedElement.id ? updatedElement : el));
    setShowLectureModal(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Mapa do Evento</h1>
          <EventCalendar 
            showCalendar={showCalendar} 
            setShowCalendar={setShowCalendar}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        <EventMapToolbar 
          mode={mode}
          setMode={setMode}
          selectedElement={selectedElement}
          elements={elements}
          setElements={setElements}
          setSelectedElement={setSelectedElement}
          canvasRef={canvasRef} // <--- importante!

        />

        <EventCanvas
          canvasRef={canvasRef}
          elements={elements}
          setElements={setElements}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          mode={mode}
          drawingLine={drawingLine}
          setDrawingLine={setDrawingLine}
          setShowLectureModal={setShowLectureModal}
        />

        {showLectureModal && selectedElement?.type === 'lecture' && (
          <LectureModal
            element={selectedElement}
            selectedDate={selectedDate}
            onClose={() => setShowLectureModal(false)}
            onUpdate={(updated) => {
              setSelectedElement(updated);
              setElements(elements.map(el => el.id === selectedElement.id ? updated : el));
            }}
          />
        )}

        {selectedElement && !showLectureModal && (
          <ElementContextMenu
            element={selectedElement}
            onUpdate={(updated) => {
              setSelectedElement(updated);
              setElements(elements.map(el => el.id === selectedElement.id ? updated : el));
            }}
            onDelete={() => {
              setElements(elements.filter(el => el.id !== selectedElement.id));
              setSelectedElement(null);
            }}
            onConvertToLecture={selectedElement.type === 'booth' ? convertToLecture : undefined}
          />
        )}
      </div>
    </div>
  );
}