'use client';

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import SearchBar from "./subcomponents_header/HeaderSearchBar";
import NotificationButton from "./subcomponents_header/HeaderNotificationButton";
import UtilityButton from "./subcomponents_header/HeaderUtilityButton";
import Notifications from "./subcomponents_header/HeaderNotifications";
import { HeaderComponentProps } from "./subcomponents_header/types";
import { FiPhone, FiSettings } from "react-icons/fi";
import { pageTitles } from "./subcomponents_header/HeaderConstants";
import { usePathname } from "next/navigation";
import { Notification } from "./subcomponents_header/types";

const mockNotifications: Notification[] = [
  {
    id: 1,
    message: "You have a new message",
    time: "5 minutes ago",
    read: false,
    type: "message",
  },
  {
    id: 2,
    message: "Your event was approved",
    time: "1 hour ago",
    read: false,
    type: "event",
  },
  {
    id: 3,
    message: "Weekly summary available",
    time: "1 day ago",
    read: true,
    type: "summary",
  },
];

const Header: React.FC<HeaderComponentProps> = ({
  onNotificationsClick,
  showNotifications,
  onCloseNotifications,
  unreadCount = 0,
  onSearch,
  isSidebarOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const handleRemoveNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const pathname = usePathname();
  const normalizedPath = pathname.toLowerCase();
  const pageTitle = pageTitles[normalizedPath] || 'Página';

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

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  }

  const unreadCountLocal = notifications.filter((n) => !n.read).length;

  return (
    <header 
      className={clsx(
        "fixed top-0 rounded-b-lg left-0 right-0 bg-slate-100 shadow-md flex justify-between items-center px-4 py-3 z-50 h-16 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "ml-64" : "ml-20"
      )}
    >
      <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>

      <div className="flex items-center space-x-4">
        <SearchBar 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
        />

        <nav aria-label="Utility navigation">
          <ul className="flex space-x-3">
            <li>
              <NotificationButton 
                onClick={onNotificationsClick}
                showNotifications={showNotifications}
                unreadCount={unreadCountLocal}
              />
            </li>
            <li>
              <UtilityButton 
                icon={<FiPhone size={18} />}
                ariaLabel="Contacts"
              />
            </li>
            <li>
              <UtilityButton 
                icon={<FiSettings size={18} />}
                ariaLabel="Settings"
              />
            </li>
          </ul>
        </nav>
      </div>

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
            <Notifications
              onClose={onCloseNotifications}
              notifications={notifications}
              onRemove={handleRemoveNotification}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
