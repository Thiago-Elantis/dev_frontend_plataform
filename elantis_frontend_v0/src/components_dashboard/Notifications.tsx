// components/Notifications.tsx
import { useState, useEffect } from 'react';
import { FiX, FiCheck, FiBell } from 'react-icons/fi';

type NotificationType = {
  id: string;
  message: string;
  time: string;
  read: boolean;
  type?: 'info' | 'warning' | 'success' | 'error';
};

type NotificationsProps = {
  onClose: () => void;
  isOpen: boolean; // Adicionamos esta prop para controlar a abertura
};

export default function Notifications({ onClose, isOpen }: NotificationsProps) {
  const [notifications, setNotifications] = useState<NotificationType[]>(() => [
    {
      id: '1',
      message: 'Você corrigiu um bug no componente de dashboard',
      time: '2 minutos atrás',
      read: false,
      type: 'success'
    },
    {
      id: '2',
      message: 'Novo usuário registrado: teste@example.com',
      time: '10 minutos atrás',
      read: false,
      type: 'info'
    },
    {
      id: '3',
      message: 'Manutenção programada para esta noite',
      time: '1 hora atrás',
      read: true,
      type: 'warning'
    }
  ]);

  // Garante que o estado não seja reinicializado
  useEffect(() => {
    if (!isOpen) return;
    
    // Aqui você poderia carregar notificações de uma API
    // ou manter o estado atual
  }, [isOpen]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type?: string) => {
    switch(type) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'success': return 'text-green-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-200 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Restante do componente permanece igual */}
      <div className="h-full flex flex-col">
        {/* Cabeçalho */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FiBell className="text-gray-600" />
            <h3 className="font-bold text-lg">Notificações</h3>
            {unreadCount > 0 && (
              <span className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            aria-label="Fechar painel de notificações"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Lista de Notificações */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Nenhuma notificação disponível
            </div>
          ) : (
            <ul>
              {notifications.map(notification => (
                <li 
                  key={notification.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className={`font-medium ${getTypeColor(notification.type)} ${
                          notification.read ? 'opacity-75' : ''
                        }`}>
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-gray-400 hover:text-green-500"
                            aria-label="Marcar como lida"
                          >
                            <FiCheck size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remover notificação"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}