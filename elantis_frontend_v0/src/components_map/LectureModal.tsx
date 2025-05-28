import { useState } from 'react';
import { FiX, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';
import { CanvasElement } from '@/types/map-event';

export const LectureModal = ({
  element,
  selectedDate,
  onClose,
  onUpdate,
}: {
  element: CanvasElement;
  selectedDate: Date;
  onClose: () => void;
  onUpdate: (updated: CanvasElement) => void;
}) => {
  const [localElement, setLocalElement] = useState(element);

  const getEventsForSelectedDate = () => {
    if (!localElement.schedule) return [];
    
    return localElement.schedule
      .filter(time => 
        format(time.start, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      )
      .map((time, idx) => ({
        id: `${localElement.id}-${idx}`,
        title: localElement.title || 'Palestra',
        start: time.start,
        end: time.end,
      }));
  };

  const updateSchedule = (newSchedule: Array<{ start: Date; end: Date }>) => {
    const updated = {...localElement, schedule: newSchedule};
    setLocalElement(updated);
    onUpdate(updated);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-90">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Configurar Palestra</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                value={localElement.title || ''}
                onChange={(e) => {
                  setLocalElement({...localElement, title: e.target.value});
                }}
                onBlur={() => onUpdate(localElement)}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacidade</label>
              <input
                type="number"
                value={localElement.capacity || 50}
                onChange={(e) => {
                  setLocalElement({...localElement, capacity: parseInt(e.target.value) || 50});
                }}
                onBlur={() => onUpdate(localElement)}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-medium mb-2">Horários para {format(selectedDate, 'dd/MM/yyyy')}</h3>
              
              <div className="space-y-2 mb-4">
                {getEventsForSelectedDate().map((event, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={format(event.start, 'HH:mm')}
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value.split(':').map(Number);
                          const newStart = new Date(event.start);
                          newStart.setHours(hours, minutes);
                          
                          const newSchedule = [...(localElement.schedule || [])];
                          newSchedule[idx].start = newStart;
                          updateSchedule(newSchedule);
                        }}
                        className="border border-gray-300 rounded p-1"
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={format(event.end, 'HH:mm')}
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value.split(':').map(Number);
                          const newEnd = new Date(event.end);
                          newEnd.setHours(hours, minutes);
                          
                          const newSchedule = [...(localElement.schedule || [])];
                          newSchedule[idx].end = newEnd;
                          updateSchedule(newSchedule);
                        }}
                        className="border border-gray-300 rounded p-1"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        const newSchedule = localElement.schedule?.filter((_, i) => i !== idx) || [];
                        updateSchedule(newSchedule);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  const startTime = new Date(selectedDate);
                  startTime.setHours(10, 0, 0, 0);
                  
                  const endTime = new Date(startTime);
                  endTime.setHours(startTime.getHours() + 1);
                  
                  const newSchedule = [...(localElement.schedule || []), {
                    start: startTime,
                    end: endTime
                  }];
                  updateSchedule(newSchedule);
                }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FiClock className="mr-2" />
                Adicionar Horário
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};