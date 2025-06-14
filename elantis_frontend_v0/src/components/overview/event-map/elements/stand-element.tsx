import { MapElement, ViewMode, StandElementProps } from "../types";
import { Building, Pencil, Trash2 } from "lucide-react";


export function StandElement({
  element,
  isSelected,
  elementScale,
  onSelect,
  onDelete,
  onMouseDown,
  onMouseMove,
  viewMode,
}: StandElementProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onClick={() => onSelect(element)}
      className={`absolute flex flex-col items-center justify-center border-2 rounded-lg bg-white shadow-sm transition-all ${
        isSelected
          ? "border-blue-500 shadow-md z-10"
          : "border-blue-300 hover:border-blue-400 z-0"
      }`}
      style={{
        left: `${element.x * elementScale}px`,
        top: `${element.y * elementScale}px`,
        width: `${element.width * elementScale}px`,
        height: `${element.height * elementScale}px`,
      }}
    >
      <div className="w-full h-full flex flex-col p-1 overflow-hidden">
        <div className="flex-1 bg-blue-50 rounded-t flex items-center justify-center">
          <Building className="w-6 h-6 text-blue-400" />
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
          <div className="absolute -top-2 -left-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-sm z-20">
            <Pencil className="w-3 h-3 text-white" />
          </div>
        </>
      )}
    </div>
  );
}