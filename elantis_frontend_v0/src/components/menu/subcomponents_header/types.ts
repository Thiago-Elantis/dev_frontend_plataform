// src/components/Header/types.ts
import { ReactNode } from "react";

export interface HeaderComponentProps {
  onNotificationsClick: () => void;
  showNotifications: boolean;
  onCloseNotifications: () => void;
  unreadCount?: number;
  onSearch?: (query: string) => void;
  isSidebarOpen: boolean;
}

export interface HeaderWrapperProps {
  isSidebarOpen: boolean;
}

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface NotificationButtonProps {
  onClick: () => void;
  showNotifications: boolean;
  unreadCount?: number;
}

export interface UtilityButtonProps {
  icon: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
}

export type NotificationsProps = {
  notifications: Notification[];
  onRemove: (id: number) => void;
  onMarkAllAsRead: () => void;
  onClose: () => void;
};

export type PageTitles = Record<string, string>;

export interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
  type?: "message" | "event"| "summary";
  
}