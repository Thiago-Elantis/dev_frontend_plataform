"use client";

import { useEffect, useRef } from "react";
import { MapCanvasProps, MapElement } from "../types";
import { useToolContext } from "./ToolContext";

export const useElementHandlers = ({
  canvasOffset,
  canvasScale,
  setMoveStart,
  setMovingElement,
  setSelectedElement,
  selectedElement,
  setElements,
  elements,
}: Partial<MapCanvasProps>) => {
  const { isEditMode, selectedTool } = useToolContext();

  const moveStartRef = useRef<{ x: number; y: number } | null>(null);
  const movingElementRef = useRef<MapElement | null>(null);
  const canvasElementRef = useRef<HTMLElement | null>(null);
  
  // Refs para valores dinâmicos
  const canvasOffsetRef = useRef(canvasOffset);
  const canvasScaleRef = useRef(canvasScale);
  const elementsRef = useRef(elements);
  const selectedElementRef = useRef(selectedElement);

  // Atualizar refs quando props mudam
  useEffect(() => {
    canvasOffsetRef.current = canvasOffset;
    canvasScaleRef.current = canvasScale;
    elementsRef.current = elements;
    selectedElementRef.current = selectedElement;
  }, [canvasOffset, canvasScale, elements, selectedElement]);

  const getCanvasPosition = (e: MouseEvent): { x: number; y: number } => {
    if (!canvasElementRef.current) {
      return { x: 0, y: 0 };
    }
    
    const rect = canvasElementRef.current.getBoundingClientRect();
    const offset = canvasOffsetRef.current ?? { x: 0, y: 0 };
    const scale = canvasScaleRef.current ?? 1;
    
    return {
      x: Math.round((e.clientX - rect.left - offset.x) / scale),
      y: Math.round((e.clientY - rect.top - offset.y) / scale),
    };
  };

  const handleElementMouseDown = (element: MapElement) => (e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.stopPropagation();

    // Capturar elemento canvas para referência consistente
    canvasElementRef.current = e.currentTarget.closest('.canvas-container') as HTMLElement;
    
    const pos = getCanvasPosition(e.nativeEvent);
    
    if (selectedTool === "move") {
      moveStartRef.current = { 
        x: pos.x - element.x, 
        y: pos.y - element.y 
      };
      
      movingElementRef.current = element;
      setMoveStart?.(moveStartRef.current);
      setMovingElement?.(element);
    } else {
      setSelectedElement?.(element);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isEditMode || selectedTool !== "move") return;
      if (!movingElementRef.current || !moveStartRef.current) return;
      if (!canvasElementRef.current) return;

      const pos = getCanvasPosition(e);
      const newX = pos.x - moveStartRef.current.x;
      const newY = pos.y - moveStartRef.current.y;

      // Atualizar elementos usando a referência mais recente
      const updatedElements = elementsRef.current?.map((el) => 
        el.id === movingElementRef.current!.id
          ? { ...el, x: newX, y: newY }
          : el
      ) ?? [];

      setElements?.(updatedElements);

      // Atualizar elemento selecionado se necessário
      if (selectedElementRef.current?.id === movingElementRef.current.id) {
        setSelectedElement?.({ 
          ...movingElementRef.current, 
          x: newX, 
          y: newY 
        });
      }
    };

    const handleMouseUp = () => {
      moveStartRef.current = null;
      movingElementRef.current = null;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isEditMode, selectedTool]);

  return {
    getMouseHandlers: (element: MapElement) => ({
      onMouseDown: handleElementMouseDown(element),
    }),
  };
};