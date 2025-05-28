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
  setSelectedDate
}: EventCalendarProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <FiCalendar className="mr-2" />
        {showCalendar ? 'Ocultar Calendário' : 'Mostrar Calendário'}
      </button>

      {showCalendar && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <input
            type="date"
            value={formatDate(selectedDate, 'yyyy-MM-dd')}
            onChange={(e) => setSelectedDate(parseDateString(e.target.value))}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
      )}
    </div>
  );
}