'use client';

import React from 'react';
import { FiTrash2, FiX, FiCheck } from 'react-icons/fi';
import { format } from 'date-fns';

export interface CalendarEvent {
  id?: number;
  title: string;
  start: Date;
  end: Date;
  type: string;
  responsible: string;
  notes: string;
}

export interface ActivityType {
  [key: string]: { name: string };
}

interface EventModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedEvent: CalendarEvent | null;
  newEvent: CalendarEvent;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  activityTypes: ActivityType;
  setNewEvent: React.Dispatch<React.SetStateAction<CalendarEvent>>;
  handleSaveEvent: () => void;
  handleDeleteEvent: () => void;
  format: (date: Date, formatStr: string) => string; 
}

export default function EventModal({
  showModal,
  setShowModal,
  selectedEvent,
  newEvent,
  activityTypes,
  setNewEvent,
  handleSaveEvent,
  handleDeleteEvent,
}: EventModalProps) {
  if (!showModal) return null;

  // Manipula mudanças em inputs normais
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Se for start ou end, converte string para Date
    if (name === 'start' || name === 'end') {
      setNewEvent((prev) => ({
        ...prev,
        [name]: new Date(value),
      }));
    } else {
      setNewEvent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {selectedEvent ? 'Editar Atividade' : 'Nova Atividade'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Início</label>
              <input
                type="datetime-local"
                name="start"
                value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Término</label>
              <input
                type="datetime-local"
                name="end"
                value={format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Atividade</label>
            <select
              name="type"
              value={newEvent.type}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              {Object.entries(activityTypes).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
            <input
              type="text"
              name="responsible"
              value={newEvent.responsible}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
            <textarea
              name="notes"
              value={newEvent.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          {selectedEvent && (
            <button
              onClick={handleDeleteEvent}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <FiTrash2 className="mr-2" />
              Excluir
            </button>
          )}
          <button
            onClick={() => setShowModal(false)}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            <FiX className="mr-2" />
            Cancelar
          </button>
          <button
            onClick={handleSaveEvent}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiCheck className="mr-2" />
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
