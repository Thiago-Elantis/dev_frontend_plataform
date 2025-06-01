"use client";

import { useState } from "react";
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

// Categorias e etapas centralizadas
const CATEGORIAS = ['Geral', 'Estandes', 'Palestras', 'Patrocinios'] as const;
type Categoria = typeof CATEGORIAS[number];

const ETAPAS = ["Leads", "Contatos Qualificados", "Reuniões", "Propostas", "Fechamentos"];

// Tipagem baseada nas categorias
type DadoFunil = {
  etapa: string;
} & Record<Categoria, number>;

// Geração automática dos dados
const dados: DadoFunil[] = ETAPAS.map((etapa, etapaIndex) => {
  const etapaData: DadoFunil = {
    etapa,
    ...Object.fromEntries(
      CATEGORIAS.map((categoria) => [
        categoria,
        gerarValorCategoria(categoria, etapaIndex),
      ])
    ),
  } as DadoFunil;

  return etapaData;
});

// Função que gera valores simulados por categoria e etapa - {remover}
function gerarValorCategoria(categoria: Categoria, etapaIndex: number): number {
  const base = {
    Geral: 1000,
    Estandes: 500,
    Palestras: 400,
    Patrocinios: 300,
  }[categoria];

  const decaimento = [1, 0.75, 0.5, 0.25, 0.12];
  return Math.round(base * decaimento[etapaIndex]);
}

// Cores do funil
const CORES = ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"];

export default function FunilDeConversao() {
  const [categoria, setCategoria] = useState<Categoria>('Geral');

  const dadosFiltrados = dados.map(item => ({
    etapa: item.etapa,
    valor: item[categoria]
  }));

  const dadosComTaxas = dadosFiltrados.map((item, index, array) => {
    if (index === 0) return { ...item, taxa: "100%" };
    const taxa = ((item.valor / array[index - 1].valor) * 100).toFixed(1);
    return { ...item, taxa: `${taxa}%` };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const data = payload[0].payload;

    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md text-sm">
        <p className="font-semibold text-gray-800">{data.etapa}</p>
        <p className="text-gray-600">Categoria: <span className="font-medium">{categoria}</span></p>
        <p className="text-gray-600">Quantidade: <span className="font-medium">{data.valor}</span></p>
        <p className="text-gray-600">Taxa de conversão: <span className="font-medium">{data.taxa}</span></p>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      {/* Título e filtro de categoria */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Funil de Conversão</h2>

        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all ${
                categoria === cat
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico de funil */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart margin={{ top: 10, right: 40 }}>
            <Tooltip content={<CustomTooltip />} />
            <Funnel
              dataKey="valor"
              data={dadosComTaxas}
              isAnimationActive
              lastShapeType="rectangle"
            >
              {dadosComTaxas.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CORES[index % CORES.length]}
                />
              ))}

              <LabelList
                dataKey="etapa"
                position="center"
                fill="#010a17"
                fontSize={14}
                fontWeight={600}
              />

              <LabelList
                dataKey="taxa"
                position="right"
                fill="#4b5563"
                fontSize={12}
                offset={30}
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>

      {/* Estatísticas resumidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Resumo label={`Total ${categoria}`} valor={dadosFiltrados[0].valor} />
        <Resumo
          label="Conversão Total"
          valor={`${(
            (dadosFiltrados.at(-1)!.valor / dadosFiltrados[0].valor) *
            100
          ).toFixed(1)}%`}
        />
        <Resumo
          label="Perda Total"
          valor={dadosFiltrados[0].valor - dadosFiltrados.at(-1)!.valor}
        />
        <Resumo
          label="Melhor Etapa"
          valor={
            dadosComTaxas.reduce((max, item, index) =>
              index > 0 && parseFloat(item.taxa) > parseFloat(max.taxa) ? item : max,
              { etapa: "", taxa: "0" }
            ).etapa
          }
        />
      </div>
    </div>
  );
}

// Subcomponente de resumo
function Resumo({ label, valor }: { label: string; valor: string | number }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{valor}</p>
    </div>
  );
}
