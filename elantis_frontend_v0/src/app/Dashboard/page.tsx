"use client";

import { PageContainer, PageHeader, Card } from "@/components/ui";
import SalesTimeline from "@/components/overview/dashboard/SalesTimeline";
import StatusChannel from "@/components/overview/dashboard/StatusChannel";
import { renderMetricCards } from "@/components/overview/dashboard/utils/renderCards";
import { OverviewMetrics, SalesMetrics } from "@/components/overview/dashboard/constants/CardsConstants";
import GenericFunnel from "@/components/overview/dashboard/utils/genericFunnel";
import { getSalesData } from "@/components/overview/dashboard/constants/FunnelConstants";
import { CATEGORIES_SALES_ITEMS } from "@/components/overview/dashboard/constants/FilterConstants";
import ContactMethod from "@/components/overview/dashboard/ContactMethod";
import MapaDeAtividades from "@/components/overview/dashboard/MapaDeAtividades";
import MotivosDePerda from "@/components/overview/dashboard/MotivosDePerda";
import NegociosPorProduto from "@/components/overview/dashboard/NegociosPorProduto";
import ResumoTarefasEquipe from "@/components/overview/dashboard/ResumoTarefasEquipe";
import TopSellersRanking from "@/components/overview/dashboard/TopSellersRanking";
import SalesProgressChart from "@/components/overview/dashboard/SalesProgressChart";
import ProductEarningsChart from "@/components/overview/dashboard/ProductEarningsChart";
import { BarChart3, TrendingUp, Users, Calendar } from "lucide-react";

export default function Dashboard() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard' }
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        subtitle="Visão geral dos seus eventos e negócios"
        breadcrumbs={breadcrumbs}
      />
      
      <div className="p-6 space-y-6">
        {/* Cartões de Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {renderMetricCards(OverviewMetrics)}
          {renderMetricCards(SalesMetrics)}
        </div>

        {/* Timeline de Vendas */}
        <Card className="animate-slide-up">
          <SalesTimeline />
        </Card>

        {/* Primeira linha de gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
          <Card>
            <StatusChannel />
          </Card>
          <Card>
            <GenericFunnel 
              title="Funil de Conversão" 
              subtitle="Comportamento de cada funil" 
              categories={[...CATEGORIES_SALES_ITEMS]} 
              initialCategory="Geral" 
              getData={getSalesData} 
              baseColor="#6366f1" 
              opacityRange={0.6}
            />
          </Card>
        </div>

        {/* Gráfico de Progresso de Vendas */}
        <Card className="animate-slide-up">
          <SalesProgressChart/>
        </Card>

        {/* Motivos de Perda */}
        <Card className="animate-slide-up">
          <MotivosDePerda />
        </Card>
        
        {/* Grid de componentes menores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          <Card>
            <MapaDeAtividades nivelUsuario={"membro+"} usuarioLogado={""} />
          </Card>
          <Card>
            <NegociosPorProduto />
          </Card>
          <Card>
            <ResumoTarefasEquipe />
          </Card>
          <Card>
            <TopSellersRanking />
          </Card>
          <Card>
            <ProductEarningsChart/>
          </Card>
          <Card>
            <ContactMethod />
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}