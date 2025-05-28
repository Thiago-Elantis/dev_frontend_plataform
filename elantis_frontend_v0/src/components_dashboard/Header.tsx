"use client";

import { FiSearch, FiBell, FiPhone, FiSettings } from 'react-icons/fi';
import Notifications from './Notifications';

interface HeaderProps {
  onNotificationsClick: () => void;
  showNotifications: boolean;
  onCloseNotifications: () => void;
}

export default function Header({ onNotificationsClick, showNotifications, onCloseNotifications }: HeaderProps) {
  return (
    <header className="relative flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            aria-label="Search"
            className="border border-gray-300 rounded-md px-3 py-1.5 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <nav aria-label="Utility navigation">
          <ul className="flex space-x-3">
            <li>
              <button 
                onClick={onNotificationsClick}
                aria-label="Notifications" 
                className="p-1 text-gray-600 hover:text-blue-600 transition-colors relative"
              >
                <FiBell size={18} />
              </button>
            </li>
            <li>
              <button aria-label="Contacts" className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                <FiPhone size={18} />
              </button>
            </li>
            <li>
              <button aria-label="Settings" className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                <FiSettings size={18} />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Painel de Notificações */}
      {showNotifications && (
        <div className="absolute top-full right-0 z-50 mt-2">
          <Notifications isOpen={true} onClose={onCloseNotifications} />
        </div>
      )}
    </header>
  );
}
