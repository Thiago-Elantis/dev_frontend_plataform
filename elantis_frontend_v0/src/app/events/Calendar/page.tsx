// EventCalendarPage.tsx
'use client';

import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { ptBR } from 'date-fns/locale/pt-BR';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from '@/components_event/components_calendar/EventModal';
import CalendarHeader from '@/components_event/components_calendar/CalendarHeader';
import { ActivityTypes, CalendarEvent } from '@/types/calendar';

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const ACTIVITY_TYPES: ActivityTypes = {
  MONTAGEM_ESTANDE: { name: 'Montagem de Estande', color: '#3B82F6' },
  MONTAGEM_PALCO: { name: 'Montagem de Palco', color: '#10B981' },
  TESTE_SOM: { name: 'Teste de Som', color: '#F59E0B' },
  REUNIAO: { name: 'Reunião', color: '#8B5CF6' },
  OUTRO: { name: 'Outro', color: '#EC4899' },
};

// Tipo intermediário para formulário, aceita Date ou string nos campos start e end
type CalendarEventForm = Omit<CalendarEvent, 'id'> & { id?: number; start: Date | string; end: Date | string };

export default function EventCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: 'Montagem de Estandes',
      start: new Date(2023, 4, 1, 8, 0),
      end: new Date(2023, 4, 9, 18, 0),
      type: 'MONTAGEM_ESTANDE',
      responsible: 'Equipe de Logística',
      notes: 'Montar 25 estandes no pavilhão 3',
    },
    {
      id: 2,
      title: 'Montagem de Palco',
      start: new Date(2023, 4, 7, 8, 0),
      end: new Date(2023, 4, 9, 22, 0),
      type: 'MONTAGEM_PALCO',
      responsible: 'Equipe Técnica',
      notes: 'Palco principal com 100m²',
    },
    {
      id: 3,
      title: 'Teste de Som e Iluminação',
      start: new Date(2023, 4, 9, 14, 0),
      end: new Date(2023, 4, 9, 20, 0),
      type: 'TESTE_SOM',
      responsible: 'Técnico de Áudio',
      notes: 'Testar todos os microfones e caixas',
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Estado do formulário que aceita start/end como Date ou string
  const [newEvent, setNewEvent] = useState<CalendarEventForm>({
    title: '',
    start: new Date(),
    end: new Date(),
    type: 'MONTAGEM_ESTANDE',
    responsible: '',
    notes: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setNewEvent({
      title: '',
      start: slotInfo.start,
      end: slotInfo.end,
      type: 'MONTAGEM_ESTANDE',
      responsible: '',
      notes: '',
    });
    setSelectedEvent(null);
    setShowModal(true);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    // Copiar evento selecionado para formulário, convertendo datas para string ISO para inputs (se necessário)
    setSelectedEvent(event);
    setNewEvent({
      ...event,
      start: event.start,
      end: event.end,
    });
    setShowModal(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewEvent((prev) => ({
      ...prev,
      // Converte string para Date só se for start ou end, senão mantem string
      [name]: name === 'start' || name === 'end' ? value : value,
    }));
  };

  const handleSaveEvent = () => {
    // Converte start e end para Date obrigatoriamente antes de salvar
    const eventToSave: CalendarEvent = {
      ...newEvent,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      id: newEvent.id ?? events.length + 1,
    };

    if (selectedEvent) {
      // Atualiza evento existente
      setEvents(events.map((ev) => (ev.id === selectedEvent.id ? eventToSave : ev)));
    } else {
      // Adiciona novo evento
      setEvents([...events, eventToSave]);
    }

    setShowModal(false);
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    setShowModal(false);
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    const backgroundColor = ACTIVITY_TYPES[event.type]?.color || '#999';
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  const handleNewEventClick = () => {
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      start: new Date(),
      end: new Date(),
      type: 'MONTAGEM_ESTANDE',
      responsible: '',
      notes: '',
    });
    setShowModal(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">

      <div className="flex-1 overflow-auto p-6">
        <CalendarHeader title="Calendário de Atividades" onNewEvent={handleNewEventClick} />

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-[calc(100vh-180px)]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            selectable
            defaultView={Views.MONTH}
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
            messages={{
              today: 'Hoje',
              previous: 'Anterior',
              next: 'Próximo',
              month: 'Mês',
              week: 'Semana',
              day: 'Dia',
              agenda: 'Agenda',
              date: 'Data',
              time: 'Hora',
              event: 'Atividade',
            }}
            eventPropGetter={eventStyleGetter}
          />
        </div>

        <EventModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedEvent={selectedEvent}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          activityTypes={ACTIVITY_TYPES}
          handleInputChange={handleInputChange}
          handleSaveEvent={handleSaveEvent}
          handleDeleteEvent={handleDeleteEvent}
          format={format}
        />
      </div>
    </div>
  );
}
