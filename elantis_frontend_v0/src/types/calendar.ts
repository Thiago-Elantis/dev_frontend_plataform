// types/calendar.ts

export type ActivityType = {
  name: string;
  color: string;
};

export type ActivityTypes = {
  [key: string]: ActivityType;
};

export type CalendarEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  type: string;
  responsible: string;
  notes: string;
};
