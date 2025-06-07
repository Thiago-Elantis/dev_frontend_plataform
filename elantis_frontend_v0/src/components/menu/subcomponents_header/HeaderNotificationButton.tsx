import React from "react";
import { FiBell } from "react-icons/fi";
import { NotificationButtonProps } from "./types";

const NotificationButton: React.FC<NotificationButtonProps> = ({
  onClick,
  unreadCount = 0,
  showNotifications,
}) => {
  const hasUnread = unreadCount > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Notifications"
      aria-haspopup="true"
      aria-expanded={showNotifications}
      className="relative p-1 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
    >
      <FiBell size={18} />

      {hasUnread && (
        <span
          aria-label={`${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`}
          className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-red-600 rounded-full"
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationButton;
