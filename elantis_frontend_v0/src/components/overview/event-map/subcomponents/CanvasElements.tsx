'use client';

import {
  StandElement,
  WorkshopElement,
  TalkElement,
  VisualElement,
} from "../elements";

import { MapElement, MapCanvasProps } from "../types";
import { useElementHandlers } from "./ElementHandlers";

export function CanvasElements({
  elements,
  selectedElement,
  elementScale,
  setSelectedElement,
  deleteElement,
  ...props
}: MapCanvasProps) {
  const { getMouseHandlers } = useElementHandlers(props);

  const renderElement = (element: MapElement) => {
    const handlers = getMouseHandlers(element);

    const commonProps = {
      element,
      isSelected: selectedElement?.id === element.id,
      elementScale,
      onSelect: setSelectedElement,
      onDelete: deleteElement,
      viewMode: props.viewMode,
    };

    return (() => {
      switch (element.type) {
        case "stand":
          return (
            <StandElement
              key={element.id}
              {...commonProps}
              onMouseMove={handlers.onMouseDown}
              {...handlers}
            />
          );
        case "talk":
          return (
            <TalkElement
              key={element.id}
              {...commonProps}
              onMouseMove={handlers.onMouseDown}
              {...handlers}
            />
          );
        case "workshop":
          return (
            <WorkshopElement
              key={element.id}
              {...commonProps}
              onMouseMove={handlers.onMouseDown}
              {...handlers}
            />
          );
        case "line":
        case "circle":
        case "triangle":
        case "box":
          return (
            <VisualElement
              key={element.id}
              {...commonProps}
              onMouseMove={handlers.onMouseDown}
              {...handlers}
            />
          );
        default:
          return null;
      }
    })();
  };

  return <>{elements.map(renderElement)}</>;
}
