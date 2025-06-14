'use client';

import { useState, useRef } from 'react';
import { MapPin, Calendar, Save, Download, Undo, Redo } from 'lucide-react';
import { PageContainer, PageHeader, Card, Button } from '@/components/ui';
import { CanvasElement } from '@/types/map-event';
import EventMapToolbar from '@/components_map/EventMapToolbar';
import EventCalendar from '@/components_map/EventCalendar';
import EventCanvas from '@/components_map/EventCanvas';
import { LectureModal } from '@/components_map/LectureModal';
import { ElementContextMenu } from '@/components_map/ElementContextMenu';

export default function EventMapPage() {
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(null);
  const [modals, setModals] = useState({ showLectureModal: false, showCalendar: false });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [drawingMode, setDrawingMode] = useState<'select' | 'booth' | 'lecture' | 'line' | 'text' | 'shape'>('select');
  const [currentLine, setCurrentLine] = useState<{ points: { x: number, y: number }[] } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Undo/redo history stacks
  const [history, setHistory] = useState<CanvasElement[][]>([]);
  const [redoStack, setRedoStack] = useState<CanvasElement[][]>([]);

  // Wrap setCanvasElements to maintain history
  const updateElementsWithHistory = (newElements: CanvasElement[]) => {
    setHistory(prev => [...prev, canvasElements]);
    setCanvasElements(newElements);
    setRedoStack([]); // Clear redo on new action
  };

  const updateElement = (updated: CanvasElement) => {
    updateElementsWithHistory(canvasElements.map(el => el.id === updated.id ? updated : el));
    setSelectedElement(updated);
  };

  const handleConvertBoothToLecture = () => {
    if (!selectedElement) return;

    const updated: CanvasElement = {
      ...selectedElement,
      type: 'lecture',
      title: 'Nova Palestra',
      capacity: 50,
      schedule: [],
      boothNumber: undefined,
      company: undefined,
    };

    updateElement(updated);
    setModals(prev => ({ ...prev, showLectureModal: true }));
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setRedoStack(prev => [canvasElements, ...prev]);
    setCanvasElements(previous);
    setHistory(prev => prev.slice(0, -1));
    setSelectedElement(null);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setHistory(prev => [...prev, canvasElements]);
    setCanvasElements(next);
    setRedoStack(prev => prev.slice(1));
    setSelectedElement(null);
  };

  const renderModals = () => {
    if (modals.showLectureModal && selectedElement?.type === 'lecture') {
      return (
        <LectureModal
          element={selectedElement}
          selectedDate={selectedDate}
          onClose={() => setModals(prev => ({ ...prev, showLectureModal: false }))}
          onUpdate={updateElement}
        />
      );
    }

    if (selectedElement && !modals.showLectureModal) {
      return (
        <ElementContextMenu
          element={selectedElement}
          onUpdate={updateElement}
          onDelete={() => {
            updateElementsWithHistory(canvasElements.filter(el => el.id !== selectedElement.id));
            setSelectedElement(null);
          }}
          onConvertToLecture={selectedElement.type === 'booth' ? handleConvertBoothToLecture : undefined}
        />
      );
    }

    return null;
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Eventos', href: '/events' },
    { label: 'Mapa do Evento' }
  ];

  const handleSave = () => {
    console.log('Salvando mapa...');
  };

  const handleExport = () => {
    console.log('Exportando mapa...');
  };

  const actions = (
    <>
      <EventCalendar 
        showCalendar={modals.showCalendar} 
        setShowCalendar={val => setModals(prev => ({ ...prev, showCalendar: val }))}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Button
        variant="outline"
        icon={Download}
        onClick={handleExport}
      >
        Exportar
      </Button>
      <Button
        icon={Save}
        onClick={handleSave}
      >
        Salvar
      </Button>
    </>
  );

  return (
    <PageContainer>
      <PageHeader
        title="Mapa do Evento"
        subtitle="Crie e gerencie o layout do seu evento"
        breadcrumbs={breadcrumbs}
        actions={actions}
      />
      
      <div className="p-6 space-y-6">
        {/* Estatísticas do mapa */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{canvasElements.length}</div>
              <div className="text-sm text-gray-600">Total de Elementos</div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {canvasElements.filter(e => e.type === 'booth').length}
              </div>
              <div className="text-sm text-gray-600">Estandes</div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {canvasElements.filter(e => e.type === 'lecture').length}
              </div>
              <div className="text-sm text-gray-600">Áreas de Palestra</div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {canvasElements.filter(e => e.type === 'text').length}
              </div>
              <div className="text-sm text-gray-600">Textos</div>
            </div>
          </Card>
        </div>

        {/* Toolbar */}
        <Card>
          <EventMapToolbar
            mode={drawingMode}
            setMode={setDrawingMode}
            selectedElement={selectedElement}
            elements={canvasElements}
            setElements={updateElementsWithHistory}
            setSelectedElement={setSelectedElement}
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            canUndo={history.length > 0}
            canRedo={redoStack.length > 0}
          />
        </Card>

        {/* Canvas */}
        <Card padding="none">
          <EventCanvas
            canvasRef={canvasRef}
            elements={canvasElements}
            setElements={updateElementsWithHistory}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            mode={drawingMode}
            drawingLine={currentLine}
            setDrawingLine={setCurrentLine}
            setShowLectureModal={(val: any) => setModals(prev => ({ ...prev, showLectureModal: val }))}
          />
        </Card>

        {renderModals()}
      </div>
    </PageContainer>
  );
}
