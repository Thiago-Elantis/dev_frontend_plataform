import { LucideIcon } from "lucide-react";

export type ViewMode = "view" | "edit";
export type Tool = "select" | "move" | "stand" | "talk" | "workshop" | "line" | "circle" | "triangle" | "box";

export interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

export interface MapElement {
  id: number;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  company?: string;
  description?: string;
  price?: number;
  speaker?: string;
  schedules?: Schedule[];
  maxAttendees?: number;
  maxParticipants?: number;
  instructor?: string;
  color?: string;
  strokeWidth?: number;
  fill?: string;
  stroke?: string;
  startPoint?: { x: number; y: number };
  endPoint?: { x: number; y: number };
}

export interface ToolItem {
  id: Tool;
  label: string;
  icon: LucideIcon;
}

export interface ToolsSidebarProps {
  viewMode: ViewMode;
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;
  tools: ToolItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  stands: MapElement[];
  talks: MapElement[];
  workshops: MapElement[];
  selectedElement: MapElement | null;
  setSelectedElement: (element: MapElement | null) => void;
}

export interface PropertiesSidebarProps {
  selectedElement: MapElement | null;
  viewMode: ViewMode;
  setShowCompanyModal: (show: boolean) => void;
  setShowScheduleModal: (show: boolean) => void;
  setEditingElement: (element: MapElement) => void;
  deleteElement: (id: number) => void;
}

export interface MapHeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export interface MapCanvasProps {
  elements: MapElement[];
  selectedTool: Tool;
  canvasOffset: { x: number; y: number };
  canvasScale: number;
  gridSize: number;
  isDragging: boolean;
  isDrawing: boolean;
  drawStart: { x: number; y: number };
  currentDraw: { x: number; y: number };
  drawingPoints: { x: number; y: number }[];
  elementScale: number;
  selectedElement: MapElement | null;
  setSelectedElement: (element: MapElement | null) => void;
  deleteElement: (id: number) => void;
  movingElement: MapElement | null;
  setMovingElement: (element: MapElement | null) => void;
  moveStart: { x: number; y: number };
  setMoveStart: (pos: { x: number; y: number }) => void;
  setElements: (elements: MapElement[]) => void;
  handleCanvasMouseDown: (e: React.MouseEvent) => void;
  handleCanvasMouseMove: (e: React.MouseEvent) => void;
  handleCanvasMouseUp: (e: React.MouseEvent) => void;
  viewMode: "view" | "edit";
}

export interface StandElementProps {
  element: MapElement;
  isSelected: boolean;
  elementScale: number;
  onSelect: (element: MapElement) => void;
  onDelete: (id: number) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  viewMode: ViewMode;
}

export interface WorkshopElementProps {
  element: MapElement;
  isSelected: boolean;
  elementScale: number;
  onSelect: (element: MapElement) => void;
  onDelete: (id: number) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  viewMode: ViewMode;
}