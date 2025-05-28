"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiBell, FiPhone, FiSettings } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Notifications from "./Notifications";

interface HeaderProps {
  pageTitle: string;
  onNotificationsClick: () => void;
  showNotifications: boolean;
  onCloseNotifications: () => void;
  unreadCount?: number;
  onSearch?: (query: string) => void;
}

export default function Header({
  pageTitle,
  onNotificationsClick,
  showNotifications,
  onCloseNotifications,
  unreadCount = 0,
  onSearch,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Fecha notificações ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showNotifications &&
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        onCloseNotifications();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications, onCloseNotifications]);

  // Callback para pesquisa
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  }

  return (
    <header className="fixed top-0 left-64 right-0 bg-gray-50 shadow-md flex justify-between items-center px-4 py-3 z-50 h-16">

      <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
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
                aria-haspopup="true"
                aria-expanded={showNotifications}
                className="relative p-1 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                type="button"
              >
                <FiBell size={18} />
                {unreadCount > 0 && (
                  <span
                    aria-label={`${unreadCount} unread notifications`}
                    className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                aria-label="Contacts"
                className="p-1 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                type="button"
              >
                <FiPhone size={18} />
              </button>
            </li>
            <li>
              <button
                aria-label="Settings"
                className="p-1 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                type="button"
              >
                <FiSettings size={18} />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Dropdown notificações com animação */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            ref={notificationsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 z-50 mt-2"
          >
            <Notifications isOpen={true} onClose={onCloseNotifications} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
