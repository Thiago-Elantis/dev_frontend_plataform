'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronLeftIcon,
  Calendar,
  Map,
  Users,
  Building,
  Handshake,
  FileText,
  TrendingUp,
  LayoutDashboard,
  Package,
  Ticket,
  DollarSign,
  Truck,
  File,
  BarChart2,
  Receipt,
  ChevronDown,
  Plus,
  PlusIcon,  }
   from "lucide-react"

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('Festival de Verão');
  const [isLockedOpen, setIsLockedOpen] = useState(false); // Novo estado para controle de lock

  useEffect(() => setMounted(true), []);

  const events = [
    'Festival de Verão',
    'Conferência Tech',
    'Show Nacional',
    'Evento Corporativo',
    'Feira Internacional'
  ];

  const navSections = [
  {
    title: 'Dashboards',
    icon: LayoutDashboard,
    items: [
      { name: 'Overview', path: '/Dashboard', icon: LayoutDashboard },
      { name: 'Sales Progress', path: '/Sales_Progress', icon: TrendingUp },
      { name: 'Event Map', path: '/event-map', icon: Map },
    ],
  },
  {
    title: 'CRM',
    icon: FileText,
    items: [
      { name: 'Contatos', path: 'crm/Contacts', icon: Users },
      { name: 'Empresas', path: 'crm/Companies', icon: Building },
      { name: 'Negócios', path: 'crm/Deals', icon: Handshake },
    ],
  },
  {
    title: 'Eventos',
    icon: Calendar,
    items: [
      { name: 'Fornecedores', path: '/events/Agents', icon: Truck },
      { name: 'Calendário', path: '/events/Calendar', icon: Calendar },
      { name: 'Estoque', path: '/events/Inventory', icon: FileText },
      { name: 'Ingressos', path: '/events/Tickets', icon: Ticket },
    ],
  },
  {
    title: 'Financeiro',
    icon: BarChart2,
    items: [
      { name: 'Faturas', path: '/finance/Invoices', icon: Receipt },
      { name: 'Transações', path: '/finance/Transactions', icon: TrendingUp },
      { name: 'Relatório Financeiro', path: '/finance/Reports', icon: LayoutDashboard },

    ],
  },
  {
    title: 'Outros',
    icon: Package,
    items: [
      { name: 'Settings', path: '/settings', icon: Package },
    ],
  },
];

  useEffect(() => {
    if (!isOpen) {
      setIsEventDropdownOpen(false);
    }
  }, [isOpen]);

  // Alternar entre aberto/fechado com clique na seta
  const toggleSidebarLock = () => {
    setIsLockedOpen(!isLockedOpen);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  // Comportamento do hover apenas quando não está travado
  const handleMouseEnter = () => {
    if (!isLockedOpen) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isLockedOpen) {
      setIsOpen(false);
    }
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
        'bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl h-screen sticky top-0 border-r border-slate-700 transition-all duration-300 ease-in-out',
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

        {/* Dropdown de Eventos */}
        {isOpen && (
          <div className="mb-6 relative">
            <label className="text-xs text-gray-400 font-medium pl-2 mb-1 block">
              Evento Ativo
            </label>
            <button
              className="flex items-center justify-between w-full p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
              onClick={() => setIsEventDropdownOpen(!isEventDropdownOpen)}
            >
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-white truncate max-w-[140px]">{selectedEvent}</span>
              </div>
              <ChevronDown
                className={clsx(
                  'h-4 w-4 transform transition-transform text-gray-400',
                  isEventDropdownOpen ? 'rotate-180' : ''
                )}
              />
            </button>

            {/* Menu Dropdown */}
            {isEventDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
                <div className="max-h-60 overflow-y-auto">
                  {events.map((event) => (
                    <button
                      key={event}
                      className={clsx(
                        'w-full text-left p-3 text-sm transition-colors hover:bg-slate-700/50',
                        selectedEvent === event
                          ? 'bg-blue-500/10 text-blue-400 font-medium'
                          : 'text-gray-300'
                      )}
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsEventDropdownOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{event}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Botão para adicionar novo evento */}
                <button className="w-full p-3 text-sm text-center text-blue-400 hover:bg-slate-700/50 border-t border-slate-700 flex items-center justify-center">
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Novo Evento
                </button>
              </div>
            )}
          </div>
        )}

        {/* Navigation Sections */}
        <nav className="flex-1 flex flex-col space-y-6">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <button
                className={clsx(
                  'flex items-center w-full p-2 rounded-lg transition-colors',
                  activeSection === section.title ? 'text-white' : 'text-gray-400 hover:text-white'
                )}
                onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
              >
                <section.icon className="w-5 h-5 shrink-0" />
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

              {(isOpen && activeSection === section.title) && (
                <ul className="ml-8 space-y-1">
                  {section.items.map(({ name, path, icon: Icon }) => (
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
                        <Icon className="w-4 h-4 mr-3 shrink-0" />
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
          ))}
        </nav>

        {/* User Profile */}
        <div className="mt-auto pt-4 border-t border-slate-700/50">
          <div className="flex items-center p-2 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              U
            </div>
            {isOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Usuário</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Botão de toggle para manter aberto */}
        <button
  onClick={toggleSidebarLock}
  aria-label={isLockedOpen ? "Manter sidebar aberta" : "Liberar sidebar"}
  title={isLockedOpen ? "Manter sidebar aberta" : "Liberar sidebar"}
  className={clsx(
    "absolute bottom-4 right-3 w-8 h-8 flex items-center justify-center rounded-full border transition-colors",
    "backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
    isLockedOpen
      ? "bg-blue-500/20 border-blue-400"
      : "bg-slate-700/50 border-slate-600 hover:bg-slate-600"
  )}
>
  <motion.div
    initial={false}
    animate={{ rotate: isLockedOpen ? 0 : 180 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <ChevronLeftIcon
      className={clsx(
        "w-4 h-4 transition-colors",
        isLockedOpen ? "text-blue-400" : "text-gray-400"
      )}
    />
  </motion.div>
</button>
        
        
      </div>
    </aside>
  );
}
