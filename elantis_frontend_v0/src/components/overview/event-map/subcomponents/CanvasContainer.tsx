"use client";
import { CanvasElements } from "./CanvasElements";
import { MapCanvasProps } from "../types";

export function CanvasContainer({
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  elements,
  gridSize,
  canvasOffset,
  canvasScale,
  ...rest
}: MapCanvasProps) {
  return (
    <div
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleCanvasMouseUp}
      className="w-full h-full relative"
      style={{
        cursor: rest.selectedTool === "select" && rest.viewMode === "edit" ? "grab" : "crosshair",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)",
        backgroundSize: `${gridSize}px ${gridSize}px`,
        backgroundPosition: `${canvasOffset?.x! % gridSize}px ${canvasOffset?.y! % gridSize}px`,
        transform: `scale(${canvasScale}) translate(${canvasOffset?.x! / canvasScale}px, ${canvasOffset?.y! / canvasScale}px)`,
        transformOrigin: "0 0",
      }}
    >
      <CanvasElements
              gridSize={0} handleCanvasMouseDown={function (e: React.MouseEvent): void {
                  throw new Error("Function not implemented.");
              } } handleCanvasMouseMove={function (e: React.MouseEvent): void {
                  throw new Error("Function not implemented.");
              } } handleCanvasMouseUp={function (e: React.MouseEvent): void {
                  throw new Error("Function not implemented.");
              } } elements={elements}
              canvasOffset={canvasOffset}
              canvasScale={canvasScale}
              {...rest}      />
    </div>
  );
}
