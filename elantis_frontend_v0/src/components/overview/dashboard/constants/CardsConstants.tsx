import { CardMetric } from "../subcomponents/types";
import { FiBriefcase, FiClock, FiTarget, FiTrendingUp, FiUser, FiCheckCircle, FiCalendar } from "react-icons/fi";
import { HiOutlineThumbDown } from "react-icons/hi";

export const OverviewMetrics: CardMetric[] = [
  { title: "Leads", value: 325, change: "+5.2%", isPositive: true, icon: <FiUser className="w-5 h-5" />, color: "bg-blue-100 text-blue-600",},
  { title: "Negócios", value: 12340, icon: <FiBriefcase className="w-5 h-5" />, color: "bg-blue-100 text-blue-600",},
  { title: "Ganhos", value: 230, icon: <FiTrendingUp className="w-5 h-5" />, color: "bg-blue-100 text-blue-600", currency: "%",},
  { title: "Perdidos", value: 187, change: "-2.1%", isPositive: false, icon: <HiOutlineThumbDown className="w-5 h-5" />, color: "bg-blue-100 text-blue-600",},
];

export const SalesMetrics: CardMetric[] = [
  { title: "Negócios Fechados no Mês", value: 1352, change: "+5.2%", isPositive: true, icon: <FiCheckCircle className="w-5 h-5" />, color: "bg-blue-100 text-blue-600",},
  { title: "Meta do Mês", value: "72%", icon: <FiTarget className="w-5 h-5" />, color: "bg-blue-100 text-blue-600",},
  { title: "Tempo Médio de Fechamento", value: "25 dias", change: "-2.1%", icon: <FiClock className="w-5 h-5" />, color: "bg-blue-100 text-blue-600",},
  { title: "Reuniões Agendadas", value: 36, change: "-25%", isPositive: false, icon: <FiCalendar className="w-5 h-5" />, color: "bg-blue-100 text-blue-600",},
];
