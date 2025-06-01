"use client";

import OverviewCards from './OverviewCards';
import ChartsSection from './ChartsSection';
import TopSellersRanking from './TopSellersRanking';
import StatusPorCanal from './StatusPorCanal';
import FunilDeConversao from './FunilDeConversao';
import NegociosPorProduto from './NegociosPorProduto';
import MotivosDePerda from './MotivosDePerda';
import MapaDeAtividades from './MapaDeAtividades';
import ResumoTarefasEquipe from './ResumoTarefasEquipe';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-6 space-y-6 flex-grow">
          <OverviewCards />
          <ChartsSection />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TopSellersRanking />
            <StatusPorCanal />
            <FunilDeConversao />
            <NegociosPorProduto />
          </div>

          <div className="space-y-6">
            <MotivosDePerda />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MapaDeAtividades nivelUsuario="membro" usuarioLogado="João" />
            <ResumoTarefasEquipe />
          </div>
        </div>
      </main>
    </div>
  );
}
