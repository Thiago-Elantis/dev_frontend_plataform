import { useState } from 'react';
import { FiX, FiCheck, FiBell } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

type NotificationType = {
  id: string;
  message: string;
  time: string;
  read: boolean;
  type?: 'info' | 'warning' | 'success' | 'error';
};

type NotificationsProps = {
  onClose: () => void;
  isOpen: boolean;
};

export default function Notifications({ onClose, isOpen }: NotificationsProps) {
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: '1',
      message: 'Você corrigiu um bug no componente de dashboard',
      time: '2 minutos atrás',
      read: false,
      type: 'success',
    },
    {
      id: '2',
      message: 'Novo usuário registrado: teste@example.com',
      time: '10 minutos atrás',
      read: false,
      type: 'info',
    },
    {
      id: '3',
      message: 'Manutenção programada para esta noite',
      time: '1 hora atrás',
      read: true,
      type: 'warning',
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'success':
        return 'text-green-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Painel de notificações"
          className="fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] bg-white shadow-xl border-l border-gray-200 z-50 flex flex-col"
        >
          {/* Cabeçalho */}
          <header className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FiBell className="text-gray-600" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-gray-900">Notificações</h3>
              {unreadCount > 0 && (
                <span
                  className="ml-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center select-none"
                  aria-label={`${unreadCount} notificações não lidas`}
                  role="status"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              type="button"
              aria-label="Fechar painel de notificações"
              className="p-1 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FiX size={20} />
            </button>
          </header>

          {/* Lista de notificações */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500 select-none">
                Nenhuma notificação disponível
              </div>
            ) : (
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="p-4 flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium truncate ${getTypeColor(
                            notification.type
                          )} ${notification.read ? 'opacity-70' : ''}`}
                          title={notification.message}
                        >
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-500 mt-1 truncate">
                          {notification.time}
                        </p>
                      </div>
                      <div className="flex gap-3 ml-4 flex-shrink-0">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            aria-label="Marcar como lida"
                            className="text-gray-400 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                            type="button"
                          >
                            <FiCheck size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          aria-label="Remover notificação"
                          className="text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                          type="button"
                        >
                          <FiX size={18} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
