import { MapElement, ViewMode } from "../types";
import { Mic, Pencil, Trash2 } from "lucide-react";

interface TalkElementProps {
  element: MapElement;
  isSelected: boolean;
  elementScale: number;
  onSelect: (element: MapElement) => void;
  onDelete: (id: number) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  viewMode: ViewMode;
}

export function TalkElement({
  element,
  isSelected,
  elementScale,
  onSelect,
  onDelete,
  onMouseDown,
  onMouseMove,
  viewMode,
}: TalkElementProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onClick={() => onSelect(element)}
      className={`absolute flex flex-col items-center justify-center border-2 rounded-lg bg-white shadow-sm transition-all ${
        isSelected
          ? "border-amber-500 shadow-md z-10"
          : "border-amber-300 hover:border-amber-400 z-0"
      }`}
      style={{
        left: `${element.x * elementScale}px`,
        top: `${element.y * elementScale}px`,
        width: `${element.width * elementScale}px`,
        height: `${element.height * elementScale}px`,
      }}
    >
      <div className="w-full h-full flex flex-col p-1 overflow-hidden">
        <div className="flex-1 bg-amber-50 rounded-t flex items-center justify-center">
          <Mic className="w-6 h-6 text-amber-400" />
        </div>
        <div className="p-1 bg-white rounded-b">
          <p className="text-xs font-medium text-center text-slate-700 truncate">
            {element.name}
          </p>
        </div>
      </div>

      {isSelected && viewMode === "edit" && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(element.id);
            }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-sm z-20"
          >
            <Trash2 className="w-3 h-3 text-white" />
          </button>
          <div className="absolute -top-2 -left-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shadow-sm z-20">
            <Pencil className="w-3 h-3 text-white" />
          </div>
        </>
      )}
    </div>
  );
}