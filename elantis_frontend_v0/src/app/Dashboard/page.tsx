"use client";

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

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-6 space-y-6 flex-grow">

          {/* Cartões de Métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderMetricCards(OverviewMetrics)}
            {renderMetricCards(SalesMetrics)}
          </div>

          {/* Timeline de Vendas */}
          <div>
            <SalesTimeline />
          </div>

          {/* Primeira linha de gráficos */}
          <div className="grid grid-cols-2 gap-6">
            <StatusChannel />
            <GenericFunnel 
              title="Funil de Conversão" 
              subtitle="Comportamento de cada funil" 
              categories={[...CATEGORIES_SALES_ITEMS]} 
              initialCategory="Geral" 
              getData={getSalesData} 
              baseColor="#6366f1" 
              opacityRange={0.6}
            />
          </div>

          {/* Segunda linha de gráficos */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
            
          </div>

          <div className="grid grid-cols-1">
            <SalesProgressChart/>
          </div>
          <div className="grid grid-cols-1">
            <MotivosDePerda />
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">

            <MapaDeAtividades nivelUsuario={"membro+"} usuarioLogado={""} />
            <NegociosPorProduto />
            <ResumoTarefasEquipe />
            <TopSellersRanking />
            <ProductEarningsChart/>
            <ContactMethod />
          </div>
        </div>
      </main>
    </div>
  );
}