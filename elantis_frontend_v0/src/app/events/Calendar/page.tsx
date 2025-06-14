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
import { Plus, Calendar as CalendarIcon, Filter, Download } from 'lucide-react';
import { PageContainer, PageHeader, Card, Button } from '@/components/ui';
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

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Eventos', href: '/events' },
    { label: 'Calendário' }
  ];

  const actions = (
    <>
      <Button
        variant="outline"
        icon={Filter}
        onClick={() => {/* Implementar filtros */}}
      >
        Filtros
      </Button>
      <Button
        variant="outline"
        icon={Download}
        onClick={() => {/* Implementar exportação */}}
      >
        Exportar
      </Button>
      <Button
        icon={Plus}
        onClick={handleNewEventClick}
      >
        Nova Atividade
      </Button>
    </>
  );

  return (
    <PageContainer>
      <PageHeader
        title="Calendário de Atividades"
        subtitle="Gerencie e visualize todas as atividades dos seus eventos"
        breadcrumbs={breadcrumbs}
        actions={actions}
      />
      
      <div className="p-6 space-y-6">
        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{events.length}</div>
              <div className="text-sm text-gray-600">Total de Atividades</div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {events.filter(e => e.type === 'MONTAGEM_ESTANDE').length}
              </div>
              <div className="text-sm text-gray-600">Montagem de Estandes</div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {events.filter(e => e.type === 'MONTAGEM_PALCO').length}
              </div>
              <div className="text-sm text-gray-600">Montagem de Palcos</div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {events.filter(e => e.type === 'TESTE_SOM').length}
              </div>
              <div className="text-sm text-gray-600">Testes de Som</div>
            </div>
          </Card>
        </div>

        {/* Legenda de tipos de atividade */}
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Tipos de Atividade</h3>
            <div className="flex flex-wrap gap-4">
              {Object.entries(ACTIVITY_TYPES).map(([key, type]) => (
                <div key={key} className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="text-sm text-gray-600">{type.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Calendário */}
        <Card>
          <div className="p-4">
            <div className="h-[600px]">
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
          </div>
        </Card>

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
    </PageContainer>
  );
}
