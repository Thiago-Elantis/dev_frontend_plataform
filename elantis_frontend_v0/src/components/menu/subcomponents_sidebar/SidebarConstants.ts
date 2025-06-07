// Dados da SideBar
import { 
  LayoutDashboard, 
  TrendingUp, 
  Map, 
  FileText, 
  Users, 
  Building, 
  Handshake, 
  Calendar,
  Truck, 
  Package, 
  Ticket, 
  BarChart2, 
  Receipt 
} from "lucide-react";
import { NavSection } from "./types";

export const events = [
  'Festival de Verão',
  'Conferência Tech',
  'Show Nacional',
  'Evento Corporativo',
  'Feira Internacional'
];

export const navSections: NavSection[] = [
  {
    title: 'Dashboards',
    icon: LayoutDashboard,
    items: [
      { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Sales Progress', path: '/sales_Progress', icon: TrendingUp },
      { name: 'Event Map', path: '/event-map', icon: Map },
    ],
  },
  {
    title: 'CRM',
    icon: FileText,
    items: [
      { name: 'Contatos', path: '/crm/contacts', icon: Users },
      { name: 'Empresas', path: '/crm/companies', icon: Building },
      { name: 'Negócios', path: '/crm/deals', icon: Handshake },
    ],
  },
  {
    title: 'Eventos',
    icon: Calendar,
    items: [
      { name: 'Fornecedores', path: '/events/agents', icon: Truck },
      { name: 'Calendário', path: '/events/calendar', icon: Calendar },
      { name: 'Estoque', path: '/events/inventory', icon: Package },
      { name: 'Ingressos', path: '/events/tickets', icon: Ticket },
      { name: 'Contratos de Fornecedores', path: '/events/agents_contracts', icon: FileText },
    ],
  },
  {
    title: 'Financeiro',
    icon: BarChart2,
    items: [
      { name: 'Faturas', path: '/finance/invoices', icon: Receipt },
      { name: 'Transações', path: '/finance/transactions', icon: TrendingUp },
      { name: 'Relatório Financeiro', path: '/finance/reports', icon: LayoutDashboard },
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