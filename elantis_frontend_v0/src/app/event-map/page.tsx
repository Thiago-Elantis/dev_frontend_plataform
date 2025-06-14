'use client';

import { useState } from "react";
import { Button } from "@/components/overview/event-map/ui/button";
import { Input } from "@/components/overview/event-map/ui/input";
import { MapHeader } from "@/components/overview/event-map/map-header";
import { ToolsSidebar } from "@/components/overview/event-map/tools-sidebar";
import { MapCanvas } from "@/components/overview/event-map/map-canvas";
import { PropertiesSidebar } from "@/components/overview/event-map/properties-sidebar";
import { CompanyEditModal } from "@/components/overview/event-map/modals/company-edit-modal";
import { ScheduleEditModal } from "@/components/overview/event-map/modals/schedule-edit-modal";
import { mockElements } from "@/components/overview/event-map/data/mock-elements";
import { ViewMode, Tool, MapElement } from "@/components/overview/event-map/types";
import { MousePointer, Move, Store, Mic, Settings, Minus, Circle, Triangle, Square } from "lucide-react";

export default function MapPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("view");
  const [selectedTool, setSelectedTool] = useState<Tool>("select");
  const [selectedElement, setSelectedElement] = useState<MapElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [elements, setElements] = useState(mockElements);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [canvasScale, setCanvasScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const [currentDraw, setCurrentDraw] = useState({ x: 0, y: 0 });
  const [nextId, setNextId] = useState(7);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingElement, setEditingElement] = useState<MapElement | null>(null);
  const [movingElement, setMovingElement] = useState<MapElement | null>(null);
  const [moveStart, setMoveStart] = useState({ x: 0, y: 0 });
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize] = useState(20);
  const [drawingPoints, setDrawingPoints] = useState<{ x: number; y: number }[]>([]);
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  const tools = [
    { id: "select" as Tool, label: "Selecionar", icon: MousePointer },
    { id: "move" as Tool, label: "Mover", icon: Move },
    { id: "stand" as Tool, label: "Stand", icon: Store },
    { id: "talk" as Tool, label: "Palestra", icon: Mic },
    { id: "workshop" as Tool, label: "Workshop", icon: Settings },
    { id: "line" as Tool, label: "Linha", icon: Minus },
    { id: "circle" as Tool, label: "Círculo", icon: Circle },
    { id: "triangle" as Tool, label: "Triângulo", icon: Triangle },
    { id: "box" as Tool, label: "Retângulo", icon: Square },
  ];

  const stands = elements.filter(
    (el) => el.type === "stand" && el.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const talks = elements.filter(
    (el) => el.type === "talk" && el.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const workshops = elements.filter(
    (el) => el.type === "workshop" && el.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const elementScale = 0.8;

  const getCanvasPosition = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    return {
      x: (e.clientX - rect.left - canvasOffset.x) / canvasScale,
      y: (e.clientY - rect.top - canvasOffset.y) / canvasScale,
    };
  };

  const createNewElement = (startPos: { x: number; y: number }, endPos: { x: number; y: number }, type: Tool) => {
    const width = Math.abs(endPos.x - startPos.x);
    const height = Math.abs(endPos.y - startPos.y);
    const x = Math.min(startPos.x, endPos.x);
    const y = Math.min(startPos.y, endPos.y);

    if (width < 50 || height < 30) return;

    let newElement: any = {
      id: nextId,
      x: Math.round(x / 0.8),
      y: Math.round(y / 0.8),
      width: Math.round(width / 0.8),
      height: Math.round(height / 0.8),
    };

    switch (type) {
      case "stand":
        newElement = {
          ...newElement,
          name: `Stand ${nextId}`,
          type: "stand",
          company: "Nova Empresa",
          description: "Novo stand criado",
          price: 0.0,
        };
        break;
      case "talk":
        newElement = {
          ...newElement,
          name: `Palestra ${nextId}`,
          type: "talk",
          company: "Nova Empresa",
          speaker: "Palestrante",
          schedules: [{ date: "2024-06-15", startTime: "14:00", endTime: "15:00" }],
          description: "Nova palestra criada",
          maxAttendees: 100,
          price: 0.0,
        };
        break;
      case "workshop":
        newElement = {
          ...newElement,
          name: `Workshop ${nextId}`,
          type: "workshop",
          company: "Nova Empresa",
          instructor: "Instrutor",
          schedules: [{ date: "2024-06-16", startTime: "09:00", endTime: "12:00" }],
          description: "Novo workshop criado",
          maxParticipants: 30,
          price: 0.0,
        };
        break;
      default:
        if (type === "line") {
          newElement = {
            id: nextId,
            name: `Linha ${nextId}`,
            type: "line",
            x: Math.round(x / 0.8),
            y: Math.round(y / 0.8),
            width: Math.round(width / 0.8),
            height: Math.round(height / 0.8),
            startPoint: { x: Math.round(startPos.x / 0.8), y: Math.round(startPos.y / 0.8) },
            endPoint: { x: Math.round(endPos.x / 0.8), y: Math.round(endPos.y / 0.8) },
            color: "#3b82f6",
            strokeWidth: 4,
            company: "",
            description: "",
          };
        } else {
          newElement = {
            ...newElement,
            name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nextId}`,
            type: type,
            fill: "rgba(59, 130, 246, 0.1)",
            stroke: "#3b82f6",
            strokeWidth: 2,
            company: "",
            description: "",
          };
        }
        break;
    }

    setElements([...elements, newElement]);
    setNextId(nextId + 1);
  };

  const deleteElement = (id: number) => {
    setElements(elements.filter((el) => el.id !== id));
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  };

  const updateElementSchedule = (updatedElement: MapElement) => {
    setElements(
      elements.map((el) => (el.id === updatedElement.id ? updatedElement : el))
    );
    setSelectedElement(updatedElement);
    setShowScheduleModal(false);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    const pos = getCanvasPosition(e);

    if (selectedTool === "select") {
      setIsDragging(true);
      setDragStart({ x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y });
      setSelectedElement(null);
    } else if (["stand", "talk", "workshop", "line", "circle", "triangle", "box"].includes(selectedTool)) {
      setIsDrawing(true);
      setDrawStart(pos);
      setCurrentDraw(pos);

      if (selectedTool === "line") {
        setDrawingPoints([pos]);
      }
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
  if (viewMode !== "edit") return;

  const pos = getCanvasPosition(e);

  if (movingElement && selectedTool === "move") {
    const newX = Math.round(pos.x - moveStart.x);
    const newY = Math.round(pos.y - moveStart.y);

    setElements(prev =>
      prev.map(el =>
        el.id === movingElement.id ? { ...el, x: newX, y: newY } : el
      )
    );

    if (selectedElement?.id === movingElement.id) {
      setSelectedElement({ ...movingElement, x: newX, y: newY });
    }
  }


};


  const handleCanvasMouseUp = (e: React.MouseEvent) => {
    const pos = getCanvasPosition(e);

    if (isDrawing && selectedTool !== "select") {
      if (selectedTool === "line" && drawingPoints.length === 1) {
        const startPoint = drawingPoints[0];
        const endPoint = pos;
        createNewElement(startPoint, endPoint, selectedTool);
        setDrawingPoints([]);
      } else if (selectedTool !== "line") {
        createNewElement(drawStart, pos, selectedTool);
      }
    }

    setIsDragging(false);
    setIsDrawing(false);
    setDrawingPoints([]);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <MapHeader viewMode={viewMode} setViewMode={setViewMode} />

      <div className="flex flex-1">
        <ToolsSidebar
          viewMode={viewMode}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          tools={tools}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          stands={stands}
          talks={talks}
          workshops={workshops}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
        />

        <MapCanvas
          elements={elements}
          selectedTool={selectedTool}
          canvasOffset={canvasOffset}
          canvasScale={canvasScale}
          gridSize={gridSize}
          isDragging={isDragging}
          isDrawing={isDrawing}
          drawStart={drawStart}
          currentDraw={currentDraw}
          drawingPoints={drawingPoints}
          elementScale={elementScale}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          deleteElement={deleteElement}
          movingElement={movingElement}
          setMovingElement={setMovingElement}
          moveStart={moveStart}
          setMoveStart={setMoveStart}
          setElements={setElements}
          handleCanvasMouseDown={handleCanvasMouseDown}
          handleCanvasMouseMove={handleCanvasMouseMove}
          handleCanvasMouseUp={handleCanvasMouseUp} 
          viewMode={viewMode}        />

        <PropertiesSidebar
          selectedElement={selectedElement}
          viewMode={viewMode}
          setShowCompanyModal={setShowCompanyModal}
          setShowScheduleModal={setShowScheduleModal}
          setEditingElement={setEditingElement}
          deleteElement={deleteElement}
        />
      </div>

      {/* Modals */}
      {showCompanyModal && selectedElement && (
        <CompanyEditModal
          element={selectedElement}
          onSave={(updatedElement) => {
            setElements(
              elements.map((el) => (el.id === updatedElement.id ? updatedElement : el))
            );
            setSelectedElement(updatedElement);
            setShowCompanyModal(false);
          }}
          onCancel={() => setShowCompanyModal(false)}
        />
      )}

      {showScheduleModal && editingElement && (
        <ScheduleEditModal
          element={editingElement}
          onSave={updateElementSchedule}
          onCancel={() => setShowScheduleModal(false)}
        />
      )}
    </div>
  );
}