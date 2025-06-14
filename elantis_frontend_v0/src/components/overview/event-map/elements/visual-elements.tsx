import { MapElement, ViewMode } from "../types";
import { Pencil, Trash2 } from "lucide-react";

interface VisualElementProps {
  element: MapElement;
  isSelected: boolean;
  elementScale: number;
  onSelect: (element: MapElement) => void;
  onDelete: (id: number) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  viewMode: ViewMode;
}

export function VisualElement({
  element,
  isSelected,
  elementScale,
  onSelect,
  onDelete,
  onMouseDown,
  onMouseMove,
  viewMode,
}: VisualElementProps) {
  const renderElement = () => {
    switch (element.type) {
      case "line":
        return (
          <svg className="w-full h-full">
            <line
              x1={element.startPoint?.x || 0}
              y1={element.startPoint?.y || 0}
              x2={element.endPoint?.x || element.width}
              y2={element.endPoint?.y || element.height}
              stroke={element.color || "#3b82f6"}
              strokeWidth={element.strokeWidth || 2}
            />
          </svg>
        );
      case "circle":
        return (
          <svg className="w-full h-full">
            <circle
              cx={element.width / 2}
              cy={element.height / 2}
              r={Math.min(element.width, element.height) / 2}
              fill={element.fill || "rgba(59, 130, 246, 0.1)"}
              stroke={element.stroke || "#3b82f6"}
              strokeWidth={element.strokeWidth || 2}
            />
          </svg>
        );
      case "triangle":
        return (
          <svg className="w-full h-full">
            <polygon
              points={`${element.width / 2},0 0,${element.height} ${element.width},${element.height}`}
              fill={element.fill || "rgba(59, 130, 246, 0.1)"}
              stroke={element.stroke || "#3b82f6"}
              strokeWidth={element.strokeWidth || 2}
            />
          </svg>
        );
      case "box":
        return (
          <svg className="w-full h-full">
            <rect
              width={element.width}
              height={element.height}
              fill={element.fill || "rgba(59, 130, 246, 0.1)"}
              stroke={element.stroke || "#3b82f6"}
              strokeWidth={element.strokeWidth || 2}
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onClick={() => onSelect(element)}
      className={`absolute flex items-center justify-center ${
        isSelected ? "border-blue-500 shadow-md z-10" : "border-transparent z-0"
      }`}
      style={{
        left: `${element.x * elementScale}px`,
        top: `${element.y * elementScale}px`,
        width: `${element.width * elementScale}px`,
        height: `${element.height * elementScale}px`,
      }}
    >
      {renderElement()}
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