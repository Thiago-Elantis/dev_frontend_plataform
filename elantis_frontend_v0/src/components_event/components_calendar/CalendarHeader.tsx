// CalendarHeader.tsx
'use client';

import { FiPlus } from 'react-icons/fi';

interface CalendarHeaderProps {
  title: string;
  onNewEvent: () => void;
}

export default function CalendarHeader({ title, onNewEvent }: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <button
        onClick={onNewEvent}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <FiPlus className="mr-2" />
        Nova Atividade
      </button>
    </div>
  );
}