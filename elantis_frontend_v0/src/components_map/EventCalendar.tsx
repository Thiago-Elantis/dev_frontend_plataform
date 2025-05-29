import { FiCalendar } from 'react-icons/fi';
import { formatDate, parseDateString } from '@/utils/map';

interface EventCalendarProps {
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export default function EventCalendar({
  showCalendar,
  setShowCalendar,
  selectedDate,
  setSelectedDate,
}: EventCalendarProps) {
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  return (
    <div className="relative">
      <button
        onClick={toggleCalendar}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        aria-expanded={showCalendar}
        aria-controls="calendar-dropdown"
        title={showCalendar ? 'Ocultar calendário' : 'Mostrar calendário'}
      >
        <FiCalendar className="mr-2" />
        {showCalendar ? 'Ocultar Calendário' : 'Selecionar Data'}
      </button>

      {showCalendar && (
        <div
          id="calendar-dropdown"
          className="absolute mt-2 z-50 bg-white p-4 rounded-xl shadow-xl border border-gray-200"
        >
          <label htmlFor="event-date" className="block text-sm text-gray-600 mb-1">
            Escolha uma data
          </label>
          <input
            id="event-date"
            type="date"
            value={formatDate(selectedDate, 'yyyy-MM-dd')}
            onChange={(e) => setSelectedDate(parseDateString(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 text-sm w-full"
            aria-label="Selecionar data do evento"
          />
        </div>
      )}
    </div>
  );
}
