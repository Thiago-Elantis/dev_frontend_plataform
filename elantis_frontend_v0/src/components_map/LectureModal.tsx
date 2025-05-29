'use client';

import { useState, useEffect } from 'react';
import { FiX, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';
import { CanvasElement } from '@/types/map-event';

interface ScheduleItem {
  start: Date;
  end: Date;
}

interface LectureModalProps {
  element: CanvasElement;
  selectedDate: Date;
  onClose: () => void;
  onUpdate: (updated: CanvasElement) => void;
}

export const LectureModal = ({
  element,
  selectedDate,
  onClose,
  onUpdate,
}: LectureModalProps) => {
  const [localElement, setLocalElement] = useState<CanvasElement>({ ...element });
  const [scheduleErrors, setScheduleErrors] = useState<Record<number, string>>({});
  const [hasConflicts, setHasConflicts] = useState(false);

  useEffect(() => {
    setLocalElement({ ...element });
  }, [element]);

  const getEventsForSelectedDate = (): Array<{ id: string; title: string; start: Date; end: Date }> => {
    if (!localElement.schedule) return [];

    return localElement.schedule
      .filter(time => format(time.start, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
      .map((time, idx) => ({
        id: `${localElement.id}-${idx}`,
        title: localElement.title || 'Palestra',
        start: time.start,
        end: time.end,
      }));
  };

  // Verifica se há conflito entre dois períodos
  const intervalsOverlap = (aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) => {
    return aStart < bEnd && bStart < aEnd;
  };

  // Valida todos os horários, retorna objeto com erros por índice e se existe conflito geral
  const validateSchedule = (schedule: ScheduleItem[]) => {
    const errors: Record<number, string> = {};

    for (let i = 0; i < schedule.length; i++) {
      const item = schedule[i];
      if (item.end <= item.start) {
        errors[i] = 'O horário final deve ser após o início';
        continue; // erro grave, pode pular outras validações
      }

      for (let j = 0; j < schedule.length; j++) {
        if (i === j) continue;
        const other = schedule[j];
        if (intervalsOverlap(item.start, item.end, other.start, other.end)) {
          errors[i] = 'Este horário conflita com outro';
          break;
        }
      }
    }

    const conflictExists = Object.keys(errors).length > 0;
    return { errors, conflictExists };
  };

  // Atualiza schedule e valida
  const updateSchedule = (newSchedule: ScheduleItem[]) => {
    const { errors, conflictExists } = validateSchedule(newSchedule);
    setScheduleErrors(errors);
    setHasConflicts(conflictExists);

    const updated = { ...localElement, schedule: newSchedule };
    setLocalElement(updated);
    onUpdate(updated);
  };

  const handleTimeChange = (
    idx: number,
    type: 'start' | 'end',
    timeValue: string
  ) => {
    const [hours, minutes] = timeValue.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return;

    const newSchedule = [...(localElement.schedule || [])];
    const item = { ...newSchedule[idx] };

    if (type === 'start') {
      const newStart = new Date(item.start);
      newStart.setHours(hours, minutes, 0, 0);

      // Ajusta fim para ficar no mínimo 1h depois se necessário
      let newEnd = item.end;
      if (newEnd <= newStart) {
        newEnd = new Date(newStart);
        newEnd.setHours(newStart.getHours() + 1);
      }

      item.start = newStart;
      item.end = newEnd;
    } else {
      const newEnd = new Date(item.end);
      newEnd.setHours(hours, minutes, 0, 0);

      if (newEnd <= item.start) return; // evita horário final inválido

      item.end = newEnd;
    }

    newSchedule[idx] = item;
    updateSchedule(newSchedule);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lecture-modal-title"
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-md mx-4 overflow-auto max-h-[90vh]">
        <div className="p-6">
          <header className="flex justify-between items-center mb-4">
            <h2 id="lecture-modal-title" className="text-xl font-bold">
              Configurar Palestra
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="Fechar modal"
            >
              <FiX size={24} />
            </button>
          </header>

          <div className="space-y-4">
            <div>
              <label htmlFor="lecture-title" className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                id="lecture-title"
                type="text"
                value={localElement.title || ''}
                onChange={e => setLocalElement({ ...localElement, title: e.target.value })}
                onBlur={() => onUpdate(localElement)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="lecture-capacity" className="block text-sm font-medium text-gray-700 mb-1">
                Capacidade
              </label>
              <input
                id="lecture-capacity"
                type="number"
                min={1}
                value={localElement.capacity ?? 50}
                onChange={e =>
                  setLocalElement({
                    ...localElement,
                    capacity: Math.max(1, parseInt(e.target.value) || 50),
                  })
                }
                onBlur={() => onUpdate(localElement)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <section className="pt-4 border-t border-gray-200">
              <h3 className="font-medium mb-2">Horários para {format(selectedDate, 'dd/MM/yyyy')}</h3>

              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {getEventsForSelectedDate().map((event, idx) => (
                  <div
                    key={event.id}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={format(event.start, 'HH:mm')}
                        onChange={e => handleTimeChange(idx, 'start', e.target.value)}
                        className={`border rounded p-1 focus:outline-none focus:ring-2 ${
                          scheduleErrors[idx]
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-400'
                        }`}
                        aria-label={`Início do horário ${idx + 1}`}
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={format(event.end, 'HH:mm')}
                        onChange={e => handleTimeChange(idx, 'end', e.target.value)}
                        className={`border rounded p-1 focus:outline-none focus:ring-2 ${
                          scheduleErrors[idx]
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-400'
                        }`}
                        aria-label={`Fim do horário ${idx + 1}`}
                      />
                    </div>
                    <button
                      onClick={() => {
                        const newSchedule = localElement.schedule?.filter((_, i) => i !== idx) || [];
                        updateSchedule(newSchedule);
                      }}
                      className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                      aria-label={`Remover horário ${idx + 1}`}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>

              {hasConflicts && (
                <p className="text-red-600 text-sm mb-2 font-semibold">
                  ⚠️ Existem horários conflitantes ou inválidos. Ajuste-os para continuar.
                </p>
              )}

              <button
                onClick={() => {
                  const startTime = new Date(selectedDate);
                  startTime.setHours(10, 0, 0, 0);

                  const endTime = new Date(startTime);
                  endTime.setHours(startTime.getHours() + 1);

                  const newSchedule = [...(localElement.schedule || []), { start: startTime, end: endTime }];
                  updateSchedule(newSchedule);
                }}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Adicionar novo horário"
                disabled={hasConflicts}
                title={hasConflicts ? 'Resolva conflitos antes de adicionar novo horário' : undefined}
              >
                <FiClock className="mr-2" />
                Adicionar Horário
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
