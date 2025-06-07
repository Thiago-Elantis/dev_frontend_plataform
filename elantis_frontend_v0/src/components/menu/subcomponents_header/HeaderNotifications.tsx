import React from "react";
import { FiMail, FiCheckCircle } from "react-icons/fi";
import { NotificationsProps } from "./types";

const Notifications: React.FC<NotificationsProps> = ({
  notifications,
  onRemove,
  onMarkAllAsRead,
  onClose,
}) => {
  if (notifications.length === 0) return null;

  return (
    <div className="w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800">Notifications</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-sm"
          aria-label="Close notifications"
        >
          ✕
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
        {notifications.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">No notifications.</div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onRemove(notif.id)} // ao clicar remove a notificação (marca como lida e remove)
              className={`p-4 flex items-start space-x-3 transition-colors cursor-pointer ${
                !notif.read ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"
              }`}
            >
              <div className="mt-0.5 text-blue-500 shrink-0">
                {notif.type === "message" ? (
                  <FiMail size={18} />
                ) : (
                  <FiCheckCircle size={18} />
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    notif.read ? "text-gray-600" : "text-gray-800 font-medium"
                  }`}
                >
                  {notif.message}
                </p>
                <p className="text-xs text-gray-500">{notif.time}</p>
              </div>
              {!notif.read && (
                <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </div>
          ))
        )}
      </div>

      {notifications.some((n) => !n.read) && (
        <div className="p-4 border-t border-gray-200 text-center">
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-blue-600 font-medium hover:text-blue-800"
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
