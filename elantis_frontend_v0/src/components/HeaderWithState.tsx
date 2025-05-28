"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

// Mapeie as rotas para os títulos que quer mostrar
const pageTitles: Record<string, string> = {
  "/Dashboard": "Dashboard",
  "/Sales_Progress": "Progresso de Vendas",
  "/event-map": "Mapa do Evento",
  "/crm/Contacts": "Contatos",
  "/crm/Companies": "Empresas",
  "/crm/Deals": "Pipeline de Deals",
  "/crm/contracts": "Contratos Clientes",
  "/events/Calendar": "Calendário de Atividades",
  "/events/Inventory": "Estoque do Evento",
  "/events/tickets": "Ingressos",
  "/events/sponsors": "Patrocinadores",
  "/events/Agents": "Gestão de Fornecedores",
  "/events/contracts": "Contratos Fornecedores",
  "/finance/Transactions": "Transações Financeiras",
  "/finance/Reports": "Patrocinadores",
  "/finance/Invoices": "Gestão de Faturas",
  



};

export default function HeaderWrapper() {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  const title = pageTitles[pathname] || "Página";

  return (
    <Header
      pageTitle={title}
      showNotifications={showNotifications}
      onNotificationsClick={() => setShowNotifications(true)}
      onCloseNotifications={() => setShowNotifications(false)}
    />
  );
}
