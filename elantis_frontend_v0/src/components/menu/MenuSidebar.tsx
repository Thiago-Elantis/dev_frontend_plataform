// src/components/Sidebar/Sidebar.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import EventDropdown from './subcomponents_sidebar/SidebarEventDropdown';
import NavSection from './subcomponents_sidebar/SidebarNavSection';
import UserProfile from './subcomponents_sidebar/SidebarUserProfile';
import LockButton from './subcomponents_sidebar/SidebarLockButton';
import { navSections, events } from './subcomponents_sidebar/SidebarConstants';
import { SidebarProps } from './subcomponents_sidebar/types';


export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [isLockedOpen, setIsLockedOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) {
      setIsEventDropdownOpen(false);
    }
  }, [isOpen]);

  const toggleSidebarLock = () => {
    setIsLockedOpen(!isLockedOpen);
    if (!isOpen) setIsOpen(true);
  };

  const handleMouseEnter = () => {
    if (!isLockedOpen) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isLockedOpen) setIsOpen(false);
  };

  if (!mounted) {
    return (
      <aside className="w-20 bg-slate-900 p-4 h-screen sticky top-0 border-r border-gray-800">
        <div className="animate-pulse flex flex-col space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="h-8 w-8 bg-slate-700 rounded-full" />
              <div className="h-2 w-6 bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={clsx(
        'bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl h-screen sticky top-0 border-r border-slate-700 transition-all duration-300 ease-in-out z-50',
        isOpen ? 'w-64' : 'w-20'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col h-full p-4 overflow-y-auto scrollbar-hide">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4 p-2 rounded-lg bg-slate-800/50">
          {isOpen ? (
            <span className="text-white font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Elantis
            </span>
          ) : (
            <span className="text-white font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              E
            </span>
          )}
        </div>

        <EventDropdown 
          isOpen={isOpen}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          isEventDropdownOpen={isEventDropdownOpen}
          setIsEventDropdownOpen={setIsEventDropdownOpen}
        />

        <nav className={clsx("flex-1 flex flex-col space-y-6", isOpen ? "items-left" : "items-center")}>
          {navSections.map((section) => (
            <NavSection
              key={section.title}
              section={section}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              pathname={pathname}
              isOpen={isOpen}
            />
          ))}
        </nav>

        <UserProfile isOpen={isOpen} />
        <LockButton 
          isLockedOpen={isLockedOpen} 
          toggleSidebarLock={toggleSidebarLock} 
        />
      </div>
    </aside>
  );
}