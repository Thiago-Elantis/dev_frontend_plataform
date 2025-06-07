import React from 'react';
import clsx from 'clsx';
import { Calendar, PlusIcon, ChevronDown } from 'lucide-react';
import { events } from './SidebarConstants';
import { EventDropdownProps } from './types';

const EventDropdown: React.FC<EventDropdownProps> = ({
  isOpen,
  selectedEvent,
  setSelectedEvent,
  isEventDropdownOpen,
  setIsEventDropdownOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="mb-6 relative">
      <label className="text-xs text-gray-400 font-medium pl-2 mb-1 block">
        Evento Ativo
      </label>
      <button
        className="flex items-center justify-between w-full p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
        onClick={() => setIsEventDropdownOpen(!isEventDropdownOpen)}
      >
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-blue-400" />
          <span className="text-white truncate max-w-[140px]">{selectedEvent}</span>
        </div>
        <ChevronDown
          className={clsx(
            'h-4 w-4 transform transition-transform text-gray-400',
            isEventDropdownOpen ? 'rotate-180' : ''
          )}
        />
      </button>

      {isEventDropdownOpen && (
        <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
          <div className="max-h-60 overflow-y-auto">
            {events.map((event) => (
              <button
                key={event}
                className={clsx(
                  'w-full text-left p-3 text-sm transition-colors hover:bg-slate-700/50',
                  selectedEvent === event
                    ? 'bg-blue-500/10 text-blue-400 font-medium'
                    : 'text-gray-300'
                )}
                onClick={() => {
                  setSelectedEvent(event);
                  setIsEventDropdownOpen(false);
                }}
              >
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{event}</span>
                </div>
              </button>
            ))}
          </div>
          
          <button className="w-full p-3 text-sm text-center text-blue-400 hover:bg-slate-700/50 border-t border-slate-700 flex items-center justify-center">
            <PlusIcon className="w-4 h-4 mr-1" />
            Novo Evento
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDropdown;