'use client';

import { useState, useEffect } from 'react';
import { PageContainer, PageHeader, Card, MetricCard, Button } from '@/components/ui';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    {
      title: 'Novo Evento',
      description: 'Criar um novo evento',
      href: '/events/Calendar',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Adicionar Contato',
      description: 'Cadastrar novo contato',
      href: '/crm/Contacts',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Nova Transação',
      description: 'Registrar transação financeira',
      href: '/finance/Transactions',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'Mapa do Evento',
      description: 'Visualizar layout do evento',
      href: '/event-map',
      icon: MapPin,
      color: 'bg-orange-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'event',
      title: 'Festival de Verão criado',
      time: '2 horas atrás',
      status: 'success'
    },
    {
      id: 2,
      type: 'contact',
      title: 'Novo contato adicionado: Maria Silva',
      time: '4 horas atrás',
      status: 'success'
    },
    {
      id: 3,
      type: 'transaction',
      title: 'Pagamento de R$ 5.000 recebido',
      time: '6 horas atrás',
      status: 'success'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Prazo de pagamento próximo',
      time: '1 dia atrás',
      status: 'warning'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: 'Festival de Verão',
      date: '2024-07-15',
      location: 'Centro de Convenções',
      attendees: 250
    },
    {
      id: 2,
      name: 'Conferência Tech',
      date: '2024-07-22',
      location: 'Hotel Plaza',
      attendees: 150
    }
  ];

  return (
    <PageContainer>
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Bem-vindo ao Elantis! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Sua plataforma completa para gestão de eventos
              </p>
              <p className="text-blue-200 text-sm mt-2">
                {currentTime.toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} - {currentTime.toLocaleTimeString('pt-BR')}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Calendar className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Eventos Ativos"
            value="12"
            change={{ value: "3", type: "increase" }}
            icon={Calendar}
            iconColor="text-blue-600"
            subtitle="último mês"
          />
          <MetricCard
            title="Total de Contatos"
            value="1,247"
            change={{ value: "8.2%", type: "increase" }}
            icon={Users}
            iconColor="text-green-600"
            subtitle="último mês"
          />
          <MetricCard
            title="Receita Total"
            value="R$ 125.400"
            change={{ value: "12.5%", type: "increase" }}
            icon={DollarSign}
            iconColor="text-purple-600"
            subtitle="último mês"
          />
          <MetricCard
            title="Taxa de Conversão"
            value="68.5%"
            change={{ value: "2.1%", type: "increase" }}
            icon={TrendingUp}
            iconColor="text-orange-600"
            subtitle="último mês"
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className="group p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${action.color} text-white`}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-500">{action.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Atividades Recentes</h2>
                <Link href="/Dashboard">
                  <Button variant="ghost" size="sm">
                    Ver todas
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${
                      activity.status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {activity.status === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Próximos Eventos</h2>
                <Link href="/events/Calendar">
                  <Button variant="ghost" size="sm">
                    Ver calendário
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{event.name}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} participantes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}