export type CanvasElement = {
  id: string;
  type: 'booth' | 'lecture' | 'line' | 'text' | 'shape';
  x: number;
  y: number;
  width?: number;
  height?: number;
  color: string;
  // Element-specific properties
  company?: string;
  boothNumber?: string;
  title?: string;
  capacity?: number;
  schedule?: Array<{ start: Date; end: Date }>;
  text?: string;
  points: { x: number; y: number }[]; // For lines
  shape?: 'rectangle' | 'circle'; // For shapes
};

export type CanvasElementProps = {
  element: CanvasElement;
  isSelected: boolean;
};

export type LectureEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

export type ModeType = 'booth' | 'lecture' | 'line' | 'text' | 'shape' | 'select';
