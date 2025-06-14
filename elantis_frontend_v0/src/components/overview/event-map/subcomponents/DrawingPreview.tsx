"use client";
import { MapCanvasProps } from "../types";

export function DrawingPreview({
  isDrawing,
  selectedTool,
  drawingPoints,
  drawStart,
  currentDraw,
  elementScale,
}: MapCanvasProps) {
  if (!isDrawing) return null;

  if (selectedTool === "line" && drawingPoints.length === 1) {
    return (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <line
          x1={drawingPoints[0].x * elementScale}
          y1={drawingPoints[0].y * elementScale}
          x2={currentDraw.x * elementScale}
          y2={currentDraw.y * elementScale}
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      </svg>
    );
  }

  if (["box", "circle", "triangle"].includes(selectedTool)) {
    const left = Math.min(drawStart.x, currentDraw.x) * elementScale;
    const top = Math.min(drawStart.y, currentDraw.y) * elementScale;
    const width = Math.abs(currentDraw.x - drawStart.x) * elementScale;
    const height = Math.abs(currentDraw.y - drawStart.y) * elementScale;

    return (
      <div
        className="absolute border-2 border-dashed border-blue-500 bg-blue-500/10 rounded pointer-events-none"
        style={{ left, top, width, height }}
      />
    );
  }

  return null;
}
