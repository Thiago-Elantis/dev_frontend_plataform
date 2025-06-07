// src/components/Sidebar/types.ts
import { LucideIcon } from "lucide-react";

// Tipo para um item de navegação
export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

// Tipo para uma seção de navegação
export interface NavSection {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
}

// Props para o componente EventDropdown
export interface EventDropdownProps {
  isOpen: boolean;
  selectedEvent: string;
  setSelectedEvent: (event: string) => void;
  isEventDropdownOpen: boolean;
  setIsEventDropdownOpen: (isOpen: boolean) => void;
}

// Props para o componente NavSection
export interface NavSectionProps {
  section: NavSection;
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
  pathname: string;
  isOpen: boolean;
}

// Props para o componente UserProfile
export interface UserProfileProps {
  isOpen: boolean;
}

// Props para o componente LockButton
export interface LockButtonProps {
  isLockedOpen: boolean;
  toggleSidebarLock: () => void;
}

// Props para o componente Sidebar (principal)
export interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Props para o componente Skeleton
export interface SidebarSkeletonProps {
  itemsCount?: number;
}