"use client";
import { ToolProvider } from "./subcomponents/ToolContext";
import { CanvasContainer } from "./subcomponents/CanvasContainer";
import { DrawingPreview } from "./subcomponents/DrawingPreview";
import { MapCanvasProps } from "./types";

export function MapCanvas(props: MapCanvasProps) {
  const { selectedTool, viewMode = "view" } = props;
  const isEditMode = viewMode === "edit";

  return (
    <ToolProvider selectedTool={selectedTool} viewMode={viewMode} isEditMode={isEditMode}>
      <div className="flex-1 relative overflow-hidden">
        <CanvasContainer {...props} />
        <DrawingPreview {...props} />
      </div>
    </ToolProvider>
  );
}
