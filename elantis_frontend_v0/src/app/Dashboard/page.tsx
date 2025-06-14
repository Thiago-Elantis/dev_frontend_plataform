"use client";

import { PageContainer, PageHeader, Card } from "@/components/ui";
import { ChartHeader } from "@/components/overview/dashboard/subcomponents/DashboardChartHeader";
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
          <div className="p-6">
            <ChartHeader 
              title="Timeline de Vendas" 
              subtitle="Acompanhe o progresso das vendas ao longo do tempo" 
            />
            <SalesTimeline />
          </div>
        </Card>

        {/* Primeira linha de gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
          <Card>
            <div className="p-6">
              <ChartHeader 
                title="Status dos Canais" 
                subtitle="Distribuição de leads por canal de origem" 
              />
              <StatusChannel />
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <ChartHeader 
                title="Funil de Conversão" 
                subtitle="Comportamento de cada funil de vendas" 
              />
              <GenericFunnel 
                title="" 
                subtitle="" 
                categories={[...CATEGORIES_SALES_ITEMS]} 
                initialCategory="Geral" 
                getData={getSalesData} 
                baseColor="#6366f1" 
                opacityRange={0.6}
              />
            </div>
          </Card>
        </div>

        {/* Gráfico de Progresso de Vendas */}
        <Card className="animate-slide-up">
          <div className="p-6">
            <ChartHeader 
              title="Progresso de Vendas" 
              subtitle="Acompanhe o desempenho das vendas mensais" 
            />
            <SalesProgressChart/>
          </div>
        </Card>

        {/* Motivos de Perda */}
        <Card className="animate-slide-up">
          <div className="p-6">
            <ChartHeader 
              title="Motivos de Perda" 
              subtitle="Análise dos principais motivos de perda de negócios" 
            />
            <MotivosDePerda />
          </div>
        </Card>
        
        {/* Grid de componentes menores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          <Card>
            <div className="p-6">
              <ChartHeader 
                title="Mapa de Atividades" 
                subtitle="Distribuição de atividades da equipe" 
              />
              <MapaDeAtividades nivelUsuario={"membro+"} usuarioLogado={""} />
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <ChartHeader 
                title="Negócios por Produto" 
                subtitle="Performance de vendas por categoria" 
              />
              <NegociosPorProduto />
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <ChartHeader 
                title="Resumo de Tarefas" 
                subtitle="Status das tarefas da equipe" 
              />
              <ResumoTarefasEquipe />
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <ChartHeader 
                title="Top Vendedores" 
                subtitle="Ranking dos melhores vendedores" 
              />
              <TopSellersRanking />
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <ChartHeader 
                title="Receita por Produto" 
                subtitle="Análise de receita por categoria" 
              />
              <ProductEarningsChart/>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <ChartHeader 
                title="Métodos de Contato" 
                subtitle="Preferências de comunicação dos clientes" 
              />
              <ContactMethod />
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}