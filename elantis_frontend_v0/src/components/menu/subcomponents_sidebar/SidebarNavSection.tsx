import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { NavSectionProps } from './types';

const NavSection: React.FC<NavSectionProps> = ({
  section,
  activeSection,
  setActiveSection,
  pathname,
  isOpen,
}) => {
  const Icon = section.icon;
  
  return (
    <div className="space-y-1">
      <button
        className={clsx(
          'flex items-center w-full p-2 rounded-lg transition-colors',
          activeSection === section.title ? 'text-white' : 'text-gray-400 hover:text-white'
        )}
        onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
      >
        <Icon className="w-5 h-5 shrink-0" />
        {isOpen && (
          <>
            <span className="ml-3 text-sm font-medium">{section.title}</span>
            <ChevronDown
              className={clsx(
                'ml-auto h-4 w-4 transform transition-transform',
                activeSection === section.title ? 'rotate-180' : 'rotate-0'
              )}
            />
          </>
        )}
      </button>

      {isOpen && activeSection === section.title && (
        <ul className="ml-8 space-y-1">
          {section.items.map(({ name, path, icon: ItemIcon }) => (
            <li key={name}>
              <Link
                href={path}
                className={clsx(
                  'flex items-center text-sm p-2 rounded-md transition-colors',
                  pathname === path
                    ? 'bg-blue-500/10 text-blue-400 font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                )}
              >
                <ItemIcon className="w-4 h-4 mr-3 shrink-0" />
                <span>{name}</span>
                {pathname === path && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavSection;